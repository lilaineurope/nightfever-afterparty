// Real photos of the shops on the Library's "Shops & boutiques" shelf (Lisa, 27 Nov 2026: "shops and boutiques need
// pictures ... cover pictures also"). Only pictures that are free to use - Wikimedia Commons public domain / CC0 /
// CC BY / CC BY-SA - never paid for, never Bill Bernstein, each credited on the cover's page. Kept on this site
// (src/assets/shops/), keyed by the shop's card slug. A shop without one keeps its pink carrier bag.

export type ShopPhoto = {
  src: string;
  /** What the picture shows, as alt text. */
  alt: string;
  /** "Photo: <who>, <licence>, via <source>" - shown under the picture. */
  credit: string;
  /** Where the picture comes from (its Commons page). */
  source: string;
  /** One line under the picture: what it shows and when, and how close it is to the guests' time. */
  note: string;
};

const pics = import.meta.glob<string>("../assets/shops/*.{jpg,webp,png}", { eager: true, query: "?url", import: "default" });
const pic = (file: string) => pics[`../assets/shops/${file}`] ?? "";

export const SHOP_PHOTOS: Record<string, ShopPhoto> = Object.fromEntries(
  (
    [
      // [slug, file, alt, note, credit, source]
    ] as [string, string, string, string, string, string][]
  ).map(([slug, file, alt, note, credit, source]) => [slug, { src: pic(file), alt, note, credit, source }]),
);
