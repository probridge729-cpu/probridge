// Page behaviour for every page: menu, carousels, enquiry popup + forms (Web3Forms), year.
// Markup comes from partials/ (header, footer) and render.js; this file only wires it up.

// Web3Forms access key (account: info@probridge.co.in, form "PROBRIDGE Website Enquiry"; free plan, 250/month).
// It is a public key by design. If emptied, the form hands the enquiry to WhatsApp instead.
// Later: switch to a PHP endpoint on cPanel (see README).
const WEB3FORMS_KEY = "09e3f81e-ac70-4d09-b1a9-ab267696d337";

// ---------- Header ----------
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

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

// ---------- Carousels: <div data-carousel> containing .track, [data-prev], [data-next] ----------
// At the ends, overlay arrows (.arrow) hide; other buttons are disabled (faded).
function carousel(track, prev, next) {
  const off = (b, v) => (b.classList.contains("arrow") ? (b.hidden = v) : (b.disabled = v));
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
document.querySelectorAll("[data-carousel]").forEach((c) =>
  carousel(c.querySelector(".track"), c.querySelector("[data-prev]"), c.querySelector("[data-next]")));

// ---------- Gallery lightbox: thumbnails are links to the full image, so it still works without JS ----------
const lb = document.getElementById("lightbox");
if (lb) {
  const lbImg = lb.querySelector("img");
  let items = [], at = 0;
  const show = (i) => {
    at = (i + items.length) % items.length;
    const a = items[at];
    lbImg.src = a.href;
    lbImg.alt = a.dataset.caption || "";
    lb.querySelector(".lb-cap").textContent = a.dataset.caption || "";
    lb.querySelector(".lb-count").textContent = `${at + 1} / ${items.length}`;
    lb.querySelectorAll(".lb-nav").forEach((b) => (b.hidden = items.length < 2));
  };
  const open = (list, i) => {
    items = list;
    show(i);
    if (!lb.open) lb.showModal();
  };
  document.addEventListener("click", (e) => {
    const thumb = e.target.closest("[data-gallery] a");
    const all = e.target.closest(".g-all");
    if (!thumb && !all) return;
    e.preventDefault();
    const grid = thumb ? thumb.closest("[data-gallery]") : document.querySelector("[data-gallery]");
    const list = [...grid.querySelectorAll("a")];
    open(list, thumb ? list.indexOf(thumb) : 0);
  });
  lb.querySelector(".lb-prev").onclick = () => show(at - 1);
  lb.querySelector(".lb-next").onclick = () => show(at + 1);
  lb.querySelector(".lb-close").onclick = () => lb.close();
  lb.addEventListener("click", (e) => e.target === lb && lb.close());
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(at - 1);
    if (e.key === "ArrowRight") show(at + 1);
  });
  let x0 = null; // swipe on touch screens
  lb.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - x0;
    if (x0 !== null && Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1));
    x0 = null;
  });
}

// ---------- Enquiry form ----------
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

const clean = (s) => String(s || "").replace(/[<>&"]/g, "");

async function submitEnquiry(form) {
  const status = form.querySelector(".form-status");
  status.className = "form-status";
  if (fieldOf(form, "botcheck").checked) return; // honeypot: bots tick hidden fields
  if (!validate(form)) return;
  const f = new FormData(form);
  markPopupSeen(); // don't auto-open the popup after someone has enquired

  if (!WEB3FORMS_KEY) {
    const text = ["Hi PROBRIDGE, I have an enquiry.",
      f.get("project") && "Project: " + f.get("project"),
      "Name: " + f.get("name"), "Phone: " + f.get("phone"),
      f.get("email") && "Email: " + f.get("email"),
      f.get("message") && "Message: " + f.get("message")].filter(Boolean).join("\n");
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    status.textContent = "WhatsApp has opened with your enquiry. Please press Send in WhatsApp to reach us.";
    return;
  }

  f.append("access_key", WEB3FORMS_KEY);
  f.append("subject", `New enquiry${f.get("project") ? " – " + f.get("project") : ""} | PROBRIDGE website`);
  f.append("from_name", "PROBRIDGE Website");
  f.append("page", document.title + " — " + location.href);
  if (f.get("email")) f.append("replyto", f.get("email"));
  f.delete("botcheck");

  const btn = form.querySelector("[type=submit]");
  btn.disabled = true;
  status.textContent = "Sending…";
  try {
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: f, headers: { Accept: "application/json" } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error(data.message || res.status);
    form.innerHTML = `<div class="success">${icon("check", 28)}<h3>Thank you, ${clean(f.get("name"))}.</h3>
      <p>We've received your enquiry. A PROBRIDGE advisor will contact you on ${clean(f.get("phone"))} soon.</p></div>`;
  } catch {
    status.classList.add("is-error");
    status.innerHTML = `Sorry, we couldn't send your enquiry. Please try again, or call <a href="tel:${SITE.tel}">${SITE.phone}</a>.`;
    btn.disabled = false;
  }
}
document.addEventListener("submit", (e) => {
  if (!e.target.matches("form.enquiry")) return;
  e.preventDefault();
  submitEnquiry(e.target);
});

// ---------- Enquire popup: data-enquire="Project name", data-need="Prefilled message" ----------
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
