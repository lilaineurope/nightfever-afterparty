import { createFileRoute, redirect } from "@tanstack/react-router";

// Clubkid Culture is now Inside the Clubs (Lisa, 30 Oct 2026). Old links land there.
export const Route = createFileRoute("/clubkid-culture")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/inside-the-clubs", statusCode: 301 });
  },
});
