# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Profil développeur

L'utilisateur est **grand débutant en développement web**. En conséquence :

- **Toujours expliquer clairement** ce que tu fais techniquement, en français, avant et après chaque modification.
- **Commenter tout le code** produit ou modifié : chaque bloc HTML, chaque règle CSS, chaque fonction JavaScript doit avoir un commentaire qui explique son rôle en termes simples.
- **Éviter le jargon** sans définition : si un terme technique est inévitable, l'expliquer brièvement.
- **Décrire l'impact visuel ou fonctionnel** de chaque changement, pas seulement la mécanique du code.

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
├── translations.js        — all FR/NL strings + language switching logic
├── img/                   — photos (ex: equipe.jpg à fournir)
└── gpx/                   — fichiers GPX des 3 parcours (à fournir)
```

## Architecture

Mobile-first CSS (`style.css`), desktop enhancements via `@media (min-width: 900px)`.

Page sections (dans l'ordre dans le HTML) :
1. **Nav** — header fixe avec liens d'ancrage (`#parcours`, `#horaires`) + bouton FR/NL
2. **Hero** (`.hero`) — titre, boutons CTA, stats (desktop only), fond SVG topographique
3. **Parcours** (`#parcours`, `background: --vert-mid`) — grille 3 cartes (6 km, 12 km, 21 km)
4. **Horaires** (`#horaires`, `background: --vert`) — timeline de la journée
5. **Équipe** (`#equipe`, `background: --vert`) — présentation Inkipit, photo, réseaux sociaux
6. **Inscription CTA** (`#inscription`, `background: --orange`) — lien vers otopservices.be
7. **Footer** (`background: #070f09`)

## Internationalisation

All translatable elements use `data-i18n="key"`. Translations live in `translations.js` as a `translations` object with `fr` and `nl` keys. `setLang(lang)` swaps all `innerHTML` values and persists the choice in `localStorage`.

- `toggleLang()` — bascule entre FR et NL au clic du bouton
- La langue choisie est sauvegardée dans `localStorage` (clé : `trail-lang`)
- Pour ajouter/modifier un texte : **uniquement `translations.js`**, jamais le HTML directement

Namespaces de clés existants : `nav.*`, `hero.*`, `parcours.*`, `stat.*`, `horaires.*`, `inscription.*`, `equipe.*`, `footer.*`

## Design System

CSS variables defined in `:root` in `style.css`:
- `--vert` (`#0f2d17`) — vert foncé, fond principal
- `--vert-mid` (`#1a4224`) — vert moyen, fond section Parcours
- `--vert-clair` (`#2a5c34`) — vert clair, hover des cartes parcours
- `--creme` (`#f0e8d5`) — crème, texte principal
- `--creme-fade` (`rgba(240,232,213,0.08)`) — crème transparent, séparateurs
- `--orange` (`#e8703a`) — accent, CTA, labels de section

Fonts: **Bebas Neue** (headings + grands chiffres), **DM Sans** (body), loaded from Google Fonts. Mobile breakpoint at `900px`.

Composants boutons réutilisables : `.btn-primary` (orange), `.btn-secondary` (lien souligné), `.btn-dark` (vert foncé), `.btn-social` (lien souligné discret).

Fond topographique SVG : classe `.topo-bg` à ajouter dans chaque section (SVG inline encodé en data URI, `position: absolute`, ne bloque pas les clics).
