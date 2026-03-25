# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page marketing website for **Trail des Awirs 2026**, a trail running event on August 22, 2026 in Flémalle, Belgium. Bilingual (FR/NL).

## Local Development

No build tools or package managers. Node.js is available — serve with :

```bash
npx serve . -p 8080
```

Then open `http://localhost:8080/trail_des_awirs/trail-des-awirs.html`. A VS Code launch config (`.vscode/launch.json`) is pre-configured to open Chrome at `http://localhost:8080`.

## File Structure

```
trail_des_awirs/
├── trail-des-awirs.html   — HTML structure only
├── style.css              — all styles
└── translations.js        — all FR/NL strings + language switching logic
```

## Architecture

Mobile-first CSS (`style.css`), desktop enhancements via `@media (min-width: 900px)`.

Page sections:
1. **Nav** — fixed header with anchor links (`#parcours`, `#horaires`) + FR/NL toggle button
2. **Hero** — event title, CTA buttons, stats, SVG topographic background
3. **Parcours** — 3-column grid of trail cards (6 km, 12 km, 21 km)
4. **Horaires** — race schedule timeline
5. **Inscription CTA** — links to external registration at otopservices.be
6. **Footer**

## Internationalisation

All translatable elements use `data-i18n="key"`. Translations live in `translations.js` as a `translations` object with `fr` and `nl` keys. `setLang(lang)` swaps all `innerHTML` values and persists the choice in `localStorage`.

To add or edit a text, only `translations.js` needs to be touched.

## Design System

CSS variables defined in `:root` in `style.css`:
- `--vert` (`#0f2d17`) — dark green, primary background
- `--creme` (`#f0e8d5`) — cream, primary text
- `--orange` (`#e8703a`) — accent/CTA color

Fonts: **Bebas Neue** (headings), **DM Sans** (body), loaded from Google Fonts. Mobile breakpoint at `900px`.
