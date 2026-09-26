# Artifact Retention Policy

> **TL;DR:** The repository default is short-lived evidence: retain workflow artifacts for one to three days, then delete or replace them. If an artifact must survive a release, publish it as a release asset or move it to an intentional long-term store.
>
> “It might be useful someday” is not an adequate reason to pay storage and make the Actions interface harder to operate.

## Default rules

- Every upload step declares `retention-days` explicitly.
- The default maximum is **3 days**.
- Temporary test output should use **1 day** when the team can still diagnose failures.
- Release-adjacent evidence may use a documented exception, but it should not be uploaded on every pull request.
- Empty paths should be ignored instead of creating misleading artifacts.
- Secret-bearing output must never be uploaded.

Example:

```yaml
- name: Upload coverage
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: coverage-${{ github.run_id }}
    path: coverage/
    retention-days: 1
    if-no-files-found: ignore
```

## Why the default matters

Retention has two costs. First, stored bytes remain part of the organization&apos;s Actions storage footprint. Second, old artifacts make it difficult to find the one attached to a current failure. A small artifact uploaded by a high-frequency workflow can outlive the code that produced it many times over.

Do not confuse cache retention with artifact retention. Caches are managed by GitHub&apos;s cache service and have their own eviction rules; artifacts are explicit workflow outputs. Both should be reviewed, but they are not interchangeable.

## Exceptions

An exception belongs in `policies/exceptions.md` and must include a sunset date. A release bundle, compliance report, or customer handoff may justify longer retention. A normal test report usually does not.

## Verification

Run `bash scripts/find-long-retention.sh .` before opening a pull request. The policy workflow repeats the check for every YAML workflow in `.github/workflows/`.

