import { createFileRoute } from "@tanstack/react-router";
import { ClubWall, ClubsShelf } from "@/components/clubs-shelf";
import { SiteFooter } from "@/components/site-footer";
import { clubsMentioned } from "@/data/collections";
import { pageHead } from "@/lib/seo";

// Inside the Clubs (Lisa, 30 Oct 2026 - was Clubkid Culture): every club ever mentioned on Night Fever, and you can go inside and
// experience each one (its moments, timestamps and A–Z card; the three club nights play on the Jukebox).
// On the top menu as "Clubs", next to the Jukebox (Lisa, 30 Oct 2026) - in search and the sitemap too.
export const Route = createFileRoute("/inside-the-clubs")({
  staticData: { sitemap: true },
  component: InsideTheClubsPage,
  head: () =>
    pageHead({
      path: "/inside-the-clubs",
      title: "Inside the Clubs – every club ever mentioned on Night Fever",
      description: `All ${clubsMentioned.length} clubs ever mentioned on Night Fever, street by street - step inside each one: every moment it comes up on the show, timestamped, and the nights you can still hear.`,
      image: "/og/jukebox.jpg",
    }),
});

function InsideTheClubsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header: a wall of club flyers - every club's name pasted up - in the photocopy halftone. */}
      <section className="cc-head">
        <ClubWall />
        <div className="cc-head-in">
          <h1 className="timeline-title">
            <span className="timeline-strip timeline-strip-ink">Inside</span>
            <br />
            <span className="timeline-strip timeline-strip-pink">the clubs</span>
          </h1>
          <p className="timeline-tag">Every club ever mentioned on Night Fever - all {clubsMentioned.length} of them. Pick a door and step inside.</p>
        </div>
      </section>
      <section className="px-4 pb-16 sm:px-6">
        <ClubsShelf />
      </section>
      <SiteFooter />
    </main>
  );
}
