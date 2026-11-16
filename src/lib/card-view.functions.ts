import { createServerFn } from "@tanstack/react-start";

/** One A–Z card's page data, worked out on the server (src/lib/card-view.server.ts) so the browser never downloads the
 *  whole A–Z for a card (page weight, 16 Nov 2026). */
export const getCardPage = createServerFn({ method: "GET" })
  .inputValidator((slug: unknown) => String(slug))
  .handler(async ({ data }) => (await import("./card-view.server")).cardPageData(data));
