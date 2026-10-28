import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e06.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e06")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e06", refs.length),
  component: () => (
    <EpisodePage
      id="s02e06"
      refs={refs}
      title="Michael Schmidt"
      subtitle="Designer · the chain-mail man · Squeezebox host"
      released="Released 12 Sep 2022 · 1:07:09 as a podcast"
      blurb="James remembers meeting Michael at the Gaiety, the Times Square strip theatre, before they all swept into Area together. Michael tells of arriving in 1983 to see Diana Ross in Central Park, Annie Flanders walking him into Area, and discovering chain mail at Erickson Beamon - then the dress in a SoHo window that brought Cher calling, Tina Turner's crystal dress for Herb Ritts, Eartha Kitt's gown, Rihanna's mesh Daisy Dukes, Lady Gaga's bubbles and Debbie Harry's razor-blade gown, now at the Met. Then his Palladium room with Iggy Pop's Nightclubbing in Braille, Squeezebox at Don Hill's - where Hedwig and the Angry Inch was workshopped - and Dita Von Teese's 3D-printed gown. Wow!"
    />
  ),
});
