import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s05e03.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s05e03")({
  staticData: { sitemap: true },
  head: () => episodeHead("s05e03", refs.length),
  component: () => (
    <EpisodePage
      id="s05e03"
      refs={refs}
      title="Amanda Lepore"
      subtitle="Trans icon, model and singer · Club Kid · David LaChapelle's muse"
      released="Released 2 Jul 2025 · 1:06:45 as a podcast"
      blurb="James opens with an apology: in 1991 he walked straight past Amanda after her fall on the stairs at The Building - all in white, he thought the blood was a look. Then the glitter-rock crowd in New Jersey and her friend Keni Valenti, sewing men's shirts with French seams, the Cave Canem opening where the room stopped when she walked in, go-go dancing in the cage at Disco 2000, the Club Kids on The Joan Rivers Show, nightlife awards for Batgirl and Shirley Jones and a Beverly Hillbillies barn party with real chickens for Donna Douglas; and David LaChapelle - diamonds glued under her nose, the Flaunt shoot and a desert highway covered in Heatherette lipstick. Wow!"
    />
  ),
});
