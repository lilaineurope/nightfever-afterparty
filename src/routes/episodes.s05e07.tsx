import { createFileRoute, redirect } from "@tanstack/react-router";

// S05E07 was split into two AFTERPARTIES on 16 Nov 2026 (A Christopher Comp, B Really Denise).
// The old single address was shared before the split (playlists, emails), so it forwards to part A, which links to B.
export const Route = createFileRoute("/episodes/s05e07")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/episodes/s05e07a", statusCode: 301 });
  },
});
