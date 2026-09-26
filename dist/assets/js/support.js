(() => {
  const content = document.querySelector('[data-age-content]');
  if (!content) return;

  const loadScript = (src, attributes = {}) => new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) { existing.addEventListener('load', resolve, { once: true }); return; }
    const script = document.createElement('script');
    script.src = src;
    Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const setStatus = (message, isError = false) => {
    const status = document.querySelector('#paypal-status');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-error', isError);
  };

  const initializePayPal = async () => {
    try {
      await loadScript('https://www.paypal.com/sdk/js?client-id=BAA_ndqaWMyQwTnDZ0LXwLQ22jdJo9uxkeXYqmBbF-hD41HMiZ83mvOcx1Kti0b6ZfXfje7Q1ievNaS8Ok&vault=true&intent=subscription', { 'data-sdk-integration-source': 'button-factory' });
      if (!window.paypal || !document.querySelector('#paypal-button-container-P-4FD24238VX4902214NK2XP2Y')) return;
      window.paypal.Buttons({
        style: { shape: 'rect', color: 'gold', layout: 'vertical', label: 'subscribe' },
        createSubscription: (data, actions) => actions.subscription.create({ plan_id: 'P-4FD24238VX4902214NK2XP2Y', quantity: 1 }),
        onApprove: (data) => setStatus(`Thank you. Your PayPal subscription was approved (${data.subscriptionID}).`),
        onError: () => setStatus('PayPal could not load this checkout. Please try another support option.', true)
      }).render('#paypal-button-container-P-4FD24238VX4902214NK2XP2Y');
    } catch (error) {
      setStatus('PayPal could not load this checkout. Please try another support option.', true);
    }
  };

  const initializeKofi = async () => {
    try {
      await loadScript('https://storage.ko-fi.com/cdn/widget/Widget_2.js');
      if (window.kofiwidget2 && document.querySelector('#ko-fi-widget')) {
        window.kofiwidget2.init('Support me on Ko-fi', '#72a4f2', 'W3T61ZU5FS');
        window.kofiwidget2.draw();
      }
    } catch (error) {
      const target = document.querySelector('#ko-fi-widget');
      if (target) target.textContent = 'Ko-fi is temporarily unavailable. Use the link below instead.';
    }
  };

  const initializeStripe = async () => {
    try {
      await loadScript('https://js.stripe.com/v3/buy-button.js');
      const target = document.querySelector('#stripe-buy-button');
      if (!target || target.querySelector('stripe-buy-button')) return;
      const button = document.createElement('stripe-buy-button');
      button.setAttribute('buy-button-id', 'buy_btn_1UJKaaJaRf233kfWKZ81fcIe');
      button.setAttribute('publishable-key', 'pk_live_51UIdAGJaRf233kfWlFacR31IYVGdjCVAttNFzIgQGXQzrUdc894iJcBqamRZNwF11z2AN5kvjyzitor462f2egVI00UmKj0sd8');
      target.appendChild(button);
    } catch (error) {
      const target = document.querySelector('#stripe-buy-button');
      if (target) target.textContent = 'Stripe is temporarily unavailable. Please use another support option.';
    }
  };

  document.querySelectorAll('[data-tab-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-tab-target');
      document.querySelectorAll('[data-tab-target]').forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      document.querySelectorAll('.tab-panel').forEach((panel) => {
        const active = panel.id === targetId;
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      });
      if (targetId === 'support-onetime') initializeStripe();
    });
  });

  const observer = new MutationObserver(() => {
    if (!content.hidden) {
      observer.disconnect();
      initializePayPal();
      initializeKofi();
    }
  });
  observer.observe(content, { attributes: true, attributeFilter: ['hidden'] });
  if (!content.hidden) { initializePayPal(); initializeKofi(); }
})();
