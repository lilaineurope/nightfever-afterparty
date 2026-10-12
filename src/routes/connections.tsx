import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { WOW_URL } from "@/data/guests";
import { episodes, episodePath } from "@/data/episodes";
import { episodePeople } from "@/data/episode-connections";
import { EntityText } from "@/components/entity-text";
import { LegalNote } from "@/components/legal-links";
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

const SIZE = 1000;
const R_OUTER = 452;
const R_OUTER_INNER = 418;
const R_CORE_OUTER = 240;
const R_CORE_INNER = 208;

const episodeLabel = new Map(
  episodes.map((ep) => [
    ep.id,
    `S${ep.season}E${ep.episode} · ${ep.guest}`,
  ]),
);

function sharedEpisodes(a: Person, b: Person): string[] {
  return a.episodeIds.filter((id) => b.episodeIds.includes(id));
}

function ConnectionsPage() {
  const [focus, setFocus] = useState<string | null>(null);

  const core = useMemo(
    () => episodePeople.filter((p) => p.episodeIds.length >= 2),
    [],
  );
  const ring = useMemo(
    () =>
      episodePeople
        .filter((p) => p.episodeIds.length < 2)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const positions = useMemo(() => {
    const map: Record<string, { x: number; y: number; angle: number }> = {};
    core.forEach((p, i) => {
      const angle = (i / core.length) * Math.PI * 2 - Math.PI / 2;
      const radius = i % 2 === 0 ? R_CORE_OUTER : R_CORE_INNER;
      map[p.slug] = {
        x: SIZE / 2 + Math.cos(angle) * radius,
        y: SIZE / 2 + Math.sin(angle) * radius,
        angle,
      };
    });
    ring.forEach((p, i) => {
      const angle = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
      const radius = i % 2 === 0 ? R_OUTER : R_OUTER_INNER;
      map[p.slug] = {
        x: SIZE / 2 + Math.cos(angle) * radius,
        y: SIZE / 2 + Math.sin(angle) * radius,
        angle,
      };
    });
    return map;
  }, [core, ring]);

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

  const coreLinks = useMemo(
    () =>
      [...links.entries()].filter(([key]) => {
        const [a, b] = key.split("|");
        return core.some((p) => p.slug === a) && core.some((p) => p.slug === b);
      }),
    [links, core],
  );
  const strongLinks = useMemo(
    () => coreLinks.filter(([, ids]) => ids.length >= 2),
    [coreLinks],
  );

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
      (x, y) => y.shared.length - x.shared.length || y.other.mentions - x.other.mentions,
    );
  }, [focus, links]);

  const focusLineTargets = useMemo(
    () => focusLinks.slice(0, 40).map((l) => l.other.slug),
    [focusLinks],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-12 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            to="/timeline"
            className="text-xs font-medium uppercase tracking-[0.2em] text-gold transition hover:text-pink"
          >
            &larr; Timeline &amp; guests
          </Link>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Everyone knows{" "}
            <span className="text-pink text-glow-pink">everyone</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every name in the published episode indexes, arranged in one web.
            Tap anyone to light up their circle; open a name to read their
            overview.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Shared mentions are not proof of a personal relationship or a
            shared night.
          </p>
          <Link
            to="/timeline"
            className="mt-8 inline-flex rounded-xl border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-gold-foreground"
          >
            See the full 1970s&ndash;today timeline
          </Link>
        </div>
      </section>

      {/* Web */}
      <section className="px-4 pb-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-gold/20 bg-card p-2 sm:p-6">
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="mx-auto h-auto w-full max-w-[900px]"
              role="img"
              aria-label="Network map of every name in the published Night Fever episode indexes, connected by shared episode appearances"
            >
              {/* faint links between names that share exactly one episode */}
              {coreLinks
                .filter(([, ids]) => ids.length < 2)
                .map(([key, ids]) => {
                  const [a, b] = key.split("|");
                  const p1 = positions[a!]!;
                  const p2 = positions[b!]!;
                  const lit =
                    !!focus && (a === focus || b === focus);
                  return (
                    <line
                      key={key}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="var(--color-gold)"
                      strokeOpacity={lit ? 0.5 : 0.1}
                      strokeWidth={1}
                    />
                  );
                })}

              {/* pink links between names that surface together in more than one episode */}
              {strongLinks.map(([key, ids]) => {
                const [a, b] = key.split("|");
                const p1 = positions[a!]!;
                const p2 = positions[b!]!;
                const lit = !!focus && (a === focus || b === focus);
                return (
                  <line
                    key={key}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={lit ? "var(--color-pink)" : "var(--color-border)"}
                    strokeOpacity={lit ? 0.9 : 0.35}
                    strokeWidth={lit ? 2 : 1}
                  />
                );
              })}

              {/* when focused, light the focused name's wider circle */}
              {focus &&
                focusLineTargets.map((slug) => {
                  const p1 = positions[focus]!;
                  const p2 = positions[slug];
                  if (!p2 || slug === focus) return null;
                  return (
                    <line
                      key={`focus-${slug}`}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="var(--color-pink)"
                      strokeOpacity={0.3}
                      strokeWidth={1}
                    />
                  );
                })}

              {/* outer ring: names in one published episode so far */}
              {ring.map((p) => {
                const pos = positions[p.slug]!;
                const lit =
                  !focus ||
                  focus === p.slug ||
                  focusLineTargets.includes(p.slug);
                const size = 5;
                const flip = Math.cos(pos.angle) < 0;
                return (
                  <g key={p.slug} opacity={lit ? 1 : 0.2}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={size}
                      fill="var(--color-gold)"
                      fillOpacity={0.8}
                      className="cursor-pointer"
                      onClick={() =>
                        setFocus(focus === p.slug ? null : p.slug)
                      }
                    />
                    <a
                      href={`/explore/${p.slug}`}
                      aria-label={`${p.name} overview`}
                      onClick={(e) => {
                        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                        e.preventDefault();
                        setFocus(p.slug);
                      }}
                    >
                      <text
                        x={pos.x + Math.cos(pos.angle) * (size + 6)}
                        y={pos.y + Math.sin(pos.angle) * (size + 6)}
                        textAnchor={flip ? "end" : "start"}
                        dominantBaseline="middle"
                        fontSize="9.5"
                        fill="var(--color-cream)"
                        className="cursor-pointer"
                      >
                        {p.name}
                      </text>
                    </a>
                  </g>
                );
              })}

              {/* inner rings: names that keep surfacing across episodes */}
              {core.map((p) => {
                const pos = positions[p.slug]!;
                const lit =
                  !focus ||
                  focus === p.slug ||
                  focusLineTargets.includes(p.slug);
                const size = 3.5 + p.episodeIds.length * 2.5;
                const flip = Math.cos(pos.angle) < 0;
                return (
                  <g key={p.slug} opacity={lit ? 1 : 0.15}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={size}
                      fill={focus === p.slug ? "var(--color-pink)" : "var(--color-cream)"}
                      fillOpacity={0.6}
                      className="cursor-pointer"
                      onClick={() =>
                        setFocus(focus === p.slug ? null : p.slug)
                      }
                    />
                    <a
                      href={`/explore/${p.slug}`}
                      aria-label={`${p.name} overview`}
                      onClick={(e) => {
                        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                        e.preventDefault();
                        setFocus(p.slug);
                      }}
                    >
                      <text
                        x={pos.x + Math.cos(pos.angle) * (size + 6)}
                        y={pos.y + Math.sin(pos.angle) * (size + 6)}
                        textAnchor={flip ? "end" : "start"}
                        dominantBaseline="middle"
                        fontSize="10.5"
                        fill="var(--color-cream)"
                        className="cursor-pointer"
                      >
                        {p.name}
                      </text>
                    </a>
                  </g>
                );
              })}
            </svg>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Pale dots in the middle keep surfacing across episodes; gold dots
            on the ring are named in one published episode so far. Bigger dot =
            more episodes. A plain click focuses a name; modifier-click opens
            their overview.
          </p>
        </div>
      </section>

      {/* Focus detail */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-4xl">
          {focusPerson ? (
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
                {focusPerson.episodeIds.length === 1 ? "episode" : "episodes"}
                :{" "}
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
                      {other.mentions} mentions in{" "}
                      {other.episodeIds.length} published{" "}
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
                <Link
                  to="/timeline"
                  className="inline-flex rounded-xl border border-pink/40 px-5 py-2.5 text-sm font-semibold text-pink transition hover:bg-pink hover:text-pink-foreground"
                >
                  See the whole scene timeline
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>Pick a name from the web above to see their circle.</p>
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
            {[...core]
              .sort(
                (a, b) =>
                  (degree[b.slug] ?? 0) - (degree[a.slug] ?? 0) ||
                  b.mentions - a.mentions,
              )
              .map((p) => (
                <a
                  key={p.slug}
                  href={`/explore/${p.slug}`}
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
                </a>
              ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
