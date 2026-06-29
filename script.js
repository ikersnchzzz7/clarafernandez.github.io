document.addEventListener('DOMContentLoaded', function () {
  // Nav blur on scroll
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // Counter animation (stats on index)
  function animateCount(el) {
    const target = parseInt(el.dataset.target);
    const isLarge = target > 100;
    const from = isLarge ? target - 8 : 0;
    const duration = isLarge ? 1400 : 900;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (target - from) * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObs.observe(el));

  // Subtle parallax on hero (index only)
  const heroName = document.querySelector('.hero-name');
  const heroSlogan = document.querySelector('.hero-slogan');
  if (heroName || heroSlogan) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        if (heroName)   heroName.style.transform   = `translateY(${y * 0.12}px)`;
        if (heroSlogan) heroSlogan.style.transform = `translateY(${y * 0.22}px)`;
      }
    }, { passive: true });
  }
});
