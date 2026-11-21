import type { CSSProperties } from "react";
import cardSky from "@/assets/card-pink.webp";
import cardSkyPhone from "@/assets/card-pink-phone.webp";
import { linkPlace } from "@/lib/link-label";
import { GuestEpisodeLinks } from "@/components/guest-episode-links";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CardSections } from "@/components/card-sections";
import { abs, cardDescription, jsonLd, pageDescription, pageHead, SITE, SITE_NAME } from "@/lib/seo";
import { EntityText } from "../components/entity-text";
import { SiteFooter } from "@/components/site-footer";
import { MemoriamSections } from "@/components/memoriam";
import { ClubProfileSections } from "@/components/club-profile";
import { PersonProfileSections } from "@/components/person-profile";
import { MentorTree } from "@/components/mentor-tree";
import { ConnectorBadge, HallOfFameBadge } from "@/components/badges";
import { guestBySlug } from "@/data/guests";
import { getCardPage } from "@/lib/card-view.functions";
import { LinkDataProvider } from "@/lib/link-index";
import "@fontsource/covered-by-your-grace/400.css";


export const Route = createFileRoute("/explore/$slug")({
  staticData: { sitemap: true },
  // The server works out the card and sends only what this page shows (page weight, 16 Nov 2026): the whole A–Z never
  // reaches the browser for a card. Redirects (capitals, guests with an AFTERPARTY) and the 404 come from the server too.
  loader: ({ params }) => getCardPage({ data: params.slug }),
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const d = loaderData;
    const club = d.club;
    const mem = d.mem;
    // In memoriam and club pages are full pages, not cards (SEO check, 16 Nov 2026): the name with its years in the title,
    // their own story as the description, and their own share picture (public/og/explore/<slug>.jpg, scripts/og-cards.py).
    const years = mem ? `${mem.born}–${mem.died}` : club ? `${club.opened}–${club.closed}` : "";
    const title = mem
      ? `${d.name} (${years}) – in memoriam | Night Fever AFTERPARTY`
      : club
        ? `${d.name} (${years}) – New York club | Night Fever AFTERPARTY`
        : `${d.name} - ${d.category} | Night Fever AFTERPARTY`;
    // Clean story line + "Mentioned in N Night Fever episodes" (SEO check, 4 Nov 2026): no research notes, no long code lists.
    const description = mem || club ? pageDescription(d.name, mem?.story ?? d.story, d.episodes) : cardDescription(d.name, d.story, d.episodes);
    const path = `/explore/${d.slug}`;
    // Same rule as scripts/og-cards-data.ts: a share picture wherever the page has its header photo.
    const image = (mem && d.portrait) || club?.portrait ? `/og/explore/${d.slug}.jpg` : "/og/explore.jpg";
    const head = pageHead({ path, title, description, image, type: "article", noindex: d.thin });
    const TYPES: Record<string, string> = { Person: "Person", Club: "NightClub", Location: "Place", Book: "Book", Film: "Movie", TV: "TVSeries", Organisation: "Organization" };
    const thing: Record<string, unknown> = { "@type": TYPES[d.rawCategory] ?? "Thing", name: d.name };
    if (/wikipedia\.org|imdb\.com/.test(d.link)) thing["sameAs"] = d.link;
    if (club) {
      thing["description"] = club.story;
      thing["address"] = { "@type": "PostalAddress", streetAddress: club.address, addressLocality: "New York", addressCountry: "US" };
      thing["foundingDate"] = club.opened;
      thing["dissolutionDate"] = club.closed;
    }
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
          ...(image !== "/og/explore.jpg" ? { image: abs(image) } : {}),
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE },
          about: thing,
        }),
      ],
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

const KIND: Record<string, string> = {
  Person: "az-ink", Organisation: "az-ink", Podcast: "az-ink", Club: "az-pink", Event: "az-pink", Music: "az-yellow", Film: "az-yellow", TV: "az-yellow",
};

function EntityPage() {
  const { view: e } = Route.useLoaderData();
  const g = e.guest ? guestBySlug[e.guest] : undefined;
  // Club pages (Lisa, 13 Nov 2026) use the same header: the club photo fills it, its polaroid is taped on the right.
  const club = e.club ?? undefined;
  const pic = e.pic ?? undefined;
  // In memoriam (Lisa, 4 Nov 2026, option C): black IN MEMORIAM band (on the name card since 5 Nov), "aka" and dates on the name card, guest quotes wall below.
  const mem = e.mem ?? undefined;
  // Person pages (Lisa, 20 Nov 2026): story, guest quotes and timeline for living people the guests talk about.
  const profile = e.profile ?? undefined;

  return (
    <LinkDataProvider value={e.links}>
    <main className="min-h-screen bg-background text-foreground">
      {/* A–Z card header (Lisa, 30 Oct 2026, "tiles 4"): the disco-ball mirror tiles of the people polaroids as big pink/black dots, behind flyer strips. */}
      {/* People with a polaroid (Lisa, 2 Nov 2026, "combo 3"): their photo fills the header, the name sits on a taped card and the
          polaroid is taped on the right with its credit. */}
      <section
        className={`${pic ? "card-head card-head-photo px-4" : "card-head px-4"}`}
        style={
          (pic
            ? ({ "--photo": `url(${pic.photo})`, "--photo-phone": `url(${pic.phone ?? pic.photo})`, "--focus": pic.focus } as CSSProperties)
            : ({ "--sky": `url(${cardSky})`, "--sky-phone": `url(${cardSkyPhone})` } as CSSProperties))
        }
      >
        {pic && (
          <figure className="card-polaroid">
            <img src={pic.polaroid} alt={club ? `${e.name}, ${club.address}` : `${e.name} polaroid`} width={720} height={893} />
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
          {/* Badges (Lisa, 21 Nov 2026): gold for the Hall of Fame top 10, pink for the top 100 great connectors. */}
          {(e.tree || e.connector) && (
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wider text-cream">
              {e.tree && <span className="inline-flex items-center gap-2"><HallOfFameBadge rank={e.tree.rank} small /><a href="#mentor-tree" className="hover:text-pink">Hall of Fame</a></span>}
              {e.connector && <span className="inline-flex items-center gap-2"><ConnectorBadge rank={e.connector} small /><Link to="/network" className="hover:text-pink">Great connector</Link></span>}
            </p>
          )}
          {/* No polaroid yet: aka + dates sit on a small taped paper card so they stay readable over the dots (5 Nov 2026). */}
          {mem && (
            <div className={pic ? undefined : "memoriam-meta"}>
              {mem.aka && <p className="memoriam-aka">aka {mem.aka}</p>}
              <p className="mt-2 text-sm text-muted-foreground">{mem.born} – {mem.died} · {mem.diedLine.replace(/^Died/, "died")}</p>
            </div>
          )}
          {club && (
            <div className={pic ? undefined : "memoriam-meta"}>
              {club.aka && <p className="memoriam-aka">{club.aka}</p>}
              <p className="mt-2 text-sm text-muted-foreground">{club.address} · {club.opened} – {club.closed}</p>
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

      <div className={`mx-auto ${mem || club || profile ? "max-w-5xl space-y-14" : "max-w-4xl space-y-12"} px-6 pb-20`}>
        {mem && <MemoriamSections m={mem} name={e.name} />}
        {club && <ClubProfileSections c={club} name={e.name} slug={e.slug} night={!!e.night} />}
        {profile && <PersonProfileSections m={profile} name={e.name} />}
        {/* Hall of Fame family tree (Lisa, 21 Nov 2026): top 10 mentors only. */}
        {e.tree && <MentorTree t={e.tree} badge={<HallOfFameBadge rank={e.tree.rank} />} />}
        <CardSections v={e} />
      </div>
          <SiteFooter />
</main>
    </LinkDataProvider>
  );
}
