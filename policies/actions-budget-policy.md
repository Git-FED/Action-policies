# Actions Budget Policy

> **TL;DR:** Treat GitHub Actions minutes and storage as shared organizational resources, not as an unlimited side effect of every push. Every workflow must have a narrow trigger, a bounded runtime, and an explicit reason to exist.
>
> The default posture is conservative: cancel obsolete pull-request runs, skip work that cannot be affected by a change, retain artifacts briefly, and measure before adding a matrix or a schedule.

## Purpose

This policy gives maintainers a review standard for GitHub Actions in repositories owned by the organization. It is not a promise about current GitHub pricing. Plan allowances, included minutes, storage, runner multipliers, and billing behavior can change, so owners must verify current details in [GitHub&apos;s billing documentation](https://docs.github.com/billing).

The policy exists because quota incidents are rarely caused by one dramatic job. They are usually the sum of ordinary decisions: a full matrix on every commit, several superseded pull-request runs still executing, artifacts left at default retention, scheduled jobs that no one reads, or documentation changes triggering application tests.

## Required controls

### 1. Narrow triggers

Prefer `pull_request` against the default branch for validation. Use `paths` and `paths-ignore` when a class of change cannot affect a job. Use `workflow_dispatch` for expensive investigations and release-like work. A scheduled job must document its owner, cadence, and reason.

### 2. Concurrency cancellation

Pull-request workflows should use a stable group based on workflow name and ref:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

Do not cancel deployments after they have passed the point where interruption could leave an environment inconsistent. Use an environment-specific group and a documented deployment strategy instead.

### 3. Bounded jobs

Every job must set `timeout-minutes`. Timeouts should reflect the expected runtime plus a reasonable diagnostic margin, not a generous multiple that hides a hang. Avoid `sleep`, unbounded polling, and retry loops that can run for hours.

### 4. Artifact retention

Every `actions/upload-artifact` step must set `retention-days` to **3 or less** unless an approved exception exists in `policies/exceptions.md`. A short retention window is not a substitute for publishing a release asset or storing a long-lived report in the system designed for it.

### 5. Runner selection

Use `ubuntu-latest` for portable work. macOS and Windows are appropriate only when they test a real platform requirement. Self-hosted runners require explicit security and operations review; current pricing and billing treatment must be verified before adoption.

### 6. Permissions

Start workflows with the smallest permissions needed, normally:

```yaml
permissions:
  contents: read
```

Add write permissions only for the exact job that needs them. Never grant broad write access merely because an action's example does so.

## Exceptions

An exception must name the repository, workflow, owner, reason, expected duration, and compensating control. Examples include release evidence that must remain available longer than three days or a platform matrix required for a supported product promise. Exceptions expire; they are not permanent loopholes.

## Ownership and review

Repository maintainers own local compliance. Organization administrators own plan and billing decisions. Review this policy quarterly and any time GitHub changes billing documentation or runner behavior. See [monitoring-usage.md](../docs/monitoring-usage.md) for the weekly review routine.

