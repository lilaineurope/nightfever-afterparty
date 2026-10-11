import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type MouseEvent } from "react";
import { guestBySlug, guests, SHOW_URL, WOW_URL } from "../data/guests";
import { eventsByGuest, recurringFigures, sceneEvents } from "../data/scene";
import { entityFor } from "../data/entities";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";

export const Route = createFileRoute("/connections")({
  component: ConnectionsPage,
  head: () => ({
    meta: [
      { title: "The Night Fever Web — How the Guests Are Connected" },
      {
        name: "description",
        content:
          "An interactive map of how every Night Fever guest is connected: shared clubs, bands, scenes, the nights they were both at, and the figures they all orbit.",
      },
      {
        property: "og:title",
        content: "The Night Fever Web — How the Guests Are Connected",
      },
      {
        property: "og:description",
        content:
          "See how the nightlife legends interviewed on Night Fever all know each other, night by night.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/connections" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/connections" }],
  }),
});

type Edge = { a: string; b: string; shared: string[]; events: string[] };

const figureNames = recurringFigures.map((f) => f.name);

function buildEdges(): Edge[] {
  const map = new Map<string, Edge>();
  const add = (a: string, b: string) => {
    const key = [a, b].sort().join("|");
    if (!map.has(key)) {
      const [x, y] = [a, b].sort() as [string, string];
      map.set(key, { a: x, b: y, shared: [], events: [] });
    }
    return map.get(key)!;
  };

  for (const g of guests) {
    for (const other of g.linkedTo) {
      if (!guestBySlug[other]) continue;
      const edge = add(g.slug, other);
      edge.shared = g.scenes.filter((s) =>
        guestBySlug[other]!.scenes.includes(s),
      );
    }
  }

  for (const e of sceneEvents) {
    for (let i = 0; i < e.people.length; i++) {
      for (let j = i + 1; j < e.people.length; j++) {
        const a = e.people[i]!;
        const b = e.people[j]!;
        if (!guestBySlug[a] || !guestBySlug[b]) continue;
        add(a, b).events.push(e.title);
      }
    }
  }

  return [...map.values()];
}

const SIZE = 760;
const R_OUTER = 300;
const R_INNER = 168;
// Room outside the ring so long names are not cut off at the edge.
const PAD = 130;

function ConnectionsPage() {
  const edges = useMemo(buildEdges, []);
  const [focus, setFocus] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const navigate = useNavigate();

  // Every dot is a real link to that name's overview card. A plain click stays
  // inside the app; cmd/ctrl/shift/middle-click still opens a new tab.
  const openCard = (slug: string) => (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    navigate({ to: "/explore/$slug", params: { slug } });
  };

  const positions = useMemo(() => {
    // Rounded to 3 decimals: server and browser float math can differ in the
    // last digit, which React reports as a hydration mismatch.
    const r = (n: number) => Math.round(n * 1000) / 1000;
    const map: Record<string, { x: number; y: number; angle: number }> = {};
    guests.forEach((g, i) => {
      const angle = (i / guests.length) * Math.PI * 2 - Math.PI / 2;
      map[g.slug] = {
        x: r(SIZE / 2 + Math.cos(angle) * R_OUTER),
        y: r(SIZE / 2 + Math.sin(angle) * R_OUTER),
        angle,
      };
    });
    figureNames.forEach((name, i) => {
      const angle = (i / figureNames.length) * Math.PI * 2 - Math.PI / 2;
      map[name] = {
        x: r(SIZE / 2 + Math.cos(angle) * R_INNER),
        y: r(SIZE / 2 + Math.sin(angle) * R_INNER),
        angle,
      };
    });
    return map;
  }, []);

  // guest <-> recurring figure links, drawn faintly behind the guest web
  const figureLinks = useMemo(() => {
    const out: { slug: string; name: string }[] = [];
    for (const { name, events } of recurringFigures) {
      const slugs = new Set(events.flatMap((e) => e.people));
      for (const slug of slugs) if (guestBySlug[slug]) out.push({ slug, name });
    }
    return out;
  }, []);

  const degree = useMemo(() => {
    const d: Record<string, number> = {};
    for (const e of edges) {
      d[e.a] = (d[e.a] ?? 0) + 1;
      d[e.b] = (d[e.b] ?? 0) + 1;
    }
    return d;
  }, [edges]);

  // A hovered name lights up the web; a pinned name (from the connectors list
  // below) also fills in the detail panel.
  const active = focus ?? hover;
  const activeEdges = active
    ? edges.filter((e) => e.a === active || e.b === active)
    : [];
  const isLit = (slug: string) =>
    !active ||
    slug === active ||
    activeEdges.some((e) => e.a === slug || e.b === slug);

  const focusEdges = focus
    ? edges.filter((e) => e.a === focus || e.b === focus)
    : [];
  const focusFigures = focus
    ? recurringFigures.filter((f) =>
        f.events.some((e) => e.people.includes(focus)),
      )
    : [];
  const focusEvents = focus ? (eventsByGuest[focus] ?? []) : [];

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
            Listen to enough episodes and the same names keep coming back. Click
            anyone below to open their card: who they came up with, which nights
            they were both at, and the famous names orbiting all of them.
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
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-gold/20 bg-card p-2 sm:p-6">
            <svg
              viewBox={`${-PAD} 0 ${SIZE + PAD * 2} ${SIZE}`}
              className="mx-auto h-auto w-full max-w-[900px]"
              role="group"
              aria-label="Network map of Night Fever guests, the nights they shared and the figures around them. Every name opens its own overview card."
              onMouseLeave={() => setHover(null)}
            >
              {/* faint inner links to recurring figures */}
              {figureLinks.map(({ slug, name }) => {
                const p1 = positions[slug]!;
                const p2 = positions[name]!;
                const lit = !active || slug === active;
                return (
                  <line
                    key={`${slug}-${name}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke="var(--color-gold)"
                    strokeOpacity={lit ? (active ? 0.4 : 0.12) : 0.04}
                    strokeWidth={1}
                  />
                );
              })}

              {edges.map((e) => {
                const p1 = positions[e.a]!;
                const p2 = positions[e.b]!;
                const lit = !active || e.a === active || e.b === active;
                return (
                  <line
                    key={`${e.a}-${e.b}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={lit ? "var(--color-pink)" : "var(--color-border)"}
                    strokeOpacity={lit ? (active ? 0.85 : 0.35) : 0.15}
                    strokeWidth={lit && active ? 2 : 1}
                  />
                );
              })}

              {recurringFigures.map(({ name, events }, i) => {
                const p = positions[name]!;
                const lit =
                  !active || events.some((e) => e.people.includes(active));
                const flip = Math.cos(p.angle) < 0;
                // Alternate the label distance so names on the crowded inner
                // ring fall on two clearly separated rings instead of one line.
                const off = i % 2 === 0 ? 18 : 62;
                const entity = entityFor(name);
                const external = name === "World of Wonder";
                const href = external
                  ? WOW_URL
                  : entity
                    ? `/explore/${entity.slug}`
                    : undefined;
                const cardSlug = external ? undefined : entity?.slug;
                const dot = (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={3 + events.length}
                    fill="var(--color-cream)"
                    fillOpacity={0.55}
                  />
                );
                const label = (
                  <text
                    x={(p.x + Math.cos(p.angle) * off).toFixed(2)}
                    y={(p.y + Math.sin(p.angle) * off).toFixed(2)}
                    textAnchor={flip ? "end" : "start"}
                    dominantBaseline="middle"
                    fontSize="11"
                    fill="var(--color-cream)"
                    fillOpacity={0.7}
                    className={
                      external
                        ? "underline decoration-gold/60 underline-offset-2 hover:fill-[var(--color-gold)]"
                        : undefined
                    }
                  >
                    {name}
                  </text>
                );
                return (
                  <g
                    key={name}
                    opacity={lit ? 1 : 0.15}
                    onMouseEnter={() => setHover(name)}
                  >
                    {href ? (
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        aria-label={
                          external
                            ? "World of Wonder website"
                            : `Open the ${name} overview card`
                        }
                        onClick={cardSlug ? openCard(cardSlug) : undefined}
                        className="cursor-pointer"
                      >
                        {dot}
                        {label}
                      </a>
                    ) : (
                      <>
                        {dot}
                        {label}
                      </>
                    )}
                  </g>
                );
              })}

              {guests.map((g) => {
                const p = positions[g.slug]!;
                const lit = isLit(g.slug);
                const size = 7 + (degree[g.slug] ?? 0) * 1.4;
                const flip = Math.cos(p.angle) < 0;
                return (
                  <g
                    key={g.slug}
                    opacity={lit ? 1 : 0.25}
                    onMouseEnter={() => setHover(g.slug)}
                  >
                    <a
                      href={`/explore/${g.slug}`}
                      aria-label={`Open the ${g.name} overview card`}
                      onClick={openCard(g.slug)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={size}
                        fill={
                          active === g.slug
                            ? "var(--color-pink)"
                            : "var(--color-gold)"
                        }
                      />
                    </a>
                    <text
                      x={(p.x + Math.cos(p.angle) * (size + 10)).toFixed(2)}
                      y={(p.y + Math.sin(p.angle) * (size + 10)).toFixed(2)}
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
            Gold dots are guests, pale dots in the middle are the names that keep
            coming up. Bigger dot = more connections. Click any dot to open that
            name&rsquo;s card; hover to light up their circle.
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
                      {e.events.length > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Both there for:{" "}
                          <EntityText text={e.events.join("; ")} />
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>

              {focusEvents.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
                    Nights they were part of
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {focusEvents.map((e) => (
                      <li
                        key={e.id}
                        className="text-sm text-card-foreground/80"
                      >
                        <span className="font-semibold text-gold">
                          {e.when}
                        </span>{" "}
                        &mdash; <EntityText text={e.title} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {focusFigures.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
                    In the same rooms
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {focusFigures.map((f) =>
                      f.name === "World of Wonder" ? (
                        <a
                          key={f.name}
                          href={WOW_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-gold/40 bg-secondary px-3 py-1 text-xs text-gold transition hover:bg-gold hover:text-gold-foreground"
                        >
                          {f.name}
                        </a>
                      ) : (
                        <EntityLinkChip key={f.name} name={f.name} />
                      ),
                    )}
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/explore/$slug"
                  params={{ slug: focus }}
                  className="inline-flex rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground transition hover:bg-spotlight"
                >
                  Open their full card
                </Link>
                <Link
                  to="/guests"
                  hash={focus}
                  className="inline-flex rounded-xl border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-gold-foreground"
                >
                  Read their full timeline
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
              <p>
                Click a name under &ldquo;The great connectors&rdquo; below to
                see their circle, or click any dot in the web to open their
                card.
              </p>
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

      {/* Recurring figures */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            The names everyone drops
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            The names in the rooms — hosts, regulars and legends who keep
            surfacing in more than one of the nights the guests lived through,
            whether or not they ever sat down for an interview.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {recurringFigures.map((f) => (
              <span
                key={f.name}
                className="rounded-full border border-gold/25 bg-card px-4 py-2 text-sm text-card-foreground/85"
              >
                {f.name === "World of Wonder" ? (
                  <a
                    href={WOW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-gold"
                  >
                    {f.name}
                  </a>
                ) : (
                  <EntityLinkChip
                    name={f.name}
                    className="transition hover:text-gold"
                  />
                )}{" "}
                <span className="text-xs text-pink">{f.events.length}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12 text-center">
        <p className="text-sm text-muted-foreground">
          Fan page for{" "}
          <a
            href={SHOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink"
          >
            <em>Night Fever</em>
          </a>{" "}
          by{" "}
          <a
            href={WOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink"
          >
            World of Wonder
          </a>.{" "}
          <Link to="/" className="text-gold transition hover:text-pink">
            Home
          </Link>{" "}
          &middot;{" "}
          <Link to="/guests" className="text-gold transition hover:text-pink">
            Guests
          </Link>{" "}
          &middot;{" "}
          <Link
            to="/timeline"
            className="text-gold transition hover:text-pink"
          >
            Timeline
          </Link>{" "}
          &middot;{" "}
          <Link to="/about" className="text-gold transition hover:text-pink">
            About
          </Link>
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-xs text-muted-foreground/60">
          <EntityText text="Connections drawn from public interviews and press coverage. Not affiliated with World of Wonder or the Night Fever podcast." />
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center">
          <LegalNote />
        </p>
      </footer>
    </main>
  );
}

/** Small chip that sends a recurring name to its single overview card. */
function EntityLinkChip({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const navigate = useNavigate();
  const entity = entityFor(name);
  if (!entity) return <span className={className}>{name}</span>;
  return (
    <a
      href={`/explore/${entity.slug}`}
      aria-label={`Open the ${name} overview card`}
      onClick={(e) => {
        if (
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          e.button !== 0
        ) {
          return;
        }
        e.preventDefault();
        navigate({ to: "/explore/$slug", params: { slug: entity.slug } });
      }}
      className={className}
    >
      {name}
    </a>
  );
}
