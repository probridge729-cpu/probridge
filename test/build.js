// Static site build — run `node build.js` after editing partials/, assets/*-data.js or pages.
// No dependencies. It rewrites the content between <!-- @name --> ... <!-- @/name --> markers in place:
//   @head / @header / @footer   → partials/*.html (shared by every page)
//   @home.x / @listing.x        → HOME.x() / LISTING.x() from assets/render.js (pre-rendered for SEO)
// and generates property-<id>.html, plot-<id>.html, sitemap.xml and robots.txt.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const CONFIG = {
  // Change to "https://www.probridge.co.in/" when this site replaces the live one.
  baseUrl: "https://www.probridge.co.in/test/",
  // false keeps every page "noindex" (test preview). Set true at launch.
  indexable: false,
  // Google Search Console "HTML tag" method: paste only the content="..." value here.
  googleVerification: ""
};
const NOINDEX = new Set(["awards.html"]); // placeholder pages stay out of search results
const PAGES = ["index.html", "properties.html", "plots.html", "awards.html", "privacy-policy.html", "terms.html"];

const ROOT = __dirname;
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, s) => fs.writeFileSync(path.join(ROOT, f), s);
const esc = (s) => String(s).replace(/&(?!amp;|lt;|gt;|quot;|#)/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Load data + renderers exactly as the browser does.
const ctx = vm.createContext({});
vm.runInContext(
  ["assets/plots-data.js", "assets/home-data.js", "assets/properties-data.js", "assets/galleries-data.js", "assets/render.js"].map(read).join("\n;\n") +
    "\n;this.R = { SITE, icon, HOME, LISTING, PLOTS, PROPERTIES, propertyDetail, plotDetail, propertyUrl, plotUrl, price, kind };",
  ctx
);
const R = ctx.R;
const partials = Object.fromEntries(["head", "header", "footer"].map((p) => [p, read(`partials/${p}.html`).trim()]));

const ORG = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "PROBRIDGE",
  slogan: "We Connect World of Real Estate.",
  url: CONFIG.baseUrl,
  logo: CONFIG.baseUrl + "assets/probridge-logo.png",
  image: CONFIG.baseUrl + "assets/probridge-og.jpg",
  telephone: R.SITE.tel,
  email: R.SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "First Floor, No. 10B, Ekambaram Industrial Estate Rd, Alapakkam, Karpaga Vinayagar Colony, Valasaravakkam",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600116",
    addressCountry: "IN"
  },
  areaServed: ["Chennai", "Bengaluru", "Pune"]
};
const breadcrumb = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: CONFIG.baseUrl + url }))
});

function fill(tpl, vars) {
  return tpl.replace(/\{\{([\w.:-]+)\}\}/g, (_, k) => {
    if (k.startsWith("icon:")) {
      const [, name, size] = k.split(":");
      return R.icon(name, +size || 20);
    }
    if (k.startsWith("site.")) return R.SITE[k.slice(5)];
    if (k in vars) return vars[k];
    throw new Error(`Unknown token {{${k}}}`);
  });
}

function renderPage(page, html, jsonld) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/)[1].trim();
  const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
  const indexable = CONFIG.indexable && !NOINDEX.has(page);
  const vars = {
    home: page === "index.html" ? "" : "index.html",
    canonical: CONFIG.baseUrl + (page === "index.html" ? "" : page),
    title,
    description,
    ogImage: CONFIG.baseUrl + "assets/probridge-og.jpg",
    robotsMeta: indexable ? "" : '<meta name="robots" content="noindex" />\n    ',
    verificationMeta: CONFIG.googleVerification
      ? `<meta name="google-site-verification" content="${esc(CONFIG.googleVerification)}" />\n    `
      : "",
    year: new Date().getFullYear(),
    jsonld: jsonld ? `\n    <script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""
  };
  return html.replace(/<!-- @([\w.]+) -->[\s\S]*?<!-- @\/\1 -->/g, (_, name) => {
    let inner;
    if (name in partials) {
      inner = fill(partials[name], vars);
      if (name === "header") // mark the current page in the main nav
        inner = inner.replace(/<nav[\s\S]*?<\/nav>/, (nav) => nav.split(`href="${page}"`).join(`href="${page}" aria-current="page"`));
      return `<!-- @${name} -->\n    ${inner}\n    <!-- @/${name} -->`;
    }
    const [ns, fn] = name.split(".");
    const group = { home: R.HOME, listing: R.LISTING }[ns];
    if (!group || !group[fn]) throw new Error(`${page}: unknown block @${name}`);
    return `<!-- @${name} -->${group[fn]()}<!-- @/${name} -->`;
  }).replace(/((?:src|href)="assets\/[\w-]+\.(?:js|css))(?:\?v=\w+)?"/g, (_, url) => `${url}?v=${version(url.split('"')[1])}"`);
}

// Cache-busting: ?v=<content hash> on CSS/JS so browsers fetch new files after every change.
const crypto = require("crypto");
const versions = {};
const version = (file) =>
  (versions[file] ??= crypto.createHash("md5").update(read(file)).digest("hex").slice(0, 8));

const shell = ({ title, description, main }) => `<!doctype html>
<html lang="en">
  <head>
    <!-- @head --><!-- @/head -->
    <title>${title}</title>
    <meta name="description" content="${description}" />
  </head>
  <body>
    <!-- @header --><!-- @/header -->
    <main class="wrap" id="main" style="padding: 30px 0 60px">${main}</main>
    <!-- @footer --><!-- @/footer -->
    <script src="assets/render.js"></script>
    <script src="assets/site.js"></script>
  </body>
</html>
`;

// 1. Hand-written pages
for (const page of PAGES) write(page, renderPage(page, read(page), page === "index.html" ? ORG : null));

// 2. Detail pages (remove stale ones first)
for (const f of fs.readdirSync(ROOT)) if (/^(property|plot)-.+\.html$/.test(f)) fs.unlinkSync(path.join(ROOT, f));
const details = [];
for (const p of R.PROPERTIES) {
  const page = R.propertyUrl(p);
  const html = shell({
    title: esc(`${p.name}, ${p.location.split(",")[0]} – ${p.config} | ${p.price} | PROBRIDGE`),
    description: esc(`${p.name} by ${p.builder}: ${p.config}${R.kind(p)} in ${p.location}. Price ${p.price}, ${p.rate}. ${p.status}. Verified listing, zero brokerage with PROBRIDGE.`),
    main: R.propertyDetail(p)
  });
  write(page, renderPage(page, html, breadcrumb([["Home", ""], ["New Properties", "properties.html"], [p.name, page]])));
  details.push(page);
}
for (const p of R.PLOTS) {
  const page = R.plotUrl(p);
  const html = shell({
    title: esc(`${p.name}, ${p.locality} – Plots for Sale in Chennai | PROBRIDGE`),
    description: esc(`${p.name} by ${p.builder} in ${p.locality}, Chennai. Plots from ${R.price(p)}. ${p.status}. Zero brokerage with PROBRIDGE.`),
    main: R.plotDetail(p)
  });
  write(page, renderPage(page, html, breadcrumb([["Home", ""], ["Plots", "plots.html"], [p.name, page]])));
  details.push(page);
}

// Old ?id= addresses (property.html?id=x, plot.html?id=x) forward to the new per-listing pages.
for (const [page, prefix, list] of [["property.html", "property-", "properties.html"], ["plot.html", "plot-", "plots.html"]]) {
  write(page, `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <title>Redirecting… | PROBRIDGE</title>
    <script>
      // Kept for old links: forwards ?id=<id> to ${prefix}<id>.html
      const id = new URLSearchParams(location.search).get("id");
      location.replace(id && /^[\\w-]+$/.test(id) ? "${prefix}" + id + ".html" : "${list}");
    </script>
  </head>
  <body><p>Redirecting… <a href="${list}">Continue</a></p></body>
</html>
`);
}

// 3. sitemap.xml + robots.txt
const today = new Date().toISOString().slice(0, 10);
const urls = [...PAGES.filter((p) => !NOINDEX.has(p)), ...details].map((p) => {
  const loc = CONFIG.baseUrl + (p === "index.html" ? "" : p);
  const priority = p === "index.html" ? "1.0" : details.includes(p) ? "0.7" : "0.9";
  return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`;
});
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.baseUrl}sitemap.xml\n`);

// 4. llms.txt — plain-language site map for AI assistants (format: https://llmstxt.org)
const url = (p) => CONFIG.baseUrl + (p === "index.html" ? "" : p);
const text = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"');
const metaOf = (p) => {
  const html = read(p);
  return {
    title: text(html.match(/<title>([\s\S]*?)<\/title>/)[1].trim()),
    description: text(html.match(/<meta name="description" content="([^"]*)"/)[1])
  };
};
const line = (p) => {
  const m = metaOf(p);
  return `- [${m.title.replace(/ \| PROBRIDGE$/, "")}](${url(p)}): ${m.description}`;
};
const S = R.SITE;
write("llms.txt", `# PROBRIDGE

> PROBRIDGE ("We Connect World of Real Estate") is a real-estate advisory and authorised channel partner based in Chennai, India. It connects people with property buying, selling, rental, interior and home-maintenance services without brokerage charges, and lists verified new residential projects and plots in Chennai, Bengaluru and Pune.

- Contact: phone ${S.phone}, WhatsApp ${S.whatsappLabel}, email ${S.email}
- Office: ${S.address}
- Builder alliances: Prestige Group, Brigade Group, Godrej Properties, Puravankara
- Prices, EMIs and availability on listing pages are indicative and subject to developer confirmation.

## Main pages

${["index.html", "properties.html", "plots.html"].map(line).join("\n")}

## New properties (apartments and villas)

${R.PROPERTIES.map((p) => line(R.propertyUrl(p))).join("\n")}

## Plots for sale in Chennai

${R.PLOTS.map((p) => line(R.plotUrl(p))).join("\n")}

## Optional

- [Sitemap](${CONFIG.baseUrl}sitemap.xml): all indexable pages
`);

console.log(`Built ${PAGES.length} pages + ${details.length} detail pages, sitemap.xml (${urls.length} URLs), robots.txt, llms.txt.`);
console.log(CONFIG.indexable ? "Indexable: yes" : "Indexable: NO (test mode, all pages noindex)");
