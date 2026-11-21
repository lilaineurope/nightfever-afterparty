import { createServerFn } from "@tanstack/react-start";

/** /hall-of-fame's data from the A–Z, worked out on the server (src/lib/hall-of-fame.server.ts). */
export const getHallOfFame = createServerFn({ method: "GET" }).handler(async () => (await import("./hall-of-fame.server")).hallOfFameView());

/** One name's moments for its box on /hall-of-fame (places 11-100), fetched when the box opens. */
export const getHallOfFameMoments = createServerFn({ method: "GET" })
  .inputValidator((slug: unknown) => String(slug))
  .handler(async ({ data }) => (await import("./hall-of-fame.server")).hallOfFameMoments(data));
