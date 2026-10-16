import { linkPlace } from "@/lib/link-label";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { entityBySlug, episodeShort, mentionsByEpisode, relatedTo, totalMentions } from "../data/entities";
import { episodeById, episodePath } from "../data/episodes";
import { EntityText } from "../components/entity-text";
import { EntityLink } from "../components/entity-link";
import { LegalNote } from "../components/legal-links";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/explore/$slug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const e = entityBySlug[params.slug];
    if (!e) throw notFound();
    return { slug: e.slug, name: e.name, category: e.guest ? "Night Fever guest" : e.category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const title = `${loaderData.name} - ${loaderData.category} | Night Fever fan page`;
    const desc = `Every story, night and connection around ${loaderData.name} from the Night Fever podcast and the scene it covers. Dive in!`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/explore/${loaderData.slug}` }],
    };
  },
  notFoundComponent: EntityNotFound,
  component: EntityPage,
});

function EntityNotFound() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-cream">Oops - no card for that name yet!</h1>
      <Link to="/explore" className="mt-6 inline-block text-gold hover:text-pink">Browse everything A&ndash;Z &rarr;</Link>
    </main>
  );
}

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-gold/50 hover:text-gold";

function EntityPage() {
  const { slug } = Route.useLoaderData();
  const e = entityBySlug[slug]!;
  const g = e.guest;
  const related = relatedTo(e);
  const allMentions = totalMentions(e);
  const perEpisode = mentionsByEpisode(e);
  const toSec = (t: string) => t.split(":").map(Number).reduce((a, n) => a * 60 + n, 0);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-12 pt-16">
        <div className="mx-auto max-w-4xl">
          <Link to="/explore" className="text-xs font-medium uppercase tracking-[0.2em] text-gold hover:text-pink">
            &larr; Everything A–Z
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-pink">
            {g ? `Night Fever guest · ${g.episode}` : e.category}
          </p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight text-cream text-glow">{e.name}</h1>
          {g && <p className="mt-4 text-lg text-muted-foreground"><EntityText text={g.tagline} /></p>}
          {e.link && (
            <a href={e.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-gold underline underline-offset-4 hover:text-pink">
              Read more {linkPlace(e.link)} &rarr;
            </a>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-6 pb-20">
        {g && (
          <section className="grid gap-8 rounded-2xl border border-border bg-card p-6 md:grid-cols-2">
            <div>
              <h2 className={h}>Timeline</h2>
              <ol className="mt-4 space-y-4 border-l border-gold/25 pl-5">
                {g.timeline.map((t) => (
                  <li key={t.year}>
                    <p className="text-sm font-semibold text-gold">{t.year}</p>
                    <p className="mt-1 text-sm text-card-foreground/80"><EntityText text={t.text} /></p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className={h}>What they are doing now</h2>
                <p className="mt-3 text-sm text-card-foreground/80"><EntityText text={g.now} /></p>
              </div>
              <div>
                <h2 className={h}>Scenes &amp; rooms</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.scenes.map((s) => <EntityLink key={s} name={s} className={chip} />)}
                </div>
              </div>
              <div>
                <h2 className={h}>Connected to</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.linkedTo.map((s) => <EntityLink key={s} name={s} className={chip}>{entityBySlug[s]?.name ?? s}</EntityLink>)}
                </div>
              </div>
              <a href={g.episodeUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex rounded-xl bg-pink px-5 py-2.5 text-sm font-semibold text-pink-foreground hover:bg-pink/90">
                Listen to this episode
              </a>
            </div>
          </section>
        )}

        {e.refs.length > 0 && (
          <section>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className={h}>In the episodes</h2>
              <p className="text-xs text-muted-foreground">
                {allMentions === 0 ? "No counted mentions yet" : `${allMentions} mentions across all episodes`}
                {perEpisode.length > 0 && (
                  <span className="text-gold">
                    {" - "}
                    {perEpisode.map((p) => `${episodeShort(p.episode)} ${p.count}`).join(" · ")}
                  </span>
                )}
              </p>
            </div>
            <ul className="mt-4 space-y-3">
              {e.refs.map((r) => {
                const episode = episodeById(r.episode ?? "s06e01");
                return (
                <li key={`${r.episode}-${r.rank}`} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <Link to={episodePath(episode.id)} className="font-semibold text-gold hover:text-pink">
                      S{episode.season}E{episode.episode} · {episode.guest}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {r.time === "On camera" ? "On camera" : !episode.listenUrl.includes("/episode/") ? (
                        <span className="font-mono">{r.time}</span>
                      ) : (
                        <a href={`${episode.listenUrl}?t=${toSec(r.time) * 1000}`} target="_blank" rel="noreferrer" className="font-mono text-gold hover:text-pink">{r.time}</a>
                      )}
                      {" · "}{r.mentions === 0 ? "—" : `${r.mentions} mention${r.mentions === 1 ? "" : "s"} in this episode`}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground"><EntityText text={r.context} /></p>
                  {r.fashion && (
                    <p className="mt-2 text-sm text-muted-foreground"><span className="mr-2 text-xs font-medium uppercase text-gold">Fashion</span>{r.fashion}</p>
                  )}
                </li>
                );
              })}
            </ul>
          </section>
        )}

        {e.events.length > 0 && (
          <section>
            <h2 className={h}>On the scene timeline</h2>
            <ol className="mt-4 space-y-5 border-l border-gold/25 pl-5">
              {e.events.map((ev) => (
                <li key={ev.id}>
                  <p className="text-xs uppercase tracking-wider text-pink">
                    {ev.when} · <EntityLink name={ev.place.split(",")[0]!} className="hover:text-gold">{ev.place}</EntityLink>
                  </p>
                  <h3 className="mt-1 font-semibold text-gold">{ev.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground"><EntityText text={ev.text} /></p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {ev.people.map((p) => <EntityLink key={p} name={p} className={chip}>{entityBySlug[p]?.name ?? p}</EntityLink>)}
                    {ev.figures.map((f) => <EntityLink key={f} name={f} className={chip} />)}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {e.inGuestStories.length > 0 && (
          <section>
            <h2 className={h}>Pops up in the guests' stories</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {e.inGuestStories.map((x) => <EntityLink key={x.slug} name={x.slug} className={chip}>{x.name}</EntityLink>)}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <h2 className={h}>In the same rooms (aka the gang)</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {related.map((x) => (
                <Link key={x.slug} to="/explore/$slug" params={{ slug: x.slug }} className={chip}>{x.name}</Link>
              ))}
            </div>
          </section>
        )}
      </div>
          <SiteFooter />
</main>
  );
}
