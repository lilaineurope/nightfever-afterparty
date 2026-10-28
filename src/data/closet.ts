import { entities, entityFor, type Entity, type Ref } from "./entities";
import { episodes } from "./episodes";
import { linkNames } from "../lib/name-links";

// The Wardrobe (/wardrobe): every garment, accessory and bit of hair or make-up named in the episodes' looks (Mood rows, with
// their colours sampled from the stories and screenshots) and fashion notes, sorted onto five rails. Each piece keeps
// its source - episode, timestamp, look card - and the cards its story names, so the closet can be filtered by
// episode, guest or host, club, location, event, music, film/TV or colour.

export type Slot = "head" | "top" | "bottom" | "feet" | "extra";
export const SLOTS: { id: Slot; label: string }[] = [
  { id: "head", label: "Hair, hats & face" },
  { id: "top", label: "Tops, dresses & jackets" },
  { id: "bottom", label: "Skirts, trousers & legs" },
  { id: "feet", label: "Shoes & boots" },
  { id: "extra", label: "The finishing touch" },
];

export type Piece = {
  id: string;
  label: string; // "Patent heel"
  slot: Slot;
  full?: boolean | undefined; // a dress or catsuit covers the bottom rail too
  hex?: string | undefined; // its own colour, when the story names it
  palette: string[]; // the whole look's colours
  look: string; // the look or card it comes from
  lookSlug?: string | undefined;
  episode: string; // s01e01
  time: string;
  who?: string | undefined; // whose look, when known
  text: string; // the story text, for matching designers
  tags: string[]; // slugs of every card the story touches (episode guest, people, clubs, places...)
};

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
const NOT_WORN = /\b(wallpaper|library|bookshel(f|ves)|shelf|studio|backdrop|office|curtain|stage|wall|window|poster|canvas|paint(ing)?|mic|lamp|candle|door|floor|sky|night|street|club|room|logo|book|newsprint|paper|ink|marker|flag|neon sign|can|tin|bathtub|piano|engine|aquarium|hallway|brick|elevator|tunnel|bunker|diner|pool|seat|rail|video|screen|table|tablecloth|bedsheet|bedding|invite|cover)\b/i;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
// Jobs, awards and shops that merely mention clothes.
const NOT_A_PIECE = /\b(designers?|nominations?|awards?|photographers?|shops?|stores?|boutiques?|brands?|labels?|collections?|magazines?|company|department|editor|line|business|museum|exhibition|shade|model|defined|scene)\b/i;
/** Colour labels read "garment colour" ("wig platinum"): say it the natural way round ("Platinum wig"). */
const naturalColour = (name: string) => {
  const w = name.split(/\s+/);
  if (w.length < 2) return cap(name);
  const head = w[0]!;
  return slotOf(head) ? cap(`${w.slice(1).join(" ")} ${head}`) : cap(name);
};
const slotOf = (text: string): { slot: Slot; full?: boolean | undefined } | null => {
  for (const [slot, rx, full] of KW) if (rx.test(text)) return { slot, full };
  return FABRIC.test(text) ? { slot: "top" } : null;
};
const hexes = (r: Ref & { colours?: string[] }) =>
  (r.colours ?? []).flatMap((c) => {
    const m = /^(.*?)\s+(#[0-9a-fA-F]{6})$/.exec(c);
    return m ? [{ name: m[1]!, hex: m[2]! }] : [];
  });

const HOSTS: Record<string, string> = { James: "James St. James", Fenton: "Fenton Bailey", Randy: "Randy Barbato" };
const guestOf = (ep: string) => episodes.find((e) => e.id === ep)?.guest ?? "";

/** Whose look it is: "<First>'s on-camera look" -> that host or the episode's guest. */
function wearer(r: Ref): string | undefined {
  const m = /^(Young )?([A-Z][\w.-]+)'s\b/.exec(r.name);
  if (!m) return undefined;
  const first = m[2]!;
  const guest = guestOf(r.episode!);
  if (guest.split(/[ &]+/).includes(first)) return guest.includes("&") ? guest : guest;
  return HOSTS[first] ?? entities.find((e) => e.category === "Person" && e.name.split(" ")[0] === first && e.refs.some((x) => x.episode === r.episode))?.name;
}

function tagsFor(r: Ref, who?: string): string[] {
  const out = new Set<string>();
  const self = entityFor(r.name);
  if (self && r.category !== "Mood") out.add(self.slug);
  for (const seg of linkNames(`${r.name} ${r.context} ${r.fashion ?? ""}`)) if (seg.slug) out.add(seg.slug);
  const g = entityFor(guestOf(r.episode!));
  if (g) out.add(g.slug);
  if (who) {
    const w = entityFor(who);
    if (w) out.add(w.slug);
  }
  return [...out];
}

const refs: (Ref & { colours?: string[] })[] = (() => {
  const seen = new Set<Ref>();
  const all: (Ref & { colours?: string[] })[] = [];
  for (const e of entities)
    for (const r of e.refs)
      if (!seen.has(r)) {
        seen.add(r);
        all.push(r);
      }
  return all;
})();

export const PIECES: Piece[] = (() => {
  const out: Piece[] = [];
  const keys = new Set<string>();
  const push = (p: Omit<Piece, "id">) => {
    const k = `${p.episode}|${p.slot}|${p.label.toLowerCase()}`;
    if (keys.has(k)) return;
    keys.add(k);
    out.push({ ...p, id: `p${out.length}` });
  };
  for (const r of refs) {
    const isLook = r.category === "Mood";
    if (!isLook && !r.fashion) continue;
    const pal = hexes(r);
    const who = isLook ? wearer(r) : r.category === "Person" ? entityFor(r.name)?.name : undefined;
    const tags = tagsFor(r, who);
    const lookSlug = entityFor(r.name)?.slug;
    const base = { palette: pal.map((c) => c.hex), look: r.name, lookSlug, episode: r.episode!, time: r.time, who, tags, text: `${r.name} ${r.heard} ${r.context} ${r.fashion ?? ""}` };
    // 1. colours named after the piece they belong to ("patent heel #0B0B0B")
    for (const c of pal) {
      if (NOT_WORN.test(c.name) && !slotOf(c.name.replace(NOT_WORN, ""))) continue;
      const s = slotOf(c.name);
      if (s && !NOT_A_PIECE.test(c.name)) push({ ...base, label: naturalColour(c.name), slot: s.slot, full: s.full, hex: c.hex });
    }
    // 2. garments named in the look itself or in a fashion note ("Military caps, braces and leather")
    const text = isLook ? `${r.name}, ${r.heard}` : (r.fashion ?? "");
    if (/^(Worn or shown in the episode|Fashion designer|Fashion photographer|Model|Supermodel|Style icon|Department store)$/i.test(text.trim())) continue;
    for (const chunk of text.split(/\s*(?:,|\/|;| and | with | over | under | plus )\s*/)) {
      const c = chunk.replace(/\(.*?\)/g, "").replace(/[.:]/g, "").replace(/^(from|a|an|the|her|his|their|young \w+'s)\s+/i, "").replace(/\s+/g, " ").trim();
      if (c.length < 3 || c.length > 48 || c.split(" ").length > 6 || NOT_WORN.test(c) || NOT_A_PIECE.test(c)) continue;
      const s = slotOf(c);
      if (!s) continue;
      const own = pal.find((p) => c.toLowerCase().includes(p.name.split(" ")[0]!.toLowerCase()));
      push({ ...base, label: cap(c), slot: s.slot, full: s.full, hex: own?.hex ?? pal[0]?.hex });
    }
  }
  return out;
})();

// ---- "Dress me for..." filters -------------------------------------------------------------------------------------

export type Mode = "all" | "episode" | "people" | "designer" | "Club" | "Location" | "Event" | "Music" | "Screen" | "colour";
export const MODES: { id: Mode; label: string }[] = [
  { id: "all", label: "Surprise me" },
  { id: "episode", label: "Episode" },
  { id: "people", label: "Guests & hosts" },
  { id: "designer", label: "Designer" },
  { id: "Club", label: "Club" },
  { id: "Location", label: "Location" },
  { id: "Event", label: "Event" },
  { id: "Music", label: "Music" },
  { id: "Screen", label: "Film & TV" },
  { id: "colour", label: "Colour mood" },
];

export type Option = { id: string; label: string; count: number };

const hsl = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s, l };
};
export const COLOUR_MOODS: { id: string; label: string; test: (hex: string) => boolean }[] = [
  { id: "noir", label: "Noir (black & charcoal)", test: (x) => hsl(x).l < 0.16 },
  { id: "hot-pink", label: "Hot pink & fuchsia", test: (x) => { const c = hsl(x); return c.s > 0.35 && c.l > 0.25 && c.h >= 290 && c.h < 345; } },
  { id: "red", label: "Red alert", test: (x) => { const c = hsl(x); return c.s > 0.4 && c.l > 0.15 && c.l < 0.7 && (c.h >= 345 || c.h < 15); } },
  { id: "gold", label: "Gold, amber & brass", test: (x) => { const c = hsl(x); return c.s > 0.3 && c.l > 0.25 && c.l < 0.75 && c.h >= 30 && c.h < 55; } },
  { id: "neon", label: "Day-glo neon", test: (x) => { const c = hsl(x); return c.s > 0.75 && c.l > 0.45 && c.l < 0.75; } },
  { id: "blue", label: "Electric blues", test: (x) => { const c = hsl(x); return c.s > 0.3 && c.l > 0.15 && c.h >= 190 && c.h < 260; } },
  { id: "green", label: "Greens & acid", test: (x) => { const c = hsl(x); return c.s > 0.3 && c.l > 0.15 && c.h >= 70 && c.h < 170; } },
  { id: "white", label: "Ice white & pearl", test: (x) => hsl(x).l > 0.85 },
  { id: "nude", label: "Nude, camel & skin", test: (x) => { const c = hsl(x); return c.s > 0.15 && c.s < 0.6 && c.l > 0.45 && c.l < 0.85 && c.h >= 15 && c.h < 45; } },
];

const CAT_OF: Record<string, Mode> = { Club: "Club", Location: "Location", Event: "Event", Music: "Music", Film: "Screen", TV: "Screen" };
const bySlug = new Map(entities.map((e) => [e.slug, e] as [string, Entity]));
const hostSlugs = new Set(["fenton-bailey", "randy-barbato", "james-st-james"]);

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
      if (e.category === "Person" && name.includes(" ") && last.length >= 5) alias.add(last);
      const house = name.replace(/^House of\s+/i, "");
      if (house !== name && house.length >= 6) alias.add(house);
      return { slug: e.slug, name, rx: new RegExp(`(?<![\\w-])(${[...alias].map(esc).join("|")})(?![\\w-])`) };
    });
})();

export function options(mode: Mode): Option[] {
  const count = new Map<string, number>();
  const add = (id: string) => count.set(id, (count.get(id) ?? 0) + 1);
  if (mode === "episode") PIECES.forEach((p) => add(p.episode));
  else if (mode === "colour") PIECES.forEach((p) => p.hex && COLOUR_MOODS.forEach((m) => m.test(p.hex!) && add(m.id)));
  else if (mode === "designer") PIECES.forEach((p) => DESIGNERS.forEach((d) => d.rx.test(p.text) && add(d.slug)));
  else if (mode === "people")
    PIECES.forEach((p) => p.tags.forEach((t) => { const e = bySlug.get(t); if (e && (e.guest || hostSlugs.has(t))) add(t); }));
  else if (mode !== "all") PIECES.forEach((p) => p.tags.forEach((t) => CAT_OF[bySlug.get(t)?.category ?? ""] === mode && add(t)));
  const label = (id: string) =>
    mode === "episode"
      ? (() => { const e = episodes.find((x) => x.id === id)!; return `S${String(e.season).padStart(2, "0")}E${String(e.episode).padStart(2, "0")} · ${e.guest}`; })()
      : mode === "colour"
        ? COLOUR_MOODS.find((m) => m.id === id)!.label
        : mode === "designer"
          ? DESIGNERS.find((d) => d.slug === id)!.name
        : (bySlug.get(id)?.name ?? id).replace(/\s*\((?!S\d\dE\d\d)[^)]*\)/g, "");
  return [...count.entries()]
    .filter(([, n]) => n >= (mode === "designer" ? 1 : 3))
    .map(([id, n]) => ({ id, label: label(id), count: n }))
    .sort((a, b) => (mode === "episode" ? a.id.localeCompare(b.id) : b.count - a.count || a.label.localeCompare(b.label)));
}

export function piecesFor(mode: Mode, id: string): Piece[] {
  if (mode === "all" || !id) return PIECES;
  if (mode === "episode") return PIECES.filter((p) => p.episode === id);
  if (mode === "designer") {
    const d = DESIGNERS.find((x) => x.slug === id);
    return d ? PIECES.filter((p) => d.rx.test(p.text)) : PIECES;
  }
  if (mode === "colour") {
    const m = COLOUR_MOODS.find((c) => c.id === id);
    return m ? PIECES.filter((p) => p.hex && m.test(p.hex)) : PIECES;
  }
  return PIECES.filter((p) => p.tags.includes(id));
}

/** A cheeky verdict on the outfit, from how its colours get on. */
export function verdict(chosen: Piece[]): { match: boolean; line: string } {
  const cols = chosen.flatMap((p) => (p.hex ? [hsl(p.hex)] : []));
  const loud = cols.filter((c) => c.s > 0.45 && c.l > 0.2 && c.l < 0.85);
  const hues = loud.map((c) => c.h);
  const spread = hues.length < 2 ? 0 : Math.max(...hues.map((a) => Math.min(...hues.filter((b) => b !== a).map((b) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b))))));
  const eps = new Set(chosen.map((p) => p.episode)).size;
  const dark = cols.filter((c) => c.l < 0.18).length;
  if (dark >= 3) return { match: true, line: "All black everything. The Mudd Club door would wave you straight in." };
  if (loud.length >= 4) return { match: true, line: "Maximum volume! Pure Club Kid - straight into tomorrow's gossip column." };
  if (loud.length >= 2 && spread > 100) return { match: false, line: "Mis-match! Those colours are having a fight. Shuffle the loud one." };
  if (eps >= 4) return { match: true, line: "A whole-show mash-up - four episodes, one fabulous outfit." };
  if (loud.length <= 1) return { match: true, line: "Chic and quiet - uptown at the door, downtown by 2am." };
  return { match: true, line: "Match! Queen of the Night material." };
}
