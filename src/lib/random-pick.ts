// "Random night out" at the bottom of every page (Lisa, 27-28 Nov 2026): what the browser gets back for one night. The pool and
// the draw live on the server (src/lib/random-pick.server.ts), so the footer stays light.
export type RandomPick = {
  kind: "guest" | "person" | "club" | "library" | "film" | "song";
  /** The pink sticker on the polaroid: "Guest · S5E3", "Club", "Library · Books", "Song · Danceteria"... */
  tag: string;
  name: string;
  /** Always a page on this site (no outside links). */
  href: string;
  /** framed: the picture is already a whole polaroid card (person and club pages), so it isn't framed again. */
  pic?: { src: string; framed?: boolean } | undefined;
  line: string;
  /** The button text, when "Go there" doesn't fit ("Go to the AFTERPARTY", "Play it in the Jukebox"). */
  go?: string | undefined;
};

/** One random night out: who you meet, where you go, what the DJ plays and what you take home. */
export type RandomNight = {
  who: RandomPick;
  where: RandomPick;
  plays: RandomPick;
  home: RandomPick;
};
