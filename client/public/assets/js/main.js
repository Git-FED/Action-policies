(() => {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;

  const progress = document.createElement('div');
  progress.className = 'progress-bar';
  progress.setAttribute('aria-hidden', 'true');
  body.appendChild(progress);

  const updateProgress = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${height > 0 ? (window.scrollY / height) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const revealItems = document.querySelectorAll('main section, main article, main .card, main blockquote');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealItems.forEach((item, index) => {
      item.classList.add('reveal');
      item.style.transitionDelay = `${Math.min(index * 35, 210)}ms`;
    });
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observerInstance.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    revealItems.forEach((item) => observer.observe(item));
  }

  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    body.appendChild(glow);
    window.addEventListener('pointermove', (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
      glow.style.opacity = '1';
    }, { passive: true });
    window.addEventListener('pointerleave', () => { glow.style.opacity = '0'; });

    document.querySelectorAll('.card[data-tilt]').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        card.style.transform = `perspective(700px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-7px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }
})();
