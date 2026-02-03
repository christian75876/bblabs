// Generated from src/scripts/header-compact.ts to avoid TS MIME issues in production.

const header = document.querySelector(".site-header");
const nav = document.getElementById("menuppal");
const hamburgerBtn = document.getElementById("hamburger");
const brand = document.querySelector(".brand");

// botón flotante
const floatingBtn = document.getElementById("floatingBtn");
const btnContainer = document.getElementById("btnContainer");

let btnInHeader = false;
let originalParent = null;

// capturar padre original al cargar
window.addEventListener("DOMContentLoaded", () => {
  if (floatingBtn) {
    originalParent = floatingBtn.parentElement;
  }
});

function updateFloatingBtn() {
  if (!floatingBtn || !btnContainer || !originalParent) return;

  if (isCompact && !btnInHeader) {
    btnContainer.appendChild(floatingBtn);
    floatingBtn.classList.add("visible");
    btnInHeader = true;
  }

  if (!isCompact && btnInHeader) {
    originalParent.appendChild(floatingBtn);
    floatingBtn.classList.remove("visible");
    btnInHeader = false;
  }
}

// header compacto
const MAX = 220;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const progress = () => easeOut(clamp01(window.scrollY / MAX));

let isCompact = false;

function syncCompact() {
  const y = progress();
  const shouldCompact = y >= 0.85;

  if (shouldCompact === isCompact) return;

  isCompact = shouldCompact;
  if (header) header.classList.toggle("is-compact", isCompact);

  if (nav && hamburgerBtn) {
    if (isCompact) {
      nav.style.transition = "opacity .3s ease, transform .3s ease";
      nav.style.opacity = "0";
      nav.style.transform = "translateY(-8px)";
      window.setTimeout(() => hamburgerBtn.classList.add("visible"), 300);
    } else {
      hamburgerBtn.classList.remove("visible", "is-active");
      nav.style.opacity = "1";
      nav.style.transform = "translateY(0)";
    }
  }

  updateFloatingBtn();
}

function isMenuOpen() {
  return document.documentElement.classList.contains("menu-open");
}

function syncBrand() {
  if (!brand) return;

  if (isMenuOpen()) {
    brand.style.opacity = "1";
    brand.style.transform = "none";
    return;
  }

  const y = progress();
  const opacity = 1 - y * 1.3;
  const translateY = y * -15;

  brand.style.opacity = String(Math.max(0, opacity));
  brand.style.transform = `translateY(${translateY}px)`;
}

function rafSync() {
  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        syncCompact();
        syncBrand();
        ticking = false;
      });
    },
    { passive: true }
  );
}

// menú overlay
(() => {
  const overlay = document.getElementById("menu-overlay");
  const btn = hamburgerBtn;
  if (!overlay || !btn) return;

  const getFocusables = () =>
    Array.from(
      overlay.querySelectorAll(
        "[data-menu-link], [data-close-menu], a[href], button"
      )
    ).filter(
      (el) =>
        !el.hasAttribute("disabled") &&
        el.tabIndex !== -1 &&
        el.offsetParent !== null
    );

  let lastActive = null;

  function open() {
    if (overlay.classList.contains("is-open")) return;
    document.documentElement.classList.add("menu-open");
    document.body.classList.add("menu-open");

    if (brand) {
      brand.style.opacity = "1";
      brand.style.transform = "none";
    }

    lastActive = document.activeElement;

    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");

    btn.classList.add("is-active");
    btn.setAttribute("aria-expanded", "true");

    const first = getFocusables()[0];
    if (first) first.focus();
  }

  function close() {
    if (!overlay.classList.contains("is-open")) return;

    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");

    document.documentElement.classList.remove("menu-open");
    document.body.classList.remove("menu-open");

    syncBrand();

    btn.classList.remove("is-active");
    btn.setAttribute("aria-expanded", "false");

    if (lastActive && typeof lastActive.focus === "function") lastActive.focus();
  }

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;

    if (t.closest("[data-open-menu]")) {
      e.preventDefault();
      overlay.classList.contains("is-open") ? close() : open();
    }

    if (t.closest("[data-close-menu]")) {
      e.preventDefault();
      close();
    }

    if (overlay.contains(t) && t.closest("a[href]")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();

// init
window.addEventListener("DOMContentLoaded", () => {
  syncCompact();
  syncBrand();
  rafSync();
});

window.addEventListener("resize", () => {
  syncCompact();
  syncBrand();
});
