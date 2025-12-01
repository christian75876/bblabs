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

  let lang: Lang | null = isLang(maybeLang) ? maybeLang : null;

  if (!lang) {
    const accept = (
      ctx.request.headers.get("accept-language") || ""
    ).toLowerCase();
    lang = accept.startsWith("es") ? "es" : DEFAULT;
    return ctx.redirect(`/${lang}${url.pathname}${url.search}`, 307);
  }

  ctx.locals.lang = lang; // ✅ Lang, sin TS2322
  return next();
});
