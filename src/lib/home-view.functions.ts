import { createServerFn } from "@tanstack/react-start";

/** The home page's data from the A–Z, worked out on the server (src/lib/home-view.server.ts, page weight 17 Nov 2026). */
export const getHomePage = createServerFn({ method: "GET" }).handler(async () => (await import("./home-view.server")).homeView());
