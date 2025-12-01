export const SUPPORTED = ["en", "es"] as const;
export type Lang = (typeof SUPPORTED)[number];
export const DEFAULT_LANG: Lang = "en";
export const getStaticLangPaths = () =>
  SUPPORTED.map((lang) => ({ params: { lang } }));
