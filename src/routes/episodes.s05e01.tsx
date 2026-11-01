import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s05e01.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s05e01")({
  staticData: { sitemap: true },
  head: () => episodeHead("s05e01", refs.length),
  component: () => (
    <EpisodePage
      id="s05e01"
      refs={refs}
      title="Nell Campbell"
      subtitle="Rocky Horror's Columbia · the face of Nell's · tap-dancing star"
      released="Released 18 Jun 2025 · 50:13"
      blurb="Nell Campbell, just turned 18 and newly arrived in London from Sydney, sells frocks at Kensington Market opposite a stallholder called Freddie - and tells him to keep his day job. She tap-dances on the tables of a Knightsbridge cafe until Jim Sharman, Richard O'Brien and Richard Hartley walk in and cast her as the third servant in a new rock musical: The Rocky Horror Show, 1973, in the Royal Court's attic on £18 a week. Sue Blane's £200 costumes, the King's Road with Vivienne Westwood down the street, Do the Swim on Janet Street-Porter's show in one take - then New York, where Keith McNally, the old spotlight boy, and Lynn Wagenknecht knock on her door: do you want to do a nightclub? Nell's on 14th Street (1986) - old gentleman's club grandeur, keys in the mail, a door policy Nell hated, Cher turned away, Prince on stage and Andy Warhol's last party. Always say yes to everything, gentlemen!"
    />
  ),
});
