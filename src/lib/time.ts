/** "1:02:03" / "02:03" -> seconds. Anything that isn't a number counts as 0. */
export const toSeconds = (t: string) => t.split(":").reduce((n, x) => n * 60 + (Number(x) || 0), 0);

/** "2026-10-21" -> "21 Oct 2026" (UTC, so the day never shifts). */
export function formatDate(iso: string) {
  return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  });
}
