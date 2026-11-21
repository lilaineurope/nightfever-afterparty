import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { SiteFooter } from "@/components/site-footer";
import { LinkDataProvider } from "@/lib/link-index";
import { EntityLink } from "@/components/entity-link";
import { ConnectorBadge, HallOfFameBadge } from "@/components/badges";
import { getHallOfFame } from "@/lib/hall-of-fame.functions";
import { points } from "@/lib/mentor-tree";
import type { CSSProperties } from "react";
import wall from "@/assets/hall-of-fame-wall.webp";
import wallPhone from "@/assets/hall-of-fame-wall-phone.webp";

// The Hall of Fame page (Lisa, 21 Nov 2026: "create the hall of fame website with top 10 on top"): one top 100 - the
// Hall of Fame top 10 with their gold stamps first, then places 11-100, the great connectors, with the pink sticker.
// The order comes from src/lib/mentor-rank.ts and src/lib/connector-rank.ts; the data from the server (hall-of-fame.server.ts).

export const Route = createFileRoute("/hall-of-fame")({
  staticData: { sitemap: true },
  loader: () => getHallOfFame(),
  component: HallOfFamePage,
  head: () =>
    pageHead({
      path: "/hall-of-fame",
      title: "Hall of Fame - the top 100 of the downtown scene | Night Fever AFTERPARTY",
      description: "The AFTERPARTY Hall of Fame: the top 10 who lifted the New York club scene the most, as the Night Fever guests tell it, and the 90 great connectors after them.",
      image: "/og/home.jpg",
    }),
});

function HallOfFamePage() {
  const v = Route.useLoaderData();
  return (
    <LinkDataProvider value={v.links}>
    <main
      className="page-sky min-h-screen bg-background text-foreground"
      style={{ "--sky": `url(${wall})`, "--sky-phone": `url(${wallPhone})` } as CSSProperties}
    >
      {/* Header (Lisa, 21 Nov 2026, "hall of fame needs a cover header image"): the top 10's polaroids as a wall, in the
          photocopy halftone, fading into the page (scripts/page-headers/fade.py, src/assets/hall-of-fame-wall*.webp). */}
      <section className="page-head px-4 text-center">
        <h1 className="timeline-title">
          <span className="timeline-strip timeline-strip-ink">The AFTERPARTY</span>
          <br />
          <span className="timeline-strip timeline-strip-pink">Hall of Fame</span>
        </h1>
        <p className="timeline-tag">The top 100 of the scene, as the guests tell it.</p>
      </section>
      <div className="mx-4 mb-12 max-w-3xl border-2 border-cream bg-card p-5 text-center shadow-[6px_6px_0_0_#111] sm:mx-auto sm:p-6">
        <p className="leading-relaxed text-cream sm:text-lg">
          On top, the 10 who lifted others the most: who gave them a start, stood by them and opened doors for them, as the
          guests tell it on Night Fever. After them, the great connectors - the names dropped in the most AFTERPARTIES.
        </p>
        <p className="mt-4 text-sm">
          <Link to="/hall-of-fame-rules" className="font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:text-pink">How this is calculated →</Link>
        </p>
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-4 pb-16 sm:px-6">
        <section aria-labelledby="top-10" className="space-y-6">
          <h2 id="top-10" className="border-b-[3px] border-gold pb-2 text-3xl font-bold uppercase tracking-tight text-cream sm:text-4xl">The top 10</h2>
          <ol className="grid gap-5 md:grid-cols-2">
            {v.top.map((t) => (
              <li key={t.name} className="flex flex-col items-start gap-3 border-2 border-gold bg-card p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
                <div className="w-32 shrink-0 sm:w-36"><HallOfFameBadge rank={t.rank} /></div>
                <div className="min-w-0 space-y-1.5">
                  <EntityLink name={t.name} className="block font-[family-name:var(--font-flyer)] text-2xl uppercase leading-tight text-cream hover:text-pink sm:text-3xl" />
                  <p className="font-[family-name:var(--font-mono-body)] text-xs text-pink">
                    {points(t.score)} points · {t.helped.length} helped · {t.voices} {t.voices === 1 ? "voice" : "voices"}
                  </p>
                  <p className="text-sm leading-snug text-muted-foreground">Helped {t.helped.join(", ")}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-sm text-muted-foreground">Tap a name for their page and family tree. {v.of} people have a Hall of Fame score; the rest see their rank on their own page.</p>
        </section>

        <section aria-labelledby="top-100" className="space-y-6">
          <h2 id="top-100" className="border-b-[3px] border-pink pb-2 text-3xl font-bold uppercase tracking-tight text-cream sm:text-4xl">11 to 100 · Great connectors</h2>
          <p className="max-w-2xl text-muted-foreground">The names dropped in the most AFTERPARTIES, then by mentions - the people who tie the stars together, as on the <Link to="/network" className="text-gold underline underline-offset-2 hover:text-pink">Network</Link>.</p>
          <ol className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {v.rest.map((p) => (
              <li key={p.name} className="flex items-baseline gap-3 border-b border-border pb-2">
                <span className="w-8 shrink-0 text-right font-[family-name:var(--font-flyer)] text-xl text-pink">{p.rank}</span>
                <span className="min-w-0">
                  <EntityLink name={p.name} className="font-[family-name:var(--font-flyer)] uppercase text-cream hover:text-pink" />
                  <span className="block font-[family-name:var(--font-mono-body)] text-[11px] text-muted-foreground">in {p.episodes} AFTERPARTIES · {p.mentions} mentions</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="flex flex-col items-start gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
            <div className="w-28 shrink-0 sm:w-36"><ConnectorBadge rank={11} /></div>
            <p className="min-w-0 max-w-md">Everyone from 11 to 100 wears the pink badge on their page, the top 10 the gold one. One badge per person.</p>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
    </LinkDataProvider>
  );
}
