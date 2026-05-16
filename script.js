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

  function drawWave(yOffset, amplitude, wavelength, speed, color) {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for (let x = 0; x <= canvas.width; x += 2) {
      const y = yOffset +
        Math.sin((x / wavelength) + (time * speed)) * amplitude +
        Math.sin((x / (wavelength * 0.7)) + (time * speed * 0.8)) * (amplitude * 0.5);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const h = canvas.height;

    drawWave(h * 0.35, 40, 600, 0.3, 'rgba(59, 130, 184, 0.025)');
    drawWave(h * 0.45, 50, 500, 0.25, 'rgba(34, 184, 207, 0.02)');
    drawWave(h * 0.55, 35, 700, 0.35, 'rgba(124, 58, 237, 0.012)');
    drawWave(h * 0.7, 45, 550, 0.2, 'rgba(59, 130, 184, 0.018)');

    time += 0.008;
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

/* ===== SKILL-EXPERIENCE MATCHING ===== */
function initSkillExperience() {
  const skillTags = document.querySelectorAll('.skill-tag[data-skill]');
  const panel = document.getElementById('skill-exp-panel');
  const panelTitle = document.getElementById('skill-exp-title');
  const panelList = document.getElementById('skill-exp-list');
  const listWrap = document.getElementById('panel-list-wrap');
  const readMoreBtn = document.getElementById('panel-read-more');
  let activeSkill = null;

  /* Curated skill-to-experience mappings */
  const skillMap = {
    'research-analysis': [
      { text: 'Researched technology landscapes, policies, and digital application trends across customer industries (Technology/AI, Manufacturing, Logistics, Utilities, Energy, Retail, Edtech, Healthcare/Medtech, Law) in APAC and the UK.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst', perf: '8-10 bidding opportunities generated' },
      { text: 'Analyzed eligibility criteria and translated/synthesized technical requirements for public infrastructure bidding across national and international projects.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern', perf: '8 project bidding proposals' },
      { text: 'Led research on AI initiatives for personalizing mental healthcare as group project team leader in the IEDE program.', source: 'IEDE Program | Tsinghua University', perf: 'Team Leader, 8 members' },
      { text: 'Conducted market research and competitor analysis for youth talent programs and product management initiatives.', source: 'AIESEC in Vietnam, FHN Branch | Multiple Roles' }
    ],
    'data-collection': [
      { text: 'Built and maintained lead databases across multiple verticals using Apollo.io and Clay.com; helped develop a new lead generation tool with the team.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Collected primary and secondary data from industry leaders, public databases, and market intelligence reports for system consulting proposals.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Gathered and analyzed lead engagement metrics, campaign performance, and audience data across marketing channels.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Data & Analytics' }
    ],
    'data-visualization': [
      { text: 'Structured visual analyses and infographics for strategic presentations and client-facing system consulting proposals.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Created performance dashboards and KPI reports for weekly and monthly tracking; delivered detailed performance reports and analysis to national PICs.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head' }
    ],
    'synthesis-planning': [
      { text: 'Synthesized multi-source insights into system consulting proposals, pipelining to actual AI/system development engagements.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst', perf: '8-10 bidding opportunities' },
      { text: 'Translated and synthesized technical requirements from American and Australian partners into actionable project documentation for cross-departmental coordination.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern' },
      { text: 'Synthesized research findings and recommended AI initiatives for healthcare as group project leader.', source: 'IEDE Program | Tsinghua University', perf: 'Team Leader, 8 members' }
    ],
    'requirements-elicitation': [
      { text: 'Defined requirements for system consulting and AI/ML development proposals targeting enterprise clients across multiple industries.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst', perf: '8-10 bidding opportunities' },
      { text: 'Gathered and documented investor requirements for public bidding across 10 departments and subsidiaries; analyzed eligibility for both national and international projects.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern', perf: '8 project bidding proposals' }
    ],
    'business-writing': [
      { text: 'Authored 8-10 system consulting and AI development proposals with requirement definitions and analysis for enterprise clients across APAC and UK.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst', perf: '12.5% proposal win rate' },
      { text: 'Published LinkedIn article series about MLOps, providing technical knowledge and thought leadership for business development.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Prepared bidding documentation, translated technical requirements, and supported documentation coordination for infrastructure projects.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern' }
    ],
    'stakeholder-management': [
      { text: 'Engaged CTOs, CIOs, CEOs, and tech leaders across APAC and the UK through email outreach (Apollo.io, Clay.com) and LinkedIn for insight validation and project scoping.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Coordinated with American and Australian partners for documentation, engagement, and support arrangements on international infrastructure projects.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern' },
      { text: 'Managed relationships with 20+ international partners (India, Japan) for candidate matching and application processing; coordinated with national PICs for brand consistency.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition & Branch Leadership' }
    ],
    'project-coordination': [
      { text: 'Managed multiple concurrent workstreams under tight deadlines with AI-driven process optimization.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Supported international project delivery and contributed to 8 bidding proposals across 10 departments and subsidiaries.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern', perf: '8 project bidding proposals' },
      { text: 'Led and coordinated an 8-member research team for AI healthcare initiative; delivered research report and presentation.', source: 'IEDE Program | Tsinghua University', perf: 'Team Leader & Main Researcher' },
      { text: 'Coordinated with national PICs to pipeline brand consistency and delivered detailed performance reports across recruitment campaigns.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head' }
    ],
    'b2b-marketing': [
      { text: 'Developed B2B marketing strategies for system consulting and AI development services, targeting CTOs, CIOs, and CEOs across Technology, Manufacturing, Logistics, Energy, Healthcare, and more.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Published LinkedIn posts and article series (notably on MLOps) for both client attraction and industry knowledge sharing.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Executed email outreach campaigns using Apollo.io and Clay.com; helped develop a new lead generation tool with the team.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' }
    ],
    'pitching': [
      { text: 'Pitched system consulting and AI/ML solutions to prospective enterprise clients; authored requirement definitions, analysis, and tailored proposals.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst', perf: '8-10 bids, 12.5% win rate' },
      { text: 'Conducted 50+ sales consultation calls to convert leads into program participants across AIESEC Global Talent.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive', perf: '230% KPI achieved' }
    ],
    'sales-negotiation': [
      { text: 'Generated 143 qualified leads through multi-channel outreach (Facebook, Zalo, Threads, email marketing) and strategic sales consultation.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive', perf: '143 LEADs, 230% KPI, 25% conversion increase' },
      { text: 'Connected with international partners in India and Japan, matching candidates and pushing application processes.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive' }
    ],
    'contract-management': [
      { text: 'Managed cross-functional documentation, contract processes, and legal compliance across departments and subsidiaries for public infrastructure bidding.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern' }
    ],
    'empathy': [
      { text: 'Built an immersive web experience exploring tarot card interpretations and the Fool\'s Journey, blending empathy-driven storytelling with interactive design.', source: 'Project | Tarot Card Quiz' },
      { text: 'Researched and recommended AI initiatives for personalizing mental healthcare, bridging technology with human-centered care.', source: 'IEDE Program | Tsinghua University', perf: 'Team Leader, 8 members' },
      { text: 'Organized professional photoshoot for ~100 members, capturing individual stories for an avatar changing wave that spread AIESEC brand through personal connection.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head', perf: '244 qualified applicants, 100%+ KPI' },
      { text: 'Provided advisory support for international candidates from India and Japan during onboarding, bridging cultural and logistical challenges.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive' }
    ],
    'marketing-strategy': [
      { text: 'Designed and executed multi-tactic recruitment campaigns: community group seeding, email marketing, influencer marketing (KOL & KOC), university club support, leaflets & POSM, ads, and an avatar changing wave.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head', perf: '244 qualified applicants in 1 month, 100%+ KPI' },
      { text: 'Led multi-channel marketing for Product Management Challenge 2023 (case competition) and Product Management Essentials 2023 (hybrid course), including event support and product/visual design.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Executive, The A Program' },
      { text: 'Published LinkedIn content strategy for client attraction and industry knowledge, including MLOps article series.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' }
    ],
    'content-marketing': [
      { text: 'Managed Facebook page content strategy driving consistent audience growth; posts/stories on Facebook, Instagram, Threads.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Executive, The A Program', perf: '8,000+ followers, 10% monthly growth' },
      { text: 'Created content posts and group seeding across community groups for recruitment marketing campaigns.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head', perf: '244 qualified applicants in 1 month' },
      { text: 'Published LinkedIn articles and posts for both client attraction and knowledge sharing (MLOps series).', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' }
    ],
    'copywriting': [
      { text: 'Wrote copy for social media campaigns, email newsletters, and event marketing materials across AIESEC programs; specialized in marketing data and analytics.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Executive, The A Program' },
      { text: 'Created campaign copy for recruitment drives across Facebook, Instagram, Threads, and email channels.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head' }
    ],
    'social-media': [
      { text: 'Managed Facebook community of 8,000+ members and page with 8,000+ followers; moderated content and created engagement strategies.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Executive, The A Program', perf: '8,000+ community, 8,000+ followers' },
      { text: 'Executed multi-platform campaigns (Facebook, Instagram, Threads) including an avatar changing wave using professional photoshoot of ~100 members.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head', perf: '244 qualified applicants' }
    ],
    'community-building': [
      { text: 'Led 3-member team across social media and events tactics; organized photoshoot for ~100 members for avatar changing wave to spread AIESEC brand.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head', perf: '244 qualified applicants, 100%+ KPI' },
      { text: 'Connected with international partners in India and Japan, matching candidates and pushing application processes across Global Talent program.', source: 'AIESEC in Vietnam, FHN Branch | Customer Acquisition Executive' },
      { text: 'Supported event organization as marketing subcommittee member.', source: 'Violas Association | Marketing Subcommittee' }
    ],
    'email-marketing': [
      { text: 'Pioneered email marketing tactics across AIESEC programs using Mailchimp, Beefree, and Mergo for recruitment drives and event promotion.', source: 'AIESEC in Vietnam, FHN Branch | Multiple Leadership & Executive Roles' },
      { text: 'Deployed email marketing as key tactic in multi-channel recruitment campaigns targeting university candidates.', source: 'AIESEC in Vietnam, FHN Branch | Branch Talent Attraction Head' },
      { text: 'Executed B2B email outreach campaigns using Apollo.io and Clay.com targeting CTOs, CIOs, and CEOs.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' }
    ],
    'technology': [
      { text: 'Worked in AI/ML consulting covering AI/ML, infrastructure, data annotation, edge AI, Software, and SaaS; researched technology landscapes and policies across APAC countries.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' },
      { text: 'Researched and recommended AI initiatives for personalizing mental healthcare as team leader in the IEDE program.', source: 'IEDE Program | Tsinghua University', perf: 'Team Leader, 8 members' },
      { text: 'Built an interactive web application blending storytelling, design, and AI-assisted development.', source: 'Project | Tarot Card Quiz' },
      { text: 'Completed Gemini Certified Student & Educator certification, deepening practical AI workflow knowledge.', source: 'Certificate | Google Gemini' }
    ],
    'logistics': [
      { text: 'Supported transport engineering and infrastructure project formation, bidding processes, and coordination with American and Australian partners.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern' },
      { text: 'Completed coursework in logistics and supply chain management as part of International Business Economics program.', source: 'Foreign Trade University | Academic Coursework' }
    ],
    'data-management': [
      { text: 'Managed project documentation and data flows across 10 departments and subsidiaries for investment proposals and public bidding.', source: 'Transport Engineering Design Inc. | Marketing & Project Formation Intern' },
      { text: 'Specialized in data roles within marketing; tracked and analyzed campaign performance metrics across channels.', source: 'AIESEC in Vietnam, FHN Branch | Marketing Data & Analytics' }
    ],
    'public-policy': [
      { text: 'Studied international trade barriers, retaliatory tariffs, and export competitiveness through academic research and thesis work.', source: 'Foreign Trade University | Academic Research' },
      { text: 'Researched technology policies and digital application regulations across APAC countries for consulting engagements.', source: 'DataX Power Ltd. | Business Development Executive & Business Analyst' }
    ],
    'finance': [
      { text: 'Completed coursework in international finance, economics, and business strategy as part of an internationally benchmarked program reviewed by Colorado State University.', source: 'Foreign Trade University | International Business Economics' }
    ]
  };

  skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const skill = tag.dataset.skill;

      // Toggle off
      if (activeSkill === skill) {
        activeSkill = null;
        tag.classList.remove('active');
        panel.classList.remove('open');
        listWrap.classList.remove('expanded');
        readMoreBtn.classList.remove('visible');
        readMoreBtn.textContent = 'Read more';
        return;
      }

      // Clear previous
      skillTags.forEach(t => t.classList.remove('active'));
      activeSkill = skill;
      tag.classList.add('active');

      // Skip panel for Tools & Platforms
      if (tag.hasAttribute('data-no-panel')) {
        panel.classList.remove('open');
        return;
      }

      const entries = skillMap[skill] || [];
      panelTitle.textContent = tag.textContent + ' in Practice';
      panelList.innerHTML = '';

      if (entries.length === 0) {
        panelList.innerHTML = '<li>No direct experience entries mapped yet.</li>';
      } else {
        entries.forEach(e => {
          const li = document.createElement('li');
          let html = e.text;
          if (e.perf) {
            html += ' <span class="exp-perf">' + e.perf + '</span>';
          }
          html += '<div class="exp-source">' + e.source + '</div>';
          li.innerHTML = html;
          panelList.appendChild(li);
        });
      }

      // Reset collapsed state
      listWrap.classList.remove('expanded');
      readMoreBtn.textContent = 'Read more';
      panel.classList.add('open');

      // Show read more only if content overflows
      setTimeout(() => {
        const listHeight = panelList.scrollHeight;
        if (listHeight > 150) {
          readMoreBtn.classList.add('visible');
        } else {
          readMoreBtn.classList.remove('visible');
          listWrap.classList.add('expanded');
        }
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 120);
    });
  });

  // Read more toggle
  readMoreBtn.addEventListener('click', () => {
    const isExpanded = listWrap.classList.toggle('expanded');
    readMoreBtn.textContent = isExpanded ? 'Read less' : 'Read more';
  });
}

/* ===== EVENTS MODAL ===== */
function initEventsModal() {
  const modalBtn = document.querySelector('.open-modal-btn');
  const modal = document.getElementById('events-modal');
  if (!modalBtn || !modal) return;
  
  const closeBtn = modal.querySelector('.modal-close');

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
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

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initWaves();
  initScrollAnimations();
  initNavbar();
  initSkillExperience();
  initEventsModal();
  initFloatingBtn();
});
