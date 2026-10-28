import { createFileRoute } from "@tanstack/react-router";
import { JukeboxMachine } from "@/components/jukebox-machine";
import { SiteFooter } from "@/components/site-footer";
import { SPOTIFY_PLAYLIST_URL, jukebox } from "@/data/collections";
import { abs, jsonLd, pageHead } from "@/lib/seo";

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
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-4 pb-16 pt-10 sm:px-6">
        <JukeboxMachine items={jukebox} />
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
