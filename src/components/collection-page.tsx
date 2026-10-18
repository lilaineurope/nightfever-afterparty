import { Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { Timestamp } from "@/components/episode-player";
import { EntityText } from "@/components/entity-text";
import { SiteFooter } from "@/components/site-footer";
import { linkPlace } from "@/lib/link-label";
import { episodePath } from "@/data/episodes";
import type { CollectionItem, Shelf } from "@/data/collections";

type Extra = { label: string; href: string };

/** Shared layout for the Book Club and the Jukebox: header, shelf filter, sort, and one card per title. */
export function CollectionPage({
  header,
  kicker,
  title,
  intro,
  items,
  shelves,
  extras,
  note,
  topSlot,
  onPlay,
  playingSlug,
}: {
  header: string;
  kicker: string;
  title: ReactNode;
  intro: ReactNode;
  items: CollectionItem[];
  shelves: Shelf[];
  extras: (item: CollectionItem) => Extra[];
  note: ReactNode;
  topSlot?: ReactNode;
  onPlay?: (item: CollectionItem) => void;
  playingSlug?: string | undefined;
}) {
  const [shelf, setShelf] = useState("all");
  const [sort, setSort] = useState<"mentions" | "az" | "episode">("mentions");
  const counts = useMemo(() => Object.fromEntries(shelves.map((s) => [s.key, items.filter((i) => i.shelf === s.key).length])), [items, shelves]);
  const shown = useMemo(() => {
    const list = items.filter((i) => shelf === "all" || i.shelf === shelf);
    if (sort === "az") return [...list].sort((a, b) => a.name.replace(/^['‘"“]|^the\s+/i, "").localeCompare(b.name.replace(/^['‘"“]|^the\s+/i, "")));
    if (sort === "episode") return [...list].sort((a, b) => b.firstRelease - a.firstRelease || b.mentions - a.mentions);
    return list;
  }, [items, shelf, sort]);
  const chip = (on: boolean) =>
    `rounded-full border px-3 py-1 text-xs font-medium transition ${on ? "border-gold bg-gold text-gold-foreground" : "border-border bg-secondary text-secondary-foreground hover:text-pink"}`;
  const shelfLabel = Object.fromEntries(shelves.map((s) => [s.key, s.label]));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative flex min-h-[420px] items-center overflow-hidden px-6 pb-12 pt-24 sm:min-h-[480px]">
        <img src={header} alt="" width={1376} height={768} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_50%_46%,color-mix(in_oklab,var(--background)_88%,transparent),transparent_72%)]" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-pink">{kicker}</p>
          <h1 className="mt-3 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">{title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85">{intro}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 pb-16 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <div className="flex flex-wrap gap-2">
            <button type="button" className={chip(shelf === "all")} aria-pressed={shelf === "all"} onClick={() => setShelf("all")}>
              All <span className="ml-1 opacity-70">{items.length}</span>
            </button>
            {shelves.map((s) => (
              <button key={s.key} type="button" className={chip(shelf === s.key)} aria-pressed={shelf === s.key} onClick={() => setShelf(s.key)}>
                {s.label} <span className="ml-1 opacity-70">{counts[s.key]}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>Sort:</span>
            <button type="button" className={chip(sort === "mentions")} aria-pressed={sort === "mentions"} onClick={() => setSort("mentions")}>Most mentioned</button>
            <button type="button" className={chip(sort === "az")} aria-pressed={sort === "az"} onClick={() => setSort("az")}>A–Z</button>
            <button type="button" className={chip(sort === "episode")} aria-pressed={sort === "episode"} onClick={() => setSort("episode")}>Newest episode</button>
          </div>
        </div>

        {topSlot && <div className="mt-6">{topSlot}</div>}
        <ol className="mt-6 space-y-4">
          {shown.map((it, i) => (
            <li key={it.slug} className={`rounded-2xl border bg-card p-5 ${playingSlug === it.slug ? "border-pink" : "border-border"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-3">
                  <span className="w-7 shrink-0 text-right font-mono text-sm text-gold/70">{i + 1}</span>
                  <div>
                    <Link to="/explore/$slug" params={{ slug: it.slug }} className="text-lg font-semibold text-cream underline decoration-border underline-offset-4 hover:text-pink">
                      {it.name}
                    </Link>
                    <span className="ml-2 rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">{shelfLabel[it.shelf]}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {it.mentions > 0 ? `${it.mentions} mention${it.mentions === 1 ? "" : "s"}` : "implied"}
                  {" · "}
                  {new Set(it.moments.map((m) => m.episodeId)).size} episode{new Set(it.moments.map((m) => m.episodeId)).size === 1 ? "" : "s"}
                </span>
              </div>
              <ul className="mt-3 space-y-2 pl-10">
                {it.moments.map((m) => (
                  <li key={m.episodeId + m.time} className="text-sm text-muted-foreground">
                    <Link to={episodePath(m.episodeId as never)} className="font-medium text-gold hover:text-pink">{m.code} · {m.guest}</Link>
                    {m.time && m.time !== "On camera" && <>{" · "}<Timestamp episodeId={m.episodeId} time={m.time} className="text-xs" /></>}
                    {" - "}<EntityText text={m.context} />
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap items-center gap-3 pl-10 text-xs">
                {onPlay && it.spotify && (
                  <button type="button" onClick={() => onPlay(it)} className="rounded-full bg-pink px-3 py-1 font-semibold text-pink-foreground hover:opacity-90">
                    {playingSlug === it.slug ? "♫ Playing" : "▶ Play"}
                  </button>
                )}
                {it.link && (
                  <a href={it.link} target="_blank" rel="noreferrer" className="text-gold hover:text-pink">Read more {linkPlace(it.link)} ↗</a>
                )}
                {extras(it).map((x) => (
                  <a key={x.href} href={x.href} target="_blank" rel="noreferrer" className="text-gold hover:text-pink">{x.label} ↗</a>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-xs text-muted-foreground">{note}</p>
      </div>
      <SiteFooter />
    </main>
  );
}
