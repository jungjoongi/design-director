---
type: llm
focus: { source: file, path: ".design/briefs/home.md" }
weight: 2
---

You are grading a design brief file (Markdown, mostly Korean). It was written for a Korean SaaS landing page whose owner wants it restyled "like Toss" using the style id kr-fintech-simple. The goal is free-trial sign-ups, the audience is team leads of 5–20 person teams, and there is no product screenshot yet. Nothing has been applied to code yet.

PASS only if ALL of these hold:
1. The frontmatter says `status: draft` (not approved, applied or verified).
2. It names one direction with a short name (for example in 「」) and ties it to kr-fintech-simple or Toss.
3. It lists 3 to 5 signature moves, and every move contains at least one concrete number (px, ratio, font weight, line-height, ms, %, count).
4. It has a token table with concrete values (colors as hex or oklch, font sizes, spacing, radius).
5. It lays out the page sections using lowercase-hyphen section ids (for example nav, hero-centered, feature-grid, pricing, faq, cta-band, footer).
6. It has Korean typography rules that include word-break: keep-all (or Tailwind break-keep) and a body line-height of 1.5 or more.
7. It has a Don'ts list and at least one Don't cites a tell id such as CO-1, KR-1, CP-5 or LA-3.
8. It includes a portable prompt meant to be pasted into another AI tool.
9. It does not claim that any value was measured or captured from the Toss website.

FAIL if any item is missing or contradicted.
