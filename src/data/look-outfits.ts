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
  // Met Gala 2019: crystal-beaded strapless dress, chandelier headpiece, crystal drops at the neck.
  "katy-perry-s-chandelier-dress": {
    head: { label: "chandelier headpiece", hex: "#E8EEF2" },
    top: { label: "crystal-beaded strapless dress", hex: "#E8EEF2", full: true },
    extra: { label: "crystal necklace", hex: "#DDE6EE" },
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
  // HEARD•NY, Grand Central 2013: a black horse Soundsuit with a grey raffia fringe and a beaded, flowered back.
  "nick-cave-s-soundsuits": {
    top: { label: "black Soundsuit with a grey raffia fringe", hex: "#26262A", full: true },
    extra: { label: "beaded flowers", hex: "#E8453C" },
  },
  // Japan, early 1990s: quiffs, black jacket over a shirt, black jeans.
  "stray-cats-quiffs-and-sleeve-tattoos": {
    head: { label: "rockabilly quiff", hex: "#1A1A1A" },
    top: { label: "black jacket over a shirt", hex: "#1C1C1C" },
    bottom: { label: "black jeans", hex: "#1A1A1A" },
  },
};
