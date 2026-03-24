# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page marketing website for **Trail des Awirs 2026**, a trail running event on August 22, 2026 in Flémalle, Belgium. Single file: `trail_des_awirs/trail-des-awirs.html`.

## Local Development

No build tools or package managers. Serve with any static HTTP server:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/trail_des_awirs/trail-des-awirs.html`. A VS Code launch config (`.vscode/launch.json`) is pre-configured to open Chrome at `http://localhost:8080`.

## Architecture

Everything lives in a single HTML file with inline `<style>` and no JavaScript. The page is structured as:

1. **Nav** — fixed header with anchor links (`#parcours`, `#horaires`)
2. **Hero** — event title, CTA buttons, stats, SVG topographic background
3. **Parcours** — 3-column grid of trail cards (6 km, 12 km, 21 km)
4. **Horaires** — race schedule timeline
5. **Inscription CTA** — links to external registration at otopservices.be
6. **Footer**

## Design System

CSS variables defined in `:root`:
- `--vert` (`#0f2d17`) — dark green, primary background
- `--creme` (`#f0e8d5`) — cream, primary text
- `--orange` (`#e8703a`) — accent/CTA color

Fonts: **Bebas Neue** (headings), **DM Sans** (body), loaded from Google Fonts. Mobile breakpoint at `900px`.
