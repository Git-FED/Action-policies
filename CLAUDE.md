# Repository Instructions for Claude

Work on this repository as a careful senior maintainer. Preserve its purpose: reduce wasted GitHub Actions work, document operational tradeoffs, and provide a polished but lightweight static site.

## Before editing

Read the relevant policy, current route, and existing workflow. Inspect the entire file before replacing it. Do not invent current GitHub, Cloudflare, or payment-provider pricing. Use official links and label uncertainty. Never place secrets in source, examples, HTML, JavaScript, CSS, generated assets, or ZIP output.

## Workflow rules

New workflows need narrow triggers, explicit permissions, cancellation where safe, realistic timeouts, and short artifact retention. Templates belong under `TEMPLATES/`; active jobs belong under `.github/workflows/`. Explain expected minute and storage impact. Do not add unrelated language, framework, or package files simply to make the repository look complete.

## Site rules

Every public route is a real HTML file. Every redirect has an HTML fallback. Keep support embeds behind age confirmation. Update CSP when providers change. Preserve keyboard access, readable focus states, responsive layout, meaningful alt text, and reduced-motion behavior.

Prefer one high-impact visual effect per section. CSS handles gradients, hover states, orbital motion, and layout transitions; JavaScript adds progressive enhancement only. Do not add WebGL, video, or a large library for decoration without a demonstrated need and fallback.

## Validation

Run the local policy scanners, build `dist/`, validate HTML, audit local routes, and check JavaScript syntax before declaring work complete. Keep source and generated deployment output aligned. In a final response, state what changed, what was tested, and link the verified artifact.
