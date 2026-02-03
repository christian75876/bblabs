// Generated from src/scripts/menuHover.ts to avoid TS MIME issues in production.

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const links = document.querySelectorAll("#mainNav a[data-menu-link]");
  const desktopList = document.getElementById("previewList");
  if (!nav || links.length === 0) return;

  const mm = window.matchMedia("(max-width: 768px)");
  const isMobile = () => mm.matches;

  const content = {
    home: [
      "Conectamos talento, ideas y resultados.",
      "Para empresas que quieren ir más lejos.",
      "Somos el respaldo que potencia tu operación diaria.",
      "Integramos personas, procesos y tecnología en una misma dirección.",
      "Creemos en las alianzas que impulsan el crecimiento sostenible.",
      "Nuestro enfoque humano y estratégico marca la diferencia.",
      "Más que un proveedor, somos tu socio de evolución empresarial.",
    ],

    about: [
      "Comprometidos con el progreso de tu empresa.",
      "Talento especializado, espacios de trabajo y soporte estratégico.",
      "Crecemos contigo: cercanía, eficiencia y compromiso.",
      "Acompañamos a las organizaciones en su camino hacia la excelencia.",
      "Innovamos para fortalecer tus operaciones y tu equipo humano.",
      "Nuestra misión: transformar desafíos en oportunidades.",
      "Nos mueve la confianza, la colaboración y el impacto positivo.",
    ],

    services: [
      "Staffing especializado para proyectos críticos.",
      "Espacios flexibles: coworking, oficinas y salas colaborativas.",
      "Soporte estratégico y operacional a medida.",
      "Gestión integral del talento: selección, formación y acompañamiento.",
      "Soluciones ágiles para equipos que no se detienen.",
      "Infraestructura y soporte para tu día a día empresarial.",
      "Transforma tus operaciones con eficiencia, innovación y enfoque humano.",
    ],

    contact: [
      "Contáctanos y da el siguiente paso.",
      "Estamos listos para escuchar tus ideas y construir juntos.",
      "Cada proyecto comienza con una buena conversación.",
      "Tu próximo aliado estratégico está a un mensaje de distancia.",
      "Hablemos sobre cómo potenciar tu empresa.",
      "Resolvemos hoy los retos que marcarán tu mañana.",
      "Conversemos y llevemos tu operación al siguiente nivel.",
    ],
    coworking: [
      "Explora nuestros espacios de coworking.",
      "Conecta, crea y colabora en un entorno diseñado para inspirar.",
      "Donde las ideas se encuentran y los proyectos despegan.",
      "Un espacio moderno, flexible y lleno de energía.",
      "Eventos, networking y comunidad: mucho más que una oficina.",
      "La Velada: tu punto de encuentro para crecer y compartir.",
      "Haz del trabajo una experiencia inspiradora.",
    ],
  };

  const normalizeKey = (rawKey, href) => {
    if (!rawKey && !href) return "home";
    try {
      const base = window.location.origin;
      const url = new URL(href || rawKey || "", base);
      if (url.origin !== base)
        return `external:${url.hostname.replace(/^www\./, "")}`;
      const locales = ["es", "en", "pt", "fr"];
      const parts = url.pathname.replace(/^\/+/, "").split("/").filter(Boolean);
      if (parts.length && locales.includes(parts[0])) parts.shift();
      return (parts[0] || "home").toLowerCase();
    } catch {
      const clean = (rawKey || "").replace(/^\/+|\/+$/g, "");
      return clean || "home";
    }
  };

  const fillList = (ul, items) => {
    ul.innerHTML = items.map((t) => `<li>${t}</li>`).join("");
  };
  const expand = (ul) => {
    ul.classList.remove("opacity-0");
    ul.classList.add("opacity-100");
    ul.style.maxHeight = ul.scrollHeight + "px";
  };
  const collapse = (ul) => {
    ul.classList.remove("opacity-100");
    ul.classList.add("opacity-0");
    ul.style.maxHeight = "0px";
    window.setTimeout(() => (ul.innerHTML = ""), 200);
  };
  const collapseAllExcept = (except) => {
    nav.querySelectorAll("ul[data-submenu]").forEach((u) => {
      if (u !== except) {
        u.removeAttribute("data-open");
        collapse(u);
      }
    });
  };

  let clearTimer = null;
  const showDesktop = (key) => {
    if (!desktopList) return;
    const items = content[key] || [];
    desktopList.innerHTML = items
      .map((t, i) => {
        const delay = i * 70;
        return `<li class=\"opacity-0 translate-y-2 transition duration-300 ease-out\" style=\"transition-delay:${delay}ms\">${t}</li>`;
      })
      .join("");
    requestAnimationFrame(() => {
      desktopList.classList.remove("opacity-0", "translate-y-2");
      desktopList.classList.add("opacity-100", "translate-y-0");
      desktopList.querySelectorAll("li").forEach((li) => {
        requestAnimationFrame(() => {
          li.classList.remove("opacity-0", "translate-y-2");
          li.classList.add("opacity-100", "translate-y-0");
        });
      });
    });
  };
  const clearDesktop = () => {
    if (!desktopList) return;
    desktopList.classList.remove("opacity-100", "translate-y-0");
    desktopList.classList.add("opacity-0", "translate-y-2");
    window.setTimeout(() => (desktopList.innerHTML = ""), 180);
  };
  const setupDesktop = () => {
    links.forEach((link) => {
      const rawKey = link.dataset.key || "";
      const href = link.getAttribute("href") || "";
      const key = normalizeKey(rawKey, href);
      const enter = () => {
        if (clearTimer) {
          window.clearTimeout(clearTimer);
          clearTimer = null;
        }
        showDesktop(key);
      };
      link.addEventListener("pointerenter", enter);
      link.addEventListener("focus", enter);
    });
    nav.addEventListener("pointerleave", () => {
      clearTimer = window.setTimeout(() => clearDesktop(), 80);
    });
    nav.addEventListener("focusout", (e) => {
      const rel = e.relatedTarget;
      if (!rel || !nav.contains(rel)) {
        clearTimer = window.setTimeout(() => clearDesktop(), 80);
      }
    });
  };

  const init = () => {
    nav.querySelectorAll("ul[data-submenu]").forEach((u) => {
      u.removeAttribute("data-open");
      u.style.maxHeight = "0px";
      u.classList.add("opacity-0");
      u.innerHTML = "";
    });
    if (desktopList) {
      desktopList.innerHTML = "";
      desktopList.classList.add("opacity-0", "translate-y-2");
    }
    if (!isMobile()) setupDesktop();
  };

  init();
  mm.addEventListener && mm.addEventListener("change", init);
});
