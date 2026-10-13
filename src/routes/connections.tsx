import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { episodes } from "@/data/episodes";
import { episodePeople } from "@/data/episode-connections";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/connections")({
  component: ConnectionsPage,
  head: () => ({
    meta: [
      { title: "The Night Fever Web — How the Names Are Connected" },
      {
        name: "description",
        content:
          "A web of every name in the published Night Fever episode indexes, connected by the episodes they surface in together.",
      },
      {
        property: "og:title",
        content: "The Night Fever Web — How the Names Are Connected",
      },
      {
        property: "og:description",
        content:
          "Every timestamped name from the published Night Fever episode indexes, arranged in one web.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/connections" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/connections" }],
  }),
});

type Person = (typeof episodePeople)[number];

const SIZE = 720;
const CENTER = SIZE / 2;

const episodeLabel = new Map(
  episodes.map((ep) => [
    ep.id,
    `S${ep.season}E${ep.episode} · ${ep.guest}`,
  ]),
);

function ConnectionsPage() {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState<string | null>(null);

  // Links between names that share a published episode.
  const links = useMemo(() => {
    const byEpisode: Record<string, string[]> = {};
    for (const p of episodePeople)
      for (const id of p.episodeIds) (byEpisode[id] ??= []).push(p.slug);
    const map = new Map<string, string[]>();
    for (const id of Object.keys(byEpisode)) {
      const list = byEpisode[id]!;
      for (let i = 0; i < list.length; i++)
        for (let j = i + 1; j < list.length; j++) {
          const key = [list[i]!, list[j]!].sort().join("|");
          const prev = map.get(key);
          if (prev) prev.push(id);
          else map.set(key, [id]);
        }
    }
    return map;
  }, []);

  const degree = useMemo(() => {
    const d: Record<string, number> = {};
    for (const [key] of links)
      for (const slug of key.split("|")) d[slug] = (d[slug] ?? 0) + 1;
    return d;
  }, [links]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? episodePeople.filter((p) => p.name.toLowerCase().includes(q))
      : episodePeople;
    return [...list].sort(
      (a, b) =>
        b.episodeIds.length - a.episodeIds.length ||
        b.mentions - a.mentions ||
        a.name.localeCompare(b.name),
    );
  }, [query]);

  const focusPerson = focus
    ? episodePeople.find((p) => p.slug === focus)
    : undefined;

  const focusLinks = useMemo(() => {
    if (!focus) return [];
    const out: { other: Person; shared: string[] }[] = [];
    for (const [key, ids] of links) {
      const [a, b] = key.split("|");
      if (a !== focus && b !== focus) continue;
      const otherSlug = a === focus ? b! : a!;
      const other = episodePeople.find((p) => p.slug === otherSlug);
      if (other) out.push({ other, shared: ids });
    }
    return out.sort(
      (x, y) =>
        y.shared.length - x.shared.length || y.other.mentions - x.other.mentions,
    );
  }, [focus, links]);

  // Orbit layout: closest circle = shares every published episode with the
  // focus name; each ring further out shares fewer.
  const ORBIT_LIMIT = 24;
  const orbit = useMemo(() => {
    if (!focusPerson || focusLinks.length === 0) return [];
    const shown = focusLinks.slice(0, ORBIT_LIMIT);
    const maxShared = shown[0]!.shared.length;
    const rings = new Map<number, typeof focusLinks>();
    for (const l of focusLinks) {
      const ring = maxShared - l.shared.length;
      const arr = rings.get(ring) ?? [];
      arr.push(l);
      rings.set(ring, arr);
    }
    const ringCount = rings.size;
    const out: {
      other: Person;
      shared: string[];
      x: number;
      y: number;
      r: number;
    }[] = [];
    for (const [ring, arr] of [...rings.entries()].sort((a, b) => a[0] - b[0])) {
      const radius =
        ringCount === 1
          ? 200
          : 150 + (ring / (ringCount - 1)) * (CENTER - 190);
      arr.forEach((l, i) => {
        const angle = (i / arr.length) * Math.PI * 2 - Math.PI / 2 + ring * 0.35;
        out.push({
          ...l,
          x: CENTER + Math.cos(angle) * radius,
          y: CENTER + Math.sin(angle) * radius,
          r: Math.max(6, 22 - ring * 4),
        });
      });
    }
    return out;
  }, [focusPerson, focusLinks]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-12 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Everyone knows{" "}
            <span className="text-pink text-glow-pink">everyone</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Pick any name from the published episode indexes and see who
            surfaces alongside them. The closer a name sits, the more episodes
            they share.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Shared mentions are not proof of a personal relationship or a
            shared night.
          </p>
        </div>
      </section>

      {/* Name picker */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-4xl">
          <label htmlFor="name-search" className="sr-only">
            Search a name
          </label>
          <input
            id="name-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a name…"
            className="w-full rounded-xl border border-gold/30 bg-card px-5 py-3 text-cream placeholder:text-muted-foreground focus:border-pink focus:outline-none"
          />
          <div className="mt-4 flex max-h-64 flex-wrap gap-2 overflow-y-auto rounded-2xl border border-border bg-card/60 p-4">
            {filtered.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setFocus(focus === p.slug ? null : p.slug)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  focus === p.slug
                    ? "border-pink bg-pink/20 text-pink"
                    : "border-border bg-secondary/50 text-cream hover:border-gold/50"
                }`}
              >
                {p.name}
                <span className="ml-1.5 text-xs text-muted-foreground">
                  {p.episodeIds.length}{" "}
                  {p.episodeIds.length === 1 ? "ep" : "eps"}
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No name matches “{query}”.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Focus circle */}
      <section className="px-4 pb-8">
        <div className="mx-auto max-w-4xl">
          {focusPerson ? (
            <div className="rounded-3xl border border-gold/20 bg-card p-2 sm:p-6">
              <svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="mx-auto h-auto w-full max-w-[680px]"
                role="img"
                aria-label={`Circle of names that surface alongside ${focusPerson.name} in the published episode indexes`}
              >
                {orbit.map((o) => (
                  <line
                    key={`line-${o.other.slug}`}
                    x1={CENTER}
                    y1={CENTER}
                    x2={o.x}
                    y2={o.y}
                    stroke={
                      o.shared.length >= 2
                        ? "var(--color-pink)"
                        : "var(--color-gold)"
                    }
                    strokeOpacity={o.shared.length >= 2 ? 0.6 : 0.25}
                    strokeWidth={o.shared.length >= 2 ? 2 : 1}
                  />
                ))}
                {orbit.map((o) => (
                  <g key={o.other.slug}>
                    <circle
                      cx={o.x}
                      cy={o.y}
                      r={o.r}
                      fill="var(--color-gold)"
                      fillOpacity={0.85}
                      className="cursor-pointer"
                      onClick={() => setFocus(o.other.slug)}
                    />
                    <a
                      href={`/explore/${o.other.slug}`}
                      aria-label={`${o.other.name} overview`}
                      onClick={(e) => {
                        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                        e.preventDefault();
                        setFocus(o.other.slug);
                      }}
                    >
                      <text
                        x={o.x}
                        y={o.y + o.r + 12}
                        textAnchor="middle"
                        fontSize="12"
                        fill="var(--color-cream)"
                        className="cursor-pointer"
                      >
                        {o.other.name}
                      </text>
                    </a>
                  </g>
                ))}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={34}
                  fill="var(--color-pink)"
                  fillOpacity={0.9}
                />
                <text
                  x={CENTER}
                  y={CENTER + 52}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="bold"
                  fill="var(--color-pink)"
                >
                  {focusPerson.name}
                </text>
              </svg>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Pink in the middle is {focusPerson.name}. The closer a name
                sits, the more episodes they share. Tap a name to re-centre the
                circle on them; modifier-click opens their overview.
              </p>
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-card/60 p-10 text-center text-muted-foreground">
              <p>
                Search or tap a name above to see their circle — everyone who
                surfaces alongside them in the published episodes.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Focus detail */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-4xl">
          {focusPerson && (
            <div className="rounded-2xl border border-pink/30 bg-card p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-2xl font-semibold text-gold">
                  {focusPerson.name}
                </h2>
                <button
                  type="button"
                  onClick={() => setFocus(null)}
                  className="text-xs font-medium uppercase tracking-wider text-pink hover:underline"
                >
                  Clear
                </button>
              </div>
              <p className="mt-2 text-sm text-card-foreground/80">
                Named {focusPerson.mentions}{" "}
                {focusPerson.mentions === 1 ? "time" : "times"} across{" "}
                {focusPerson.episodeIds.length} published{" "}
                {focusPerson.episodeIds.length === 1 ? "episode" : "episodes"}:{" "}
                {focusPerson.episodeIds
                  .map((id) => episodeLabel.get(id))
                  .join(" · ")}
              </p>

              <ul className="mt-6 space-y-3">
                {focusLinks.map(({ other, shared }) => (
                  <li
                    key={other.slug}
                    className="rounded-xl border border-border bg-secondary/50 p-4"
                  >
                    <a
                      href={`/explore/${other.slug}`}
                      className="text-sm font-semibold text-gold hover:text-pink"
                    >
                      {other.name}
                    </a>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {other.mentions} mentions in {other.episodeIds.length}{" "}
                      published{" "}
                      {other.episodeIds.length === 1 ? "episode" : "episodes"}
                    </p>
                    <p className="mt-1 text-xs text-pink">
                      Both in:{" "}
                      {shared.map((id) => episodeLabel.get(id)).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/explore/$slug"
                  params={{ slug: focusPerson.slug }}
                  className="inline-flex rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground transition hover:bg-spotlight"
                >
                  Read their overview
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Most connected */}
      <section className="spotlight px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            The great connectors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            The names that surface alongside the most others in the published
            episode indexes.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {episodePeople
              .filter((p) => p.episodeIds.length >= 2)
              .sort(
                (a, b) =>
                  (degree[b.slug] ?? 0) - (degree[a.slug] ?? 0) ||
                  b.mentions - a.mentions,
              )
              .map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => {
                    setFocus(p.slug);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 text-left transition hover:border-gold/50"
                >
                  <span>
                    <span className="block font-semibold text-gold">
                      {p.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-card-foreground/70">
                      {p.episodeIds
                        .map((id) => episodeLabel.get(id))
                        .join(" · ")}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-pink/15 px-3 py-1 text-xs font-semibold text-pink">
                    {degree[p.slug] ?? 0} links
                  </span>
                </button>
              ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
