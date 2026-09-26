# Usage Guide

This repository can be used as a handbook, a template source, a local audit toolkit, or a static reference site. Start with the smallest mode that matches your need.

## Read the policy

Open [policies/actions-budget-policy.md](policies/actions-budget-policy.md) and [docs/quota-policy.md](docs/quota-policy.md). The policy states the defaults; the guide explains the operational reasoning and weekly review routine.

## Audit a repository

Run the local scanners from a repository root:

```bash
bash scripts/find-long-retention.sh .
bash scripts/find-missing-concurrency.sh .
```

The first flags artifact uploads without an explicit short retention. The second flags pull-request workflows that do not visibly cancel obsolete runs. Both are intentionally conservative and should be reviewed when a workflow has an exception.

## Audit an organization

With GitHub CLI authenticated and authorized:

```bash
bash scripts/audit-org-usage.sh FED-OS
```

The audit reads workflow files across up to 100 repositories and reports likely retention and concurrency reviews. It does not reproduce billing and does not delete or modify anything.

## Use a template

Copy the smallest applicable file from `TEMPLATES/` into the target repository's `.github/workflows/`. Replace commands, paths, runtime versions, and branch names. Review permissions and triggers before committing. Templates are examples, not universal defaults.

## Build the site

```bash
bash scripts/build-site.sh .
bash scripts/validate-html.sh dist
python3 -m http.server 8080 --directory dist
```

The static site includes real directory routes and HTML redirect fallbacks, so it can be inspected locally without a framework server.

## What success looks like

A successful adoption reduces unnecessary work without hiding useful failures. Measure run count, average duration, cache behavior, artifact storage, and feedback quality. If the policy makes a team skip a required check, revise the policy rather than celebrating the lower number.
