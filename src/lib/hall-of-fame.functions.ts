import { createServerFn } from "@tanstack/react-start";

/** /hall-of-fame's data from the A–Z, worked out on the server (src/lib/hall-of-fame.server.ts). */
export const getHallOfFame = createServerFn({ method: "GET" }).handler(async () => (await import("./hall-of-fame.server")).hallOfFameView());
