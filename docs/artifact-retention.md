# Artifact Retention Without Accidental Storage Debt

> **TL;DR:** Artifacts are workflow outputs, not an archive. Set a short retention period for diagnostic output and move anything that must survive a release into a deliberate release or storage process.
>
> Explicit retention makes the intent visible in code and allows automated review to catch drift.

## The expensive default

A workflow that omits `retention-days` inherits a platform default that may be far longer than the useful life of a pull-request report. When that workflow runs frequently, the storage footprint grows even if each individual artifact looks harmless. Old artifacts also make incident diagnosis harder because current evidence is buried under stale runs.

## Per-step configuration

Set the value on every upload step:

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: test-results
    path: test-results/
    retention-days: 1
    if-no-files-found: ignore
```

Keep artifact names unique enough to be understandable but not so dynamic that they become impossible to search. The run ID is usually available from the Actions interface, so a stable artifact name per job is often sufficient.

## What belongs elsewhere

Release packages should become release assets, package registry entries, or an explicitly managed storage object. Long-term compliance evidence needs an owner, access policy, and retention rationale. A pull-request screenshot normally needs neither.

## Bulk cleanup

Use the GitHub CLI or API only after confirming the target repository and artifact set. A cleanup script should start in dry-run mode, print IDs before deletion, and require an explicit deletion flag. Do not delete artifacts belonging to an active incident or release without the owner agreeing.

## How to verify compliance

Run `bash scripts/find-long-retention.sh .`. Review both the retention value and the path being uploaded. A three-day retention period does not make a secret-bearing artifact acceptable; sensitive output should not be uploaded at all.

## Related files

- [Retention policy](../policies/retention-policy.md)
- [Cost optimization](cost-optimization.md)
- [Incident response](incident-response.md)

