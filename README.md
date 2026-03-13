# Khalid Mohamed Ali — Portfolio

Static portfolio site for **Civil Engineer & Architectural Designer**: 2D planning, 3D visualization, structural engineering.

---

## Project structure

```
portfolio/
├── index.html              # Redirects to index/index.html (home)
├── 404.html                # Not-found page (for hosts that serve from root)
├── README.md
├── .gitignore
├── package.json
├── index/
│   └── index.html          # Home
├── about/
│   └── about.html
├── contact/
│   └── contact.html
├── services/
│   └── services.html
├── project/
│   ├── projects.html       # Projects listing
│   ├── project-1.html … project-6.html
├── 404/
│   └── 404.html            # Same content as root 404 (for structure)
└── assets/
    ├── style.css           # Main styles (no css/ subfolder)
    ├── main.js             # Main script (no js/ subfolder)
    ├── images/             # profile.jpg, p1-1.jpg, p2-1.jpg, etc.
    │   └── .gitkeep
    └── favicon.ico         # Add your favicon here
```

---

## Production checklist

- [ ] Add **favicon**: place `favicon.ico` in `assets/`.
- [ ] Add all **images** in `assets/images/` (e.g. `profile.jpg`, `p1-1.jpg`, …).
- [ ] Ensure your host serves **404.html** from root for missing URLs (GitHub Pages, Netlify, Vercel do this when the file is in root).
- [ ] Optional: enable **HTTPS** and set **cache headers** for `assets/` on your host.

---

## Run locally

- **Without Node**: open `index/index.html` in a browser, or run a static server from the project root (e.g. `python -m http.server 8000`). Visit `http://localhost:8000` (root redirects to home).
- **With Node**: from project root run `npm install` then `npm run serve`. Open `http://localhost:8080`.

---

## Deploy

Upload the entire project folder to any static host. No build step.

- **GitHub Pages**: push repo, enable Pages (source: main branch, root or `/docs`).
- **Netlify / Vercel**: connect repo or drag-and-drop the folder.
- **Other**: upload all files keeping the same structure. Set `index.html` as default document and use root `404.html` for missing pages.

All links are relative; the site works in any subfolder or subdomain.
