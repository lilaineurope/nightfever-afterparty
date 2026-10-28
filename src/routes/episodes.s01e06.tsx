import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s01e06.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s01e06")({
  staticData: { sitemap: true },
  head: () => episodeHead("s01e06", refs.length),
  component: () => (
    <EpisodePage
      id="s01e06"
      refs={refs}
      title="Waltpaper"
      subtitle="Club kid · Artist · Author of New York Club Kids"
      released="Released 4 Oct 2021 · 54:12 as a podcast"
      blurb="Walt Cassidy goes from a California childhood and a punk Mohawk in Norfolk, Virginia to Kent State and, in 1991, New York - Wigstock in Union Square, an art studio in the attic of The Building, the club kid houses in Gramercy Park and the stage of the Limelight. Michael Alig, Desi and the second wave of club kids, drag queens versus club kids, the House of Field and the Style Summit, and how the 90s turned darker - deconstructed."
    />
  ),
});
