# Contributing to Actions Budget Policy

Thank you for helping make CI more predictable. This repository accepts improvements to policy documents, workflow checks, copy-paste templates, audit scripts, and the static reference site. The standard for a good contribution is not “more automation”; it is **more useful verification for less repeated work**.

## Before you open a pull request

Complete this checklist before requesting review:

- [ ] I read the relevant policy in `policies/` and the supporting guide in `docs/`.
- [ ] I ran `bash scripts/find-long-retention.sh .` locally.
- [ ] I ran `bash scripts/find-missing-concurrency.sh .` locally.
- [ ] I confirmed that no new workflow duplicates an existing live job.
- [ ] Every new workflow has a `concurrency` block with `cancel-in-progress: true` where cancellation is safe.
- [ ] Every `actions/upload-artifact` step explicitly sets `retention-days` to three or fewer.
- [ ] Every job has a bounded `timeout-minutes` value.
- [ ] Docs-only changes do not trigger an unnecessary product test matrix.
- [ ] I ran `bash scripts/build-site.sh` and `bash scripts/validate-html.sh site` when site files changed.
- [ ] I did not add secrets, tokens, local credentials, or real payment private keys.

A contribution that changes workflows should include a short “minute and storage impact” note in the pull request description. A statement such as “adds one Linux job, bounded to 10 minutes, with no artifact upload” is enough to make review concrete.

## Commit style

Use Conventional Commit prefixes so the history explains why a change happened:

```text
feat: add a reusable retention snippet
fix: detect yaml workflows with quoted on keys
docs: clarify cache restore behavior
chore: refresh action versions
refactor: share route validation helpers
test: add a broken workflow fixture
```

Keep commits focused. A workflow policy change and an unrelated site redesign should normally be separate pull requests because they have different review risks.

## Adding or changing a workflow

A live workflow belongs in `.github/workflows/`. It must:

1. Have a clear, unique filename and a descriptive `name`.
2. Use the narrowest trigger that meets the requirement.
3. Define `permissions` explicitly, normally beginning with `contents: read`.
4. Use a concurrency group for pull-request or deployment work.
5. Set `timeout-minutes` on every job.
6. Use Linux runners unless a platform-specific test is genuinely required.
7. Avoid schedules more frequent than weekly unless an owner documents the reason.
8. Set artifact retention explicitly when an artifact is uploaded.
9. Avoid secrets in fork-triggered workflows and never use `pull_request_target` casually.

If the file is intended as a copy-paste example rather than an active workflow, put it under `TEMPLATES/` and add a header comment explaining when it should be used and what must be changed first.

## Adding a script

Scripts are Bash-first and should work on a clean Ubuntu runner. Every script must:

- use `set -euo pipefail` unless there is a documented reason not to;
- show a useful `--help` message;
- exit non-zero when a policy violation or validation failure is found;
- avoid destructive behavior by default;
- accept paths and organization names as arguments rather than hard-coding them;
- make network calls explicit and explain required permissions.

A cleanup script must default to dry-run or require a deliberate flag before deleting anything.

## Adding site content

Every page must have a real HTML file. Prefer directory routes such as `docs/quota-policy/index.html` so links remain readable. If a legacy URL redirects, add a matching file under `site/redirects/` even if the same redirect also appears in `_redirects`. Do not add a link to a route that exists only in a client-side router.

Pages must include a meaningful title, a single primary heading, keyboard-visible focus states, descriptive link text, and a footer link back to the policy documentation. Avoid inline styles and keep third-party scripts limited to pages that need them.

## Automatic rejection conditions

A pull request may be asked to change before review if it:

- adds an artifact upload without `retention-days`;
- sets artifact retention above three days without a documented exception;
- adds a duplicate workflow or job that performs the same check;
- adds an unbounded polling loop, long sleep, or unnecessarily broad matrix;
- commits `.env`, `credentials.json`, access tokens, or private payment keys;
- adds a redirect target without a corresponding HTML route;
- publishes a package or container that this repository does not actually build.

## Getting help

Open a focused issue with the expected behavior, the smallest reproduction, and the relevant workflow path. For security concerns, follow [SECURITY.md](SECURITY.md) rather than opening a public issue. Community and support links are listed in `.github/FUNDING.yml`.

