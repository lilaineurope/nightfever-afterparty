import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/collection-page";
import { JukeboxPlayer, useJukebox } from "@/components/jukebox-player";
import { MUSIC_SHELVES, SPOTIFY_PLAYLIST_URL, jukebox, listenLinks } from "@/data/collections";
import { abs, jsonLd, pageHead } from "@/lib/seo";
import header from "@/assets/jukebox-header.jpg";

const description = `Every song, record, band and sound the Night Fever guests mention - ${jukebox.length} tracks and acts, from Blondie at the Mudd Club to Warm Leatherette, each with the moment it comes up. Press play!`;

export const Route = createFileRoute("/jukebox")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead({ path: "/jukebox", title: "Night Fever Jukebox – every song & band the guests mention", description, image: "/og/jukebox.jpg" }),
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
  const { current, playIndex, step, holder } = useJukebox(jukebox);
  const first = jukebox.findIndex((m) => m.spotify);
  return (
    <CollectionPage
      topSlot={<JukeboxPlayer playlist={jukebox} current={current} onPlayFirst={() => void playIndex(first)} step={step} holder={holder} />}
      onPlay={(m) => void playIndex(jukebox.indexOf(m))}
      playingSlug={current !== null ? jukebox[current]?.slug : undefined}
      header={header}
      kicker="The Night Fever"
      title={<>Juke<span className="text-pink text-glow-pink">box</span></>}
      intro={<>Every song, record, band and sound that comes up in the interviews - the playlist of the night. Tap a timestamp to hear the story, press play, or take the whole lot with you as the <a href={SPOTIFY_PLAYLIST_URL} target="_blank" rel="noopener noreferrer" className="text-gold underline decoration-gold/50 underline-offset-2 hover:text-pink">Night Fever Afterparty Jukebox playlist on Spotify</a>.</>}
      items={jukebox}
      shelves={[...MUSIC_SHELVES]}
      extras={(m) => {
        const l = listenLinks(m.name);
        return m.shelf === "stage" ? [] : [{ label: "Listen on Spotify", href: l.spotify }, { label: "Watch on YouTube", href: l.youtube }];
      }}
      note={<>The jukebox fills itself from my episode indexes, so every new Afterparty adds its songs. Nothing is hosted here: the links search Spotify and YouTube, and timestamps play the show's own podcast feed.</>}
    />
  );
}
