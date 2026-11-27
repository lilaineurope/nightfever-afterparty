// Watch it in full (Lisa, 24 Nov 2026: "check if any moving images are available in full and okay rights wise to share").
// Only two kinds count: a whole film, episode or video put up by the people who own it (the channel checked, 24 Nov 2026),
// or a film that is public domain in the USA AND in Sweden/the EU, from Wikimedia Commons (free files only).
// Left out on purpose: fan uploads (Archive.org copies of All About Eve, Sunset Boulevard, Valley of the Dolls...), films
// free only in the USA (Morocco 1930, some Beverly Hillbillies episodes), parts and segments, and uploads whose owner we
// can't tie to the work (the Tom Rubnitz shorts, Made for TV). Keyed by A–Z slug.

export type FullWatch =
  | { kind: "youtube"; id: string; title: string; channel: string; minutes?: number | undefined; what: string }
  | { kind: "file"; src: string; title: string; source: string; minutes: number; what: string };

const COMMONS = "https://commons.wikimedia.org/wiki/Special:FilePath/";

export const FULL_WATCH: Record<string, FullWatch> = {
  "orphans-of-the-storm": {
    kind: "file",
    src: `${COMMONS}${encodeURIComponent("Orphans of the Storm (1921).webm")}`,
    title: "Orphans of the Storm (1921)",
    source: "Public domain - Wikimedia Commons",
    minutes: 150,
    what: "The whole film",
  },
  "creative-vandal": { kind: "youtube", id: "ysToqInTSQ8", title: "Creative Vandal - the full documentary", channel: "DOGMA85, the filmmakers", minutes: 61, what: "The whole film" },
  "vogue-music-video": { kind: "youtube", id: "GuJQSAiODqI", title: "Madonna - Vogue (Official Video)", channel: "Madonna", minutes: 5, what: "The whole video" },
  "madonna-secret-music-video": { kind: "youtube", id: "EPHUZenprKc", title: "Madonna - Secret (Official Video)", channel: "Madonna", minutes: 5, what: "The whole video" },
  peeew: { kind: "youtube", id: "_Y6LjAOfpa8", title: "Peeew! #489: Michael Alig and Ernie Glam Go Nightclubbing", channel: "Peeew!", minutes: 12, what: "A whole episode" },
  "behind-the-velvet-ropes": { kind: "youtube", id: "E-kpLLjqVZk", title: "Behind the Velvet Ropes, episode 9", channel: "Lauren Ezersky", minutes: 29, what: "A whole episode" },
  "man-parrish-stories": { kind: "youtube", id: "hiueGgN2ykQ", title: "Studio 54: Beyond the Velvet Ropes", channel: "Man Parrish Stories", minutes: 29, what: "A whole episode" },
  transformations: { kind: "youtube", id: "ErqQi4thSIk", title: "James St. James and Domonique Echeverria: Transformations in New York", channel: "WOW Presents", minutes: 13, what: "A whole episode" },
  "gay-usa": { kind: "youtube", id: "q9J3NCCbFew", title: "Gay USA Live, 4 February 2026", channel: "MNN NYC", minutes: 60, what: "A whole episode" },
  "family-feud": { kind: "youtube", id: "YVYIOtYmxTI", title: "Family Feud, 15 May 1981", channel: "BUZZR (Fremantle)", minutes: 23, what: "A whole episode" },
};
