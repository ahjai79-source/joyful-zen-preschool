# Joyful Zen Academy Website

Marketing website for **Joyful Zen Academy** (micro-school, grades 1–5) and **Joyful Zen Preschool**, serving Burbank, Toluca Lake, Studio City, North Hollywood, and Glendale, California.

A warm, hand-drawn academic design — ink doodles, a real chalkboard texture, and the Caveat handwritten typeface.

## Pages

| File | Page |
|------|------|
| `index.html` | Homepage |
| `about.html` | About / founder message |
| `programs.html` | Programs & enrichment |
| `academy.html` | Academy (grades 1–5) + FAQ |
| `preschool.html` | Joyful Zen Preschool (ages 2–5) |
| `charter-families.html` | Charter / homeschool families |
| `admissions.html` | Admissions steps |
| `book-a-tour.html` | Tour booking |
| `contact.html` | Contact + location map |
| `privacy-policy.html` | Privacy policy |

## Tech notes

- Each page is a self-contained HTML file that opens directly in a browser.
- `support.js` is the shared runtime required by every page.
- `assets/` holds all photography and graphics.
- Responsive breakpoints for tablet (≤1024px) and mobile (≤600px) are written into each page's `<style>` block; mobile includes a hamburger menu.
- SEO metadata, `robots.txt`, and `sitemap.xml` are included.

## Deployment

Static site — no build step. On Vercel: import the repo, Framework Preset **Other**, deploy. `index.html` is the entry point.

## Local preview

Serve the folder with any static server, e.g.:

```bash
npx serve .
```

Then open `index.html`.
