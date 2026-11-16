import { createFileRoute, redirect } from "@tanstack/react-router";

// nightfever-afterparty.com/spotify/s01e04 (or /spotify/cbgb) - see src/data/short-links.ts.
export const Route = createFileRoute("/spotify/$")({
  staticData: { sitemap: false },
  // The link list (it reads the club nights) loads only when a short link is followed (page weight, 16 Nov 2026).
  beforeLoad: async ({ params }) => {
    const { shortLinkTarget } = await import("@/data/short-links");
    throw redirect({ href: shortLinkTarget("spotify", params._splat ?? ""), statusCode: 302 });
  },
});
