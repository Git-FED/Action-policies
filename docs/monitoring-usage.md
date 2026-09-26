# Weekly Actions Usage Monitoring

> **TL;DR:** Review Actions usage once a week before it becomes an outage. Start at the organization billing dashboard, then use the GitHub CLI to identify repositories and workflows that deserve attention.
>
> A useful report does not merely say “we are high.” It names the trend, the top consumers, the likely cause, and the smallest corrective action.

## Dashboard review

Open **Organization Settings → Billing and plans → Actions**. Record included minutes, paid minutes, storage, and the spending-limit behavior. Compare the current period with the previous period rather than reacting to one noisy day.

Use thresholds as conversation starters, not as universal laws. A small organization may investigate at 50% of included usage; a busy organization may need daily review after 70%. The important part is that the owner agrees on the thresholds before an incident.

Suggested internal thresholds:

- **50%:** confirm the trend and check for an unusual matrix or schedule.
- **70%:** open a maintenance task and inspect the top repositories.
- **85%:** freeze nonessential scheduled jobs and optimize the largest consumers.
- **95%:** treat remaining minutes as incident budget and communicate the risk.

## CLI inspection

With GitHub CLI authenticated and the appropriate organization permission, the Actions billing endpoint can be queried like this:

```bash
gh api /orgs/{org}/settings/billing/actions
```

Replace `{org}` with the organization name. The response schema and permissions can change, so treat an API error as a prompt to consult current GitHub documentation rather than weakening authentication.

For a local repository, the included read-only audit script can inspect workflow files across repositories:

```bash
bash scripts/audit-org-usage.sh FED-OS
```

The script reports workflow patterns; it does not claim to reproduce GitHub&apos;s billing calculation and it does not delete anything.

## What to investigate first

1. Recent increases in runs per pull request.
2. Matrices that test versions no longer supported.
3. Scheduled jobs that have no recent consumer.
4. Artifacts retained longer than the project needs.
5. Workflows that run on both `push` and `pull_request` for the same commit.
6. Duplicate live workflows introduced during a migration.

## How to verify compliance

Save the weekly report with the date, dashboard snapshot or exported values, top consumers, and chosen actions. Follow up the next week. If the number falls, document which change helped; if it rises, escalate before the quota becomes the first signal.

## Related files

- [Quota policy](quota-policy.md)
- [Incident response](incident-response.md)
- [Cost optimization](cost-optimization.md)
- [Organization audit script](../scripts/audit-org-usage.sh)

