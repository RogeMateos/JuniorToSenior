# Architecture

## Overview

This project uses a static multi-page architecture with bilingual content (ES/EN) across multiple learning paths: Frontend Mastery, Full Stack Development, Software Architecture, and Software Lifecycle.

## Directory Structure

```
.
├── index.html (central hub with navigation to 4 paths)
├── assets/
│   ├── css/styles.css (shared global styles)
│   └── js/app.js (sidebar injection, language routing, interactive components)
├── frontend-mastery/
│   ├── es/
│   │   ├── index.html (Spanish hub)
│   │   └── sections/ (HTML content files)
│   └── en/
│       ├── index.html (English hub)
│       └── sections/ (HTML content files)
├── fullstack/
│   ├── es/
│   │   ├── index.html (Spanish hub)
│   │   └── sections/ (HTML content files)
│   └── en/
│       ├── index.html (English hub)
│       └── sections/ (HTML content files)
├── softwarearchitecture/
│   ├── es/
│   │   ├── index.html (Spanish hub)
│   │   └── sections/*.html
│   └── en/
│       ├── index.html (English hub)
│       └── sections/*.html
└── softwarecycle/
    ├── es/
    │   ├── index.html (Spanish hub)
    │   └── sections/*.html
    └── en/
        ├── index.html (English hub)
        └── sections/*.html
```

## Navigation Model

**Two-Level Navigation (DRY Applied)**:
1. Root `index.html` → Central hub with 4 learning paths
2. `/[path]/en/` or `/[path]/es/` → Hub page with language switcher
3. `/[path]/[lang]/sections/*.html` → Content pages with sidebar navigation

**Key Design Changes**:
- Eliminated redundant intermediate `index.html` selectors (frontend-mastery/index.html, fullstack/index.html, softwarearchitecture/index.html)
- Direct routing from central hub to `/[path]/en/index.html` (bypassing language selector pages)
- Language switching at hub level using buttons in top-right corner
- Mobile: Hamburger menu toggles sidebar navigation

## Content Layers

1. **Hub Pages** (`/[path]/[lang]/index.html`)
   - Learning path overview
   - Grid of section cards
   - Language switcher buttons
   - Sidebar injection point

2. **Section Pages** (`/[path]/[lang]/sections/*.html`)
   - Individual tutorials with 15-20 sections each
   - Navigation buttons (Previous/Next/Home)
   - Sidebar injection point
   - Code examples in `<pre><code>` blocks
   - Reference tables with `class="cheat-sheet-table"`

3. **Asset Layers**

   a) **Presentation** (`assets/css/styles.css`)
   - Global design tokens (colors, spacing, typography)
   - Component styles (buttons, cards, tables, code blocks)
   - Layout utilities (container, sidebar, main-content)
   - Responsive behavior (mobile hamburger, desktop sidebar)
   - Dark theme support for code blocks

   b) **Behavior** (`assets/js/app.js`)
   - Dynamic sidebar injection based on page type detection
   - Language routing (ES ↔ EN switching)
   - Mobile burger menu toggle
   - Content injection detection (prevents duplicate sidebars)
   - Event delegation for interactive elements

## Page Type Detection Logic

App.js uses URL analysis to detect page type:

```javascript
const isSection = pathname.includes('/sections/');
const isSoftwareCycle = pathname.includes('/softwarecycle/');
const isSoftwareArchitecture = pathname.includes('/softwarearchitecture/');
const isFullStack = pathname.includes('/fullstack/');
const isFrontendMastery = pathname.includes('/frontend-mastery/');
```

## Design Decisions

- **Single source of truth** for styles (`assets/css/styles.css`) and behavior (`assets/js/app.js`)
- **No framework dependencies** (no React, Vue, Angular, etc.)
- **No build step required** - pure HTML/CSS/JS
- **Progressive enhancement** - content first, JS enhances with navigation/interactivity
- **Bilingual from ground up** - ES and EN versions share identical structure, different content
- **DRY principle applied** - eliminated redundant navigation hubs

## Content Organization

**Bilingual Sections** (15-20 sections per tutorial):
- Frontend Mastery: HTML, CSS, JavaScript fundamentals
- Full Stack Development: APIs, databases, authentication, security
- Software Architecture: Design patterns, distributed systems, microservices
- Software Lifecycle: DevOps, deployment, containers, CI/CD

**Navigation Numbering** (cross-referencing):
- Sections numbered by learning path (01-12, 01-10, 1.0-1.7, etc.)
- External resources (Dragos ChatGPT links) provided in Resources section of each tutorial

## Tradeoffs

**Pros**:
- Simple deployment (no server-side logic needed)
- Low complexity - pure HTML/CSS/JS
- Easy maintenance - single point of style/behavior changes
- Fast load times - no framework overhead
- Accessible - works without JavaScript (content still readable)

**Cons**:
- Duplicated translated content between ES and EN files (trade-off for simplicity)
- Page reload on navigation (no SPA smoothness)
- No dynamic routing - URLs must map to actual files
