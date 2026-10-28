import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s04e10.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s04e10")({
  staticData: { sitemap: true },
  head: () => episodeHead("s04e10", refs.length),
  component: () => (
    <EpisodePage
      id="s04e10"
      refs={refs}
      title="Ann Magnuson"
      subtitle="Actress, performance artist and singer · Club 57 · Bongwater, Pulsallama"
      released="Released 4 Sep 2024 · 1:07:52 as a podcast"
      blurb="Fenton is away, so it's James and Randy in the chairs. From basement plays and Helen Keller in community theatre in Charleston, West Virginia, and London punk watched from a safe distance on her year abroad to New York, New Wave Vaudeville at Irving Plaza and a year managing Club 57 under the Polish church on St. Mark's Place - Stanley Strychacki's social club, with Tom Scully's Monster Movie Club, Ladies Auxiliary debutante balls and misfits' proms, and Klaus Nomi, who, as Ann tells it, jumped on a snow mound and sang opera under a street light - then the Pyramid and Danceteria, Pulsallama, Bongwater and Vulcan Death Grip, The Hunger with Bowie, Desperately Seeking Susan, Making Mr. Right in its Keith Haring shoes, Anything But Love, Ghost Cat's West Virginia monsters and her own suRURALism. Wow!"
    />
  ),
});
