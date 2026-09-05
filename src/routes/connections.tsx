import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { guestBySlug, guests } from "../data/guests";

export const Route = createFileRoute("/connections")({
  component: ConnectionsPage,
  head: () => ({
    meta: [
      { title: "The Night Fever Web — How the Guests Are Connected" },
      {
        name: "description",
        content:
          "An interactive map of how every Night Fever guest is connected: shared clubs, bands, scenes and decades of name-dropping.",
      },
      {
        property: "og:title",
        content: "The Night Fever Web — How the Guests Are Connected",
      },
      {
        property: "og:description",
        content:
          "See how the nightlife legends interviewed on Night Fever all know each other.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/connections" }],
  }),
});

type Edge = { a: string; b: string; shared: string[] };

function buildEdges(): Edge[] {
  const seen = new Set<string>();
  const edges: Edge[] = [];
  for (const g of guests) {
    for (const other of g.linkedTo) {
      const key = [g.slug, other].sort().join("|");
      if (seen.has(key) || !guestBySlug[other]) continue;
      seen.add(key);
      const shared = g.scenes.filter((s) =>
        guestBySlug[other]!.scenes.includes(s),
      );
      edges.push({ a: g.slug, b: other, shared });
    }
  }
  return edges;
}

const SIZE = 720;
const R = 285;

function ConnectionsPage() {
  const edges = useMemo(buildEdges, []);
  const [focus, setFocus] = useState<string | null>(null);

  const positions = useMemo(() => {
    const map: Record<string, { x: number; y: number; angle: number }> = {};
    guests.forEach((g, i) => {
      const angle = (i / guests.length) * Math.PI * 2 - Math.PI / 2;
      map[g.slug] = {
        x: SIZE / 2 + Math.cos(angle) * R,
        y: SIZE / 2 + Math.sin(angle) * R,
        angle,
      };
    });
    return map;
  }, []);

  const degree = useMemo(() => {
    const d: Record<string, number> = {};
    for (const e of edges) {
      d[e.a] = (d[e.a] ?? 0) + 1;
      d[e.b] = (d[e.b] ?? 0) + 1;
    }
    return d;
  }, [edges]);

  const focusEdges = focus
    ? edges.filter((e) => e.a === focus || e.b === focus)
    : [];
  const isLit = (slug: string) =>
    !focus ||
    slug === focus ||
    focusEdges.some((e) => e.a === slug || e.b === slug);

  const mostConnected = [...guests].sort(
    (a, b) => (degree[b.slug] ?? 0) - (degree[a.slug] ?? 0),
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-12 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            to="/guests"
            className="text-xs font-medium uppercase tracking-[0.2em] text-gold transition hover:text-pink"
          >
            &larr; Guests &amp; timelines
          </Link>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Everyone knows{" "}
            <span className="text-pink text-glow-pink">everyone</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Listen to enough episodes and the same names keep coming back. Tap
            anyone below to see who they came up with, partied with, worked
            with, or simply cannot stop mentioning.
          </p>
        </div>
      </section>

      {/* Web */}
      <section className="px-4 pb-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-gold/20 bg-card p-2 sm:p-6">
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="mx-auto h-auto w-full max-w-[720px]"
              role="img"
              aria-label="Network map of Night Fever guests and their connections"
            >
              {edges.map((e) => {
                const p1 = positions[e.a]!;
                const p2 = positions[e.b]!;
                const lit =
                  !focus || e.a === focus || e.b === focus;
                return (
                  <line
                    key={`${e.a}-${e.b}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={lit ? "var(--color-pink)" : "var(--color-border)"}
                    strokeOpacity={lit ? (focus ? 0.85 : 0.35) : 0.15}
                    strokeWidth={lit && focus ? 2 : 1}
                  />
                );
              })}

              {guests.map((g) => {
                const p = positions[g.slug]!;
                const lit = isLit(g.slug);
                const size = 7 + (degree[g.slug] ?? 0) * 1.6;
                const flip = Math.cos(p.angle) < 0;
                return (
                  <g
                    key={g.slug}
                    className="cursor-pointer"
                    opacity={lit ? 1 : 0.25}
                    onClick={() => setFocus(focus === g.slug ? null : g.slug)}
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={size}
                      fill={
                        focus === g.slug
                          ? "var(--color-pink)"
                          : "var(--color-gold)"
                      }
                    />
                    <text
                      x={p.x + Math.cos(p.angle) * (size + 10)}
                      y={p.y + Math.sin(p.angle) * (size + 10)}
                      textAnchor={flip ? "end" : "start"}
                      dominantBaseline="middle"
                      fontSize="15"
                      fill="var(--color-cream)"
                    >
                      {g.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Bigger dot = more connections. Tap a name to light up their circle.
          </p>
        </div>
      </section>

      {/* Focus detail */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-4xl">
          {focus ? (
            <div className="rounded-2xl border border-pink/30 bg-card p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-2xl font-semibold text-gold">
                  {guestBySlug[focus]!.name}
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
                {guestBySlug[focus]!.tagline}
              </p>
              <ul className="mt-6 space-y-3">
                {focusEdges.map((e) => {
                  const otherSlug = e.a === focus ? e.b : e.a;
                  const other = guestBySlug[otherSlug]!;
                  return (
                    <li
                      key={otherSlug}
                      className="rounded-xl border border-border bg-secondary/50 p-4"
                    >
                      <button
                        type="button"
                        onClick={() => setFocus(otherSlug)}
                        className="text-left text-sm font-semibold text-gold hover:text-pink"
                      >
                        {other.name}
                      </button>
                      <p className="mt-1 text-sm text-card-foreground/75">
                        {other.tagline}
                      </p>
                      {e.shared.length > 0 && (
                        <p className="mt-2 text-xs text-pink">
                          Shared ground: {e.shared.join(", ")}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
              <Link
                to="/guests"
                hash={focus}
                className="mt-6 inline-flex rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground transition hover:bg-spotlight"
              >
                Read their full timeline
              </Link>
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
            The names that come up in everyone else&rsquo;s stories.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {mostConnected.map((g) => (
              <button
                key={g.slug}
                type="button"
                onClick={() => {
                  setFocus(g.slug);
                  if (typeof window !== "undefined")
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 text-left transition hover:border-gold/50"
              >
                <span>
                  <span className="block font-semibold text-gold">
                    {g.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-card-foreground/70">
                    {g.tagline}
                  </span>
                </span>
                <span className="shrink-0 rounded-full bg-pink/15 px-3 py-1 text-xs font-semibold text-pink">
                  {degree[g.slug] ?? 0} links
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12 text-center">
        <p className="text-sm text-muted-foreground">
          Fan page for <em>Night Fever</em> by World of Wonder.{" "}
          <Link to="/" className="text-gold transition hover:text-pink">
            Home
          </Link>{" "}
          &middot;{" "}
          <Link to="/guests" className="text-gold transition hover:text-pink">
            Guests
          </Link>
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-xs text-muted-foreground/60">
          Connections drawn from public interviews and press coverage. Not
          affiliated with World of Wonder or the Night Fever podcast.
        </p>
      </footer>
    </main>
  );
}
