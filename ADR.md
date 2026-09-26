# Architecture Decision Record Index

This file is the index for decisions that shape the repository. An ADR should record the context, decision, alternatives, consequences, and review trigger. It should explain why the project looks the way it does, not merely document what files happen to exist.

## ADR-001: Static HTML as the site runtime

**Status:** Accepted  
**Decision:** Keep the public site as HTML, CSS, and small progressive-enhancement scripts.  
**Reason:** The site needs dependable GitHub Pages and Cloudflare Pages deployment, crawlable routes, easy ZIP inspection, and low build cost. A framework would be justified only when it solves a demonstrated problem.

**Consequences:** Every route has a real HTML file. Shared visual behavior lives in CSS and small JavaScript modules. Content changes can be reviewed without a client-side router.

## ADR-002: One generated deployment directory

**Status:** Accepted  
**Decision:** Build a clean `dist/` directory from `site/` and deploy that same output to both hosts.  
**Reason:** Separate host-specific source trees drift. A clean copy prevents stale files from surviving a deployment.

**Review trigger:** Reconsider if a host requires materially different output or the site adopts a real compile step.

## ADR-003: Age-gated payment embeds

**Status:** Accepted  
**Decision:** Keep external payment embeds behind a self-declared local browser confirmation.  
**Reason:** The support pages should create an explicit pause before payment content while remaining honest that the mechanism is not identity verification or KYC.

## ADR-004: Provider code loads progressively

**Status:** Accepted  
**Decision:** Load PayPal and Ko-fi after gated content becomes visible and load Stripe when its tab opens.  
**Reason:** This reduces initial page work, keeps ordinary documentation independent from payment providers, and narrows the page on which third-party scripts execute.

## How to add a new ADR

Use a numbered heading, state the status, record the alternatives, and explain what evidence would cause the decision to change. Link the implementation files and update the README or relevant guide when the decision affects contributors.
