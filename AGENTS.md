# Agent Working Agreement

This file describes expectations for automated contributors and coding agents working in this repository. It is a project guardrail, not a substitute for human review.

## Work method

1. Inspect the existing file, route, workflow, and related documentation before editing.
2. Make the smallest change that solves the stated problem and explain meaningful tradeoffs.
3. Preserve user-provided public identifiers exactly when they are intended for client-side provider embeds.
4. Never request, print, commit, or invent private keys, tokens, credentials, payment secrets, or customer data.
5. Do not claim current provider pricing or behavior without an official source and review date.

## Workflow expectations

New workflows need narrow triggers, explicit permissions, cancellation where safe, realistic timeouts, and short artifact retention. Templates belong under `TEMPLATES/`; active jobs belong under `.github/workflows/`. Every workflow change should state the expected minute and storage impact.

Avoid adding a matrix, schedule, runner, or provider because it appears in a generic checklist. Add it only when this repository actually uses it, give it an owner, and document how it can be removed.

## Site expectations

Every public route is a real HTML file. Every redirect has an HTML fallback. Support embeds remain behind age confirmation. CSP changes are deliberate and provider-specific. Preserve keyboard access, visible focus states, responsive layout, readable contrast, and reduced-motion behavior.

Use CSS for simple animation, animate transform and opacity, and keep pointer effects decorative. Background layers must not block clicks. A visually impressive page that cannot be navigated or validated is incomplete.

## Validation and delivery

Run policy scanners, build `dist/`, validate HTML, audit local routes, and check JavaScript syntax before declaring work complete. Inspect the generated output, verify requested files exist, and package the final archive only after the archive integrity test passes.
