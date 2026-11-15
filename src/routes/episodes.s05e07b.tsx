import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s05e07b.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s05e07b")({
  staticData: { sitemap: true },
  head: () => episodeHead("s05e07b", refs.length),
  component: () => (
    <EpisodePage
      id="s05e07b"
      refs={refs}
      title="Really Denise"
      subtitle="Original Tunnel kid and party hostess · on the invitations with Jenny Go-Getter · now Bainbridge Island's mailbox lady"
      released="Released 30 Jul 2025 · 1:05:14 as a podcast · Part B of two interviews, from 0:36:25"
      blurb="Really Denise on getting her name at the Tunnel, the petting zoo party with Jenny Go-Getter, the McDonald's outlaw party and Bainbridge Island's mailboxes"
    />
  ),
});