# Build Guide

This repository has a deliberately small build system. It does not compile a framework bundle. The build creates a clean deployment directory, checks required files, and leaves the source tree easy to inspect.

## Inputs and output

| Input | Purpose | Output |
| --- | --- | --- |
| `site/` | HTML, CSS, JavaScript, headers, redirects, and assets | `dist/` |
| `scripts/build-site.sh` | Clean copy and required-file check | deployment directory |
| `scripts/validate-html.sh` | Basic structure and footer validation | pass or failure |
| `site/sitemap.xml` | Search discovery | copied sitemap |
| `site/_headers` | Cloudflare security and cache headers | copied headers |
| `site/_redirects` | Cloudflare route behavior | copied redirects |

## Build command

```bash
bash scripts/build-site.sh .
```

The command deletes the previous `dist/` directory before copying. This is intentional: a clean output makes stale route bugs visible. It should be run from the repository root or passed the root path as its argument.

## Validation command

```bash
bash scripts/validate-html.sh dist
```

The current validator checks doctype, title, primary heading, and shared footer markers. The CI route audit additionally checks internal links, redirect stubs, required provider pages, and the presence of the support gate.

## Adding assets

Prefer CSS gradients, SVG, and small local files. Avoid adding a large video or WebGL dependency for a decorative effect. Animate `transform` and `opacity`, use `will-change` sparingly, and provide a reduced-motion fallback. Remote provider assets belong only on the support page and must be reflected in CSP.

## Generated output policy

`dist/` is generated and ignored by normal source review, but the packaging process includes it so the ZIP is immediately understandable and deployable. Never make a hand edit to `dist/` and assume it will persist; update `site/` and rebuild.
