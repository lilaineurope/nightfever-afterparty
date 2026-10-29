import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e05.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e05")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e05", refs.length),
  component: () => (
    <EpisodePage
      id="s02e05"
      refs={refs}
      title="Connie Fleming"
      subtitle="Boy Bar beauty · Mugler supermodel · door legend"
      released="Released 5 Sep 2022 · 1:17:43"
      blurb="James's old neighbour from Avenue B - and the night he threw up on her shoe at Numbers. Connie remembers the city lit up like a Versace dress from the D train, Madonna in Jellybean's booth at the Funhouse, and the Mr. Blackwell dress that made David Glamamore her friend. Matthew Kasten pushes her onto the Boy Bar stage; International Chrysis tells her to come and talk when she's ready, and hands her April Ashley's book. Then Tracey Africa's story, Steven Meisel spotting her at the Patricia Field ball, Mr. Pearl's red bugle-bead cowgirl look for Mugler - first meant for Naomi - and how she became New York's toughest door, from Jojo's VIP room at the Limelight to Le Bain. Wow!"
    />
  ),
});
