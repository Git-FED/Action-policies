# Actions Quota Incident Response

> **TL;DR:** When Actions usage approaches zero, protect the checks that answer the most important questions and stop optional work before changing application code. Communicate the risk while you still have a working channel.
>
> The first objective is service continuity; the second is finding the repeatable cause so the same incident does not recur next month.

## Triage order

1. Confirm the signal in **Organization Settings → Billing and plans → Actions**.
2. Determine whether the issue is minutes, storage, concurrency, a runner outage, or permissions.
3. Identify the highest-volume repositories and workflows.
4. Disable nonessential schedules and broad matrices through a reviewed change.
5. Preserve required checks for the default branch and release path.
6. Communicate the temporary operating mode.

Capture a snapshot of the evidence before cleanup, including the period, approximate usage, affected workflows, and spending-limit behavior.

## What to disable first

Start with duplicate scheduled reports, preview deployments no one is reviewing, full matrices on draft PRs, and workflows that run on both `push` and `pull_request` without a clear reason. Do not start with the smallest job simply because it is easy to find; remove the largest avoidable source first.

Keep default-branch checks, security scanning, release verification, and the communication channel needed for recovery. If a required check cannot run, record that explicitly rather than marking it successful by convention.

## Communication template

> Actions capacity is constrained for the current billing period. We are preserving default-branch checks and release validation while temporarily pausing optional schedules and wide matrices. The owner is reviewing the top consumers and will post the next update after the billing dashboard and workflow audit are reconciled.

## Recovery and prevention

After capacity returns, restore jobs one at a time. Add concurrency, retention, path filters, or matrix changes before re-enabling the next job. Compare the next weekly report with the incident baseline. Close the incident only when the corrective change is merged and the owner has verified that the original trigger cannot silently return.

Create a named owner for billing review, keep exceptions dated, run local scanners in pull requests, and use the templates rather than copying old workflow files from unrelated repositories.

## Related files

- [Monitoring usage](monitoring-usage.md)
- [Quota policy](quota-policy.md)
- [Exceptions register](../policies/exceptions.md)
