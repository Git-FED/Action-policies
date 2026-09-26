# Support and Donations Guide

> **TL;DR:** The support page groups recurring, one-time, and community options into separate tabs so visitors can choose deliberately. External payment code is loaded only after the site's self-declared age confirmation.
>
> The project receives no card numbers. Payment processors control checkout, receipts, cancellation, and their own privacy policies.

## Provider map

### Recurring support

- **PayPal FedPromptly** — subscription plan `P-4FD24238VX4902214NK2XP2Y`.
- **GitHub Sponsors** — a hosted sponsor button for the Git-FED profile.
- **Ko-fi** — recurring or one-time support through the `W3T61ZU5FS` profile.

### One-time support

- **Buy Me a Coffee** — a book-themed one-time support button.
- **NOWPayments** — cryptocurrency and Bitcoin payment option.
- **Stripe** — a hosted buy button using a public publishable key.

### Community and ecosystem

The page also links to FED-OS and FedPromptly destinations, including the main site, membership page, Jabburr, Patreon, X, Substack, Bluesky, WordPress, Discord, and DeviantArt. These are community routes, not payment embeds, and should remain visually secondary to the support choices.

## Embed architecture

The page keeps provider code out of the initial document where possible. `age-confirm.js` controls the payment-content boundary. `support.js` observes the content panel and loads PayPal and Ko-fi only after the panel becomes visible. Stripe is loaded when the visitor opens the one-time tab. This reduces initial work, makes the visitor's choice explicit, and prevents payment scripts from appearing on ordinary documentation pages.

The PayPal approval path writes an in-page status message instead of using `alert()`. A subscription identifier may be displayed to the subscriber for reference, but it should not be sent to analytics or placed in a URL. Provider failures show a readable fallback and a direct link where one exists.

## Public and private values

PayPal client IDs, plan IDs, Stripe publishable keys, profile identifiers, and public embed URLs may be present in client-side HTML or JavaScript when the provider expects them there. They are not passwords. Never place a Stripe secret key, PayPal secret, webhook signing secret, access token, or API credential in this repository.

When a provider changes an identifier, update the support page, `support.js`, CSP, and the relevant legal or privacy copy together. Test the page with a clean browser profile.

## Security headers

`site/_headers` allows only the provider domains currently used by the support hub. When adding a script, frame, image, or connection target, update CSP deliberately and explain the reason in the pull request. Do not use a wildcard such as `*` to avoid understanding a provider's resource behavior.

The page uses:

- `script-src` for PayPal, Ko-fi, and Stripe JavaScript;
- `frame-src` for PayPal and GitHub Sponsors;
- `img-src` for Buy Me a Coffee, NOWPayments, and Ko-fi assets;
- `connect-src` for provider API requests;
- `form-action` for hosted checkout destinations.

## Age confirmation

The support and donation pages use a self-declared 18+ confirmation stored in local browser storage. This is a UX gate, not identity verification, KYC, or legal age verification. The copy must remain honest, and visitors must be able to read documentation without accepting the gate.

## Maintenance checklist

Before changing provider code:

- [ ] Confirm the destination belongs to the intended profile.
- [ ] Check that public identifiers are not private secrets.
- [ ] Update CSP only with the necessary domains.
- [ ] Test a clean browser profile and the decline path.
- [ ] Confirm keyboard access to tabs and buttons.
- [ ] Confirm a provider failure still leaves a usable text link.
- [ ] Update the privacy, terms, refund, or age policy when behavior changes.
- [ ] Run the static-site build and HTML/link checks.

## Related files

- [Support page](../site/support/index.html)
- [Support JavaScript](../site/assets/js/support.js)
- [Age confirmation policy](../policies/age-confirmation-policy.md)
- [Privacy policy](../site/legal/privacy/index.html)
- [Security disclosure](../policies/security-disclosure.md)
