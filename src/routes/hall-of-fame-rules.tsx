import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { SiteFooter } from "@/components/site-footer";
import { LinkDataProvider } from "@/lib/link-index";
import { EntityLink } from "@/components/entity-link";
import { MentorTree } from "@/components/mentor-tree";
import { ConnectorBadge, HallOfFameBadge } from "@/components/badges";
import { getHallOfFameRules } from "@/lib/hall-of-fame-rules.functions";
import { points } from "@/lib/mentor-tree";

// How the Hall of Fame is worked out (Lisa, 21 Nov 2026: "setup a page where we explain the mechanism, link it to 'under the
// hood' page and then set a link in hall of fame which says how this is calculated"). The rules mirror src/lib/mentor-rank.ts -
// change both together. The top 10 and the example tree come from the server (hall-of-fame-rules.server.ts).

export const Route = createFileRoute("/hall-of-fame-rules")({
  staticData: { sitemap: true },
  loader: () => getHallOfFameRules(),
  component: HallOfFameRules,
  head: () =>
    pageHead({
      path: "/hall-of-fame-rules",
      title: "How the Hall of Fame works | Night Fever AFTERPARTY",
      description: "How the AFTERPARTY Hall of Fame scores the people who lifted the downtown scene: people helped, voices and the family tree, with a worked example.",
      image: "/og/home.jpg",
    }),
});

const TIERS = [
  { pts: 3, name: "Lifted", what: "Gave them a start, a first job or a part. Discovered them, trained them, took them under their wing, was their house mother.", eg: "Kim Hastreiter gives Lauren Ezersky her Paper column: \"go do Donna Karan\"." },
  { pts: 2, name: "Stood by them", what: "Support through hard times: an intervention, a roof over their head, raising money, championing them.", eg: "Kim stages an intervention and takes Joey Arias to rehab for three months." },
  { pts: 1, name: "Opened a door", what: "One introduction, a recommendation, a one-off booking, an early influence.", eg: "Lincoln Palsgrove introduces Michelle Visage to RuPaul on the Red Zone dance floor." },
];

function HallOfFameRules() {
  const v = Route.useLoaderData();
  const max = Math.max(...v.top.map((t) => t.score), 1);
  const h2 = "text-2xl font-bold uppercase tracking-tight text-cream sm:text-3xl";
  return (
    <LinkDataProvider value={v.links}>
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-12 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <Link to="/" hash="hall-of-fame" className="text-xs font-medium uppercase tracking-[0.2em] text-gold transition hover:text-pink">
            &larr; Hall of Fame
          </Link>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            How the Hall of <span className="text-pink text-glow-pink">Fame</span> works
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The Hall of Fame is for the people who lifted the scene: who gave others a start, stood by them and opened doors for
            them, as the guests tell it on Night Fever. Every moment comes from an episode, with its timestamp.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-14 px-6 pb-16">
        <section aria-labelledby="r1" className="space-y-4">
          <h2 id="r1" className={h2}><span className="text-pink">1</span> Every person helped counts once</h2>
          <p className="max-w-2xl text-muted-foreground">Each person a mentor helped scores once, by the biggest help they got from them. Telling the same story twice doesn't count double.</p>
          <ul className="grid gap-4 sm:grid-cols-3">
            {TIERS.map((t, i) => (
              <li key={t.name} className={`grid content-start gap-2 border-2 border-gold p-5 ${i === 0 ? "bg-gold text-gold-foreground" : "bg-card"}`}>
                <p className="flex items-baseline gap-2"><span className={`font-[family-name:var(--font-flyer)] text-5xl leading-none ${i === 0 ? "text-pink" : "text-cream"}`}>{t.pts}</span><span className="text-xs uppercase tracking-widest">{t.pts === 1 ? "point" : "points"}</span></p>
                <h3 className="text-lg font-bold uppercase">{t.name}</h3>
                <p className="text-sm">{t.what}</p>
                <p className={`border-t border-dashed pt-2 text-xs ${i === 0 ? "border-gold-foreground/40 opacity-80" : "border-border text-muted-foreground"}`}>{t.eg}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="r2" className="space-y-3">
          <h2 id="r2" className={h2}><span className="text-pink">2</span> +1 for every voice</h2>
          <p className="max-w-2xl text-muted-foreground">
            Every different person who tells about the help on the show adds a point. A mentor telling their own good deeds is no voice -
            what counts is the people they helped, and the others who saw it, saying so.
          </p>
        </section>

        <section aria-labelledby="r3" className="space-y-3">
          <h2 id="r3" className={h2}><span className="text-pink">3</span> +½ for the family tree</h2>
          <p className="max-w-2xl text-muted-foreground">
            When someone they lifted goes on to lift others, half a point for each of those people - one generation down. Kim
            Hastreiter lifted Mickey Boardman at Paper, and Mickey lifted Drew Elliott: half a point for Kim.
          </p>
        </section>

        <section aria-labelledby="r4" className="space-y-4">
          <h2 id="r4" className={h2}><span className="text-pink">4</span> The fine print</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              ["Ties", "Same score? The one mentioned most across every AFTERPARTY goes first."],
              ["Direction", "Only the one who helped scores. The one helped shows \"Under the wing of\" on their page."],
              ["Kept out", "Michael Alig gets no place in the Hall of Fame, and the family tree never runs through him."],
              ["Where it comes from", "Every new AFTERPARTY's transcript is searched for moments of help - mentor, under my wing, gave me my first job, looked after, raised money - and each real one is added with its episode and timestamp."],
            ].map(([t, d]) => (
              <li key={t} className="border-2 border-gold bg-card p-5">
                <h3 className="font-bold uppercase text-cream">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="badges" className="space-y-4">
          <h2 id="badges" className={h2}>The badges</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 border-2 border-gold bg-card p-5">
              <HallOfFameBadge rank={1} />
              <p className="text-sm text-muted-foreground"><b className="text-cream">Gold door stamp:</b> the Hall of Fame top 10. They get their family tree on their page.</p>
            </div>
            <div className="flex items-center gap-4 border-2 border-gold bg-card p-5">
              <ConnectorBadge rank={1} />
              <p className="text-sm text-muted-foreground"><b className="text-cream">Pink door stamp:</b> the top 100 great connectors - the names dropped in the most AFTERPARTIES, as on the <Link to="/network" className="text-gold underline underline-offset-2 hover:text-pink">Network</Link>.</p>
            </div>
          </div>
        </section>

        <MentorTree t={v.example} title={`Example: ${v.example.name}`} badge={<HallOfFameBadge rank={v.example.rank} />} />

        <section aria-labelledby="top" className="space-y-4">
          <h2 id="top" className={h2}>The top 10 today</h2>
          <p className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2"><i className="inline-block h-3 w-3 bg-gold" />people helped</span>
            <span className="inline-flex items-center gap-2"><i className="inline-block h-3 w-3 bg-pink" />voices</span>
            <span className="inline-flex items-center gap-2"><i className="hof-tree-sw inline-block h-3 w-3 border border-gold" />family tree</span>
          </p>
          <ol className="space-y-2">
            {v.top.map((t, i) => (
              <li key={t.name} className="grid grid-cols-[1.5rem_minmax(0,10rem)_minmax(0,1fr)_2.5rem] items-center gap-3 text-sm">
                <span className="font-[family-name:var(--font-flyer)] text-muted-foreground">{i + 1}</span>
                <EntityLink name={t.name.replace(/ \(as heard\)$/, "")} className="truncate font-[family-name:var(--font-flyer)] uppercase text-cream hover:text-pink" />
                <span className="flex h-5 border border-border bg-card" aria-label={`${points(t.help)} for people helped, ${t.voices} voices, ${points(t.tree)} family tree`}>
                  <i className="block bg-gold" style={{ width: `${(t.help / max) * 100}%` }} />
                  <i className="block bg-pink" style={{ width: `${(t.voices / max) * 100}%` }} />
                  <i className="hof-tree-sw block" style={{ width: `${(t.tree / max) * 100}%` }} />
                </span>
                <span className="text-right font-[family-name:var(--font-flyer)] text-cream">{points(t.score)}</span>
              </li>
            ))}
          </ol>
          <p className="text-sm text-muted-foreground">{v.of} people have a score. Everyone in the top 10 shows on the <Link to="/" hash="hall-of-fame" className="text-gold underline underline-offset-2 hover:text-pink">Hall of Fame</Link>; the rest see their rank on their own page.</p>
        </section>

        <p className="text-sm text-muted-foreground">
          More about how the site is made is <Link to="/under-the-hood" className="text-gold underline decoration-gold/50 underline-offset-2 hover:text-pink">under the hood</Link>.
        </p>
      </div>
      <SiteFooter />
    </main>
    </LinkDataProvider>
  );
}
