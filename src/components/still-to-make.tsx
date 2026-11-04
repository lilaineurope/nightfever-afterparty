import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { cardTo } from "@/lib/card-link";
import { episodeById, episodePath } from "@/data/episodes";
import {
  BOOKS_TO_WRITE,
  FILMS_TO_MAKE,
  type MadeYet,
  type StillToMake,
} from "@/data/still-to-make";
import { Timestamp } from "@/components/episode-player";

// "Still to be made" box on the Library page (Lisa, 4 Nov 2026: "add it to the library page as a box first"): the books
// and films the guests and hosts say should exist, in two tabs, laid out like "Who to interview next".

const ITEM_CLASS =
  "border-t border-border pt-4 first:border-t-0 first:pt-0 md:[&:nth-child(2)]:border-t-0 md:[&:nth-child(2)]:pt-0";

const TAG: Record<MadeYet, { label: string; className: string }> = {
  "not yet": { label: "Not made yet", className: "bg-pink text-pink-foreground" },
  "in the works": { label: "In the works", className: "bg-gold text-gold-foreground" },
  partly: { label: "Partly made", className: "bg-gold text-gold-foreground" },
  lost: { label: "Lost", className: "bg-gold text-gold-foreground" },
  made: { label: "Made since!", className: "border border-gold text-cream" },
};

function Item({ it }: { it: StillToMake }) {
  const ep = episodeById(it.episodeId);
  const tag = TAG[it.made];
  return (
    <li className={ITEM_CLASS}>
      <p className="font-[family-name:var(--font-flyer)] text-lg uppercase leading-tight text-cream">
        {it.title}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-card-foreground/85">{it.why}</p>
      <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <span className={`px-1.5 py-0.5 font-semibold uppercase tracking-wide ${tag.className}`}>
          {tag.label}
        </span>
        <span>{it.status}</span>
        {it.source?.card && (
          <Link {...cardTo(it.source.card)} className="text-gold hover:text-pink">
            {it.source.label} →
          </Link>
        )}
        {it.source?.href && (
          <a
            href={it.source.href}
            target="_blank"
            rel="noreferrer"
            className="text-gold hover:text-pink"
          >
            {it.source.label} ↗
          </a>
        )}
      </p>
      <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <span>Said in</span>
        <Link to={episodePath(ep.id)} className="text-gold">
          S{ep.season}E{ep.episode} &middot; {ep.guest}
        </Link>
        {it.time && <Timestamp episodeId={ep.id} time={it.time} className="text-xs" />}
      </p>
    </li>
  );
}

export function StillToMakeBox({ className = "" }: { className?: string }) {
  const [tab, setTab] = useState<"books" | "films">("books");
  const tabs = [
    { key: "books" as const, label: "Books to be written", short: "Books", items: BOOKS_TO_WRITE },
    { key: "films" as const, label: "Films to be made", short: "Films", items: FILMS_TO_MAKE },
  ];
  const items = tab === "books" ? BOOKS_TO_WRITE : FILMS_TO_MAKE;
  return (
    <section aria-labelledby="still-to-make" className={className}>
      <div className="relative border-[3px] border-gold bg-card px-6 py-8 shadow-[8px_10px_0_var(--color-gold)] sm:px-10">
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-5 rotate-[6deg] bg-pink px-4 py-1.5 font-[family-name:var(--font-flyer)] text-xl uppercase text-pink-foreground sm:-right-6"
        >
          someone make it!
        </span>
        <h2 id="still-to-make" className="text-3xl leading-[0.95] sm:text-[40px]">
          Still to be made
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The books that need to be written and the films that have to be made - every one the
          guests and hosts call for on the show, with the exact moment (tap &#9654; to hear it) and
          whether anyone has made it since.
        </p>
        <div
          role="tablist"
          aria-label="Still to be made"
          className="mt-8 flex gap-1 border-b-2 border-gold sm:gap-2"
        >
          {tabs.map((t) => {
            const on = tab === t.key;
            const open = t.items.filter((i) => i.made !== "made").length;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                id={`stm-tab-${t.key}`}
                aria-selected={on}
                aria-controls={`stm-panel-${t.key}`}
                onClick={() => setTab(t.key)}
                className={`-mb-[2px] whitespace-nowrap border-2 border-b-0 px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-3 sm:text-xs sm:tracking-[0.2em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink ${
                  on
                    ? "border-gold bg-pink text-pink-foreground"
                    : "border-transparent text-pink hover:border-gold"
                }`}
              >
                <span className="sm:hidden">{t.short}</span>
                <span className="hidden sm:inline">{t.label}</span>{" "}
                <span className={on ? "opacity-80" : "text-muted-foreground"}>({open})</span>
              </button>
            );
          })}
        </div>
        <div
          role="tabpanel"
          id={`stm-panel-${tab}`}
          aria-labelledby={`stm-tab-${tab}`}
          className="mt-6"
        >
          <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
            {items.map((it) => (
              <Item key={it.title} it={it} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
