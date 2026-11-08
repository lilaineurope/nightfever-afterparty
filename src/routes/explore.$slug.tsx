import type { CSSProperties } from "react";
import cardSky from "@/assets/card-pink.webp";
import cardSkyPhone from "@/assets/card-pink-phone.webp";
import { linkPlace } from "@/lib/link-label";
import { GuestEpisodeLinks } from "@/components/guest-episode-links";
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { CardSections } from "@/components/card-sections";
import { afterpartyOf, entityBySlug, episodeShort, isThinCard } from "../data/entities";
import { abs, cardDescription, cleanStory, jsonLd, pageHead, SITE, SITE_NAME } from "@/lib/seo";
import { episodePath, episodes } from "../data/episodes";
import { EntityText } from "../components/entity-text";
import { GUEST_LINES } from "../data/guest-lines";
import { SiteFooter } from "@/components/site-footer";
import { PERSON_PORTRAITS } from "../data/person-portraits";
import { MEMORIAM } from "../data/memoriam";
import { MemoriamSections } from "@/components/memoriam";
import "@fontsource/covered-by-your-grace/400.css";

export const Route = createFileRoute("/explore/$slug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const e = entityBySlug[params.slug];
    if (!e) throw notFound();
    // One page per guest (Lisa, 1 Nov 2026): a guest with an AFTERPARTY lives on the episode page; old links forward there.
    const ep = afterpartyOf(e);
    if (ep) throw redirect({ to: episodePath(ep), statusCode: 301 });
    // The first story line that still says something once research notes are left out ("Likewise" alone doesn't).
    const lines = [...e.refs.map((r) => r.context), ...e.events.map((ev) => ev.text)].filter((t): t is string => !!t);
    const story = lines.find((t) => cleanStory(t)) ?? lines[0] ?? "";
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
    const title = `${d.name} - ${d.category} | Night Fever AFTERPARTY`;
    // Clean story line + "Mentioned in N Night Fever episodes" (SEO check, 4 Nov 2026): no research notes, no long code lists.
    const description = cardDescription(d.name, d.story, d.episodes);
    const path = `/explore/${d.slug}`;
    const head = pageHead({ path, title, description, image: "/og/explore.jpg", type: "article", noindex: d.thin });
    const TYPES: Record<string, string> = { Person: "Person", Club: "NightClub", Location: "Place", Book: "Book", Film: "Movie", TV: "TVSeries", Organisation: "Organization" };
    const thing: Record<string, unknown> = { "@type": TYPES[d.rawCategory] ?? "Thing", name: d.name };
    if (/wikipedia\.org|imdb\.com/.test(d.link)) thing["sameAs"] = d.link;
    const mem = MEMORIAM[d.slug];
    if (mem) {
      thing["birthDate"] = mem.born;
      thing["deathDate"] = mem.died;
      if (mem.aka) thing["alternateName"] = mem.aka;
      thing["description"] = mem.story;
      if (mem.wikidata) thing["sameAs"] = thing["sameAs"] ? [thing["sameAs"] as string, mem.wikidata] : mem.wikidata;
    }
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

const KIND: Record<string, string> = {
  Person: "az-ink", Organisation: "az-ink", Podcast: "az-ink", Club: "az-pink", Event: "az-pink", Music: "az-yellow", Film: "az-yellow", TV: "az-yellow",
};

function EntityPage() {
  const { slug } = Route.useLoaderData();
  const e = entityBySlug[slug]!;
  const g = e.guest;
  const pic = g ? undefined : PERSON_PORTRAITS[e.slug];
  // In memoriam (Lisa, 4 Nov 2026, option C): black IN MEMORIAM band (on the name card since 5 Nov), "aka" and dates on the name card, guest quotes wall below.
  const mem = g ? undefined : MEMORIAM[e.slug];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* A–Z card header (Lisa, 30 Oct 2026, "tiles 4"): the disco-ball mirror tiles of the people polaroids as big pink/black dots, behind flyer strips. */}
      {/* People with a polaroid (Lisa, 2 Nov 2026, "combo 3"): their photo fills the header, the name sits on a taped card and the
          polaroid is taped on the right with its credit. */}
      <section
        className={`${pic ? "card-head card-head-photo px-4" : "card-head px-4"}`}
        style={
          (pic
            ? ({ "--photo": `url(${pic.photo})`, "--focus": pic.focus } as CSSProperties)
            : ({ "--sky": `url(${cardSky})`, "--sky-phone": `url(${cardSkyPhone})` } as CSSProperties))
        }
      >
        {pic && (
          <figure className="card-polaroid">
            <img src={pic.polaroid} alt={`${e.name} polaroid`} width={720} height={893} />
            <figcaption>{pic.credit}</figcaption>
          </figure>
        )}
        <div className={pic ? "card-namecard" : "mx-auto max-w-4xl"}>
          <Link to="/explore" className="card-back">&larr; Everything A–Z</Link>
          <p className="mt-5">
            {/* IN MEMORIAM band sits on the name card, next to the category (Lisa, 5 Nov 2026): in the header corner it slid under
                the top menu and covered the stickers in the photo. Pictures never cover text, text never covers pictures' text. */}
            {mem && <span className="az-st az-s2 memoriam-band">In memoriam</span>}
            <span className={`az-st az-s2 ${KIND[e.category] ?? "az-paper"}`}>{g ? `Night Fever guest · ${g.episode}` : e.category}</span>
          </p>
          <h1 className="card-title">
            <span className="timeline-strip timeline-strip-ink">{e.name}</span>
          </h1>
          {/* No polaroid yet: aka + dates sit on a small taped paper card so they stay readable over the dots (5 Nov 2026). */}
          {mem && (
            <div className={pic ? undefined : "memoriam-meta"}>
              {mem.aka && <p className="memoriam-aka">aka {mem.aka}</p>}
              <p className="mt-2 text-sm text-muted-foreground">{mem.born} – {mem.died} · {mem.diedLine.replace(/^Died/, "died")}</p>
            </div>
          )}
          {g && <p className="timeline-tag card-tag"><EntityText text={g.tagline} /></p>}
          {g && <GuestEpisodeLinks guest={g} className="mt-6" />}
          {mem?.readMore ? (
            <p className="mt-4">
              <a href={mem.readMore.href} target="_blank" rel="noopener noreferrer" className="card-more">
                Read more {mem.readMore.label} &rarr;
              </a>
            </p>
          ) : e.link && !(g && e.link.includes("wowpresentsplus")) && (
            <p className="mt-4">
              <a href={e.link} target="_blank" rel="noopener noreferrer" className="card-more">
                Read more {linkPlace(e.link)} &rarr;
              </a>
            </p>
          )}
        </div>
      </section>

      <div className={`mx-auto ${mem ? "max-w-5xl space-y-14" : "max-w-4xl space-y-12"} px-6 pb-20`}>
        {mem && <MemoriamSections m={mem} name={e.name} />}
        <CardSections e={e} />
      </div>
          <SiteFooter />
</main>
  );
}
