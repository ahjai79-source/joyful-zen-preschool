# Deploying Joyful Zen Preschool (joyfulzen.org)

This is a static site — no build step. `vercel.json` maps clean URLs
(`/about`, `/programs`, etc.) to the matching `.dc.html` file, matching the
canonical/OG URLs already set in each page.

## 1. Push to GitHub
1. Create a new repo on GitHub (e.g. `joyful-zen-preschool`), public or private.
2. From this project folder:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<you>/joyful-zen-preschool.git
   git push -u origin main
   ```

## 2. Import into Vercel
1. Go to vercel.com → **Add New... → Project** → import the GitHub repo.
2. Framework preset: **Other** (no build). Leave Build Command and Output
   Directory blank — Vercel will serve the repo root as static files.
3. Deploy. You'll get a `*.vercel.app` URL to sanity-check first.

## 3. Point joyfulzen.org at Vercel
In the Vercel project → **Settings → Domains**, add `joyfulzen.org` and
`www.joyfulzen.org`. Vercel will show you the exact DNS records to add —
normally:

- **Root domain (`joyfulzen.org`)**: an `A` record → `76.76.21.21`
- **`www` subdomain**: a `CNAME` record → `cname.vercel-dns.com`

(Vercel's dashboard always shows the current values for your project — use
those over these if they differ.)

## 4. Add those records in GoDaddy
1. GoDaddy → **My Products → DNS** (next to joyfulzen.org).
2. Edit/add the **A** record for `@` → the IP Vercel gave you.
3. Edit/add the **CNAME** record for `www` → the value Vercel gave you.
4. Remove any conflicting default GoDaddy "parked domain" A/CNAME records.
5. Save. DNS can take a few minutes to a few hours to propagate.
6. Back in Vercel, the Domains tab will show a checkmark once it verifies —
   Vercel also auto-issues the SSL certificate once DNS resolves.

## After going live
- Update `robots.txt` / `sitemap.xml` if the domain or page list changes.
- Re-check `og:image` URLs (currently `https://joyfulzen.org/assets/...`) once
  live so social previews resolve.
- Set the real Web3Forms access key in `forms.js` (`ACCESS_KEY`) so the
  Contact and Book a Tour forms actually deliver — currently a placeholder.
