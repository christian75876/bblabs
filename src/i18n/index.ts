export type Lang = "en" | "es";

const DICTS: Record<Lang, () => Promise<any>> = {
  en: () => import("./en.json"),
  es: () => import("./es.json"),
};

export async function loadDict(lang: Lang) {
  const mod = await DICTS[lang]();
  return mod.default;
}
