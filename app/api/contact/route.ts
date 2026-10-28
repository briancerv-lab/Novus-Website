import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { isValidEmail, isValidPhone } from '@/lib/estimate-validation';
import { BUSINESS_CONFIG } from '@/lib/config/business';
import {
  ContactInquiryInput,
  getActiveFormspreeEndpoint,
  buildFormspreeContactPayload,
  submitToFormspree,
} from '@/lib/formspree';

const ipContactTimestamps = new Map<string, number[]>();
const recentContactFingerprints = new Map<string, number>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const now = Date.now();
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : 'local-client';

    const prevTimestamps = (ipContactTimestamps.get(clientIp) || []).filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );

    if (prevTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      return NextResponse.json(
        {
          accepted: false,
          error:
            'Too many messages have been submitted recently. Please wait a few minutes or call us directly.',
        },
        { status: 429 }
      );
    }

    const body = (await req.json()) as ContactInquiryInput;

    // Honeypot check
    if (body.websiteHoneypot && body.websiteHoneypot.trim().length > 0) {
      return NextResponse.json(
        { accepted: false, error: 'Unable to process request.' },
        { status: 400 }
      );
    }

    const fieldErrors: Record<string, string> = {};
    const fullName = (body.fullName || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const cityOrZip = (body.cityOrZip || '').trim();
    const inquiryTopic = (body.inquiryTopic || '').trim();
    const message = (body.message || '').trim();

    if (!fullName || fullName.length < 2) {
      fieldErrors.fullName = 'Please enter your name.';
    }
    if (!email || !isValidEmail(email)) {
      fieldErrors.email = 'Please enter a valid email address.';
    }
    if (phone && !isValidPhone(phone)) {
      fieldErrors.phone = 'Please enter a valid 10-digit phone number or leave blank.';
    }
    if (!inquiryTopic) {
      fieldErrors.inquiryTopic = 'Please select a topic.';
    }
    if (!message || message.length < 10) {
      fieldErrors.message = 'Please include a brief message (at least 10 characters).';
    }
    if (!body.acknowledgePrivacy) {
      fieldErrors.acknowledgePrivacy =
        'Please confirm that you are requesting contact from Novus Construction Inc.';
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          accepted: false,
          error: 'Please review the highlighted fields below.',
          fieldErrors,
        },
        { status: 422 }
      );
    }

    const fingerprint = `${fullName.toLowerCase()}::${email.toLowerCase()}::${inquiryTopic.toLowerCase()}::${message.toLowerCase().slice(0, 100)}`;
    const lastSent = recentContactFingerprints.get(fingerprint);
    if (lastSent && now - lastSent < DUPLICATE_WINDOW_MS) {
      return NextResponse.json(
        {
          accepted: false,
          error: 'We already received this message a moment ago and will follow up with you.',
        },
        { status: 409 }
      );
    }

    const leadId = `CNT-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const receivedAtIso = new Date(now).toISOString();

    const endpointUrl = getActiveFormspreeEndpoint();
    const payload = buildFormspreeContactPayload(
      {
        fullName,
        email,
        phone,
        cityOrZip,
        inquiryTopic,
        message,
        acknowledgePrivacy: Boolean(body.acknowledgePrivacy),
      },
      leadId,
      receivedAtIso
    );

    const formspreeResult = await submitToFormspree(endpointUrl, payload);
    if (!formspreeResult.ok) {
      return NextResponse.json(
        {
          accepted: false,
          error: `Our form delivery service could not accept your message right now. Your entries have been preserved—please try again, call ${BUSINESS_CONFIG.contact.phoneDisplay}, or email ${BUSINESS_CONFIG.contact.email}.`,
        },
        { status: 502 }
      );
    }

    prevTimestamps.push(now);
    ipContactTimestamps.set(clientIp, prevTimestamps);
    recentContactFingerprints.set(fingerprint, now);

    return NextResponse.json(
      {
        accepted: true,
        leadId,
        receivedAtIso,
        confirmationMessage:
          'Thank you. Your message has been received by Novus Construction Inc. We will review your inquiry and follow up with you.',
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        accepted: false,
        error:
          'We were unable to send your message right now. Your entries have been preserved—please try again.',
      },
      { status: 500 }
    );
  }
}
