/* Progressive enhancement for the gothic portfolio prototype. */
(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  if (window.gsap && !reducedMotion) {
    window.gsap.to('.metal-rose-mark img', {
      rotate: 2.5,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      transformOrigin: '50% 50%'
    });
    window.gsap.to('.gothic-mandala', {
      rotate: 8,
      duration: 45,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }

  const revealItems = document.querySelectorAll('.hero-copy, .portrait-wrap, .home-about-teaser, .home-work-cta-section, .contact-section, .project-card, .skills-card, .contact-method');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    revealItems.forEach((item) => item.setAttribute('data-gothic-reveal', ''));
    document.documentElement.classList.add('reveal-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  }
})();