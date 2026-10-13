# GNA Arena

Free learning hub at **[gnaarena.in](https://www.gnaarena.in/)**: four self-paced modules plus a retro arcade break.

| Page | Path | Accent |
|---|---|---|
| Home (module hub) | `/` | Sage green `#315b46` |
| Atlas AI | `/learn/ai/` | Purple `#6b58a6` |
| Python Atelier | `/learn/python/` | Green `#3f6a46` |
| Testcraft (Playwright) | `/learn/playwright/` | Blue `#3d6a8b` |
| Systems Studio | `/learn/system-design/` | Amber `#8a5d2c` |
| Cockroach Runner | `/game.html` | Arcade |

This repository is the **deployed static site**. There's no build step: serve the folder as-is.

```bash
python -m http.server 8080   # then open http://localhost:8080
```

`index.html` + `assets/` is the compiled home page (React/Vite build). Each `learn/*/index.html` is a self-contained app.

## Shared layer (`/shared`)

Every page loads `shared/gna.css` and `shared/gna.js` in its `<head>`:

- **One theme everywhere.** It follows the visitor's system setting until they choose. Their choice is saved as `gna-theme` and kept in sync with each module's own toggle, so switching to dark in one module carries over to all the others.
- **Brand tokens.** All modules share the home page's neutral palette and the Inter typeface. Each module keeps the accent colour it uses on the home page cards.
- **Global search.** <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>K</kbd> on any page searches all 112 lessons (`shared/catalog.json`). <kbd>/</kbd> still searches within the current module.
- **Home page extras.** It adds "Pick up where you left off" cards and per-module progress bars, read from each module's saved progress in the browser. It also adds a search button, a theme toggle, and fade-in on scroll (turned off when the visitor prefers reduced motion).
- **Page transitions.** Pages cross-fade during navigation in browsers that support it.

If you add or rename lessons in a module, regenerate `shared/catalog.json` (id, title, track, minutes, short description per lesson).

## Root files

`ads.txt` (AdSense), `robots.txt`, `sitemap.xml`, `404.html`, `og-image.png` (1200×630 social preview).
