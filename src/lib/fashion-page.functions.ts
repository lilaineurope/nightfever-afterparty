import { createServerFn } from "@tanstack/react-start";

/** One designer or label page of the Library's Fashion & outfits shelf (src/lib/fashion-page.server.ts). */
export const getDesignerPage = createServerFn({ method: "GET" })
  .inputValidator((slug: unknown) => String(slug))
  .handler(async ({ data }) => (await import("./fashion-page.server")).designerPageData(data));

/** One shop or boutique page of the Library's Fashion & outfits shelf (src/lib/fashion-page.server.ts). */
export const getShopPage = createServerFn({ method: "GET" })
  .inputValidator((slug: unknown) => String(slug))
  .handler(async ({ data }) => (await import("./fashion-page.server")).shopPageData(data));
