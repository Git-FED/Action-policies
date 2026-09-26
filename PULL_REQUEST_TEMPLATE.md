# Pull Request Template

## Summary

Describe the user problem and the smallest change that solves it. Link the policy, route, workflow, or issue that provides context.

## Change classification

- [ ] Policy or documentation
- [ ] Workflow or script
- [ ] Static HTML/CSS/JavaScript
- [ ] Support provider or payment embed
- [ ] Deployment configuration

## Operational impact

- Expected Actions-minute impact:
- Expected storage impact:
- New schedules, matrices, runners, providers, or secrets:
- Rollback plan:

## Site and security review

- [ ] Every new route has a real HTML file.
- [ ] Every redirect has an HTML fallback.
- [ ] Payment content remains behind age confirmation.
- [ ] CSP was updated only with required provider domains.
- [ ] No private keys, tokens, or credentials are committed.
- [ ] Reduced-motion and keyboard behavior remain usable.

## Verification

- [ ] `bash scripts/find-long-retention.sh .`
- [ ] `bash scripts/find-missing-concurrency.sh .`
- [ ] `bash scripts/build-site.sh .`
- [ ] `bash scripts/validate-html.sh dist`
- [ ] Local route/link audit
