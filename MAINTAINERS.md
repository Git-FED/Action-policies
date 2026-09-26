# Maintainers Guide

Maintainers protect the project's purpose: make GitHub Actions usage easier to understand and harder to waste. They are responsible for keeping the policy accurate, the examples runnable, the site accessible, and the public support pages honest about third-party services.

## Review responsibilities

Review workflow permissions, trigger scope, timeouts, artifact retention, runner selection, and deployment changes. Review CSP changes, payment embeds, age-confirmation wording, external links, and claims about current GitHub or Cloudflare behavior.

Prefer a smaller, verifiable change over a broad refactor. If a change adds a scheduled job, matrix, provider, or external dependency, ask who owns it, what it costs, what data it can access, and how it can be removed.

## Site stewardship

Every new route needs a real HTML file, a navigation or index entry where appropriate, a sitemap entry, and local-link validation. Every new provider needs a privacy and CSP review. Support content must remain behind age confirmation and must offer a readable fallback if a provider fails.

## Release responsibility

Before publishing, run Bash syntax checks, build the static site, validate HTML, inspect internal links, check JavaScript syntax, and inspect the generated `dist/` directory. GitHub Pages and Cloudflare Pages must receive the same build output. Record meaningful user-facing changes in [CHANGELOG.md](CHANGELOG.md).

## Fair review

Explain decisions and evidence. Do not block a contribution because it does not match an undocumented preference. Make room for accessibility, documentation, design, security, and operational contributions. Security concerns belong under [SECURITY.md](SECURITY.md); conduct concerns belong under [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
