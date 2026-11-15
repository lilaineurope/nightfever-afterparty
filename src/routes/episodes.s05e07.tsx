import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s05e07.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s05e07")({
  staticData: { sitemap: true },
  head: () => episodeHead("s05e07", refs.length),
  component: () => (
    <EpisodePage
      id="s05e07"
      refs={refs}
      title="Christopher Comp & Really Denise"
      subtitle="Original Club Kids · Christopher: Project X cover boy and Limelight party planner · Denise: Tunnel kid and hostess, now Bainbridge Island's mailbox lady"
      released="Released 30 Jul 2025 · 1:05:14 as a podcast"
      blurb="Christopher Comp on goth Pennsylvania, Riverbank West and the Limelight office; Really Denise on the Tunnel basement, the petting zoo party and Bainbridge's mailboxes"
    />
  ),
});
