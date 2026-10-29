/* Lightweight progressive enhancements; no animation or icon framework required. */
(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll(
    '.hero-copy, .portrait-wrap, .home-about-teaser, .home-work-cta-section, .contact-section, .project-card, .skills-card, .contact-method, .creative-sample'
  );

  if (reducedMotion || !('IntersectionObserver' in window)) return;

  revealItems.forEach((item) => item.classList.add('reveal-on-scroll'));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  revealItems.forEach((item) => observer.observe(item));
})();
