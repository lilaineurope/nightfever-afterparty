// The breadcrumb trail for one address (Lisa, 27 Nov 2026: on every page). Pure, so src/data/breadcrumbs.test.ts can
// check every page kind. The trail goes Home, then the section a visitor would browse to find the page, then the page.
import { episodes } from "@/data/episodes";
import { OTHER_PAGES, PAGES, UNLINKED_PAGES } from "@/lib/pages";

export type Crumb = { name: string; to?: string | undefined };

const HOME: Crumb = { name: "Home", to: "/" };
// AFTERPARTY is always upper case (Lisa); the menu's "A–Z" stays short.
const SECTION_NAME: Record<string, string> = { "/episodes": "AFTERPARTY" };
const SECTIONS: Record<string, string> = Object.fromEntries(
  [...PAGES, ...OTHER_PAGES, ...UNLINKED_PAGES].map((p) => [p.to, SECTION_NAME[p.to] ?? p.label]),
);
const section = (to: string): Crumb => ({ name: SECTIONS[to] ?? to, to });
const LIBRARY = section("/library");
const libraryCategory = (cat: "art" | "moving-images" | "publications"): Crumb =>
  cat === "art"
    ? { name: "Cover art & posters", to: "/library?cat=art" }
    : cat === "moving-images"
      ? { name: "Moving Images", to: "/library?cat=moving-images" }
      : { name: "Publications", to: "/library" };

const str = (v: unknown): string | undefined => (typeof v === "string" && v ? v : undefined);
const obj = (v: unknown): Record<string, unknown> | undefined => (v && typeof v === "object" ? (v as Record<string, unknown>) : undefined);

/** Pages that are not for visitors (admin, unsubscribe, test shop, redirects) get no trail. */
const NO_TRAIL = /^\/(guestbook\/admin|unsubscribe|shop-test|spotify)(\/|$)/;

export function breadcrumbsFor(pathname: string, data?: Record<string, unknown>): Crumb[] {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/" || NO_TRAIL.test(path)) return [];
  const here = (name: string): Crumb => ({ name });

  // Episode pages: Home › AFTERPARTY › S2E10 · Brian Belovitch
  const ep = path.match(/^\/episodes\/(s\d\de\d\d[ab]?)$/);
  if (ep) {
    const e = episodes.find((x) => x.id === ep[1]);
    if (!e) return [];
    return [HOME, section("/episodes"), here(`S${e.season}E${e.episode}${e.part ?? ""} · ${e.guest}`)];
  }

  // A–Z pages: clubs sit under Clubs, places under the Map, Library items under their Library category, the rest under A–Z.
  if (/^\/explore\/[^/]+$/.test(path)) {
    const name = str(data?.["name"]);
    if (!name) return [];
    const raw = str(data?.["rawCategory"]);
    const view = obj(data?.["view"]);
    if (view?.["club"]) return [HOME, section("/inside-the-clubs"), here(name)];
    if (view?.["item"]) return [HOME, LIBRARY, libraryCategory(raw === "Film" || raw === "TV" ? "moving-images" : "publications"), here(name)];
    if (view?.["place"]) return [HOME, section("/map"), here(name)];
    return [HOME, section("/explore"), here(name)];
  }

  // Library pages
  const art = path.match(/^\/library\/art\/[^/]+$/);
  if (art) {
    const name = str(data?.["name"]);
    return name ? [HOME, LIBRARY, libraryCategory("art"), here(name)] : [];
  }
  if (/^\/library\/moving-images\/[^/]+$/.test(path)) {
    const name = str(data?.["name"]);
    return name ? [HOME, LIBRARY, libraryCategory("moving-images"), here(name)] : [];
  }
  if (/^\/library\/[^/]+$/.test(path)) {
    const name = str(data?.["name"]);
    return name ? [HOME, LIBRARY, here(`${name}'s Library`)] : [];
  }
  if (/^\/issues\/[^/]+$/.test(path)) {
    const mast = str(data?.["mast"]);
    const number = str(data?.["number"]);
    return mast ? [HOME, LIBRARY, libraryCategory("publications"), here([mast, number].filter(Boolean).join(" "))] : [];
  }

  // How the Hall of Fame works sits under the Hall of Fame
  if (path === "/hall-of-fame-rules") return [HOME, section("/hall-of-fame"), here(SECTIONS[path] ?? "How it works")];

  // Every other page: Home › its name
  const name = SECTIONS[path];
  return name ? [HOME, here(name)] : [];
}
