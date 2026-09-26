# Security Disclosure Policy

> **TL;DR:** Workflow files execute with repository permissions, shell scripts can call APIs, and static pages can load third-party payment code. Security review therefore focuses on trust boundaries rather than only on dependency versions.
>
> Report suspected vulnerabilities privately, minimize access during testing, and never place real credentials in an issue, example, workflow, or site asset.

## Scope

This policy covers workflow files, shell scripts, configuration, static HTML, CSS, JavaScript, headers, redirects, and documentation examples maintained in this repository. It also covers unsafe instructions that could cause a contributor to expose a token, grant excessive permissions, or execute untrusted pull-request data.

It does not replace the policies of GitHub, Cloudflare, or payment processors. Platform vulnerabilities and processor vulnerabilities should be reported through their own channels.

## Workflow trust boundaries

Pull requests from forks and issue-controlled values are untrusted input. Do not interpolate branch names, commit messages, issue titles, or generated filenames directly into shell commands. Quote variables, use fixed working directories, and keep pull-request permissions read-only wherever possible.

Do not use `pull_request_target` merely to obtain secrets for code that a contributor can modify. Begin with:

```yaml
permissions:
  contents: read
```

Add only the permission required by the specific job. A workflow with write access or a secret must have a clear reason, a narrow trigger, and a reviewer who understands the consequence.

## Script and site safety

Scripts that call the GitHub API must identify their required authentication and scope. Audit scripts are read-only by default. Cleanup operations must print what they would change and require an explicit destructive flag. Never accept an organization name as a substitute for authorization.

A change to `site/_headers`, `site/_redirects`, external script sources, payment embeds, or HTML forms requires review. Public publishable identifiers may appear client-side when the provider expects them there; private keys, bearer tokens, and webhook secrets must never appear in HTML, JavaScript, CSS, or generated assets.

## Reporting and response

Do not open a public issue for a suspected vulnerability. Email **security@fedpromptly.com** with the affected file, impact, reproduction steps, required permissions, and a suggested mitigation. Redact tokens, payment details, personal information, and private repository names. PGP encryption is welcome when a project key is published.

We aim to acknowledge reports within 72 hours, triage within seven days, and publish a fix or mitigation for high-severity issues within 30 days. These are targets and may change when an upstream provider must coordinate the response.

## Safe harbor

We will not pursue legal action against good-faith research that avoids privacy violations, service disruption, data destruction, and unnecessary access; reports privately; and gives maintainers a reasonable opportunity to respond. Test only accounts, repositories, and environments you are authorized to test.

## Verification checklist

Review permissions, quote shell variables, search for credential-like strings, inspect external scripts, validate CSP changes, and run HTML checks before merge. Security is a release requirement, not an optional polish pass.

See [SECURITY.md](../SECURITY.md) for the public reporting process.
