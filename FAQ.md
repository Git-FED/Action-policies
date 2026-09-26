# Frequently Asked Questions

## Is this a GitHub Actions replacement?

No. It is a policy, documentation, template, audit, and static-site project. GitHub still executes the workflows and controls the billing model.

## Should I copy every template?

No. Copy the smallest template that matches the actual project. Unused language, package, or release workflows create noise and can consume minutes when they fail or run unexpectedly.

## Why is artifact retention capped at three days?

Most pull-request artifacts are diagnostic evidence. They are useful during review and shortly afterward, but they are not a long-term archive. Release assets and compliance stores are better places for durable records.

## Why do draft pull requests skip expensive jobs?

Drafts are explicitly unfinished and often change rapidly. The full test suite should start when the contributor is asking for review, unless an earlier check is required for security or policy reasons.

## Does self-hosted mean free?

No. Infrastructure, patching, idle capacity, isolation, monitoring, and incident response all cost something. Verify current platform billing rules instead of repeating an old fee claim.

## What is the Cloudflare deploy directory?

This repository builds `site/` into `dist/` and deploys `dist/`. A plain HTML repository with an `index.html` at its root can use `--assets=.` instead; project shape matters.

## Why are payment embeds age-gated?

The support page places an explicit pause before external payment content. The gate is self-declared local browser state, not KYC or legal age verification.

## Are public client IDs secrets?

Provider-specific public client IDs and publishable keys may be designed to appear in client-side code. Private keys, webhook secrets, bearer tokens, and access credentials are never safe to commit.

## Where should I report security concerns?

Use [SECURITY.md](SECURITY.md) and email the private reporting address. Do not put a vulnerability in a public issue or discussion.

## How do I contribute?

Read [CONTRIBUTING.md](CONTRIBUTING.md), run the local checks, describe the workflow-minute impact, and keep the pull request focused.
