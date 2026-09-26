# Support and Contact Guide

The public support hub is at [site/support/index.html](site/support/index.html) and, after deployment, at the project's support route. It organizes recurring support, one-time support, community links, and direct contact without mixing those purposes together.

## Contact routes

- **General:** [contact@fedpromptly.com](mailto:contact@fedpromptly.com)
- **Support:** [support@fedpromptly.com](mailto:support@fedpromptly.com)
- **Business:** [business@fedpromptly.com](mailto:business@fedpromptly.com)
- **Careers:** [careers@fedpromptly.com](mailto:careers@fedpromptly.com)
- **Security:** follow the private process in [SECURITY.md](SECURITY.md)

## Provider routes

The support page includes PayPal subscriptions, GitHub Sponsors, Ko-fi, Buy Me a Coffee, NOWPayments, and Stripe. Provider checkout, receipts, cancellation, fees, and privacy behavior belong to the provider. The project should not promise a processor's outcome or ask visitors to send card details by email.

## Age confirmation

Payment content is behind a self-declared 18+ browser confirmation. This is a UX gate, not identity verification, KYC, or a legal age-verification service. Documentation remains available without confirming. Read [policies/age-confirmation-policy.md](policies/age-confirmation-policy.md) before changing the gate.

## Troubleshooting a provider

If an embed does not appear, test a clean browser profile, inspect the browser console, verify the CSP entry in `site/_headers`, and try the provider's direct text link. Do not weaken CSP to `*`, add private keys to the page, or remove the age gate simply because a provider is unavailable.
