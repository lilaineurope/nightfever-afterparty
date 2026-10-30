import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { JukeboxMachine } from "@/components/jukebox-machine";
import { SiteFooter } from "@/components/site-footer";
import { SPOTIFY_PLAYLIST_URL, jukebox } from "@/data/collections";
import { abs, jsonLd, pageHead } from "@/lib/seo";
import { episodes, stageName } from "@/data/episodes";
import { CLUB_NIGHTS } from "@/data/club-nights";
import type { CSSProperties } from "react";
import disco from "@/assets/jukebox-disco.webp";
import discoPhone from "@/assets/jukebox-disco-phone.webp";

const description = `Every song, record, band and sound the Night Fever guests mention - ${jukebox.length} tracks and acts, from Blondie at the Mudd Club to Warm Leatherette, each with the moment it comes up. Press play!`;

// Shareable links (Lisa, 28 Oct 2026): tapping a polaroid puts the Afterparty in the address, /jukebox?afterparty=s05e04,
// so the link opens the Jukebox on that Afterparty's playlist (and a shared link shows the guest's share picture).
type Search = { afterparty?: string; show?: "clubs"; club?: string };
const isMusicEpisode = (id: string) => episodes.some((e) => e.id === id) && jukebox.some((j) => j.moments.some((m) => m.episodeId === id));

export const Route = createFileRoute("/jukebox")({
  staticData: { sitemap: true },
  // /jukebox?show=clubs opens on the Clubs button (the club videos; linked from Inside the Clubs).
  validateSearch: (s: Record<string, unknown>): Search =>
    typeof s["afterparty"] === "string" && isMusicEpisode(s["afterparty"] as string)
      ? { afterparty: s["afterparty"] as string }
      : typeof s["club"] === "string" && CLUB_NIGHTS.some((c) => c.slug === s["club"])
        ? { club: s["club"] as string }
      : s["show"] === "clubs"
        ? { show: "clubs" }
        : {},
  loaderDeps: ({ search }) => ({ afterparty: search.afterparty, club: search.club }),
  loader: ({ deps }) => ({ afterparty: deps.afterparty, club: deps.club }),
  head: ({ loaderData }) => ({
    ...(() => {
      const night = loaderData?.club ? CLUB_NIGHTS.find((c) => c.slug === loaderData.club) : undefined;
      if (night) {
        const head = pageHead({
          path: "/jukebox",
          title: `A night at ${night.club} sounded like this – Night Fever Jukebox`,
          description: `${night.songs.length} songs documented at ${night.club} - DJ lists, recorded sets and live shows, each with why it's here and its source. Press play on the Night Fever Jukebox.`,
          image: "/og/jukebox.jpg",
        });
        return { ...head, meta: head.meta.map((m) => ("property" in m && m.property === "og:url" ? { ...m, content: abs(`/jukebox?club=${night.slug}`) } : m)) };
      }
      const ep = loaderData?.afterparty ? episodes.find((e) => e.id === loaderData.afterparty) : undefined;
      if (!ep) return pageHead({ path: "/jukebox", title: "Night Fever Jukebox – every song & band the guests mention", description, image: "/og/jukebox.jpg" });
      const guest = stageName(ep.guest);
      const n = jukebox.filter((j) => j.moments.some((m) => m.episodeId === ep.id)).length;
      const head = pageHead({
        path: "/jukebox",
        title: `${guest}'s AFTERPARTY playlist – Night Fever Jukebox`,
        description: `The ${n} songs and bands that come up in ${guest}'s Night Fever episode (S${ep.season}E${ep.episode}), in the order they're dropped - press play on the Night Fever Jukebox.`,
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
        numberOfItems: jukebox.length,
        itemListElement: jukebox.slice(0, 50).map((m, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": m.shelf === "songs" ? "MusicRecording" : m.shelf === "artists" ? "MusicGroup" : "Thing", name: m.name, url: abs(`/explore/${m.slug}`) },
        })),
      }),
    ],
  }),
  component: JukeboxPage,
});

function JukeboxPage() {
  const { afterparty, show, club } = Route.useSearch();
  const navigate = useNavigate({ from: "/jukebox" });
  return (
    <main
      className="jukebox-sky min-h-screen bg-background text-foreground"
      style={{ "--sky": `url(${disco})`, "--sky-phone": `url(${discoPhone})` } as CSSProperties}
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
      </section>
      <SiteFooter />
    </main>
  );
}
