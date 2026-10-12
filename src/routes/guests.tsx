import { createFileRoute } from "@tanstack/react-router";
import { GuestsSection } from "@/components/guests-section";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/guests")({
  component: GuestsPage,
  head: () => ({
    meta: [
      { title: "Night Fever Guests — Who they are, what they did, where they are now" },
      {
        name: "description",
        content:
          "Every Night Fever guest, one by one: their era, career timeline, what they are doing now and their episode.",
      },
      { property: "og:title", content: "Night Fever Guests — Guest by guest" },
      {
        property: "og:description",
        content: "The legends who sat down with James St. James — their nights, their careers, and where they are now.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/guests" }],
  }),
});

function GuestsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <GuestsSection />
      <SiteFooter />
    </main>
  );
}
