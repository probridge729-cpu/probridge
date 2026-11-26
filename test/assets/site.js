// Shared header, footer, enquiry form/popup, icons and helpers for every page.

// Primary contact details (brief §10).
const SITE = {
  phone: "+91 76670 05000",
  tel: "+917667005000",
  whatsapp: "917200141515",
  whatsappLabel: "+91 72001 41515",
  email: "projects@probridge.co.in",
  address: "First Floor, No. 10B, Ekambaram Industrial Estate Rd, Alapakkam, Karpaga Vinayagar Colony, Valasaravakkam, Chennai, Tamil Nadu 600116"
};

// TODO(client): set a form backend (e.g. Formspree / Web3Forms / CRM webhook URL that accepts
// a POST of FormData and returns 2xx). While empty, enquiries are handed to WhatsApp instead.
const FORM_ENDPOINT = "";

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

const lakh = (l) => (l >= 100 ? +(l / 100).toFixed(2) + " Cr" : +l.toFixed(2) + " L");
const price = (p) => "₹" + lakh(p.min) + (p.max ? " – " + lakh(p.max) : " onwards");
const size = (p) =>
  p.sizeMin ? `${p.sizeMin.toLocaleString("en-IN")} – ${p.sizeMax.toLocaleString("en-IN")} sq.ft` : `${p.acres} acres`;

const photo = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

// Property card (homepage carousel, properties.html, related on property.html).
function propCard(p) {
  const url = `property.html?id=${p.id}`;
  return `<article class="prop-card">
    <a class="card-img" href="${url}" tabindex="-1" aria-hidden="true" style="background-image:url('${photo(p.photo)}')">
      <span class="prop-badges"><span class="pb sale">For Sale</span>${p.tags.map((t) => `<span class="pb tag">${t}</span>`).join("")}</span>
      <span class="prop-foot"><span class="pb verified">${icon("shieldCheck", 14)} Verified</span><span class="pb status">${p.status}</span></span>
    </a>
    <div class="prop-body">
      <div class="prop-price"><b>${p.price}</b><span>${p.rate}</span></div>
      <span class="emi">EMI ${p.emi}*</span>
      <h3><a href="${url}">${p.name}<span> – ${p.tagline}</span></a></h3>
      <p class="with-ico muted">${icon("pin", 16)} ${p.location}</p>
      <p class="with-ico muted">${icon("building", 16)} ${p.builder}</p>
      <div class="chips"><span>${icon("bed", 16)} ${p.config}</span><span>${icon("bath", 16)} ${p.baths}</span></div>
      <div class="prop-actions">
        <a class="btn navy-btn" href="${url}">View Details ${icon("arrow", 16)}</a>
        <button type="button" class="btn" data-enquire="${p.name}">Enquire Now</button>
      </div>
    </div></article>`;
}

// Horizontal scroll-snap carousel. At the ends, overlay arrows (.arrow) hide; other buttons are disabled (faded).
function carousel(track, prev, next) {
  const off = (b, v) => (b.classList.contains("arrow") ? (b.hidden = v) : (b.disabled = v));
  prev.innerHTML = icon("left", 22);
  next.innerHTML = icon("right", 22);
  const step = () => track.firstElementChild.offsetWidth + 16;
  prev.onclick = () => track.scrollBy({ left: -step(), behavior: "smooth" });
  next.onclick = () => track.scrollBy({ left: step(), behavior: "smooth" });
  const sync = () => {
    off(prev, track.scrollLeft <= 2);
    off(next, track.scrollLeft >= track.scrollWidth - track.clientWidth - 2);
  };
  track.addEventListener("scroll", sync, { passive: true });
  addEventListener("resize", sync);
  addEventListener("load", sync);
  sync();
}

function plotCard(p) {
  const i = PLOTS.indexOf(p);
  return `<a class="card" href="plot.html?id=${p.id}">
    <div class="card-img" style="background-image:url('${img(i, 700)}')"><span class="badge">${p.status}</span><span class="rep">Representative image</span></div>
    <div class="card-body">
      <h3>${p.name}</h3>
      <p class="muted with-ico">${icon("pin", 16)} ${p.locality}, Chennai</p>
      <p class="muted">${size(p)}</p>
      <div class="card-foot"><b>${price(p)}</b><span class="link">View details ${icon("arrow", 16)}</span></div>
    </div></a>`;
}

// Enquiry form (brief §9). Name + phone required; email validated when given.
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
    <input type="text" name="company" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
    ${field("name", "Name *", '<input required autocomplete="name" />')}
    ${field("phone", "Mobile *", '<div class="tel-wrap"><span class="cc" aria-hidden="true">+91</span><input required type="tel" inputmode="tel" autocomplete="tel-national" placeholder="10-digit mobile number" /></div>')}
    ${field("email", "Email", '<input type="email" autocomplete="email" placeholder="you@example.com" />')}
    ${field("message", "Requirement", `<textarea rows="3" placeholder="Please share your requirement here — location, budget, timeline…">${message}</textarea>`)}
    <div class="consent">
      <label><input type="checkbox" name="consent" id="consent-${n}" required aria-describedby="consent-${n}-err" />
      <span>I authorise PROBRIDGE and its representatives to contact me about my enquiry via call, SMS, WhatsApp and email.</span></label>
      <!-- TODO(client): link the Privacy Policy and Terms once those pages exist. -->
      <small class="err" id="consent-${n}-err"></small>
    </div>
    <button class="btn gold-btn full" type="submit">${submit}</button>
    <p class="form-status" role="status" aria-live="polite"></p>
  </form>`;
}

const PHONE_RE = /^(\+?91)?[6-9]\d{9}$/;
const fieldOf = (form, k) => form.elements.namedItem(k);
function validate(form) {
  const [name, phone, email, consent] = ["name", "phone", "email", "consent"].map((k) => fieldOf(form, k));
  const errs = {
    name: !name.value.trim() && "Please enter your name.",
    phone: !phone.value.trim()
      ? "Please enter your phone number."
      : !PHONE_RE.test(phone.value.replace(/[\s-]/g, "")) && "Enter a valid 10-digit Indian mobile number.",
    email: email.value.trim() && !email.checkValidity() && "Enter a valid email address, e.g. name@example.com.",
    consent: !consent.checked && "Please agree to be contacted so we can respond to your enquiry."
  };
  let first;
  for (const [k, msg] of Object.entries(errs)) {
    const el = fieldOf(form, k);
    el.setAttribute("aria-invalid", !!msg);
    form.querySelector(`#${el.id}-err`).textContent = msg || "";
    if (msg && !first) first = el;
  }
  first?.focus();
  return !first;
}

async function submitEnquiry(form) {
  const status = form.querySelector(".form-status");
  status.className = "form-status";
  if (fieldOf(form, "company").value) return; // honeypot: bots fill hidden fields
  if (!validate(form)) return;
  const f = new FormData(form);
  f.delete("company");
  markPopupSeen(); // don't auto-open the popup after someone has enquired

  if (!FORM_ENDPOINT) {
    const text = ["Hi PROBRIDGE, I have an enquiry.",
      f.get("project") && "Project: " + f.get("project"),
      "Name: " + f.get("name"), "Phone: " + f.get("phone"),
      f.get("email") && "Email: " + f.get("email"),
      f.get("message") && "Message: " + f.get("message")].filter(Boolean).join("\n");
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    status.textContent = "WhatsApp has opened with your enquiry. Please press Send in WhatsApp to reach us.";
    return;
  }

  const btn = form.querySelector("[type=submit]");
  btn.disabled = true;
  status.textContent = "Sending…";
  try {
    const res = await fetch(FORM_ENDPOINT, { method: "POST", body: f, headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(res.status);
    form.innerHTML = `<div class="success">${icon("check", 28)}<h3>Thank you, ${f.get("name").replace(/[<>&"]/g, "")}.</h3>
      <p>We've received your enquiry. A PROBRIDGE advisor will contact you on ${f.get("phone").replace(/[<>&"]/g, "")} soon.</p></div>`;
  } catch {
    status.classList.add("is-error");
    status.innerHTML = `Sorry, we couldn't send your enquiry. Please try again, or call <a href="tel:${SITE.tel}">${SITE.phone}</a>.`;
  } finally {
    btn.disabled = false;
  }
}
document.addEventListener("submit", (e) => {
  if (!e.target.matches("form.enquiry")) return;
  e.preventDefault();
  submitEnquiry(e.target);
});

// Header / footer
const page = location.pathname.split("/").pop() || "index.html";
const onHome = page === "index.html";
const home = (hash) => (onHome ? hash : "index.html" + hash);
const NAV = [
  ["About Us", home("#about")],
  ["New Project", home("#projects")],
  ["New Plot", "plots.html"],
  ["Properties", [["New Properties", "properties.html"], ["Plots for Sale", "plots.html"], ["Apartments", home("#choice")], ["Rental Services", home("#services")]]],
  ["Awards", "awards.html"],
  ["Builders", home("#builders")]
];
const navHTML = NAV.map(([label, href]) =>
  Array.isArray(href)
    ? `<div class="dd"><button type="button" class="dd-btn" aria-expanded="false">${label} ${icon("down", 16)}</button>
         <div class="dd-menu">${href.map(([l, h]) => `<a href="${h}">${l}</a>`).join("")}</div></div>`
    : `<a href="${href}"${href === page ? ' aria-current="page"' : ""}>${label}</a>`
).join("");

document.getElementById("site-header").outerHTML = `
<a class="skip" href="#main">Skip to content</a>
<header class="header"><div class="wrap nav">
  <a href="index.html" class="logo"><img src="assets/probridge-logo.png" alt="PROBRIDGE – We Connect World of Real Estate" width="1315" height="255" /></a>
  <nav id="menu" aria-label="Main">${navHTML}</nav>
  <div class="actions">
    <a class="icon-btn" href="tel:${SITE.tel}" aria-label="Call ${SITE.phone}">${icon("phone")}</a>
    <a class="icon-btn wa" href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp ${SITE.whatsappLabel}">${icon("chat")}</a>
    <button type="button" class="btn gold-btn" data-enquire>Enquire Now</button>
    <button type="button" class="burger" aria-label="Menu" aria-expanded="false" aria-controls="menu">${icon("menu", 24)}</button>
  </div>
</div></header>`;

document.getElementById("site-footer").outerHTML = `
<footer class="footer"><div class="wrap foot-grid">
  <div>
    <a href="index.html" class="foot-logo"><img src="assets/probridge-logo.png" alt="PROBRIDGE" width="1315" height="255" loading="lazy" /></a>
    <p class="foot-tag">We Connect World of Real Estate.</p>
    <p>PROBRIDGE connects people with property buying, selling, rental, interior and home-maintenance services — without brokerage.</p>
  </div>
  <div><h2>Quick Links</h2><ul>
    ${NAV.map(([l, h]) => `<li><a href="${Array.isArray(h) ? "properties.html" : h}">${l}</a></li>`).join("")}
  </ul></div>
  <div><h2>Services</h2><ul>
    ${["Buy Property", "Sell Property", "Rental Services", "Interior Connections", "Home Maintenance"]
      .map((s) => `<li><a href="${home("#enquire")}" data-service="${s}">${s}</a></li>`).join("")}
  </ul></div>
  <div><h2>Get in Touch</h2><ul class="contact-list">
    <li>${icon("phone", 18)}<a href="tel:${SITE.tel}">${SITE.phone}</a></li>
    <li>${icon("mail", 18)}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
    <li>${icon("chat", 18)}<a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp ${SITE.whatsappLabel}</a></li>
    <li>${icon("pin", 18)}<span>${SITE.address}</span></li>
  </ul></div>
</div>
<div class="wrap copy"><span>© ${new Date().getFullYear()} PROBRIDGE. All rights reserved.</span>
<span>Project details are subject to official confirmation by the respective developers.</span></div>
</footer>
<div class="mobile-bar">
  <a href="tel:${SITE.tel}">${icon("phone", 18)} Call</a>
  <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">${icon("chat", 18)} WhatsApp</a>
  <button type="button" data-enquire>Enquire Now</button>
</div>
<dialog id="enquiry" aria-labelledby="enquiry-title"></dialog>`;

const header = document.querySelector(".header");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 8), { passive: true });

const burger = document.querySelector(".burger");
burger.onclick = () => burger.setAttribute("aria-expanded", document.body.classList.toggle("menu-open"));
document.querySelectorAll("#menu a").forEach((a) => a.addEventListener("click", () => {
  document.body.classList.remove("menu-open");
  burger.setAttribute("aria-expanded", false);
}));
document.querySelectorAll(".dd-btn").forEach((b) => (b.onclick = () =>
  b.setAttribute("aria-expanded", b.getAttribute("aria-expanded") !== "true")));

// Enquire popup. data-enquire="Project name", data-need="Prefilled message".
const dlg = document.getElementById("enquiry");
document.addEventListener("click", (e) => {
  const svc = e.target.closest("[data-service]");
  if (svc) {
    const msg = document.querySelector("#enquire form.enquiry textarea");
    if (msg) msg.value = `I'm interested in: ${svc.dataset.service}`;
  }
  const b = e.target.closest("[data-enquire]");
  if (b) openEnquiry(b.dataset.enquire || "", b.dataset.need || "");
});

function openEnquiry(project = "", message = "") {
  markPopupSeen();
  // TODO(client): replace the representative image with an approved PROBRIDGE photo.
  dlg.innerHTML = `<button type="button" class="close" aria-label="Close">${icon("close", 22)}</button>
  <div class="dlg-split">
    <div class="dlg-media" style="background-image:url('${img(1, 900)}')">
      <div class="dlg-media-text">
        <span class="eyebrow">Zero Brokerage</span>
        <p>Your Property Journey, Made Simple.</p>
      </div>
      <span class="rep">Representative image</span>
    </div>
    <div class="dlg-body">
      <h2 id="enquiry-title">Expert Consultation by <span class="gold">Professionals</span></h2>
      <img class="dlg-logo" src="assets/probridge-logo.png" alt="PROBRIDGE" width="1315" height="255" />
      ${project ? `<p class="dlg-project">Enquiry for <b>${project}</b></p>` : ""}
      ${enquiryForm({ project, message })}
    </div></div>`;
  dlg.querySelector(".close").onclick = () => dlg.close();
  dlg.showModal();
}
dlg.addEventListener("click", (e) => e.target === dlg && dlg.close()); // click backdrop to close

// Auto-open the enquiry popup 45 s after load, once per browser session.
const POPUP_KEY = "probridge-popup-seen";
function markPopupSeen() {
  try { sessionStorage.setItem(POPUP_KEY, "1"); } catch {}
}
function popupSeen() {
  try { return sessionStorage.getItem(POPUP_KEY) === "1"; } catch { return false; }
}
if (!popupSeen()) {
  setTimeout(() => {
    const typing = document.activeElement?.closest?.("form");
    if (!popupSeen() && !dlg.open && !typing) openEnquiry();
  }, 45000);
}
