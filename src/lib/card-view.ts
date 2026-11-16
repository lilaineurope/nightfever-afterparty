import type { Ref } from "@/data/entities";
import type { SceneEvent } from "@/data/scene";
import type { Memoriam } from "@/data/memoriam";
import type { ClubProfile } from "@/data/club-profiles";
import type { ClubNight } from "@/data/club-nights";
import type { PersonPortrait } from "@/data/person-portraits";
import type { LinkData } from "@/lib/link-index";

/** Everything an A–Z card page shows, worked out on the server for one card (src/lib/card-view.server.ts), so the page
 *  doesn't download the whole A–Z (page weight, 16 Nov 2026). Types only - this file loads nothing. */
export type CardView = {
  slug: string;
  name: string;
  category: string;
  link?: string | undefined;
  /** The guest's slug (src/data/guests.ts, already on every page) when the card is a Night Fever guest. */
  guest: string | null;
  refs: Ref[];
  events: SceneEvent[];
  /** "Also named on these cards" */
  named: { slug: string; name: string; episode?: string | undefined; short?: string | undefined }[];
  inGuestStories: { slug: string; name: string }[];
  /** "In the same rooms" */
  related: { slug: string; name: string }[];
  /** The card's own Jukebox entry (songs, artists, stage bands get a player). */
  music: { name: string; shelf: string; spotify?: string | undefined } | null;
  night: ClubNight | null;
  mem: Memoriam | null;
  club: ClubProfile | null;
  pic: PersonPortrait | null;
  /** Every name -> card answer the page needs for its links. */
  links: LinkData;
};
