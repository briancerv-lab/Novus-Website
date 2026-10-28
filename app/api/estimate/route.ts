import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  EstimateFormState,
  validateFullEstimatePayload,
  computeSubmissionFingerprint,
  inferPropertyContext,
} from '@/lib/estimate-validation';
import { BUSINESS_CONFIG } from '@/lib/config/business';
import {
  getActiveFormspreeEndpoint,
  buildFormspreeEstimatePayload,
  submitToFormspree,
} from '@/lib/formspree';

const DURABLE_LEADS_PATH = path.join('/tmp', 'novus-construction-leads.json');

// Server-side in-memory rate limit and duplicate tracking
const ipSubmissionTimestamps = new Map<string, number[]>();
const recentFingerprints = new Map<string, number>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 5;
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

interface StoredLeadRecord {
  leadId: string;
  receivedAtIso: string;
  projectType: string;
  propertyContext: string;
  cityOrZip: string;
  projectDescription: string;
  approximateSize: string;
  projectStage: string;
  desiredTimeframe: string;
  approximateBudget: string;
  fullName: string;
  preferredContactMethod: string;
  email: string;
  phone: string;
  companyName: string;
  acknowledgeProjectContact: boolean;
  marketingConsent: boolean;
  deliveryAdapterStatus: 'stored_local_durable' | 'forwarded_webhook_and_stored';
}

async function appendDurableLead(record: StoredLeadRecord): Promise<void> {
  let existing: StoredLeadRecord[] = [];
  try {
    const raw = await fs.readFile(DURABLE_LEADS_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch {
    existing = [];
  }
  existing.push(record);
  await fs.writeFile(DURABLE_LEADS_PATH, JSON.stringify(existing, null, 2), 'utf8');
}

export async function POST(req: NextRequest) {
  try {
    const now = Date.now();
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : 'local-client';

    // Clean up expired rate-limit entries
    const prevTimestamps = (ipSubmissionTimestamps.get(clientIp) || []).filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );

    if (prevTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      return NextResponse.json(
        {
          accepted: false,
          error:
            'Too many requests have been submitted from this connection recently. Please wait a few minutes before trying again.',
        },
        { status: 429 }
      );
    }

    const body = (await req.json()) as EstimateFormState;
    const validation = validateFullEstimatePayload(body);

    // If honeypot was triggered by an automated bot, reject quietly
    if (validation.isSpamHoneypot) {
      return NextResponse.json(
        {
          accepted: false,
          error: 'Unable to process request.',
        },
        { status: 400 }
      );
    }

    if (!validation.valid) {
      return NextResponse.json(
        {
          accepted: false,
          error: 'Please review the highlighted fields and complete all required project details.',
          fieldErrors: validation.errors,
        },
        { status: 422 }
      );
    }

    // Prevent accidental duplicate double-submits
    const fingerprint = computeSubmissionFingerprint(body);
    const lastSubmittedAt = recentFingerprints.get(fingerprint);
    if (lastSubmittedAt && now - lastSubmittedAt < DUPLICATE_WINDOW_MS) {
      return NextResponse.json(
        {
          accepted: false,
          error:
            'We already received this exact project request a moment ago. Novus Construction Inc. will review your details and follow up.',
        },
        { status: 409 }
      );
    }

    const inferredContext = inferPropertyContext(body.projectType);
    const effectiveContext = body.propertyContext || inferredContext || 'Residential';
    const leadId = `NOV-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const receivedAtIso = new Date(now).toISOString();

    // Formspree / Webhook Delivery (Required when leadDeliveryMode === 'webhook_crm')
    const endpointUrl = getActiveFormspreeEndpoint();
    const formspreePayload = buildFormspreeEstimatePayload(body, leadId, receivedAtIso);
    const formspreeResult = await submitToFormspree(endpointUrl, formspreePayload);

    if (!formspreeResult.ok) {
      return NextResponse.json(
        {
          accepted: false,
          error: `Our form delivery service could not accept your request right now. Your entries have been preserved—please try again, call ${BUSINESS_CONFIG.contact.phoneDisplay}, or email ${BUSINESS_CONFIG.contact.email}.`,
        },
        { status: 502 }
      );
    }

    const deliveryStatus: StoredLeadRecord['deliveryAdapterStatus'] = 'forwarded_webhook_and_stored';

    const leadRecord: StoredLeadRecord = {
      leadId,
      receivedAtIso,
      projectType: body.projectType,
      propertyContext: effectiveContext,
      cityOrZip: body.cityOrZip.trim(),
      projectDescription: body.projectDescription.trim(),
      approximateSize: (body.approximateSize || '').trim(),
      projectStage: body.projectStage || 'Planning',
      desiredTimeframe: body.desiredTimeframe || 'Flexible',
      approximateBudget: body.approximateBudget || 'Not sure yet',
      fullName: body.fullName.trim(),
      preferredContactMethod: body.preferredContactMethod,
      email: (body.email || '').trim(),
      phone: (body.phone || '').trim(),
      companyName: (body.companyName || '').trim(),
      acknowledgeProjectContact: Boolean(body.acknowledgeProjectContact),
      marketingConsent: Boolean(body.marketingConsent),
      deliveryAdapterStatus: deliveryStatus,
    };

    try {
      await appendDurableLead(leadRecord);
    } catch {
      // Non-fatal if container /tmp is read-only; Formspree already confirmed acceptance
    }

    // Record rate-limit and fingerprint state only after Formspree confirms acceptance
    prevTimestamps.push(now);
    ipSubmissionTimestamps.set(clientIp, prevTimestamps);
    recentFingerprints.set(fingerprint, now);

    return NextResponse.json(
      {
        accepted: true,
        leadId,
        receivedAtIso: leadRecord.receivedAtIso,
        deliveryMode: deliveryStatus,
        confirmationMessage:
          'Thank you. Your project request has been received. Novus Construction Inc. will review the details and contact you about next steps.',
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        accepted: false,
        error:
          'We were unable to submit your project request right now. Your form entries have been kept intact—please try submitting again.',
      },
      { status: 500 }
    );
  }
}
