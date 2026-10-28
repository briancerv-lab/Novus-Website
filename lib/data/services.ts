export type ServiceCategory = 'Residential' | 'Commercial' | 'Construction Trades';

export interface ServiceProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  featuredOnHome: boolean;
  indexNumber: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSummary: string;
  imagePath: string;
  imageAlt: string;
  whoItIsFor: string[];
  problemsAddressed: string[];
  typicalScope: string[];
  scopeNote: string;
  scopeDrivers: {
    factor: string;
    explanation: string;
  }[];
  processSteps: ServiceProcessStep[];
  faqs: ServiceFAQ[];
  relatedServiceSlugs: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: 'adu-construction',
    title: 'ADU Construction',
    shortTitle: 'ADU Construction',
    category: 'Residential',
    featuredOnHome: true,
    indexNumber: '01',
    h1: 'ADU Construction in Southern California',
    metaTitle: 'ADU Construction in Riverside & Southern California | Novus Construction Inc.',
    metaDescription:
      'Detached ADUs, attached accessory dwelling units, and garage conversions in Riverside, Jurupa Valley, and Southern California. Clear scopes and organized execution.',
    heroSummary:
      'Well-executed accessory dwelling units require careful site planning, utility trenching coordination, structural framing, and complete interior build-out. Novus Construction Inc. builds detached ADUs, attached units, and garage conversions from approved plans.',
    imagePath: '/images/hero-socal-architecture.svg',
    imageAlt: 'Architectural illustration of a detached Southern California accessory dwelling unit and main residence',
    whoItIsFor: [
      'Homeowners creating independent living space for multi-generational family members on an existing residential lot.',
      'Property owners and residential investors adding long-term rental housing or backyard studio units.',
      'Homeowners converting underutilized attached or detached garages into permitted living quarters.',
    ],
    problemsAddressed: [
      'Navigating tight side-yard access, staging constraints, and trenching routes on established Southern California lots.',
      'Coordinating sewer tie-ins, water service sizing, and electrical subpanel capacity with the main structure.',
      'Sequencing foundation, framing, roofing, stucco, and compact kitchen/bath finishes under a single organized construction schedule.',
    ],
    typicalScope: [
      'Site preparation, grading adjustments, trenching, and concrete foundation or slab reinforcement as specified by plans.',
      'Structural wood framing, shear wall installation, roof framing, and exterior window and door installation.',
      'Coordination of rough plumbing, electrical, and mechanical systems in accordance with approved plans and project agreements.',
      'Exterior weatherproofing, lath and stucco systems, roofing assembly, and exterior trim transitions.',
      'Drywall, insulation, interior doors, finish carpentry, cabinetry, tile work, and fixture installation through final walkthrough.',
    ],
    scopeNote:
      'Architectural design, structural engineering, Title 24 energy calculations, utility agency fees, and municipal permit approvals are governed by the specific project agreement and existing plan status.',
    scopeDrivers: [
      {
        factor: 'ADU Structure Type (Detached vs. Attached vs. Conversion)',
        explanation:
          'New detached structures require full foundations, roof systems, and longer utility runs, whereas garage conversions depend heavily on existing slab condition, footing depth, and framing integrity.',
      },
      {
        factor: 'Utility Connections & Trenching Distance',
        explanation:
          'Distance to the main sewer lateral, water meter capacity, electrical panel upgrades, and whether hardscape must be sawcut and restored significantly influence site costs.',
      },
      {
        factor: 'Lot Access & Staging Conditions',
        explanation:
          'Narrow side setbacks, hillside slopes, overhead lines, or restricted concrete and lumber delivery access affect labor and equipment planning.',
      },
      {
        factor: 'Jurisdiction & Plan Requirements',
        explanation:
          'Fire sprinkler mandates, solar readiness, setback rules, and utility district requirements vary across Riverside, Jurupa Valley, and neighboring Southern California municipalities.',
      },
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Plan & Site Condition Review',
        description:
          'We evaluate your architectural and structural drawings—or discuss your current planning stage—and inspect lot access, existing utilities, and grade conditions.',
      },
      {
        stepNumber: '02',
        title: 'Detailed Construction Proposal',
        description:
          'We prepare a written scope breaking down sitework, structural phases, exterior envelope, rough trades, and finish allowances so expectations are clear before construction.',
      },
      {
        stepNumber: '03',
        title: 'Underground Utilities & Foundation',
        description:
          'Trenching for sewer, water, and electrical conduits is completed alongside footing excavation, rebar placement, and concrete slab or stem-wall pours.',
      },
      {
        stepNumber: '04',
        title: 'Framing, Envelope & Rough Inspections',
        description:
          'We frame the structure, dry-in the roof and exterior openings, coordinate rough mechanical/electrical/plumbing stages, and complete municipal rough inspections.',
      },
      {
        stepNumber: '05',
        title: 'Interior Finishes & Final Closeout',
        description:
          'Insulation, drywall, stucco, kitchen and bathroom cabinetry, flooring, and trim are completed, followed by a detailed walkthrough and closeout documentation.',
      },
    ],
    faqs: [
      {
        question: 'Do I need completed architectural plans before requesting an ADU estimate?',
        answer:
          'Having permitted or near-final architectural and structural plans allows us to prepare the most accurate construction proposal. If you are still in the planning stage, you can share your lot details and goals so we can discuss feasibility and next steps.',
      },
      {
        question: 'What is the difference in construction scope between a garage conversion and a detached ADU?',
        answer:
          'A detached ADU is built from the ground up with new foundations, framing, roofing, and extended utility trenches. A garage conversion reuses the existing footprint where structurally sound, focusing on slab moisture protection, wall framing upgrades, insulation, and new utility tie-ins.',
      },
      {
        question: 'How do you handle construction access when the ADU is in a backyard?',
        answer:
          'During our site review, we measure side-yard gate clearances, identify material staging zones, and plan how concrete, lumber, and debris will move through the property while protecting occupied main-house areas.',
      },
      {
        question: 'Are city permit fees and utility connection charges included in construction proposals?',
        answer:
          'Municipal permit fees, school district fees, and utility agency fees are typically paid directly by the property owner to the governing agencies, unless specifically listed as an allowance in the written project agreement.',
      },
    ],
    relatedServiceSlugs: ['home-additions', 'framing', 'stucco', 'full-home-remodeling'],
  },
  {
    slug: 'home-additions',
    title: 'Home Additions',
    shortTitle: 'Home Additions',
    category: 'Residential',
    featuredOnHome: true,
    indexNumber: '02',
    h1: 'Home Additions & Structural Expansions in Southern California',
    metaTitle: 'Home Additions in Riverside & Inland Empire | Novus Construction Inc.',
    metaDescription:
      'Room additions, primary suite expansions, and structural home additions in Southern California. Seamless foundation, framing, roofline, and stucco transitions.',
    heroSummary:
      'A successful home addition looks and performs as though it was always part of the original structure. We focus on clean structural tie-ins, weather-tight roof transitions, matching exterior stucco, and cohesive interior flow.',
    imagePath: '/images/structural-framing.svg',
    imageAlt: 'Architectural diagram of structural timber framing and engineered beam tie-ins for a residential addition',
    whoItIsFor: [
      'Homeowners expanding a primary bedroom suite, family room, or home office without relocating.',
      'Families needing additional bedrooms, bathrooms, or expanded kitchen-living footprints.',
      'Property owners extending single-story footprints or reconfiguring structural load paths.',
    ],
    problemsAddressed: [
      'Connecting new concrete foundations and wood framing to existing structures without settling cracks or misaligned planes.',
      'Integrating new roof framing and waterproofing cleanly into existing gables, hips, or parapets.',
      'Matching exterior stucco textures and interior drywall finishes so the transition between old and new is seamless.',
    ],
    typicalScope: [
      'Selective demolition at the tie-in wall and temporary dust/weather protection for occupied living spaces.',
      'Excavation, dowel-in foundation work, concrete footings, and slab or raised-floor framing.',
      'Structural wall and roof framing, including engineered beams and posts where existing exterior walls are opened.',
      'Roofing tie-in, exterior sheathing, weather-resistive barrier, and three-coat or matching stucco finishes.',
      'Interior drywall, insulation, finish carpentry, flooring integration, and room completion.',
    ],
    scopeNote:
      'Structural engineering, soils reports, architectural plans, and specialty trade scopes are defined by the individual contract documents.',
    scopeDrivers: [
      {
        factor: 'Structural Tie-In & Roofline Complexity',
        explanation:
          'Removing an existing exterior load-bearing wall requires temporary shoring and engineered headers or steel beams, and complex roof intersections require careful framing and flashing.',
      },
      {
        factor: 'Wet Rooms vs. Dry Living Space',
        explanation:
          'Adding a bedroom or family room involves simpler rough-in requirements than a primary suite or kitchen expansion that requires new drain waste/vent slopes and supply plumbing.',
      },
      {
        factor: 'Existing Structure Conditions',
        explanation:
          'Older homes may present out-of-level floors, non-standard framing dimensions, or electrical panels that require upgrading to support the expanded square footage.',
      },
      {
        factor: 'Exterior & Interior Finish Matching',
        explanation:
          'Blending new stucco, roof tiles or shingles, baseboards, and flooring into adjacent rooms often involves feathering or continuing materials to natural architectural break points.',
      },
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Existing Structure & Plan Evaluation',
        description:
          'We verify how the planned addition connects to your current foundation, bearing walls, roofline, and utility systems.',
      },
      {
        stepNumber: '02',
        title: 'Scope Definition & Phasing Plan',
        description:
          'We outline the construction sequence, including when the existing exterior wall will remain closed and when the opening will be breached.',
      },
      {
        stepNumber: '03',
        title: 'Foundation & Structural Shell',
        description:
          'We build the new foundation, frame the walls and roof, and dry-in the exterior shell before opening the main living area whenever layout permits.',
      },
      {
        stepNumber: '04',
        title: 'Structural Breakthrough & Systems Integration',
        description:
          'Temporary barriers protect your home while structural headers are installed and mechanical, electrical, and plumbing lines are extended.',
      },
      {
        stepNumber: '05',
        title: 'Stucco, Drywall & Finish Alignment',
        description:
          'Exterior stucco and roofing are blended at the tie-in, interior finishes are completed, and the space is walked through for closeout.',
      },
    ],
    faqs: [
      {
        question: 'Can we stay in our home while a room addition is being built?',
        answer:
          'In many perimeter additions, we can complete the new foundation, framing, and exterior shell before opening the connecting wall to your existing house. Dust containment barriers and clear work hours help reduce disruption while the tie-in is completed.',
      },
      {
        question: 'How do you prevent a visible seam where the new addition meets the old house?',
        answer:
          'Proper foundation doweling, careful framing alignment, lath overlap, and floating stucco or drywall to natural corner breaks help minimize telegraphing seams.',
      },
      {
        question: 'Do additions require structural engineering?',
        answer:
          'Yes. Municipal building departments in Southern California require stamped structural calculations and plans for room additions to verify foundation sizing, shear walls, and roof loads.',
      },
      {
        question: 'What if we discover rot or unpermitted work when opening the existing wall?',
        answer:
          'If concealed framing damage or non-compliant wiring is uncovered during demolition, we document the condition with photos, explain the required correction, and issue a written change order for approval before proceeding.',
      },
    ],
    relatedServiceSlugs: ['adu-construction', 'framing', 'stucco', 'roofing'],
  },
  {
    slug: 'full-home-remodeling',
    title: 'Full Home Remodeling',
    shortTitle: 'Full Home Remodeling',
    category: 'Residential',
    featuredOnHome: true,
    indexNumber: '03',
    h1: 'Full Home Remodeling in Southern California',
    metaTitle: 'Full Home Remodeling in Riverside & Southern California | Novus Construction Inc.',
    metaDescription:
      'Coordinated whole-home remodeling and multi-room renovations in Southern California. Structured sequencing, clear finish schedules, and dependable craftsmanship.',
    heroSummary:
      'Remodeling multiple rooms or an entire home requires disciplined sequencing so structural changes, rough utilities, drywall, cabinetry, and finish carpentry happen in the right order without costly rework.',
    imagePath: '/images/residential-remodel.svg',
    imageAlt: 'Architectural interior illustration of a full-home remodel featuring open living space, oak millwork, and natural light',
    whoItIsFor: [
      'Homeowners modernizing a newly purchased property before moving in.',
      'Long-term owners updating dated floor plans, kitchens, bathrooms, flooring, and trim across the entire residence.',
      'Residential investors executing comprehensive value-add renovations with defined finish schedules.',
    ],
    problemsAddressed: [
      'Preventing schedule bottlenecks when kitchen, bathroom, flooring, drywall, and trim scopes overlap.',
      'Removing or modifying interior partitions safely in accordance with structural framing requirements.',
      'Maintaining consistent floor elevations, trim reveals, door alignments, and drywall finish quality from room to room.',
    ],
    typicalScope: [
      'Whole-house or multi-room selective demolition, surface protection, and debris removal.',
      'Interior framing modifications, structural beam installations (per approved engineering), and doorway reconfigurations.',
      'Coordination of rough electrical, plumbing, lighting layout updates, and HVAC register adjustments as defined by scope.',
      'Drywall installation, repair, taping, and consistent texture or smooth-wall finishing.',
      'Kitchen and bathroom build-outs, cohesive flooring installation, interior doors, baseboards, casing, and final punch-list completion.',
    ],
    scopeNote:
      'Specific trade scopes, fixture procurement responsibilities, and engineering requirements are documented in the project proposal and contract.',
    scopeDrivers: [
      {
        factor: 'Structural Layout Changes vs. Pull-and-Replace',
        explanation:
          'Keeping kitchens, baths, and walls in their existing locations streamlines rough-ins, while relocating wet walls or removing bearing partitions adds engineering, trenching, and framing scope.',
      },
      {
        factor: 'Occupied vs. Vacant Property Logistics',
        explanation:
          'Remodeling an unoccupied home allows all zones to be demolished and framed simultaneously; occupied homes require phased zone isolation, temporary facilities, and daily containment.',
      },
      {
        factor: 'Finish Level & Material Lead Times',
        explanation:
          'Level 5 smooth drywall, custom millwork, large-format stone, and specialty plumbing fixtures require earlier procurement and more detailed substrate preparation.',
      },
      {
        factor: 'Condition of Existing Subfloors & Framing',
        explanation:
          'Once old flooring and drywall are removed, subfloor leveling or framing sistering may be needed to achieve flat walls and flush floor transitions.',
      },
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Comprehensive Scope & Selection Alignment',
        description:
          'We walk the property room by room to establish the exact demolition boundaries, structural modifications, and finish schedule.',
      },
      {
        stepNumber: '02',
        title: 'Sequencing & Protection Setup',
        description:
          'We establish material staging areas, protect retained architectural elements, and map the critical path for long-lead items like cabinetry and windows.',
      },
      {
        stepNumber: '03',
        title: 'Demolition, Framing & Rough Systems',
        description:
          'Interior partitions are framed, structural headers are set, and rough plumbing, electrical, and mechanical adjustments are inspected.',
      },
      {
        stepNumber: '04',
        title: 'Drywall, Surfaces & Millwork Installation',
        description:
          'Walls and ceilings are closed and finished, followed by tile waterproofing, cabinetry installation, countertops, flooring, and finish carpentry.',
      },
      {
        stepNumber: '05',
        title: 'Fixture Trim-Out & Detailed Walkthrough',
        description:
          'Hardware, plumbing trim, lighting fixtures, and paint touch-ups are completed and verified against our room-by-room closeout checklist.',
      },
    ],
    faqs: [
      {
        question: 'Is it better to remodel the whole house at once or in phases?',
        answer:
          'Completing a full remodel in one continuous sequence is generally more efficient because demolition, framing, drywall, and flooring trades mobilize once rather than multiple times. However, phased remodeling can be planned when occupancy or budget timing requires it.',
      },
      {
        question: 'When do we need to finalize our tile, cabinetry, and plumbing fixture selections?',
        answer:
          'Rough-in valves, appliance specifications, and cabinetry dimensions should be finalized before demolition and framing so blocking, drain locations, and electrical circuits are placed accurately the first time.',
      },
      {
        question: 'Can you remove a wall between our kitchen and living room?',
        answer:
          'Yes. When a wall is load-bearing, we work from approved structural engineering plans to install temporary shoring, proper footings/posts, and an engineered wood or steel beam.',
      },
      {
        question: 'How are changes handled if we decide to add scope during the remodel?',
        answer:
          'Any requested additions or adjustments are priced and documented in a written change order showing the scope adjustment and schedule impact before the work is performed.',
      },
    ],
    relatedServiceSlugs: ['kitchen-remodeling', 'bathroom-remodeling', 'drywall', 'finish-carpentry'],
  },
  {
    slug: 'kitchen-remodeling',
    title: 'Kitchen Remodeling',
    shortTitle: 'Kitchen Remodeling',
    category: 'Residential',
    featuredOnHome: true,
    indexNumber: '04',
    h1: 'Kitchen Remodeling in Southern California',
    metaTitle: 'Kitchen Remodeling in Riverside & Inland Empire | Novus Construction Inc.',
    metaDescription:
      'Custom kitchen remodeling in Riverside, Jurupa Valley, and Southern California. Layout reconfiguration, cabinetry installation, stone countertops, and trade coordination.',
    heroSummary:
      'Kitchens demand tight tolerances. Cabinetry reveals, appliance cutouts, island plumbing, lighting layout, and countertop surfaces all rely on square framing, flat drywall, and organized trade sequencing.',
    imagePath: '/images/residential-remodel.svg',
    imageAlt: 'Architectural illustration of a custom remodeled kitchen with rift-sawn oak cabinetry and waterfall stone island',
    whoItIsFor: [
      'Homeowners reconfiguring cramped or closed-off kitchens into functional cooking and gathering spaces.',
      'Families upgrading worn cabinetry, countertops, lighting, and storage layout.',
      'Property owners combining a kitchen renovation with adjacent living or dining room updates.',
    ],
    problemsAddressed: [
      'Eliminating awkward workflow bottlenecks, insufficient prep space, and poor task lighting.',
      'Leveling out-of-square walls and uneven subfloors before installing cabinetry and stone countertops.',
      'Coordinating electrical circuits, ventilation hoods, plumbing rough-ins, drywall, cabinetry, and tile in the proper sequence.',
    ],
    typicalScope: [
      'Dust containment barrier setup, floor protection, and removal of existing cabinets, countertops, and finishes.',
      'Framing modifications for islands, pantries, pass-throughs, or window resizing per approved plans.',
      'Coordination of rough electrical, lighting cans/pendants, appliance circuits, plumbing supply/drain lines, and range hood ducting.',
      'Drywall repair and skimming to create flat, plumb walls behind cabinetry and tile backsplashes.',
      'Cabinetry installation, countertop templating/installation coordination, tile backsplash, flooring, trim carpentry, and fixture hookups.',
    ],
    scopeNote:
      'Appliance supply, custom cabinetry fabrication, stone slab selection, and structural engineering for load-bearing wall removal are defined in each project proposal.',
    scopeDrivers: [
      {
        factor: 'Footprint & Utility Relocation',
        explanation:
          'Keeping the sink, range, and refrigerator in their existing locations avoids slab trenching or extensive gas/water rerouting; relocating an island sink or gas range requires subfloor or slab work.',
      },
      {
        factor: 'Cabinetry & Countertop Specifications',
        explanation:
          'Custom inset or full-overlay cabinetry, waterfall stone islands, and full-height slab backsplashes require higher installation precision and specific substrate blocking.',
      },
      {
        factor: 'Structural Wall Removal',
        explanation:
          'Opening the kitchen to an adjacent family or dining room often involves relocating electrical switches, HVAC ducts, or plumbing vents hidden inside the partition.',
      },
      {
        factor: 'Appliance & Ventilation Requirements',
        explanation:
          'Built-in panel-ready refrigerators, professional ranges, and high-CFM range hoods require dedicated electrical circuits, exact framing clearances, and exterior roof or wall venting.',
      },
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Layout, Appliance & Cabinet Review',
        description:
          'We verify kitchen layout drawings, appliance rough-in specs, and cabinetry dimensions before demolition begins.',
      },
      {
        stepNumber: '02',
        title: 'Protection, Demolition & Framing',
        description:
          'We isolate the work zone, remove existing finishes, frame layout changes, and true up walls and subfloors.',
      },
      {
        stepNumber: '03',
        title: 'Rough Plumbing, Electrical & Drywall',
        description:
          'Supply lines, drains, dedicated appliance circuits, under-cabinet lighting rough-ins, and drywall finishes are completed and inspected.',
      },
      {
        stepNumber: '04',
        title: 'Cabinetry, Flooring & Countertop Templating',
        description:
          'Flooring and cabinets are installed level and plumb, allowing precise digital templating for stone or quartz countertops.',
      },
      {
        stepNumber: '05',
        title: 'Backsplash, Trim & Final Commissioning',
        description:
          'Countertops and tile backsplashes are set, plumbing and electrical trim-out is completed, cabinet hardware is adjusted, and we conduct a full walkthrough.',
      },
    ],
    faqs: [
      {
        question: 'Why do appliances need to be selected before kitchen demolition starts?',
        answer:
          'Appliance specs dictate exact cabinet opening widths, gas valve placements, electrical amperage, and hood duct locations. Having those dimensions upfront prevents delays and drywall patching later.',
      },
      {
        question: 'When are countertops measured during a kitchen remodel?',
        answer:
          'Countertop fabricators template only after the base cabinets are permanently installed and leveled. After templating, fabrication typically takes one to two weeks before slab installation and sink/faucet hookup.',
      },
      {
        question: 'How do you protect the rest of our home from kitchen remodel dust?',
        answer:
          'We install zippered containment barriers, protect pathways from the entry door to the kitchen with heavy floor protection, and maintain daily jobsite cleanup.',
      },
      {
        question: 'Can you install cabinets that we already purchased?',
        answer:
          'Yes. We can either supply and install cabinetry as part of our scope or install owner-furnished cabinets after reviewing the cabinet layout and delivery inventory.',
      },
    ],
    relatedServiceSlugs: ['full-home-remodeling', 'bathroom-remodeling', 'finish-carpentry', 'drywall'],
  },
  {
    slug: 'bathroom-remodeling',
    title: 'Bathroom Remodeling',
    shortTitle: 'Bathroom Remodeling',
    category: 'Residential',
    featuredOnHome: true,
    indexNumber: '05',
    h1: 'Bathroom Remodeling in Southern California',
    metaTitle: 'Bathroom Remodeling in Riverside & Southern California | Novus Construction Inc.',
    metaDescription:
      'Primary bath renovations, walk-in showers, waterproofing, tile installation, and bathroom remodeling in Riverside, Jurupa Valley, and Southern California.',
    heroSummary:
      'A durable bathroom remodel starts behind the tile. We focus on sound framing, proper shower pan slope, continuous waterproofing membranes, flat wall substrates, and clean tile and fixture alignment.',
    imagePath: '/images/bathroom-carpentry.svg',
    imageAlt: 'Architectural illustration of a remodeled primary bathroom with walk-in glass shower, limestone tile, and custom white oak vanity',
    whoItIsFor: [
      'Homeowners upgrading primary bathrooms with curbless or low-threshold walk-in showers and custom vanities.',
      'Families renovating hall and guest bathrooms for durability, ventilation, and better storage.',
      'Property owners replacing leaking shower pans, water-damaged framing, or outdated fiberglass inserts.',
    ],
    problemsAddressed: [
      'Addressing moisture intrusion, rotted framing, and improperly sloped shower pans before new finishes are installed.',
      'Ensuring wall studs are plumb and flat so large-format porcelain or stone tiles lay without lippage.',
      'Aligning shower valves, niches, drain grates, glass enclosures, sconces, and mirrors cleanly.',
    ],
    typicalScope: [
      'Removal of existing tile, tubs, vanities, drywall, and damaged subfloor or framing down to bare studs.',
      'Framing corrections, recessed niche framing, blocking for grab bars or heavy glass doors, and subfloor repair.',
      'Rough plumbing updates (shower valves, drains, vanity supplies) and electrical rough-in (GFCI outlets, exhaust fan venting, vanity lighting).',
      'Shower pan construction, waterproofing membrane application, flood testing per inspection requirements, and cement board/substrate prep.',
      'Tile installation, grouting, vanity and countertop installation, trim carpentry, glass enclosure coordination, and plumbing/electrical trim.',
    ],
    scopeNote:
      'Finish fixtures, tile materials, and custom glass enclosures are furnished according to the itemized project agreement.',
    scopeDrivers: [
      {
        factor: 'Fixture Relocation (Drains & Toilets)',
        explanation:
          'Moving a toilet waste line or shower drain—especially on a concrete slab foundation—requires sawcutting, trenching, and re-sloping underground plumbing.',
      },
      {
        factor: 'Tile Format & Layout Complexity',
        explanation:
          'Large-format slabs, mitered edges, herringbone patterns, and floor-to-ceiling wall tile require more intensive wall truing and layout time than standard subway or medium-format tile.',
      },
      {
        factor: 'Curbless vs. Curbed Shower Construction',
        explanation:
          'True curbless showers require recessing the subfloor or slab in the wet area to achieve proper drain slope without a step.',
      },
      {
        factor: 'Concealed Moisture or Termite Damage',
        explanation:
          'Older bathrooms frequently hide slow leaks around shower valves or toilet flanges that require sistering joists or replacing bottom plates once opened.',
      },
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Scope, Fixture & Tile Planning',
        description:
          'We review your layout, tile dimensions, vanity specs, and plumbing valve bodies so rough-in heights and niche locations are planned around actual tile courses.',
      },
      {
        stepNumber: '02',
        title: 'Demolition & Framing Inspection',
        description:
          'We strip the wet areas to the studs, inspect for moisture damage, install solid wood blocking for glass and accessories, and true the walls.',
      },
      {
        stepNumber: '03',
        title: 'Rough Plumbing, Electrical & Waterproofing',
        description:
          'New shower valves, drains, exhaust fans, and lighting wiring are installed, followed by the waterproof shower pan and municipal flood-test inspection.',
      },
      {
        stepNumber: '04',
        title: 'Tile Setting, Drywall & Vanity Installation',
        description:
          'Floor and wall tile are set with centered layouts, drywall is finished and primed for high-humidity areas, and the vanity and countertop are installed.',
      },
      {
        stepNumber: '05',
        title: 'Glass, Fixtures & Final Walkthrough',
        description:
          'Shower glass is measured and installed over finished tile, faucets and lighting are trimmed out, and every seal and drain is tested at closeout.',
      },
    ],
    faqs: [
      {
        question: 'How do you make sure a new tile shower will not leak?',
        answer:
          'Tile and grout alone are not waterproof. We construct a properly sloped pan and continuous waterproofing assembly behind the tile, and perform water flood testing as required by municipal inspections before tile is set.',
      },
      {
        question: 'Why is wall framing preparation so important for modern bathroom tile?',
        answer:
          'Large-format porcelain and stone tiles do not bend over bowed studs. Planing, shimming, or sistering studs before backer board goes up prevents uneven tile edges (lippage) and ensures frameless shower glass sits flush.',
      },
      {
        question: 'When is the frameless shower glass measured?',
        answer:
          'Custom tempered glass enclosures must be measured after the shower curb and wall tile are completely installed so the glass panels fit the exact finished opening.',
      },
      {
        question: 'Can you convert a standard tub/shower combo into a walk-in shower?',
        answer:
          'Yes. Tub-to-shower conversions are one of our most common bathroom scopes. We adjust the drain size and location as needed, build a new waterproofed pan, and update the shower valve and enclosure.',
      },
    ],
    relatedServiceSlugs: ['kitchen-remodeling', 'full-home-remodeling', 'drywall', 'finish-carpentry'],
  },
  {
    slug: 'commercial-tenant-improvements',
    title: 'Commercial Tenant Improvements',
    shortTitle: 'Commercial TIs',
    category: 'Commercial',
    featuredOnHome: true,
    indexNumber: '06',
    h1: 'Commercial Tenant Improvements & Build-Outs in Southern California',
    metaTitle: 'Commercial Tenant Improvements in Inland Empire & SoCal | Novus Construction Inc.',
    metaDescription:
      'Commercial tenant improvements, interior build-outs, framing, drywall, and space reconfigurations in Riverside, the Inland Empire, and Southern California.',
    heroSummary:
      'Commercial build-outs require clear communication with property managers, adherence to approved plans, disciplined site logistics, and reliable execution of interior partitions, ceilings, doors, and finishes.',
    imagePath: '/images/commercial-buildout.svg',
    imageAlt: 'Architectural illustration of a modern commercial office and retail tenant improvement build-out',
    whoItIsFor: [
      'Business owners configuring a new office, retail storefront, clinic, studio, or light-commercial suite.',
      'Commercial property owners and asset managers preparing white-box or spec suites for incoming tenants.',
      'Existing commercial tenants reconfiguring office layouts, conference rooms, breakrooms, or reception areas.',
    ],
    problemsAddressed: [
      'Translating architectural tenant improvement (TI) plans into a clear, itemized construction scope.',
      'Working within landlord building rules, shared corridor access, staging constraints, and noise restrictions.',
      'Coordinating interior framing, drywall assemblies, acoustic ceilings, commercial doors/hardware, and finish schedules efficiently.',
    ],
    typicalScope: [
      'Pre-construction plan review, site walk, and coordination with building management regarding access and protection.',
      'Selective interior demolition of existing non-bearing partitions, ceilings, flooring, and outdated millwork.',
      'Metal stud or wood interior framing, rated wall assemblies (per approved plans), acoustic insulation, and backing installation.',
      'Commercial drywall hanging, taping, finishing, and T-bar acoustical ceiling grid or hard-lid ceiling framing.',
      'Commercial door frames, doors, ADA-compliant hardware installation, finish carpentry, millwork coordination, and final punch-list turnover.',
    ],
    scopeNote:
      'Specialized fire-life-safety systems, engineered MEP design, low-voltage cabling, and municipal occupancy permits are coordinated according to the project contract and landlord lease exhibits.',
    scopeDrivers: [
      {
        factor: 'Shell Condition vs. Second-Generation Space',
        explanation:
          'Building out a cold shell requires complete interior partitions, ceiling systems, restrooms, and rough utilities, whereas a second-generation suite may reuse existing restrooms and ceiling grids while reconfiguring offices.',
      },
      {
        factor: 'Fire-Rated Assemblies & Accessibility Requirements',
        explanation:
          'Demising walls, corridor separations, door clearances, and restroom layouts must match approved plans and applicable building/accessibility codes.',
      },
      {
        factor: 'Building Access & Work-Hour Windows',
        explanation:
          'Occupied multi-tenant buildings may restrict core-drilling, demolition, or material deliveries to specific hours to protect neighboring businesses.',
      },
      {
        factor: 'Trade & Landlord Coordination',
        explanation:
          'Integrating landlord-designated base-building contractors (such as fire alarm or roof penetrations) with tenant improvement construction requires early schedule coordination.',
      },
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Plan Review & Site Walk',
        description:
          'We review your architectural TI drawings or space plan, walk the suite to verify existing conditions above the ceiling and at the slab, and clarify landlord requirements.',
      },
      {
        stepNumber: '02',
        title: 'Itemized Commercial Proposal',
        description:
          'We provide a structured proposal broken down by division—demolition, framing, drywall, ceilings, doors, finishes, and coordinated trades—with clear inclusions and exclusions.',
      },
      {
        stepNumber: '03',
        title: 'Site Protection, Demolition & Layout',
        description:
          'Common areas are protected, selective demolition is completed, and new wall layouts are snapped on the slab for verification before framing rises.',
      },
      {
        stepNumber: '04',
        title: 'Framing, Rough-Ins & Drywall Assemblies',
        description:
          'Interior partitions, door frames, backing, and ceiling structures are built and inspected alongside coordinated mechanical, electrical, and plumbing rough-ins.',
      },
      {
        stepNumber: '05',
        title: 'Finishes, Hardware & Suite Turnover',
        description:
          'Drywall finishes, paint, acoustical ceilings, millwork, flooring, and commercial door hardware are completed, followed by a formal walkthrough and punch-list closeout.',
      },
    ],
    faqs: [
      {
        question: 'Can you provide an estimate from our architect’s Tenant Improvement (TI) plan set?',
        answer:
          'Yes. If you have permit-ready or preliminary architectural TI drawings, you can share the scope details through our estimate request form and we will arrange a plan review and site walk.',
      },
      {
        question: 'Do you work on occupied commercial buildings with neighboring tenants?',
        answer:
          'Yes. We coordinate with property managers and building owners on material staging, dust control, debris haul-off routes, and work hours when noisy activities like demolition or slab work are required.',
      },
      {
        question: 'Can you handle framing, drywall, and finish carpentry for a commercial build-out?',
        answer:
          'Yes. Interior framing, drywall hanging and finishing, doors, and finish carpentry are core construction capabilities for Novus Construction Inc., allowing tight quality control over the suite’s structure and surfaces.',
      },
      {
        question: 'What if we only need a partial office reconfiguration rather than a full suite build-out?',
        answer:
          'We handle both full suite tenant improvements and targeted commercial modifications such as adding conference rooms, demising partitions, reception build-outs, and interior refreshes.',
      },
    ],
    relatedServiceSlugs: ['framing', 'drywall', 'finish-carpentry', 'stucco'],
  },
  {
    slug: 'framing',
    title: 'Framing',
    shortTitle: 'Framing',
    category: 'Construction Trades',
    featuredOnHome: false,
    indexNumber: '07',
    h1: 'Residential & Commercial Framing in Southern California',
    metaTitle: 'Structural & Interior Framing Contractor in SoCal | Novus Construction Inc.',
    metaDescription:
      'Precision wood and interior framing for ADUs, additions, remodels, and commercial tenant improvements in Riverside, the Inland Empire, and Southern California.',
    heroSummary:
      'Every finish trade depends on the accuracy of the framing beneath it. Plumb studs, level headers, square corners, and properly installed structural hardware set the foundation for flat drywall, true doors, and tight cabinetry.',
    imagePath: '/images/structural-framing.svg',
    imageAlt: 'Architectural illustration of precision structural wood framing, engineered beams, and hold-down hardware',
    whoItIsFor: [
      'Homeowners and property owners building ADUs, room additions, or structural layout reconfigurations.',
      'Commercial clients requiring interior partition framing, soffits, and backing for tenant improvements.',
      'Projects requiring structural framing repairs, beam installations, or window/door opening modifications per approved engineering.',
    ],
    problemsAddressed: [
      'Preventing wavy walls, out-of-square rooms, and binding doors caused by rushed or unaligned rough carpentry.',
      'Executing engineered load-path connections, shear walls, hold-downs, and header installations accurately for inspection.',
      'Installing solid blocking for cabinetry, heavy bathroom glass, wall-mounted fixtures, and commercial hardware before walls are closed.',
    ],
    typicalScope: [
      'Layout verification against architectural and structural plans.',
      'Sill plates, anchor bolt coordination, wall stud framing, top plates, and cripple/header assemblies.',
      'Installation of engineered lumber (LVL, PSL, Glulam beams) and structural framing hardware per approved structural drawings.',
      'Roof rafters, ceiling joists, truss setting coordination, fascia, and exterior sheathing.',
      'Interior partition framing, soffits, recessed niches, and backing installation for residential and commercial spaces.',
    ],
    scopeNote:
      'All structural framing modifications are performed in accordance with approved structural engineering plans and local building code requirements.',
    scopeDrivers: [
      {
        factor: 'New Footprint vs. Tie-In Framing',
        explanation:
          'Framing on a new flat slab progresses rapidly, whereas tying into an existing roof or opening an existing bearing wall requires temporary shoring, demolition, and custom fitting.',
      },
      {
        factor: 'Engineered Shear & Hardware Density',
        explanation:
          'Modern California seismic requirements often specify high-capacity hold-downs, closely spaced plywood shear nailing, and steel beams or posts.',
      },
      {
        factor: 'Ceiling Height & Roof Geometry',
        explanation:
          'Vaulted ceilings, complex hip-and-valley intersections, cantilevers, and multi-slide pocket door openings require additional layout and material precision.',
      },
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Plan & Structural Review',
        description:
          'We cross-check architectural dimensions against structural engineering details, window/door schedules, and rough-in clearances.',
      },
      {
        stepNumber: '02',
        title: 'Plate Layout & Dimension Verification',
        description:
          'Wall lines, door openings, and plumbing wall locations are chalked and verified on the slab or subfloor before vertical framing begins.',
      },
      {
        stepNumber: '03',
        title: 'Wall, Beam & Roof Framing',
        description:
          'Walls are framed plumb and braced, engineered headers and beams are set, and roof or ceiling framing is completed.',
      },
      {
        stepNumber: '04',
        title: 'Sheathing, Hardware & Backing',
        description:
          'Structural sheathing, hold-downs, straps, and interior fixture blocking are installed to specification.',
      },
      {
        stepNumber: '05',
        title: 'Framing Inspection & Trade Handoff',
        description:
          'We verify stud alignment, check openings against window/door orders, and complete framing inspection requirements.',
      },
    ],
    faqs: [
      {
        question: 'Can you frame from our structural engineer’s approved plans?',
        answer:
          'Yes. We build directly from permitted architectural and structural drawings, following specified lumber grades, beam sizes, nailing schedules, and connector hardware.',
      },
      {
        question: 'Do you take on standalone framing scopes or only full general contracting projects?',
        answer:
          'Depending on project size and schedule availability in the Inland Empire and Southern California, we can perform substantial framing scopes as well as complete projects where we manage framing through final finishes.',
      },
      {
        question: 'Why does framing quality matter so much for kitchens and bathrooms?',
        answer:
          'If corner framing is out of square or studs are bowed, stone countertops will show uneven gaps and large bathroom tiles will have lippage. Spending extra care crowning and truing studs during framing pays off in the final finish.',
      },
      {
        question: 'What is needed before removing an interior wall?',
        answer:
          'First, we determine whether the wall carries roof or floor loads and what utilities run inside it. Load-bearing walls require engineered plans and permits before temporary shoring and beam installation take place.',
      },
    ],
    relatedServiceSlugs: ['adu-construction', 'home-additions', 'drywall', 'finish-carpentry'],
  },
  {
    slug: 'drywall',
    title: 'Drywall',
    shortTitle: 'Drywall',
    category: 'Construction Trades',
    featuredOnHome: false,
    indexNumber: '08',
    h1: 'Drywall Installation, Finishing & Texture Matching in Southern California',
    metaTitle: 'Drywall Contractor in Riverside & Southern California | Novus Construction Inc.',
    metaDescription:
      'Residential and commercial drywall hanging, taping, smooth finishes, and texture matching in Riverside, Jurupa Valley, and Southern California.',
    heroSummary:
      'Drywall defines how natural and artificial light reads across every room. Whether matching existing texture on a home addition or delivering clean Level 4 and Level 5 smooth walls on a remodel or commercial build-out, surface preparation matters.',
    imagePath: '/images/residential-remodel.svg',
    imageAlt: 'Architectural interior showing crisp smooth drywall planes, corner beads, and natural light',
    whoItIsFor: [
      'Homeowners and commercial clients completing ADUs, additions, whole-home remodels, or tenant improvements.',
      'Properties transitioning from dated heavy ceiling or wall textures to clean, modern smooth or light-texture finishes.',
      'Remodel projects requiring invisible patches and texture blending after plumbing, electrical, or structural wall changes.',
    ],
    problemsAddressed: [
      'Preventing visible tape joints, fastener pops, and telegraphed seams under raking sunlight or recessed downlights.',
      'Blending new drywall repairs cleanly into existing knockdown, orange peel, skip-trowel, or smooth surfaces.',
      'Installing moisture-resistant and fire-rated gypsum board assemblies in the right locations for inspection.',
    ],
    typicalScope: [
      'Substrate check and shimming of framing prior to hanging gypsum board.',
      'Hanging standard, moisture-resistant, or Type X fire-rated drywall with proper fastener spacing.',
      'Installation of straight metal, vinyl, or paper-faced corner beads and architectural reveals.',
      'Multi-coat taping, mudding, skimming, and sanding to the specified finish level (Level 3 through Level 5 smooth).',
      'Texture application or texture matching and thorough dust cleanup prior to primer and paint.',
    ],
    scopeNote:
      'Desired drywall finish level (e.g., Level 4 vs. Level 5 skim coat) and texture specifications are clearly defined in each written proposal.',
    scopeDrivers: [
      {
        factor: 'Finish Level Specification (Texture vs. Smooth Wall)',
        explanation:
          'Smooth walls—especially Level 5 skim coats in rooms with large windows—require additional compound coats and fine sanding compared to standard textured finishes.',
      },
      {
        factor: 'Patching & Blending vs. New Open Framing',
        explanation:
          'Hanging new full rooms is straightforward; tying into existing walls requires feathering joints wide and matching decades-old hand or spray textures.',
      },
      {
        factor: 'Ceiling Height & Architectural Details',
        explanation:
          'High vaulted ceilings, skylights, kerfed returns, and shadow-reveal beads increase scaffolding and finishing time.',
      },
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Framing & Insulation Pre-Check',
        description:
          'Before board goes up, we verify that rough inspections are signed off, insulation is in place, and framing planes are flat.',
      },
      {
        stepNumber: '02',
        title: 'Board Hanging & Fastening',
        description:
          'Sheets are hung with staggered joints, clean electrical/plumbing cutouts, and proper screw depth without tearing the paper face.',
      },
      {
        stepNumber: '03',
        title: 'Corner Bead & Tape Embedment',
        description:
          'Outside corners and window returns are set crisp and plumb, and all flat and inside joints are taped.',
      },
      {
        stepNumber: '04',
        title: 'Skimming, Sanding & Texture Application',
        description:
          'Successive coats of joint compound are feathered out, sanded under work lights, and textured or skimmed to match the agreed specification.',
      },
      {
        stepNumber: '05',
        title: 'Light Check & Paint Readiness',
        description:
          'Surfaces are inspected under oblique lighting so joints and corners are ready for primer and finish paint.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between Level 4 and Level 5 drywall finishing?',
        answer:
          'Level 4 covers taped joints and fasteners with multiple coats and is standard for light textures or flat paint. Level 5 adds a thin skim coat of compound across the entire wall surface to create uniform porosity and smoothness, which is ideal for rooms with strong natural light or satin/semi-gloss paints.',
      },
      {
        question: 'Can you match the existing texture in my home after a remodel?',
        answer:
          'Yes. We regularly blend orange peel, knockdown, skip-trowel, and smooth finishes so repaired walls or room additions match the surrounding rooms.',
      },
      {
        question: 'How do you control drywall sanding dust in an occupied home?',
        answer:
          'We isolate work areas with plastic zip walls, protect floors and vents, and use vacuum-assisted sanding and thorough cleanup before barriers come down.',
      },
      {
        question: 'Do you install fire-rated drywall for garages, ADUs, and commercial suites?',
        answer:
          'Yes. We install 5/8-inch Type X gypsum board and fire-taped assemblies where required by building code or approved plans.',
      },
    ],
    relatedServiceSlugs: ['full-home-remodeling', 'commercial-tenant-improvements', 'framing', 'finish-carpentry'],
  },
  {
    slug: 'stucco',
    title: 'Stucco',
    shortTitle: 'Stucco',
    category: 'Construction Trades',
    featuredOnHome: false,
    indexNumber: '09',
    h1: 'Exterior Stucco Systems & Patch Matching in Southern California',
    metaTitle: 'Stucco Contractor in Riverside & Southern California | Novus Construction Inc.',
    metaDescription:
      'Exterior stucco systems, lath and plaster, addition tie-ins, and stucco repair matching for residential and commercial buildings in Southern California.',
    heroSummary:
      'Stucco is Southern California’s primary exterior defense against sun, wind, and rain. Proper weather-resistive barriers, window flashing integration, lath fastening, and curing intervals are essential for a durable, crack-resistant exterior.',
    imagePath: '/images/hero-socal-architecture.svg',
    imageAlt: 'Architectural illustration of smooth warm white Southern California exterior stucco walls and window transitions',
    whoItIsFor: [
      'Homeowners building ADUs, room additions, or exterior remodels requiring new lath and stucco.',
      'Property owners replacing windows and doors who need clean waterproofing and stucco patch matching.',
      'Residential and commercial buildings updating exterior facades or repairing water-damaged stucco.',
    ],
    problemsAddressed: [
      'Preventing moisture leaks around windows, doors, and roof-to-wall intersections through proper flashing and paper layering.',
      'Blending new stucco additions or window patches into existing sand, dash, lace, or smooth finishes.',
      'Respecting proper scratch, brown, and finish coat curing practices to reduce shrinkage cracking.',
    ],
    typicalScope: [
      'Inspection of exterior sheathing and installation of two-layer weather-resistive barrier (building paper) and flashing integration.',
      'Installation of weep screeds, casing beads, control joints, and galvanized wire lath.',
      'Application of scratch and brown base coats floated to true, flat planes.',
      'Application of traditional cement finish coat or acrylic finish system in the specified texture (smooth, fine sand, santa barbara, skip-trowel, or match-existing).',
      'Site masking of windows, hardscape, and roofing, followed by thorough exterior cleanup.',
    ],
    scopeNote:
      'Stucco texture sample approvals, elastomeric coatings, or exterior painting scopes are specified in the project proposal.',
    scopeDrivers: [
      {
        factor: 'Finish Texture (Smooth Trowel vs. Textured)',
        explanation:
          'Smooth-troweled Santa Barbara or modern architectural finishes require more labor-intensive base floating and acrylic/polymer finish systems than standard sand or lace textures.',
      },
      {
        factor: 'Tie-In & Patch Blending Area',
        explanation:
          'To hide a patch around a resized window or addition seam, the finish coat often needs to be carried to the nearest architectural corner or control joint.',
      },
      {
        factor: 'Building Height & Scaffolding Access',
        explanation:
          'Two-story elevations and hillside properties require full perimeter scaffolding setup and teardown.',
      },
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Substrate & Flashing Verification',
        description:
          'We inspect sheathing, window flashing pans, and roof-to-wall counterflashing before lath begins.',
      },
      {
        stepNumber: '02',
        title: 'Paper, Screeds & Wire Lath',
        description:
          'Weather-resistive barriers, foundation weep screeds, corner aid, and wire lath are fastened and inspected by the municipality where required.',
      },
      {
        stepNumber: '03',
        title: 'Scratch & Brown Base Coats',
        description:
          'Base coats are applied, scored, rodded flat, and given proper hydration and curing time.',
      },
      {
        stepNumber: '04',
        title: 'Texture Sample & Finish Coat',
        description:
          'We verify the target texture and apply the finish coat evenly across full wall planes to prevent cold joints.',
      },
      {
        stepNumber: '05',
        title: 'Demasking & Perimeter Walkthrough',
        description:
          'Protective masking is removed from glazing and hardscape, and we inspect all reveals and joints.',
      },
    ],
    faqs: [
      {
        question: 'Can new stucco on an addition be matched to our existing house?',
        answer:
          'Yes. Our plasterers examine the aggregate size and trowel pattern of your existing walls to closely match sand, lace, knockdown, or smooth textures, and we recommend terminating new finish coats at natural corner breaks.',
      },
      {
        question: 'Why does three-coat stucco take multiple days or weeks to complete?',
        answer:
          'Cement-based scratch and brown coats must hydrate and cure between applications so initial shrinkage happens in the base coats rather than cracking the final finish coat.',
      },
      {
        question: 'Do you repair stucco after window and door replacements?',
        answer:
          'Yes. When new flanged windows or multi-slide doors are installed, we properly tie the new flashing into the existing weather barrier and patch the surrounding stucco.',
      },
      {
        question: 'What is a weep screed and why is it required at the bottom of stucco walls?',
        answer:
          'A weep screed is a perforated metal trim set at the base of framed stucco walls that allows any moisture that gets behind the stucco to drain safely to the exterior rather than wicking into wood framing.',
      },
    ],
    relatedServiceSlugs: ['adu-construction', 'home-additions', 'roofing', 'framing'],
  },
  {
    slug: 'roofing',
    title: 'Roofing',
    shortTitle: 'Roofing',
    category: 'Construction Trades',
    featuredOnHome: false,
    indexNumber: '10',
    h1: 'Roofing Tie-Ins, Replacements & Project Roofing in Southern California',
    metaTitle: 'Roofing Services for Additions, ADUs & Replacements | Novus Construction Inc.',
    metaDescription:
      'Project-specific roofing, addition roof tie-ins, ADU roofing, and roof replacements in Riverside, Jurupa Valley, and Southern California.',
    heroSummary:
      'Whether roofing a brand-new ADU, tying a room addition into an existing concrete tile or shingle roof, or replacing an aging roof assembly as part of a larger exterior improvement, proper underlayment and flashing details protect the entire building.',
    imagePath: '/images/structural-framing.svg',
    imageAlt: 'Architectural illustration of roof framing, valleys, and weather-tight exterior roof assembly',
    whoItIsFor: [
      'Homeowners building an ADU or room addition that requires a new roof system or seamless tie-in.',
      'Property owners replacing worn composition shingle, concrete/clay tile, or low-slope roofing assemblies.',
      'Remodel projects addressing rotted fascia, eaves, roof decking, or valley flashing leaks.',
    ],
    problemsAddressed: [
      'Integrating new addition rooflines into existing valleys, ridges, and parapet walls without leaks.',
      'Replacing deteriorated plywood decking, fascia boards, and underlayment beneath aging tile or shingle roofs.',
      'Ensuring proper attic ventilation, drip edge metal, pipe boot flashings, and Title 24 cool-roof material compliance.',
    ],
    typicalScope: [
      'Tear-off or lift-and-relay preparation, roof deck inspection, and replacement of damaged sheathing or fascia.',
      'Installation of synthetic or double-layer underlayment, ice-and-water shield at valleys/penetrations, and perimeter edge metal.',
      'Installation of valley metal, step flashing, chimney/wall counterflashing, and plumbing/mechanical roof jacks.',
      'Application of composition architectural shingles, concrete/clay roof tile systems, or low-slope roofing materials per project scope.',
      'Magnetic nail sweep, debris haul-off, and final roof and flashing inspection.',
    ],
    scopeNote:
      'Roofing system options, underlayment specs, and decking repair unit rates (for concealed dry rot uncovered after tear-off) are clearly stated in the written proposal.',
    scopeDrivers: [
      {
        factor: 'Roofing Material (Tile Lift & Relay vs. New Tile vs. Shingle vs. Low-Slope)',
        explanation:
          'Concrete and clay tile systems involve battens, heavy underlayment, and tile handling, whereas architectural composition shingles and low-slope membranes have different material and labor profiles.',
      },
      {
        factor: 'Roof Pitch, Valleys & Penetrations',
        explanation:
          'Steep pitches, multiple dormers, skylights, solar standoffs, and complex addition tie-ins require extensive custom sheet-metal flashing work.',
      },
      {
        factor: 'Condition of Existing Roof Deck & Fascia',
        explanation:
          'Once old roofing is removed, any rotted OSB/plywood sheathing or termite-damaged rafter tails and fascia boards must be repaired for solid fastener holding.',
      },
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Roof & Tie-In Assessment',
        description:
          'We inspect the existing roof assembly, pitch, valleys, eaves, and how any new addition or remodel intersects the roof plane.',
      },
      {
        stepNumber: '02',
        title: 'Detailed Roofing Scope & Material Spec',
        description:
          'We specify the underlayment grade, flashing metals, ventilation components, and finish roofing material in writing.',
      },
      {
        stepNumber: '03',
        title: 'Tear-Off, Deck Repair & Dry-In',
        description:
          'Existing materials are removed in controlled sections, damaged decking is replaced, and underlayment is installed to keep the structure dry.',
      },
      {
        stepNumber: '04',
        title: 'Flashing & Roof Covering Installation',
        description:
          'Valleys, wall flashings, vents, and shingles or tiles are installed according to manufacturer and building code standards.',
      },
      {
        stepNumber: '05',
        title: 'Inspection & Site Cleanup',
        description:
          'Municipal roof sheathing/final inspections are completed and the property perimeter is cleaned and swept for fasteners.',
      },
    ],
    faqs: [
      {
        question: 'How do you tie a new room addition roof into our existing roof without leaks?',
        answer:
          'We strip back the existing roofing material well beyond the intersection point, weave or overlap the new underlayment and valley metal into the existing deck, and lace matching shingles or tiles so water sheds naturally.',
      },
      {
        question: 'What happens if rotted wood decking or fascia is found after tear-off?',
        answer:
          'Because roof sheathing is hidden until old materials are removed, our proposals clearly explain how damaged plywood or fascia replacement is documented and priced before repair work proceeds.',
      },
      {
        question: 'Can you match the roof tiles on our existing Southern California home for an addition or ADU?',
        answer:
          'We source matching or complementary concrete and clay roof tile profiles and colors whenever still manufactured, or help you select a cohesive architectural alternative if an older tile profile is discontinued.',
      },
      {
        question: 'Do roof replacements and addition roofs require permits?',
        answer:
          'Yes. Re-roofing and structural roof additions require municipal building permits and inspections (such as roof deck/nailable substrate and final inspection), which are coordinated as part of the project scope.',
      },
    ],
    relatedServiceSlugs: ['home-additions', 'adu-construction', 'stucco', 'framing'],
  },
  {
    slug: 'finish-carpentry',
    title: 'Finish Carpentry',
    shortTitle: 'Finish Carpentry',
    category: 'Construction Trades',
    featuredOnHome: false,
    indexNumber: '11',
    h1: 'Finish Carpentry, Doors & Interior Millwork in Southern California',
    metaTitle: 'Finish Carpentry & Interior Trim in SoCal | Novus Construction Inc.',
    metaDescription:
      'Precision finish carpentry, interior doors, baseboards, window and door casing, and custom trim details in Riverside, the Inland Empire, and Southern California.',
    heroSummary:
      'Finish carpentry is the craftsmanship you touch and see up close every day. Tight miter and cope joints, consistent door reveals, flush hardware mortises, and straight baseboards bring architectural polish to residential and commercial interiors.',
    imagePath: '/images/bathroom-carpentry.svg',
    imageAlt: 'Architectural detail illustration of custom white oak millwork, clean door reveals, and precision finish carpentry',
    whoItIsFor: [
      'Homeowners upgrading interior doors, baseboards, window casings, and architectural wall or ceiling trim.',
      'Full-home remodel and ADU clients who want cohesive, modern trim profiles throughout the property.',
      'Commercial tenant improvement clients needing clean door/hardware installation and custom reception or breakroom millwork.',
    ],
    problemsAddressed: [
      'Replacing dated, damaged hollow-core doors and mismatched narrow baseboards with solid-core doors and clean architectural profiles.',
      'Achieving tight, gap-free joints even when existing walls or floors have slight variations.',
      'Ensuring doors swing smoothly, latch cleanly, and show uniform perimeter reveals.',
    ],
    typicalScope: [
      'Removal of existing doors, jambs, baseboards, and casings.',
      'Installation of pre-hung or slab interior doors (solid-core, flush, shaker, or custom wood) with shimmed, plumb jambs.',
      'Installation of baseboards, door and window casings, apron trim, and crown or ceiling detail molding.',
      'Custom closets, mudroom benches, fireplace mantels, accent wood slat walls, and cabinetry trim installation.',
      'Door hardware, hinges, mortised strikes, pocket door hardware, and commercial closer/lever installation.',
    ],
    scopeNote:
      'Material grades (paint-grade MDF/finger-jointed pine vs. stain-grade white oak, walnut, or alder) and painting/staining responsibilities are specified in the written scope.',
    scopeDrivers: [
      {
        factor: 'Paint-Grade vs. Stain-Grade Wood Species',
        explanation:
          'Stain-grade hardwoods (such as rift-sawn white oak or walnut) cannot be filled and caulked like painted trim; they require furniture-grade joinery and grain matching.',
      },
      {
        factor: 'Door Type & Opening Complexity',
        explanation:
          '8-foot solid-core doors, concealed-hinge or flush-trimless jambs, pocket doors, and commercial rated doors require significantly more layout and hanging time than standard 6-foot-8 hollow doors.',
      },
      {
        factor: 'Wall Flatness & Floor Levelness',
        explanation:
          'Scribbing tall baseboards to uneven tile or hardwood floors and fitting casings to wavy plaster walls adds careful hand-fitting work.',
      },
    ],
    processSteps: [
      {
        stepNumber: '01',
        title: 'Profile, Door & Hardware Schedule Review',
        description:
          'We confirm door swing directions, jamb depths, trim profile dimensions, and hardware specifications.',
      },
      {
        stepNumber: '02',
        title: 'Material Acclimation & Staging',
        description:
          'Wood doors and trim materials are delivered to the conditioned interior space so they acclimate before cutting and fastening.',
      },
      {
        stepNumber: '03',
        title: 'Door Hanging & Jamb Alignment',
        description:
          'Jambs are shimmed plumb in both planes, hinge mortises are checked, and doors are adjusted for an even perimeter reveal.',
      },
      {
        stepNumber: '04',
        title: 'Casing, Baseboard & Millwork Installation',
        description:
          'Casings are set with uniform reveals, inside corners are coped or mitered tight, and outside corners are glued and pinned cleanly.',
      },
      {
        stepNumber: '05',
        title: 'Hardware Trim-Out & Quality Walkthrough',
        description:
          'Locksets, levers, stops, and cabinet hardware are installed and every door and drawer is tested for smooth operation.',
      },
    ],
    faqs: [
      {
        question: 'What is the benefit of upgrading to solid-core interior doors during a remodel?',
        answer:
          'Solid-core doors feel substantially heavier in the hand, close with a quiet, solid sound, and significantly reduce room-to-room noise transmission compared to builder-grade hollow-core doors.',
      },
      {
        question: 'When during a remodel does finish carpentry take place?',
        answer:
          'Finish carpentry begins after drywall mudding, sanding, and primary hard-surface flooring are complete, so jambs and baseboards sit cleanly at the finished floor elevation.',
      },
      {
        question: 'Can you install trim profiles that match the rest of our house?',
        answer:
          'Yes. We match standard Southern California craftsman, modern flat-stock, beveled, and traditional profiles, or can replace trim across connected living spaces for a unified look.',
      },
      {
        question: 'Do you install commercial doors and ADA hardware as part of tenant improvements?',
        answer:
          'Yes. We install commercial wood and hollow-metal doors, knock-down or welded frames, lever hardware, closers, and kickplates per approved TI plans.',
      },
    ],
    relatedServiceSlugs: ['full-home-remodeling', 'kitchen-remodeling', 'bathroom-remodeling', 'commercial-tenant-improvements'],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): ServiceItem[] {
  return SERVICES_DATA.filter((s) => s.category === category);
}

export function getFeaturedHomeServices(): ServiceItem[] {
  return SERVICES_DATA.filter((s) => s.featuredOnHome);
}

export function getTradeServices(): ServiceItem[] {
  return SERVICES_DATA.filter((s) => s.category === 'Construction Trades');
}
