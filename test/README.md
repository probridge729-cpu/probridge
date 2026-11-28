# PROBRIDGE website (test / preview)

Static HTML site hosted on GitHub Pages, previewed at https://www.probridge.co.in/test/. A small Node build script (no dependencies) writes the shared header and footer and pre-renders content into real HTML, which is better for SEO.

## Workflow

```bash
node build.js      # run after ANY change to partials/, assets/*-data.js, assets/render.js or a page
git add . && git commit -m "..." && git push
```

Preview locally by opening `index.html`, or by serving the folder with `npx serve .`.

## Where to edit

| What | File |
|---|---|
| Header (logo, menu, Enquire button) | `partials/header.html` |
| Footer, mobile bottom bar, popup container | `partials/footer.html` |
| Shared `<head>` (favicons, fonts, CSS, canonical, Open Graph) | `partials/head.html` |
| Phone, email, WhatsApp, address | `SITE` in `assets/render.js` (used by partials via `{{site.*}}`) |
| Homepage content: services, trust cards, builders, featured, choice | `assets/home-data.js` |
| New Properties listings | `assets/properties-data.js` |
| Plot listings | `assets/plots-data.js` |
| Card and section HTML | `assets/render.js` |
| Menu, carousels, popup, form sending | `assets/site.js` |
| Styles | `assets/site.css` |
| Page title and description | the `<title>` and `<meta name="description">` in each page |

Never edit the content between `<!-- @name -->` and `<!-- @/name -->` markers. `build.js` overwrites it.

## What the build generates

- The shared head, header and footer in every page (`@head`, `@header`, `@footer`).
- The pre-rendered homepage sections and listing grids (`@home.*`, `@listing.*`).
- One page per listing: `property-<id>.html` and `plot-<id>.html`, each with its own title, description, canonical URL and breadcrumb structured data.
- `sitemap.xml` and `robots.txt`.
- `llms.txt`: a plain-text summary of the business and every page, for AI assistants (format: https://llmstxt.org). New listings are added to it automatically.
- `RealEstateAgent` structured data on the homepage.

## SEO settings (top of `build.js`)

```js
const CONFIG = {
  baseUrl: "https://www.probridge.co.in/test/", // → "https://www.probridge.co.in/" at launch
  indexable: false,                             // → true at launch (removes noindex)
  googleVerification: ""                        // Search Console "HTML tag" code
};
```

### Google Search Console

**Recommended: verify with a Domain property.** It covers `probridge.co.in`, `www` and every page.

1. Go to https://search.google.com/search-console, click **Add property → Domain**, and enter `probridge.co.in`.
2. Google shows a TXT record (`google-site-verification=…`). In GoDaddy, open **DNS → Add New Record**, choose type **TXT**, name `@`, and paste the value.
3. Click **Verify**. DNS can take up to an hour to update.

Alternatively, use the **URL prefix → HTML tag** method. Paste only the `content` value into `googleVerification`, then run `node build.js` and push.

After verifying, submit `sitemap.xml` under **Sitemaps**. Submit it once the site is live at the root with `indexable: true`, because the test pages are `noindex` on purpose.

## Enquiry form (Web3Forms)

Set `WEB3FORMS_KEY` in `assets/site.js`. The form sends every field plus the project and page, and replies go to the visitor's email. Until the key is set, the form opens WhatsApp with the enquiry pre-filled. A hidden `botcheck` field blocks basic spam bots.

## Going live (replacing the old root site)

1. In `build.js`, set `baseUrl: "https://www.probridge.co.in/"` and `indexable: true`, then run `node build.js`.
2. Copy the contents of `test/` to the repository root, keeping `CNAME`.
3. Push, then submit `https://www.probridge.co.in/sitemap.xml` in Search Console.

## Before launch — client confirmations

Search the code for `TODO(client)`: listing prices and EMIs, the Lakevista price conflict, the Godrej EOI number, approved photos, award details, and Privacy Policy/Terms pages for the consent checkbox.
