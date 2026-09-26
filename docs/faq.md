# Frequently Asked Questions

> **TL;DR:** The safest Actions budget is the work you do not schedule. Use current GitHub documentation for exact plan limits, then apply narrow triggers, cancellation, caching, and short retention.
>
> This FAQ explains the operational choices in this repository; it is not a substitute for your organization&apos;s billing settings.

## Do public repositories have limits?

Public repositories often receive different treatment from private repositories, but the exact limits depend on the feature, runner, storage, and current GitHub policy. Check official documentation rather than assuming “public” means unlimited for every resource.

## What counts as a minute?

Runner consumption is measured by execution time and can be affected by runner type and plan rules. This repository uses minutes as a budgeting unit, not as a billing promise.

## Do macOS runners cost more?

They commonly have different multipliers or pricing treatment than Linux. Verify current rates before choosing them for convenience.

## Can I schedule jobs to off-peak hours?

Scheduling can reduce contention but does not necessarily remove consumption. Use schedules only when the report or maintenance action is valuable and give it an owner.

## Should every workflow use concurrency?

Most pull-request validation should. Deployments and independent diagnostic runs need a case-by-case decision.

## Is three-day retention mandatory for every artifact?

It is the default in this repository. A documented exception may be appropriate for release or compliance evidence.

## Why skip draft pull requests?

Drafts are intentionally unfinished and often change rapidly. Skipping expensive jobs prevents repeated work before the contributor is asking for full review.

## Are caches free?

No resource is free from an operational perspective. Caches consume storage and take time to restore and save. Keep them only when hit rates justify them.

## Why not run on every push and pull request?

The same commit can trigger duplicate work. Choose the event that best answers the question and use path filters.

## Is self-hosted always cheaper?

No. It can introduce maintenance, idle capacity, security, and outage costs. Compare the complete operating model.

## Should I use a six-version matrix?

Only if the support promise requires it. A narrow pull-request matrix plus a deliberate full matrix is often more efficient.

## What should be a release asset?

A versioned file intended for end users: an installer, binary, archive, or signed bundle. A test log belongs in an artifact.

## How do I find long retention locally?

Run `bash scripts/find-long-retention.sh .`.

## How do I find missing concurrency?

Run `bash scripts/find-missing-concurrency.sh .`.

## Does this repository change billing settings?

No. The audit tools are read-only unless a separate, explicitly destructive command is added and approved.

## Where do I report a security issue?

Use the private process in [SECURITY.md](../SECURITY.md), not a public issue.

