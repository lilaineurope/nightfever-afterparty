import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s04e10.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s04e10")({
  staticData: { sitemap: true },
  head: () => episodeHead("s04e10", refs.length),
  component: () => (
    <EpisodePage
      id="s04e10"
      refs={refs}
      title="Ann Magnuson"
      subtitle="Actress, performance artist and singer · Club 57 · Bongwater, Pulsallama"
      released="Released 4 Sep 2024 · 1:07:52 as a podcast"
      blurb="Ann on running Club 57 under a Polish church on St. Mark's Place, New Wave Vaudeville with Klaus Nomi, her bands Pulsallama and Bongwater, and films from The Hunger to Desperately Seeking Susan."
    />
  ),
});
