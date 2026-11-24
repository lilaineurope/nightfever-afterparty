// Real photos of the looks and outfits the guests talk about (Lisa, 24 Nov 2026: "look for a photo of the real thing the
// guests were referring to"). Only pictures that are free to use - Wikimedia Commons, museum open access, or a photographer
// who said yes - never paid for, never Bill Bernstein, each credited on the look's page. Kept on this site
// (src/assets/looks/), keyed by the look's card slug. A look without one shows its mannequin.

export type LookPhoto = {
  src: string;
  /** What the picture shows, as alt text. */
  alt: string;
  /** "Photo: <who>, <licence>, via <source>" - shown under the picture. */
  credit: string;
  /** Where the picture comes from (its Commons or museum page). */
  source: string;
  /** True when it is the very look the guest talks about; false when it shows the same piece or the same night. */
  exact: boolean;
};

const pics = import.meta.glob<string>("../assets/looks/*.{jpg,webp,png}", { eager: true, query: "?url", import: "default" });
const pic = (file: string) => pics[`../assets/looks/${file}`] ?? "";

export const LOOK_PHOTOS: Record<string, LookPhoto> = Object.fromEntries(
  (
    [
      // [slug, file, alt, credit, source, exact]
    ] as [string, string, string, string, string, boolean][]
  ).map(([slug, file, alt, credit, source, exact]) => [slug, { src: pic(file), alt, credit, source, exact }]),
);
