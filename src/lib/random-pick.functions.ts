import { createServerFn } from "@tanstack/react-start";

/** One random night out for the box at the bottom of every page (Lisa, 27-28 Nov 2026), drawn on the server so the browser
 *  never downloads the A–Z for it. POST, so no browser or CDN cache hands back the same night twice. */
export const getRandomNight = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ({
    here: String((input as { here?: unknown } | null)?.here ?? "/").slice(0, 300),
  }))
  .handler(async ({ data }) => (await import("./random-pick.server")).randomNight(data.here));
