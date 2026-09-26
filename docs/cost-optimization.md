# Cost Optimization: Ten High-Leverage Changes

> **TL;DR:** The biggest savings usually come from avoiding work, not shaving seconds off work that still needs to run. Start with trigger scope, cancellation, retention, and matrix size before changing infrastructure.
>
> Optimize for useful signal per minute: a fast job that runs unnecessarily is still wasteful.

## 1. Add concurrency cancellation

Cancel superseded pull-request runs. This is often the fastest win because it removes whole jobs rather than making each job marginally faster.

## 2. Shorten artifact retention

Set `retention-days: 1` for transient test output and never rely on the default. Publish release evidence intentionally.

## 3. Cache dependencies

Use the cache support built into setup actions or a carefully scoped cache key. Cache downloads, not generated output that can become stale or huge.

## 4. Skip draft pull requests

Drafts are for iteration. Require a ready-for-review event before starting the full suite, while keeping a cheap lint job available if the team needs feedback.

## 5. Use path filters

A documentation edit should not rebuild an unrelated application. Keep filters conservative and review them when repository boundaries change.

## 6. Prune matrices

Test the versions you support, not every version you have ever used. If a matrix is needed for release confidence, keep pull-request validation narrower and run the full matrix on a deliberate schedule or release event.

## 7. Prefer Linux

Use hosted Linux for portable work. Reserve macOS and Windows for real platform behavior, and keep those jobs focused.

## 8. Bound every job

A timeout converts a hang into a visible failure. It also stops a forgotten process from consuming the rest of the billing period.

## 9. Use self-hosted runners only when justified

Self-hosted capacity can be the right answer for specialized hardware or private networks, but it is not automatically cheaper or safer. Account for maintenance, isolation, security, and current pricing.

## 10. Offload documentation work

Static documentation builds can be simple, fast, and isolated from product test matrices. This repository builds HTML without installing a large framework.

## How to verify compliance

Compare the workflow graph before and after the change. Check run count, average duration, artifact size, and failure signal. A change that lowers minutes but hides failures is not an optimization.

## Related files

- [Caching strategy](caching-strategy.md)
- [Draft PRs and concurrency](draft-prs-and-concurrency.md)
- [Artifact retention](artifact-retention.md)

