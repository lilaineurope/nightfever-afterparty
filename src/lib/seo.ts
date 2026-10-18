// Search and share settings in one place: full addresses, share pictures (public/og/*.jpg, 1200x630)
// and structured data (schema.org JSON-LD) for Google. Episode pages call episodeHead(id).
import { episodeById } from "@/data/episodes";

export const SITE = "https://nightfever-afterparty.lovable.app";
export const SITE_NAME = "Night Fever fan page";

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
};

/** Head for an episode reference page: keyword title, share picture and PodcastEpisode structured data. */
export function episodeHead(id: string, references: number) {
  const ep = episodeById(id);
  const code = `S${ep.season}E${ep.episode}`;
  const topics = EPISODE_TOPICS[id];
  const title = `${ep.guest}${topics ? ` on ${topics}` : ""} – Night Fever ${code}`;
  const description = `All ${references} names, clubs, places and looks from ${ep.guest}'s Night Fever interview (${code}) - each with a timestamp that plays the episode from that moment. Dive in!`;
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
    actor: { "@type": "Person", name: ep.guest },
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
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE },
        about: episode,
        mainEntity: episode,
      }),
    ],
  };
}
