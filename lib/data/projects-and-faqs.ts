export type ProjectFilterCategory =
  | 'All'
  | 'ADU & Additions'
  | 'Interior Remodels'
  | 'Commercial'
  | 'Trades & Structural';

export interface ProjectEvidenceItem {
  slug: string;
  title: string;
  filterCategory: Exclude<ProjectFilterCategory, 'All'>;
  projectTypeLabel: string;
  city: string;
  serviceSlug: string;
  /**
   * Truthfulness flag: When true, the UI explicitly labels the card and detail view
   * as an "Illustrative Scope Study" (Sample Architectural Representation) and sets
   * noindex metadata until replaced by owner-approved completed project photography.
   */
  isIllustrativePreview: boolean;
  imagePath: string;
  imageAlt: string;
  conciseScope: string;
  clientGoal: string;
  initialConditions: string;
  actualScope: string[];
  constructionConsiderations: string[];
  outcomeSummary: string;
}

export const PROJECT_ITEMS: ProjectEvidenceItem[] = [
  {
  slug: 'corona-primary-home-remodel',
  title: 'Corona Primary Residence Remodel & Exterior Transformation',
  filterCategory: 'Trades & Structural',
  projectTypeLabel: 'Residential Exterior Remodeling & Painting',
  city: 'Corona, CA',
  serviceSlug: 'home-remodeling',
  isIllustrativePreview: false,
  imagePath: '/images/Corona_Exterior_Paint.jpg',
  imageAlt:
    'Two-story Corona residence featuring contemporary gray stucco, contrasting navy blue garage doors and window shutters, decorative stone accents, and a multi-level tile roof.',
  conciseScope:
    'Residential exterior improvement project focused on architectural painting, stucco finish restoration, coordinated color schemes, garage door refinishing, and detailed exterior trim work to enhance the home’s curb appeal while preserving its existing architectural character.',
  clientGoal:
    'Modernize the appearance of an established two-story residence through a cohesive exterior color palette and refreshed architectural finishes. Create a sophisticated, contemporary appearance that complements the home’s existing stone veneer, tile roofing, landscaping, and prominent architectural features while maintaining the character of the original residence.',
  initialConditions:
    'Existing two-story Southern California residence featuring a cement stucco exterior, decorative stone veneer, multiple intersecting rooflines, architectural window shutters, and a three-car garage configuration. The property includes mature landscaping, established concrete walkways, and an expansive driveway. The exterior incorporates multiple surface materials and architectural transitions requiring careful protection and detailed finish coordination.',
  actualScope: [
    'Evaluate existing exterior stucco surfaces, architectural trim, fascia boards, shutters, and garage door finishes to identify areas requiring preparation or corrective work.',
    'Perform exterior surface preparation, including cleaning, scraping loose or deteriorated coatings, sanding applicable surfaces, and addressing minor surface imperfections prior to painting.',
    'Prepare and refinish exterior stucco surfaces using a coordinated contemporary color palette designed to complement the residence’s existing architectural elements.',
    'Apply contrasting dark architectural finishes to garage doors, decorative window shutters, and selected exterior accents to create visual depth and definition.',
    'Detail exterior fascia, window trim, architectural projections, and exposed decorative elements to maintain consistent finish quality and clean transitions between materials.',
    'Protect existing decorative stone veneer, roofing materials, windows, exterior lighting, concrete driveway, walkways, and landscaping throughout painting operations.',
    'Perform final coating touch-ups, inspect visible finish transitions, remove protective coverings, and complete exterior cleanup.'
  ],

  constructionConsiderations: [
    'Two-story elevations and multiple rooflines require appropriate access equipment and careful sequencing for safe, consistent application of exterior finishes.',
    'Existing decorative stone veneer and concrete surfaces require detailed masking and protection to prevent overspray, paint transfer, or damage during surface preparation.',
    'Multiple architectural materials, including stucco, painted wood or composite trim, garage doors, and decorative shutters, may require different preparation methods and compatible coating systems.',
    'Exterior painting activities must account for Southern California temperature fluctuations, direct sunlight, wind conditions, and manufacturer-recommended application requirements.',
    'Color transitions between primary stucco surfaces, dark garage doors, shutters, and lighter architectural trim require careful layout and finish detailing to maintain a cohesive appearance.',
    'Existing mature landscaping and driveway access should be protected and accommodated throughout project operations.'
  ],

  outcomeSummary:
    'This Corona residential exterior project highlights the importance of coordinated architectural finishes, thoughtful color selection, and detailed surface preparation in transforming a home’s visual appearance. The design emphasizes contemporary gray stucco, contrasting navy architectural accents, and the preservation of existing stonework and roof finishes. The project represents the exterior remodeling and finish-detailing capabilities that Novus Construction Inc. brings to residential improvements throughout Southern California.'
  },
  {
    slug: 'jurupa-valley-primary-suite-addition-study',
    title: 'Single-Story Primary Suite & Framing Tie-In Addition',
    filterCategory: 'ADU & Additions',
    projectTypeLabel: 'Home Addition & Framing',
    city: 'Jurupa Valley, CA',
    serviceSlug: 'home-additions',
    isIllustrativePreview: false,
    imagePath: '/images/Jurupa_Valley_Addition.jpg',
    imageAlt: 'Illustrative architectural diagram of structural framing and engineered beam tie-in for a residential room addition',
    conciseScope:
      'Dowel-in concrete foundation, engineered PSL beam install, roof valley framing integration, exterior stucco blending, and primary bathroom build-out.',
    clientGoal:
      'Expand a single-story floor plan at the side elevation to add a spacious primary bedroom, walk-in closet, and modern tile bathroom.',
    initialConditions:
      'Occupied residence requiring temporary weather and dust isolation at the existing exterior bearing wall while the new shell is constructed.',
    actualScope: [
      'Excavation and epoxy-doweled concrete stem wall and slab extension tied to the existing house footing.',
      'Installation of an engineered psl beam to create a cathedral style ceiling.',
      'Roof framing over-framed and woven into the existing hip roof with new valley flashing and matching roof shingles.',
      'Lath and stucco carried to natural corner breaks to blend new and existing exterior planes.',
    ],
    constructionConsiderations: [
      'Completing the new foundation, framing, roof dry-in, and exterior lath before opening the interior house wall minimizes disruption for the family.',
      'Careful subfloor and slab elevation matching eliminates any trip hazard between the original hallway and new suite.',
    ],
    outcomeSummary:
      'Illustrates how structural additions are phased to protect occupied living spaces while achieving flush roof, stucco, and drywall transitions.',
  },
  {
    slug: 'corona-kitchen-remodel-study',
    title: 'Kitchen Remodel',
    filterCategory: 'Interior Remodels',
    projectTypeLabel: 'Kitchen Remodeling',
    city: 'Corona, CA',
    serviceSlug: 'kitchen-remodeling',
    isIllustrativePreview: false,
    imagePath: '/images/Corona_Kitchen_Remodel.jpg',
    imageAlt: 'Remodeled kitchen in Corona, CA with white shaker cabinetry, granite waterfall island, and travertine tile flooring',
    conciseScope:
      'Old kitchen demolition, new electtrical wiring for led lighting, RTA white shaker cabinetry installation, granite island coordination, and continuous travertine tile flooring.',
    clientGoal:
      'Replace a compartmentalized kitchen with a cohesive, well-lit kitchen island layout and uniform flooring.',
    initialConditions:
      'Closed kitchen soffits, uneven tile flooring transitions, and water leaks at the sink and dishwasher connections.',
    actualScope: [
      'Zippered dust containment, selective demolition of dropped soffits, cabinets, and drywall.',
      'Framing corrections and stud planing to ensure plumb, square corners for cabinetry and stone templating.',
      'Coordination of recessed lighting layout, dedicated appliance circuits, island electrical rough-ins, and exterior range hood ducting.',
      'Installation of rta white shaker cabinetry, waterfall granite countertops, full-height backsplash, travertine tile flooring, and new lighting fixtures and led strips.',
    ],
    constructionConsiderations: [
      'Verifying appliance specifications prior to rough framing prevents electrical box or gas valve conflicts during cabinet set.',
    ],
    outcomeSummary:
      'Highlights the coordination between rough framing accuracy, drywall flatness, and finish carpentry required for high-tolerance kitchen remodels.',
  },
  {
    slug: 'slice-house-restaurant-renovation-study',
    title: 'Restaurant Renovation and Improvement',
    filterCategory: 'Commercial',
    projectTypeLabel: 'Commercial Tenant Improvements',
    city: 'Fountain Valley, CA',
    serviceSlug: 'commercial-tenant-improvements',
    isIllustrativePreview: false,
    imagePath: '/images/SliceHouse_Renovation.png',
    imageAlt: 'Slice House restaurant commercial tenant improvement and interior renovation in Fountain Valley, CA',
    conciseScope:
      'Selective demolition, metal stud framing, drywall assemblies, T-bar ceiling integration, commercial doors/hardware, brick veneer and subway tile installation, and Interior Paint.',
    clientGoal:
      'Reconfigure a previous "Fire Wings" into a "Slice House", new modern aesthetic, a up to date kitchen/ovens, and a welcoming dining area.',
    initialConditions:
      'Old restaurant requiring coordinated material deliveries, up to code facilities, and adherence to landlord building rules.',
    actualScope: [
      'Pre-construction site walk, layout verification from architectural plans, and select finish materials.',
      'Demolition of outdated partitions and finishes.',
      'Interior framing with acoustic sound batt insulation, solid backing for wall-mounted monitors and kitchen appliances,',
      'Drywall hanging, taping, and smooth commercial finish alongside acoustical ceiling grid restoration.',
      'Installation of solid-core wood commercial doors, ADA lever hardware, closers, custom reception slat millwork, and brick veener and subway tile installation.',
    ],
    constructionConsiderations: [
      'Early verification of above-ceiling plenum conditions avoids conflicts between full-height sound partitions and existing HVAC ductwork.',
    ],
    outcomeSummary:
      'Demonstrates organized commercial improvement execution—balancing plan compliance, and clean finish details.',
  },
  {
    slug: 'corona-primary-bath-finish-carpentry-study',
    title: 'Primary Bathroom Waterproofing, Tile & Custom Millwork',
    filterCategory: 'Interior Remodels',
    projectTypeLabel: 'Bathroom Remodeling & Finish Carpentry',
    city: 'Corona, CA',
    serviceSlug: 'bathroom-remodeling',
    isIllustrativePreview: false,
    imagePath: '/images/Corona_Bathroom_Remodel.jpg',
    imageAlt: 'Remodeled primary bathroom in Corona, CA with travertine tile shower, freestanding tub, and custom glass enclosure',
    conciseScope:
      'Stud-level demolition, shower pan waterproofing, travertine tile installation, free standing tub, and custom glass shower door.',
    clientGoal:
      'Replace an aging fiberglass tub/shower and builder-grade shower door with a free standing tub travertine tile shower.',
    initialConditions:
      'Moisture-damaged drywall around the existing tub apron, and out-of-plumb framing on the wet wall.',
    actualScope: [
      'Removal of old fixtures and drywall down to bare framing; replacement of moisture-damaged bottom plates and installation of solid wood blocking.',
      'Rough plumbing upgrade for thermostatic shower valve.',
      'Sloped mortar bed shower pan, continuous waterproof membrane, flood testing, and backer board installation.',
      'Centered layout and setting of travertine wall and floor tile with mitered niche returns.',
      'Installation of custom glass shower door, free standing bathttub, and Shower 6-Spray Dual Ceiling Mount Fixed and Handheld Shower Head.',
    ],
    constructionConsiderations: [
      'Truing and shimming every stud on the shower walls before cement board installation ensures zero tile lippage and a tight glass-to-tile seal.',
      'Niche height and width are calculated from actual tile dimensions so horizontal grout lines carry uninterrupted through the niche.',
    ],
    outcomeSummary:
      'Shows how disciplined substrate preparation and waterproofing protect the structure while delivering crisp tile and carpentry sightlines.',
  },
  {
    slug: 'torrance-kitchen-remodel-study',
    title: 'Structural Framing, Kitchen Cabinets & Countertops',
    filterCategory: 'Interior Remodels',
    projectTypeLabel: 'Kitchen Remodeling',
    city: 'Torrance, CA',
    serviceSlug: 'framing',
    isIllustrativePreview: false,
    imagePath: '/images/Torrance_Kitchen_Remodel.png',
    imageAlt: 'Illustrative diagram of structural framing, weather barrier, and exterior stucco envelope assemblies',
    conciseScope:
      'Structural wall and PSL Beam framing, Pad Footings, cabinet assembly and installation, .',
    clientGoal:
      'Replace a compartmentalized kitchen with a cohesive, well-lit kitchen island layout and uniform flooring.',
    initialConditions:
      'Requires new pad footings strong enought to hold up 2 PSL beams to achieve the open kitchen design.',
    actualScope: [
      'Form and pour three pad footings.',
      'Frame in three new posts to support two new PSL Beams.',
      'Assemble and install new RTA cabinets and skin with white oak faces and sides.',
      'Install new flooring to have a uniformed look.',
    ],
    constructionConsiderations: [
      'Verifying appliance specifications prior to rough framing prevents electrical box or gas valve conflicts during cabinet set.',
    ],
    outcomeSummary:
      'Demonstrates the advantage of integrated construction trade capabilities across framing, plumbing, drywall, and finish carpentry.',
  },
];

export const WHY_NOVUS_COMMITMENTS = [
  {
    number: '01',
    title: 'Clear Scope & Documented Expectations',
    description:
      'Every project begins with a written scope of work that clarifies inclusions, exclusions, material allowances, and division responsibilities before construction starts.',
  },
  {
    number: '02',
    title: 'Careful Coordination of Construction Phases',
    description:
      'From underground utilities and structural framing to drywall, stucco, and finish carpentry, we sequence trades methodically so each phase builds on a sound substrate.',
  },
  {
    number: '03',
    title: 'Attention to Structural Work & Finish Details',
    description:
      'Straight framing, proper waterproofing, and flat drywall are what make tight cabinet reveals, flush tile work, and crisp trim carpentry possible.',
  },
  {
    number: '04',
    title: 'Proactive Communication on Decisions & Changes',
    description:
      'When owner selections are needed or concealed conditions are uncovered during demolition, we communicate options clearly and document changes in writing before proceeding.',
  },
  {
    number: '05',
    title: 'A Defined Walkthrough & Closeout Process',
    description:
      'We conclude every project with a structured room-by-room walkthrough, punch-list completion, and clear handoff of project closeout details.',
  },
];

export const CORE_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Share Your Project',
    summary:
      'Tell us what you are planning—whether an ADU, home addition, remodel, trade scope, or commercial tenant improvement—along with your city, approximate timeline, and whether you have plans.',
    deliverable: 'Initial project fit review and scheduling of next steps.',
  },
  {
    step: '02',
    title: 'Review the Scope and Site Conditions',
    summary:
      'We review your architectural or structural drawings (or discuss your scope goals) and evaluate site access, existing structural conditions, utility tie-ins, and finish expectations.',
    deliverable: 'Verified site assessment and scope alignment.',
  },
  {
    step: '03',
    title: 'Receive a Detailed Proposal',
    summary:
      'We prepare a clear, itemized written proposal outlining the construction scope, phasing, material allowances, and what is included or excluded so you can make an informed decision.',
    deliverable: 'Written construction proposal and scope breakdown.',
  },
  {
    step: '04',
    title: 'Coordinate and Build',
    summary:
      'Once the construction agreement is executed, we establish site protection, manage the schedule across framing, rough systems, exterior envelope, and interior finishes, and document any approved changes in writing.',
    deliverable: 'Sequenced construction execution and regular progress updates.',
  },
  {
    step: '05',
    title: 'Walk Through and Close Out',
    summary:
      'As finishes are completed, we inspect the work together against the agreed scope, complete any final punch-list items, and leave the jobsite clean and ready for use.',
    deliverable: 'Final walkthrough verification and project closeout.',
  },
];

export const HOMEPAGE_FAQS = [
  {
    question: 'What types of construction projects does Novus Construction Inc. handle?',
    answer:
      'We serve both residential and commercial clients. Our residential work includes ADU construction (detached units, attached units, and garage conversions), home additions, full-home remodeling, kitchen remodeling, and bathroom remodeling. For commercial clients, we execute tenant improvements and interior build-outs. We also perform core construction trades including framing, drywall, stucco, roofing, and finish carpentry.',
  },
  {
    question: 'Which areas of Southern California do you serve?',
    answer:
      'Our primary local focus is Riverside, Jurupa Valley, and the surrounding Inland Empire—including Corona, Norco, Eastvale, Moreno Valley, Ontario, Rancho Cucamonga, Upland, Redlands, Chino Hills, and Temecula. We also consider broader Southern California residential and commercial projects based on project scope and schedule availability.',
  },
  {
    question: 'How do you prepare an estimate, and what details should I share?',
    answer:
      'To prepare an accurate proposal, we start with your project type, city or ZIP code, a brief description of the work, and whether you already have architectural or structural plans. After an initial review, we schedule a site visit and plan review to inspect existing conditions and discuss finish expectations before preparing a written proposal.',
  },
  {
    question: 'Do I need completed architectural plans and permits before contacting you?',
    answer:
      'No—you can contact us whether you already have permitted plans or are still planning your scope. For structural projects like ADUs, home additions, and commercial tenant improvements, permitted architectural and structural drawings are required before construction begins and allow for the most exact pricing. Design responsibilities, engineering, and permit processing are defined by each individual project agreement.',
  },
  {
    question: 'What factors have the biggest impact on construction budget and timeline?',
    answer:
      'Key scope drivers include whether the project involves structural layout or foundation work versus updating finishes in place, underground utility trenching distances, site access and staging constraints, whether the property is occupied during construction, municipal inspection milestones, and the lead times and grades of selected finishes (such as custom cabinetry, stone, tile, and windows).',
  },
  {
    question: 'Can you remodel an occupied home or active commercial building?',
    answer:
      'Yes. When working in an occupied residence or multi-tenant commercial property, we plan phased work zones, install dust containment barriers and floor protection, maintain organized material staging, and coordinate work hours and utility shutoffs in advance.',
  },
  {
    question: 'How do you handle unforeseen site conditions or requested changes during construction?',
    answer:
      'Remodeling and additions occasionally uncover concealed conditions once walls or slabs are opened, and owners sometimes choose to adjust finishes or scope mid-project. Whenever a change arises, we document the scope adjustment and cost or schedule impact in a written change order for approval before performing the work.',
  },
  {
    question: 'How do commercial clients request a Tenant Improvement (TI) proposal?',
    answer:
      'Commercial property owners, tenants, and project managers can select Commercial Tenant Improvements in our online estimate request form. Let us know the building city, approximate square footage, target schedule, and whether architectural TI plans are ready for review.',
  },
];
