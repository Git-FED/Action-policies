# Releases, Packages, and Workflow Artifacts

> **TL;DR:** End users need a stable release surface; developers need fast, inspectable feedback. GitHub releases, package registries, and workflow artifacts serve different lifetimes and audiences.
>
> Confusing them creates unnecessary storage, awkward downloads, and workflows that run on events nobody needs.

## Workflow artifacts

Artifacts are attached to a workflow run. They are excellent for short-lived test reports, screenshots, logs, and diagnostic bundles. They are not the right default for public distribution because retention, discoverability, and permissions follow the workflow run. Keep them brief and name them so a reviewer can understand their purpose.

## Releases

A release is a human-facing versioned record. Use release assets for binaries, installers, signed archives, and source bundles that end users should find later. A release workflow should be deliberate, permission-limited, protected from untrusted pull-request input, and reproducible from a tag.

## Packages

A package registry is for developers and automation consuming a versioned library, container, or module. Use it when installation and dependency resolution are part of the product promise. Define versioning, provenance, permissions, and rollback expectations before enabling publication.

## Common mistakes

- publishing on every branch instead of on a deliberate release event;
- uploading the same build as both an artifact and a release asset without purpose;
- placing credentials in a workflow that runs on forked pull requests;
- using long artifact retention as an archive strategy;
- enabling npm, PyPI, or Docker workflows in a repository that does not ship those products;
- creating several release workflows that can publish the same tag concurrently.

## Decision table

| Question | Use an artifact | Use a release | Use a package |
| --- | --- | --- | --- |
| Consumer | Maintainers | End users | Developers or services |
| Lifetime | Hours or days | Version lifetime | Until deprecated |
| Trigger | Test run | Tag or approval | Version publish |
| Primary concern | Diagnosis | Discoverability and trust | Installation and compatibility |

## How to verify compliance

Name the audience, lifetime, and owner for every output. Choose the smallest service that matches: artifact for diagnosis, release for end users, package registry for developers. Confirm that publication cannot happen from an untrusted event.

## Related files

- [Artifact retention](artifact-retention.md)
- [Optimized release template](../TEMPLATES/optimized-release.yml)
- [Security disclosure policy](../policies/security-disclosure.md)
