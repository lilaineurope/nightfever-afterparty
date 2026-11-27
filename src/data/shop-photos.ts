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
      [
        "barneys-new-york",
        "barneys-madison-2010.webp",
        "Barneys New York on Madison Avenue: a tall stone building with red awnings over the shop windows",
        "Barneys on Madison Avenue at 60th Street in 2010 - its home from 1993 until it closed.",
        "Photo: Jim Henderson, CC0, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:Barneys_New_York_60_jeh.jpg",
      ],
      [
        "macy-s",
        "macys-1984.webp",
        "Macy's at Herald Square in 1984, with the big sign: the world's largest store, and a crowd on the corner",
        "Macy's at Broadway and 34th Street in June 1984 - \"the world's largest store\".",
        "Photo: Ted Quackenbush, CC BY-SA 3.0, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:Macy%27s_Department_Store_-_June_1984.jpg",
      ],
      [
        "bloomingdale-s",
        "bloomingdales-2007.webp",
        "Bloomingdale's on Lexington Avenue: the black-and-cream flagship with a row of flags and yellow cabs at the kerb",
        "The Lexington Avenue flagship at 59th Street in 2007 - the windows the guests talk about.",
        "Photo: Coolcaesar, CC BY-SA 3.0, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:NYC_Bloomingdales.jpg",
      ],
      [
        "bergdorf-goodman",
        "bergdorf-goodman-2024.webp",
        "The pale stone Bergdorf Goodman building, its name carved over the door on 58th Street",
        "The Bergdorf Goodman building's 58th Street side in 2024.",
        "Photo: Epicgenius, CC BY-SA 4.0, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:5_Av_Apr_2024_126.jpg",
      ],
      [
        "trash-and-vaudeville",
        "trash-and-vaudeville-2009.webp",
        "Trash and Vaudeville's neon signs over the steps at 4 St. Marks Place, next to the St. Marks Hotel",
        "The neon signs on St. Marks Place in 2009 - Trash up the steps, Vaudeville down below.",
        "Photo: Tony, CC BY 2.0, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:Trash_and_Vaudeville.jpg",
      ],
      [
        "worlds-end",
        "worlds-end-2022.webp",
        "The green-framed shop window of Worlds End at 430 King's Road, with flowers left for Vivienne Westwood",
        "The Worlds End window on 30 December 2022, the day after Vivienne Westwood died, with flowers left at the door.",
        "Photo: Kwh1050, CC BY-SA 4.0, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:Vivienne_Westwood_store._430_King%27s_Road,_Chelsea,_London,_UK._(_3_).jpg",
      ],
      [
        "parco",
        "shibuya-parco.webp",
        "Shibuya Parco in Tokyo seen from above, a glass tower among the city blocks",
        "Shibuya Parco in Tokyo, rebuilt in 2019 - the chain's best-known store.",
        "Photo: 稲妻ノ歯鯨, CC BY-SA 4.0, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:Shibuya_Parco_Hulic_Building.jpg",
      ],
      [
        "sears",
        "sears-1960s.webp",
        "Black-and-white photo of a Sears department store floor: racks of clothes along a wide aisle",
        "Not Musto's Sears - a Sears store floor of the 1960s or 70s, in Lafayette, Louisiana, the way it looked then.",
        "Photo: Historic American Buildings Survey, public domain, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:Interior_from_front_entrance,facing_southwest_-_Sears_Department_Store,_705_West_University_Avenue,_Lafayette,_Lafayette_Parish,_LA_HABS_LA,28-LAFY,2-2.tif",
      ],
    ] as [string, string, string, string, string, string][]
  ).map(([slug, file, alt, note, credit, source]) => [slug, { src: pic(file), alt, note, credit, source }]),
);
