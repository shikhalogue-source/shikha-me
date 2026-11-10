/* =====================================================================
   shikha: portfolio interactions
   Renders everything from js/content.js, then layers on motion with
   GSAP + ScrollTrigger + SplitText and Lenis smooth scrolling.
   ===================================================================== */
(function () {
  'use strict';

  const S = window.SITE;
  const PAGE = document.body.dataset.page;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => matchMedia('(max-width: 767px)').matches;
  const pad = (n) => String(n).padStart(2, '0');
  const HOME = './';

  const ARROW = '<svg class="btn__icon" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9L9 3M9 3H4M9 3V8" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';
  const ARROW_ROW = '<svg class="modal__arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9L9 3M9 3H4M9 3V8" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>';

  gsap.registerPlugin(ScrollTrigger, SplitText);
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* ===================================================================
     RENDER: shared chrome (nav, menu, footer, cursor, modal)
     =================================================================== */
  function renderChrome() {
    const L = S.links;
    const year = new Date().getFullYear();
    const navLinks = [['Work', 'work'], ['About', 'about'], ['Services', 'services']];

    $('[data-chrome-top]').outerHTML = `
      <div class="transition" data-transition aria-hidden="true">${'<div class="transition__row"></div>'.repeat(8)}</div>
      <header class="nav" data-nav data-theme-nav="light">
        <a class="nav__logo" href="${HOME}" data-home-link><span data-roll>${esc(S.name)}</span></a>
        <nav class="nav__links" aria-label="Main">
          ${navLinks.map(([t, id]) => `<a href="${HOME}#${id}" data-anchor="${id}"><span data-roll>${t}</span></a>`).join('')}
        </nav>
        <div class="nav__right">
          <button class="btn" type="button" data-modal-open><span data-roll>Get in touch</span>${ARROW}</button>
          <button class="btn nav__menu-btn" type="button" data-menu-toggle aria-expanded="false" aria-controls="menu"><span data-menu-label>Menu</span></button>
        </div>
      </header>
      <div class="menu" id="menu" data-menu aria-hidden="true">
        <nav class="menu__links" aria-label="Mobile">
          ${navLinks.map(([t, id]) => `<a href="${HOME}#${id}" data-anchor="${id}">${t}</a>`).join('')}
          <button type="button" data-modal-open style="text-align:left">Get in touch</button>
        </nav>
        <div class="menu__social">
          <a href="${L.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${L.instagram}" target="_blank" rel="noopener">Instagram</a>
          <a href="mailto:${S.email}">Email</a>
        </div>
      </div>`;

    $('[data-chrome-bottom]').outerHTML = `
      <footer class="footer" data-theme-section="light" data-footer>
        <div class="footer__inner" data-footer-inner>
          <canvas class="footer__dots" data-dots aria-hidden="true"></canvas>
          <div class="footer__top">
            <div class="footer__cta">
              <h2 data-split="heading">Let’s make something that feels like something.</h2>
              <button class="btn" type="button" data-modal-open><span data-roll>Get in touch</span>${ARROW}</button>
            </div>
            <div class="footer__cols">
              <div class="footer__col">
                <span class="mono">Navigation</span>
                ${navLinks.map(([t, id]) => `<a class="u-link" href="${HOME}#${id}" data-anchor="${id}">${t}</a>`).join('')}
                <a class="u-link" href="#top" data-back-top>Back to top</a>
              </div>
              <div class="footer__col">
                <span class="mono">Social</span>
                <a class="u-link" href="${L.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
                <a class="u-link" href="${L.instagram}" target="_blank" rel="noopener">Instagram</a>
                <a class="u-link" href="${L.studio}" target="_blank" rel="noopener">Nirmano Studio</a>
              </div>
              <div class="footer__col">
                <span class="mono">Contact</span>
                <a class="u-link" href="mailto:${S.email}">Email me</a>
                <button class="footer__copy-email u-link" type="button" data-copy-email>${esc(S.email)}</button>
              </div>
            </div>
          </div>
          <div class="footer__bottom-wrap">
            <div class="bigname" data-fit-name data-footer-name aria-hidden="true"></div>
            <div class="footer__bottom mono">
              <span>©${year} ${esc(S.name)}</span>
              <span>${esc(S.role)}</span>
              <a href="#top" data-back-top>Back to top ↑</a>
            </div>
          </div>
        </div>
        <div class="footer__dark" data-footer-dark></div>
      </footer>

      <div class="cursor" data-cursor aria-hidden="true"><div class="cursor__pill"><span data-cursor-text>View project</span>${ARROW}</div></div>

      <div class="modal" data-modal role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-hidden="true">
        <div class="modal__backdrop" data-modal-close></div>
        <div class="modal__card">
          <div class="modal__head">
            <span class="mono muted">Get in touch</span>
            <button class="modal__close" type="button" data-modal-close aria-label="Close"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.5"/></svg></button>
          </div>
          <div>
            <h2 class="modal__title" id="modal-title">Let’s create something soulful.</h2>
            <p class="modal__text" style="margin-top:.9em">Whether it’s a role, a collaboration or a brand that needs a world of its own, I’d love to hear about it.</p>
          </div>
          <div class="modal__rows">
            <div class="modal__row">
              <a class="modal__row-left" href="mailto:${S.email}"><span class="mono">Email</span><span>${esc(S.email)}</span></a>
              <button class="modal__copy" type="button" data-copy-email>Copy</button>
            </div>
            <a class="modal__row" href="${L.linkedin}" target="_blank" rel="noopener"><span class="modal__row-left"><span class="mono">LinkedIn</span><span>in/shikha-j</span></span>${ARROW_ROW}</a>
            <a class="modal__row" href="${L.instagram}" target="_blank" rel="noopener"><span class="modal__row-left"><span class="mono">Instagram</span><span>${esc(L.instagramHandle)}</span></span>${ARROW_ROW}</a>
            <a class="modal__row" href="${L.studio}" target="_blank" rel="noopener"><span class="modal__row-left"><span class="mono">Studio</span><span>Nirmano Creative Studio</span></span>${ARROW_ROW}</a>
          </div>
        </div>
      </div>`;

    fillBigName($('[data-footer-name]'));
  }

  function fillBigName(el) {
    if (!el) return;
    el.innerHTML = [S.name].map((w) =>
      `<span class="bigname__word">${[...w].map((c) => `<span class="char-mask"><span class="char">${esc(c)}</span></span>`).join('')}</span>`
    ).join('');
  }

  /* ===================================================================
     RENDER: home
     =================================================================== */
  function renderHome() {
    $('[data-hero-title]').innerHTML = S.hero.title.map((t) => `<span>${esc(t)}</span>`).join('');
    $('[data-hero-text]').textContent = S.hero.text;
    $('[data-hero-label]').textContent = S.hero.label;
    fillBigName($('[data-hero-name]'));

    $('[data-sticky-inner]').innerHTML = S.statements.map((t) => `<h2 class="sticky__el">${esc(t)}</h2>`).join('');

    // Work: featured projects get the big rows, the rest go to "Other projects"
    const featured = S.projects.filter((p) => p.featured !== false);
    const others = S.projects.filter((p) => p.featured === false);

    $('[data-work-list]').innerHTML = featured.map((p, i) => {
      const hover = p.hover?.video
        ? `<video class="work__video" data-src="${p.hover.video}" muted loop playsinline preload="none" aria-hidden="true"></video>`
        : p.hover?.images
          ? `<div class="work__slides" aria-hidden="true">${p.hover.images.map((s) => `<img data-src="${s}" alt="" decoding="async">`).join('')}</div>`
          : '';
      return `
        <a class="work__item" href="work.html?p=${encodeURIComponent(p.slug)}" data-work-item data-page-link data-cursor-hover data-cursor-text="View project">
          <div class="work__media" data-cursor-image data-reveal-media>
            <div class="work__parallax" data-parallax-inner>
              <img class="work__img" src="${p.cover.src}" alt="${esc(p.cover.alt)}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async" style="object-position:${p.cover.position || '50% 50%'}">
            </div>
            ${hover}
          </div>
          <div class="work__desc">
            <div class="work__head" data-fade-group>
              <div class="work__num">${pad(i + 1)}</div>
              <h3 class="work__title">${esc(p.title)}</h3>
              <p class="work__p">${esc(p.summary)}</p>
            </div>
            <div class="work__meta" data-fade-group>
              <span class="mono work__year">${esc(p.year)}</span>
              <div class="work__tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
            </div>
          </div>
        </a>
        <div class="work__divider-row"><div class="work__divider" data-divider></div></div>`;
    }).join('');

    // Other projects: compact list with a floating preview on hover
    const othersSection = $('[data-others]');
    if (!others.length) othersSection.remove();
    else {
      $('[data-others-list]').innerHTML = others.map((p, i) => `
        <a class="others__item" href="work.html?p=${encodeURIComponent(p.slug)}" data-page-link data-other="${i}" data-fade>
          <span class="others__num mono">${pad(featured.length + i + 1)}</span>
          <span class="others__thumb" aria-hidden="true"><img src="${p.cover.src}" alt="" loading="lazy" decoding="async" style="object-position:${p.cover.position || '50% 50%'}"></span>
          <span class="others__title">${esc(p.title)}</span>
          <span class="others__meta"><span class="mono">${esc(p.year)}</span><span class="others__tags">${p.tags.map(esc).join(' · ')}</span></span>
          <svg class="others__arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9L9 3M9 3H4M9 3V8" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>
        </a>`).join('');
      $('[data-others-preview]').innerHTML = others.map((p) =>
        `<img src="${p.cover.src}" alt="" loading="lazy" decoding="async" style="object-position:${p.cover.position || '50% 50%'}">`).join('');
    }

    // About
    const A = S.about;
    $('[data-about-portrait]').innerHTML = `<img src="${A.portrait.src}" alt="${esc(A.portrait.alt)}" loading="lazy" decoding="async" data-parallax-inner>`;
    $('[data-about-portrait]').setAttribute('data-reveal-media', '');
    $('[data-about-lead]').textContent = A.lead;
    $('[data-about-facts]').innerHTML = A.facts.map((f) => `<div data-fade><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('');
    $('[data-about-photos]').innerHTML = A.photos.map((ph, i) => `
      <figure class="about__photo" data-float="${[14, 6, 22][i] ?? 10}">
        <div class="about__photo-media" data-reveal-media><img src="${ph.src}" alt="${esc(ph.alt)}" loading="lazy" decoding="async" data-parallax-inner></div>
        <figcaption class="mono"><span>(${pad(i + 1)})</span><span>${esc(ph.caption)}</span></figcaption>
      </figure>`).join('');

    // Services
    $('[data-services-media]').innerHTML = S.services.map((s, i) => {
      const m = s.media;
      const inner = m.video
        ? `<video data-src="${m.video}" poster="${m.src}" muted loop playsinline preload="none" aria-label="${esc(m.alt)}"></video>`
        : `<img src="${m.src}" alt="${esc(m.alt)}" loading="lazy" decoding="async">`;
      return `<div class="services__item" data-service-media="${i}">${inner}</div>`;
    }).join('');
    $('[data-services-list]').innerHTML = S.services.map((s, i) =>
      `<li data-service-item="${i}" tabindex="0"><span class="services__num">${pad(i + 1)}</span><span>${esc(s.title)}</span></li>`
    ).join('');
    $('[data-services-note]').innerHTML = `<strong>${esc(S.servicesNote.strong)}</strong><p>${esc(S.servicesNote.text)}</p>`;

    // FAQ
    $('[data-faq-list]').innerHTML = S.faq.map((f, i) => `
      <div class="faq__item" data-fade>
        <button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}">
          <span>${esc(f.q)}</span><span class="faq__icon" aria-hidden="true"></span>
        </button>
        <div class="faq__a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}"><p>${esc(f.a)}</p></div>
      </div>`).join('');
  }

  /* ===================================================================
     RENDER: project (case study)
     =================================================================== */
  function renderProject() {
    const slug = new URLSearchParams(location.search).get('p');
    let idx = S.projects.findIndex((p) => p.slug === slug);
    if (idx < 0) idx = 0;
    const p = S.projects[idx];
    const next = S.projects[(idx + 1) % S.projects.length];
    const total = S.projects.length;

    document.title = `${p.title} | ${S.name}`;
    const md = $('meta[name="description"]'); if (md) md.setAttribute('content', p.summary);
    const ogt = $('meta[property="og:title"]'); if (ogt) ogt.setAttribute('content', `${p.title} | ${S.name}`);

    $('[data-cs-count]').textContent = `${pad(idx + 1)} / ${pad(total)}`;
    $('[data-cs-title]').textContent = p.title;
    $('[data-cs-intro]').textContent = p.intro || p.summary;
    $('[data-cs-facts]').innerHTML = `
      <div data-fade><dt>Year</dt><dd>${esc(p.year)}</dd></div>
      <div data-fade><dt>Role</dt><dd>${esc(p.role)}</dd></div>
      ${p.context ? `<div data-fade><dt>Context</dt><dd>${esc(p.context)}</dd></div>` : ''}
      <div data-fade><dt>Discipline</dt><dd><div class="work__tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div></dd></div>
      ${p.link ? `<a class="btn" data-fade href="${p.link.url}" target="_blank" rel="noopener"><span data-roll>${esc(p.link.label)}</span>${ARROW}</a>` : ''}`;

    const hero = p.hero || p.cover;
    $('[data-cs-cover]').innerHTML = `<img src="${hero.src}" alt="${esc(hero.alt)}" decoding="async" style="object-position:${hero.position || '50% 50%'}" data-parallax-inner>`;
    $('[data-cs-cover]').setAttribute('data-reveal-media', '');

    const img = (m, eager) => `<img src="${m.src}" alt="${esc(m.alt || '')}" ${eager ? '' : 'loading="lazy"'} decoding="async" width="${m.w || 1800}" height="${m.h || 1013}">`;
    const cap = (c) => (c ? `<figcaption class="mono">${esc(c)}</figcaption>` : '');

    $('[data-cs-blocks]').innerHTML = (p.blocks || []).map((b) => {
      switch (b.type) {
        case 'full':
          return `<figure class="cs-block cs-fig"><div class="cs-media" data-reveal-media>${img(b)}</div>${cap(b.caption)}</figure>`;
        case 'pair': {
          const fill = !!b.ratio;
          return `<div class="cs-block cs-pair">${b.items.map((it) => `
            <figure class="cs-fig"><div class="cs-media${fill ? ' cs-media--fill' : ''}" ${fill ? `style="aspect-ratio:${b.ratio}"` : ''} data-reveal-media>${img(it)}</div>${cap(it.caption)}</figure>`).join('')}</div>`;
        }
        case 'text':
          return `<div class="cs-block cs-block--text cs-text"><h2>${esc(b.title)}</h2><p data-split="heading">${esc(b.body)}</p></div>`;
        case 'quote':
          return `<div class="cs-block cs-block--quote cs-quote"><blockquote data-split="heading">“${esc(b.text)}”</blockquote>${b.cite ? `<cite class="mono" data-fade>${esc(b.cite)}</cite>` : ''}</div>`;
        case 'video':
          return `<figure class="cs-block cs-fig"><div class="cs-media cs-video" data-reveal-media>
              <video data-src="${b.src}" ${b.poster ? `poster="${b.poster}"` : ''} muted loop playsinline preload="none" data-autoplay width="1920" height="1080"></video>
              <button class="btn btn--light cs-video__btn" type="button" data-sound><span data-sound-label>Sound on</span></button>
            </div>${cap(b.caption)}</figure>`;
        case 'reels':
          return `<figure class="cs-block cs-fig"><div class="cs-reels">${b.items.map((it) => `
            <div class="cs-media cs-media--fill" data-reveal-media>${it.video
              ? `<video data-src="${it.video}" muted loop playsinline preload="none" data-autoplay aria-label="${esc(it.alt || '')}"></video>`
              : img(it)}</div>`).join('')}</div>${cap(b.caption)}</figure>`;
        default:
          return '';
      }
    }).join('');

    $('[data-cs-next]').innerHTML = `
      <a class="cs-next__link container" href="work.html?p=${encodeURIComponent(next.slug)}" data-page-link data-cursor-hover data-cursor-text="Next project">
        <div class="cs-next__top"><span class="label label--light">Next project</span><span class="mono">${pad(((idx + 1) % total) + 1)} / ${pad(total)}</span></div>
        <h2 class="cs-next__title"><span data-split="heading">${esc(next.title)}</span><svg class="cs-next__arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9L9 3M9 3H4M9 3V8" fill="none" stroke="currentColor" stroke-width="1.2"/></svg></h2>
        <div class="cs-next__media" data-cursor-image><img src="${next.cover.src}" alt="${esc(next.cover.alt)}" loading="lazy" decoding="async" style="object-position:${next.cover.position || '50% 50%'}" data-parallax-inner></div>
      </a>`;
  }

  /* ===================================================================
     SMOOTH SCROLL
     =================================================================== */
  let lenis = null;
  function initLenis() {
    if (reduce || typeof Lenis === 'undefined') return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    window.lenis = lenis;
  }
  const scrollTo = (target, opts = {}) => {
    if (lenis) lenis.scrollTo(target, { duration: 1.4, ...opts });
    else {
      const y = typeof target === 'number' ? target : (typeof target === 'string' ? $(target) : target)?.getBoundingClientRect().top + scrollY;
      window.scrollTo({ top: y || 0, behavior: opts.immediate || reduce ? 'auto' : 'smooth' });
    }
  };

  /* ===================================================================
     SMALL UTILITIES
     =================================================================== */
  function initRoll(root = document) {
    $$('[data-roll]:not(.roll)', root).forEach((el) => {
      const text = el.textContent;
      el.classList.add('roll');
      el.innerHTML = `<span class="sr-only">${esc(text)}</span>` +
        [...text].map((c, i) => `<span class="roll__c" style="--i:${i}" aria-hidden="true">${c === ' ' ? '&nbsp;' : esc(c)}</span>`).join('');
    });
  }

  function fitNames() {
    $$('[data-fit-name]').forEach((el) => {
      el.style.fontSize = '100px';
      el.style.width = 'max-content';
      const natural = el.getBoundingClientRect().width;
      el.style.width = '';
      const avail = el.getBoundingClientRect().width;
      if (natural > 0 && avail > 0) {
        let size = (100 * avail) / natural * 0.998;
        // in the hero, keep the name from eating the whole screen on short/wide windows
        if (el.hasAttribute('data-hero-name')) size = Math.min(size, innerHeight * 0.5);
        el.style.fontSize = `${size}px`;
      }
    });
  }

  function initNavTheme() {
    const nav = $('[data-nav]');
    const sections = $$('[data-theme-section]');
    const set = (t) => { if (nav.dataset.themeNav !== t) nav.dataset.themeNav = t; };
    const check = () => {
      if (document.body.classList.contains('menu-open')) { set('dark'); return; }
      const y = nav.offsetHeight / 2;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) {
          let theme = s.dataset.themeSection;
          // a shutter slat sitting under the nav wins (it paints over the section)
          for (const row of s.querySelectorAll(':scope > .shutter > .shutter__row')) {
            const rr = row.getBoundingClientRect();
            if (rr.top <= y && rr.bottom >= y && rr.height > 2) {
              theme = row.parentElement.dataset.shutterColor === 'light' ? 'light' : 'dark';
              break;
            }
          }
          set(theme);
          break;
        }
      }
    };
    // shutters are scrubbed with easing, so re-check every frame while scrolling
    let last = -1, settle = 0;
    gsap.ticker.add(() => {
      const y = Math.round(scrollY);
      if (y !== last) { last = y; settle = 60; } // keep checking ~1s after scrolling stops
      if (settle > 0) { settle--; check(); }
    });
    window.addEventListener('resize', check);
    check();
    return check;
  }

  function copyEmail(btn) {
    const done = () => {
      const original = btn.dataset.original || btn.textContent;
      btn.dataset.original = original;
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = original; }, 1600);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(S.email).then(done, () => { location.href = `mailto:${S.email}`; });
    else location.href = `mailto:${S.email}`;
  }

  /* ===================================================================
     MODAL + MOBILE MENU
     =================================================================== */
  function initModal() {
    const modal = $('[data-modal]');
    let lastFocus = null;
    const open = () => {
      closeMenu();
      lastFocus = document.activeElement;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      lenis?.stop();
      setTimeout(() => $('.modal__close', modal).focus(), 50);
    };
    const close = () => {
      if (!modal.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      lenis?.start();
      lastFocus?.focus?.();
    };
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-modal-open]')) { e.preventDefault(); open(); }
      else if (e.target.closest('[data-modal-close]')) close();
      const copy = e.target.closest('[data-copy-email]');
      if (copy) copyEmail(copy);
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); closeMenu(); } });
  }

  let navCheck = () => {};
  function setMenu(open) {
    const menu = $('[data-menu]');
    const btn = $('[data-menu-toggle]');
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    $('[data-menu-label]').textContent = open ? 'Close' : 'Menu';
    document.body.classList.toggle('menu-open', open);
    open ? lenis?.stop() : lenis?.start();
    navCheck();
  }
  const closeMenu = () => document.body.classList.contains('menu-open') && setMenu(false);
  function initMenu() {
    $('[data-menu-toggle]')?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  }

  /* ===================================================================
     NAVIGATION: anchors, page transitions
     =================================================================== */
  const transitionRows = () => $$('.transition__row');

  function pageLeave(href) {
    if (reduce) { location.href = href; return; }
    sessionStorage.setItem('sj-transition', '1');
    lenis?.stop();
    const rows = transitionRows();
    gsap.set(rows, { transformOrigin: 'bottom center' });
    gsap.to(rows, {
      scaleY: 1, duration: 0.65, ease: 'expo.inOut', stagger: { each: 0.045, from: 'end' },
      onComplete: () => { location.href = href; },
    });
  }

  function pageEnter() {
    const rows = transitionRows();
    gsap.set(rows, { scaleY: 1, transformOrigin: 'top center' });
    return gsap.to(rows, { scaleY: 0, duration: 0.85, ease: 'expo.inOut', stagger: { each: 0.045, from: 'end' }, delay: 0.05 });
  }

  function initLinks() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

      if (a.hasAttribute('data-back-top')) { e.preventDefault(); closeMenu(); scrollTo(0, { duration: 1.8 }); return; }

      const anchor = a.dataset.anchor;
      if (anchor) {
        e.preventDefault();
        if (PAGE === 'home') {
          const wasOpen = document.body.classList.contains('menu-open');
          closeMenu();
          setTimeout(() => scrollTo(`#${anchor}`), wasOpen ? 350 : 0);
        } else pageLeave(`${HOME}#${anchor}`);
        return;
      }

      if (a.hasAttribute('data-home-link')) {
        e.preventDefault();
        if (PAGE === 'home') scrollTo(0, { duration: 1.8 });
        else pageLeave(HOME);
        return;
      }

      if (a.hasAttribute('data-page-link') || a.hasAttribute('data-transition-link')) {
        e.preventDefault();
        pageLeave(a.getAttribute('href'));
      }
    });

    // Returning with the back button from bfcache: make sure the curtain is open
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) { gsap.set(transitionRows(), { scaleY: 0 }); lenis?.start(); }
    });
  }

  /* ===================================================================
     LOADER + HERO INTRO (home)
     =================================================================== */
  function prepareHero() {
    const title = $('[data-hero-title]');
    const text = $('[data-hero-text]');
    const lines = SplitText.create([title, text], { type: 'lines', mask: 'lines', linesClass: 'hline' }).lines;
    const nameChars = $$('[data-hero-name] .char');
    gsap.set(lines, { yPercent: 135 });
    gsap.set(nameChars, { yPercent: 170 });
    gsap.set('[data-hero-divider]', { scaleX: 0 });
    gsap.set('.hero__label-row > *', { autoAlpha: 0, y: 8 });
    gsap.set('[data-nav] > *', { autoAlpha: 0, y: -8 });

    return function play(gradient) {
      gradient?.intro();
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to('[data-nav] > *', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0)
        .to(lines, { yPercent: 0, duration: 1.2, stagger: 0.08 }, 0.05)
        .to('[data-hero-divider]', { scaleX: 1, duration: 1.6, ease: 'expo.inOut' }, 0.1)
        .to(nameChars, { yPercent: 0, duration: 1.3, stagger: 0.035 }, 0.2)
        .to('.hero__label-row > *', { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.5);
      return tl;
    };
  }

  function runLoader(done) {
    const loader = $('[data-loader]');
    if (!loader) { done(); return; }
    const skip = reduce || sessionStorage.getItem('sj-transition') === '1' || location.hash;
    if (skip) {
      loader.classList.add('is-done');
      done();
      return;
    }
    const words = $$('[data-loader-word]', loader);
    const splits = words.map((w) => SplitText.create(w, { type: 'chars', mask: 'chars' }));
    gsap.set(words, { visibility: 'visible' });
    gsap.set(splits.flatMap((s) => s.chars), { yPercent: 150 });
    lenis?.stop();

    const tl = gsap.timeline({ onComplete: () => { loader.classList.add('is-done'); lenis?.start(); } });
    tl.to('[data-loader-progress]', { scaleX: 1, duration: 2.3, ease: 'power3.inOut' }, 0)
      .to(splits[0].chars, { yPercent: 0, duration: 0.75, stagger: 0.035, ease: 'expo.out' }, 0.1)
      .to(splits[0].chars, { yPercent: -150, duration: 0.5, stagger: 0.025, ease: 'expo.in' }, 2.3)
      .to('.loader__bar', { autoAlpha: 0, duration: 0.3 }, 2.35)
      .to('[data-loader-bg]', { yPercent: -101, duration: 1.1, ease: 'expo.inOut' }, 2.6)
      .add(done, 2.95);
  }

  /* ===================================================================
     SCROLL EFFECTS (shared)
     =================================================================== */
  function initShutters() {
    $$('[data-shutter]').forEach((wrap) => {
      const n = parseInt((isMobile() ? wrap.dataset.rowsMobile : wrap.dataset.rows) || '10', 10);
      wrap.innerHTML = '<div class="shutter__row"></div>'.repeat(n);
      const rows = $$('.shutter__row', wrap);
      if (wrap.dataset.shutter === 'cover') {
        gsap.fromTo(rows, { scaleY: 0 }, {
          scaleY: 1, ease: 'none', stagger: { each: 0.08, from: 'end' },
          scrollTrigger: { trigger: wrap, start: 'bottom 80%', end: 'bottom top', scrub: 0.6 },
        });
      } else {
        // slats open top-first and are all gone before the content reaches mid-screen
        gsap.fromTo(rows, { scaleY: 1 }, {
          scaleY: 0, ease: 'none', stagger: { each: 0.08, from: 'start' },
          scrollTrigger: { trigger: wrap.parentElement, start: 'top bottom', end: 'top 35%', scrub: 0.5 },
        });
      }
    });
  }

  function initSticky() {
    const wrap = $('[data-sticky-wrap]');
    if (!wrap) return;
    const heads = $$('.sticky__el', wrap);
    if (reduce) { gsap.set(heads, { visibility: 'visible' }); return; }
    const tl = gsap.timeline({ scrollTrigger: { trigger: wrap, start: 'top 45%', end: 'bottom bottom', scrub: true } });
    heads.forEach((h, i) => {
      const split = SplitText.create(h, { type: 'words,chars', wordsClass: 'word' });
      gsap.set(h, { visibility: 'visible' });
      const htl = gsap.timeline();
      htl.from(split.chars, { autoAlpha: 0, duration: 0.7, stagger: { amount: 0.7, from: 'start' } });
      htl.to({}, { duration: 0.35 });
      if (i < heads.length - 1) htl.to(split.chars, { autoAlpha: 0, duration: 0.7, stagger: { amount: 0.7, from: 'end' } });
      tl.add(htl, i === 0 ? 0 : '-=0.15');
    });
  }

  function initHeadings() {
    $$('[data-split="heading"]').forEach((h) => {
      SplitText.create(h, {
        type: 'lines', mask: 'lines', autoSplit: true, linesClass: 'sline',
        onSplit: (self) => gsap.from(self.lines, {
          yPercent: 135, duration: 1.1, stagger: 0.08, ease: 'expo.out',
          scrollTrigger: { trigger: h, start: 'top 88%', once: true },
        }),
      });
    });
  }

  function initHighlight() {
    $$('[data-highlight]').forEach((el) => {
      SplitText.create(el, {
        type: 'words,chars', autoSplit: true,
        onSplit: (self) => gsap.from(self.chars, {
          autoAlpha: 0.16, stagger: 0.1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 50%', scrub: true },
        }),
      });
    });
  }

  function initReveals() {
    gsap.set('[data-reveal-media]', { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set('[data-fade], [data-fade-group]', { autoAlpha: 0 });

    // images: clip in from below, with a slow settle
    ScrollTrigger.batch('[data-reveal-media]', {
      start: 'top 92%',
      once: true,
      onEnter: (els) => els.forEach((el, i) => {
        const media = el.querySelector('img, video');
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out', delay: i * 0.08, clearProps: 'clipPath' });
        if (media && !media.hasAttribute('data-parallax-inner')) gsap.fromTo(media, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: 'expo.out', delay: i * 0.08, clearProps: 'transform' });
      }),
    });

    // parallax inside a frame
    $$('[data-parallax-inner]').forEach((inner) => {
      const frame = inner.parentElement;
      gsap.fromTo(inner, { yPercent: -6 }, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    // simple fade-ups
    ScrollTrigger.batch('[data-fade], [data-fade-group]', {
      start: 'top 90%', once: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.07 }),
    });

    // dividers draw in
    $$('[data-divider], .label-row__divider').forEach((d) => {
      gsap.fromTo(d, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: 'expo.inOut', scrollTrigger: { trigger: d, start: 'top 92%', once: true } });
    });
  }

  /* ===================================================================
     WORK: hover video / slideshow, custom cursor
     =================================================================== */
  function initOthers() {
    const list = $('[data-others-list]');
    const preview = $('[data-others-preview]');
    if (!list || !preview || !finePointer) return;
    const imgs = $$('img', preview);
    const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' });
    let active = -1;
    gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });

    const show = (i) => {
      if (i === active) return;
      active = i;
      imgs.forEach((im, k) => im.classList.toggle('is-active', k === i));
      gsap.to(preview, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'expo.out', overwrite: 'auto' });
    };
    const hide = () => {
      active = -1;
      gsap.to(preview, { scale: 0.6, autoAlpha: 0, duration: 0.4, ease: 'expo.out', overwrite: 'auto' });
    };
    list.addEventListener('mousemove', (e) => { xTo(e.clientX); yTo(e.clientY); });
    $$('[data-other]', list).forEach((row) => {
      row.addEventListener('mouseenter', (e) => {
        gsap.set(preview, { x: e.clientX, y: e.clientY });
        list.classList.add('is-hovering');
        show(+row.dataset.other);
      });
    });
    list.addEventListener('mouseleave', () => { list.classList.remove('is-hovering'); hide(); });
  }

  function initWork() {
    $$('[data-work-item]').forEach((item) => {
      const video = $('.work__video', item);
      const slides = $$('.work__slides img', item);
      let timer = null, idx = 0;

      if (finePointer && (video || slides.length)) {
        new IntersectionObserver((entries, io) => {
          if (!entries[0].isIntersecting) return;
          io.disconnect();
          if (video) { video.src = video.dataset.src; video.preload = 'auto'; video.load(); }
          slides.forEach((im) => { im.src = im.dataset.src; });
        }, { rootMargin: '400px' }).observe(item);
      }

      const enter = () => {
        if (!finePointer) return;
        item.classList.add('is-hover');
        if (video) { try { video.currentTime = 0; } catch (_) {} video.play().catch(() => {}); }
        if (slides.length) {
          idx = 0;
          slides.forEach((s, k) => s.classList.toggle('is-active', k === 0));
          clearInterval(timer);
          timer = setInterval(() => {
            slides[idx].classList.remove('is-active');
            idx = (idx + 1) % slides.length;
            slides[idx].classList.add('is-active');
          }, 750);
        }
      };
      const leave = () => {
        item.classList.remove('is-hover');
        video?.pause();
        clearInterval(timer);
      };
      item.addEventListener('mouseenter', enter);
      item.addEventListener('mouseleave', leave);
    });
  }

  function initCursor() {
    const cursor = $('[data-cursor]');
    if (!cursor || !finePointer) return;
    const text = $('[data-cursor-text]', cursor);
    const pill = cursor.firstElementChild;
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3' });
    let mx = -100, my = -100, moved = false, ticking = false;

    const update = () => {
      ticking = false;
      const el = document.elementFromPoint(mx, my);
      const hov = el?.closest('[data-cursor-hover]');
      if (!hov || document.querySelector('.modal.is-open')) { cursor.dataset.state = ''; return; }
      const t = hov.dataset.cursorText || 'View';
      if (text.textContent !== t) text.textContent = t;
      cursor.dataset.state = mx + pill.offsetWidth + 40 > innerWidth ? 'active-edge' : 'active';
      const media = hov.querySelector('[data-cursor-image]');
      let on = false;
      if (media) { const r = media.getBoundingClientRect(); on = mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom; }
      cursor.dataset.theme = on ? 'on-image' : 'off-image';
    };
    const queue = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; moved = true; xTo(mx); yTo(my); queue(); }, { passive: true });
    window.addEventListener('scroll', () => moved && queue(), { passive: true });
    document.addEventListener('mouseleave', () => { cursor.dataset.state = ''; });
  }

  /* ===================================================================
     ABOUT: floating photos
     =================================================================== */
  function initAbout() {
    $$('[data-float]').forEach((fig) => {
      const amt = parseFloat(fig.dataset.float) || 10;
      gsap.fromTo(fig, { yPercent: amt * 0.6 }, {
        yPercent: -amt * 0.6, ease: 'none',
        scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  }

  /* ===================================================================
     SERVICES: list drives the image
     =================================================================== */
  function initServices() {
    const items = $$('[data-service-item]');
    const media = $$('[data-service-media]');
    const detail = $('[data-services-detail]');
    if (!items.length) return;
    let active = -1, z = 1;

    const loadVideo = (v) => { if (v && !v.src && v.dataset.src) { v.src = v.dataset.src; v.load(); } };

    function set(i, instant) {
      if (i === active) return;
      active = i;
      items.forEach((li, k) => li.classList.toggle('is-active', k === i));
      const m = media[i];
      media.forEach((x) => x.classList.remove('is-active'));
      m.classList.add('is-active');
      m.style.zIndex = ++z;
      media.forEach((x) => { const v = $('video', x); if (v && x !== m) v.pause(); });
      const v = $('video', m);
      if (v) { loadVideo(v); v.play().catch(() => {}); }
      const inner = m.firstElementChild;
      gsap.killTweensOf([m, inner]);
      if (instant || reduce) gsap.set(m, { clipPath: 'inset(0% 0% 0% 0%)' });
      else {
        gsap.fromTo(m, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.out' });
        gsap.fromTo(inner, { scale: 1.18 }, { scale: 1, duration: 1.5, ease: 'expo.out' });
      }
      if (detail) {
        gsap.killTweensOf(detail);
        gsap.fromTo(detail, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out' });
        detail.textContent = S.services[i].text;
      }
    }

    items.forEach((li, i) => {
      li.addEventListener('mouseenter', () => finePointer && set(i));
      li.addEventListener('focus', () => set(i));
      li.addEventListener('click', () => set(i));
    });
    set(0, true);

    // On touch screens, scrolling through the list changes the image
    if (!finePointer) {
      items.forEach((li, i) => ScrollTrigger.create({
        trigger: li, start: 'top 65%', end: 'bottom 65%',
        onToggle: (self) => self.isActive && set(i),
      }));
    }

    // only spend battery on the services video while visible
    new IntersectionObserver(([e]) => {
      const v = $('video', media[active]);
      if (!v) return;
      e.isIntersecting ? v.play().catch(() => {}) : v.pause();
    }).observe($('[data-services-media]'));
  }

  /* ===================================================================
     FAQ
     =================================================================== */
  function initFaq() {
    $$('.faq__item').forEach((item) => {
      const btn = $('.faq__q', item);
      const ans = $('.faq__a', item);
      btn.addEventListener('click', () => {
        const open = !item.classList.contains('is-open');
        $$('.faq__item.is-open').forEach((o) => {
          if (o === item) return;
          o.classList.remove('is-open');
          $('.faq__q', o).setAttribute('aria-expanded', 'false');
          gsap.to($('.faq__a', o), { height: 0, duration: 0.6, ease: 'expo.out' });
        });
        item.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
        gsap.to(ans, { height: open ? 'auto' : 0, duration: 0.75, ease: 'expo.out', onComplete: () => ScrollTrigger.refresh() });
      });
    });
  }

  /* ===================================================================
     FOOTER: parallax reveal, name, interactive dot grid
     =================================================================== */
  function initFooter() {
    const footer = $('[data-footer]');
    if (!footer) return;
    if (!reduce) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: footer, start: 'top bottom', end: 'top top', scrub: true } });
      tl.from('[data-footer-inner]', { yPercent: -28, ease: 'none' })
        .fromTo('[data-footer-dark]', { opacity: 0.55 }, { opacity: 0, ease: 'none' }, 0);
    }
    const chars = $$('[data-footer-name] .char');
    gsap.fromTo(chars, { yPercent: 170 }, {
      yPercent: 0, duration: 1.3, stagger: 0.035, ease: 'expo.out',
      scrollTrigger: { trigger: '[data-footer-name]', start: 'top 98%', once: true },
    });
    initDots($('[data-dots]'));
  }

  function initDots(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const base = [28, 28, 27, 0.16];
    const act = [201, 162, 126, 1];
    let w = 0, h = 0, dpr = 1, pts = [], raf = 0, visible = false, gap = 48;
    const ptr = { x: -9999, y: -9999 };

    function resize() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = parseFloat(getComputedStyle(document.body).fontSize) * 3;
      pts = [];
      const ox = (w % gap) / 2, oy = (h % gap) / 2;
      for (let y = oy + gap / 2; y < h; y += gap) for (let x = ox + gap / 2; x < w; x += gap) pts.push({ x, y, s: 0 });
      kick();
    }
    function draw() {
      raf = 0;
      ctx.clearRect(0, 0, w, h);
      const R = gap * 4.2, size = Math.max(1.6, gap * 0.045);
      let moving = false;
      for (const p of pts) {
        const d = Math.hypot(p.x - ptr.x, p.y - ptr.y);
        const t = Math.max(0, 1 - d / R);
        p.s += (t * t - p.s) * 0.12;
        if (Math.abs(t * t - p.s) > 0.002) moving = true;
        const k = p.s;
        const c = base.map((v, i) => v + (act[i] - v) * k);
        const s = size * (1 + k * 1.6);
        ctx.fillStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${c[3]})`;
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      }
      if (visible && moving) raf = requestAnimationFrame(draw);
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(canvas);
    window.addEventListener('pointermove', (e) => {
      if (!visible) return;
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top;
      kick();
    }, { passive: true });
    window.addEventListener('resize', resize);
    resize();
  }

  /* ===================================================================
     CASE STUDY: videos
     =================================================================== */
  function initVideos() {
    $$('video[data-autoplay]').forEach((v) => {
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          if (!v.src) { v.src = v.dataset.src; v.load(); }
          v.play().catch(() => {});
        } else v.pause();
      }, { threshold: 0.2 }).observe(v);
    });
    $$('[data-sound]').forEach((btn) => {
      const v = btn.parentElement.querySelector('video');
      btn.addEventListener('click', () => {
        v.muted = !v.muted;
        if (!v.muted) v.play().catch(() => {});
        $('[data-sound-label]', btn).textContent = v.muted ? 'Sound on' : 'Sound off';
      });
    });
  }

  function initProjectIntro() {
    const title = $('[data-cs-title]');
    const intro = $('[data-cs-intro]');
    const t = SplitText.create(title, { type: 'lines,words', mask: 'lines' });
    const i = SplitText.create(intro, { type: 'lines', mask: 'lines' });
    gsap.set(t.words, { yPercent: 135 });
    gsap.set(i.lines, { yPercent: 135 });
    gsap.set(['.cs-hero__top > *', '[data-nav] > *'], { autoAlpha: 0, y: 8 });
    return () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to(['[data-nav] > *', '.cs-hero__top > *'], { autoAlpha: 1, y: 0, duration: 1, stagger: 0.06 }, 0.35)
        .to(t.words, { yPercent: 0, duration: 1.3, stagger: 0.06 }, 0.4)
        .to(i.lines, { yPercent: 0, duration: 1.2, stagger: 0.06 }, 0.6);
    };
  }

  /* ===================================================================
     BOOT
     =================================================================== */
  function boot() {
    renderChrome();
    if (PAGE === 'home') renderHome();
    else renderProject();

    initRoll();
    initLenis();
    initModal();
    initMenu();
    initLinks();
    navCheck = initNavTheme();

    // Curtain covering the page if we arrived via a page transition
    const viaTransition = sessionStorage.getItem('sj-transition') === '1';
    if (PAGE === 'home' && viaTransition) gsap.set(transitionRows(), { scaleY: 1 });

    const fontsReady = document.fonts?.ready || Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 2500))]).then(() => {
      fitNames();
      initShutters();
      initHeadings();
      initHighlight();
      initReveals();
      initCursor();
      initFooter();

      let playIntro = () => {};
      let gradient = null;
      if (PAGE === 'home') {
        const canvas = $('[data-hero-gl]');
        gradient = window.HeroGradient ? window.HeroGradient.create(canvas) : null;
        playIntro = prepareHero();
        initSticky();
        initWork();
        initOthers();
        initAbout();
        initServices();
        initFaq();
      } else {
        playIntro = initProjectIntro();
        initVideos();
      }

      document.documentElement.classList.add('is-ready');
      ScrollTrigger.refresh();

      if (PAGE === 'home') {
        if (location.hash) {
          const target = $(location.hash);
          if (target) scrollTo(target, { immediate: true });
        } else scrollTo(0, { immediate: true });
        runLoader(() => playIntro(gradient));
        if (viaTransition) pageEnter();
      } else {
        scrollTo(0, { immediate: true });
        pageEnter();
        playIntro();
      }
      sessionStorage.removeItem('sj-transition');
    });

    let rw = innerWidth;
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        fitNames();
        // rebuild shutters when crossing the mobile breakpoint (row count changes)
        if ((rw <= 767) !== (innerWidth <= 767)) { ScrollTrigger.getAll().forEach((st) => st.refresh()); }
        rw = innerWidth;
        ScrollTrigger.refresh();
      }, 150);
    });
    window.addEventListener('load', () => ScrollTrigger.refresh());
  }

  boot();
})();
