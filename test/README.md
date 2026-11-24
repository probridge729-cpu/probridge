# PROBRIDGE website

Static website for PROBRIDGE — *We Connect World of Real Estate.* Plain HTML, CSS and JavaScript with no build step, hosted on GitHub Pages.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .          # or: python -m http.server 8000
```

## Deploy

Push to the `main` branch. GitHub Pages serves the repository root (Settings → Pages → Deploy from branch → `main` / root).

## Structure

| Path | Purpose |
|---|---|
| `index.html` | Homepage: hero + search, services, builder alliances, featured projects, PROBRIDGE Choice, about, enquiry |
| `plots.html` | Plot listing with search filters (`?q=&loc=&min=&max=&sort=`) |
| `plot.html` | Plot detail page (`?id=<plot id>`) |
| `awards.html` | Placeholder until verified awards are supplied |
| `assets/site.js` | Shared header, footer, icons, enquiry form + popup, contact details (`SITE`) |
| `assets/site.css` | Design tokens and all styles (mobile-first; 768px tablet, 1024px desktop) |
| `assets/home-data.js` | Homepage content: services, builders, featured projects, PROBRIDGE Choice |
| `assets/plots-data.js` | Plot listings (sample data) |
| `assets/builders/` | Official builder logos supplied by the client |
| `backup/` | Previous versions of the site and logo |

### Editing content

- **Contact details:** `SITE` in `assets/site.js`.
- **Projects, prices, builders:** `assets/home-data.js`.
- **Plots:** add an object to `PLOTS` in `assets/plots-data.js`. It appears in search, the listing and its own detail page.
- **Builder logos:** add a PNG to `assets/builders/` and an entry to `BUILDERS`. Carousel arrows appear automatically when logos overflow.

### Enquiry form

Set `FORM_ENDPOINT` in `assets/site.js` to a form backend that accepts a `POST` of form data and returns 2xx (for example Formspree, Web3Forms or a CRM webhook). The success message is shown only after the endpoint confirms receipt.

While `FORM_ENDPOINT` is empty, the form validates the input and then opens WhatsApp with the enquiry pre-filled. The visitor still has to press Send in WhatsApp. A hidden honeypot field filters basic spam bots.

## Before publishing — client confirmations

Search the code for `TODO(client)`.

1. **Lakevista pricing.** The price list shows 2 BHK at ₹80 L + registration; the PROBRIDGE Choice card says "2 & 3 BHK from ₹55L".
2. **Contact numbers.** The main phone is +91 76670 05000 and WhatsApp is +91 72001 41515. The Godrej EOI card uses 917 666 3200 as supplied. Confirm which number each CTA should use.
3. **Photographs.** All project images are labelled stock placeholders ("Representative image"). Replace them with approved photographs of Lakevista, the Godrej plots, Brigade Vanagaram and Prestige Palm Court.
4. **Godrej EOI.** Confirm the launch date, price, availability and disclaimer.
5. **Enquiry form.** Confirm the backend/CRM destination and privacy requirements, then set `FORM_ENDPOINT`.
6. **Awards.** No award details were supplied, so `awards.html` is a placeholder.
7. **Plot listings.** `plots-data.js` holds sample listings. Verify or replace them before launch.
8. **Logo.** Supply a high-resolution SVG or transparent PNG of the PROBRIDGE logo. The current file is a trimmed JPEG export.
