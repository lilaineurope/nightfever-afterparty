import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { SearchHit } from "@/lib/search-index";

type Mod = typeof import("@/lib/search-index");

const KIND_LABEL: Record<SearchHit["kind"], string> = { card: "Card", episode: "Episode", page: "Page" };

/** Search button for the site menu: one box that finds any name, place, work, look, episode or page. */
export function SiteSearch({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<Mod | null>(null);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement>(null);

  // Cmd/Ctrl+K or "/" opens search from anywhere (but "/" not while typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open && !mod) import("@/lib/search-index").then(setMod);
  }, [open, mod]);

  const hits = useMemo(() => (mod ? mod.search(q) : []), [mod, q]);
  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (h: SearchHit) => {
    setOpen(false);
    setQ("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to: h.to as any, params: h.params as any });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 text-sm text-cream/80 transition hover:border-pink hover:text-pink ${className}`}
        aria-label="Search the site"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="hidden 2xl:inline">Search</span>
        <kbd className="ml-1 hidden rounded border border-border px-1 text-[10px] text-muted-foreground 2xl:inline">/</kbd>
      </button>
      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setQ(""); }}>
        <DialogContent className="top-[12%] max-w-xl translate-y-0 gap-0 overflow-hidden border-gold/30 bg-background p-0">
          <DialogTitle className="sr-only">Search the site</DialogTitle>
          <DialogDescription className="sr-only">
            Find any name, place, club, work, look, episode or page.
          </DialogDescription>
          <div className="flex items-center gap-2 border-b border-border px-4">
            <Search className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, hits.length - 1)); }
                if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
                if (e.key === "Enter" && hits[active]) { e.preventDefault(); go(hits[active]); }
              }}
              placeholder="Search names, clubs, places, looks, episodes…"
              aria-label="Search"
              role="combobox"
              aria-expanded={hits.length > 0}
              aria-controls="site-search-results"
              className="h-12 w-full bg-transparent text-base text-cream outline-none placeholder:text-muted-foreground"
            />
          </div>
          <ul id="site-search-results" ref={listRef} role="listbox" className="max-h-[60vh] overflow-y-auto p-2">
            {q.trim().length < 2 && (
              <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                Type at least two letters - try <span className="text-gold">Danceteria</span>, <span className="text-gold">Warhol</span> or <span className="text-gold">leather</span>.
              </li>
            )}
            {q.trim().length >= 2 && !mod && <li className="px-3 py-6 text-center text-sm text-muted-foreground">Loading…</li>}
            {q.trim().length >= 2 && mod && hits.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-muted-foreground">Nothing found for &ldquo;{q}&rdquo;.</li>
            )}
            {hits.map((h, i) => (
              <li key={h.kind + h.title + h.to + (h.params?.["slug"] ?? "")} role="option" aria-selected={i === active} data-i={i}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(h)}
                  className={`w-full rounded-lg px-3 py-2 text-left transition ${i === active ? "bg-secondary" : ""}`}
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold text-cream">{h.title}</span>
                    <span className="shrink-0 text-[10px] uppercase tracking-wider text-pink">{KIND_LABEL[h.kind]}</span>
                  </span>
                  <span className="block text-xs text-gold/90">{h.sub}</span>
                  {h.snippet && <span className="mt-0.5 block text-xs text-muted-foreground">{h.snippet}</span>}
                </button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
