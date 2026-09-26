# Self-Hosted Runners: A Deliberate Decision

> **TL;DR:** Self-hosted runners can solve real hardware, network, or licensing constraints, but they exchange hosted-runner convenience for security and maintenance responsibility. Do not assume they are automatically cheaper.
>
> Verify current pricing and billing treatment at [GitHub billing documentation](https://docs.github.com/billing) before publishing a cost claim or approving a migration.

## Why teams consider them

A self-hosted runner may be justified for a private network, specialized hardware, licensed software, a custom operating system, or a high-volume workload with a team that can operate the fleet. The requirement should be specific enough that a hosted runner cannot satisfy it after ordinary optimization.

## Threat model

A runner executes repository code. If an attacker can influence that code, they may attempt to read environment variables, inspect the workspace, access the network, persist between jobs, or abuse a mounted Docker socket. The risk is higher for fork pull requests and repositories where many teams can edit workflows.

Never run untrusted fork code on a runner with long-lived credentials, production network access, or data from other repositories. Use isolated groups, strict labels, ephemeral instances where practical, and a patch and teardown process. A personal laptop is not an organization runner strategy.

## Cost and operations

Compare hardware or hosting, patching, monitoring, capacity planning, idle time, incident response, replacement, and the opportunity cost of maintaining the fleet. A runner that is offline during a release is not cheaper if it delays the team. Do not make a platform-fee claim from memory; check official documentation and record the review date.

## Approval record

A request should name the workload, labels, owner, network boundary, secret policy, expected utilization, fallback runner, and removal date. Record the decision in [exceptions.md](../policies/exceptions.md) when it changes normal policy.

## Verification

Before approval, run the workload on hosted Linux and document the failure. After approval, test that untrusted pull requests cannot reach the runner group, the workspace is cleaned after failure, and the runner can be removed without losing an audit trail.

## Related files

- [Runner policy](../policies/runner-policy.md)
- [Quota policy](quota-policy.md)
- [Official billing documentation](https://docs.github.com/billing)
