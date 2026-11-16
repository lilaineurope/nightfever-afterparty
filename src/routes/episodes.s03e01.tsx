import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s03e01");

export const Route = createFileRoute("/episodes/s03e01")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s03e01").references,
  head: ({ loaderData }) => episodeHead("s03e01", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s03e01"
      refs={refs}
      title="Patricia Field"
      subtitle="Store owner, stylist and costume designer · Sex and the City, The Devil Wears Prada"
      released="Released 15 Jun 2023 · 51:54 on WOW, 52:18 as a podcast"
      blurb="Patricia Field on her 8th Street store, the House of Field balls and dressing Carrie Bradshaw and Miranda Priestly. With James and Randy in the chairs."
    />
  ),
});
