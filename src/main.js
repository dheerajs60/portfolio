// ===== SPLASH SCREEN =====
const initSplash = () => {
  const splash = document.getElementById('splash');
  const enterBtn = document.getElementById('splash-enter');
  const typeEl = document.querySelector('.splash-type');
  const particlesContainer = document.getElementById('particles');
  const topnav = document.getElementById('topnav');

  // Typewriter effect
  const message = 'Welcome.';
  let i = 0;
  const typeWriter = () => {
    if (i < message.length) {
      typeEl.textContent += message.charAt(i);
      i++;
      setTimeout(typeWriter, 130);
    }
  };
  setTimeout(typeWriter, 600);

  // Generate floating particles
  for (let p = 0; p < 30; p++) {
    const dot = document.createElement('div');
    dot.classList.add('particle');
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.setProperty('--dur', `${4 + Math.random() * 6}s`);
    dot.style.setProperty('--delay', `${Math.random() * 5}s`);
    dot.style.width = `${1 + Math.random() * 3}px`;
    dot.style.height = dot.style.width;
    particlesContainer.appendChild(dot);
  }

  // Enter button → slide splash away, show navbar
  enterBtn.addEventListener('click', () => {
    splash.classList.add('exit');
    document.body.style.overflow = 'auto';

    setTimeout(() => {
      splash.style.display = 'none';
      // Show the nav
      topnav.classList.remove('hidden');
      topnav.classList.add('visible');
      initScrollAnimations();
    }, 950);
  });
};

// ===== SHOW SPLASH AGAIN =====
const showSplash = () => {
  const splash = document.getElementById('splash');
  const topnav = document.getElementById('topnav');
  const typeEl = document.querySelector('.splash-type');

  // Reset splash
  splash.style.display = 'flex';
  splash.classList.remove('exit');
  typeEl.textContent = '';
  document.body.style.overflow = 'hidden';

  // Hide nav
  topnav.classList.remove('visible');
  topnav.classList.add('hidden');

  // Re-run typewriter
  const message = 'Welcome.';
  let i = 0;
  const typeWriter = () => {
    if (i < message.length) {
      typeEl.textContent += message.charAt(i);
      i++;
      setTimeout(typeWriter, 130);
    }
  };
  setTimeout(typeWriter, 400);

  // Scroll back to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ===== THEME TOGGLE =====
const initThemeToggle = () => {
  const btn = document.getElementById('theme-toggle');
  const icon = btn.querySelector('.theme-icon');
  const saved = localStorage.getItem('theme') || 'dark';

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      icon.textContent = '🌙';
    } else {
      document.documentElement.removeAttribute('data-theme');
      icon.textContent = '☀️';
    }
    localStorage.setItem('theme', theme);
  };

  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = localStorage.getItem('theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
};

// ===== BACK TO LANDING =====
const initBackBtn = () => {
  const backBtn = document.getElementById('back-to-landing');
  backBtn.addEventListener('click', showSplash);
};

// ===== FADE-UP ON SCROLL =====
const initScrollAnimations = () => {
  const elements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  elements.forEach(el => observer.observe(el));
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  initSplash();
  initThemeToggle();
  initBackBtn();
});
