# Roadmap

The roadmap is intentionally small. The project exists to improve operational clarity, not to become a general-purpose automation platform. Priorities may change when GitHub, Cloudflare, or payment providers change their interfaces.

## Now

- Keep every Markdown guide substantive, current, and linked from the right index.
- Keep the support hub accessible, age-gated, and transparent about provider boundaries.
- Test the same `dist/` output on GitHub Pages and Cloudflare Pages.
- Improve the local route audit so broken links fail before deployment.

## Next

- Add a lightweight external-link review that reports failures without blocking every pull request.
- Add a generated navigation manifest so new docs cannot silently disappear from the HTML index.
- Add a visual smoke-test checklist for keyboard focus, mobile width, reduced motion, and high contrast.
- Publish measured examples showing how cancellation, path filters, and retention affect workflow volume.

## Later

- Consider a small read-only dashboard if organizations need trend history beyond the GitHub billing page.
- Add reusable policy checks for workflow permissions and unsafe fork handling.
- Add translated documentation after the English information architecture stabilizes.

## Non-goals

This project will not become a hosted CI service, a payment processor, an analytics platform, or an automatic billing-change bot. It will not claim exact pricing without current official sources, and it will not add a framework simply to make a static site sound more sophisticated.

## How to propose a roadmap change

Open a discussion with the user problem, expected impact, maintenance owner, and a smaller alternative. A roadmap item without an owner or verification plan is an idea, not a commitment.
