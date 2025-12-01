// const header = document.querySelector<HTMLElement>(".site-header");
// const nav = document.getElementById("menuppal") as HTMLElement | null;
// const hamburgerBtn = document.getElementById(
//   "hamburger"
// ) as HTMLButtonElement | null;
// const brand = document.querySelector<HTMLElement>(".brand");

// // --- botón flotante ---
// const floatingBtn = document.getElementById(
//   "floatingBtn"
// ) as HTMLElement | null;
// const btnContainer = document.getElementById(
//   "btnContainer"
// ) as HTMLElement | null;
// let btnInHeader = false;
// let originalParent: HTMLElement | null = null;

// // Guardamos la posición inicial del botón
// if (floatingBtn) {
//   originalParent = floatingBtn.parentElement;
// }

// function updateFloatingBtn() {
//   if (!floatingBtn || !btnContainer || !originalParent) return;

//   const compact = header?.classList.contains("is-compact");

//   if (compact && !btnInHeader) {
//     // mover al header
//     btnContainer.appendChild(floatingBtn);
//     floatingBtn.classList.add("visible");
//     btnInHeader = true;
//   }

//   if (!compact && btnInHeader) {
//     // regresar a su lugar original
//     originalParent.appendChild(floatingBtn);
//     floatingBtn.classList.remove("visible");
//     btnInHeader = false;
//   }
// }

// // --- comportamiento del header ---
// const MAX = 220;
// const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);
// const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));
// const progress = (): number => easeOut(clamp01(window.scrollY / MAX));
// const isMenuOpen = () =>
//   document.documentElement.classList.contains("menu-open");

// let isCompact = false;

// function syncCompact(): void {
//   const y = progress();
//   const shouldCompact = y >= 0.85;
//   if (shouldCompact === isCompact) return;
//   isCompact = shouldCompact;

//   header?.classList.toggle("is-compact", isCompact);

//   if (!nav || !hamburgerBtn) return;

//   if (isCompact) {
//     nav.style.transition = "opacity .3s ease, transform .3s ease";
//     nav.style.opacity = "0";
//     nav.style.transform = "translateY(-8px)";
//     setTimeout(() => hamburgerBtn.classList.add("visible"), 300);
//   } else {
//     hamburgerBtn.classList.remove("visible", "is-active");
//     nav.style.opacity = "1";
//     nav.style.transform = "translateY(0)";
//   }

//   updateFloatingBtn(); // <<--- integrar aquí
// }

// function syncBrand(): void {
//   if (!brand) return;

//   if (isMenuOpen()) {
//     brand.style.opacity = "1";
//     brand.style.transform = "none";
//     brand.style.transition = "opacity 0.2s linear, transform 0.2s ease-out";
//     return;
//   }

//   const y = progress();
//   const opacity = 1 - y * 1.3;
//   const translateY = y * -15;

//   brand.style.opacity = String(Math.max(0, opacity));
//   brand.style.transform = `translateY(${translateY}px)`;
//   brand.style.transition = "opacity 0.2s linear, transform 0.2s ease-out";
// }

// function rafSync(): void {
//   let ticking = false;
//   window.addEventListener(
//     "scroll",
//     () => {
//       if (ticking) return;
//       ticking = true;
//       requestAnimationFrame(() => {
//         syncCompact();
//         syncBrand();
//         ticking = false;
//       });
//     },
//     { passive: true }
//   );
// }

// // --- menú overlay (lo dejé igual) ---
// (() => {
//   const overlay = document.getElementById("menu-overlay") as HTMLElement | null;
//   const btn = hamburgerBtn;
//   if (!overlay || !btn) return;

//   const getFocusables = (): HTMLElement[] =>
//     Array.from(
//       overlay.querySelectorAll<HTMLElement>(
//         "[data-menu-link], [data-close-menu], a[href], button"
//       )
//     ).filter(
//       (el) =>
//         !el.hasAttribute("disabled") &&
//         el.tabIndex !== -1 &&
//         el.offsetParent !== null
//     );

//   let lastActive: HTMLElement | null = null;

//   function open(): void {
//     if (overlay?.classList.contains("is-open")) return;
//     document.documentElement.classList.add("menu-open");
//     document.body && document.body.classList.add("menu-open");

//     if (brand) {
//       brand.style.opacity = "1";
//       brand.style.transform = "none";
//     }

//     lastActive = (document.activeElement as HTMLElement) ?? null;

//     overlay?.classList.add("is-open");
//     overlay?.setAttribute("aria-hidden", "false");

//     btn?.classList.add("is-active");
//     btn?.setAttribute("aria-expanded", "true");
//     btn?.setAttribute("aria-label", "Close menu");

//     const first = getFocusables()[0];
//     if (first) first.focus();

//     document.dispatchEvent(new CustomEvent("bbl:menu:open"));
//   }

//   function close(): void {
//     if (!overlay?.classList.contains("is-open")) return;

//     overlay?.classList.remove("is-open");
//     overlay?.setAttribute("aria-hidden", "true");
//     document.documentElement.classList.remove("menu-open");
//     document.body && document.body.classList.remove("menu-open");

//     syncBrand();

//     btn?.classList.remove("is-active");
//     btn?.setAttribute("aria-expanded", "false");
//     btn?.setAttribute("aria-label", "Open menu");

//     if (lastActive && typeof lastActive.focus === "function")
//       lastActive.focus();

//     document.dispatchEvent(new CustomEvent("bbl:menu:close"));
//   }

//   document.addEventListener("click", (e: MouseEvent) => {
//     const t = e.target as Element | null;
//     if (!t) return;

//     if (t.closest("[data-open-menu]")) {
//       e.preventDefault();
//       overlay.classList.contains("is-open") ? close() : open();
//       return;
//     }

//     if (t.closest("[data-close-menu]")) {
//       e.preventDefault();
//       close();
//       return;
//     }

//     if (overlay.contains(t) && t.closest("a[href]")) close();
//   });

//   document.addEventListener("keydown", (e: KeyboardEvent) => {
//     if (e.key === "Escape") {
//       close();
//       return;
//     }

//     if (e.key === "Tab" && overlay.classList.contains("is-open")) {
//       const focusables = getFocusables();
//       if (!focusables.length) return;

//       const idx = focusables.indexOf(document.activeElement as HTMLElement);
//       if (e.shiftKey) {
//         if (idx <= 0) {
//           focusables[focusables.length - 1].focus();
//           e.preventDefault();
//         }
//       } else {
//         if (idx === focusables.length - 1) {
//           focusables[0].focus();
//           e.preventDefault();
//         }
//       }
//     }
//   });
// })();

// syncCompact();
// syncBrand();
// rafSync();

// window.addEventListener("resize", () => {
//   syncCompact();
//   syncBrand();
// });

// ----------------------------------------
// ELEMENTOS
// ----------------------------------------
const header = document.querySelector<HTMLElement>(".site-header");
const nav = document.getElementById("menuppal") as HTMLElement | null;
const hamburgerBtn = document.getElementById(
  "hamburger"
) as HTMLButtonElement | null;
const brand = document.querySelector<HTMLElement>(".brand");

// botón flotante
const floatingBtn = document.getElementById(
  "floatingBtn"
) as HTMLElement | null;
const btnContainer = document.getElementById(
  "btnContainer"
) as HTMLElement | null;

let btnInHeader = false;
let originalParent: HTMLElement | null = null;

// ----------------------------------------
// CAPTURAR PADRE ORIGINAL AL CARGAR
// ----------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  if (floatingBtn) {
    originalParent = floatingBtn.parentElement; // Layout correcto
  }
});

// ----------------------------------------
// MOVER BOTÓN SOLO CUANDO CAMBIA DE ESTADO
// ----------------------------------------
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

// ----------------------------------------
// LÓGICA DEL HEADER COMPACTO
// ----------------------------------------
const MAX = 220;
const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);
const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));
const progress = (): number => easeOut(clamp01(window.scrollY / MAX));

let isCompact = false;

function syncCompact(): void {
  const y = progress();
  const shouldCompact = y >= 0.85;

  if (shouldCompact === isCompact) return;

  isCompact = shouldCompact;
  header?.classList.toggle("is-compact", isCompact);

  // transiciones del nav / hamburguesa
  if (nav && hamburgerBtn) {
    if (isCompact) {
      nav.style.transition = "opacity .3s ease, transform .3s ease";
      nav.style.opacity = "0";
      nav.style.transform = "translateY(-8px)";
      setTimeout(() => hamburgerBtn.classList.add("visible"), 300);
    } else {
      hamburgerBtn.classList.remove("visible", "is-active");
      nav.style.opacity = "1";
      nav.style.transform = "translateY(0)";
    }
  }

  // SOLO aquí movemos el botón
  updateFloatingBtn();
}

// ----------------------------------------
// ANIMACIÓN DEL BRAND
// ----------------------------------------
function isMenuOpen() {
  return document.documentElement.classList.contains("menu-open");
}

function syncBrand(): void {
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

// ----------------------------------------
// RAF SCROLL LOOP
// ----------------------------------------
function rafSync(): void {
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

// ----------------------------------------
// MENÚ OVERLAY (SIN CAMBIOS)
// ----------------------------------------
(() => {
  const overlay = document.getElementById("menu-overlay") as HTMLElement | null;
  const btn = hamburgerBtn;
  if (!overlay || !btn) return;

  const getFocusables = (): HTMLElement[] =>
    Array.from(
      overlay.querySelectorAll<HTMLElement>(
        "[data-menu-link], [data-close-menu], a[href], button"
      )
    ).filter(
      (el) =>
        !el.hasAttribute("disabled") &&
        el.tabIndex !== -1 &&
        el.offsetParent !== null
    );

  let lastActive: HTMLElement | null = null;

  function open(): void {
    if (overlay!.classList.contains("is-open")) return;
    document.documentElement.classList.add("menu-open");
    document.body.classList.add("menu-open");

    if (brand) {
      brand.style.opacity = "1";
      brand.style.transform = "none";
    }

    lastActive = document.activeElement as HTMLElement;

    overlay!.classList.add("is-open");
    overlay!.setAttribute("aria-hidden", "false");

    btn!.classList.add("is-active");
    btn!.setAttribute("aria-expanded", "true");

    const first = getFocusables()[0];
    if (first) first.focus();
  }

  function close(): void {
    if (!overlay!.classList.contains("is-open")) return;

    overlay!.classList.remove("is-open");
    overlay!.setAttribute("aria-hidden", "true");

    document.documentElement.classList.remove("menu-open");
    document.body.classList.remove("menu-open");

    syncBrand();

    btn!.classList.remove("is-active");
    btn!.setAttribute("aria-expanded", "false");

    if (lastActive && lastActive.focus) lastActive.focus();
  }

  document.addEventListener("click", (e: MouseEvent) => {
    const t = e.target as Element | null;

    if (t?.closest("[data-open-menu]")) {
      e.preventDefault();
      overlay.classList.contains("is-open") ? close() : open();
    }

    if (t?.closest("[data-close-menu]")) {
      e.preventDefault();
      close();
    }

    if (overlay.contains(t) && t!!.closest("a[href]")) close();
  });

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  });
})();

// ----------------------------------------
// INICIALIZAR
// ----------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  syncCompact();
  syncBrand();
  rafSync();
});

window.addEventListener("resize", () => {
  syncCompact();
  syncBrand();
});
