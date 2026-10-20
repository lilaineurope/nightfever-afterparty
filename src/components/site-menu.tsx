import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteSearch } from "@/components/site-search";

// The one list of pages for the top menu (and site search).
export const PAGES = [
  { to: "/episodes", label: "Afterparty" },
  { to: "/timeline", label: "Timeline" },
  { to: "/connections", label: "Connections" },
  { to: "/jukebox", label: "Jukebox" },
  { to: "/book-club", label: "Book Club" },
  { to: "/map", label: "Map" },
  { to: "/wardrobe", label: "Wardrobe" },
  { to: "/quiz", label: "Pub Quiz" },
  { to: "/explore", label: "A–Z" },
  { to: "/guestbook", label: "Guestbook" },
] as const;

export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const item =
    "block whitespace-nowrap rounded-lg px-1.5 py-2 text-sm font-medium text-cream/80 transition hover:text-pink xl:px-2";
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <nav aria-label="Site" className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2 xl:px-4">
        <Link to="/" className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.12em] text-gold text-glow xl:tracking-[0.2em]">
          Night Fever fan page
        </Link>
        <div className="flex items-center gap-2 lg:hidden">
          <SiteSearch />
          <button
            type="button"
            className="rounded-lg border border-border px-3 py-1.5 text-sm text-cream"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            Menu
          </button>
        </div>
        <ul className="hidden items-center gap-0.5 lg:flex">
          {PAGES.map((p) => (
            <li key={p.to}>
              <Link to={p.to} className={item} activeOptions={{ exact: true }} activeProps={{ className: "text-gold" }}>
                {p.label}
              </Link>
            </li>
          ))}
          <li className="ml-1">
            <SiteSearch />
          </li>
        </ul>
      </nav>
      {open && (
        <ul className="border-t border-border px-4 pb-3 lg:hidden">
          {PAGES.map((p) => (
            <li key={p.to}>
              <Link to={p.to} className={item} onClick={() => setOpen(false)} activeOptions={{ exact: true }} activeProps={{ className: "text-gold" }}>
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
