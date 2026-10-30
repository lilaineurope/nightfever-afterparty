import { createFileRoute } from "@tanstack/react-router";
import { ClubWall, ClubsShelf } from "@/components/clubs-shelf";
import { SiteFooter } from "@/components/site-footer";
import { clubsMentioned } from "@/data/collections";
import { pageHead } from "@/lib/seo";

// Clubkid Culture (Lisa, 29 Oct 2026): the three club playlists and every club mentioned on Night Fever, moved here from the Jukebox.
// Live in the background (Lisa, 29 Oct 2026): not in the menu, search or sitemap (UNLINKED_PAGES in src/lib/pages.ts, sitemap: false).
export const Route = createFileRoute("/clubkid-culture")({
  staticData: { sitemap: false },
  component: ClubkidCulturePage,
  head: () =>
    pageHead({
      path: "/clubkid-culture",
      title: "Clubkid Culture – every New York club on Night Fever",
      description: `The clubs behind the stories: Paradise Garage, Studio 54 and Danceteria with their own playlists, and all ${clubsMentioned.length} clubs the Night Fever guests mention.`,
      image: "/og/jukebox.jpg",
    }),
});

function ClubkidCulturePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header (Lisa, 30 Oct 2026): a wall of club flyers - every club's name pasted up - in the photocopy halftone. */}
      <section className="cc-head">
        <ClubWall />
        <div className="cc-head-in">
          <h1 className="timeline-title">
            <span className="timeline-strip timeline-strip-ink">Clubkid</span>
            <br />
            <span className="timeline-strip timeline-strip-pink">Culture</span>
          </h1>
          <p className="timeline-tag">{clubsMentioned.length} clubs dropped on Night Fever - and three nights you can still hear.</p>
        </div>
      </section>
      <section className="px-4 pb-16 sm:px-6">
        <ClubsShelf />
      </section>
      <SiteFooter />
    </main>
  );
}
