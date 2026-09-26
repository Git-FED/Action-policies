# Concurrency and Cancellation Policy

> **TL;DR:** A new commit normally supersedes an older pull-request run. Use concurrency groups to stop obsolete work, but never cancel a deployment in a way that can leave production half-updated.
>
> Cancellation is a correctness decision as well as a cost decision: it must match the lifecycle of the work being protected.

## Pull requests

Use this block for ordinary validation:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

The group includes the workflow name so two different workflows can run independently. The ref distinguishes pull requests and branches. When a contributor pushes a new commit, GitHub cancels the previous run and starts validation for the new state.

## Deployments

Deployment workflows should usually group by environment rather than by arbitrary commit. A deployment can use:

```yaml
concurrency:
  group: production-deploy
  cancel-in-progress: false
```

This serializes production deployments without interrupting a deployment after it has begun. If the deployment system supports transactional rollback, a team may choose a more aggressive strategy, but the decision must be documented.

## Manual investigations

A manually dispatched diagnostic workflow may use a unique run group or no cancellation if each run collects independent evidence. Do not add cancellation automatically to every workflow without understanding the work.

## Review checklist

Ask whether the workflow is superseded by a newer commit, whether cancellation can leave external state inconsistent, and whether the group is stable across retries. Then verify the resulting behavior in the Actions UI with two quick successive runs.

