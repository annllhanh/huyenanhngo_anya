/* ===== ABSTRACT WAVE BACKGROUND ===== */
function initWaves() {
  const canvas = document.getElementById('wave-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let time = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawWave(yOffset, amplitude, wavelength, speed, gradient, lineWidth) {
    ctx.beginPath();
    // Start at left edge precisely
    const startY = yOffset + Math.sin(time * speed) * amplitude + Math.sin(time * speed * 0.8) * (amplitude * 0.5);
    ctx.moveTo(0, startY);
    
    for (let x = 0; x <= canvas.width; x += 3) {
      const y = yOffset +
        Math.sin((x / wavelength) + (time * speed)) * amplitude +
        Math.sin((x / (wavelength * 0.7)) + (time * speed * 0.8)) * (amplitude * 0.5);
      ctx.lineTo(x, y);
    }
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth || 1.5;
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const h = canvas.height;
    const w = canvas.width;

    // Create elegant gradients using the brand colors
    const grad1 = ctx.createLinearGradient(0, 0, w, 0);
    grad1.addColorStop(0, 'rgba(59, 130, 184, 0.05)'); // Blue
    grad1.addColorStop(1, 'rgba(34, 184, 207, 0.3)');  // Cyan

    const grad2 = ctx.createLinearGradient(0, 0, w, 0);
    grad2.addColorStop(0, 'rgba(124, 58, 237, 0.25)'); // Purple
    grad2.addColorStop(1, 'rgba(239, 133, 83, 0.05)'); // Orange

    const grad3 = ctx.createLinearGradient(0, 0, w, 0);
    grad3.addColorStop(0, 'rgba(34, 184, 207, 0.2)');
    grad3.addColorStop(1, 'rgba(124, 58, 237, 0.15)');

    // Draw overlapping line art
    drawWave(h * 0.25, 45, 600, 0.3, grad1, 1);
    drawWave(h * 0.25 + 15, 55, 580, 0.25, grad2, 1.5);
    
    drawWave(h * 0.55, 60, 500, 0.2, grad3, 2);
    drawWave(h * 0.55 - 20, 45, 550, 0.28, grad1, 1);
    
    drawWave(h * 0.85, 40, 700, 0.35, grad2, 1.5);
    drawWave(h * 0.85 - 10, 35, 650, 0.3, grad3, 1);

    time += 0.006; // Slightly slower for a calmer vibe
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);
  animate();
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.id;
    });
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
      });
    });
  }
}

/* ===== SKILL ACCORDION + INLINE PANELS ===== */
function initSkillExperience() {

  /* Curated skill-to-experience mappings */
  const skillMap = {
    /* ===== PROJECT MANAGEMENT ===== */
    'project-coordination': [
      { text: 'Managed multiple concurrent workstreams under tight deadlines with AI-driven process optimization, ensuring on-time delivery across business analysis and business development projects.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Coordinated with Vietnamese, American, and Australian stakeholders to define project timelines, track deliverables, and ensure on-time submission of cross-border project proposals.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern', perf: '8 project proposals submitted' },
      { text: 'Led and coordinated an 8-member research team for AI healthcare initiative; delivered research report and presentation.', source: 'IEDE Program | Tsinghua University', perf: 'Team Leader & Main Researcher' },
      { text: 'Coordinated across teams to align goals and ensure timely execution of joint initiatives with 20+ external stakeholders.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive' }
    ],
    'timeline-management': [
      { text: 'Coordinated with Vietnamese, American, and Australian stakeholders to define project timelines, track deliverables, and ensure on-time submission of cross-border project proposals.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern', perf: '8 project proposals, on-time delivery' },
      { text: 'Managed multiple concurrent workstreams — BA projects, BD pipeline, and AI automation — delivering outputs within tight deadlines.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Built weekly and monthly performance dashboards to monitor progress and track milestones across recruitment and outreach campaigns.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive' }
    ],
    'stakeholder-management': [
      { text: 'Engaged C-level clients across APAC (including business trips to Thailand) and the UK through direct outreach and in-person meetings for insight validation and project scoping.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Coordinated with American and Australian partners for documentation, engagement, and support arrangements on international infrastructure projects.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern' },
      { text: 'Managed relationships with 20+ external stakeholders — media sponsors, international AIESEC partners, and customers — coordinating across teams to align goals.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition & Branch Leadership' }
    ],
    'cross-functional': [
      { text: 'Bridged business stakeholders and technical development teams through structured documentation (process flows, data dictionaries, user stories) for cross-functional alignment.', source: 'DataX Power Ltd. | Business Analyst' },
      { text: 'Managed and consolidated documentation across 10 departments and subsidiaries, ensuring cross-departmental alignment for project proposals.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern', perf: '8 project proposals' },
      { text: 'Coordinated across Product Management, marketing, and community teams to deliver competitions and courses.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Executive, The A Program', perf: '500+ contestants, 200+ delegates' }
    ],
    'workflow-optimization': [
      { text: 'Designed and implemented AI-driven workflow automations (using Gemini, Claude, and Perplexity) to streamline reporting, tracking, and administrative tasks — reducing manual effort across concurrent workstreams.', source: 'DataX Power Ltd. | Business Development Executive' },
      { text: 'Defined requirements, designed workflows, and vibe-coded an internal Automated Lead Generation Tool — iteratively refining the tool to optimize the BD team\'s pipeline operations.', source: 'DataX Power Ltd. | Business Analyst & End-user' },
      { text: 'Built weekly and monthly performance dashboards to identify operational bottlenecks and propose data-driven improvements to team workflows.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive' },
      { text: 'Reviewed and improved documentation workflows across 10 departments to increase speed and quality of project proposal submissions.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern' }
    ],
    'agile-scrum': [
      { text: 'Completed Google Project Management Professional Certificate — covering Agile frameworks, Scrum ceremonies, sprint planning, backlog management, and retrospectives.', source: 'Certificate | Google Project Management Professional · Coursera', perf: '2026' },
      { text: 'Completed Google Agile Project Management Essentials Specialization, reinforcing iterative delivery and Agile mindset.', source: 'Certificate | Google · Coursera', perf: '2026' },
      { text: 'Applied iterative improvement cycles in the Automated Lead Generation Tool project — continuously refining requirements, testing, and adapting based on end-user feedback.', source: 'DataX Power Ltd. | Business Analyst & End-user' }
    ],
    'risk-management': [
      { text: 'Completed Google Project Management Professional Certificate — covering risk identification, risk registers, change management processes, and mitigation planning.', source: 'Certificate | Google Project Management Professional · Coursera', perf: '2026' },
      { text: 'Managed cross-border project formation risks for infrastructure bidding — navigating documentation gaps, eligibility criteria, and multi-department coordination under tight submission deadlines.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern', perf: '8 project proposals' },
      { text: 'Coordinated risk mitigation in lead generation and business development pipeline — identifying stalled opportunities and adjusting outreach strategies to maintain conversion targets.', source: 'DataX Power Ltd. | Business Development Executive' }
    ],

    /* ===== BUSINESS ANALYSIS ===== */
    'business-analysis': [
      { text: 'Mapped and documented end-to-end business processes — including Quote-Invoice-Payment flows — for a Franchise Management System, producing flow diagrams, functional specifications, and workflow documentation.', source: 'DataX Power Ltd. | Business Analyst', perf: 'Franchise Management System' },
      { text: 'Conducted requirements analysis for a manufacturing client\'s Business Intelligence Enhancement project, covering demand forecasting, order fulfillment, and inventory management processes.', source: 'DataX Power Ltd. | Business Analyst', perf: 'BI Enhancement Project' },
      { text: 'Defined requirements, designed workflows, and vibe-coded an internal Automated Lead Generation Tool — serving as both business analyst and end-user.', source: 'DataX Power Ltd. | Business Analyst', perf: 'Internal Tool Development' },
      { text: 'Translated complex business requirements into structured documentation (process flows, data dictionaries, user stories) to support cross-functional alignment.', source: 'DataX Power Ltd. | Business Analyst' }
    ],
    'requirements-elicitation': [
      { text: 'Defined functional and business requirements for a Franchise Management System, translating stakeholder needs into structured specifications for development teams.', source: 'DataX Power Ltd. | Business Analyst', perf: 'Franchise Management System' },
      { text: 'Conducted requirements analysis for a manufacturing client\'s BI Enhancement project — demand forecasting, order fulfillment, and inventory management.', source: 'DataX Power Ltd. | Business Analyst', perf: 'BI Enhancement Project' },
      { text: 'Gathered and documented investor requirements for public bidding across 10 departments and subsidiaries; analyzed eligibility for both national and international projects.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern', perf: '8 project proposals' }
    ],
    'process-mapping': [
      { text: 'Mapped end-to-end business processes — including Quote-Invoice-Payment flows — producing flow diagrams, functional specifications, and workflow documentation for a Franchise Management System.', source: 'DataX Power Ltd. | Business Analyst', perf: 'Franchise Management System' },
      { text: 'Designed end-to-end workflows for an internal Automated Lead Generation Tool, documenting the process from lead sourcing to pipeline qualification.', source: 'DataX Power Ltd. | Business Analyst', perf: 'Internal Tool Development' },
      { text: 'Translated complex business requirements into structured documentation including process flows, data dictionaries, and user stories.', source: 'DataX Power Ltd. | Business Analyst' }
    ],
    'business-writing': [
      { text: 'Produced functional specifications, process flow diagrams, data dictionaries, and user stories for multiple projects — Franchise Management System, BI Enhancement, and Lead Generation Tool.', source: 'DataX Power Ltd. | Business Analyst' },
      { text: 'Authored 8-10 system consulting and AI development proposals with requirement definitions and analysis for enterprise clients across APAC and UK.', source: 'DataX Power Ltd. | Business Development Executive', perf: '12.5% proposal win rate' },
      { text: 'Prepared bidding documentation, translated technical requirements, and supported documentation coordination for infrastructure projects.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern' }
    ],

    /* ===== DATA & ANALYSIS ===== */
    'data-monitoring': [
      { text: 'Built weekly and monthly performance dashboards to monitor progress, identify operational bottlenecks, and propose data-driven improvements to team workflows.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive', perf: '230% KPI, 25% conversion increase' },
      { text: 'Conducted requirements analysis covering demand forecasting, order fulfillment, and inventory management metrics for a manufacturing client.', source: 'DataX Power Ltd. | Business Analyst', perf: 'BI Enhancement Project' },
      { text: 'Tracked and analyzed campaign performance metrics across channels (Facebook, Zalo, Threads, email), informing data-driven marketing decisions.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Data & Analytics' }
    ],
    'research-analysis': [
      { text: 'Conducted market, technology, and policy research across customer industries (Technology/AI, Manufacturing, Logistics, Energy, Healthcare) in APAC and the UK, producing analyses that informed strategic decisions.', source: 'DataX Power Ltd. | Business Development Executive' },
      { text: 'Analyzed investor requirements and evaluation criteria, translating complex information into structured bidding documentation.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern', perf: '8 project proposals' },
      { text: 'Led research on AI initiatives for personalizing mental healthcare as group project team leader in the IEDE program.', source: 'IEDE Program | Tsinghua University', perf: 'Team Leader, 8 members' },
      { text: 'Conducted market research and competitor analysis for youth talent programs and product management initiatives.', source: 'AIESEC in Vietnam, FHN Branch | Multiple Roles' }
    ],
    'data-collection': [
      { text: 'Built and maintained lead databases across multiple verticals using Apollo.io and Clay.com; developed an internal Automated Lead Generation Tool.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Collected primary and secondary data from industry leaders, public databases, and market intelligence reports for system consulting proposals.', source: 'DataX Power Ltd. | Business Development Executive' },
      { text: 'Gathered and analyzed lead engagement metrics, campaign performance, and audience data across marketing channels.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Data & Analytics' }
    ],
    'data-visualization': [
      { text: 'Structured visual analyses and infographics for strategic presentations and client-facing system consulting proposals.', source: 'DataX Power Ltd. | Business Development Executive' },
      { text: 'Created performance dashboards and KPI reports for weekly and monthly tracking; delivered detailed performance reports and analysis.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive' }
    ],
    'synthesis-planning': [
      { text: 'Synthesized research findings into structured, client-facing proposals tailored to segment-specific needs, achieving a 12.5% proposal win rate.', source: 'DataX Power Ltd. | Business Development Executive', perf: '12.5% proposal win rate' },
      { text: 'Translated and synthesized technical requirements from American and Australian partners into actionable project documentation for cross-departmental coordination.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern' },
      { text: 'Synthesized research findings and recommended AI initiatives for healthcare as group project leader.', source: 'IEDE Program | Tsinghua University', perf: 'Team Leader, 8 members' }
    ],

    /* ===== AI & AUTOMATION ===== */
    'ai-automation': [
      { text: 'Designed and implemented AI-driven workflow automations (using Gemini, Claude, and Perplexity) to streamline reporting, tracking, and administrative tasks — reducing manual effort and ensuring on-time delivery.', source: 'DataX Power Ltd. | Business Development Executive' },
      { text: 'Defined requirements, designed workflows, and vibe-coded an internal Automated Lead Generation Tool using AI-assisted development.', source: 'DataX Power Ltd. | Business Analyst', perf: 'Internal Tool Development' },
      { text: 'Completed Gemini Certified Student & Educator certification — applied AI to automate workflows, data analysis, and content creation.', source: 'Certificate | Google Gemini', perf: '2026' },
      { text: 'Completed Google Agile Project Management Essentials Specialization, combining agile methodology with AI-driven productivity.', source: 'Certificate | Google · Coursera', perf: '2026' }
    ],
    'ai-tool-building': [
      { text: 'Defined requirements, designed end-to-end workflows, and vibe-coded an internal Automated Lead Generation Tool — serving as both business analyst and end-user, iteratively refining the tool for the BD team\'s pipeline operations.', source: 'DataX Power Ltd. | Business Analyst & End-user', perf: 'Internal Tool Development' },
      { text: 'Built an interactive web application (Tarot Card Quiz) blending storytelling, design, and AI-assisted development.', source: 'Project | Tarot Card Quiz' },
      { text: 'Built this personal portfolio website from scratch using vanilla web technologies, Canvas API, and AI-assisted development.', source: 'Project | Personal Website' }
    ],
    'technology': [
      { text: 'Worked in AI/ML consulting covering AI/ML, infrastructure, data annotation, edge AI, Software, and SaaS; researched technology landscapes and policies across APAC countries.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Researched and recommended AI initiatives for personalizing mental healthcare as team leader in the IEDE program.', source: 'IEDE Program | Tsinghua University', perf: 'Team Leader, 8 members' },
      { text: 'Completed Gemini Certified Student & Educator certification, deepening practical AI workflow knowledge.', source: 'Certificate | Google Gemini' },
      { text: 'Built interactive web applications and internal tools using AI-assisted development.', source: 'Projects | Multiple' }
    ],
    'prompt-engineering': [
      { text: 'Completed Google AI Professional Certificate — covering prompt design, prompt chaining, few-shot and zero-shot prompting, and optimizing outputs across generative AI models.', source: 'Certificate | Google AI Professional · Coursera', perf: '2026' },
      { text: 'Applied prompt engineering daily using Gemini, Claude, and Perplexity to automate research, drafting, analysis, and multi-step business workflows.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Designed structured prompts and iterative prompt loops to vibe-code the internal Automated Lead Generation Tool.', source: 'DataX Power Ltd. | Business Analyst & End-user', perf: 'Internal Tool Development' }
    ],
    'responsible-ai': [
      { text: 'Completed Google AI Professional Certificate — covering responsible AI principles, bias identification, transparency, fairness, and ethical AI deployment frameworks.', source: 'Certificate | Google AI Professional · Coursera', perf: '2026' },
      { text: 'Applied responsible AI considerations when designing AI-assisted workflows — evaluating outputs for accuracy and appropriateness before use in client-facing deliverables.', source: 'DataX Power Ltd. | Business Development Executive' }
    ],
    'ai-strategy': [
      { text: 'Completed Google AI Professional Certificate — covering AI use case identification, organizational readiness, integration strategies, and measuring AI impact.', source: 'Certificate | Google AI Professional · Coursera', perf: '2026' },
      { text: 'Researched AI/ML application landscapes across industries (Manufacturing, Logistics, Healthcare, Energy) to inform system consulting proposals for enterprise clients.', source: 'DataX Power Ltd. | Business Development Executive', perf: '12.5% proposal win rate' },
      { text: 'Recommended AI initiatives for personalizing mental healthcare as group project team leader in the Tsinghua IEDE program.', source: 'IEDE Program | Tsinghua University', perf: 'Team Leader, 8 members' }
    ],

    /* ===== COMMUNICATION & BUSINESS ===== */
    'knowledge-sharing': [
      { text: 'Managed and grew a Product Management community of 8,000+ members (~10% monthly growth), organizing knowledge-sharing content and engagement initiatives.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Executive, The A Program', perf: '8,000+ members, ~10% monthly growth' },
      { text: 'Organized competitions (500+ contestants) and courses (200+ delegates) as knowledge-sharing and skill-building programs for the PM community.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Executive, The A Program', perf: '100%+ KPI' },
      { text: 'Published LinkedIn article series about MLOps, providing technical knowledge and thought leadership for the AI/ML industry.', source: 'DataX Power Ltd. | Business Development Executive' }
    ],
    'b2b-marketing': [
      { text: 'Developed B2B marketing strategies for system consulting and AI development services, targeting CTOs, CIOs, and CEOs across Technology, Manufacturing, Logistics, Energy, Healthcare, and more.', source: 'DataX Power Ltd. | Business Development Executive' },
      { text: 'Drove LinkedIn article campaigns (MLOps series, technology in Manufacturing) and website SEO, researching and synthesizing project know-how, optimizing using public repositories.', source: 'DataX Power Ltd. | Business Development Executive', perf: '2 article campaigns' },
      { text: 'Executed email outreach campaigns using Apollo.io and Clay.com; developed an internal Automated Lead Generation Tool.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' }
    ],
    'pitching': [
      { text: 'Crafted tailored proposals for system consulting and AI/ML solutions, translating client-specific needs into compelling pitches.', source: 'DataX Power Ltd. | Business Development Executive', perf: '12.5% win rate' },
      { text: 'Conducted 50+ sales consultation calls to convert leads into program participants across AIESEC Global Talent.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive', perf: '230% KPI achieved' }
    ],
    'sales-negotiation': [
      { text: 'Generated 143 qualified leads through multi-channel outreach (Facebook, Zalo, Threads, email marketing) and strategic sales consultation.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive', perf: '143 LEADs, 230% KPI, 25% conversion increase' },
      { text: 'Connected with international partners in India and Japan, matching candidates and pushing application processes.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive' }
    ],
    'empathy': [
      { text: 'Built an immersive web experience exploring tarot card interpretations and the Fool\'s Journey, blending empathy-driven storytelling with interactive design.', source: 'Project | Tarot Card Quiz' },
      { text: 'Researched and recommended AI initiatives for personalizing mental healthcare, bridging technology with human-centered care.', source: 'IEDE Program | Tsinghua University', perf: 'Team Leader, 8 members' },
      { text: 'Organized professional photoshoot for ~100 members, capturing individual stories for an avatar changing wave that spread AIESEC brand through personal connection.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head', perf: '244 qualified applicants, 100%+ KPI' },
      { text: 'Provided advisory support for international candidates from India and Japan during onboarding, bridging cultural and logistical challenges.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive' }
    ],

    /* ===== MARKETING & COMMUNITY ===== */
    'marketing-strategy': [
      { text: 'Designed and executed multi-tactic recruitment campaigns: community group seeding, email marketing, influencer marketing (KOL & KOC), university club support, leaflets & POSM, ads, and an avatar changing wave.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head', perf: '244 qualified applicants in 1 month, 100%+ KPI' },
      { text: 'Led multi-channel marketing for Product Management Challenge 2023 (case competition) and Product Management Essentials 2023 (hybrid course), including event support and product/visual design.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Executive, The A Program' },
      { text: 'Published LinkedIn content strategy for client attraction and industry knowledge, including MLOps article series.', source: 'DataX Power Ltd. | Business Development Executive' }
    ],
    'content-marketing': [
      { text: 'Managed and grew a Product Management community of 8,000+ members, organizing knowledge-sharing content and engagement initiatives with ~10% monthly growth.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Executive, The A Program', perf: '8,000+ members, ~10% monthly growth' },
      { text: 'Published 2 LinkedIn article campaigns (MLOps, technology applications in Manufacturing) by researching, synthesizing project know-how, and optimizing content via public repositories and SEO.', source: 'DataX Power Ltd. | Business Development Executive', perf: '2 article campaigns + SEO' },
      { text: 'Created content posts and group seeding across community groups for recruitment marketing campaigns.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head', perf: '244 qualified applicants in 1 month' }
    ],
    'copywriting': [
      { text: 'Wrote copy for social media campaigns, email newsletters, and event marketing materials across AIESEC programs.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Executive, The A Program' },
      { text: 'Created campaign copy for recruitment drives across Facebook, Instagram, Threads, and email channels.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head' }
    ],
    'social-media': [
      { text: 'Managed and grew a Facebook community of 8,000+ members; moderated content and created engagement strategies with ~10% monthly growth.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Executive, The A Program', perf: '8,000+ community members' },
      { text: 'Executed multi-platform campaigns (Facebook, Instagram, Threads) including an avatar changing wave using professional photoshoot of ~100 members.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head', perf: '244 qualified applicants' }
    ],
    'community-building': [
      { text: 'Managed and grew a Product Management community of 8,000+ members, organizing knowledge-sharing content and engagement initiatives.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Executive, The A Program', perf: '8,000+ members, ~10% monthly growth' },
      { text: 'Led 3-member team across social media and events tactics; organized photoshoot for ~100 members for avatar changing wave to spread AIESEC brand.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head', perf: '244 qualified applicants, 100%+ KPI' },
      { text: 'Connected with international partners in India and Japan, matching candidates and pushing application processes across Global Talent program.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive' },
      { text: 'Supported event organization as marketing subcommittee member.', source: 'Violas Association | Marketing Subcommittee' }
    ],
    'email-marketing': [
      { text: 'Pioneered email marketing tactics across AIESEC programs using Mailchimp, Beefree, and Mergo for recruitment drives and event promotion.', source: 'AIESEC in Vietnam, FHN Branch | Multiple Leadership & Executive Roles' },
      { text: 'Deployed email marketing as key tactic in multi-channel recruitment campaigns targeting university candidates.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head' },
      { text: 'Executed B2B email outreach campaigns using Apollo.io and Clay.com targeting CTOs, CIOs, and CEOs.', source: 'DataX Power Ltd. | Business Development Executive' }
    ],

    /* ===== DOMAIN KNOWLEDGE ===== */
    'logistics': [
      { text: 'Conducted requirements analysis for a manufacturing client\'s BI Enhancement project, covering demand forecasting, order fulfillment, and inventory management.', source: 'DataX Power Ltd. | Business Analyst', perf: 'BI Enhancement Project' },
      { text: 'Supported transport engineering and infrastructure project formation, bidding processes, and coordination with American and Australian partners.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern' },
      { text: 'Completed coursework in logistics and supply chain management as part of International Business Economics program.', source: 'Foreign Trade University | Academic Coursework' }
    ],
    'data-management': [
      { text: 'Managed project documentation and data flows across 10 departments and subsidiaries for investment proposals and public bidding.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern' },
      { text: 'Built and maintained lead databases across multiple verticals; developed internal data tools for the BD pipeline.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Tracked and analyzed campaign performance metrics across channels, building dashboards for operational insight.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Data & Analytics' }
    ],
    'public-policy': [
      { text: 'Studied international trade barriers, retaliatory tariffs, and export competitiveness through academic research and thesis work.', source: 'Foreign Trade University | Academic Research' },
      { text: 'Researched technology policies and digital application regulations across APAC countries for consulting engagements.', source: 'DataX Power Ltd. | Business Development Executive' }
    ],
    'finance': [
      { text: 'Completed coursework in international finance, economics, and business strategy as part of an internationally benchmarked program reviewed by Colorado State University.', source: 'Foreign Trade University | International Business Economics' }
    ]
  };

  /* ---- Helper: build inline panel HTML ---- */
  function buildPanel(skillName, tagEl) {
    const entries = skillMap[skillName] || [];
    const panel = document.createElement('div');
    panel.className = 'skill-inline-panel';
    panel.dataset.forTag = skillName;

    const title = document.createElement('h5');
    title.textContent = tagEl.textContent.trim() + ' in Practice';
    panel.appendChild(title);

    const ul = document.createElement('ul');
    if (entries.length === 0) {
      ul.innerHTML = '<li>No direct experience entries mapped yet.</li>';
    } else {
      entries.forEach(e => {
        const li = document.createElement('li');
        let html = e.text;
        if (e.perf) html += ' <span class="exp-perf">' + e.perf + '</span>';
        html += '<span class="exp-source">' + e.source + '</span>';
        li.innerHTML = html;
        ul.appendChild(li);
      });
    }
    panel.appendChild(ul);
    return panel;
  }

  /* ---- Remove any existing inline panel ---- */
  function removePanel() {
    const existing = document.querySelector('.skill-inline-panel');
    if (existing) existing.remove();
    document.querySelectorAll('.skill-tag.active').forEach(t => t.classList.remove('active'));
  }

  /* ---- See more: one category expanded at a time ---- */
  document.querySelectorAll('.skill-see-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const thisRow = btn.closest('.skill-row');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Close all other expanded rows
      document.querySelectorAll('.skill-see-more[aria-expanded="true"]').forEach(otherBtn => {
        if (otherBtn === btn) return;
        const otherRow = otherBtn.closest('.skill-row');
        otherRow.querySelectorAll('.skill-tag--hidden').forEach(t => { t.style.display = ''; });
        otherBtn.setAttribute('aria-expanded', 'false');
        otherBtn.textContent = 'See more';
        // Also close any inline panel in that row
        const otherPanel = otherRow.querySelector('.skill-inline-panel');
        if (otherPanel) {
          otherPanel.closest('.skill-row').querySelector('.skill-tag.active')?.classList.remove('active');
          otherPanel.remove();
        }
      });

      if (isExpanded) {
        // Collapse this row
        thisRow.querySelectorAll('.skill-tag--hidden').forEach(t => { t.style.display = ''; });
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'See more';
        // Close any open panel inside
        removePanel();
      } else {
        // Expand this row — show hidden tags
        thisRow.querySelectorAll('.skill-tag--hidden').forEach(t => { t.style.display = 'inline-flex'; });
        btn.setAttribute('aria-expanded', 'true');
        btn.textContent = 'See less';
      }
    });
  });

  /* ---- Skill tag click: inline panel directly inside row ---- */
  document.querySelectorAll('.skill-row').forEach(row => {
    row.addEventListener('click', e => {
      const tag = e.target.closest('.skill-tag[data-skill]');
      if (!tag || tag.classList.contains('skill-tag--no-panel')) return;

      const skill = tag.dataset.skill;
      const alreadyActive = tag.classList.contains('active');

      // Remove existing panel everywhere
      removePanel();

      if (alreadyActive) return; // toggle off

      // Mark active
      tag.classList.add('active');

      // Build and inject panel inside the row's header, after the tags div
      const header = row.querySelector('.skill-row-header');
      const panel = buildPanel(skill, tag);
      // Insert panel as a sibling after the header (inside .skill-row)
      header.after(panel);

      // Smooth scroll to bring panel into view
      setTimeout(() => {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    });
  });

  /* ---- Close panel when clicking outside skills section ---- */
  document.addEventListener('click', e => {
    if (!e.target.closest('#skills')) {
      removePanel();
    }
  });
}
/* ===== MODALS ===== */
function initModals() {
  const modalBtns = document.querySelectorAll('.open-modal-btn');
  
  modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (!modal) return;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      const closeBtn = modal.querySelector('.modal-close');
      
      function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      if (closeBtn) {
        closeBtn.onclick = closeModal;
      }
      
      modal.onclick = (e) => {
        if (e.target === modal) {
          closeModal();
        }
      };

      document.addEventListener('keydown', function escListener(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          closeModal();
          document.removeEventListener('keydown', escListener);
        }
      });
    });
  });
}

/* ===== FLOATING NEXT BUTTON ===== */
function initFloatingBtn() {
  const btn = document.getElementById('floating-next-btn');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  if (!btn || sections.length === 0) return;

  function handleScroll() {
    let currentSectionIndex = -1;
    const scrollY = window.scrollY;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      if (scrollY >= sections[i].offsetTop - 150) {
        currentSectionIndex = i;
        break;
      }
    }

    const projectsIndex = sections.findIndex(s => s.id === 'projects');
    if (currentSectionIndex >= projectsIndex) {
      btn.classList.add('hidden');
    } else {
      btn.classList.remove('hidden');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  btn.addEventListener('click', () => {
    let currentSectionIndex = 0;
    const scrollY = window.scrollY;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      if (scrollY >= sections[i].offsetTop - 150) {
        currentSectionIndex = i;
        break;
      }
    }
    
    if (currentSectionIndex < sections.length - 1) {
      const nextSection = sections[currentSectionIndex + 1];
      window.scrollTo({
        top: nextSection.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
}

/* ===== CERT SEE MORE TOGGLE ===== */
function initCertToggle() {
  const btn = document.getElementById('cert-see-more');
  if (!btn) return;
  const hiddenCards = document.querySelectorAll('.cert-card--hidden');

  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      hiddenCards.forEach(c => { c.style.display = ''; });
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'See more';
    } else {
      hiddenCards.forEach(c => { c.style.display = 'flex'; });
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = 'See less';
    }
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initWaves();
  initScrollAnimations();
  initNavbar();
  initSkillExperience();
  initCertToggle();
  initModals();
  initFloatingBtn();
});
