import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { JukeboxMachine } from "@/components/jukebox-machine";
import { SiteFooter } from "@/components/site-footer";
import { SPOTIFY_PLAYLIST_URL, jukebox } from "@/data/collections";
import { abs, jsonLd, pageHead } from "@/lib/seo";
import { episodes, stageName } from "@/data/episodes";
import type { CSSProperties } from "react";
import disco from "@/assets/jukebox-disco.webp";
import discoPhone from "@/assets/jukebox-disco-phone.webp";
import { JUKEBOX_CLUB_BACKGROUNDS } from "@/data/jukebox-club-backgrounds";


// Shareable links (Lisa, 28 Oct 2026): tapping a polaroid puts the Afterparty in the address, /jukebox?afterparty=s05e04,
// so the link opens the Jukebox on that Afterparty's playlist (and a shared link shows the guest's share picture).
type Search = { afterparty?: string; show?: "clubs"; club?: string };

export const Route = createFileRoute("/jukebox")({
  staticData: { sitemap: true },
  // /jukebox?show=clubs opens on the Clubs button (the club videos; linked from Inside the Clubs).
  // The songs and club nights load with the Jukebox instead of with every page (page weight, 16 Nov 2026), so the
  // address is passed on as it comes and the loader works out the share title from it.
  validateSearch: (s: Record<string, unknown>): Search => ({
    ...(typeof s["afterparty"] === "string" ? { afterparty: s["afterparty"] } : {}),
    ...(typeof s["club"] === "string" ? { club: s["club"] } : {}),
    ...(s["show"] === "clubs" ? { show: "clubs" as const } : {}),
  }),
  loaderDeps: ({ search }) => ({ afterparty: search.afterparty, club: search.club }),
  loader: async ({ deps }) => {
    const [{ jukebox }, { CLUB_NIGHTS }, { cardPath }] = await Promise.all([import("@/data/collections"), import("@/data/club-nights"), import("@/lib/card-link")]);
    const night = deps.club ? CLUB_NIGHTS.find((c) => c.slug === deps.club) : undefined;
    return {
      afterparty: deps.afterparty,
      night: night ? { club: night.club, slug: night.slug, songs: night.songs.length } : null,
      songs: deps.afterparty ? jukebox.filter((j) => j.moments.some((m) => m.episodeId === deps.afterparty)).length : 0,
      total: jukebox.length,
      first: jukebox.slice(0, 50).map((m) => ({ type: m.shelf === "songs" ? "MusicRecording" : m.shelf === "artists" ? "MusicGroup" : "Thing", name: m.name, url: abs(cardPath(m.slug)) })),
    };
  },
  head: ({ loaderData }) => ({
    ...(() => {
      const description = `Every song, band and sound the Night Fever guests mention - ${loaderData?.total ?? 0} tracks and acts, from Blondie to Warm Leatherette, each with its moment. Press play!`;
      const night = loaderData?.night;
      if (night) {
        const head = pageHead({
          path: "/jukebox",
          title: `A night at ${night.club} sounded like this – Night Fever Jukebox`,
          description: `${night.songs} songs documented at ${night.club} - DJ lists, recorded sets and live shows, each with why it's here and its source. Press play on the Night Fever Jukebox.`,
          image: "/og/jukebox.jpg",
        });
        return { ...head, meta: head.meta.map((m) => ("property" in m && m.property === "og:url" ? { ...m, content: abs(`/jukebox?club=${night.slug}`) } : m)) };
      }
      const ep = loaderData?.afterparty ? episodes.find((e) => e.id === loaderData.afterparty) : undefined;
      if (!ep) return pageHead({ path: "/jukebox", title: "Night Fever Jukebox – every song & band the guests mention", description, image: "/og/jukebox.jpg" });
      const guest = stageName(ep.guest);
      const n = loaderData?.songs ?? 0;
      const head = pageHead({
        path: "/jukebox",
        title: `${guest}'s AFTERPARTY playlist – Night Fever Jukebox`,
        description: `The ${n} songs and bands that come up in ${guest}'s Night Fever episode (S${ep.season}E${ep.episode}${ep.part ?? ""}), in the order they're dropped - press play on the Night Fever Jukebox.`,
        image: `/og/${ep.id}.jpg`,
      });
      // The canonical stays /jukebox; the share card points at this Afterparty's link.
      return { ...head, meta: head.meta.map((m) => ("property" in m && m.property === "og:url" ? { ...m, content: abs(`/jukebox?afterparty=${ep.id}`) } : m)) };
    })(),
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Night Fever Jukebox",
        url: abs("/jukebox"),
        numberOfItems: loaderData?.total ?? 0,
        itemListElement: (loaderData?.first ?? []).map((m, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": m.type, name: m.name, url: m.url } })),
      }),
    ],
  }),
  component: JukeboxPage,
});

function JukeboxPage() {
  const { afterparty, show, club } = Route.useSearch();
  const navigate = useNavigate({ from: "/jukebox" });
  // A picked club swaps the disco ball for a picture from inside that club (Lisa, 2 Nov 2026).
  const bg = club ? JUKEBOX_CLUB_BACKGROUNDS[club] : undefined;
  return (
    <main
      className="jukebox-sky min-h-screen bg-background text-foreground"
      style={{ "--sky": `url(${bg?.sky ?? disco})`, "--sky-phone": `url(${bg?.phone ?? discoPhone})` } as CSSProperties}
    >
      {/* Disco-ball close-up header (Lisa, 29 Oct 2026): the mirror tiles fill the header as the pattern, photocopied like the
          Timeline and the polaroids, fading out in pixels behind the list. Made by scripts/jukebox-disco from a Gemini picture. */}
      <section className="px-4 pb-16 sm:px-6">
        <JukeboxMachine items={jukebox} initialEpisode={afterparty} initialFilter={show} initialClub={club} onPickEpisode={(id) => void navigate({ search: id ? { afterparty: id } : {}, replace: true, resetScroll: false })} onPickClub={(slug) => void navigate({ search: slug ? { club: slug } : {}, replace: true, resetScroll: false })} />
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Every song, record, band and sound that comes up in the interviews - the playlist of the night, Afterparty by Afterparty. The screen shows a
          different video every day. The jukebox fills itself from my episode indexes, so every new Afterparty adds its songs. Nothing is hosted
          here: Spotify and YouTube only load when you press play, and timestamps play the show&rsquo;s own podcast feed. Take the whole lot with you as
          the{" "}
          <a href={SPOTIFY_PLAYLIST_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-pink underline underline-offset-2">
            Night Fever Afterparty Jukebox playlist on Spotify
          </a>
          .
        </p>
        {bg?.credit && <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-muted-foreground">Background: {bg.credit}</p>}
      </section>
      <SiteFooter />
    </main>
  );
}
