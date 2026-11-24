import { entities } from "./entities";

// The fashion words the Wardrobe (closet.ts) and the Library's Fashion & outfits shelf (library-fashion.ts) share: the five
// rails, the garment words that put a piece on a rail, and the designers. Kept apart from closet.ts so the Library can read
// them without building every Wardrobe piece.

export type Slot = "head" | "top" | "bottom" | "feet" | "extra";
export const SLOTS: { id: Slot; label: string }[] = [
  { id: "head", label: "Hair, hats & face" },
  { id: "top", label: "Tops, dresses & jackets" },
  { id: "bottom", label: "Skirts, trousers & legs" },
  { id: "feet", label: "Shoes & boots" },
  { id: "extra", label: "The finishing touch" },
];

const KW: [Slot, RegExp, boolean?][] = [
  ["feet", /\b(shoes?|heels?|stilettos?|boots?|platforms?|sneakers?|trainers?|pumps?|sandals?|loafers?|oxfords?|waders?|mules?|creepers?|brogues?|slippers?|kicks|doc martens)\b/i],
  ["bottom", /\b(skirts?|miniskirt|trousers|pants|jeans|shorts|hot-pants|kilts?|tutus?|chinos?|leggings|fishnets?|stockings?|tights|garters?|jockstrap|underwear|crinoline|crini|petticoats?|dirndl|bloomers|flares|bell-bottoms)\b/i],
  ["top", /\b(dress(es)?|gowns?|catsuits?|jumpsuits?|bodysuits?|leotards?|costumes?|uniforms?|slip|frocks?|kimonos?|robes?|habit|wimple|pyjamas?|lingerie|tuxedos?|suits?)\b/i, true],
  ["top", /\b(shirts?|tees?|t-shirts?|blouses?|corsets?|bustiers?|jackets?|blazers?|coats?|trench|sweatshirts?|hoodies?|sweaters?|jumpers?|cardigans?|tanks?|halters?|vests?|waistcoats?|capes?|ponchos?|tops?|bras?|pinafores?|tunics?|cravats?|bolero|cable-knit|biker)\b/i],
  ["head", /\b(wigs?|hair|hairdo|bouffant|beehive|mohawk|pompadour|curls?|blonde|platinum|big-hair|bald|beards?|moustache|lips?|lipstick|rouge|eyeliner|mascara|lash(es)?|make-?up|face paint|beauty-spot|eyeshadow|glitter brows?|frames|glasses|sunglasses|shades|lens|masks?|earrings?|hats?|caps?|beanies?|berets?|crowns?|tiaras?|headdress(es)?|turbans?|veils?|halo|horns?|bows?|headphones|powdered-wig)\b/i],
  ["extra", /\b(pearls?|beads?|necklaces?|chains?|bracelets?|bangles?|rings?|jewel(le)?ry|jewels?|rhinestones?|crystals?|boas?|feathers?|furs?|mink|stoles?|gloves?|belts?|braces|bags?|clutch|purses?|fans?|canes?|safety-pins?|studs?|corsage|scarf|scarves|shawls?|ties?|brooch|lunchbox|umbrella|parasol|mirror-ball|confetti|wands?|whips?|collars?)\b/i],
];
// Fabrics and finishes with no garment named: worn as the top.
const FABRIC = /\b(sequins?|glitter|lam[eé]|satin|silk|velvet|chiffon|lace|taffeta|spandex|latex|rubber|pvc|vinyl|leather|patent|leopard|zebra|plaid|tartan|tulle|mylar|lurex|denim|tie-dye|paisley|pinstripe|gingham|mohair|fur)\b/i;

/** The rail a garment word puts a piece on (null when nothing in the text is worn). */
export const slotOf = (text: string): { slot: Slot; full?: boolean | undefined } | null => {
  for (const [slot, rx, full] of KW) if (rx.test(text)) return { slot, full };
  return FABRIC.test(text) ? { slot: "top" } : null;
};

// A surname that is also a first name on the show ("James" in Charles James is James St. James) only counts in full.
const FIRST_NAME_SURNAME = new Set(["charles-james"]);

// Designers and fashion houses: every card whose own note calls it a designer, label or couture house.
// A piece belongs to a designer when its story names them - in full, by surname ("Westwood heels") or by house ("Mugler").
export const DESIGNERS: { slug: string; name: string; rx: RegExp }[] = (() => {
  const esc = (x: string) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return entities
    .filter(
      (e) =>
        (e.category === "Person" || e.category === "Organisation") &&
        !/records?\b/i.test(e.name) &&
        e.refs.some((r) => /designer|fashion house|couture|clothing line|fashion label|\blabel\b/i.test(r.fashion ?? "")),
    )
    .map((e) => {
      const name = e.name.replace(/\s*\([^)]*\)/g, "").trim();
      const alias = new Set([name]);
      const last = name.split(" ").at(-1)!;
      if (e.category === "Person" && name.includes(" ") && last.length >= 5 && !FIRST_NAME_SURNAME.has(e.slug)) alias.add(last);
      const house = name.replace(/^House of\s+/i, "");
      if (house !== name && house.length >= 6) alias.add(house);
      return { slug: e.slug, name, rx: new RegExp(`(?<![\\w-])(${[...alias].map(esc).join("|")})(?![\\w-])`) };
    });
})();
