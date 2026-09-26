# Draft Pull Requests and Concurrency

> **TL;DR:** Draft PRs and obsolete commits are the two most common sources of CI work that no longer answers a useful question. Skip expensive validation until review-ready and cancel superseded runs.
>
> Together, these controls reduce both queue pressure and the number of minutes spent proving facts about code that has already changed.

## Pattern one: draft-aware jobs

GitHub exposes the pull-request draft state in the event payload. A job can skip itself while the PR is a draft:

```yaml
jobs:
  test:
    if: github.event.pull_request.draft == false
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - run: npm test
```

Use this only when the workflow is triggered by pull-request events. A manual dispatch has no pull-request object, so a reusable expression should account for the event type if the workflow supports both triggers.

## Pattern two: cancel superseded runs

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

When a contributor pushes another commit to the same pull request, GitHub cancels the older run. The newest run is the one that matters for review. Use `cancel-in-progress: false` for deployments that must finish once started.

## What not to do

Do not skip the only security scan because a PR is a draft if your organization requires early feedback. Do not cancel a deployment merely because a newer commit exists unless the deployment system can safely roll forward or roll back.

## How to verify compliance

Open a test pull request, push twice quickly, and observe whether the first run is cancelled. Convert the PR from draft to ready and confirm that the intended jobs start. Record exceptions in the policy register.

## Related files

- [Concurrency policy](../policies/concurrency-policy.md)
- [Node template](../TEMPLATES/optimized-node-ci.yml)
- [Docker template](../TEMPLATES/optimized-docker-ci.yml)

