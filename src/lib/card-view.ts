import type { Ref } from "@/data/entities";
import type { SceneEvent } from "@/data/scene";
import type { Memoriam } from "@/data/memoriam";
import type { ClubProfile } from "@/data/club-profiles";
import type { ClubNight } from "@/data/club-nights";

/** A club night, theme night or party's own page (Lisa, 27 Nov 2026, all 78): the club it belongs to, what was played,
 *  filmed and said there, and the club's other nights. */
export type NightPageView = {
  club: string;
  clubName: string;
  address: string;
  years: string;
  kind: string;
  title: string;
  /** Every moment of the night as a box with the guest's polaroid: their own words where we have them, otherwise what
   *  was said (Lisa, 27 Nov 2026: quote boxes instead of "In the episodes"). */
  said: SaidBox[];
  /** The club's poster and reading list, at the foot of the night's page. */
  lib: ClubLibraryView | null;
  songs: { title: string; artist: string; year: number; why: string }[];
  films: { id: string; title: string }[];
  playlist?: string | undefined;
  others: { slug: string; title: string; kind: string; design: CoverDesign }[];
};

export type ClubPartsView = {
  groups: { heading: string; intro: Ref[]; parts: { title: string; slug: string; refs: Ref[]; design: CoverDesign }[] }[];
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
import type { CoverDesign } from "@/lib/cover-design";

/** Everything an A–Z card page shows, worked out on the server for one card (src/lib/card-view.server.ts), so the page
 *  doesn't download the whole A–Z (page weight, 16 Nov 2026). Types only - this file loads nothing. */
import type { MentorTreeData } from "@/lib/mentor-tree";

/** "Who else was there" on a club page (Lisa, 27 Nov 2026, option W1 "the door list"): the guests who told us about it
 *  (their biggest moment), the regulars (people whose own page lists the club as a room), and who made or is on its posters.
 *  The stage stays in the story box. */
export type ClubCrowdView = {
  told: { episode: string; code: string; guest: string; time: string; context: string; mentions: number; pol?: string | undefined }[];
  regulars: string[];
  posters: { name: string; role: string }[];
};

/** "The poster + read about it" on a club page (Lisa, 27 Nov 2026, option L2): the club's own flyers and tickets from the
 *  Library's Cover art & posters, and the hand-checked books, diaries and papers a guest ties to it (src/data/club-reading.ts). */
export type ClubLibraryView = {
  posters: {
    page: string;
    src: string;
    alt?: string | undefined;
    piece: string;
    credit: string;
    w?: number | undefined;
    h?: number | undefined;
    forWhat?: string | undefined;
    date?: string | undefined;
    madeBy: { role: string; name: string }[];
    onIt: string[];
  }[];
  reads: { slug: string; name: string; kind: string; design: CoverDesign; episode: string; code: string; guest: string; time: string; context: string;
    /** A diary's whole entry about the club, as told on the show (Lisa, 28 Nov 2026: "show the whole diary entry"). */
    entry?: { time: string; title: string; lines: { who: string; text: string; read?: boolean }[] } | undefined }[];
};

/** One box on a "What the guests say" wall (club, event and night pages): a quote, or a mention with what was said. */
export type SaidBox = { episode: string; code: string; who: string; time: string; quote?: string | undefined; label?: string | undefined; context?: string | undefined; mentions?: number | undefined };

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
  /** This card is one of a club's nights or parties (Lisa, 27 Nov 2026). */
  nightPage: NightPageView | null;
  /** Club and event pages: every quote and mention as a box (Lisa, 28 Nov 2026), in place of "In the episodes". */
  wall: SaidBox[] | null;
  /** An event's Library box: what was talked about with it, then its club venue's poster and reading list. */
  eventLib: { own: ClubLibraryView | null; venue: { slug: string; name: string; lib: ClubLibraryView } | null } | null;
  /** "Who else was there" (club pages only). */
  crowd: ClubCrowdView | null;
  /** The club's poster and reading list (club pages only). */
  clubLib: ClubLibraryView | null;
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
  /** A maker's own tapes, each with its Moving Images page (Lisa, 27 Nov 2026: Nelson Sullivan; src/lib/tapes.server.ts). */
  tapes: { slug: string; title: string; year?: string | undefined; whole: boolean }[];
  /** Rank among the top 100 great connectors (pink badge), or null. */
  connector: number | null;
  /** Every name -> card answer the page needs for its links. */
  links: LinkData;
};
