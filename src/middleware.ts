import { defineMiddleware } from "astro/middleware";

const SUPPORTED = ["en", "es"] as const;
type Lang = (typeof SUPPORTED)[number];

const DEFAULT: Lang = "en";

function isLang(v: string): v is Lang {
  return (SUPPORTED as readonly string[]).includes(v);
}

function isFile(pathname: string) {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  const url = new URL(ctx.request.url);
  const pathname = url.pathname;

  // ✅ No tocar assets ni rutas internas
  if (
    pathname.startsWith("/_astro") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap") ||
    isFile(pathname)
  ) {
    return next();
  }

  if (pathname === "/404" || pathname === "/404/" || pathname === "/404.html") {
    return next();
  }

  const [, maybeLang = ""] = pathname.split("/");
  const lang = isLang(maybeLang) ? maybeLang : null;

  if (!lang) {
    const accept = (
      ctx.request.headers.get("accept-language") || ""
    ).toLowerCase();
    const chosen: Lang = accept.startsWith("es") ? "es" : DEFAULT;

    const target = `/${chosen}${pathname}`.replace(/\/{2,}/g, "/");
    return ctx.redirect(`${target}${url.search}`, 307);
  }

  ctx.locals.lang = lang;
  return next();
});
