import { createFileRoute, redirect } from "@tanstack/react-router";
import { shortLinkTarget } from "@/data/short-links";

// nightfever-afterparty.com/spotify/s01e04 (or /spotify/cbgb) - see src/data/short-links.ts.
export const Route = createFileRoute("/spotify/$")({
  staticData: { sitemap: false },
  beforeLoad: ({ params }) => {
    throw redirect({ href: shortLinkTarget("spotify", params._splat ?? ""), statusCode: 302 });
  },
});
