import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e11.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e11")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e11", refs.length),
  component: () => (
    <EpisodePage
      id="s02e11"
      refs={refs}
      title="Richard Boch"
      subtitle="Mudd Club doorman · artist and author of The Mudd Club"
      released="Released 17 Oct 2022 · 1:05:09 as a podcast"
      blurb="Richard Boch on bartending at the Ballroom, the Mudd Club at 77 White Street, Steve Mass on the door, Anita Sarko in the DJ booth, and writing The Mudd Club."
    />
  ),
});
