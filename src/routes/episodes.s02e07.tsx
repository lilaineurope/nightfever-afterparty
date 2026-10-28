import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e07.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e07")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e07", refs.length),
  component: () => (
    <EpisodePage
      id="s02e07"
      refs={refs}
      title="Jenny Talia"
      subtitle="Club kid icon · Model and muse · Lower East Side Girls Club"
      released="Released 19 Sep 2022 · 52:35 as a podcast"
      blurb="Jenny Dembrow, aka Jenny Talia, reads her goodbye to Michael Alig, then goes back to sneaking into Mars at 15, getting turned away at The Building until Pat Field's redid her look, and the VIP glass cube where she found her tribe. The Phil Donahue Show in a borrowed gimp mask, Gaultier's runway and Steven Meisel's Calvin Klein campaign, the club kids in Paris, Queen of Manhattan in a pink prom dress, the 11th Street after-hours - and how she went from the club to the Lower East Side Girls Club."
    />
  ),
});
