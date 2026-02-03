import type { NavItem } from "@/types/navigation";
import type { Dictionary } from "@/i18n/types";

export function getRawPages(t: Dictionary, prefix: string): NavItem[] {
  return [
    { name: t.nav.home, path: `${prefix}/` },
    { name: t.nav.about, path: `${prefix}/about` },
    { name: t.nav.services, path: `${prefix}/services` },
    { name: t.nav.contact, path: `${prefix}/contact` },
    { name: t.nav.coworking, href: `${prefix}/coworking`, external: true },
  ];
}
