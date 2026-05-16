/* ─── NAV SCROLL EFFECT ──────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ─── MOBILE NAV ─────────────────────────────────────────────── */
const toggle = document.querySelector('.nav-toggle');
let mobileMenu = null;

function createMobileMenu() {
  mobileMenu = document.createElement('nav');
  mobileMenu.className = 'nav-mobile';
  mobileMenu.innerHTML = `
    <a href="#about" >About</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  `;
  document.body.appendChild(mobileMenu);
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMobile);
  });
}

function closeMobile() {
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

toggle.addEventListener('click', () => {
  if (!mobileMenu) createMobileMenu();
  const open = mobileMenu.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
});

/* ─── SCROLL REVEAL ──────────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

/* ─── SKILL BARS ──────────────────────────────────────────────── */
const skillBars = document.querySelectorAll('.skill-bar');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const level = bar.getAttribute('data-level');
      bar.style.setProperty('--w', level + '%');
      setTimeout(() => bar.classList.add('animated'), 100);
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));

/* ─── TYPED EFFECT ────────────────────────────────────────────── */
const phrases = [
  'Solve Business Problems',
  'Cleaning Data and Automating Processes',
  'Deliver Actionable Insights',
  'Data Visualization Reporting',
];
const typedEl = document.getElementById('typed');
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
let pauseTimer = null;

function type() {
  const phrase = phrases[phraseIdx];

  if (!deleting) {
    typedEl.textContent = phrase.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === phrase.length) {
      deleting = true;
      pauseTimer = setTimeout(type, 2000);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 40 : 70);
}

setTimeout(type, 1000);

/* ─── SMOOTH ACTIVE NAV ───────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAs.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ─── CURSOR GLOW (subtle) ────────────────────────────────────── */
const glow = document.querySelector('.hero-glow');
if (glow) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    glow.style.background = `radial-gradient(ellipse at ${x}% ${y}%, rgba(79,142,247,0.14) 0%, transparent 68%)`;
  }, { passive: true });
}
