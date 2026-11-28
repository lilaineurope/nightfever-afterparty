// Other names a page is searched by (Lisa, 27 Nov 2026, "A3"): sent to Google as schema.org alternateName, so a search
// for the other name finds the right page. Keys are A–Z slugs, or episode ids for guests (their page is the episode page).
// Club aka names (CBGB & OMFUG) come from src/data/club-profiles.ts and are added on top.
export const ALTERNATE_NAMES: Record<string, string[]> = {
  // Guests
  s02e10: ["Tish Gervais", "Natalia"],
  s06e09: ["Desi Monster"],
  // A–Z pages
  "aileen-mehle": ["Suzy", "Aileen Mehle"],
  cbgb: ["CBGB-OMFUG", "CBGB & OMFUG", "CBGB's"],
  "lahoma-van-zandt": ["Lahoma", "John Witherspoon"],
  "clara-the-carefree-chicken": ["Clara the Chicken"],
  tunnel: ["Tunnel"],
  "anita-sarko": ["Sarko"],
  "les-bains-douches": ["Les Bains", "Bains Douches"],
  // Search Console 19-25 Nov 2026: "dean and the weenies" got a click and landed on Dean Johnson's page.
  "dean-johnson": ["Dean and the Weenies", "Dean Johnson and the Weenies"],
  // Top Google search pages, round 3 (Lisa, 28 Nov 2026).
  "jenny-go-getter": ["Jennifer Banash", "Jenny Banash", "Jenny Go Getter"],
  jefferson: ["The Jefferson", "Jefferson Theatre", "Arthur Weinstein's Jefferson"],
  "howie-pyro": ["Howard Kusten"],
};

/** The name in an episode page's title when the guest is searched by another name too (B2a, Lisa 27 Nov 2026). */
export const EPISODE_TITLE_NAME: Record<string, string> = { s02e10: "Brian Belovitch (Tish Gervais)" };
