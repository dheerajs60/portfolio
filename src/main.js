// ===== SPLASH SCREEN =====
const initSplash = () => {
  const splash = document.getElementById('splash');
  const enterBtn = document.getElementById('splash-enter');
  const typeEl = document.querySelector('.splash-type');
  const particlesContainer = document.getElementById('particles');

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

  // Enter button click → slide splash away
  enterBtn.addEventListener('click', () => {
    splash.classList.add('exit');
    document.body.style.overflow = 'auto';
    // Remove from DOM after animation
    setTimeout(() => {
      splash.remove();
      // Trigger fade-up animations now that splash is gone
      initScrollAnimations();
    }, 950);
  });
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
  // Lock scroll while splash is visible
  document.body.style.overflow = 'hidden';
  initSplash();
});
