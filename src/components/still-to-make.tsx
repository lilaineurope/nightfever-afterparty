import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FanSuggestions } from "@/components/fan-suggestions";
import { cardTo } from "@/lib/card-link";
import { episodeById, episodePath } from "@/data/episodes";
import {
  BOOKS_TO_WRITE,
  FILMS_TO_MAKE,
  type MadeYet,
  type StillToMake,
} from "@/data/still-to-make";
import { Timestamp } from "@/components/episode-player";
import { coverFor } from "@/data/library-covers";

// "Still to be made" box on the Library page, headline "Publish this" (Lisa, 4 Nov 2026 evening; box first added that morning): the books
// and films the guests and hosts say should exist, laid out like "Who to interview next". Three tabs (Lisa, 19 Nov 2026): Books to be
// written and Films to be made hold what is still missing; anything made since moves to the "Made since" tab, books with their Library cover.

const ITEM_CLASS =
  "border-t border-border pt-4 first:border-t-0 first:pt-0 md:[&:nth-child(2)]:border-t-0 md:[&:nth-child(2)]:pt-0";

const TAG: Record<MadeYet, { label: string; className: string }> = {
  "not yet": { label: "Not made yet", className: "bg-pink text-pink-foreground" },
  "in the works": { label: "In the works", className: "bg-gold text-gold-foreground" },
  partly: { label: "Partly made", className: "bg-gold text-gold-foreground" },
  lost: { label: "Lost", className: "bg-gold text-gold-foreground" },
  made: { label: "Made since!", className: "border border-gold text-cream" },
};

function Item({ it, kind }: { it: StillToMake; kind?: "Book" | "Film" | undefined }) {
  const ep = episodeById(it.episodeId);
  const tag = TAG[it.made];
  const cover = it.library ? coverFor(it.library) : undefined;
  return (
    <li className={`${ITEM_CLASS}${cover ? " flex gap-4" : ""}`}>
      {cover && (
        <img
          src={cover.src}
          alt={`Cover of ${it.library}`}
          loading="lazy"
          decoding="async"
          className="h-28 w-auto shrink-0 self-start border-2 border-gold object-cover"
        />
      )}
      <div className="min-w-0">
        {kind && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink">
            {kind}
            {it.year ? ` \u00b7 ${it.year}` : ""}
          </p>
        )}
        <p className="font-[family-name:var(--font-flyer)] text-lg uppercase leading-tight text-cream">
          {it.title}
        </p>
        {kind && it.madeAs && (
          <p className="mt-0.5 text-sm font-semibold text-gold">Made as {it.madeAs}</p>
        )}
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
            S{ep.season}E{ep.episode}
            {ep.part} &middot; {ep.guest}
          </Link>
          {it.time && <Timestamp episodeId={ep.id} time={it.time} className="text-xs" />}
        </p>
      </div>
    </li>
  );
}

export function StillToMakeBox({ className = "" }: { className?: string }) {
  // Folded shut by default (Lisa, 4 Nov 2026: "click-and-expand box"): title, intro and tabs show, the list opens on a tap.
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<"books" | "films" | "made">("books");
  const tabs = [
    {
      key: "books" as const,
      label: "Books to be written",
      short: "Books",
      items: BOOKS_TO_WRITE.filter((i) => i.made !== "made"),
    },
    {
      key: "films" as const,
      label: "Films to be made",
      short: "Films",
      items: FILMS_TO_MAKE.filter((i) => i.made !== "made"),
    },
    {
      key: "made" as const,
      label: "Made since",
      short: "Made since",
      items: [
        ...BOOKS_TO_WRITE.filter((i) => i.made === "made").map((it) => ({
          ...it,
          kind: "Book" as const,
        })),
        ...FILMS_TO_MAKE.filter((i) => i.made === "made").map((it) => ({
          ...it,
          kind: "Film" as const,
        })),
      ],
    },
  ];
  const items: (StillToMake & { kind?: "Book" | "Film" })[] = tabs.find(
    (t) => t.key === tab,
  )!.items;
  return (
    <section aria-labelledby="still-to-make" className={className}>
      <div className="relative border-[3px] border-gold bg-card px-4 py-8 shadow-[8px_10px_0_var(--color-gold)] sm:px-10">
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-5 rotate-[6deg] bg-pink px-4 py-1.5 font-[family-name:var(--font-flyer)] text-xl uppercase text-pink-foreground sm:-right-6"
        >
          someone make it!
        </span>
        <h2 id="still-to-make" className="text-3xl leading-[0.95] sm:text-[40px]">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="still-to-make-body"
            onClick={() => setExpanded((e) => !e)}
            className="group flex w-full items-center justify-between gap-4 text-left uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
          >
            <span className="group-hover:text-pink">Publish this</span>
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-gold text-2xl leading-none transition group-hover:bg-pink group-hover:text-pink-foreground"
            >
              {expanded ? "\u2212" : "+"}
            </span>
          </button>
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The books that need to be written and the films that have to be made - every one the
          guests and hosts call for on the show, with the exact moment (tap &#9654; to hear it). The
          ones somebody has made since move to Made since - I check the list every month.
        </p>
        <div
          role="tablist"
          aria-label="Publish this"
          className="mt-8 flex gap-1 border-b-2 border-gold sm:gap-2"
        >
          {tabs.map((t) => {
            // While the box is shut no tab is lit; tapping a tab opens the box on that list.
            const on = expanded && tab === t.key;
            const open = t.items.length;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                id={`stm-tab-${t.key}`}
                aria-selected={on}
                aria-controls="still-to-make-body"
                aria-expanded={on}
                onClick={() => {
                  if (on) return setExpanded(false);
                  setTab(t.key);
                  setExpanded(true);
                }}
                className={`-mb-[2px] whitespace-nowrap border-2 border-b-0 px-1.5 py-2 text-[10px] font-semibold uppercase tracking-[0.04em] sm:px-3 sm:text-xs sm:tracking-[0.2em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink ${
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
        {expanded && (
          <div
            role="tabpanel"
            id="still-to-make-body"
            aria-labelledby={`stm-tab-${tab}`}
            className="mt-6"
          >
            <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
              {items.map((it) => (
                <Item key={it.title} it={it} kind={it.kind} />
              ))}
            </ul>
            {tab !== "made" && (
              <FanSuggestions key={tab} box="library" kind={tab === "films" ? "Film" : "Book"} variant="inset" />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
