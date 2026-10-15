# design-director

**A design director for people who build without a designer or a product planner.** A Claude Code plugin.

Ask an AI to "make it prettier" or "more modern" and it falls back to the most common answer: purple gradients,
identical rounded cards, emoji icons. Ask for "Swiss style, 12-column grid, 64px headline at -2% tracking, accent
color only on the CTA" and the result changes completely. This plugin closes that gap. It breaks a reference you
like down into a measurable design language, plans and directs your screen with it, applies it to your code only
after you approve the brief, and verifies the result with screenshots.

The skill instructions are written in Korean first (with English design terms); output follows your language.

![before / after](docs/images/before-after-desktop.jpg)

A deliberately "AI-looking" test landing page for a fictional product, after three messages: "make it prettier, it
looks AI-made" → "B" → "apply". Diagnosis score 57 → 91, decisive AI-default tells (S1) 11 → 0, invented stats and
logos removed. Code changed only after the brief was approved.

## Install

```
/plugin marketplace add jungjoongi/design-director
/plugin install design-director@design-director
```

Requires Node.js 20+ and Chrome, Edge, Brave or Chromium for live captures. Nothing else to install.

## Skills

| Skill | What it does | Output |
|---|---|---|
| `/design-director:ref` | Analyzes a URL, screenshot, or style/brand name into a design language: signature moves, measured tokens, page anatomy | `.design/references/<slug>/profile.md` |
| `/design-director:direct` | Plans the page, proposes named directions, writes a design brief, applies it after approval, verifies with before/after screenshots | `.design/briefs/<page>.md`, code changes, verification shots |

Examples:

- `break down what makes stripe.com feel so polished — actual values, not vibes`
- `restyle our landing like linear.app — dark and precise, but NOT the purple gradient thing`
- `make our pricing page look more premium; right now it's stock shadcn`

## Principles

- Brief first: nothing outside `.design/` changes before you approve.
- No copying: logos, illustrations, photos, copy and paid fonts stay with their owners; proportions, rhythm and tokens transfer.
- No bypassing bot walls or logins; screenshots are used instead, and every value is tagged measured / estimated / derived / catalog.
- Third-party screenshots stay local (`.design/.gitignore`).

## Development

```bash
npm test
claude --plugin-dir plugins/design-director
```

See [docs/architecture.md](docs/architecture.md) and [CLAUDE.md](CLAUDE.md).

## License

MIT
