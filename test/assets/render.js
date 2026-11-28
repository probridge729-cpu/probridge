// Pure HTML renderers shared by the browser (site.js, filter pages) and build.js (static pages).
// No DOM access here: every function takes data and returns an HTML string.

// Primary contact details (brief §10). Also used by partials via {{site.*}} tokens.
const SITE = {
  phone: "+91 76670 05000",
  tel: "+917667005000",
  whatsapp: "917200141515",
  whatsappLabel: "+91 72001 41515",
  email: "projects@probridge.co.in",
  address: "First Floor, No. 10B, Ekambaram Industrial Estate Rd, Alapakkam, Karpaga Vinayagar Colony, Valasaravakkam, Chennai, Tamil Nadu 600116"
};
SITE.mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(SITE.address);

const ICON_PATHS = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  tag: '<path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l8.59-8.59a1 1 0 0 0 0-1.41z"/><circle cx="7" cy="7" r="1.5"/>',
  key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
  sofa: '<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11a2 2 0 0 1 4 0v3h12v-3a2 2 0 0 1 4 0v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/><path d="M4 18v2M20 18v2"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  shieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  userCheck: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
  percent: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  phoneCall: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M14.05 2a9 9 0 0 1 8 7.94M14.05 6A5 5 0 0 1 18 10"/>',
  building: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4"/>',
  bed: '<path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>',
  bath: '<path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.68 3 4 3.68 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M10 5 8 7M2 12h20M7 19v2M17 19v2"/>'
};
const icon = (name, size = 20) =>
  `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name]}</svg>`;

// Stock photos are placeholders only (brief §15): always labelled "Representative image".
const IMAGES = [
  "photo-1600585154340-be6161a56a0c",
  "photo-1564013799919-ab600027ffc6",
  "photo-1600566753190-17f0baa2a6c3",
  "photo-1600607687920-4e2a09cf159d"
];
const img = (i, w = 900) =>
  `https://images.unsplash.com/${IMAGES[i % IMAGES.length]}?auto=format&fit=crop&w=${w}&q=80`;
const photo = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

const lakh = (l) => (l >= 100 ? +(l / 100).toFixed(2) + " Cr" : +l.toFixed(2) + " L");
const price = (p) => "₹" + lakh(p.min) + (p.max ? " – " + lakh(p.max) : " onwards");
const size = (p) =>
  p.sizeMin ? `${p.sizeMin.toLocaleString("en-IN")} – ${p.sizeMax.toLocaleString("en-IN")} sq.ft` : `${p.acres} acres`;

// "3 BHK" → "3 BHK apartments", but "4 BHK Independent Villa" stays as is.
const kind = (p) => (p.config.toLowerCase().includes(p.type.toLowerCase()) ? "" : ` ${p.type.toLowerCase()}s`);
const propertyUrl = (p) => `property-${p.id}.html`;
const plotUrl = (p) => `plot-${p.id}.html`;
const fact = (label, value) => (value ? `<div><small>${label}</small><b>${value}</b></div>` : "");
const pills = (items) => `<ul class="pills">${items.map((a) => `<li>${a}</li>`).join("")}</ul>`;
const ticks = (items, cls = "") =>
  `<ul class="ticks ${cls}">${items.map((t) => `<li>${icon("check", 16)}<span>${t}</span></li>`).join("")}</ul>`;
const EMI_NOTE = `<p class="note">*EMI is indicative. Images are representative. Prices and availability are subject to developer confirmation.</p>`;

// ---------- Project galleries (GALLERIES in galleries-data.js) ----------
// Returns [{src, sm, caption, w, h}] for "photos" or "plans"; [] when the item has no gallery.
const galleryOf = (slug, kind = "photos") =>
  slug && typeof GALLERIES !== "undefined" && GALLERIES[slug]
    ? GALLERIES[slug][kind].map(([f, caption, w, h]) => ({
        src: `assets/projects/${slug}/${f}.jpg`, sm: `assets/projects/${slug}/${f}-sm.jpg`, caption, w, h
      }))
    : [];
// Main image: first gallery photo, else the stock fallback (labelled "Representative image").
const mainImage = (slug, fallback, small = true) => {
  const g = galleryOf(slug)[0];
  return g ? { url: small ? g.sm : g.src, real: true } : { url: fallback, real: false };
};
const repLabel = (m) => (m.real ? "" : `<span class="rep">Representative image</span>`);

// Thumbnail grid; each thumb links to the full image (works without JS) and opens the lightbox.
function galleryGrid(slug, kind, title, id) {
  const items = galleryOf(slug, kind);
  if (!items.length) return "";
  return `<div class="block" id="${id}">
    <h2>${title} <span class="count">${items.length}</span></h2>
    <div class="gallery ${kind === "plans" ? "is-plans" : ""}" data-gallery>
      ${items.map((g, i) => `<a href="${g.src}" class="g-item${i === 0 && kind === "photos" ? " g-main" : ""}" data-caption="${g.caption}">
        <img src="${g.sm}" alt="${g.caption}" width="${g.w}" height="${g.h}" loading="lazy" decoding="async" />
        <span class="g-cap">${g.caption}</span></a>`).join("")}
    </div></div>`;
}

// ---------- Cards ----------
function propCard(p) {
  const url = propertyUrl(p);
  const m = mainImage(p.gallery, p.photo && photo(p.photo));
  return `<article class="prop-card">
    <a class="card-img" href="${url}" tabindex="-1" aria-hidden="true" style="background-image:url('${m.url}')">
      <span class="prop-badges"><span class="pb sale">For Sale</span>${p.tags.map((t) => `<span class="pb tag">${t}</span>`).join("")}</span>
      <span class="prop-foot"><span class="pb verified">${icon("shieldCheck", 14)} Verified</span>${p.status ? `<span class="pb status">${p.status}</span>` : ""}</span>
    </a>
    <div class="prop-body">
      <div class="prop-price"><b>${p.price}</b>${p.rate ? `<span>${p.rate}</span>` : ""}</div>
      ${p.emi ? `<span class="emi">EMI ${p.emi}*</span>` : ""}
      <h3><a href="${url}">${p.name}<span> – ${p.tagline}</span></a></h3>
      <p class="with-ico muted">${icon("pin", 16)} ${p.location}</p>
      <p class="with-ico muted">${icon("building", 16)} ${p.builder}</p>
      <div class="chips"><span>${icon("bed", 16)} ${p.config}</span>${p.baths ? `<span>${icon("bath", 16)} ${p.baths}</span>` : ""}</div>
      <div class="prop-actions">
        <a class="btn navy-btn" href="${url}">View Details ${icon("arrow", 16)}</a>
        <button type="button" class="btn" data-enquire="${p.name}">Enquire Now</button>
      </div>
    </div></article>`;
}

function plotCard(p) {
  const m = mainImage(p.gallery, img(PLOTS.indexOf(p), 700));
  return `<a class="card" href="${plotUrl(p)}">
    <div class="card-img" style="background-image:url('${m.url}')"><span class="badge">${p.status}</span>${repLabel(m)}</div>
    <div class="card-body">
      <h3>${p.name}</h3>
      <p class="muted with-ico">${icon("pin", 16)} ${p.locality}, Chennai</p>
      <p class="muted">${size(p)}</p>
      <div class="card-foot"><b>${price(p)}</b><span class="link">View details ${icon("arrow", 16)}</span></div>
    </div></a>`;
}

const emptyState = (what) => `<div class="empty" style="grid-column:1/-1">
  <h3>No ${what} match your search yet.</h3>
  <p class="muted">Tell us what you need and we'll find it for you.</p><br>
  <button class="btn gold-btn" data-enquire>Post Your Requirement</button></div>`;

// ---------- Enquiry form (brief §9). Name + mobile + consent required; email validated when given. ----------
let formCount = 0;
function enquiryForm({ project = "", submit = "Submit", message = "" } = {}) {
  const n = ++formCount;
  const field = (name, label, input) => `
    <div class="field">
      <label for="${name}-${n}">${label}</label>
      ${input.replace("<input", `<input id="${name}-${n}" name="${name}" aria-describedby="${name}-${n}-err"`)
             .replace("<textarea", `<textarea id="${name}-${n}" name="${name}" aria-describedby="${name}-${n}-err"`)}
      <small class="err" id="${name}-${n}-err"></small>
    </div>`;
  return `<form class="enquiry" novalidate>
    <input type="hidden" name="project" value="${project}" />
    <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
    ${field("name", "Name *", '<input required autocomplete="name" />')}
    ${field("phone", "Mobile *", '<div class="tel-wrap"><span class="cc" aria-hidden="true">+91</span><input required type="tel" inputmode="tel" autocomplete="tel-national" placeholder="10-digit mobile number" /></div>')}
    ${field("email", "Email", '<input type="email" autocomplete="email" placeholder="you@example.com" />')}
    ${field("message", "Requirement", `<textarea rows="3" placeholder="Please share your requirement here — location, budget, timeline…">${message}</textarea>`)}
    <div class="consent">
      <label><input type="checkbox" name="consent" id="consent-${n}" value="Yes" required aria-describedby="consent-${n}-err" />
      <span>I authorise PROBRIDGE and its representatives to contact me about my enquiry via call, SMS, WhatsApp and email.</span></label>
      <!-- TODO(client): link the Privacy Policy and Terms once those pages exist. -->
      <small class="err" id="consent-${n}-err"></small>
    </div>
    <button class="btn gold-btn full" type="submit">${submit}</button>
    <p class="form-status" role="status" aria-live="polite"></p>
  </form>`;
}

// ---------- Homepage sections (rendered at build time into index.html) ----------
const HOME = {
  locOptions: () => [...new Set(PLOTS.map((p) => p.locality))].map((l) => `<option>${l}</option>`).join(""),
  partnerIcon: () => icon("shield", 16),
  services: () => SERVICES.map((s) => `
    <a class="service" href="#enquire" data-service="${s.title}">
      <span class="ico-wrap">${icon(s.icon, 24)}</span>
      <h3>${s.title}</h3>
      <span class="label">${s.label}</span>
    </a>`).join(""),
  maintIcon: () => icon("wrench", 20),
  newProps: () => PROPERTIES.map(propCard).join(""),
  trust: () => TRUST.map((t) => `
    <div class="trust-card trust-${t.tone}">
      <span class="trust-ico">${icon(t.icon, 26)}</span>
      <div><h3>${t.title}<span>${t.sub}</span></h3><p>${t.text}</p></div>
    </div>`).join(""),
  builders: () => BUILDERS.map((b) => `
    <div class="logo-card"><img src="${b.logo}" alt="${b.name} logo" loading="lazy" /></div>`).join(""),
  featured: () => FEATURED.map((f) => {
    const m = mainImage(f.gallery, img(f.image, 1200), false);
    return `
    <article class="feature">
      <a class="feature-img" ${f.link ? `href="${f.link}"` : ""} aria-label="${m.real ? "" : "Representative image for "}${f.builder} ${f.name}"
           style="background-image:url('${m.url}')">
        <span class="badge">${f.type}</span>${repLabel(m)}
        ${f.gallery ? `<span class="g-count">${icon("arrow", 14)} ${galleryOf(f.gallery).length + galleryOf(f.gallery, "plans").length} photos</span>` : ""}
      </a>
      <div class="feature-body">
        <div>
          <span class="builder-label">${f.builder}</span>
          <h3>${f.name}</h3>
          <p class="with-ico muted">${icon("pin", 16)} ${f.location}</p>
        </div>
        ${f.status || f.partner ? `<div class="cta-row">
          ${f.status ? `<span class="status">${f.status}</span>` : ""}
          ${f.partner ? `<span class="partner">${f.partner}</span>` : ""}</div>` : ""}
        <div class="facts">${f.facts.map(([k, v]) => fact(k, v)).join("")}</div>
        ${f.rera ? `<p class="rera">${icon("shield", 16)} RERA No.: ${f.rera}</p>` : ""}
        ${ticks(f.highlights)}
        ${f.prices ? `<div class="table-wrap"><table class="price-table">
          <caption class="sr-only">Configurations and prices</caption>
          <thead><tr><th scope="col">Configuration</th><th scope="col">Size</th><th scope="col">Price</th></tr></thead>
          <tbody>${f.prices.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</tbody>
        </table></div>` : ""}
        ${f.amenities ? `<details><summary>View all amenities (${f.amenities.length})</summary>${ticks(f.amenities, "cols")}</details>` : ""}
        ${f.ctaLine ? `<div class="eoi"><b>${f.ctaLine}</b>
          <span>Call / WhatsApp: <a href="tel:${f.contact.tel}">${f.contact.label}</a> ·
          <a href="https://wa.me/${f.contact.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></span></div>` : ""}
        ${f.disclaimer ? `<p class="disclaimer">${f.disclaimer}</p>` : ""}
        <div class="cta-row">
          <button type="button" class="btn gold-btn" data-enquire="${f.builder} ${f.name}">${f.cta}</button>
          ${f.link ? `<a class="btn" href="${f.link}">View Details &amp; Gallery ${icon("arrow", 16)}</a>` : ""}
        </div>
      </div>
    </article>`;
  }).join(""),
  choice: () => CHOICE.map((c) => {
    const m = mainImage(c.gallery, null);
    return `
    <div class="choice-card">
      ${m.real ? `<a class="choice-img" href="${c.link}" tabindex="-1" aria-hidden="true" style="background-image:url('${m.url}')"></a>` : ""}
      <h3>${c.link ? `<a href="${c.link}">${c.name}</a>` : c.name}</h3>
      <span class="type">${c.type}</span>
      <span class="price">${c.price}</span>
      <span class="with-ico">${icon("pin", 16)} ${c.location}</span>
      <div class="choice-actions">
        ${c.link ? `<a class="btn gold-btn" href="${c.link}">View Details</a>` : ""}
        <button type="button" class="btn ghost-btn" data-enquire="${c.name}">Enquire</button>
      </div>
    </div>`;
  }).join(""),
  form: () => enquiryForm(),
  contactList: () => [
    ["phone", "Phone", SITE.phone, `tel:${SITE.tel}`],
    ["mail", "Email", SITE.email, `mailto:${SITE.email}`],
    ["chat", "WhatsApp", SITE.whatsappLabel, `https://wa.me/${SITE.whatsapp}`],
    ["pin", "Office", SITE.address, SITE.mapUrl, "Get directions"]
  ].map(([ic, label, value, href, more]) => `
    <li><a href="${href}"${href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>
      <span class="ci-ico">${icon(ic, 20)}</span>
      <span class="ci-text"><small>${label}</small><b>${value}</b>${more ? `<span class="ci-more">${more} ${icon("arrow", 14)}</span>` : ""}</span>
    </a></li>`).join(""),
  contactActions: () => `
    <a class="btn gold-btn" href="tel:${SITE.tel}">${icon("phone", 18)} Call Now</a>
    <a class="btn ghost-btn" href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">${icon("chat", 18)} WhatsApp</a>`,
  arrowLeft: () => icon("left", 22),
  arrowRight: () => icon("right", 22)
};

// ---------- Listing pages (initial static HTML; filters re-render in the browser) ----------
const LISTING = {
  plotOptions: HOME.locOptions,
  plots: () => PLOTS.map(plotCard).join(""),
  plotCount: () => `${PLOTS.length} plots found`,
  cityOptions: () => [...new Set(PROPERTIES.map((p) => p.city))].map((c) => `<option>${c}</option>`).join(""),
  properties: () => PROPERTIES.map(propCard).join(""),
  propertyCount: () => `${PROPERTIES.length} properties found`
};

// ---------- Detail pages (generated by build.js as property-<id>.html / plot-<id>.html) ----------
// Hero: main gallery photo (opens the lightbox) with a "View all photos" button, or the stock fallback.
function detailHero(slug, fallback, name, overlay) {
  const m = mainImage(slug, fallback, false);
  const total = galleryOf(slug).length + galleryOf(slug, "plans").length;
  return `<div class="detail-hero" role="img" aria-label="${m.real ? "" : "Representative image for "}${name}" style="background-image:url('${m.url}')">
    ${overlay}${repLabel(m)}
    ${total ? `<a class="g-all" href="#gallery">${icon("arrow", 16)} View all ${total} photos</a>` : ""}
  </div>`;
}
// Section tabs; Gallery / Floor Plans appear only when the project has them.
function detailTabs(slug, ...extra) {
  const tabs = [
    ["overview", "Overview"],
    galleryOf(slug).length && ["gallery", "Gallery"],
    galleryOf(slug, "plans").length && ["plans", "Floor Plans"],
    ...extra,
    ["location", "Location"]
  ].filter(Boolean);
  return `<nav class="tabs" aria-label="Sections">${tabs.map(([id, t]) => `<a href="#${id}">${t}</a>`).join("")}</nav>`;
}

function propertyDetail(p) {
  const related = PROPERTIES.filter((x) => x !== p)
    .sort((a, b) => (b.city === p.city) - (a.city === p.city))
    .slice(0, 3);
  return `
  <div class="crumbs"><a href="index.html">Home</a> › <a href="properties.html">New Properties</a> ›
    <a href="properties.html?city=${encodeURIComponent(p.city)}">${p.city}</a> › ${p.name}</div>
  ${detailHero(p.gallery, p.photo && photo(p.photo, 1600), p.name, `
    <span class="prop-badges"><span class="pb sale">For Sale</span>${p.tags.map((t) => `<span class="pb tag">${t}</span>`).join("")}</span>
    <span class="prop-foot"><span class="pb verified">${icon("shieldCheck", 14)} Verified</span>${p.status ? `<span class="pb status">${p.status}</span>` : ""}</span>`)}
  <div class="detail-grid">
    <div>
      <div class="detail-title">
        <div>
          <h1>${p.name}</h1>
          <p class="muted" style="font-size:18px">${p.tagline}</p>
          <p class="muted with-ico">${icon("pin", 16)} ${p.location}</p>
          <p class="muted with-ico">${icon("building", 16)} By ${p.builder}</p>
        </div>
        <div><small class="muted">Price</small><div class="price">${p.price}</div>${p.emi ? `<span class="emi">EMI ${p.emi}*</span>` : ""}</div>
      </div>
      ${detailTabs(p.gallery, ["highlights", "Highlights"])}
      <div class="block" id="overview">
        <h2>Overview</h2>
        <div class="facts">
          ${fact("Price", p.price)}${fact("Price / sq.ft", p.rate)}${fact("EMI (indicative)", p.emi)}
          ${fact("Configuration", p.config)}${fact("Bathrooms", p.baths)}${fact("Property type", p.type)}
          ${fact("Status", p.status)}${fact("Developer", p.builder)}${fact("City", p.city)}
        </div>
        <p>${p.name} by ${p.builder} offers ${p.config}${kind(p)} in ${p.location}, priced ${p.price.replace(/^From /, "from ").replace("–", "to")}. Enquire with PROBRIDGE for verified details and a site visit, with zero brokerage.</p>
      </div>
      ${galleryGrid(p.gallery, "photos", "Gallery", "gallery")}
      ${galleryGrid(p.gallery, "plans", "Floor Plans &amp; Masterplan", "plans")}
      <div class="block" id="highlights"><h2>Highlights</h2>${pills(["Verified listing", "Zero brokerage", ...p.tags])}</div>
      <div class="block" id="location">
        <h2>Location</h2>
        <iframe class="map" loading="lazy" title="Map of ${p.location}"
          src="https://maps.google.com/maps?q=${encodeURIComponent(p.location)}&z=13&output=embed"></iframe>
      </div>
      <div class="block cta-row">
        <button class="btn gold-btn" data-enquire="${p.name}">Enquire Now</button>
        <button class="btn" data-enquire="${p.name}" data-need="I'd like to schedule a site visit.">Schedule Site Visit</button>
      </div>
      ${EMI_NOTE}
    </div>
    <aside class="side">
      <div class="panel">
        <h2 style="font-size:22px">Interested in ${p.name}?</h2>
        <p class="muted">Get price details and a site visit. Zero brokerage.</p>
        ${enquiryForm({ project: p.name })}
        <a class="btn full" style="margin-top:10px" href="tel:${SITE.tel}">${icon("phone", 18)} Call ${SITE.phone}</a>
      </div>
    </aside>
  </div>
  <section style="padding-bottom:0">
    <div class="head"><h2>Similar properties</h2><a class="link" href="properties.html">View all ${icon("arrow", 16)}</a></div>
    <div class="grid">${related.map(propCard).join("")}</div>
  </section>`;
}

function plotDetail(p) {
  const related = PLOTS.filter((x) => x !== p)
    .sort((a, b) => (b.locality === p.locality) - (a.locality === p.locality))
    .slice(0, 3);
  return `
  <div class="crumbs"><a href="index.html">Home</a> › <a href="plots.html">Plots</a> ›
    <a href="plots.html?loc=${encodeURIComponent(p.locality)}">${p.locality}</a> › ${p.name}</div>
  ${detailHero(p.gallery, img(PLOTS.indexOf(p), 1600), p.name, `<span class="badge">${p.status}</span>`)}
  <div class="detail-grid">
    <div>
      <div class="detail-title">
        <div>
          <h1>${p.name}</h1>
          <p class="muted with-ico">${icon("pin", 16)} ${p.locality}, Chennai · By ${p.builder}</p>
          ${p.approval ? `<p class="rera">${icon("shield", 16)} ${p.approval}</p>` : ""}
        </div>
        <div><small class="muted">Starting price</small><div class="price">${price(p)}</div></div>
      </div>
      ${detailTabs(p.gallery, p.amenities && ["amenities", "Amenities"], p.features && ["features", "Features"], p.distances && ["distances", "Distances"])}
      <div class="block" id="overview">
        <h2>Overview</h2>
        <div class="facts">
          ${fact("Price", price(p))}${fact("Plot sizes", p.sizeMin && size(p))}${fact("Project area", p.acres && p.acres + " acres")}
          ${fact("Price / sq.ft", p.rate && "₹" + p.rate.toLocaleString("en-IN"))}${fact("Facing", p.facing)}
          ${fact("Status", p.status)}${fact("Developer", p.builder)}
        </div>
        <p>${p.about || `${p.name} by ${p.builder} offers plots in ${p.locality}, Chennai, from ${price(p)}. Enquire with PROBRIDGE for verified details and a site visit, with zero brokerage.`}</p>
      </div>
      ${galleryGrid(p.gallery, "photos", "Gallery", "gallery")}
      ${galleryGrid(p.gallery, "plans", "Floor Plans &amp; Masterplan", "plans")}
      ${p.amenities ? `<div class="block" id="amenities"><h2>Amenities</h2>${pills(p.amenities)}</div>` : ""}
      ${p.features ? `<div class="block" id="features"><h2>Features</h2>${pills(p.features)}</div>` : ""}
      ${p.distances ? `<div class="block" id="distances"><h2>Distances</h2><table class="dist">
        ${p.distances.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("")}</table></div>` : ""}
      <div class="block" id="location">
        <h2>Location</h2>
        <iframe class="map" loading="lazy" title="Map of ${p.locality}"
          src="https://maps.google.com/maps?q=${encodeURIComponent(p.locality + ", Chennai")}&z=13&output=embed"></iframe>
      </div>
      <div class="block cta-row">
        <button class="btn gold-btn" data-enquire="${p.name}">Enquire Now</button>
        <button class="btn" data-enquire="${p.name}" data-need="I'd like to schedule a site visit.">Schedule Site Visit</button>
      </div>
    </div>
    <aside class="side">
      <div class="panel">
        <h2 style="font-size:22px">Interested in ${p.name}?</h2>
        <p class="muted">Get price details and a site visit. Zero brokerage.</p>
        ${enquiryForm({ project: p.name })}
        <a class="btn full" style="margin-top:10px" href="tel:${SITE.tel}">${icon("phone", 18)} Call ${SITE.phone}</a>
      </div>
    </aside>
  </div>
  <section style="padding-bottom:0">
    <div class="head"><h2>Similar plots</h2><a class="link" href="plots.html">View all ${icon("arrow", 16)}</a></div>
    <div class="grid">${related.map(plotCard).join("")}</div>
  </section>`;
}
