# Static Site Test Strategy

> **TL;DR:** The site is tested as a collection of real files, not as an assumed client-side application. Every public route must exist, internal links must resolve, and security-sensitive headers must remain visible in the deployed source tree.
>
> Visual polish is reviewed manually; structural regressions should fail quickly and cheaply in pull requests.

## What we test

- HTML structure for every page in `site/`.
- Required doctype, language, title, and primary heading markers.
- Internal links and local asset references.
- Presence of a consistent footer and navigation on content pages.
- Presence of the age confirmation gate on `support/` and `donate/`.
- Existence of `_headers`, `_redirects`, `robots.txt`, and `sitemap.xml`.
- That the build creates `dist/` and preserves directory routes.
- That redirect stubs include a usable HTML fallback and canonical destination.

## What we do not test

We do not attempt pixel-perfect visual regression, an exhaustive browser matrix, payment processor behavior, or external link liveness on every pull request. These boundaries keep required checks inexpensive while leaving a clear place for release-time manual review.

## Tooling

The repository uses small Bash checks so contributors can run them without a framework installation. A team may add `html-validate`, `lychee`, or Lighthouse in CI, but those tools should complement rather than replace route and link checks. The build script copies the static source to a clean `dist/` directory so a deployment never includes stale files.

## Cadence

Per pull request: policy scanners, static-site build, internal links, route presence, footer checks, and basic HTML structure. Weekly: external link review and quota reporting. Before release: manual keyboard check, mobile check, reduced-motion check, and a review of third-party scripts and CSP changes.

## Failure handling

A missing internal file, broken local link, missing footer, absent age gate, or malformed route fails CI. An external-link failure should create follow-up work but should not block a policy change when the provider is unavailable. A security-header regression fails review because it changes protection for every visitor.

## Workflow mapping

`test.yml` runs local scanners and HTML validation. `build-static-site.yml` creates the deployment artifact. The GitHub Pages and Cloudflare Pages workflows consume the same built directory rather than rebuilding a different version. This keeps both public deployments aligned.

## Manual release checklist

Open the home page, documentation index, one policy page, one redirect, support, donate, and each legal page. Navigate with the keyboard, test at a narrow viewport, confirm the payment gate is honest, and check the browser console for unexpected errors. Record external provider outages separately from site defects.
