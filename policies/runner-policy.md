# Runner Selection Policy

> **TL;DR:** Choose the smallest runner class that can prove the behavior you promise. The default is a hosted Linux runner; platform-specific runners and self-hosted infrastructure require a concrete reason.
>
> Runner selection affects cost, maintenance, security, queueing, and reproducibility. It is not merely a performance knob.

## Hosted Linux first

Use `ubuntu-latest` for portable builds, documentation, linting, packaging checks, and most integration tests. Pinning an older image should be temporary and tracked because image updates include security and toolchain changes. Keep the toolchain declared in the repository rather than relying on undocumented runner state.

## Platform-specific jobs

Use Windows or macOS only when the product supports behavior that cannot be validated on Linux. Keep the platform job narrow instead of repeating the entire suite three times. A matrix must match a supported-version promise, not a desire to test every version ever installed.

## Self-hosted runners

A self-hosted runner may be justified for a private network, specialized hardware, licensed software, unusual operating systems, or predictable high-volume workloads with an operating owner. It introduces patching, isolation, credential, physical-access, data-erasure, and incident-response responsibilities.

Never register a personal workstation as an organization runner for untrusted pull requests. Do not allow a runner with production network access to execute arbitrary fork code. Use runner groups, strict labels, ephemeral instances where practical, and a documented teardown process. Treat registration tokens as secrets.

## Approval record

A request must name the workload, required labels, owner, network boundary, secret policy, expected utilization, fallback runner, and removal procedure. Explain the concrete hosted-runner limitation. “It was faster once” is not enough. Verify current GitHub pricing and billing documentation before making a cost claim.

## Verification

Before approval, run the workload on a hosted Linux runner and document the failure. After approval, test that untrusted pull requests cannot reach the runner group, that workspaces are cleaned, and that the owner can remove the runner quickly. Revisit the decision quarterly.

See [self-hosted-runners.md](../docs/self-hosted-runners.md) for the operator guide.
