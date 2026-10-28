import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { JukeboxMachine } from "@/components/jukebox-machine";
import { SiteFooter } from "@/components/site-footer";
import { SPOTIFY_PLAYLIST_URL, jukebox } from "@/data/collections";
import { abs, jsonLd, pageHead } from "@/lib/seo";
import { episodes } from "@/data/episodes";

const description = `Every song, record, band and sound the Night Fever guests mention - ${jukebox.length} tracks and acts, from Blondie at the Mudd Club to Warm Leatherette, each with the moment it comes up. Press play!`;

// Shareable links (Lisa, 28 Oct 2026): tapping a polaroid puts the Afterparty in the address, /jukebox?afterparty=s05e04,
// so the link opens the Jukebox on that Afterparty's playlist (and a shared link shows the guest's share picture).
type Search = { afterparty?: string; show?: "clubs" };
const isMusicEpisode = (id: string) => episodes.some((e) => e.id === id) && jukebox.some((j) => j.moments.some((m) => m.episodeId === id));

export const Route = createFileRoute("/jukebox")({
  staticData: { sitemap: true },
  // /jukebox?show=clubs opens on the Clubs button (the home page's Clubs tile, Lisa 28 Oct 2026).
  validateSearch: (s: Record<string, unknown>): Search =>
    typeof s["afterparty"] === "string" && isMusicEpisode(s["afterparty"] as string)
      ? { afterparty: s["afterparty"] as string }
      : s["show"] === "clubs"
        ? { show: "clubs" }
        : {},
  loaderDeps: ({ search }) => ({ afterparty: search.afterparty }),
  loader: ({ deps }) => ({ afterparty: deps.afterparty }),
  head: ({ loaderData }) => ({
    ...(() => {
      const ep = loaderData?.afterparty ? episodes.find((e) => e.id === loaderData.afterparty) : undefined;
      if (!ep) return pageHead({ path: "/jukebox", title: "Night Fever Jukebox – every song & band the guests mention", description, image: "/og/jukebox.jpg" });
      const guest = ep.guest.replace(/ aka .*/, "").replace(/^Jenny Dembrow$/, "Jenny Talia");
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
  const { afterparty, show } = Route.useSearch();
  const navigate = useNavigate({ from: "/jukebox" });
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-4 pb-16 pt-10 sm:px-6">
        <JukeboxMachine items={jukebox} initialEpisode={afterparty} initialFilter={show} onPickEpisode={(id) => void navigate({ search: id ? { afterparty: id } : {}, replace: true, resetScroll: false })} />
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
