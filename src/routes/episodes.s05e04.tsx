import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s05e04.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s05e04")({
  staticData: { sitemap: true },
  head: () => episodeHead("s05e04", refs.length),
  component: () => (
    <EpisodePage
      id="s05e04"
      refs={refs}
      title="Nick Egan"
      subtitle="Graphic designer and music-video director · The Tea Set · Bow Wow Wow, Duran Duran, INXS"
      released="Released 9 Jul 2025 · 1:02:49 as a podcast"
      blurb="From the Stray Cats' quiffs and sleeve tattoos - which, as Nick tells it, made tattoos youth culture - and his first rose-and-dagger on the Sunset Strip to art-school punk, The Tea Set and modelling in Vivienne Westwood's Buffalo collection, Bow Wow Wow and the See Jungle cover after Manet, Malcolm McLaren pairing square dance with hip-hop on Duck Rock and Buffalo Gals, his first videos as MTV took off, Marc Jacobs' grunge show and Sonic Youth's Sugar Kane in the Perry Ellis showroom, Duran Duran's Ordinary World at Huntington Gardens and INXS's Kick. Wow!"
    />
  ),
});
