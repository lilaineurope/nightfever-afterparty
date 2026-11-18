// "Already interviewed" (Lisa, 18 Nov 2026): a name on "Who to interview next" that has already been a Night Fever guest
// is labelled, with a link to their AFTERPARTY page - or to the episode on WOW Presents Plus while it has no AFTERPARTY
// yet. Worked out from the guest list (every Night Fever guest, Seasons 1-6: guests.ts + guests-more.ts) and the
// AFTERPARTY list (episodes.ts), so it updates itself when a new episode is built. Server only (the guest list is big).
import { guests } from "@/data/guests";
import { episodeIdOf, episodes, stageName } from "@/data/episodes";
import { nameKey } from "@/data/interview-next";

export type Interviewed = {
  episodeId: string;
  /** "S4E6" */
  code: string;
  /** Who the episode is with, as the guest list names it */
  guest: string;
  href: string;
  /** true: href is the site's own AFTERPARTY page; false: the episode on WOW Presents Plus */
  afterparty: boolean;
};

/** Every way a guest's name can be written: the full name, each half of a duo ("Chi Chi Valenti & Johnny Dynell"),
 *  both sides of an "aka", and the stage name. */
export function nameVariants(name: string): string[] {
  const out = new Set<string>([name, stageName(name)]);
  for (const v of [...out]) {
    for (const half of v.split(/\s+&\s+|\s+and\s+/)) out.add(half);
    for (const side of v.split(/\s+aka\s+/i)) out.add(side);
  }
  out.add(name.replace(/^Mr\.?\s+/i, ""));
  return [...out].map(nameKey).filter((k) => k.length > 2);
}

type GuestEp = { id: string; guest: string; watchUrl: string };

const guestEpisodes: GuestEp[] = [
  ...episodes.map((e) => ({ id: e.id, guest: e.guest, watchUrl: e.watchUrl })),
  ...guests.map((g) => ({ id: episodeIdOf(g.episode), guest: g.name, watchUrl: g.episodeUrl })),
].filter((g) => g.id);

const index = new Map<string, GuestEp>();
for (const g of guestEpisodes) for (const k of nameVariants(g.guest)) if (!index.has(k)) index.set(k, g);

const code = (id: string) => `S${Number(id.slice(1, 3))}E${Number(id.slice(4, 6))}${id.slice(6).toUpperCase()}`;

/** The episode a name was already interviewed in, or undefined for a new face. A duo counts only when both are guests. */
export function interviewedOn(name: string): Interviewed | undefined {
  const whole = index.get(nameKey(name)) ?? index.get(nameKey(stageName(name)));
  const halves = name.split(/\s+&\s+/).map((h) => index.get(nameKey(h)));
  const hit = whole ?? (halves.length > 1 && halves.every(Boolean) ? halves[0] : undefined);
  if (!hit) return undefined;
  const built = episodes.find((e) => e.id === hit.id);
  return {
    episodeId: hit.id,
    code: code(hit.id),
    guest: built?.guest ?? hit.guest,
    href: built ? `/episodes/${built.id}` : hit.watchUrl,
    afterparty: !!built,
  };
}
