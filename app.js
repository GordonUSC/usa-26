/* USA / 26 — interactions */
(() => {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  const closeMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  const openMenu = () => {
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });
    // Close after tapping a link (mobile)
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });
    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- City filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cityCards = document.querySelectorAll('.city-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });

      cityCards.forEach(card => {
        const country = card.dataset.country;
        const show = filter === 'all' || country === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Reveal-on-scroll ---------- */
  const revealTargets = document.querySelectorAll(
    '.section .container > .h2, .section .container > .lede, ' +
    '.team-card, .player-card, .match-block, .city-card, .kit, ' +
    '.dh-card, .pred, .three-q, .narrative, .cta-end, ' +
    '.principles article, .stat'
  );

  if ('IntersectionObserver' in window) {
    revealTargets.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    revealTargets.forEach(el => io.observe(el));
  }

  /* ---------- Active section in nav (desktop) ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__menu a');

  if ('IntersectionObserver' in window && sections.length) {
    const sIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a => {
            a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => sIO.observe(s));
  }

  /* ---------- Smooth offset scroll for anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = window.matchMedia('(min-width: 880px)').matches ? 72 : 56;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'reduce' === document.documentElement.style.scrollBehavior ? 'auto' : 'smooth' });
    });
  });

  /* ---------- Tiny console signature ---------- */
  if (typeof console !== 'undefined' && console.log) {
    console.log('%cUSA / 26', 'font:700 22px Anton,Impact,sans-serif;color:#BF0A30;letter-spacing:.04em;');
    console.log('%cGordon Bellamy\'s guide. Up the stars. Up the stripes.', 'font:12px monospace;color:#888;');
  }
})();
