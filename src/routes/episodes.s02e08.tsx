import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e08.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e08")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e08", refs.length),
  component: () => (
    <EpisodePage
      id="s02e08"
      refs={refs}
      title="Michelangelo Signorile"
      subtitle="Journalist and co-founder of OutWeek magazine · ACT UP · Queer in America"
      released="Released 26 Sep 2022 · 1:02:35 as a podcast"
      blurb="James arrives with five pages of notes and a lightning round through Brooklyn, Staten Island and Syracuse. Then PR jobs found in the phone book, column planting at Mike Hall Associates and the gossip columns of Liz Smith, Suzy and Cindy Adams; the Gaultier lookalike contest at the Palladium, won - as James tells it - with a pair of fake Prince Charles ears; James turning Michelangelo away at The World's opening night; Suzygate; ACT UP and a first protest at Cardinal Ratzinger's speech; OutWeek, the Malcolm Forbes cover and the birth of outing; and a Martha Graham luncheon at Halston's where Lovey Howell stole the show. Wow!"
    />
  ),
});
