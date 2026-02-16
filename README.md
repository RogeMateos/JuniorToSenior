# Frontend Mastery

Concise, static, bilingual frontend course site (ES/EN) with shared CSS/JS and section-based pages.

## Structure

```text
.
├── index.html
├── assets/
│   ├── css/styles.css
│   └── js/app.js
└── frontend-mastery/
   ├── es/sections/*.html
   └── en/sections/*.html
```

## How It Works

- `index.html` is the single entrypoint (language selection).
- Each language has 12 standalone section pages.
- `assets/js/app.js` injects sidebar + mobile burger + language switcher in section pages.
- `assets/css/styles.css` contains shared design tokens, layout, components, and responsive rules.

## Run

Open `index.html` directly, or serve with a local server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Notes

- No framework, no build step, no runtime dependencies.
- Main interactive features: section navigation, language switching, interview toggle, copy-code, mobile sidebar.
