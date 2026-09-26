# Cloudflare Deployment Guide

> **TL;DR:** Cloudflare deployment settings depend on whether a repository is a plain HTML site, a Worker-code project, or a framework that produces a build directory. This repository builds a static site into `dist/`, so Cloudflare should deploy that generated directory.
>
> Keep the build command, deploy command, root directory, and production branch aligned with the files that actually exist. Do not add Hugo, a framework build, or Worker bindings to a plain HTML repository without a real need.

## The three project shapes

### Plain HTML website

A plain website has files such as:

```text
index.html
style.css
script.js
assets/
```

If those files live at the repository root, Cloudflare can deploy them without a build command. A typical static configuration is:

```text
Build command: leave blank
Deploy command: npx wrangler deploy --assets=.
Root directory: /
Production branch: main
```

If the website lives in `public/`, use `--assets=public` and keep the root directory `/`.

### Worker-code project

A Worker project has an actual runtime entry point, for example:

```text
src/index.js
package.json
wrangler.jsonc
```

The project may need:

```text
Build command: npm ci && npm run build
Deploy command: npx wrangler deploy
Root directory: /
Production branch: main
```

A `wrangler.jsonc` file becomes the permanent source of truth for the Worker name, entry point, compatibility date, bindings, and optional static assets. Do not add one to a static site merely because the word “Cloudflare” appears in the project brief.

### Framework project

Vite, React static export, Astro, and Hugo projects usually build into a generated directory. The settings often look like:

```text
Build command: npm ci && npm run build
Deploy command: npx wrangler deploy --assets=dist
Root directory: /
Production branch: main
```

The output directory must match the framework:

| Project type | Typical output |
| --- | --- |
| Vite | `dist` |
| React build | `build` or `dist` |
| Astro | `dist` |
| Hugo | `public` |
| Plain HTML at repository root | `.` |
| Plain HTML in `public/` | `public` |

## This repository's setup

This repository is a static HTML project with a small, deterministic build step. The source lives in `site/`, and `scripts/build-site.sh` copies it into a clean `dist/` directory before deployment. That build step matters because it prevents stale files from a previous deployment from surviving a source change.

Recommended settings:

```text
Build command: bash scripts/build-site.sh .
Deploy command: npx wrangler pages deploy dist --project-name actions-budget-policy
Root directory: /
Production branch: main
```

The live GitHub Actions workflow uses `cloudflare/wrangler-action@v3`, builds `dist/`, and then runs the Pages deployment command. Configure `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as repository or organization secrets with the narrowest permissions Cloudflare supports.

The repository also contains `wrangler.toml` and `cloudflare-pages.toml` to make the expected project name and output directory visible. The workflow remains the final execution path, so review the workflow and configuration together.

## Before deploying

Check these items:

- `site/index.html` exists and the build creates `dist/index.html`.
- The deployment command matches the actual output directory.
- The production branch is `main`.
- No secret is committed to HTML, JavaScript, CSS, or the generated directory.
- `_headers` and `_redirects` are present in the deployment output.
- Every public redirect has an HTML fallback under `site/redirects/`.
- The route and HTML validation checks pass locally.

Run:

```bash
bash scripts/build-site.sh .
bash scripts/validate-html.sh dist
```

## GitHub Pages parity

GitHub Pages consumes the same `dist/` structure through the Pages artifact workflow. Cloudflare Pages and GitHub Pages should be treated as mirrors, not as separately edited sites. If one host behaves differently, compare the generated files first, then inspect host-specific headers or redirect semantics.

## Related files

- [Static-site test strategy](test-strategy.md)
- [Cloudflare workflow](../.github/workflows/deploy-cloudflare-pages.yml)
- [GitHub Pages workflow](../.github/workflows/deploy-github-pages.yml)
- [Wrangler configuration](../wrangler.toml)
