# Governance

Actions Budget Policy is maintained by FED-OS / FedPromptly with community input. Governance is intentionally lightweight: decisions should be explainable, changes should be reviewable, and the repository should remain useful to contributors who are not part of the core team.

## Roles

**Maintainers** review changes, protect the scope, manage releases, and keep provider and platform claims current. **Contributors** propose changes, provide evidence, and respond to review. **Community participants** ask questions, test examples, and report defects without needing commit access.

## Decision process

Small documentation fixes and low-risk styling changes may be merged after one maintainer review. Workflow permission changes, payment-provider changes, deployment changes, security fixes, and policy exceptions require a maintainer who understands the operational impact. Large architectural changes should have an ADR or a discussion link.

When evidence conflicts, prefer the current official provider documentation and a reproducible local test. If uncertainty remains, document it explicitly and choose the safer reversible option.

## Releases

Releases are prepared from reviewed commits on `main`. The maintainer runs the build, HTML checks, route audit, JavaScript syntax checks, and archive integrity test. The changelog records meaningful user-facing changes.

## Conflicts and appeals

A contributor may ask for the reasoning behind a decision and may propose a narrower alternative. Maintainers should answer with evidence and can invite a second maintainer or community review when a decision affects security, money, or public behavior.

## Conduct and security

Participation follows [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Vulnerabilities follow [SECURITY.md](SECURITY.md) and must not be disclosed in a public issue.
