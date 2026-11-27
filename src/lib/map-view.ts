import type { PlaceMap, PlaceNear } from "@/lib/place-view";

/** The map on club, event and living-people pages (Lisa, 27 Nov 2026, "Which page gets what": option B "Around the
 *  block" on clubs and events, the numbered map on living-people pages). Worked out on the server
 *  (src/lib/map-view.server.ts). Types only. */

/** One episode line about a place: the episode link, the ▶ time code and what was said. */
export type MapLine = {
  episode: string;
  short: string;
  guest: string;
  time: string;
  context: string;
};

export type MapEvent = {
  slug: string;
  name: string;
  at?: string | undefined;
  metres?: number | undefined;
  line?: MapLine | undefined;
};

/** "Around the block": the drawn map band with the club (or the event's venue) in the middle. */
export type MapBand = {
  kind: "club" | "event";
  /** The pin's own card: the club, or the club or place the event was held at. `slug` is null for a venue with no card. */
  pin: { slug: string | null; name: string; area: string; tip?: string | undefined };
  map: PlaceMap;
  near: PlaceNear[];
  /** Events held right here, and at the places around it. */
  here: MapEvent[];
  nextDoor: MapEvent[];
};

/** No pin and no guess (Bring us home, Lisa 22 Nov 2026): the yellow tape block instead of a map. */
export type MapHome = { kind: "club" | "event"; name: string; hint?: string | undefined };

/** One stop on a living person's map: numbered in the order of their rooms. `x`/`y` is where the number sits, `tx`/`ty`
 *  the pin itself (they differ when two stops share a door and the number is moved aside). */
export type MapStop = {
  n: number;
  slug: string;
  name: string;
  club: boolean;
  area: string;
  x: number;
  y: number;
  tx: number;
  ty: number;
  line?: MapLine | undefined;
};

/** The drawn New York map behind the numbered stops: Manhattan's grid turned straight, the rivers around it. */
export type CityMap = {
  w: number;
  h: number;
  /** Polygons (SVG points) of the water, and of Manhattan for the street grid. */
  water: string[];
  island: string;
  streets: number[];
  avenues: number[];
  scale: { px: number; label: string };
};

export type RoomsMap = {
  stops: MapStop[];
  map: CityMap | null;
  /** Rooms we can't pin yet. */
  home: { slug: string; name: string; hint?: string | undefined }[];
  /** Pinned rooms outside New York. */
  away: { slug: string; name: string; area: string }[];
};
