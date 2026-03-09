/* ═══════════════════════════════════════════════════════════
   DR. RAHUL KHAN PT — script.js
   drrahulkhanpt.com | Physiotherapist in Jaipur
   ───────────────────────────────────────────────────────────
   This file is linked by ALL pages. It controls:
   1. Navbar scroll behaviour
   2. Mobile hamburger menu
   3. Scroll reveal animations
   4. Active nav link highlighting
═══════════════════════════════════════════════════════════ */

/* ── 1. NAVBAR SHADOW ON SCROLL ─────────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── 2. HAMBURGER MENU ───────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close when any nav link clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── 3. SCROLL REVEAL ANIMATION ─────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Stagger based on sibling index
      const parent   = entry.target.parentElement;
      const siblings = parent ? [...parent.querySelectorAll('.reveal')] : [];
      const index    = siblings.indexOf(entry.target);
      const delay    = Math.min(index * 80, 400); // max 400ms stagger

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold:  0.10,
  rootMargin: '0px 0px -40px 0px'
});

// Elements to animate on scroll
const revealSelectors = [
  '.service-card',
  '.condition-card',
  '.testimonial-card',
  '.blog-card',
  '.stat-card',
  '.cred-item',
  '.about-snap-text',
  '.about-snap-stats',
  '.contact-card',
  '.faq-item',
  '.lecture-card',
  '.workshop-card',
].join(', ');

document.querySelectorAll(revealSelectors).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ── 4. ACTIVE NAV LINK ──────────────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});
