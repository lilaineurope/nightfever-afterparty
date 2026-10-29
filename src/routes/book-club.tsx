import { createFileRoute, redirect } from "@tanstack/react-router";

// The Book Club is now the Library (/library, Lisa 29 Oct 2026). Old links and search results land there.
export const Route = createFileRoute("/book-club")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/library", statusCode: 301 });
  },
});
