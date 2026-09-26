# Understanding GitHub Actions Quota

> **TL;DR:** GitHub Actions consumption is shared across an organization and is influenced by plan allowances, runner type, storage, and billing settings. The exact numbers change, so verify them in GitHub&apos;s current billing documentation before making a budget promise.
>
> The safest operating rule is to reduce unnecessary work first: cancel obsolete runs, narrow triggers, keep artifacts short-lived, and measure the largest consumers every week.

## Why this matters

A quota incident is an availability incident for engineering. When included minutes or spending limits are exhausted, required checks may stop starting, releases can wait, and maintainers lose the feedback loop that makes small changes safe. The failure is often discovered by a developer who did nothing unusual; the organization simply accumulated enough ordinary runs to cross a shared boundary.

Treat minutes, storage, and concurrency as budgeted resources. The organization billing dashboard is the source of truth. Navigate to **Organization Settings → Billing and plans → Actions** to inspect included minutes, paid minutes, storage, and the configured spending limit. The labels and exact plan allowances can change, so avoid copying an old screenshot into a policy.

## A useful model

For rough internal reasoning, think of consumption as:

```text
monthly runner consumption = runs × jobs per run × average job minutes × runner multiplier
```

This is not a billing formula. It is a way to see why cancellation and matrix pruning have multiplicative value. If a pull request triggers a six-version matrix and the contributor pushes five times, the organization may schedule thirty jobs before anyone reviews the final commit.

Storage is a separate dimension. An artifact can be small and still become expensive when uploaded frequently and retained for weeks. A one-day report is often enough for a pull-request diagnosis; a release asset should be deliberately published as a release asset rather than left in transient workflow storage.

## What happens when the budget is exhausted

The practical symptom depends on the plan and spending configuration. Some organizations allow paid usage; others set a spending limit of zero, in which case new work may stop when included resources are exhausted. Do not promise a universal behavior. Confirm the organization&apos;s setting and communicate the fallback plan to maintainers.

## The operating rules

1. Every pull-request workflow gets concurrency cancellation where safe.
2. Every artifact upload sets retention to three days or less.
3. Draft pull requests do not run expensive validation by default.
4. Documentation-only changes avoid product test matrices.
5. Scheduled jobs are owned, infrequent, and bounded.
6. Self-hosted runners require security and operations review.

## How to verify compliance

Run the local scanners, review the workflow diff, and inspect the Actions billing dashboard weekly. The repository's policy workflow is a backstop, not a substitute for ownership. Read [monitoring-usage.md](monitoring-usage.md) and [cost-optimization.md](cost-optimization.md) for the operating routine.

## Related files

- [The policy](../policies/actions-budget-policy.md)
- [Retention policy](../policies/retention-policy.md)
- [Concurrency policy](../policies/concurrency-policy.md)
- [Monitoring usage](monitoring-usage.md)

