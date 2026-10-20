# Afterparty Wardrobe

A dress-up outfit generator. Describe your looks in plain words, and the Wardrobe splits them into single pieces, hangs
them on five rails (hair & hats, tops & dresses, skirts & pants, shoes, extras) in their own colours, and dresses a
figure from them. Visitors pick what dresses them ("Dress me for…" an event, a person, a designer, a colour mood or any
tag you give your looks), keep the pieces they love, shuffle the rest, and get a cheeky verdict on how the colours get on.

It comes in two parts:

- **Engine** (`afterparty-wardrobe`) – pure TypeScript, no dependencies, runs anywhere (browser, Node, workers).
- **React component** (`afterparty-wardrobe/react`) – the full Wardrobe in the *Afterparty Style* skin (navy, hot pink,
  gold), with its own CSS, so it drops into any React 18+ app. No Tailwind or bundler plugins needed.

## Install

This is licensed software. When you buy it you receive a license key and the download `afterparty-wardrobe-1.0.0.zip` (both arrive by email from Creem, the shop's payment provider). Keep the key - it is your proof of licence.

Unzip it into your project, for example into `vendor/afterparty-wardrobe`, then:

```bash
npm install ./vendor/afterparty-wardrobe
```

The package builds itself on install (`prepare` runs `tsc`). Requires Node 18+; React 18+ only if you use the component.

## Quick start – React

```tsx
import { Wardrobe } from "afterparty-wardrobe/react";
import type { Look } from "afterparty-wardrobe";

const looks: Look[] = [
  {
    id: "l1",
    label: "Opening night disco queen",
    text: "sequinned silver mini dress, platform boots and a feather boa",
    colours: [{ name: "dress silver", hex: "#C0C0C8" }, { name: "boa pink", hex: "#E8337F" }],
    tags: { event: ["Opening night"], mood: ["Glam"] },
    source: { title: "Lookbook page 1", href: "/lookbook#1" },
  },
  // ...
];

export default function Page() {
  return <Wardrobe looks={looks} brand="My collection" />;
}
```

A complete set of invented sample looks is in [`examples/sample-looks.ts`](examples/sample-looks.ts).

### Component props

| Prop | What it does |
| --- | --- |
| `looks` | Your looks (required). |
| `config` | Engine configuration (see below). |
| `title`, `intro`, `brand` | Heading, line under it, small line under the wardrobe. `null` hides title/intro. |
| `filters` | The "Dress me for…" chips as `{ dimension, label }[]`. Default: Surprise me, every tag dimension, Designer (when designers are configured), Colour mood. |
| `dimensionLabels` | Nicer names for tag dimensions in the default chips, e.g. `{ event: "Party" }`. |
| `seed` | Fixed seed for repeatable outfits (screenshots, tests). |
| `renderSource` | Replace the source line under each piece. |
| `injectStyles` | `false` if you load `WARDROBE_CSS` yourself. |
| `className`, `style` | On the outer element. |

### Restyling

Every colour is a CSS variable on `.apw-root`:

```css
.apw-root {
  --apw-bg: #0b0e26; --apw-card: #141838; --apw-screen: #0b0e26;
  --apw-pink: #e8337f; --apw-pink-ink: #fff; --apw-gold: #f2d58a;
  --apw-cream: #f7efe0; --apw-muted: #a3a7c7; --apw-border: rgba(242,213,138,.35);
  --apw-font: system-ui, sans-serif; --apw-radius: 20px;
}
```

## Quick start – engine only

```ts
import { createWardrobe, seededRandom } from "afterparty-wardrobe";

const w = createWardrobe(looks, { designers: [{ id: "aurelle", name: "House of Aurelle" }] });

w.pieces;                                   // every piece, with slot, colour, look and tags
w.options("event");                         // [{ id: "Opening night", label: "Opening night", count: 12 }, ...]
const rails = w.rails({ dimension: "event", id: "Opening night" });
const outfit = w.dress(rails, undefined, { top: true }, seededRandom(42)); // keep the top, shuffle the rest
const chosen = w.chosen(rails, outfit);
w.verdict(w.worn(chosen));                  // { match: true, line: "Match! Queen of the night material." }
```

## The data format

```ts
type Look = {
  id: string;
  label: string;                         // short name of the look
  text: string;                          // free description: "velvet coat over a satin slip, pearls and patent heels"
  colours?: { name: string; hex: string }[]; // "velvet coat purple #5B2A86" becomes its own piece in that colour
  tags?: Record<string, string[]>;       // anything to filter by: event, person, designer, mood, place...
  wearer?: string;
  source?: { title: string; href?: string; time?: string };
};
```

How pieces are found:

1. **Colours named after a garment** become pieces in that colour, said the natural way round
   (`"wig platinum"` → *Platinum wig*, `"velvet coat purple"` → *Purple velvet coat*).
2. **The description** is split at commas, slashes, *and*, *with*, *over*, *under*, *plus*; every part that names a
   garment (or just a fabric, worn as a top) becomes a piece. The label is read too when it names a garment.
3. Things that are not worn (stage, poster, wallpaper…) and words that only mention clothes (designer, shop, award…)
   are left out. Dresses, gowns, catsuits and suits cover the bottom rail.
4. A rail with nothing for the chosen filter borrows from the whole wardrobe, and says so.

## Configuration

```ts
createWardrobe(looks, {
  keywords: { full: [...DEFAULT_KEYWORDS.full, "kaftans?"] }, // regex fragments, whole words; a list replaces that default list
  designers: [
    { id: "aurelle", name: "House of Aurelle" },              // matches "House of Aurelle" and "Aurelle"
    { id: "quince", name: "Marlo Quince", kind: "person" },   // also matches the surname "Quince"
  ],
  designerDimension: "designer",   // looks tagged { designer: ["Marlo Quince"] } match too
  colourMoods: DEFAULT_COLOUR_MOODS, // or your own { id, label, test(hex) }
  verdicts: { match: "Fabulous!" }, // replace any verdict line
  housePalette: ["#e8337f", "#c8a24b"], // colours for pieces whose look names none
  minOptionCount: 2,               // hide filter options with fewer pieces
  readLabel: true,
});
```

Keyword lists: `feet`, `bottom`, `full`, `top`, `head`, `extra`, `fabric`, `notWorn`, `notAPiece` (defaults in
`DEFAULT_KEYWORDS`, English).

## Development

```bash
npm install
npm run typecheck
npm test        # node:test via tsx
npm run build   # dist/
```

## License

Commercial software – see [LICENSE](LICENSE). One license key = one project or website. Your license key is delivered by
Creem when you buy; keep it as your proof of purchase. Redistributing, reselling or sublicensing the source is not allowed.
