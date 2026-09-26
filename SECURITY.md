# Security Policy

This repository contains workflow automation, shell scripts, documentation, and a static website. It is intentionally designed to be readable and auditable, but no repository should be treated as safe merely because its files are public.

## Supported versions

| Version | Supported |
| --- | --- |
| 0.1.x | Yes |
| Older releases | No |

Security fixes may be backported only when doing so is practical and does not create a second unsupported maintenance line.

## Reporting a vulnerability

Please do **not** open a public GitHub issue for a suspected vulnerability. Send a report to **security@fedpromptly.com** with the subject `Private security report — actions-budget-policy`.

Include as much of the following as possible:

- the affected file, workflow, route, or script;
- a concise description of the security impact;
- reproducible steps or a minimal proof of concept;
- the permissions, secrets, or assumptions required to reproduce it;
- whether the issue affects forks, pull requests from untrusted contributors, deployments, or only local use;
- a suggested mitigation, if you have one.

Do not include real credentials in the report. Redact tokens, payment keys, customer information, and private repository names. PGP encryption is welcome; a public key will be added to this document when one is published.

## Response timeline

We aim to acknowledge a report within **72 hours**, complete initial triage within **seven days**, and ship or communicate a mitigation for a high-severity issue within **30 days**. These are targets rather than guarantees; complexity, coordinated disclosure, and upstream fixes may change the schedule.

We will keep the reporter informed when the assessment changes. If the issue is accepted, we will coordinate a disclosure date that gives affected users enough time to update.

## Scope

In scope:

- workflow permissions, injection risks, unsafe expressions, and untrusted pull-request handling;
- shell scripts that can delete artifacts or expose repository data;
- static-site JavaScript, security headers, redirect behavior, and accidental secret exposure;
- dependency or action-version issues introduced directly by this repository.

Out of scope:

- vulnerabilities in GitHub&apos;s platform or billing systems, which should be reported to GitHub;
- third-party payment processors, which should be reported to PayPal, Stripe, Ko-fi, Buy Me a Coffee, or NOWPayments as appropriate;
- availability issues caused by an external hosting provider;
- intentional policy decisions that are documented and visible to users.

## Safe harbor

We will not pursue legal action against a researcher who makes a good-faith effort to avoid privacy violations, service disruption, data destruction, and unnecessary access to systems; reports the issue privately; and gives us a reasonable opportunity to respond. Testing must remain limited to accounts, repositories, and environments you are authorized to test.

