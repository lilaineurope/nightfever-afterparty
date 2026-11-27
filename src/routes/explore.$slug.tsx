import type { CSSProperties } from "react";
import cardSky from "@/assets/card-pink.webp";
import cardSkyPhone from "@/assets/card-pink-phone.webp";
import { linkPlace, showsReadMore } from "@/lib/link-label";
import { GuestEpisodeLinks } from "@/components/guest-episode-links";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CardSections } from "@/components/card-sections";
import { abs, cardDescription, jsonLd, pageDescription, pageHead, SITE, SITE_NAME } from "@/lib/seo";
import { EntityText } from "../components/entity-text";
import { SiteFooter } from "@/components/site-footer";
import { MemoriamSections } from "@/components/memoriam";
import { ClubProfileSections } from "@/components/club-profile";
import { ClubPartsSections } from "@/components/club-parts";
import { PersonProfileSections } from "@/components/person-profile";
import { DiarySections } from "@/components/diary";
import { ColumnIndex } from "@/components/column-index";
import { TheirTapes, TheirWork } from "@/components/their-work";
import { LibraryItemSections, Story } from "@/components/library-item";
import { PlaceMapDrawing, PlaceSections } from "@/components/place-page";
import { AroundTheBlock, BringUsHome, RoomsMapSection } from "@/components/map-sections";
import { libraryShareCover } from "@/lib/library-share";
import { MentorTree } from "@/components/mentor-tree";
import { TREE_ON_PAGE } from "@/lib/mentor-tree";
import { ConnectorBadge, HallOfFameBadge } from "@/components/badges";
import { guestBySlug } from "@/data/guests";
import { episodePath } from "@/data/episodes";
import { getCardPage } from "@/lib/card-view.functions";
import { ROLE_LINES } from "@/data/role-lines";
import { ALTERNATE_NAMES } from "@/data/alternate-names";
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
    // Who someone is in the title (Lisa, 27 Nov 2026, "A1"): "Peppo Vanini – co-owner of Xenon nightclub, New York".
    const role = ROLE_LINES[d.slug];
    const title = mem
      ? `${d.name} (${years})${role ? `, ${role}` : ""} – in memoriam | Night Fever AFTERPARTY`
      : club
        ? `${club.aka && !d.name.includes(club.aka) ? club.aka : d.name} (${years}) – ${club.city ?? "New York"} club | Night Fever AFTERPARTY`
        : role
          ? `${d.name} – ${role} | Night Fever AFTERPARTY`
          : `${d.name} - ${d.category} | Night Fever AFTERPARTY`;
    // Clean story line + "Mentioned in N Night Fever episodes" (SEO check, 4 Nov 2026): no research notes, no long code lists.
    const description = mem || club ? pageDescription(d.name, mem?.story ?? d.story, d.episodes) : cardDescription(d.name, d.story, d.episodes);
    const path = `/explore/${d.slug}`;
    // Same rule as scripts/og-cards-data.ts: a share picture wherever the page has its header photo.
    // Library items with a real cover (Lisa, 21 Nov 2026) share their cover picture too.
    const it0 = d.view.item;
    const libraryPic = !!it0?.cover && libraryShareCover(it0.shelf, it0.cover.mast ? "mast" : "book");
    // Living-person pages with a polaroid share their own picture too (Lisa, 27 Nov 2026, "A5").
    const image = (mem && d.portrait) || club?.portrait || libraryPic || (d.view.profile && d.portrait) ? `/og/explore/${d.slug}.jpg` : "/og/explore.jpg";
    const head = pageHead({ path, title, description, image, type: "article", noindex: d.thin });
    const TYPES: Record<string, string> = { Person: "Person", Club: "NightClub", Location: "Place", Book: "Book", Diary: "Book", Film: "Movie", TV: "TVSeries", Organisation: "Organization" };
    const thing: Record<string, unknown> = { "@type": TYPES[d.rawCategory] ?? "Thing", name: d.name };
    if (/wikipedia\.org|imdb\.com/.test(d.link)) thing["sameAs"] = d.link;
    if (club) {
      thing["description"] = club.story;
      thing["address"] = { "@type": "PostalAddress", streetAddress: club.address, addressLocality: club.city ?? "New York", addressCountry: club.country ?? "US" };
      thing["foundingDate"] = club.opened;
      thing["dissolutionDate"] = club.closed;
    }
    // Other names Google should know (Lisa, 27 Nov 2026, "A3"): the club's aka plus src/data/alternate-names.ts.
    const alt = [...new Set([...(club?.aka ? [club.aka] : []), ...(mem?.aka ? [mem.aka] : []), ...(ALTERNATE_NAMES[d.slug] ?? [])])].filter((n) => n !== d.name);
    if (alt.length) thing["alternateName"] = alt.length === 1 ? alt[0] : alt;
    if (role && !club) thing["description"] = role.charAt(0).toUpperCase() + role.slice(1);
    // Place pages (Lisa, 22 Nov 2026): the pin as GeoCoordinates.
    const geo = d.view.place?.geo;
    if (geo) thing["geo"] = { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng };
    if (mem) {
      thing["birthDate"] = mem.born;
      thing["deathDate"] = mem.died;
      thing["description"] = mem.story;
      if (mem.wikidata) thing["sameAs"] = thing["sameAs"] ? [thing["sameAs"] as string, mem.wikidata] : mem.wikidata;
    }
    // Library items (Lisa, 21 Nov 2026): a book with its author, publisher, year, ISBN and cover.
    const it = d.view.item;
    if (it?.facts) {
      if (it.facts.author) thing["author"] = { "@type": "Person", name: it.facts.author };
      if (it.facts.publisher) thing["publisher"] = { "@type": "Organization", name: it.facts.publisher };
      if (it.facts.year) thing["datePublished"] = String(it.facts.year);
      if (it.facts.isbn) thing["isbn"] = it.facts.isbn;
    }
    if (it?.cover && !it.cover.mast) thing["image"] = abs(it.cover.src);
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
  Person: "az-ink", Organisation: "az-ink", Podcast: "az-ink", Club: "az-pink", Event: "az-pink", Music: "az-yellow", Film: "az-yellow", TV: "az-yellow", Diary: "az-diary",
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
  // Diary pages (Lisa, 21 Nov 2026): every moment the diary comes up on the show, the readings highlighted.
  const diary = e.diary ?? undefined;
  // Column pages (Lisa, 21 Nov 2026): every piece that ran under the column.
  const column = e.column ?? undefined;
  // Library items (Lisa, 21 Nov 2026): the real cover taped into the header, the book's facts on the name card.
  const item = e.item ?? undefined;
  const cover = !pic ? item?.cover ?? undefined : undefined;
  const facts = item?.facts ?? undefined;
  // Place pages (Lisa, 22 Nov 2026, mockup C): the drawn map fills the header, the name card sits on it.
  const place = e.place ?? undefined;
  const placeMap = place?.map ?? undefined;

  return (
    <LinkDataProvider value={e.links}>
    <main className="min-h-screen bg-background text-foreground">
      {/* A–Z card header (Lisa, 30 Oct 2026, "tiles 4"): the disco-ball mirror tiles of the people polaroids as big pink/black dots, behind flyer strips. */}
      {/* People with a polaroid (Lisa, 2 Nov 2026, "combo 3"): their photo fills the header, the name sits on a taped card and the
          polaroid is taped on the right with its credit. */}
      <section
        className={`${pic ? "card-head card-head-photo px-4" : cover ? "card-head card-head-cover px-4" : placeMap ? "card-head card-head-place px-4" : "card-head px-4"}`}
        style={
          placeMap ? undefined : (pic
            ? ({ "--photo": `url(${pic.photo})`, "--photo-phone": `url(${pic.phone ?? pic.photo})`, "--focus": pic.focus } as CSSProperties)
            : ({ "--sky": `url(${cardSky})`, "--sky-phone": `url(${cardSkyPhone})` } as CSSProperties))
        }
      >
        {placeMap && <PlaceMapDrawing m={placeMap} name={e.name} />}
        {pic && (
          <figure className="card-polaroid">
            <img src={pic.polaroid} alt={club ? `${e.name}, ${club.address}` : `${e.name} polaroid`} width={720} height={893} />
            <figcaption>{pic.credit}</figcaption>
          </figure>
        )}
        {cover && (
          <figure className={`card-cover${cover.mast ? (cover.light ? " card-cover-mast card-cover-mast-light" : " card-cover-mast") : ""}`}>
            <img src={cover.src} alt={cover.mast ? `${e.name} masthead` : `Cover of ${e.name}`} />
            <figcaption>{cover.credit}</figcaption>
          </figure>
        )}
        {/* A book with facts but no picture yet keeps its facts on the paper name card, so they stay readable over the dots. */}
        <div className={pic || cover || placeMap || facts ? "card-namecard" : "mx-auto max-w-4xl"}>
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
          {/* Badges (Lisa, 21 Nov 2026): gold for the Hall of Fame top 10, pink for places 11-100 of the top 100 (great connectors, src/lib/connector-rank.ts) - one badge per person. */}
          {(e.tree || e.connector) && (
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wider text-cream">
              {e.tree && <span className="inline-flex items-center gap-2"><HallOfFameBadge rank={e.tree.rank} small />{TREE_ON_PAGE.has(e.slug) ? <a href="#mentor-tree" className="hover:text-pink">Hall of Fame</a> : <Link to="/hall-of-fame" className="hover:text-pink">Hall of Fame</Link>}</span>}
              {e.connector && !e.tree && <span className="inline-flex items-center gap-2"><ConnectorBadge rank={e.connector} small /><Link to="/hall-of-fame" hash="top-100" className="hover:text-pink">Great connector</Link></span>}
            </p>
          )}
          {/* No polaroid yet: aka + dates sit on a small taped paper card so they stay readable over the dots (5 Nov 2026). */}
          {mem && (
            <div className={pic ? undefined : "memoriam-meta"}>
              {mem.aka && <p className="memoriam-aka">aka {mem.aka}</p>}
              <p className="mt-2 text-sm text-muted-foreground">{mem.born} – {mem.died}{mem.convictedLine && <> · {mem.convictedLine}</>} · {mem.diedLine.replace(/^Died/, "died")}</p>
            </div>
          )}
          {club && (
            <div className={pic ? undefined : "memoriam-meta"}>
              {club.aka && <p className="memoriam-aka">{club.aka}</p>}
              <p className="mt-2 text-sm text-muted-foreground">{club.address} · {club.opened} – {club.closed}</p>
            </div>
          )}
          {place && (
            <p className={placeMap ? "mt-3 text-sm text-muted-foreground" : "memoriam-meta mt-3 text-sm text-muted-foreground"}>
              {[place.tip, place.area].filter(Boolean).join(" · ")}
              <span className="mt-2 block text-xs font-semibold uppercase tracking-wider text-pink">
                {place.who.length} episode{place.who.length === 1 ? "" : "s"} · {place.mentions} mention{place.mentions === 1 ? "" : "s"}
                {placeMap ? <> · <Link to="/map" search={{ at: e.slug }} className="hover:text-gold">Open the big map &rarr;</Link></> : <> · <Link to="/contact" search={{ about: "Bring us home" }} className="hover:text-gold">No pin yet - bring it home &rarr;</Link></>}
              </span>
            </p>
          )}
          {facts && (
            <dl className="card-facts">
              {facts.author && (
                <>
                  <dt>Written by</dt>
                  <dd className="card-facts-by">
                    {facts.authorGuest?.polaroid && <img src={facts.authorGuest.polaroid} alt="" width={240} height={240} />}
                    <span>
                      <EntityText text={facts.author} self={e.name} />
                      {facts.authorGuest && <> · <Link to={episodePath(facts.authorGuest.episodeId as never)} className="font-semibold text-gold hover:text-pink">their AFTERPARTY ({facts.authorGuest.short}) →</Link></>}
                    </span>
                  </dd>
                </>
              )}
              {(facts.year || facts.publisher) && (
                <>
                  <dt>First out</dt>
                  <dd>{[facts.year, facts.publisher].filter(Boolean).join(" · ")}</dd>
                </>
              )}
              {facts.status && (
                <>
                  <dt>Now</dt>
                  <dd>{facts.status}</dd>
                </>
              )}
            </dl>
          )}
          {/* A newspaper's or magazine's facts on the name card, like a book's (Front page, Lisa 22 Nov 2026). */}
          {item && !facts && item.press && (
            <dl className="card-facts">
              {item.press.founded && (
                <>
                  <dt>Founded</dt>
                  <dd>{[item.press.founded, item.press.by.map((b) => b.name).join(" and ")].filter(Boolean).join(" · ")}</dd>
                </>
              )}
              {item.press.ran && (<><dt>Ran</dt><dd>{item.press.ran}</dd></>)}
              {item.press.publisher && (<><dt>Published by</dt><dd>{item.press.publisher}</dd></>)}
              <dt>On the show</dt>
              <dd>{(() => { const m = item.dropped.reduce((n, d) => n + d.mentions, 0); return `${m} mention${m === 1 ? "" : "s"} in ${item.dropped.length} Afterpart${item.dropped.length === 1 ? "y" : "ies"}`; })()}</dd>
            </dl>
          )}
          {g && <p className="timeline-tag card-tag"><EntityText text={g.tagline} /></p>}
          {g && <GuestEpisodeLinks guest={g} className="mt-6" />}
          {mem?.readMore && showsReadMore(mem.readMore.href) ? (
            <p className="mt-4">
              <a href={mem.readMore.href} target="_blank" rel="noopener noreferrer" className="card-more">
                Read more {mem.readMore.label} &rarr;
              </a>
            </p>
          ) : showsReadMore(e.link) && !(g && e.link.includes("wowpresentsplus")) && (
            <p className="mt-4">
              <a href={e.link} target="_blank" rel="noopener noreferrer" className="card-more">
                Read more {linkPlace(e.link)} &rarr;
              </a>
            </p>
          )}
        </div>
      </section>

      <div className={`mx-auto ${item ? "max-w-6xl space-y-14 pt-12" : mem || club || profile || place || e.mapBand ? "max-w-5xl space-y-14" : diary ? "max-w-4xl space-y-14" : "max-w-4xl space-y-12"} px-6 pb-20`}>
        {mem && <MemoriamSections m={mem} name={e.name} />}
        {club && <ClubProfileSections c={club} name={e.name} slug={e.slug} night={!!e.night} parts={e.parts ? <ClubPartsSections p={e.parts} name={e.name} /> : null} />}
        {/* The map (Lisa, 27 Nov 2026): "Around the block" right after a club's story box (first on a plain club or event
            card), the yellow tape block where there is no pin, a living person's rooms under their story. */}
        {e.mapBand && <AroundTheBlock b={e.mapBand} slug={e.slug} />}
        {e.mapHome && <BringUsHome m={e.mapHome} />}
        {profile && <PersonProfileSections m={profile} name={e.name} />}
        {profile && e.rooms && <RoomsMapSection r={e.rooms} first={profile.first ?? e.name.split(" ")[0]!} />}
        {/* "<first>'s work" (Lisa, 22 Nov 2026): their books, papers, films, TV, podcasts and music, under their story. */}
        <TheirWork works={e.works} first={mem || profile ? ((mem ?? profile)!.first ?? e.name.split(" ")[0]!) : e.name.replace(/\s*\(.*\)$/, "")} />
        {/* A maker's own tapes (Lisa, 27 Nov 2026, Nelson Sullivan): each one's Moving Images page, not on the Library shelves. */}
        <TheirTapes tapes={e.tapes ?? []} first={mem || profile ? ((mem ?? profile)!.first ?? e.name.split(" ")[0]!) : e.name.split(" ")[0]!} />
        {diary && <DiarySections d={diary} name={e.name} />}
        {column && <ColumnIndex c={column} name={e.name} />}
        {item && <LibraryItemSections v={item} name={e.name} />}
        {place && <PlaceSections p={place} name={e.name} events={e.events} />}
        {/* Hall of Fame family tree (Lisa, 21 Nov 2026): top 10 mentors, for now only TREE_ON_PAGE. */}
        {e.tree && TREE_ON_PAGE.has(e.slug) && <MentorTree t={e.tree} badge={<HallOfFameBadge rank={e.tree.rank} />} foldable />}
        {/* "The story" of a song, album, band or club a guest made (Lisa, 23 Nov 2026); Library items show it in their front page. */}
        {e.story && (
          <div className="lit-front">
            <Story st={e.story} name={e.name} />
          </div>
        )}
        <CardSections v={e} skipRefs={!!item || !!place} skipEvents={!!place} />
      </div>
          <SiteFooter />
</main>
    </LinkDataProvider>
  );
}
