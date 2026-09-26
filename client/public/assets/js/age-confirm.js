(() => {
  const key = 'fedpromptly-age-confirmed';
  const gate = document.querySelector('[data-age-gate]');
  const content = document.querySelector('[data-age-content]');
  if (!gate || !content) return;
  const show = () => { const confirmed = localStorage.getItem(key) === 'true'; gate.hidden = confirmed; content.hidden = !confirmed; };
  document.querySelector('[data-age-yes]')?.addEventListener('click', () => { localStorage.setItem(key, 'true'); show(); });
  document.querySelector('[data-age-no]')?.addEventListener('click', () => { content.hidden = true; gate.hidden = false; gate.querySelector('.age-message').textContent = 'Payment content remains hidden. You may continue reading the documentation.'; });
  show();
})();
