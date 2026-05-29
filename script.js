const revealItems = document.querySelectorAll('.reveal');
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

function bindWhatsAppLinks() {
  document.querySelectorAll('a[href^="https://wa.me/60163287585"]').forEach((link) => {
    if (link.dataset.whatsappBound === 'true') return;
    link.dataset.whatsappBound = 'true';
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = link.href;
    });
  });
}

bindWhatsAppLinks();

function buildGlobalFooter() {
  const footer = document.createElement('footer');
  footer.className = 'global-footer';
  footer.innerHTML = `
    <div class="global-footer-grid">
      <div class="global-footer-brand">
        <a href="index.html" aria-label="Hive Mind Marketing home">
          <img src="assets/hive-mind-logo-header.png" alt="Hive Mind Marketing">
        </a>
      </div>
      <nav class="global-footer-col" aria-label="Services">
        <h3>Services</h3>
        <a href="services.html#digital-web">Website</a>
        <a href="services.html#social-influencer">Social Media</a>
        <a href="services.html#brand-strategy">Marketing Strategy</a>
        <a href="services.html#live-production">Video Production</a>
        <a href="services.html#advertising">Ads Management</a>
      </nav>
      <nav class="global-footer-col" aria-label="Work">
        <h3>Work</h3>
        <a href="work.html">Featured Work</a>
        <a href="work.html#all-projects">All Projects</a>
        <a href="work.html#milolo">Case Studies</a>
      </nav>
      <nav class="global-footer-col" aria-label="About">
        <h3>About</h3>
        <a href="about.html">Our Story</a>
        <a href="about.html#founder">Founder</a>
      </nav>
      <nav class="global-footer-col" aria-label="Experiences">
        <h3>Experiences</h3>
        <a href="insights.html">Behind The Scenes</a>
        <a href="services.html#live-production">Production</a>
        <a href="work.html">Creative Direction</a>
      </nav>
      <nav class="global-footer-col" aria-label="Contact">
        <h3>Contact</h3>
        <a href="https://wa.me/60163287585">Start A Project</a>
        <a href="contact.html">Collaborations</a>
        <a href="contact.html">General Enquiries</a>
      </nav>
      <nav class="global-footer-social" aria-label="Social links">
        <a href="#" aria-label="Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"></rect><circle cx="12" cy="12" r="3.6"></circle><circle cx="17" cy="7" r="1"></circle></svg>
        </a>
        <a href="#" aria-label="TikTok">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4v10.3a4 4 0 1 1-3.8-4"></path><path d="M14 4c1 3.2 2.8 4.8 5.4 5"></path></svg>
        </a>
        <a href="#" aria-label="Facebook">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 8.2h2.1V4.8h-2.7c-3 0-4.6 1.8-4.6 4.8v2H6.8v3.7h2.5V21h4.1v-5.7h2.9l.5-3.7h-3.4V10c0-1.1.4-1.8 1.1-1.8Z"></path></svg>
        </a>
        <a href="#" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10h3.5v10H5z"></path><path d="M6.8 4.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"></path><path d="M12 10h3.3v1.5c.6-.9 1.7-1.8 3.3-1.8 2.4 0 4.1 1.6 4.1 5V20h-3.5v-4.7c0-1.3-.6-2.1-1.7-2.1-1 0-1.7.7-2 1.4-.1.3-.1.6-.1 1V20H12z"></path></svg>
        </a>
      </nav>
    </div>
    <div class="global-footer-bottom">
      <p>&copy; 2026 Hivemind Marketing. All rights reserved.</p>
      <nav aria-label="Legal links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms &amp; Conditions</a>
      </nav>
    </div>
  `;
  return footer;
}

function setupGlobalFooter() {
  const footer = buildGlobalFooter();
  const existingFooter = document.querySelector('footer');
  if (existingFooter) {
    existingFooter.replaceWith(footer);
    return;
  }
  const main = document.querySelector('main');
  if (main) main.insertAdjacentElement('afterend', footer);
}

setupGlobalFooter();
bindWhatsAppLinks();

document.querySelectorAll('.home-v2-service-rail').forEach((rail) => {
  const resetRail = () => {
    rail.scrollTo({ left: 0, behavior: 'auto' });
  };
  resetRail();
  requestAnimationFrame(resetRail);
  window.addEventListener('load', resetRail, { once: true });
  [80, 320, 900].forEach((delay) => setTimeout(resetRail, delay));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      if (entry.target.classList.contains('work-strip')) {
        entry.target.querySelectorAll('.work-card').forEach((card, index) => {
          card.style.transitionDelay = `${index * 70}ms`;
          card.classList.add('is-visible');
        });
      }
    }
  });
}, { threshold: 0.18 });

revealItems.forEach((item) => observer.observe(item));

const parallaxItems = document.querySelectorAll('.parallax');
let ticking = false;
const header = document.querySelector('.site-header');

function updateParallax() {
  const y = window.scrollY;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  progressBar.style.setProperty('--scroll-progress', `${(y / maxScroll) * 100}%`);
  if (header) header.classList.toggle('is-scrolled', y > 18);
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.speed || 0.04);
    item.style.setProperty('--parallax-y', `${y * speed}px`);
  });
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

document.querySelectorAll('[data-scroll-target]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const target = document.querySelector(trigger.dataset.scrollTarget);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelectorAll('.horizontal-scroll').forEach((scroller) => {
  scroller.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      scroller.scrollLeft += event.deltaY;
    }
  }, { passive: false });
});

document.querySelectorAll('[data-rail-control]').forEach((control) => {
  control.addEventListener('click', () => {
    const target = document.querySelector(control.dataset.railTarget);
    if (!target) return;
    const item = target.children[0];
    const gap = Number.parseFloat(getComputedStyle(target).columnGap || 20);
    const distance = item ? item.getBoundingClientRect().width + gap : 320;
    target.scrollBy({
      left: control.dataset.railControl === 'next' ? distance : -distance,
      behavior: 'smooth'
    });
  });
});

function setupAutoRail(scroller, interval = 2800) {
  if (!scroller || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let paused = false;
  const step = () => {
    if (paused) return;
    const item = scroller.children[0];
    const gap = Number.parseFloat(getComputedStyle(scroller).columnGap || 20);
    const distance = item ? item.getBoundingClientRect().width + gap : 360;
    const endReached = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - distance * 0.45;

    scroller.scrollTo({
      left: endReached ? 0 : scroller.scrollLeft + distance,
      behavior: 'smooth'
    });
  };

  const timer = window.setInterval(step, interval);
  scroller.addEventListener('pointerenter', () => { paused = true; });
  scroller.addEventListener('pointerleave', () => { paused = false; });
  scroller.addEventListener('focusin', () => { paused = true; });
  scroller.addEventListener('focusout', () => { paused = false; });
  scroller.addEventListener('touchstart', () => { paused = true; }, { passive: true });
  scroller.addEventListener('touchend', () => {
    window.setTimeout(() => { paused = false; }, interval);
  }, { passive: true });

  return timer;
}

setupAutoRail(document.querySelector('.work-strip'), 3200);
document.querySelectorAll('.horizontal-scroll').forEach((scroller) => setupAutoRail(scroller, 2600));
setupAutoRail(document.querySelector('.help-rail'), 3000);
setupAutoRail(document.querySelector('.service-category-nav'), 3400);

const featuredProjects = [
  {
    title: 'Your Face',
    type: 'Brand Campaign',
    description: 'Turning emotional identity into a collectible retail experience.',
    image: 'url("assets/your-face-launch.jpg")',
    position: 'center 45%',
    link: 'work.html#face'
  },
  {
    title: 'Milolo Bursa',
    type: 'Event Campaign',
    description: 'A launch moment shaped for visibility, emotion and public attention.',
    image: 'url("assets/milolo-bursa-malaysia.jpg")',
    position: '24% 62%',
    link: 'work.html#milolo'
  },
  {
    title: 'AZ Interior',
    type: 'Creator Campaign',
    description: 'Influencer-led content designed to make a premium space feel trusted.',
    image: 'url("assets/az-influencer-campaign.jpg")',
    position: 'center 52%',
    link: 'work.html#az'
  },
  {
    title: 'ButterKaya',
    type: 'KOL Campaign',
    description: 'Retail attention built through creator visits and customer energy.',
    image: 'url("assets/butterkaya-kol-campaign.jpg")',
    position: 'center 50%',
    link: 'work.html#mixue'
  },
  {
    title: 'Book of Records',
    type: 'Milestone Moment',
    description: 'A record-setting activation framed as a memorable brand proof point.',
    image: 'url("assets/milolo-malaysia-book-records.jpg")',
    position: 'center 24%',
    link: 'work.html#records'
  }
];

const featuredPanel = document.querySelector('[data-featured-panel]');
let featuredIndex = 0;

function renderFeaturedProject(index) {
  if (!featuredPanel) return;
  featuredIndex = (index + featuredProjects.length) % featuredProjects.length;
  const project = featuredProjects[featuredIndex];
  featuredPanel.style.setProperty('--featured-image', project.image);
  featuredPanel.style.setProperty('--featured-position', project.position);
  featuredPanel.querySelector('[data-featured-type]').textContent = project.type;
  featuredPanel.querySelector('[data-featured-title]').textContent = project.title;
  featuredPanel.querySelector('[data-featured-description]').textContent = project.description;
  featuredPanel.querySelector('[data-featured-link]').setAttribute('href', project.link);
  featuredPanel.querySelector('[data-featured-count]').textContent = `${String(featuredIndex + 1).padStart(2, '0')} / ${String(featuredProjects.length).padStart(2, '0')}`;
  document.querySelectorAll('[data-featured-index]').forEach((thumb) => {
    thumb.classList.toggle('is-active', Number(thumb.dataset.featuredIndex) === featuredIndex);
  });
}

document.querySelectorAll('[data-featured-control]').forEach((control) => {
  control.addEventListener('click', () => {
    renderFeaturedProject(featuredIndex + (control.dataset.featuredControl === 'next' ? 1 : -1));
  });
});

document.querySelectorAll('[data-featured-index]').forEach((thumb) => {
  thumb.addEventListener('click', () => {
    renderFeaturedProject(Number(thumb.dataset.featuredIndex));
  });
});

renderFeaturedProject(0);

if (featuredPanel && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let featuredPaused = false;
  window.setInterval(() => {
    if (!featuredPaused) renderFeaturedProject(featuredIndex + 1);
  }, 4600);
  featuredPanel.addEventListener('pointerenter', () => { featuredPaused = true; });
  featuredPanel.addEventListener('pointerleave', () => { featuredPaused = false; });
  featuredPanel.addEventListener('focusin', () => { featuredPaused = true; });
  featuredPanel.addEventListener('focusout', () => { featuredPaused = false; });
}

const workFeatureShowcase = document.querySelector('.work-feature-showcase');

if (workFeatureShowcase) {
  const workFeatureProjects = [
    {
      title: 'Milolo Bursa',
      eyebrow: 'Featured Project',
      description: 'An immersive event campaign that brought people together.',
      image: 'assets/milolo-bursa-malaysia.jpg',
      position: 'center 46%',
      link: 'work.html#milolo'
    },
    {
      title: 'ButterKaya',
      eyebrow: 'KOL Campaign',
      description: 'Retail attention built through creator visits and customer energy.',
      image: 'assets/butterkaya-kol-campaign.jpg',
      position: 'center 55%',
      link: 'work.html#butterkaya'
    },
    {
      title: 'ButterKaya Setapak',
      eyebrow: 'Grand Opening',
      description: 'A launch moment designed to feel warm, busy and memorable.',
      image: 'assets/butterkaya-setapak-grand-opening.png',
      position: 'center 50%',
      link: 'work.html#butterkaya'
    },
    {
      title: 'AZ Interior Design',
      eyebrow: 'Influencer Marketing',
      description: 'Creator-led content that makes premium spaces feel trusted.',
      image: 'assets/az-interior-influencer-marketing.jpg',
      position: 'center 52%',
      link: 'work.html#az'
    }
  ];

  const workFeatureMain = workFeatureShowcase.querySelector('.work-feature-main');
  const workFeatureImage = workFeatureShowcase.querySelector('.work-feature-image');
  const workFeatureEyebrow = workFeatureShowcase.querySelector('.work-feature-copy p');
  const workFeatureTitle = workFeatureShowcase.querySelector('.work-feature-copy h2');
  const workFeatureDescription = workFeatureShowcase.querySelector('.work-feature-copy span');
  const workFeatureLink = workFeatureShowcase.querySelector('.work-feature-copy a');
  const workFeatureThumbs = [...workFeatureShowcase.querySelectorAll('.work-feature-strip > button')];
  const workFeatureControls = [...workFeatureShowcase.querySelectorAll('.work-strip-controls button')];
  const workFeatureProgress = document.createElement('div');
  const workFeatureCounter = document.createElement('div');
  let workFeatureIndex = 0;
  let workFeaturePaused = false;

  workFeatureProgress.className = 'work-feature-progress';
  workFeatureCounter.className = 'work-feature-counter';
  workFeatureMain.append(workFeatureProgress, workFeatureCounter);

  function renderWorkFeature(index, instant = false) {
    workFeatureIndex = (index + workFeatureProjects.length) % workFeatureProjects.length;
    const project = workFeatureProjects[workFeatureIndex];

    workFeatureShowcase.classList.add('is-switching');
    window.setTimeout(() => {
      workFeatureEyebrow.textContent = project.eyebrow;
      workFeatureTitle.textContent = project.title;
      workFeatureDescription.textContent = project.description;
      workFeatureLink.href = project.link;
      workFeatureImage.style.backgroundImage = `linear-gradient(90deg, rgba(0,0,0,.18), rgba(0,0,0,.02)), url("${project.image}")`;
      workFeatureImage.style.backgroundPosition = project.position;
      workFeatureCounter.textContent = `${String(workFeatureIndex + 1).padStart(2, '0')} / ${String(workFeatureProjects.length).padStart(2, '0')}`;
      workFeatureThumbs.forEach((thumb, thumbIndex) => thumb.classList.toggle('is-active', thumbIndex === workFeatureIndex));
      workFeatureProgress.style.animation = 'none';
      workFeatureProgress.offsetHeight;
      workFeatureProgress.style.animation = 'workFeatureProgress 4.8s linear both';
      workFeatureShowcase.classList.remove('is-switching');
    }, instant ? 0 : 180);
  }

  workFeatureThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => renderWorkFeature(index));
  });

  workFeatureControls.forEach((control, index) => {
    control.addEventListener('click', () => renderWorkFeature(workFeatureIndex + (index === 1 ? 1 : -1)));
  });

  if (workFeatureMain) {
    workFeatureMain.addEventListener('pointermove', (event) => {
      const rect = workFeatureMain.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      workFeatureMain.style.setProperty('--feature-tilt-x', `${(0.5 - y) * 3.5}deg`);
      workFeatureMain.style.setProperty('--feature-tilt-y', `${(x - 0.5) * 4.5}deg`);
      workFeatureMain.style.setProperty('--feature-glow-x', `${x * 100}%`);
      workFeatureMain.style.setProperty('--feature-glow-y', `${y * 100}%`);
    });

    workFeatureMain.addEventListener('pointerleave', () => {
      workFeatureMain.style.setProperty('--feature-tilt-x', '0deg');
      workFeatureMain.style.setProperty('--feature-tilt-y', '0deg');
      workFeatureMain.style.setProperty('--feature-glow-x', '65%');
      workFeatureMain.style.setProperty('--feature-glow-y', '35%');
    });
  }

  workFeatureShowcase.addEventListener('focusin', () => { workFeaturePaused = true; });
  workFeatureShowcase.addEventListener('focusout', () => { workFeaturePaused = false; });

  renderWorkFeature(0, true);

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setInterval(() => {
      if (!workFeaturePaused) renderWorkFeature(workFeatureIndex + 1);
    }, 4800);
  }
}

document.querySelectorAll('.work-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty('--pointer-x', `${x * 100}%`);
    card.style.setProperty('--pointer-y', `${y * 100}%`);
    card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
    card.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--pointer-x', '50%');
    card.style.setProperty('--pointer-y', '35%');
  });
});

const projectTiles = document.querySelectorAll('.work-project-tile');

if (projectTiles.length) {
  const projectTileObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-card-visible');
        projectTileObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.22, rootMargin: '0px 0px -8% 0px' });

  projectTiles.forEach((tile, index) => {
    tile.style.setProperty('--project-delay', `${(index % 3) * 95}ms`);
    projectTileObserver.observe(tile);

    tile.addEventListener('pointermove', (event) => {
      const rect = tile.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      tile.style.setProperty('--project-glow-x', `${x * 100}%`);
      tile.style.setProperty('--project-glow-y', `${y * 100}%`);
      tile.style.setProperty('--project-tilt-x', `${(0.5 - y) * 5}deg`);
      tile.style.setProperty('--project-tilt-y', `${(x - 0.5) * 6}deg`);
    });

    tile.addEventListener('pointerleave', () => {
      tile.style.setProperty('--project-glow-x', '68%');
      tile.style.setProperty('--project-glow-y', '26%');
      tile.style.setProperty('--project-tilt-x', '0deg');
      tile.style.setProperty('--project-tilt-y', '0deg');
    });
  });
}

document.querySelectorAll('.contact-apple-form').forEach((form) => {
  form.querySelectorAll('[data-choice-group]').forEach((group) => {
    const input = form.querySelector(`input[name="${group.dataset.choiceGroup}"]`);
    const buttons = group.querySelectorAll('[data-choice-value]');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((item) => item.classList.remove('is-selected'));
        button.classList.add('is-selected');
        if (input) input.value = button.dataset.choiceValue;
      });
    });
  });

  form.querySelectorAll('[data-auto-textarea]').forEach((textarea) => {
    const resize = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener('input', resize);
    resize();
  });
});
