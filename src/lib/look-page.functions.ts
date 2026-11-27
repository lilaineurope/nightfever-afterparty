import { createServerFn } from "@tanstack/react-start";

/** One Fashion & outfits look page, worked out on the server (src/lib/look-page.server.ts), so the browser only gets this look. */
export const getLookPage = createServerFn({ method: "GET" })
  .inputValidator((slug: unknown) => String(slug))
  .handler(async ({ data }) => (await import("./look-page.server")).lookPageData(data));
