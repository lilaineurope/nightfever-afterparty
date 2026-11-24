// Fashion & outfits (Lisa, 24 Nov 2026: "a fashion & outfits category for library - as a pre-step before we re-launch
// wardrobe"). A Library category of its own, next to the Publications: every look the hosts and guests wear on camera,
// every outfit told in the stories, the designers and labels, and the shops they were bought in.
//
// Built from the episode indexes (entities.ts), so a new Afterparty fills it by itself:
// - On camera: each Mood row timed "On camera" (the hosts' and the guest's looks on the episode's mood board).
// - Looks & outfits: every other Mood row that is something worn (closet.ts finds a garment in it, or the name says look,
//   outfit, costume, drag, hair, make-up...). WORN / NOT_WORN below fix the few the rule gets wrong.
//   (fashion-words.ts holds the garment words, so the Library never has to build the Wardrobe's pieces.)
// - Designers & labels: closet.ts DESIGNERS (cards a note calls a designer, label or couture house) + LABELS below.
// - Shops & boutiques: cards a note calls a boutique, department store or vintage/thrift shop + SHOPS below.
//
// Wardrobe (/wardrobe, hidden until it relaunches) can reuse this: FASHION_LOOKS carries each look's colours, its pieces
// (garment words), whose look it is and the designers its story names; closet.ts PIECES splits the same looks into pieces.
import type { CollectionItem, Shelf } from "./collections";
import { afterpartyOf, entities, entityBySlug, entityFor, type Entity, type Ref } from "./entities";
import { episodeById } from "./episodes";
import { DESIGNERS, slotOf } from "./fashion-words";

export const FASHION_SHELVES: Shelf[] = [
  { key: "on-camera", label: "On camera" },
  { key: "looks", label: "Looks & outfits" },
  { key: "designers", label: "Designers & labels" },
  { key: "shops", label: "Shops & boutiques" },
  // Lisa, 24 Nov 2026 ("what about moods?"): the moods that aren't worn - rooms, décor, moments - so every mood is here once.
  { key: "rooms", label: "Rooms, décor & moments" },
];

export type FashionLook = {
  /** The look's colours (#hex), sampled from the story or the screenshots - the cover's fabric swatches. */
  palette: string[];
  /** What is worn, in words (the fashion note, or the look's name when that is all there is). */
  worn: string;
  /** Whose look it is, when known (a host, the guest, or someone the story names). */
  who?: { name: string; slug?: string | undefined } | undefined;
  /** The episode it is in, e.g. "s01e01", and its code "S01E01". */
  episode: string;
  code: string;
  /** The Wardrobe rails it dresses (head, top, bottom, feet, extra), from the garment words in it. */
  rails: string[];
  /** Designers and labels its story names (slugs on Designers & labels). */
  designers: { slug: string; name: string }[];
};

export type FashionItem = CollectionItem & {
  fashion: {
    kind: "look" | "designer" | "shop";
    /** The cover's tag: On camera, Look, Designer, Label or Shop. */
    tag: string;
    /** The fashion note in words (what is worn; what the designer or shop is). */
    note: string;
    look?: FashionLook | undefined;
    /** A guest with an AFTERPARTY: their polaroid is the cover. */
    polaroidEpisode?: string | undefined;
  };
};

export const isFashionItem = (it: CollectionItem): it is FashionItem => "fashion" in it;

// ---------- the rule-fixers (add a name here when the automatic rule gets one wrong) ----------

/** Mood rows the rule misses, but they are worn. */
const WORN = new Set([
  "James's Pippi Longstocking pigtails",
  "James's witchy-poo noses",
  "Michael Alig as the Silence of the Lambs moth",
  "Klaus Nomi's plastic raincoat and smoke bomb",
  "Larry LeGaspi's blue cocoon",
  "Kelly green club kid",
  "Miss Guy's paper fan-club jacket",
  "The defrocked-nun haircut",
  "Way Bandy's cat eye",
  "Jeremy Scott's Chernobyl collection",
  "Joey and Adrian wrapped in cellophane",
  "Walt the dragonfly on the Limelight stage",
  "Tap-dancing in goggles, snorkel and flippers",
  "Diamonds under her nose",
  "Pigtails and fake blood at 4am",
  "Michael's orange nose on Geraldo",
  "80s rigid tailoring vs 90s deconstruction",
  "The House of Donna Karan alien reveal",
  "Club Kids' lunchboxes",
]);
/** Mood rows the rule catches, but they are a room, a thing or a moment - not something worn. */
const NOT_WORN = new Set([
  "Palladium generator room",
  "Peace signs out the back window",
  "Quaaludes at Studio 54",
  "Raspberry Smash",
  "Liberace's white-piano party",
  "Le Déjeuner sur l'herbe",
  "The Bolt (Fragonard)",
  "Grace Jones Sound Factory poster",
  "Steve Mass's door rules",
  "Black key-ring keys",
  "Arms in the air for 'It's Raining Men'",
  "Elyssa's mother's 1950s movie musicals",
  "Ann Magnuson's accordion elevator",
  "Dancing on the lip of a volcano",
  "The limo driver's two fingers",
  "Turkish lamps from Istanbul",
  "Student desks and thrift-store couches",
  "Wren's Xeroxed face on the walls",
  "Fiorucci's windows",
  "Stephen Sprouse's window at Area",
  "Park's bunker decadence",
  "Pravda's Bauhaus-style night",
  "Field's cigarette at the ball",
  "Fashion show where Warhol first noticed James",
  "Paper fashion show at Limelight",
  "Houses dressed by designers at the Love Ball",
  "Hemlines rising above the knee",
  "Garment racks in the fashion closet",
  "Bathtubs full of clothes",
  "Palladium glass steps lit from below",
  "Interviewing McQueen in bed",
  "Headphones on in the fashion world",
  "Press kits all over the apartment",
  "Silk and stain-removal lessons at her mother's dry cleaner",
  "The Continental Baths: wicker, palms and black lacquer",
  "Rupert Everett on the Peninsula roof",
  "No candy canes in I Want Candy",
  "The middle-aged bald club",
]);
/** Cards closet.ts counts as designers that are not fashion (interiors, clubs, graphics, collectors). */
const NOT_DESIGNERS = new Set(["anne-bass", "colleen-weinstein", "shawn-hausman", "nick-egan"]);
/** Labels, houses, makers and brands no note calls a designer. */
const LABELS = [
  "Abercrombie & Fitch",
  "Andrew Logan",
  "Balenciaga",
  "Bernadette Corporation",
  "Charles Jourdan",
  "Gucci",
  "Maison Margiela",
  "Manic Panic",
  "Polo Jeans",
  "Stephen Jones",
  "Swatch",
  "Zuzii",
];
/** Shops the guests bought, sold, worked or window-shopped in. */
const SHOPS = [
  "Barneys New York",
  "Bergdorf Goodman",
  "Bloomingdale's",
  "Browns",
  "Charivari",
  "Diane B (SoHo shop)",
  "Fiorucci",
  "Henri Bendel",
  "Ibiza (boutique)",
  "If Boutique (SoHo)",
  "Jax",
  "Lee's Mardi Gras",
  "Macy's",
  "Parco",
  "Patricia Field gallery (ArtFashion)",
  "Patricia Field store, 8th Street",
  "Patricia Field store, Bowery",
  "Pop Shop",
  "Reade Street shoe warehouse",
  "Revenge (East Village shop)",
  "Saks Fifth Avenue",
  "Salvation Army",
  "Screaming Mimi's",
  "Sears",
  "Susan Bennis Warren Edwards",
  "The Pants Pub, Washington Place",
  "Thompson Street store",
  "Trash and Vaudeville",
  "Ultimo (Chicago)",
  "West Broadway store",
  "Worlds End",
];
const SHOP_NOTE = /\b(boutique|department store|vintage clothing|thrift)\b/i;

// ---------- building the shelf ----------

const codeOf = (id: string) => {
  const ep = episodeById(id);
  return `S${String(ep.season).padStart(2, "0")}E${String(ep.episode).padStart(2, "0")}${ep.part ?? ""}`;
};
const momentsOf = (refs: Ref[]): CollectionItem["moments"] =>
  refs
    .filter((r) => r.episode)
    .map((r) => {
      const ep = episodeById(r.episode as string);
      return { episodeId: ep.id, code: `S${ep.season}E${ep.episode}${ep.part ?? ""}`, guest: ep.guest, time: r.time, context: r.context };
    });
const baseOf = (e: Entity, shelf: string, refs: Ref[] = e.refs): CollectionItem => ({
  slug: e.slug,
  name: e.name,
  shelf,
  link: e.link ?? "",
  mentions: refs.reduce((n, r) => n + r.mentions, 0),
  moments: momentsOf(refs),
});
const noteOf = (e: Entity) => e.refs.map((r) => r.fashion).find((f) => f && !/^(See Mood|Worn or shown in the episode)/i.test(f)) ?? "";

const HOSTS: Record<string, string> = { James: "James St. James", Fenton: "Fenton Bailey", Randy: "Randy Barbato" };
const PEOPLE_BY_FIRST = new Map<string, string>();
for (const e of entities)
  if (e.category === "Person")
    for (const x of e.refs) {
      const k = `${x.episode}|${e.name.split(" ")[0]}`;
      if (!PEOPLE_BY_FIRST.has(k)) PEOPLE_BY_FIRST.set(k, e.name);
    }
/** "<First>'s ..." -> that host, or the episode's guest, or a person the episode names. */
function whoseLook(r: Ref): FashionLook["who"] {
  const m = /^(?:Young )?([A-Z][\w.-]+(?: [A-Z][\w.-]+)?)'s\b/.exec(r.name);
  if (!m) return undefined;
  const first = m[1]!.split(" ")[0]!;
  const guest = r.episode ? episodeById(r.episode).guest : "";
  const name =
    HOSTS[first] ??
    (guest.split(/[ &]+/).includes(first) ? guest : undefined) ??
    PEOPLE_BY_FIRST.get(`${r.episode}|${first}`);
  return name ? { name, slug: entityFor(name)?.slug } : undefined;
}

/** The rails a look dresses: garment words in its name, what was heard, its fashion note and its colour names. */
function railsOf(e: Entity): string[] {
  const out = new Set<string>();
  for (const r of e.refs as (Ref & { colours?: string[] })[])
    for (const bit of [r.name, r.heard, r.fashion ?? "", ...(r.colours ?? []).map((c) => c.replace(/#\w+$/, ""))]
      .flatMap((t) => t.split(/\s*(?:,|;|\/| and | with )\s*/)))
      if (!/^(Worn or shown in the episode)$/i.test(bit)) {
        const s = slotOf(bit);
        if (s) out.add(s.slot);
      }
  return [...out];
}

const LOOK_WORDS = /\b(looks?|outfits?|costumes?|dress(ed|es)?|drag|gowns?|wear|wore|worn|clothes|headpiece|uniform|hair|make-?up|wigs?|couture|chic|glam(our)?)\b/i;
const isWorn = (e: Entity) =>
  WORN.has(e.name) || (!NOT_WORN.has(e.name) && (railsOf(e).length > 0 || LOOK_WORDS.test(`${e.name} ${e.refs.map((r) => r.fashion ?? "").join(" ")}`)));

// A colour sampled from the room behind them (the wallpaper, the bookshelf, the mic) is not part of the look.
const ROOM = /\b(curtains?|walls?|wallpaper|sunflowers?|wood|posters?|bookshel(f|ves)|books?|shel(f|ves)|library|spines?|mic|microphone|lamps?|glow|office|chairs?|panels?|sofa|couch|backdrop|painting|mural|sky|pillows?|orchids?|cabinet|window|floor|plants?|leaf|door|room|desk|rug|carpet|tiles?|brick|neon sign|screen|figure)\b/i;
const hexesOf = (r: Ref & { colours?: string[] }) => {
  const all = (r.colours ?? []).flatMap((c) => {
    const m = /^(.*?)\s*(#[0-9a-fA-F]{6})$/.exec(c);
    return m ? [{ name: m[1]!, hex: m[2]! }] : [];
  });
  const worn = all.filter((c) => !ROOM.test(c.name));
  return (worn.length ? worn : all).map((c) => c.hex);
};

const designersIn = (text: string) =>
  DESIGNERS.filter((d) => !NOT_DESIGNERS.has(d.slug) && d.rx.test(text)).map((d) => ({ slug: d.slug, name: d.name }));

const guestWho = (id: string): FashionLook["who"] => {
  const name = episodeById(id).guest;
  return { name, slug: entityFor(name)?.slug };
};

function lookItem(e: Entity, shelf: "on-camera" | "looks" | "rooms"): FashionItem {
  const r = e.refs[0] as Ref & { colours?: string[] };
  const worn = (r.fashion && !/^Worn or shown in the episode$/i.test(r.fashion) ? r.fashion : r.heard && r.heard !== "—" ? r.heard : e.name).trim();
  const look: FashionLook = {
    palette: [...new Set(e.refs.flatMap(hexesOf))].slice(0, 6),
    worn,
    // On camera it is a host or the episode's guest ("Billy" is William Norwich, "Walt" is Waltpaper).
    who: whoseLook(r) ?? (shelf === "on-camera" ? guestWho(r.episode!) : undefined),
    episode: r.episode!,
    code: codeOf(r.episode!),
    rails: railsOf(e),
    designers: [],
  };
  // The designers a look's story names - not the wearer themselves (Patricia's own look isn't "by Patricia Field").
  look.designers = designersIn(`${e.name} ${r.heard} ${r.context} ${r.fashion ?? ""}`).filter((d) => d.slug !== look.who?.slug);
  return { ...baseOf(e, shelf), fashion: { kind: "look", tag: shelf === "on-camera" ? "On camera" : shelf === "rooms" ? "Mood" : "Look", note: worn, look } };
}

const byMentions = (a: CollectionItem, b: CollectionItem) => b.mentions - a.mentions || a.name.localeCompare(b.name);
const epOrder = (a: FashionItem, b: FashionItem) => (a.fashion.look!.code < b.fashion.look!.code ? -1 : a.fashion.look!.code > b.fashion.look!.code ? 1 : a.name.localeCompare(b.name));

const moods = entities.filter((e) => e.category === "Mood");
const onCamera = moods.filter((e) => e.refs.some((r) => r.time === "On camera"));
const inStories = moods.filter((e) => !e.refs.some((r) => r.time === "On camera") && isWorn(e));

/** Every look and outfit, on camera and in the stories - for the Wardrobe to dress from. */
export const FASHION_LOOKS: FashionItem[] = [
  ...onCamera.map((e) => lookItem(e, "on-camera")).sort(epOrder),
  ...inStories.map((e) => lookItem(e, "looks")).sort(byMentions),
];

const withPolaroid = (e: Entity) => afterpartyOf(e);

export const FASHION_DESIGNERS: FashionItem[] = (() => {
  const seen = new Set<string>();
  const shops = new Set(SHOPS);
  const out: FashionItem[] = [];
  const add = (e: Entity | undefined) => {
    if (!e || seen.has(e.slug) || shops.has(e.name) || NOT_DESIGNERS.has(e.slug)) return;
    seen.add(e.slug);
    out.push({ ...baseOf(e, "designers"), fashion: { kind: "designer", tag: e.category === "Person" ? "Designer" : "Label", note: noteOf(e), polaroidEpisode: withPolaroid(e) } });
  };
  for (const d of DESIGNERS) add(entityBySlug[d.slug]);
  for (const n of LABELS) add(entityFor(n));
  return out.sort(byMentions);
})();

export const FASHION_SHOPS: FashionItem[] = (() => {
  const named = SHOPS.map((n) => entityFor(n)).filter((e): e is Entity => !!e);
  const auto = entities.filter((e) => (e.category === "Location" || e.category === "Organisation") && e.refs.some((r) => SHOP_NOTE.test(r.fashion ?? "")));
  const seen = new Set<string>();
  return [...named, ...auto]
    .filter((e) => !seen.has(e.slug) && seen.add(e.slug))
    .map((e): FashionItem => ({ ...baseOf(e, "shops"), fashion: { kind: "shop", tag: "Shop", note: noteOf(e), polaroidEpisode: withPolaroid(e) } }))
    .sort(byMentions);
})();

/** The Fashion & outfits shelf of the Library, shelf by shelf. */
/** The moods that aren't worn: rooms, décor, objects and moments (Club USA's giant slide, Dalí's pool of dead lobsters). */
export const FASHION_MOODS: FashionItem[] = moods.filter((e) => !e.refs.some((r) => r.time === "On camera") && !isWorn(e)).map((e) => lookItem(e, "rooms")).sort(byMentions);

export const fashionShelf: FashionItem[] = [...FASHION_LOOKS, ...FASHION_DESIGNERS, ...FASHION_SHOPS, ...FASHION_MOODS];
