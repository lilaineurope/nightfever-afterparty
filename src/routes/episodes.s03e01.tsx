import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s03e01.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s03e01")({
  staticData: { sitemap: true },
  head: () => episodeHead("s03e01", refs.length),
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
