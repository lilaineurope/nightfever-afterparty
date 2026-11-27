import type { Ref } from "@/data/entities";
import type { SceneEvent } from "@/data/scene";
import type { Memoriam } from "@/data/memoriam";
import type { ClubProfile } from "@/data/club-profiles";
import type { ClubNight } from "@/data/club-nights";

export type ClubPartsView = {
  groups: { heading: string; intro: Ref[]; parts: { title: string; refs: Ref[] }[] }[];
  looks: string[];
  /** Row names shown in the groups, so "In the episodes" leaves them out */
  names: string[];
};
import type { PersonPortrait } from "@/data/person-portraits";
import type { PersonProfile } from "@/data/person-profiles";
import type { DiaryPage } from "@/data/diaries";
import type { ColumnPage } from "@/data/column-articles";
import type { LinkData } from "@/lib/link-index";
import type { LibraryItemView, StoryView } from "@/lib/library-item";
import type { PlaceView } from "@/lib/place-view";
import type { MapBand, MapHome, RoomsMap } from "@/lib/map-view";
import type { PersonWork } from "@/lib/works";

/** Everything an A–Z card page shows, worked out on the server for one card (src/lib/card-view.server.ts), so the page
 *  doesn't download the whole A–Z (page weight, 16 Nov 2026). Types only - this file loads nothing. */
import type { MentorTreeData } from "@/lib/mentor-tree";

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
  /** Club, In memoriam, person and diary pages whose story names this card (two-way story links, Lisa 27 Nov 2026). */
  onPages: { slug: string; name: string; kind: string }[];
  /** Pictures for the names in the story box (rooms, lifted up, stage, also): name -> polaroid or cover. */
  faces: Record<string, { src: string; framed?: boolean }>;
  /** "In the same rooms" */
  related: { slug: string; name: string }[];
  /** The card's own Jukebox entry (songs, artists, stage bands get a player). */
  music: { name: string; shelf: string; spotify?: string | undefined } | null;
  night: ClubNight | null;
  mem: Memoriam | null;
  club: ClubProfile | null;
  /** The club's theme nights and parties, folded in from their own cards (Lisa, 22 Nov 2026, src/data/club-parts.ts). */
  parts: ClubPartsView | null;
  pic: PersonPortrait | null;
  /** Person page (story, guest quotes, timeline) for living people the guests talk about - Lisa, 20 Nov 2026. */
  profile: PersonProfile | null;
  /** Diary page (Lisa, 21 Nov 2026): every moment the diary comes up, readings highlighted; polaroid = the keeper's. */
  diary: (DiaryPage & { polaroid?: string | undefined }) | null;
  /** Column page (Lisa, 21 Nov 2026): every piece that ran under the column, each linking to where it can be read. */
  column: ColumnPage | null;
  /** Hall of Fame family tree - top 10 mentors only (Lisa, 21 Nov 2026, src/lib/mentor-rank.ts). */
  tree: MentorTreeData | null;
  /** Library item page extras (books, magazines, newspapers, columns, diaries, films, TV - Lisa, 21 Nov 2026). */
  item: LibraryItemView | null;
  /** "The story" for a work that is not a Library item (a song, album, band or club a guest made). */
  story: StoryView | null;
  /** Place page extras: drawn map, pins around it, the guests who talk about it (Lisa, 22 Nov 2026). */
  place: PlaceView | null;
  /** "Around the block" on club and event pages, or the Bring us home block when there is no pin (Lisa, 27 Nov 2026). */
  mapBand: MapBand | null;
  mapHome: MapHome | null;
  /** A living person's rooms as numbered pins on a drawn New York (Lisa, 27 Nov 2026). */
  rooms: RoomsMap | null;
  /** "<first>'s work": what a person made, wrote, ran or starred in (Lisa, 22 Nov 2026, src/lib/works.ts). */
  works: PersonWork[];
  /** Rank among the top 100 great connectors (pink badge), or null. */
  connector: number | null;
  /** Every name -> card answer the page needs for its links. */
  links: LinkData;
};
