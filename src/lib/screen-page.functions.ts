import { createServerFn } from "@tanstack/react-start";

/** One Moving Images page, worked out on the server (src/lib/screen-page.server.ts), so the browser only gets this film or show. */
export const getScreenPage = createServerFn({ method: "GET" })
  .inputValidator((slug: unknown) => String(slug))
  .handler(async ({ data }) => (await import("./screen-page.server")).screenPageData(data));
