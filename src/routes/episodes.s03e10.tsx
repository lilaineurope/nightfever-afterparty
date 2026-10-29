import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s03e10.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s03e10")({
  staticData: { sitemap: true },
  head: () => episodeHead("s03e10", refs.length),
  component: () => (
    <EpisodePage
      id="s03e10"
      refs={refs}
      title="Miss Guy"
      subtitle="Toilet Boys singer · Squeezebox DJ · Boy Bar star"
      released="Released 17 Aug 2023 · 48:33"
      blurb="Fresh off a month on tour doing Debbie Harry's make-up, Miss Guy remembers the first meeting at Stephen Sprouse's Soho shop - in a tiny paper KISS fan-club jacket. A big brother's records (Parallel Lines, Devo, the B-52's), best friend Lauren Pine since fourth grade, and a Malcolm McLaren party that sends them both to New York. Boy Bar on their very first night, meeting James - a better version of Guy - and Matthew Kasten's Boy Bar shows, from Hooray for Hollywood to Cherry Bomb. Then the House of Field balls, a day job at Pat Field's, the Cat Club rock nights, Squeezebox at Don Hill's with Michael Schmidt, and the Toilet Boys - from opening for Debbie to arenas with the Red Hot Chili Peppers. Wow!"
    />
  ),
});
