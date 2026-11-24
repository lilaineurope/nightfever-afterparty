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
  /** True when it is the very look the guest talks about; false when it shows the same kind of piece, another day. */
  exact: boolean;
  /** One line under the picture saying what it shows and how close it is to the story. */
  note: string;
};

const pics = import.meta.glob<string>("../assets/looks/*.{jpg,webp,png}", { eager: true, query: "?url", import: "default" });
const pic = (file: string) => pics[`../assets/looks/${file}`] ?? "";

export const LOOK_PHOTOS: Record<string, LookPhoto> = Object.fromEntries(
  (
    [
      // [slug, file, alt, note, credit, source, exact]
      [
        "imelda-s-red-dress-and-butterfly-sleeves",
        "imelda-gowns.webp",
        "Three of Imelda Marcos's gowns with butterfly sleeves on display, two of them red, in front of photographs of her",
        "Her own gowns with the butterfly sleeves, two of them red - on show at the Marcos Presidential Center in Batac.",
        "Photo: Khdamayo, CC0, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:Collection_of_gowns_worn_by_Imelda_Romualdez-Marcos.jpg",
        false,
      ],
      [
        "westwood-s-polka-dot-hoop-mini-skirts",
        "westwood-mini-crini.webp",
        "A Vivienne Westwood mini-crini suit in red wool on a museum dress form",
        "A Westwood mini-crini from 1985-87 - not the polka-dot one from the Limelight show, but the same hooped little skirt.",
        "Photo: Woehning, CC BY-SA 3.0, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:Vivienne_Westwood_Mini_Crini.jpg",
        false,
      ],
      [
        "katy-perry-s-chandelier-dress",
        "katy-perry-chandelier.webp",
        "Katy Perry on the 2019 Met Gala carpet dressed as a crystal chandelier, with a chandelier frame around her head",
        "The chandelier itself, on the 2019 Met Gala carpet.",
        "Photo: Cosmopolitan UK, CC BY 3.0, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:Katy_Perry_during_the_Met_Gala_2019.png",
        true,
      ],
      [
        "nick-cave-s-soundsuits",
        "nick-cave-soundsuit.webp",
        "A performer under one of Nick Cave's horse Soundsuits, with raffia fringe and a beaded, flowered back, in Grand Central Terminal",
        "One of his Soundsuits on the move - a horse from HEARD•NY in Grand Central, 2013.",
        "Photo: Metropolitan Transportation Authority, CC BY 2.0, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:AFT_1693_(8593319960).jpg",
        true,
      ],
      [
        "julian-eltinge-s-gibson-girl",
        "julian-eltinge-fascinating-widow.webp",
        "Julian Eltinge in costume as a woman in 1911: corseted waist, piled-up dark hair with a bow, short ruffled dress and stockings",
        "Eltinge in The Fascinating Widow, 1911 - the nipped waist and piled-up hair, in a bathing costume rather than the gown.",
        "Photo: White Studio, public domain, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:Julian-Eltinge-Fascinating-Widow.jpg",
        false,
      ],
      [
        "stray-cats-quiffs-and-sleeve-tattoos",
        "stray-cats.webp",
        "The three Stray Cats against a concrete wall in black and white, with rockabilly quiffs and a tattooed arm",
        "The Stray Cats in Japan in the early 1990s, quiffs and ink still in place.",
        "Photo: Masao Nakagami, CC BY-SA 2.0, via Wikimedia Commons",
        "https://commons.wikimedia.org/wiki/File:Stray_Cats.jpg",
        false,
      ],
    ] as [string, string, string, string, string, string, boolean][]
  ).map(([slug, file, alt, note, credit, source, exact]) => [slug, { src: pic(file), alt, note, credit, source, exact }]),
);
