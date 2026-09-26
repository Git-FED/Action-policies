# Installation and Local Use

This repository is designed to work with standard Linux or macOS shell tools. No Node package installation is required for the static site build. GitHub CLI is optional and is needed only for the organization audit.

## Requirements

- Git
- Bash
- Python 3 for any custom inspection scripts
- `zip` and `unzip` for packaging
- GitHub CLI (`gh`) for `scripts/audit-org-usage.sh`

Node.js is useful for checking JavaScript syntax with `node --check`, but it is not needed to render the static HTML site.

## Clone and inspect

```bash
git clone https://github.com/FED-OS/actions-budget-policy.git
cd actions-budget-policy
bash scripts/build-site.sh .
bash scripts/validate-html.sh dist
```

Open `dist/index.html` directly for a basic local check, or serve the directory through a local static server when testing absolute routes such as `/docs/`:

```bash
python3 -m http.server 8080 --directory dist
```

Then open `http://localhost:8080/`.

## Optional GitHub CLI setup

Authenticate with the smallest scope needed to read the repositories you are authorized to audit. Then run:

```bash
gh auth status
bash scripts/audit-org-usage.sh FED-OS
```

The audit script is read-only. It does not change workflows, billing, artifacts, or repository settings.

## Support-page testing

Use a clean browser profile to test the age confirmation. Confirm that ordinary documentation does not load payment scripts, that declining keeps payment content hidden, that tabs are keyboard reachable, and that a provider failure leaves a useful text link. Never test with real payment information in a development environment.

## Troubleshooting

If absolute routes fail when opening a file directly, use the local HTTP server. If Cloudflare or GitHub Pages shows an old route, rebuild `dist/` and compare the generated files. If a provider is unavailable, check CSP and the provider's own status before changing the site security policy.
