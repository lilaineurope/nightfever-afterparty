// Looks with a real photo on their page are dressed as in that photo, so the mannequin and the picture match
// (Lisa, 27 Nov 2026: "now it shows a long dress but it is a short dress in the picture"). Keyed by the look's card
// slug; every other look is dressed from the episode's words (outfitOf in library-fashion.ts). When a photo is added
// to src/data/look-photos.ts, add its outfit here too.

type Garb = { label: string; hex: string; full?: boolean };
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
    top: { label: "red terno gown with butterfly sleeves", hex: "#B5202E", full: true },
  },
  // The red wool mini-crini suit, 1985-87: beret, double-breasted jacket, pearls, hooped mini skirt.
  "westwood-s-polka-dot-hoop-mini-skirts": {
    head: { label: "red beret", hex: "#C8402E" },
    top: { label: "red double-breasted jacket", hex: "#C8402E" },
    bottom: { label: "red wool mini-crini", hex: "#C8402E" },
    extra: { label: "pearl necklace", hex: "#E8E2D6" },
  },
  // HEARD•NY, Grand Central 2013: a horse Soundsuit - blue-eared head with an embroidered, flowered mask, yellow and purple raffia to the floor.
  "nick-cave-s-soundsuits": {
    top: { label: "Soundsuit of yellow and purple raffia to the floor", hex: "#E3C34A", full: true },
    extra: { label: "beaded flowers", hex: "#8E3FA0" },
  },
};
