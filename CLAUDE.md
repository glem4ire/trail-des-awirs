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

Then open `http://localhost:8080/trail_des_awirs/`. A VS Code launch config (`.vscode/launch.json`) is pre-configured to open Chrome at `http://localhost:8080`.

## File Structure

```
trail_des_awirs/
├── index.html             — HTML structure only
├── style.css              — all styles
├── translations.js        — all FR/NL strings + language switching logic
├── gpx.js                 — visualisation GPX (Leaflet + profil SVG)
├── img/
│   ├── background.jpg     — photo hero (forêt floue en mouvement)
│   ├── equipe.jpg         — photo équipe Inkipit
│   └── logo_tda.svg       — logo Trail des Awirs (crème #FFF5DB)
└── gpx/
    ├── Awirs Trail 6km.gpx
    ├── Awirs Trail 12km.gpx
    └── Awirs Trail 21km.gpx
```

## Architecture

Mobile-first CSS (`style.css`), desktop enhancements via `@media (min-width: 900px)`.

Page sections (dans l'ordre dans le HTML) :
1. **Nav** — header fixe, logo SVG à gauche, liens + bouton FR/NL à droite
2. **Hero** (`.hero`) — `background.jpg` + overlay dégradé, titre, boutons CTA, stats (desktop only)
3. **Parcours** (`#parcours`, `background: --vert-mid`) — grille 3 cartes avec visualisation GPX (carte Leaflet + profil SVG)
4. **Horaires** (`#horaires`, `background: --vert`) — timeline de la journée
5. **Équipe** (`#equipe`, `background: --vert-mid`) — photo `equipe.jpg`, texte Inkipit, réseaux sociaux
6. **Inscription CTA** (`#inscription`, `background: --orange`) — boutons désactivés (`data-soon`) jusqu'à ouverture des inscriptions
7. **Footer** (`background: --footer-bg`) — logo, infos, email cliquable

## Internationalisation

All translatable elements use `data-i18n="key"`. Translations live in `translations.js` as a `translations` object with `fr` and `nl` keys. `setLang(lang)` swaps all `innerHTML` values and persists the choice in `localStorage`.

- `toggleLang()` — bascule entre FR et NL au clic du bouton
- La langue choisie est sauvegardée dans `localStorage` (clé : `trail-lang`)
- `setLang()` est **toujours appelé au chargement** (même pour FR) — le HTML ne doit jamais être la source de vérité pour le texte
- Pour ajouter/modifier un texte : **uniquement `translations.js`**, jamais le HTML directement
- `data-i18n-tooltip="clé"` : met à jour l'attribut `data-tooltip` (utilisé pour les tooltips des boutons `data-soon`)

Namespaces de clés existants : `nav.*`, `hero.*`, `parcours.*`, `stat.*`, `horaires.*`, `inscription.*`, `equipe.*`, `footer.*`, `viz.*`

## Liens d'inscription désactivés (`data-soon`)

Les 3 boutons d'inscription sont temporairement désactivés :
- Attribut `data-soon` → bloque le clic (JS) + curseur `not-allowed` + opacité 50%
- Attribut `data-i18n-tooltip="inscription.soon"` → tooltip traduit FR/NL au survol
- Pour **réactiver** : supprimer `data-soon` et `data-i18n-tooltip` des 3 `<a>` dans le HTML

## Visualisation GPX (`gpx.js`)

- `parseGPX(text)` : parse XML → tableau `{lat, lon, ele}`
- `buildMap(divId, pts)` : carte Leaflet, tuiles CartoDB dark, tracé orange
- `buildElevation(divId, pts)` : profil SVG inline, généré à la demande (lazy)
- `setupToggle(i, pts, map)` : bascule carte ↔ profil, `map.invalidateSize()` au retour
- Fichiers GPX dans `gpx/` — si absent, la zone de viz est masquée silencieusement

## Design System

CSS variables defined in `:root` in `style.css`:
- `--vert` (`#0f2d17`) — vert foncé, fond principal
- `--vert-mid` (`#1a4224`) — vert moyen, fond sections Parcours et Équipe
- `--vert-clair` (`#2a5c34`) — vert clair, hover des cartes parcours
- `--creme` (`#f0e8d5`) — crème, texte principal
- `--creme-fade` (`rgba(240,232,213,0.08)`) — crème transparent, numéros décoratifs
- `--creme-07/25/30/45/60/70` — opacités crème pour textes et bordures (ne pas hardcoder rgba)
- `--orange` (`#e8703a`) — accent, CTA, labels de section
- `--footer-bg` (`#070f09`) — fond footer

Fonts: **Bebas Neue** (headings + grands chiffres), **DM Sans** (body), loaded from Google Fonts. Mobile breakpoint at `900px`.

Composants boutons réutilisables : `.btn-primary` (orange), `.btn-secondary` (lien souligné), `.btn-dark` (vert foncé), `.btn-social` (lien souligné discret).

Fond topographique SVG : classe `.topo-bg` à ajouter dans chaque section (SVG inline encodé en data URI, `position: absolute`, ne bloque pas les clics).

## Déploiement

- **GitHub** : `https://github.com/glem4ire/trail-des-awirs`
- **GitHub Pages** : `https://glem4ire.github.io/trail-des-awirs/`
- `index.html` à la racine redirige vers `trail_des_awirs/index.html`
- `.nojekyll` à la racine désactive le build Jekyll

## Git

- Branche principale : `main`
- Branche principale : `main` (branche de travail courante)
