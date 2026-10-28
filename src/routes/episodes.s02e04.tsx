import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e04.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e04")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e04", refs.length),
  component: () => (
    <EpisodePage
      id="s02e04"
      refs={refs}
      title="Nikki Haskell"
      subtitle="Studio 54 regular · stockbroker · host of The Nikki Haskell Show"
      released="Released 29 Aug 2022 · 1:07:02 as a podcast"
      blurb="Nikki tells of winning a twist contest judged by Bob Hope and Joan Collins, The Daisy on Rodeo Drive and the Sunset Strip clubs of the early 60s, then New York: Le Club, a broker's job at Drexel Burnham by day and dancing every night - she says she invented the disco nap. She took Donald and Ivana Trump to Studio 54's opening night, turned Egon von Furstenberg's cable show into The Nikki Haskell Show, followed Imelda Marcos around Manila with her cassettes, threw parties at the Underground and Xenon, and found her old tapes again. Wow!"
    />
  ),
});
