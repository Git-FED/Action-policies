# Deployment Guide

> **TL;DR:** Edit `site/`, build a clean `dist/`, validate the generated routes, and deploy that same directory to GitHub Pages or Cloudflare Pages. Never maintain two independent copies of the public site.
>
> The deployment workflows are intentionally boring: the interesting work belongs in reviewable source files, not hidden provider settings.

## Local build

From the repository root:

```bash
bash scripts/build-site.sh .
bash scripts/validate-html.sh dist
bash scripts/find-long-retention.sh .
bash scripts/find-missing-concurrency.sh .
```

The build removes the old `dist/` directory, copies `site/`, and checks for required files. The validator checks the generated HTML structure. The route audit used in CI verifies local links and redirect stubs.

## GitHub Pages

The Pages workflow uses the official artifact and deployment actions. It grants `pages: write` and `id-token: write` only because the deployment requires them, and it does not cancel a deployment after it starts. The source branch is `main`; the generated artifact is built from `site/`.

Configure the repository's Pages source to use the workflow. If a custom domain is used, keep `site/CNAME` synchronized with the intended domain and verify HTTPS after the first deployment.

## Cloudflare Pages

This repository builds `dist/` and deploys it with Wrangler. Configure `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as secrets. The token should have the narrowest Pages permission available. The workflow command is:

```bash
npx wrangler pages deploy dist --project-name actions-budget-policy
```

For a plain HTML repository with `index.html` at its root, Cloudflare can deploy without a build command using `npx wrangler deploy --assets=.`. That is not this repository's layout; here, the clean build prevents stale files and keeps both hosts aligned. See [docs/cloudflare-deployment.md](docs/cloudflare-deployment.md) for the project-shape comparison.

## Releases and rollback

Deploy from a reviewed commit on `main`. If the site breaks, identify whether the source, build, or provider is responsible. Roll back the source commit or redeploy a known-good artifact rather than editing generated files by hand. Preserve the failing route and console evidence for the follow-up issue.

## Deployment checklist

- [ ] Source HTML, CSS, and JavaScript are committed under `site/`.
- [ ] Every route and redirect has an HTML file.
- [ ] External provider changes are reflected in CSP.
- [ ] Support embeds remain behind age confirmation.
- [ ] `dist/` builds cleanly.
- [ ] Both host workflows point to the same generated output.
- [ ] No secrets appear in the site or archive.
