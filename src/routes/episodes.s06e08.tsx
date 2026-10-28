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
      blurb="After five seasons downtown, James takes the show uptown with Billy Norwich, the Daily News society columnist of the go-go 80s. Billy explains how the paper's twin columns began - Uptown for him, Downtown for Dinah Prince - and traces the line from the Cholly Knickerbockers to Suzy, his 'spirit animal'. Then Brooke Astor, queen bee of the new and old money, Jayne Wrightsman's last interview at the Met, Blaine Trump's Lacroix benefit and the society women who raised money for AIDS when, as Billy says, the government gave nothing. James remembers being escorted out of an East Hampton party in a little-girl outfit, and Billy tells how Anna Wintour cheered him up when his phone stopped ringing during the newspaper strike. Wow!"
    />
  ),
});
