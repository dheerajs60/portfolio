// Function to handle the intersection observer for fade-up animations
const initScrollAnimations = () => {
  const elements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve if we only want it to fade in once
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(element => {
    observer.observe(element);
  });
};

// Initialize after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});
