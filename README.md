# GitHub Actions Budget Policy

<img width="2560" height="1440" alt="github-storage-saver" src="https://github.com/user-attachments/assets/54c814f8-8b46-443d-b584-5dc4a98e1469" />

A practical policy, template library, audit toolkit, and static reference site for teams that need to control GitHub Actions quota before CI becomes an operational surprise.

## Who this is for

This repository is designed for three groups that tend to experience the same failure from different angles:

- **Solo developers on a free organization** who need predictable builds without wasting included minutes on duplicate runs.
- **Small teams on a Team plan** that share a finite monthly allowance and need conventions that are easy to review in pull requests.
- **Any engineering group that has seen a pipeline freeze mid-month**, especially when the failure was caused by artifacts, a wide matrix, or a runaway scheduled job rather than productive testing.

The project is intentionally repository-first. It does not replace GitHub Actions, provide a new CI framework, or pretend that a single YAML file can solve billing. Instead, it gives a team a common vocabulary, conservative defaults, lightweight checks, and examples that make the inexpensive path the easy path.

## What is in here

The repository has four pillars, each with a deliberately narrow job:

- **`policies/`** — durable rules for retention, concurrency, runners, exceptions, and age confirmation for the companion support site.
- **`.github/workflows/`** — the small set of live workflows that test this repository, enforce its own policy, build the static site, and deploy it.
- **`TEMPLATES/`** — copy-paste examples for Node, Python, Docker, monorepos, releases, and reusable snippets. Templates are not active jobs.
- **`scripts/`** — shell tools for finding long artifact retention, missing concurrency, auditing organization usage, building HTML, and validating internal links.

The Markdown documentation in `docs/` explains the reasoning behind the defaults. The `site/` directory turns that same guidance into a readable, accessible static website that can be published to GitHub Pages or Cloudflare Pages.

## Quick start

The commands below assume GitHub CLI is installed and authenticated with permission to read the organization you want to audit:

```bash
gh repo clone FED-OS/actions-budget-policy
cd actions-budget-policy
bash scripts/audit-org-usage.sh FED-OS
cat policies/actions-budget-policy.md
```

To inspect a local repository before opening a pull request:

```bash
bash scripts/find-long-retention.sh .
bash scripts/find-missing-concurrency.sh .
bash scripts/validate-html.sh site
bash scripts/build-site.sh
```

The organization audit is read-only. It does not delete artifacts, change billing settings, or alter workflow files.

## The rules in one screen

| Rule | Why it matters | Where it is enforced |
| --- | --- | --- |
| Cap artifact retention at three days | Stored build output quietly becomes recurring storage cost and clutter. | Policy workflow, retention policy, templates |
| Auto-cancel redundant runs | A superseded commit should not keep consuming runners. | Concurrency policy, live workflows |
| Skip CI on draft pull requests | Drafts change frequently before they are ready for expensive validation. | Templates and review checklist |
| Cache package downloads | Re-fetching dependencies is slow and needlessly repeats work. | Language templates and caching guide |
| Do not run full CI for docs-only changes | Documentation edits should not trigger a product test matrix. | `paths-ignore`, site workflow, review checklist |
| Require approval for self-hosted runners | A runner has security and maintenance consequences in addition to cost. | Runner policy and pull-request review |

## Enforced automatically

The live workflow set is intentionally small:

1. **`test.yml`** validates Markdown, shell scripts, and static HTML structure.
2. **`policy-compliance-check.yml`** flags long artifact retention, missing concurrency, and duplicate job names in workflows.
3. **`build-static-site.yml`** builds a clean `dist/` directory from `site/` and checks that route files exist.
4. **`deploy-github-pages.yml`** publishes the generated static site using the official Pages artifact flow.
5. **`deploy-cloudflare-pages.yml`** publishes the same `dist/` directory through Wrangler when the repository secret is configured.
6. **`cleanup-old-artifacts.yml`** is a manual or weekly cleanup entry point; deletion remains explicit and reviewable.
7. **`weekly-quota-report.yml`** is an optional reporting workflow that records usage data without changing billing settings.

The `publish-*.yml` examples that may appear under `TEMPLATES/` are **templates, not live jobs**. They are not enabled in this repository because this project does not ship an npm package, Python package, or production container.

## Site and deployment model

The site is plain HTML, CSS, and JavaScript. There is no framework build that can hide routes or create an ambiguous client-side fallback. Every public route is represented by an actual `index.html`, and each legacy route under `site/redirects/` has its own HTML redirect stub in addition to the Cloudflare `_redirects` file. This makes the site usable on GitHub Pages, crawlable by static tooling, and understandable when opened from a downloaded ZIP.

GitHub Pages deploys from the generated `dist/` artifact. Cloudflare Pages deploys the same directory. The two deployments should be treated as equivalent mirrors, not as two independently edited sites.

## What this is not

- It is **not a CI framework** and does not replace GitHub&apos;s runners, checks, or permissions model.
- It is **not a replacement for GitHub&apos;s billing dashboard**. Always verify current plan limits and pricing in official GitHub documentation.
- It is **not legal or financial advice**. The policy language is operational guidance and should be reviewed for your organization.
- It is **not a reason to turn on every workflow in every repository**. Copy the smallest template that solves the problem.

## Contributing

Contributions are welcome when they make the policy clearer, the checks more reliable, or the examples cheaper to run without making them less useful. Read [CONTRIBUTING.md](CONTRIBUTING.md), run the local checks, and explain the expected minute or storage impact of any new workflow. Every pull request must pass `policy-compliance-check` before it is merged.

## Support

This project is MIT-licensed and community-funded. See [`.github/FUNDING.yml`](.github/FUNDING.yml) for support links and [SECURITY.md](SECURITY.md) for private vulnerability reports.

## License

MIT. See [LICENSE](LICENSE).

## Visual system and performance

The companion site is intentionally distinctive without turning into a heavy 3D demo. The visual language combines a deep navy aurora background, cyan and violet signal colors, glass-like panels, a bento grid, animated workflow orb, marquee principles, scroll reveals, and subtle pointer glow.

The effects are progressive enhancements:

- CSS handles gradients, hover states, budget-dashboard motion, and layout transitions.
- JavaScript adds reading progress, reveal timing, cursor glow, and optional card tilt.
- Only `transform` and `opacity` are animated for the interactive effects.
- `prefers-reduced-motion: reduce` disables nonessential animation.
- No video, WebGL, third-party animation library, or large media bundle is required.

This keeps the site expressive while preserving the fast, static deployment model. If a future page needs a heavier effect, load it only near the section that uses it and provide a static fallback.

## Cloudflare deployment

This repository builds static HTML from `site/` into `dist/`. The recommended Cloudflare Pages settings are:

```text
Build command: bash scripts/build-site.sh .
Deploy command: npx wrangler pages deploy dist --project-name actions-budget-policy
Root directory: /
Production branch: main
```

The workflow expects `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as repository or organization secrets. Read [docs/cloudflare-deployment.md](docs/cloudflare-deployment.md) before changing the build or deploy directory.

For a plain HTML repository whose files are already at the root, Cloudflare can deploy without a build command using `npx wrangler deploy --assets=.`. That is a different project shape from this repository: here, the clean `dist/` build prevents stale files and keeps GitHub Pages and Cloudflare Pages on the same output.

## Promotional page and social preview

The `/promotional/` route is a GitHub-facing project overview with the same neon workflow visual system, a concise value proposition, and an age-gated PayPal subscription call to action. Normal public pages also include a compact support card in the footer area; the full provider hub remains at `/support/`.

The repository includes a deterministic 1280×640 social preview at [`social-image.png`](social-image.png), its editable SVG source at [`social-image.svg`](social-image.svg), and a site asset copy at [`site/assets/images/social-preview.svg`](site/assets/images/social-preview.svg). The visual uses the project’s obsidian, cyan, violet, and signal-grid language so repository previews and the live site feel related.
