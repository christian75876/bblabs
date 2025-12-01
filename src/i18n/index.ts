export type Lang = "en" | "es";
export async function loadDict(lang: Lang) {
  return (await import(`./${lang}.json`)).default;
}
