# Architecture

## Overview

This project uses a static multi-page architecture with shared assets.

## Layers

1. Content layer
- `frontend-mastery/es/sections/*.html`
- `frontend-mastery/en/sections/*.html`

2. Presentation layer
- `assets/css/styles.css`
- Global styles, components, responsive behavior, landing styles.

3. Behavior layer
- `assets/js/app.js`
- Language routing, dynamic sidebar injection, burger navigation, interactive blocks.

## Navigation Model

- Root `index.html`: language gateway.
- Section pages: direct file navigation (`01-...html` → `12-...html`).
- Mobile: sidebar toggled by injected burger button.

## Design Decisions

- Single source of truth for styles and behavior (`assets/`).
- No SPA/router dependency; simple file-based navigation.
- Progressive enhancement: sections remain plain HTML content first.

## Tradeoffs

- Pros: simple deployment, low complexity, easy maintenance.
- Cons: duplicated translated content between ES and EN files.
