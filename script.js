/* ============================================================
   GEORGIA HARRELL — PORTFOLIO  ·  script.js
   ============================================================ */

/* ---- Navbar scroll effect ---- */
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---- Active nav link on scroll ---- */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-link[data-section]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === entry.target.id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));

/* ---- Mobile menu ---- */
const menuBtn   = document.querySelector('.mobile-menu-btn');
const mobileNav = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
  mobileNav.setAttribute('aria-hidden', !isOpen);
});

document.querySelectorAll('.mobile-nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

/* ---- Typing animation ---- */
const phrases = [
  'web experiences.',
  'React frontends.',
  'mobile apps.',
  'beautiful UIs.',
  'clean code.',
  'things that scale.',
];

const typingEl = document.getElementById('typing-text');
let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;
let paused    = false;

function type() {
  if (paused) return;

  const current = phrases[phraseIdx];

  if (deleting) {
    typingEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting  = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      paused    = true;
      setTimeout(() => { paused = false; }, 400);
    }
    setTimeout(type, 55);
  } else {
    typingEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      paused = true;
      setTimeout(() => { paused = false; deleting = true; }, 1800);
    }
    setTimeout(type, 90);
  }
}
type();

/* ---- Scroll reveal (Intersection Observer) ---- */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

/* ---- Project filter ---- */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projects-grid .project-card');
const featuredCard = document.querySelector('.project-featured');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    /* Show/hide featured (nextjs category) */
    if (featuredCard) {
      const show = filter === 'all' || filter === featuredCard.dataset.category;
      featuredCard.style.display = show ? '' : 'none';
    }

    projectCards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.toggleAttribute('data-hidden', !match);

      /* Re-trigger reveal for newly shown cards */
      if (match && !card.classList.contains('revealed')) {
        card.classList.add('revealed');
      }
    });
  });
});

/* ---- Smooth scroll for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
