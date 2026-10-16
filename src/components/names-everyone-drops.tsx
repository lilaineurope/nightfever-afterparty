import { Link } from "@tanstack/react-router";
import { useLayoutEffect, useRef } from "react";
import { episodePeople } from "@/data/episode-connections";

// Names that surface in more than one published episode - only the first
// ROWS rows of chips are shown, at every screen width.
const ROWS = 5;

export function NamesEveryoneDrops() {
  const box = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => {
      const chips = [...el.children] as HTMLElement[];
      chips.forEach((c) => (c.hidden = false));
      const tops = [...new Set(chips.map((c) => c.offsetTop))].sort((a, b) => a - b);
      const cut = tops[ROWS];
      if (cut !== undefined) chips.forEach((c) => (c.hidden = c.offsetTop >= cut));
      el.style.maxHeight = "none";
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement ?? el);
    return () => ro.disconnect();
  }, []);
  const recurring = episodePeople
    .filter((p) => p.episodeIds.length >= 2)
    .sort(
      (a, b) =>
        b.episodeIds.length - a.episodeIds.length || b.mentions - a.mentions,
    );
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-cream sm:text-4xl">
          The names everyone drops!
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          The names in the rooms - hosts, regulars and legends who keep
          popping up in more than one episode, whether or not they ever sat
          down for an interview. Tap a name and dive in!
        </p>
        <div
          ref={box}
          className="mt-10 flex flex-wrap justify-center gap-2 overflow-hidden"
          style={{ maxHeight: "13.9rem" }}
        >
          {recurring.map((p) => (
            <Link
              key={p.slug}
              to="/explore/$slug"
              params={{ slug: p.slug }}
              className="rounded-full border border-gold/25 bg-card px-4 py-2 text-sm text-card-foreground/85 transition hover:border-gold/60"
            >
              {p.name} <span className="text-xs text-pink">{p.episodeIds.length}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
