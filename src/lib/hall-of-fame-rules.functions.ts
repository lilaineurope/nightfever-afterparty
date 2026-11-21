import { createServerFn } from "@tanstack/react-start";

/** /hall-of-fame-rules' data from the A–Z, worked out on the server (src/lib/hall-of-fame-rules.server.ts). */
export const getHallOfFameRules = createServerFn({ method: "GET" }).handler(async () => (await import("./hall-of-fame-rules.server")).hallOfFameRulesView());
