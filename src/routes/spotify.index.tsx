import { createFileRoute, redirect } from "@tanstack/react-router";
import { shortLinkTarget } from "@/data/short-links";

// nightfever-afterparty.com/spotify - the short address in Spotify playlist descriptions (src/data/short-links.ts).
export const Route = createFileRoute("/spotify/")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ href: shortLinkTarget("spotify", ""), statusCode: 302 });
  },
});
