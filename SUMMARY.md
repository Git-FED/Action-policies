# Project Summary

Actions Budget Policy is a practical repository for teams that need to reduce wasted GitHub Actions work without weakening useful checks. It combines policy, templates, scripts, documentation, and a static reference site.

## The problem

Actions usage is shared, and ordinary workflow decisions can compound: duplicate push and pull-request runs, wide matrices, unbounded jobs, long artifact retention, draft pull requests, and unowned schedules. The result is a frozen pipeline or a billing surprise that arrives before the team has a mitigation plan.

## The response

The repository makes five controls visible and repeatable: narrow triggers, concurrency cancellation, short retention, bounded jobs, and deliberate runner selection. It documents the reasoning so contributors can adapt the examples instead of blindly copying them.

## The site

The static site is intentionally framework-light. It uses an aurora visual system, glass panels, animated workflow imagery, progressive enhancement, reduced-motion support, and a structured support hub. Every public route is a real HTML file, and every legacy redirect has an HTML fallback.

## The deployment

A clean `dist/` directory is built from `site/` and deployed to GitHub Pages and Cloudflare Pages. The two hosts consume the same output. Cloudflare-specific guidance distinguishes plain HTML, Worker projects, and framework-generated output so a future contributor does not configure Hugo or a Worker runtime without a real reason.

## The support boundary

PayPal, GitHub Sponsors, Ko-fi, Buy Me a Coffee, NOWPayments, and Stripe appear only on the age-gated support pages. Public client identifiers may be visible where providers require them; private secrets never belong in the repository.
