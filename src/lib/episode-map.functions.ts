import { createServerFn } from "@tanstack/react-start";

/** One AFTERPARTY's places as a numbered map (src/lib/map-view.server.ts episodeMapOf), fetched when the reference list's
 *  "Map" view opens, so the drawing and the pins never weigh on the page itself. */
export const getEpisodeMap = createServerFn({ method: "GET" })
  .inputValidator((id: unknown) => String(id))
  .handler(async ({ data }) => (await import("./map-view.server")).episodeMapOf(data));
