/* ============================================
   PORTFOLIO — SCRIPT.JS
   ============================================ */

// ── Typing Effect ──────────────────────────────
const roles = [
  'Frontend Developer',
  'AI Enthusiast',
  'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeEffect() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 90);
}

typeEffect();

// ── Sticky Navbar + Active Links ───────────────
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  // Sticky state
  navbar.classList.toggle('scrolled', window.scrollY > 30);

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Smooth Scroll ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu
      document.querySelector('.nav-links').classList.remove('open');
    }
  });
});

// ── Mobile Nav Toggle ──────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  spans[0].style.transform = navMenu.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = navMenu.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// ── Scroll Reveal ──────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 60 * (entry.target.dataset.delay || 0));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.dataset.delay = i % 4;
  revealObserver.observe(el);
});

// ── Project Filter ─────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
      if (match) {
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeIn 0.35s ease forwards';
      }
    });
  });
});

// ── Project Card Mouse Glow ─────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// ── Inject fadeIn keyframe ─────────────────────
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);