import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * The guest cards now live on the Timeline page (the two pages were joined),
 * so the old address forwards there instead of showing a second copy.
 */
export const Route = createFileRoute("/guests")({
  beforeLoad: () => {
    throw redirect({ to: "/timeline" });
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
  }),
  component: () => null,
});
