import { createFileRoute, Link } from "@tanstack/react-router";
import { ClubsShelf } from "@/components/clubs-shelf";
import { SiteFooter } from "@/components/site-footer";
import { clubsMentioned } from "@/data/collections";
import { pageHead } from "@/lib/seo";

// Clubkid Culture (Lisa, 29 Oct 2026): the three club playlists and every club mentioned on Night Fever, moved here from the Jukebox.
// Not linked yet - Lisa sees it first (UNLINKED_PAGES in src/lib/pages.ts, sitemap: false).
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
      <section className="relative px-6 pb-8 pt-14">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Clubkid <span className="text-pink text-glow-pink">Culture</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The clubs that keep coming up on Night Fever - {clubsMentioned.length} of them, from the Mudd Club to the Limelight. Three have their
            own playlist of what was really played there - built only from documented DJ lists, recorded sets, club albums and live
            shows, with every song&rsquo;s source on the club&rsquo;s page. Tap a club and dive in!
          </p>
          <p className="mt-4">
            <Link to="/jukebox" search={{ show: "clubs" }} className="text-gold">
              Watch the clubs on video in the Jukebox &rarr;
            </Link>
          </p>
        </div>
      </section>
      <section className="px-6 pb-16">
        <div className="jbx">
          <ClubsShelf />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
