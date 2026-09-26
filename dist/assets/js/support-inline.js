(() => {
  const card = document.querySelector('[data-inline-support]');
  if (!card) return;
  const key = 'fedpromptly-age-confirmed';
  const gate = card.querySelector('[data-inline-gate]');
  const content = card.querySelector('[data-inline-content]');
  const yes = card.querySelector('[data-inline-yes]');
  if (!gate || !content || !yes) return;

  const loadScript = (src, attributes = {}) => new Promise((resolve, reject) => {
    const script = document.createElement('script'); script.src = src;
    Object.entries(attributes).forEach(([keyName, value]) => script.setAttribute(keyName, value));
    script.onload = resolve; script.onerror = reject; document.head.appendChild(script);
  });

  const render = async () => {
    gate.hidden = true; content.hidden = false;
    if (content.dataset.loaded) return;
    content.dataset.loaded = 'true';
    const paypalTarget = content.querySelector('[data-inline-paypal]');
    try {
      await loadScript('https://www.paypal.com/sdk/js?client-id=BAA_ndqaWMyQwTnDZ0LXwLQ22jdJo9uxkeXYqmBbF-hD41HMiZ83mvOcx1Kti0b6ZfXfje7Q1ievNaS8Ok&vault=true&intent=subscription', { 'data-sdk-integration-source': 'button-factory' });
      if (window.paypal && paypalTarget) window.paypal.Buttons({ style: { shape: 'rect', color: 'gold', layout: 'horizontal', label: 'subscribe' }, createSubscription: (data, actions) => actions.subscription.create({ plan_id: 'P-4FD24238VX4902214NK2XP2Y', quantity: 1 }), onApprove: () => { content.querySelector('[data-inline-status]').textContent = 'Thank you for supporting FedPromptly.'; }, onError: () => { content.querySelector('[data-inline-status]').textContent = 'PayPal is unavailable. Use the support hub for other options.'; } }).render(paypalTarget);
    } catch (error) {
      const status = content.querySelector('[data-inline-status]'); if (status) status.textContent = 'PayPal is unavailable. Use the support hub for other options.';
    }
  };

  yes.addEventListener('click', () => { try { localStorage.setItem(key, 'true'); } catch (error) {} render(); });
  try { if (localStorage.getItem(key) === 'true') render(); } catch (error) {}
})();
