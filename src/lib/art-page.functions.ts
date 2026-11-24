import { createServerFn } from "@tanstack/react-start";

/** One Cover art & posters page, worked out on the server (src/lib/art-page.server.ts), so the browser only gets this piece. */
export const getArtPage = createServerFn({ method: "GET" })
  .inputValidator((slug: unknown) => String(slug))
  .handler(async ({ data }) => (await import("./art-page.server")).artPageData(data));
