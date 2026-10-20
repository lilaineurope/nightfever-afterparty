# Afterparty Network

An interactive connection graph. **Stars** are your shows, nights, events or episodes; **dots** are the names that turn up in them - people, places, records, looks. A name that turns up in more than one star sits between them and ties them together.

Originally built for a nightlife podcast fan page; this package is the engine and the React component on their own, with no data inside. Bring your own.

- Category filter chips with live counts
- Search with suggestions
- Zoom (buttons and wheel), pan, drag a dot to play with it
- Tap a star or dot to light up its links and show an "Open" link over the graph; tap again (or ctrl/cmd-click, or Enter on a focused star) to open it
- A panel listing everything linked to the selected star or dot
- Rankings: **Great Connectors** (names in the most stars) and **Most popular** per category - each row shows just two numbers, connections and mentions
- Themeable with CSS variables; no Tailwind or build plugin needed

## Install

This is licensed software. When you buy it you receive a license key and the download `afterparty-network-1.0.0.zip` (both arrive by email from Creem, the shop's payment provider). Keep the key - it is your proof of licence.

Unzip it into your project, for example into `vendor/afterparty-network`, then:

```bash
npm install ./vendor/afterparty-network
```

Requires React 18+ for the component. The engine has one dependency, `d3-force`. The package ships TypeScript sources, so use a bundler that compiles TypeScript (Vite, Next.js, esbuild...).

## Your data

```ts
import type { Hub, Item } from "afterparty-network";

const hubs: Hub[] = [
  { id: "n1", label: "Night 1 · Neon Harbour", href: "/nights/1" },
  { id: "n2", label: "Night 2 · Velvet Echo", href: "/nights/2" },
];

const items: Item[] = [
  { id: "mira", label: "Mira Quell", href: "/names/mira", categories: ["Person"], mentions: 41, hubIds: ["n1", "n2"] },
  { id: "lantern", label: "The Lantern Room", categories: ["Club"], mentions: 28, hubIds: ["n1"] },
];
```

- `hubIds` that don't match a hub are ignored; an item with no known hub is left out.
- `mentions` is optional (0) and only used to break ties and for the "Most popular" ranking.
- `href` is optional; it is where a star or dot opens unless you pass `onOpen`.

A full invented example (6 nights, 60 names) is in `examples/sample-data.ts`.

## Quick start - React

```tsx
import { NetworkGraph, TopList } from "afterparty-network/react";
import { greatConnectors, mostPopular } from "afterparty-network";
import "afterparty-network/styles.css";

export function NetworkPage() {
  return (
    <>
      <NetworkGraph
        hubs={hubs}
        items={items}
        onOpen={(node) => router.push(node.href ?? "/")}   // optional - default follows href
      />
      <TopList title="Great Connectors" rows={greatConnectors(hubs, items)} />
      <TopList title="Most popular clubs" rows={mostPopular(hubs, items, "Club")} />
    </>
  );
}
```

`NetworkGraph` props: `hubs`, `items`, `categories?` (chip order; default = by size), `onOpen?`, `labels?` (every text, for translation), `seed?` (repeatable layout), `className?`.

The graph uses the browser (pointer events, `getBoundingClientRect`), so in server-rendered apps render it on the client only (e.g. Next.js `dynamic(..., { ssr: false })`) or let it hydrate.

## Quick start - engine only

```ts
import { buildGraph, layoutGraph, categoryCounts, greatConnectors, mostPopular, searchNodes, seededRandom } from "afterparty-network";

const graph = buildGraph(hubs, items, { category: "Person" }); // nodes, edges, neighbours
layoutGraph(graph, { width: 1200, height: 800, ticks: 300, random: seededRandom(1) }); // fills node x/y
categoryCounts(hubs, items);         // { All: 60, Person: 20, Club: 7, ... }
greatConnectors(hubs, items, 10);    // [{ item, connections, mentions }, ...]
mostPopular(hubs, items, "Club", 10);
searchNodes(graph, "lantern");
```

Layout forces: links (distance 90, strength 0.4), stars push each other apart (-900), dots gently (-60), centring, and collision by size.

## Theming

Override any variable on `.apn` (the graph) or `.apn-top` (the ranking):

```css
.apn, .apn-top {
  --apn-bg: #0d1030;         /* stage */
  --apn-card: #151a42;
  --apn-text: #f6ead2;
  --apn-star: #ec4899;       /* stars */
  --apn-dot: #e8c468;        /* names in one star */
  --apn-dot-shared: #f6ead2; /* names in several stars */
  --apn-accent: #ec4899;     /* highlights and links */
  --apn-font: "Your Font", sans-serif;
}
```

## Tests

```bash
npm install
npm run typecheck
npm test
```

## Licence

Commercial licence - see [LICENSE](LICENSE). One license key covers one project (one website or app). The key is delivered by Creem when you buy. You may change the code for your project; you may not share, resell or publish the source.

Third-party: [d3-force](https://github.com/d3/d3-force) (ISC licence) is installed as a dependency, not bundled in this package.
