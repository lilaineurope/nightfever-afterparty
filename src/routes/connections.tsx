import { createFileRoute, redirect } from "@tanstack/react-router";

// The Connections page is now the Network (/network). Old links and search results land there.
export const Route = createFileRoute("/connections")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/network", statusCode: 301 });
  },
});
