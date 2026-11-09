// Search and share settings in one place: full addresses, share pictures (public/og/*.jpg, 1200x630)
// and structured data (schema.org JSON-LD) for Google. Episode pages call episodeHead(id).
import { episodeById } from "@/data/episodes";
import { guests } from "@/data/guests";
import { GUEST_LINES } from "@/data/guest-lines";

export const SITE = "https://nightfever-afterparty.com";
// The site's name (Lisa, 4 Nov 2026): "Night Fever AFTERPARTY - a fan page". Page titles end in the short "| Night Fever AFTERPARTY".
export const SITE_NAME = "Night Fever AFTERPARTY - a fan page";

export const abs = (path: string) => (path.startsWith("http") ? path : `${SITE}${path.startsWith("/") ? "" : "/"}${path}`);

/** Title and share tags for an ordinary page. */
export function pageHead({
  path,
  title,
  description,
  image = "/og/home.jpg",
  type = "website",
  noindex = false,
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: abs(path) },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: abs(image) },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: abs(image) },
      ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [{ rel: "canonical", href: abs(path) }],
  };
}

/** "2026-10-11T12:00" -> "2026-10-11"; undefined for a date still to come (some AFTERPARTY dates are set ahead for
 *  ordering), so search engines never see a publish date in the future. */
export function publishedDay(date: string): string | undefined {
  const day = date.slice(0, 10);
  return day <= new Date().toISOString().slice(0, 10) ? day : undefined;
}

export const jsonLd = (data: unknown) => ({ type: "application/ld+json", children: JSON.stringify(data) });

/** "1:10:35" / "57:09" / "54 min" -> ISO 8601 duration */
export function isoDuration(runtime: string): string | undefined {
  const min = runtime.match(/^(\d+)\s*min/);
  if (min) return `PT${min[1]}M`;
  const p = runtime.split(":").map(Number);
  if (p.some(Number.isNaN)) return undefined;
  const [h, m, s] = p.length === 3 ? p : [0, p[0], p[1]];
  return `PT${h ? `${h}H` : ""}${m}M${s}S`;
}

// What each conversation is about, in the words people search with.
const EPISODE_TOPICS: Record<string, string> = {
  s01e01: "Warhol, Mugler & Danceteria",
  s01e02: "Studio 54, the Village Voice & the Club Kids",
  s01e03: "NYU, the clubs & Warhol's memorial",
  s01e07: "Danceteria, the Tunnel & Palladium",
  s02e03: "the Blitz, Savage & the Love Balls",
  s03e01: "her 8th Street store, House of Field & Sex and the City",
  s03e06: "Area, the Mudd Club & MK",
  s04e08: "Heatherette, the Club Kids & Susanne Bartsch",
  s05e06: "Andy Warhol, Man Ray & Tennessee Williams",
  s06e01: "Party Monster, Warhol & Michael Alig",
  s06e03: "the Mudd Club, Jackie 60 & Mother",
  s05e04: "Malcolm McLaren, Bow Wow Wow & MTV",
  s04e10: "Club 57, The Hunger & Bongwater",
  s02e08: "OutWeek, ACT UP & Suzygate",
  s05e03: "the Club Kids, Disco 2000 & David LaChapelle",
  s06e08: "Uptown society, Brooke Astor & the Daily News column",
  s02e06: "chain mail for Cher & Tina, Squeezebox & Area",
  s01e04: "the Limelight, the Tunnel & Club USA",
  s02e04: "Studio 54, Le Club & The Nikki Haskell Show",
  s06e07: "the Palladium door, Danceteria & Oprah",
  s01e10: "Klaus Nomi, Bowie & Fiorucci",
  s03e08: "Celebrity Club, RuPaul & Electroclash",
  s04e04: "RuPaul, Michael Jackson & the Love Ball",
  s02e01: "voguing, Seduction & RuPaul",
  s01e06: "the Limelight, Michael Alig & the club kids",
  s02e07: "Michael Alig, the club kids & Calvin Klein",
  s02e05: "Boy Bar, Mugler & New York's toughest door",
  s03e10: "Squeezebox, Boy Bar & Debbie Harry",
  s05e01: "Rocky Horror, Nell's & Kensington Market",
  s02e11: "the Mudd Club, Steve Mass & Basquiat",
  s01e08: "voguing, Madonna's Vogue & the House of Xtravaganza",
  s03e04: "Hip Hop, Be Bop, Studio 54 & the Cock",
  s04e07: "the Pyramid Club, Danceteria & 80s Polaroids",
  s05e10: "Manic Panic, Blondie & St. Marks Place punk",
  s04e09: "Desperately Seeking Susan, Smithereens & Madonna",
  s01e05: "Club Kids, Disco 2000 & Michael Alig",
  s06e06: "the Roxy, Red Zone & New York club doors",
  s02e09: "the Pyramid Club, My Comrade & The Drag Explosion",
  s03e03: "Cunty, the Sound Factory & Beyoncé's Renaissance",
};

/** "Susanne Bartsch – Night Fever S2E3: the Blitz, Savage & the Love Balls", kept within about 65 characters so
 *  Google doesn't cut it: guest and show first, then as many topics as fit (SEO check, 4 Nov 2026). */
export function episodeTitle(guest: string, code: string, topics?: string, max = 65): string {
  const base = `${guest} – Night Fever ${code}`;
  if (!topics) return base;
  const items = topics.split(/, | & /);
  for (let n = items.length; n > 0; n--) {
    const list = n === 1 ? items[0] : `${items.slice(0, n - 1).join(", ")} & ${items[n - 1]}`;
    const title = `${base}: ${list}`;
    if (title.length <= max) return title;
  }
  return base;
}

/** Head for an episode reference page: keyword title, share picture and PodcastEpisode structured data. */
/** The guest as a schema.org Person. Their A–Z card forwards to the episode page (one page per guest, Lisa 1 Nov 2026),
 *  so the fuller Person from the card (description, jobTitle, image) lives here now. */
function guestPerson(id: string, name: string) {
  const m = id.match(/^s(\d+)e(\d+)$/);
  const g = m ? guests.find((x) => x.episode.startsWith(`Season ${Number(m[1])}, Episode ${Number(m[2])}`) && !/\d/.test(x.episode.charAt(`Season ${Number(m[1])}, Episode ${Number(m[2])}`.length))) : undefined;
  const person: Record<string, unknown> = { "@type": "Person", name: g?.name ?? name, image: abs(`/og/${id}.jpg`) };
  if (g?.tagline) person["description"] = g.tagline;
  if (GUEST_LINES[id]) person["jobTitle"] = GUEST_LINES[id];
  return person;
}

export function episodeHead(id: string, references: number) {
  const ep = episodeById(id);
  const code = `S${ep.season}E${ep.episode}`;
  const topics = EPISODE_TOPICS[id];
  const title = episodeTitle(ep.guest, code, topics);
  const description = `All ${references} names, clubs, places and looks from ${ep.guest}'s Night Fever interview (${code}), each timestamped to play from that moment. Dive in!`;
  const path = `/episodes/${id}`;
  const head = pageHead({ path, title, description, image: `/og/${id}.jpg`, type: "article" });
  const episode = {
    "@type": "PodcastEpisode",
    name: `${ep.guest} - Night Fever`,
    episodeNumber: ep.episode,
    datePublished: ep.released,
    timeRequired: isoDuration(ep.runtime),
    description: ep.blurb,
    url: ep.watchUrl,
    associatedMedia: { "@type": "MediaObject", contentUrl: ep.audioUrl },
    actor: guestPerson(id, ep.guest),
    partOfSeason: { "@type": "PodcastSeason", seasonNumber: ep.season },
    partOfSeries: { "@type": "PodcastSeries", name: "Night Fever", url: "https://www.wowpresentsplus.com/night-fever" },
  };
  return {
    ...head,
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: abs(path),
        description,
        image: abs(`/og/${id}.jpg`),
        // When the AFTERPARTY went up, so Google doesn't date the page by the podcast's air date (SEO check, 4 Nov 2026).
        ...(publishedDay(ep.afterpartyPublished) ? { datePublished: publishedDay(ep.afterpartyPublished) } : {}),
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE },
        about: episode,
        mainEntity: episode,
      }),
    ],
  };
}

// Research notes in a story line ("No Wikipedia page; links to WOW", "Article not found online") explain where a
// link goes - useful in the reference list, not in a search result. cardDescription() leaves them out.
const NOTE = /\b(wikipedia|links? (is )?to|link goes to|not (found|confirmed) online|no page|page of (its|his|her|their) own|has no page)\b/i;

/** Drop research notes and "Likewise"-style openers from a story line; "" when nothing readable is left. */
export function cleanStory(story: string): string {
  const parts = story
    .replace(/^(likewise|ditto|same here|same)\b[\s.,:;–-]*/i, "")
    .split(/(?<=[.;!?])\s+/)
    .filter((part) => part.trim() && !NOTE.test(part));
  const text = parts.join(" ").trim().replace(/[;,:\s–-]+$/, "");
  if (!text) return "";
  const sentence = text.charAt(0).toUpperCase() + text.slice(1);
  return /[.!?…]$/.test(sentence) ? sentence : `${sentence}.`;
}

/** Cut to at most `max` characters, at the end of a sentence when one fits, else at a word with "…". */
export function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (end >= max * 0.5) return cut.slice(0, end + 1);
  const clause = cut.lastIndexOf("; ");
  if (clause >= max * 0.5) return `${cut.slice(0, clause)}.`;
  return cut.slice(0, max - 1).replace(/[\s,;:–-]+\S*$/, "") + "…";
}

/** Search description for an A–Z card: a clean story line plus where it comes up, about 155 characters at most. */
export function cardDescription(name: string, story: string, episodeCodes: string[]): string {
  const n = episodeCodes.length;
  const where = n === 0 ? "" : n <= 3 ? ` Mentioned in Night Fever ${episodeCodes.join(", ")}.` : ` Mentioned in ${n} Night Fever episodes.`;
  const clean = cleanStory(story);
  const lead = clean ? `${name}: ${clean}` : `${name} in the Night Fever podcast - every story, night and connection.`;
  return clip(lead, 158 - where.length) + where;
}
