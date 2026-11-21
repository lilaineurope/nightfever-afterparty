// Plain data for a Hall of Fame family tree (src/components/mentor-tree.tsx) - worked out on the server or in
// src/lib/mentor-rank.ts, so the light card page can draw it without loading the A–Z.
import type { MentorKind } from "@/data/mentors";

export type MentorTreeData = {
  name: string;
  rank: number;
  of: number;
  score: number;
  help: number;
  voices: number;
  tree: number;
  kids: {
    name: string;
    kind: MentorKind;
    points: number;
    episode: string;
    code: string;
    time: string;
    line: string;
    /** who tells it on the show, when it isn't the mentor (that makes a voice) */
    told: string | null;
    grand: { name: string; kind: MentorKind; counted: boolean; episode: string; code: string; line: string }[];
  }[];
};

export const KIND_LABEL: Record<MentorKind, string> = { lifted: "Lifted", stood: "Stood by", door: "Opened a door" };

/** 16.5 -> "16½", 0.5 -> "½" */
export const points = (n: number) => (n % 1 ? `${Math.floor(n) || ""}½` : String(n));

/** /hall-of-fame-rules: the top 10 and how each score adds up, plus the worked example's tree. */
export type HallOfFameRulesView = {
  top: { name: string; score: number; help: number; voices: number; tree: number; people: number }[];
  example: MentorTreeData;
  of: number;
  links: import("@/lib/link-index").LinkData;
};

/** /hall-of-fame (Lisa, 21 Nov 2026): the top 10 first, then places 11-100 (src/lib/hall-of-fame.server.ts). */
export type HofMoment = { episodeId: string; code: string; guest: string; time: string; context: string };
export type HallOfFameView = {
  top: {
    rank: number; name: string; slug: string; score: number; voices: number; helped: string[]; mentions: number;
    /** Square portrait (the guest's polaroid photo or the person portrait), if there is one. */
    pic: string | null;
    guest: boolean;
    link: string | undefined;
    /** Every help moment, for the box that opens under the card. */
    moments: HofMoment[];
  }[];
  rest: { rank: number; name: string; slug: string; episodes: number; mentions: number; guest: boolean }[];
  of: number;
  links: import("@/lib/link-index").LinkData;
};

/** One name's moments, fetched when its box opens (places 11-100). */
export type HofMomentsView = { moments: HofMoment[]; mentions: number; link: string | undefined; links: import("@/lib/link-index").LinkData };
