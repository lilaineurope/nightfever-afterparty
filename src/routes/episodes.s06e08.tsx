import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s06e08.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s06e08")({
  staticData: { sitemap: true },
  head: () => episodeHead("s06e08", refs.length),
  component: () => (
    <EpisodePage
      id="s06e08"
      refs={refs}
      title="William Norwich"
      subtitle="Society columnist · Vogue editor · novelist"
      released="Released 7 Oct 2026 · 1:01:07 as a podcast"
      blurb="William Norwich on the Daily News society columns, Suzy, Brooke Astor, the society women who raised money for AIDS, and the newspaper strike."
    />
  ),
});
