/* ====================================
   KADİR YETİM — Portfolyo JS
   ==================================== */

// ---- n8n Webhook URL ----
// ADIM: n8n'de workflow oluşturduktan sonra buraya webhook URL'ini yapıştır
const CONTACT_API_URL = '/api/contact';

// ===========================
// Navbar: Scroll & Hamburger
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.background = 'rgba(13,17,23,0.97)';
  } else {
    navbar.style.background = 'rgba(13,17,23,0.85)';
  }
  updateActiveLink();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===========================
// Active Nav Link (scroll spy)
// ===========================
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===========================
// Scroll Reveal
// ===========================
function initReveal() {
  const targets = document.querySelectorAll(
    '.section-header, .about-text, .about-stats, .stat-card, ' +
    '.project-card, .skill-category, .timeline-item, .cert-item, ' +
    '.contact-info-item, .contact-form'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
}

// ===========================
// Skill Bar Animations
// ===========================
function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.getAttribute('data-width');
        target.style.width = width + '%';
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ===========================
// Contact Form
// ===========================
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

function validateField(id, errorId, message) {
  const field = document.getElementById(id);
  const error = document.getElementById(errorId);
  const value = field.value.trim();

  if (!value) {
    field.classList.add('error');
    error.textContent = message;
    return false;
  }

  if (id === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      field.classList.add('error');
      error.textContent = 'Geçerli bir e-posta adresi girin.';
      return false;
    }
  }

  field.classList.remove('error');
  error.textContent = '';
  return true;
}

['firstName', 'lastName', 'email', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById(id).classList.remove('error');
    const errEl = document.getElementById(id + 'Error');
    if (errEl) errEl.textContent = '';
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const validations = [
    validateField('firstName', 'firstNameError', 'Ad alanı zorunludur.'),
    validateField('lastName', 'lastNameError', 'Soyad alanı zorunludur.'),
    validateField('email', 'emailError', 'E-posta alanı zorunludur.'),
    validateField('message', 'messageError', 'Mesaj alanı zorunludur.'),
  ];

  if (!validations.every(Boolean)) return;

  // Show loading state
  submitBtn.disabled = true;
  submitText.textContent = 'Gönderiliyor...';
  submitSpinner.classList.remove('hidden');
  formSuccess.classList.add('hidden');
  formError.classList.add('hidden');

  const payload = {
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('message').value.trim(),
    timestamp: new Date().toISOString(),
  };

  try {
    // Webhook henüz ayarlanmadıysa demo mod
    const response = await fetch(CONTACT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    showSuccess();
  } catch (err) {
    console.error('Form gönderim hatası:', err);
    showFormError();
  } finally {
    submitBtn.disabled = false;
    submitText.textContent = 'Mesaj Gönder';
    submitSpinner.classList.add('hidden');
  }
});

function showSuccess() {
  formSuccess.classList.remove('hidden');
  form.reset();
  setTimeout(() => formSuccess.classList.add('hidden'), 6000);
}

function showFormError() {
  formError.classList.remove('hidden');
  setTimeout(() => formError.classList.add('hidden'), 5000);
}

// ===========================
// Init on DOM Ready
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initSkillBars();
  updateActiveLink();
});
