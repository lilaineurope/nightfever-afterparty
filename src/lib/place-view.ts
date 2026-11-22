/** Place pages (Lisa, 22 Nov 2026, mockup C: "header design of mockup b and then join page items of a and b" -
 *  "publish and apply to all place"): every Location card gets a drawn map header with its pin and the clubs and places
 *  around it, a strip of the guests who talk about it, their moments as taped boxes, "Around the corner" with walking
 *  distances and its Timeline moments. Worked out on the server (src/lib/place-view.server.ts). Types only. */

/** `label` is false when the name would sit on another pin's name - the dot stays, its name shows on hover. */
export type PlacePin = { x: number; y: number; slug: string; name: string; club: boolean; label: boolean };

export type PlaceMap = {
  /** viewBox size; the drawing is cropped to the header, the place sits right of the name card. */
  w: number;
  h: number;
  self: { x: number; y: number };
  pins: PlacePin[];
  /** Manhattan street grid (streets ~80 m, avenues ~260 m apart), drawn turned like the island; null outside New York. */
  grid: { street: number; avenue: number } | null;
  /** Scale bar: its length in viewBox units and what it stands for. */
  scale: { px: number; label: string } | null;
};

export type PlaceNear = { slug: string; name: string; club: boolean; metres: number };

export type PlaceWho = {
  episode: string;
  short: string;
  guest: string;
  polaroid?: string | undefined;
  time: string;
  context: string;
  mentions: number;
};

export type PlaceView = {
  /** The pin, for the page's Place markup (approximate, from the public address). */
  geo?: { lat: number; lng: number } | undefined;
  area?: string | undefined;
  tip?: string | undefined;
  map: PlaceMap | null;
  near: PlaceNear[];
  /** One entry per episode, most mentions first. */
  who: PlaceWho[];
  mentions: number;
};
