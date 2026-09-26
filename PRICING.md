# Pricing and Quota Notes

> **Important:** This file is an operational planning aid, not a billing promise. GitHub, Cloudflare, payment providers, and runner pricing can change. Always verify the current official documentation before approving a budget or publishing a number.

## GitHub Actions

The useful planning question is not “what is the one correct minute price?” It is “what work is the organization scheduling, how often, on which runner type, and for how long?” Plan allowances, storage limits, runner multipliers, public/private repository treatment, and spending controls all affect the result.

Use the organization dashboard at **Settings → Billing and plans → Actions** as the source of truth. Record the observation date in internal reports. If a spending limit is zero, new work may stop when included resources are exhausted; do not assume every organization has the same behavior.

## Cloudflare

Cloudflare Pages and Workers have separate product models and current plan rules. A static site may need only an account, project, output directory, and token. A Worker project may add runtime requests, bindings, storage, or other resources. Review current Cloudflare pricing and the account's configured limits before treating a deployment as free or unlimited.

## Payment providers

PayPal, Stripe, Ko-fi, Buy Me a Coffee, NOWPayments, Patreon, and other providers control their own fees, currency conversion, payout timing, taxes, refund rules, and eligibility. This repository does not calculate or promise a net donation amount.

## Internal review questions

Before a cost-affecting change, ask: What resource grows? Who owns it? What is the expected monthly volume? What is the failure mode? Can the same outcome be achieved with fewer runs, shorter retention, or a narrower trigger? Which official document will be rechecked when the provider changes?

## Related sources

- [GitHub billing documentation](https://docs.github.com/billing)
- [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)
- [Cloudflare Pages pricing](https://developers.cloudflare.com/pages/functions/pricing/)
