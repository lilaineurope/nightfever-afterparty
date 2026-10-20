import { Link } from "@tanstack/react-router";
import { useLayoutEffect, useRef } from "react";
import { episodePeople } from "@/data/episode-connections";

// Names that surface in more than one published episode, set as a flyer headline - only the first
// ROWS rows of chips are shown, at every screen width.
const ROWS = 4;

export function NamesEveryoneDrops() {
  const box = useRef<HTMLParagraphElement>(null);
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
    <section className="px-6 pb-16 pt-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="border-b-[3px] border-gold pb-2 text-4xl sm:text-[44px]">The names everyone drops</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Hosts, regulars and legends who keep popping up in more than one episode. Tap a name and dive in!
        </p>
        <p
          ref={box}
          className="mt-5 overflow-hidden font-[family-name:var(--font-flyer)] text-2xl uppercase leading-[1.5] sm:text-[30px]"
          style={{ maxHeight: "13.9rem" }}
        >
          {recurring.map((p, i) => (
            <span key={p.slug}>
              {i > 0 && <span className="text-pink"> / </span>}
              <Link to="/explore/$slug" params={{ slug: p.slug }} className="whitespace-nowrap transition hover:text-pink">
                {p.name}
              </Link>
              <sup className="ml-1 font-[family-name:var(--font-mono-body)] text-[11px] normal-case tracking-normal text-pink">
                {p.episodeIds.length} connections · {p.mentions} {p.mentions === 1 ? "mention" : "mentions"}
              </sup>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
