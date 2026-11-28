// Real photos of the shops on the Library's "Shops & boutiques" shelf (Lisa, 27 Nov 2026: "shops and boutiques need
// pictures ... cover pictures also"). Only pictures that are free to use - Wikimedia Commons public domain / CC0 /
// CC BY / CC BY-SA - never paid for, never Bill Bernstein, each credited on the cover's page. Kept on this site
// (src/assets/shops/), keyed by the shop's card slug. A shop without one gets a Gemini-made polaroid of its front on a Schiele-style street (SHOP_DRAWINGS).

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
  /** A drawing, not a photo (no source link; the caption says so). */
  drawing?: boolean;
};

const pics = import.meta.glob<string>("../assets/shops/**/*.{jpg,webp,png}", { eager: true, query: "?url", import: "default" });
const pic = (file: string) => pics[`../assets/shops/${file}`] ?? "";

const PHOTOS: Record<string, ShopPhoto> = Object.fromEntries(
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

// Lisa, 28 Nov 2026 ("we need to find cover designs for all boxes for designers and shops"): every shop with no free photo
// gets a picture made with Gemini from the facts in shop-facts.ts (brief: library-fashion/shop-drawings-brief.csv in the
// project files). After several style rounds Lisa picked "M2": the shopfront as a black-and-white photo, cut out as a
// polaroid on the RIGHT, over a street drawn in Egon Schiele's manner, all in the site's pink photocopy look
// (scripts/polaroid-box.py --width 0.56 --head 0.2 --cx 0.64). Captioned as made with Gemini. A free photo, when one
// turns up, goes above and wins.
const DRAWINGS: [slug: string, alt: string, note: string][] = [
  ["patricia-field-store-8th-street", "Polaroid-style picture of Patricia Field, 8th Street made with Gemini, not a photo: Narrow Greenwich Village shopfront on East 8th Street: big window crowded with wigs on foam heads and club clothes, hand-painted sign \"Patricia Field\", club kids at the door", "Patricia Field, 8th Street as it might have looked around 1985 - no free photo of it has turned up yet."],
  ["patricia-field-store-bowery", "Polaroid-style picture of Patricia Field, Bowery made with Gemini, not a photo: 306 Bowery: wide shopfront with wigs, sequins and colourful clothes in the windows, graffiti-style sign, Bowery street with fire escapes", "Patricia Field, Bowery as it might have looked around 2005 - no free photo of it has turned up yet."],
  ["patricia-field-gallery", "Polaroid-style picture of Patricia Field ArtFashion gallery made with Gemini, not a photo: Small Bowery gallery window showing hand-painted jackets and art pieces on mannequins, white walls inside", "Patricia Field ArtFashion gallery as it might have looked around 2017 - no free photo of it has turned up yet."],
  ["pants-pub-washington-place", "Polaroid-style picture of The Pants Pub, Washington Place made with Gemini, not a photo: Tiny 1960s Greenwich Village shop on Washington Place near NYU: hand-lettered sign \"Pants Pub\", slim trousers hanging in the window, students passing", "The Pants Pub, Washington Place as it might have looked around 1967 - no free photo of it has turned up yet."],
  ["fiorucci", "Polaroid-style picture of Fiorucci New York made with Gemini, not a photo: 127 East 59th Street: glossy disco-era shopfront, windows full of plastic, stickers, neon and jeans, crowd at the door, Bloomingdale's corner nearby", "Fiorucci New York as it might have looked around 1978 - no free photo of it has turned up yet."],
  ["pop-shop", "Polaroid-style picture of Pop Shop made with Gemini, not a photo: 292 Lafayette Street, SoHo: small shop whose walls, ceiling and floor are completely covered in Keith Haring-style black line figures, T-shirts and badges on display", "Pop Shop as it might have looked around 1987 - no free photo of it has turned up yet."],
  ["diane-b", "Polaroid-style picture of Diane B made with Gemini, not a photo: Chic SoHo boutique with a cast-iron facade and a single striking chain-mail dress in the window", "Diane B as it might have looked around 1984 - no free photo of it has turned up yet."],
  ["thompson-street-store", "Polaroid-style picture of Susanne Bartsch, Thompson Street made with Gemini, not a photo: Tiny SoHo shop in an old English-panelled wooden shopfront, young London designer clothes in the small window", "Susanne Bartsch, Thompson Street as it might have looked around 1981 - no free photo of it has turned up yet."],
  ["west-broadway-store", "Polaroid-style picture of Susanne Bartsch, West Broadway made with Gemini, not a photo: Bigger, colourful SoHo shop on West Broadway, bright window displays, a tour bus driving past", "Susanne Bartsch, West Broadway as it might have looked around 1984 - no free photo of it has turned up yet."],
  ["charivari", "Polaroid-style picture of Charivari made with Gemini, not a photo: Upper West Side boutique on Broadway, minimalist windows with black Japanese and Belgian designer clothes", "Charivari as it might have looked around 1985 - no free photo of it has turned up yet."],
  ["henri-bendel", "Polaroid-style picture of Henri Bendel made with Gemini, not a photo: West 57th Street store front with brown-and-white striped awnings and shopping bags, elegant windows", "Henri Bendel as it might have looked around 1985 - no free photo of it has turned up yet."],
  ["lee-s-mardi-gras", "Polaroid-style picture of Lee's Mardi Gras made with Gemini, not a photo: West 14th Street upstairs boutique: sign \"Lee's Mardi Gras\", windows with big wigs, high heels and gowns in large sizes", "Lee's Mardi Gras as it might have looked around 1990 - no free photo of it has turned up yet."],
  ["reade-street-shoe-warehouse", "Polaroid-style picture of Reade Street shoe warehouse made with Gemini, not a photo: Tribeca warehouse on Reade Street, cast-iron building, inside shelves stacked to the ceiling with boxes of vintage shoes from the 1920s-60s", "Reade Street shoe warehouse as it might have looked around 1980 - no free photo of it has turned up yet."],
  ["screaming-mimi-s", "Polaroid-style picture of Screaming Mimi's made with Gemini, not a photo: New York vintage clothing shop, window packed with vintage dresses, hats and kitsch, hand-painted sign \"Screaming Mimi's\"", "Screaming Mimi's as it might have looked around 1985 - no free photo of it has turned up yet."],
  ["browns", "Polaroid-style picture of Browns made with Gemini, not a photo: South Molton Street, London: elegant Georgian shopfronts on a pedestrian street, sign \"Browns\", designer clothes in the windows", "Browns as it might have looked around 1985 - no free photo of it has turned up yet."],
  ["ibiza", "Polaroid-style picture of Ibiza boutique made with Gemini, not a photo: Downtown New York boutique window with a hula-skirt style shawl on display, sign \"Ibiza\"", "Ibiza boutique as it might have looked around 1986 - no free photo of it has turned up yet."],
  ["if-boutique", "Polaroid-style picture of If Boutique made with Gemini, not a photo: SoHo boutique with cast-iron facade, avant-garde fashion in a sparse window, small sign \"IF\"", "If Boutique as it might have looked around 1990 - no free photo of it has turned up yet."],
  ["jax", "Polaroid-style picture of Jax made with Gemini, not a photo: Chic 1950s-60s Beverly Hills shop, low modern building, palm trees, slim slacks and sheath dresses in the window", "Jax as it might have looked around 1960 - no free photo of it has turned up yet."],
  ["revenge", "Polaroid-style picture of Revenge (East Village) made with Gemini, not a photo: Grungy East Village punk shop, stickers and flyers on the door, a barber chair visible inside, sign \"Revenge\"", "Revenge (East Village) as it might have looked around 1980 - no free photo of it has turned up yet."],
  ["saks-fifth-avenue", "Polaroid-style picture of Saks Fifth Avenue made with Gemini, not a photo: 611 Fifth Avenue: the grand limestone department store facing Rockefeller Center, flags and windows, yellow cabs", "Saks Fifth Avenue as it might have looked around 1985 - no free photo of it has turned up yet."],
  ["salvation-army", "Polaroid-style picture of Salvation Army thrift shop made with Gemini, not a photo: New York Salvation Army thrift store front with its red shield sign, racks of second-hand clothes inside", "Salvation Army thrift shop as it might have looked around 1978 - no free photo of it has turned up yet."],
  ["susan-bennis-warren-edwards", "Polaroid-style picture of Susan Bennis Warren Edwards made with Gemini, not a photo: Elegant New York shoe shop, a few precious designer shoes displayed on pedestals in the window", "Susan Bennis Warren Edwards as it might have looked around 1985 - no free photo of it has turned up yet."],
  ["ultimo", "Polaroid-style picture of Ultimo made with Gemini, not a photo: Oak Street, Chicago: sleek designer boutique in a brownstone row, small sign \"Ultimo\", elegant windows", "Ultimo as it might have looked around 1980 - no free photo of it has turned up yet."],
];

export const SHOP_DRAWINGS: Record<string, ShopPhoto> = Object.fromEntries(
  DRAWINGS.map(([slug, alt, note]) => [
    slug,
    { src: pic(`drawings/${slug}.webp`), alt, note, credit: "Made with Gemini, not a real photo: the shopfront after a Gemini photo, the street behind after a Gemini drawing in Egon Schiele's manner, both in our photocopy style.", source: "", drawing: true },
  ]),
);

/** The shop's picture: its free photo, else its drawing. */
export const SHOP_PHOTOS: Record<string, ShopPhoto> = { ...SHOP_DRAWINGS, ...PHOTOS };
