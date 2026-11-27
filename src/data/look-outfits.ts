// Looks with a real photo on their page are dressed as in that photo, so the mannequin and the picture match
// (Lisa, 27 Nov 2026: "now it shows a long dress but it is a short dress in the picture"). Keyed by the look's card
// slug; every other look is dressed from the episode's words (outfitOf in library-fashion.ts). When a photo is added
// to src/data/look-photos.ts, add its outfit here too.

type Garb = { label: string; hex: string; full?: boolean; hem?: string };
export type PhotoOutfit = Partial<Record<"head" | "top" | "bottom" | "feet" | "extra", Garb>>;

export const LOOK_OUTFITS: Record<string, PhotoOutfit> = {
  // The Fascinating Widow, 1911: short black satin dress, striped ruffled skirt, black stockings, low heels, hair piled up with a bow.
  "julian-eltinge-s-gibson-girl": {
    head: { label: "piled-up hair with a bow", hex: "#2B1B14" },
    top: { label: "short black satin dress with a striped ruffled skirt", hex: "#1D1B20", full: true },
    bottom: { label: "black stockings", hex: "#151515" },
    feet: { label: "low heels", hex: "#2A2A2A" },
  },
  // Her own gowns in Batac: floor-length red terno with butterfly sleeves.
  "imelda-s-red-dress-and-butterfly-sleeves": {
    top: { label: "red terno gown with butterfly sleeves", hex: "#8E1218", full: true },
  },
  // The red wool mini-crini suit, 1985-87: beret, double-breasted jacket, pearls, hooped mini skirt.
  "westwood-s-polka-dot-hoop-mini-skirts": {
    head: { label: "red beret", hex: "#C23F14" },
    top: { label: "red double-breasted jacket", hex: "#C23F14" },
    bottom: { label: "red wool mini-crini", hex: "#C23F14" },
    extra: { label: "pearl necklace", hex: "#E8E2D6" },
  },
  // HEARD•NY, Grand Central 2013: a horse Soundsuit - blue-eared head with an embroidered, flowered mask, yellow and purple raffia to the floor.
  "nick-cave-s-soundsuits": {
    head: { label: "horse-head mask with blue ears", hex: "#2F4E8C" },
    top: { label: "Soundsuit of straw-yellow and purple raffia to the floor", hex: "#E6DFAE", full: true, hem: "#3C2068" },
    extra: { label: "coral beads under the mask", hex: "#D9533F" },
  },
};

// The colours a photo look's swatch strips and colour chips show, picked from its photo so card, page and picture match
// (Lisa, 27 Nov 2026: "the colours don't match"). Every other look keeps the colours sampled from the episode.
export const LOOK_PHOTO_COLOURS: Record<string, string[]> = {
  // Black and white photo: black satin, grey stripes, white stockings-light.
  "julian-eltinge-s-gibson-girl": ["#141414", "#6B6B6B", "#E4E4E4"],
  // Deep red ternos, the champagne gown beside them, the rose-lit room.
  "imelda-s-red-dress-and-butterfly-sleeves": ["#8E1218", "#C9A27A", "#D98F72"],
  // Red-orange wool, its shadows, the dark room.
  "westwood-s-polka-dot-hoop-mini-skirts": ["#C23F14", "#8E2A0E", "#1D160B"],
  // Straw-yellow and purple raffia, the blue ears, the coral beads on the mask.
  "nick-cave-s-soundsuits": ["#E6DFAE", "#3C2068", "#2F4E8C", "#D9533F"],
};
