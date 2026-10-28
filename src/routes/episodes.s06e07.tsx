import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s06e07.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s06e07")({
  staticData: { sitemap: true },
  head: () => episodeHead("s06e07", refs.length),
  component: () => (
    <EpisodePage
      id="s06e07"
      refs={refs}
      title="Sally Randall"
      subtitle="Palladium door legend · artist · 80s It girl"
      released="Released 30 Sep 2026 · 1:05:05 as a podcast"
      blurb="James opens with his diary from the weeks before the Palladium opened, then Sally takes us to the door on opening night, when the crowd rolled under the gates. She tells of the Sally look - Napoleon hats, long wigs and sparkly tights - an art scholarship at SVA with Keith and Kenny, Edit deAk taking her to her first club, dancing on Pizza a Go Go's rickety balcony with Dean Johnson, her lip-sync Jesus Christ Superstar at Danceteria, the club crowd on Oprah, saying no to Letterman, and grinding old masters' pigments by hand. Wow!"
    />
  ),
});
