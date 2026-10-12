import { Link } from "@tanstack/react-router";
import { useState } from "react";

const PAGES = [
  { to: "/", label: "Home" },
  { to: "/episodes", label: "Episodes" },
  { to: "/explore", label: "Everything A–Z" },
  { to: "/guests", label: "Guests" },
  { to: "/timeline", label: "Timeline" },
  { to: "/connections", label: "Connections" },
  { to: "/map", label: "Map" },
  { to: "/quiz", label: "Pub Quiz" },
] as const;

export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const item =
    "block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-cream/80 transition hover:text-pink";
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <nav aria-label="Site" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <Link to="/" className="text-sm font-bold uppercase tracking-[0.2em] text-gold text-glow">
          Night Fever afterparty
        </Link>
        <button
          type="button"
          className="rounded-lg border border-border px-3 py-1.5 text-sm text-cream md:hidden"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
        <ul className="hidden items-center gap-1 md:flex">
          {PAGES.map((p) => (
            <li key={p.to}>
              <Link to={p.to} className={item} activeOptions={{ exact: true }} activeProps={{ className: "text-gold" }}>
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {open && (
        <ul className="border-t border-border px-4 pb-3 md:hidden">
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
