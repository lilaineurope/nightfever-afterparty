import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s01e10.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s01e10")({
  staticData: { sitemap: true },
  head: () => episodeHead("s01e10", refs.length),
  component: () => (
    <EpisodePage
      id="s01e10"
      refs={refs}
      title="Joey Arias"
      subtitle="Drag goddess · Klaus Nomi's partner · Fiorucci stylist"
      released="Released 1 Nov 2021 · 1:10:36 as a podcast"
      blurb="Not a queen, a goddess! Joey goes from a teenage band on Capitol Records and the Groundlings in LA to New York in 1976: styling Jackie Onassis at Fiorucci, meeting Debbie Harry at CBGB and Klaus Nomi in his first week, and singing with David Bowie on Saturday Night Live. Then Club 57, the Andy and Edie show with Ann Magnuson at Danceteria, a movie date with Andy Warhol, dinner with Dalí and Gala, Billie Holiday at the Limelight, Bar d'O, Zumanity and Arias with a Twist - and a Joey bot for the 24th century. Wow!"
    />
  ),
});
