# Policy Exceptions Register

> **TL;DR:** An exception is a controlled, temporary deviation from a default rule. It must have an owner, a reason, a compensating control, and an expiration date.
>
> If an exception becomes permanent, update the policy and templates instead of leaving a stale loophole in this register.

## Why a register exists

Teams sometimes need longer-lived release evidence, a platform matrix, a private-network runner, or a schedule that is more frequent than the normal policy permits. Banning every exception creates shadow automation; allowing undocumented exceptions creates invisible cost and security debt. A public register makes the tradeoff reviewable.

## Required fields

Every entry must include the repository and workflow, owner and approving reviewer, exact rule being waived, reason the default is insufficient, expected runner-minute and storage impact, compensating controls, start date, expiration date, removal condition, and a link to the decision record.

Use this structure:

```text
Repository: organization/repository
Workflow: .github/workflows/release.yml
Rule: artifact retention above three days
Owner: named team or maintainer
Approver: reviewer or operations group
Reason: release evidence must remain available through acceptance
Impact: one artifact per release, approximately 200 MB
Controls: manual dispatch, protected environment, no secrets
Starts: YYYY-MM-DD
Expires: YYYY-MM-DD
Removal condition: move evidence to release assets
Decision: link to approving pull request
```

## Active exceptions

_No active exceptions are recorded._

## Expired exceptions

_No expired exceptions are recorded._

## Review procedure

Maintainers review this register monthly and during the weekly quota review. An expired exception is removed or renewed with a fresh reason and date. A workflow that relies on an exception not present here should fail review rather than silently inherit a long-lived allowance.

Exceptions do not bypass security requirements. A longer artifact lifetime does not justify uploading secrets, and a self-hosted runner exception does not permit untrusted code to reach sensitive networks.
