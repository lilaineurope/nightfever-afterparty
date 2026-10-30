import type { CSSProperties } from "react";
import cardSky from "@/assets/card-pink.webp";
import cardSkyPhone from "@/assets/card-pink-phone.webp";
import { linkPlace } from "@/lib/link-label";
import { GuestEpisodeLinks } from "@/components/guest-episode-links";
import { ClubNightPlaylist } from "@/components/club-night";
import { clubNightFor } from "@/data/club-nights";
import { MusicPlayer } from "@/components/music-player";
import { Timestamp } from "@/components/episode-player";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { entityBySlug, episodeShort, isThinCard, mentionsByEpisode, relatedTo, totalMentions } from "../data/entities";
import { namedOn } from "@/lib/name-links";
import { abs, jsonLd, pageHead, SITE, SITE_NAME } from "@/lib/seo";
import { episodeById, episodePath, episodes } from "../data/episodes";
import { EntityText } from "../components/entity-text";
import { GUEST_LINES } from "../data/guest-lines";
import { EntityLink } from "../components/entity-link";
import { LegalNote } from "../components/legal-links";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/explore/$slug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const e = entityBySlug[params.slug];
    if (!e) throw notFound();
    const story = e.refs.find((r) => r.context)?.context ?? e.events[0]?.text ?? "";
    return {
      slug: e.slug,
      name: e.name,
      category: e.guest ? "Night Fever guest" : e.category,
      rawCategory: e.guest ? "Person" : e.category,
      episodes: [...new Set(e.refs.map((r) => r.episode).filter(Boolean))].map((id) => episodeShort(id as string)),
      story,
      link: e.link ?? "",
      thin: isThinCard(e),
      guest: e.guest ? guestFacts(e.guest.episode, e.guest.tagline) : null,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const d = loaderData;
    const title = `${d.name} - ${d.category} | Night Fever fan page`;
    const eps = d.episodes.length ? ` Mentioned in Night Fever ${d.episodes.join(", ")}.` : "";
    const base = d.story ? `${d.name}: ${d.story}` : `Every story, night and connection around ${d.name} from the Night Fever podcast.`;
    const short = base.length > 150 ? base.slice(0, 147).replace(/\s+\S*$/, "") + "…" : base;
    const description = (/[.!?…]$/.test(short) ? short : `${short}.`) + eps;
    const path = `/explore/${d.slug}`;
    const head = pageHead({ path, title, description, image: "/og/explore.jpg", type: "article", noindex: d.thin });
    const TYPES: Record<string, string> = { Person: "Person", Club: "NightClub", Location: "Place", Book: "Book", Film: "Movie", TV: "TVSeries", Organisation: "Organization" };
    const thing: Record<string, unknown> = { "@type": TYPES[d.rawCategory] ?? "Thing", name: d.name };
    if (/wikipedia\.org|imdb\.com/.test(d.link)) thing["sameAs"] = d.link;
    // Guests: a fuller Person (what they're known for, and the Night Fever episode they're interviewed in) - Lisa, 27 Oct 2026.
    if (d.guest) {
      thing["description"] = d.guest.tagline;
      if (d.guest.line) thing["jobTitle"] = d.guest.line;
      if (d.guest.path) {
        thing["image"] = abs(`/og/${d.guest.id}.jpg`);
        thing["subjectOf"] = { "@type": "PodcastEpisode", name: `Night Fever ${d.guest.code} - the AFTERPARTY`, url: abs(d.guest.path) };
      }
    }
    return {
      ...head,
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          url: abs(path),
          description,
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE },
          about: thing,
        }),
      ],
    };
  },
  notFoundComponent: EntityNotFound,
  component: EntityPage,
});

/** "Season 1, Episode 6" -> the episode id, code, guest line and AFTERPARTY page (when there is one) for the Person markup. */
function guestFacts(episode: string, tagline: string) {
  const m = episode.match(/Season (\d+), Episode (\d+)/);
  const id = m ? `s${(m[1] ?? "").padStart(2, "0")}e${(m[2] ?? "").padStart(2, "0")}` : "";
  const ep = id ? episodes.find((x) => x.id === id) : undefined;
  return {
    id,
    code: id.toUpperCase(),
    tagline,
    line: GUEST_LINES[id] ?? null,
    path: ep ? episodePath(ep.id) : null,
  };
}

function EntityNotFound() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-cream">Oops - no card for that name yet!</h1>
      <Link to="/explore" className="mt-6 inline-block text-gold hover:text-pink">Browse everything A&ndash;Z &rarr;</Link>
    </main>
  );
}

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";

const KIND: Record<string, string> = {
  Person: "az-ink", Organisation: "az-ink", Podcast: "az-ink", Club: "az-pink", Event: "az-pink", Music: "az-yellow", Film: "az-yellow", TV: "az-yellow",
};

function EntityPage() {
  const { slug } = Route.useLoaderData();
  const e = entityBySlug[slug]!;
  const g = e.guest;
  const related = relatedTo(e);
  const allMentions = totalMentions(e);
  const perEpisode = mentionsByEpisode(e);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* A–Z card header (Lisa, 30 Oct 2026, "tiles 4"): the disco-ball mirror tiles of the people polaroids as big pink/black dots, behind flyer strips. */}
      <section
        className="card-head px-4"
        style={{ "--sky": `url(${cardSky})`, "--sky-phone": `url(${cardSkyPhone})` } as CSSProperties}
      >
        <div className="mx-auto max-w-4xl">
          <Link to="/explore" className="card-back">&larr; Everything A–Z</Link>
          <p className="mt-5">
            <span className={`az-st az-s2 ${KIND[e.category] ?? "az-paper"}`}>{g ? `Night Fever guest · ${g.episode}` : e.category}</span>
          </p>
          <h1 className="card-title">
            <span className="timeline-strip timeline-strip-ink">{e.name}</span>
          </h1>
          {g && <p className="timeline-tag card-tag"><EntityText text={g.tagline} /></p>}
          {g && <GuestEpisodeLinks guest={g} className="mt-6" />}
          {e.link && !(g && e.link.includes("wowpresentsplus")) && (
            <p className="mt-4">
              <a href={e.link} target="_blank" rel="noopener noreferrer" className="card-more">
                Read more {linkPlace(e.link)} &rarr;
              </a>
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-6 pb-20">
        <MusicPlayer slug={e.slug} />
        {clubNightFor(e.slug) && <ClubNightPlaylist night={clubNightFor(e.slug)!} />}
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
                      {r.time === "On camera" ? "On camera" : <Timestamp episodeId={episode.id} time={r.time} />}
                      {" · "}{r.mentions === 0 ? "—" : `${r.mentions} mention${r.mentions === 1 ? "" : "s"} in this episode`}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground"><EntityText text={r.context} self={e.name} /></p>
                  {r.fashion && (
                    <p className="mt-2 text-sm text-muted-foreground"><span className="mr-2 text-xs font-medium uppercase text-gold">Fashion</span><EntityText text={r.fashion} self={e.name} /></p>
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

        {namedOn(e).length > 0 && (
          <section>
            <h2 className={h}>Also named on these cards</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {namedOn(e).map((x) => (
                <Link key={`${x.entity.slug}-${x.ref.episode}`} to="/explore/$slug" params={{ slug: x.entity.slug }} className={chip}>
                  {x.entity.name}
                  {x.ref.episode && <span className="ml-1.5 text-muted-foreground">{episodeShort(x.ref.episode)}</span>}
                </Link>
              ))}
            </div>
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
