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
