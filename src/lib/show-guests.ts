import { guests } from "@/data/guests";

const showGuestNames = new Set(guests.map((g) => g.name.toLowerCase()));

/**
 * True when a reference is another Night Fever guest - someone who has been a guest on the show
 * (every name on the Guests page) - but not the guest(s) of the episode it appears in.
 * Feeds the "Night Fever" filter chip on every episode page.
 */
export function isOtherShowGuest(name: string, episodeGuest: string): boolean {
  const n = name.toLowerCase();
  if (!showGuestNames.has(n)) return false;
  const own = episodeGuest.toLowerCase();
  return n !== own && !own.split(/\s*&\s*/).includes(n);
}
