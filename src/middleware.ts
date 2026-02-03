import { defineMiddleware } from "astro/middleware";

const SUPPORTED = ["en", "es"] as const;
type Lang = (typeof SUPPORTED)[number];

function isLang(v: string): v is Lang {
  return (SUPPORTED as readonly string[]).includes(v);
}

const DEFAULT: Lang = "en";

export const onRequest = defineMiddleware(async (ctx, next) => {
  const url = new URL(ctx.request.url);
  const [, maybeLang = ""] = url.pathname.split("/");

  const isPublicFile = /\.[^/]+$/.test(url.pathname);
  if (isPublicFile) {
    return next();
  }

  let lang: Lang | null = isLang(maybeLang) ? maybeLang : null;

  if (!lang) {
    if (url.pathname.startsWith("/404") || url.pathname.startsWith("/500")) {
      return next();
    }
    const accept = (
      ctx.request.headers.get("accept-language") || ""
    ).toLowerCase();
    lang = accept.startsWith("es") ? "es" : DEFAULT;
    return ctx.redirect(`/${lang}${url.pathname}${url.search}`, 307);
  }

  ctx.locals.lang = lang;
  return next();
});
