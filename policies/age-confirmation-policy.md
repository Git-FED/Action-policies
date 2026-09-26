# Age Confirmation Policy

> **TL;DR:** The support and donation pages use a self-declared age confirmation before displaying payment links. It is a user-experience boundary, not identity verification, KYC, or a government age check.
>
> The repository must describe the gate honestly: it stores a local browser flag, does not transmit that flag to us, and does not determine a visitor's legal eligibility.

## Purpose

The companion static site contains links to external donation and payment processors. Before those links are displayed, the site asks the visitor to confirm that they are 18 or older. The goal is to place a clear pause between ordinary documentation and payment content, especially for younger visitors who may arrive through a search result or a shared link.

This control is intentionally modest. The page must never use terms such as “age verified,” “identity checked,” or “legally verified” for this local browser choice.

## What the gate does

- Shows a short explanation before payment links appear.
- Offers a clear choice to continue or keep payment content hidden.
- Stores a boolean value in the visitor's browser `localStorage`.
- Allows the visitor to continue reading documentation without confirming.
- Fails closed for payment content if storage or JavaScript is unavailable.

The stored value is a convenience for the same browser. It is not a profile, account record, or durable statement that we can inspect.

## What the gate does not do

The gate is not a government-issued identity-document check, KYC, an anti-fraud service, a legal age-verification service, proof of location-specific eligibility, or a replacement for a payment processor's own terms. Visitors remain responsible for following the laws and processor requirements that apply to them.

## Accessibility and privacy

The confirmation panel must be keyboard reachable, readable at mobile widths, and announced clearly enough for assistive technology. Buttons need visible focus states and plain labels. Do not trap a visitor in a modal, prevent access to policy pages, or make declining harder than continuing.

The flag is stored locally and is not transmitted to the project. If the behavior ever changes to an account or server-side record, this policy and the privacy notice must be rewritten before deployment.

## Clearing the choice

A visitor who confirmed by mistake can clear this site's stored data through browser privacy settings. The implementation may also provide a visible reset control. Documentation and policy pages remain available without confirmation.

## Maintenance and verification

Changes to the gate must be reviewed with the privacy page, terms, refund policy, CSP, and payment embeds. New third-party scripts must be reflected in `site/_headers`. Test a clean browser profile, a refresh after confirmation, the decline path, cleared storage, keyboard navigation, and a narrow viewport before publishing.

## Contact

Questions can be sent to [support@fedpromptly.com](mailto:support@fedpromptly.com).
