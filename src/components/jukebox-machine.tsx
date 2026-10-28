import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Timestamp, openEpisodePlayer, pauseEpisode } from "@/components/episode-player";
import { loadApi } from "@/components/jukebox-player";
import { ShareButton } from "@/components/share-button";
import { CLUB_NIGHTS, playlistUrl } from "@/data/club-nights";
import { BOOK_SHELVES, SPOTIFY_PLAYLIST_URL, bookClub, clubsMentioned, listenLinks, type CollectionItem } from "@/data/collections";
import { episodes, episodeById, episodePath } from "@/data/episodes";
import { episodePortraits } from "@/components/episode-block";
import { JUKEBOX_YOUTUBE_URL, SPOTIFY_SONGS, YOUTUBE_VIDEOS, episodeSpotifyUrl } from "@/data/episode-spotify";
import { YEARS } from "@/data/jukebox-years";
import { NO_EMBED, YOUTUBE } from "@/data/jukebox-videos";
import { EntityLink } from "@/components/entity-link";

/** The rest of an Afterparty's YouTube playlist (Lisa, 28 Oct 2026): the people, clubs, nights, films and TV from the
 * episode, each tied to its reference (A–Z card + timestamp). One JSON per episode, loaded only when it is picked. */
export type Clip = {
  id: string;
  name: string;
  cat: string;
  time: string | null;
  title: string;
  channel: string;
  /** The Afterparty it is dropped in (added on load). */
  ep?: string;
  /** For Night Fever videos: the episode the video is. */
  of?: string;
  fashion?: string;
};
const clipFiles = import.meta.glob<{ default: Clip[] }>("../data/episode-videos/*.json");
const loadClips = async (ep: string): Promise<Clip[]> => {
  const f = clipFiles[`../data/episode-videos/${ep}.json`];
  return f ? (await f()).default.map((c) => ({ ...c, ep })) : [];
};
/** The categories inside an Afterparty (Lisa, 28 Oct 2026): Music, Clubs, People, Fashion, Films & TV. */
/** People = persons who aren't musicians (Lisa, 28 Oct 2026: the musicians live under Music). DJs, singers, composers and
 * record people are counted as musicians. Add new names here when an Afterparty brings one. */
const MUSICIANS = new Set<string>(["Adam Ant", "Afrojack", "Andrew Lloyd Webber", "Anita Sarko", "Annabella Lwin", "Annie Lennox", "Barbra Streisand", "Beyoncé", "Billie Holiday", "Billy Idol", "Björk", "Boy George", "Britney Spears", "Bryan Ferry", "Clive Davis", "Cyndi Lauper", "David Bowie", "David Byrne", "David Cole", "David Morales", "Dean Johnson", "Debbie Harry", "Diana Ross", "DJ Andy Anderson", "DJ Keoki", "Eartha Kitt", "Frankie Knuckles", "George Michael", "Grace Jones", "Grandmaster Flash", "Gwen Stefani", "Howie Pyro", "Iggy Pop", "Ike Turner", "James Brown", "Janis Joplin", "Jennifer Holliday", "Joan Jett", "John Cale", "John Sex", "John Taylor", "Kevin Aviance", "Kim Gordon", "Klaus Nomi", "Kylie Minogue", "Lady Gaga", "Lady Miss Kier", "Larry Tee", "Liberace", "Lil Nas X", "Lil' Kim", "Liza Minnelli", "Lou Reed", "Lydia Lunch", "Madonna", "Man Parrish", "Marc Shaiman", "Martha Wash", "MC Skat Kat", "Meat Loaf", "Michael Feinstein", "Michael Hutchence", "Michael Jackson", "Michael Stipe", "Mitzi Gaynor", "Nico", "Nina Hagen", "Peaches", "Pebbles", "Peter Allen", "Pharrell Williams", "Princess Superstar", "Rachel Auburn", "Richard Butler", "Richard Hell", "Romy Haag", "Rudi Protrudi", "Sade", "Scott Wittman", "Seymour Stein", "Steve Aoki", "Steve Strange", "Stevie Nicks", "Teena Marie", "Tim Armstrong", "Tina Turner", "Tish & Snooky", "Tony Basil", "Trevor Horn"]);
const normName = (n: string) => n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s*\(.*?\)/g, "").replace(/^the /, "").trim();
const MUSIC_VIDEO = /official (music )?video|\(official|music video|live (at|from|in)\b| - topic$|vevo$/i;
const FASHION_NOTE = /designer|couture|\blabel\b|stylist|make-?up artist|\bmodel\b|supermodel|runway|milliner|fashion (editor|house|journalist|photographer|icon|writer|critic|historian|show)/i;
const FASHION_TITLE = /fashion|runway|couture|catwalk|collection|designer|stylist|hairstylist|cfda|videofashion|heatherette/i;

// The Jukebox as a jukebox (Lisa, 28 Oct 2026): a cabinet with a screen on top, title strips with a big play button below.
// ♫ plays a song through Spotify's player, ▶ plays its video through YouTube's privacy-enhanced player - both load only
// when a visitor presses a button. The screen's "video of the day" is the same for everyone all day (Stockholm time) and
// walks through a shuffled order of every video, like the quote of the day.

type Kind = "video" | "sound";
type Moment = CollectionItem["moments"][number];
type Filter = "all" | "songs" | "artists" | "sounds" | "stage" | "episodes" | "clubs";

const KIND_LABEL: Record<string, string> = { songs: "Record", artists: "Artist", sounds: "Sound & scene", stage: "Musical" };

export const videoId = (it: CollectionItem) => YOUTUBE[it.name];
const embeddable = (it: CollectionItem) => !!videoId(it) && !NO_EMBED.has(videoId(it)!);

/** "RuPaul – 'Supermodel (You Better Work)'" -> title + artist line. */
export function stripLabel(it: CollectionItem): { title: string; sub: string } {
  const unq = (x: string) => x.replace(/ video$/, "").replace(/^['‘"“](.+)['’"”]$/, "$1");
  const q = it.name.match(/^(.+?) – (.+)$/);
  if (q) return /^['‘]/.test(q[1]!) ? { title: unq(q[1]!), sub: q[2]! } : { title: unq(q[2]!), sub: q[1]! };
  const p = it.name.match(/^(.+?) \((.+?)(?: song)?\)$/);
  if (p && !/^(band|probably)$/i.test(p[2]!)) return { title: unq(p[1]!), sub: p[2]! };
  return { title: unq(p ? p[1]! : it.name), sub: KIND_LABEL[it.shelf] ?? "" };
}

const released = (m: Moment) => Date.parse(episodeById(m.episodeId).released) || 0;
const secs = (t: string) => t.split(":").reduce((n, x) => n * 60 + (Number(x) || 0), 0);
/** The first time it came up on the show: earliest episode, earliest minute. */
export const firstMoment = (it: CollectionItem): Moment | undefined =>
  [...it.moments].filter((m) => m.time && m.time !== "On camera").sort((a, b) => released(a) - released(b) || secs(a.time) - secs(b.time))[0] ?? it.moments[0];


function rng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/** Video of the day: same for everyone all day (Stockholm), no repeats until every video has had its day. */
export function videoOfTheDay(pool: CollectionItem[], date = new Date()): CollectionItem {
  const day = date.toLocaleDateString("sv-SE", { timeZone: "Europe/Stockholm" });
  const days = Math.floor(Date.parse(`${day}T00:00:00Z`) / 86_400_000);
  const order = pool.map((_, i) => i);
  const rand = rng(Math.floor(days / pool.length) * 7919 + pool.length + 54);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j]!, order[i]!];
  }
  return pool[order[days % pool.length]!]!;
}

const guestName = (g: string) => g.replace(/ aka .*/, "").replace(/^Jenny Dembrow$/, "Jenny Talia");

function newestMusicEpisode(items: CollectionItem[]): string {
  const ids = new Set(items.flatMap((i) => i.moments.map((m) => m.episodeId)));
  return [...episodes].filter((e) => ids.has(e.id)).sort((a, b) => b.afterpartyPublished.localeCompare(a.afterpartyPublished))[0]?.id ?? "";
}

type EpCat = "all" | "music" | "clubs" | "people" | "fashion" | "pubs" | "films" | "events";
// Lisa, 28 Oct 2026: music first, then clubs, films & TV, fashion, publications (people last), each ranked by popularity.
const EP_CATS: { id: EpCat; label: string }[] = [
  { id: "all", label: "All" },
  { id: "music", label: "Music" },
  { id: "clubs", label: "Clubs" },
  { id: "films", label: "Films & TV" },
  { id: "fashion", label: "Fashion" },
  { id: "pubs", label: "Publications" },
  { id: "events", label: "Events" },
  { id: "people", label: "People" },
];
const SECTION_ORDER: EpCat[] = ["music", "clubs", "films", "fashion", "pubs", "events", "people"];
type Entry =
  | { key: string; kind: "song"; it: CollectionItem; views: number }
  | { key: string; kind: "clip"; c: Clip; views: number }
  | { key: string; kind: "pub"; it: CollectionItem; m: Moment; c?: Clip | undefined; views: number };
/** YouTube views, fetched once (src/data/video-views.json) and loaded with the Afterparty lists. */
const loadViews = async (): Promise<Record<string, number>> => (await import("../data/video-views.json")).default as Record<string, number>;
const fmtViews = (n: number) => (n >= 1e9 ? `${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : `${n}`).replace(".0", "");
function clipCats(c: Clip, musicNames: Set<string>): EpCat[] {
  if (c.cat === "Night Fever") return [];
  const musician = c.cat === "Person" && (MUSICIANS.has(c.name) || musicNames.has(normName(c.name)) || MUSIC_VIDEO.test(c.title) || MUSIC_VIDEO.test(c.channel));
  const out: EpCat[] = [];
  if (c.cat === "Music" || musician) out.push("music");
  if (c.cat === "Club") out.push("clubs");
  if (c.cat === "Person" && !musician) out.push("people");
  if (c.cat !== "Club" && !musician && (c.cat === "Mood" || (!!c.fashion && FASHION_NOTE.test(c.fashion)) || FASHION_TITLE.test(c.title))) out.push("fashion");
  if (c.cat === "Film" || c.cat === "TV") out.push("films");
  if (c.cat === "Event") out.push("events");
  return out;
}

export function JukeboxMachine({
  items,
  initialEpisode,
  onPickEpisode,
}: {
  items: CollectionItem[];
  /** From a shared link (/jukebox?afterparty=s05e04): open on that Afterparty and cue its first song. */
  initialEpisode?: string | undefined;
  onPickEpisode?: (id: string) => void;
}) {
  const pool = useMemo(() => items.filter(embeddable), [items]);
  const today = useMemo(() => videoOfTheDay(pool), [pool]);

  // Lisa, 28 Oct 2026: for now just two buttons - Afterparties (the default) and Clubs; more come back one by one.
  const [filter, setFilter] = useState<Filter>("episodes");
  const [sort, setSort] = useState<"dropped" | "az" | "timeline">("dropped");
  // Opens on the newest Afterparty with music (nothing plays until a button is pressed).
  const [episodeId, setEpisodeId] = useState<string>(() => initialEpisode || newestMusicEpisode(items));
  const [mode, setMode] = useState<Kind>("video");
  const [now, setNow] = useState<{ item: CollectionItem; kind: Kind } | null>(null);
  /** A video from the rest of the Afterparty playlist on the screen (instead of a song). */
  const [clip, setClip] = useState<Clip | null>(null);
  const [clips, setClips] = useState<{ ep: string; list: Clip[] }>({ ep: "", list: [] });
  /** What plays next after a clip: the list it was started from. */
  const queueRef = useRef<Clip[]>([]);
  const [epCat, setEpCat] = useState<EpCat>("all");
  const [views, setViews] = useState<Record<string, number>>({});
  const viewsRef = useRef(views);
  viewsRef.current = views;
  useEffect(() => {
    let live = true;
    void loadViews().then((v) => live && setViews(v));
    return () => {
      live = false;
    };
  }, []);
  const epQueueRef = useRef<Entry[]>([]);
  useEffect(() => setEpCat("all"), [episodeId]);
  const screenRef = useRef<HTMLDivElement>(null);
  const polsRef = useRef<HTMLDivElement>(null);
  /** Videos that wouldn't play for this visitor (e.g. blocked in their country) - skipped from then on. */
  const [failed, setFailed] = useState<Set<string>>(() => new Set());
  const failedRef = useRef(failed);
  failedRef.current = failed;

  const musicEpisodes = useMemo(() => {
    const ids = new Set(items.flatMap((i) => i.moments.map((m) => m.episodeId)));
    return episodes.filter((e) => ids.has(e.id)).sort((a, b) => a.season - b.season || a.episode - b.episode);
  }, [items]);

  const epMoment = (it: CollectionItem, ep: string) =>
    it.moments.filter((m) => m.episodeId === ep).sort((a, b) => secs(a.time) - secs(b.time))[0];

  const list = useMemo(() => {
    let l = items;
    if (filter === "episodes") {
      if (!episodeId) return [];
      // An episode's songs in the order they come up in the interview.
      return items.filter((i) => i.moments.some((m) => m.episodeId === episodeId)).sort((a, b) => secs(epMoment(a, episodeId)?.time ?? "") - secs(epMoment(b, episodeId)?.time ?? ""));
    }
    if (filter !== "all" && filter !== "clubs") l = items.filter((i) => i.shelf === filter);
    if (sort === "az") l = [...l].sort((a, b) => stripLabel(a).title.replace(/^the\s+/i, "").localeCompare(stripLabel(b).title.replace(/^the\s+/i, "")));
    if (sort === "timeline") l = [...l].sort((a, b) => (YEARS[a.name] ?? 9999) - (YEARS[b.name] ?? 9999) || b.mentions - a.mentions);
    return l;
  }, [items, filter, sort, episodeId]);
  // The whole list on one page - no paging (Lisa, 28 Oct 2026).
  const shown = list;
  // Show the chosen polaroid in the row (it scrolls sideways) without moving the page.
  useEffect(() => {
    const row = polsRef.current;
    const on = row?.querySelector<HTMLElement>(".jbx-pol.on");
    if (row && on) row.scrollLeft = on.offsetLeft - row.offsetLeft - 16;
  }, [filter, episodeId]);

  const listRef = useRef(list);
  listRef.current = list;

  useEffect(() => {
    if (filter !== "episodes" || !episodeId) return;
    // The show itself sits ready in the player bar (paused), so visitors can listen while they go through the playlist.
    openEpisodePlayer(episodeId);
    let live = true;
    void loadClips(episodeId).then((list) => live && setClips({ ep: episodeId, list }));
    return () => {
      live = false;
    };
  }, [filter, episodeId]);
  const rest = clips.ep === episodeId && filter === "episodes" ? clips.list : [];
  const playClip = (c: Clip, queue: Clip[]) => {
    queueRef.current = queue;
    setNow(null);
    setClip(c);
    toScreen();
  };
  const musicNames = useMemo(() => {
    const s = new Set<string>();
    for (const it of items) {
      s.add(normName(it.name));
      const l = stripLabel(it);
      s.add(normName(l.title));
      if (l.sub) s.add(normName(l.sub));
    }
    return s;
  }, [items]);
  const restCats = useMemo(() => new Map(rest.map((c) => [c, clipCats(c, musicNames)])), [rest, musicNames]);
  /** Publications (Lisa, 28 Oct 2026): the episode's books, magazines, newspapers and columns - from the Book Club - with a video when the playlist has one. */
  const pubs = useMemo(() => {
    if (filter !== "episodes" || !episodeId) return [];
    const at = (it: CollectionItem) => it.moments.find((m) => m.episodeId === episodeId);
    return bookClub
      .filter((it) => at(it))
      .map((it) => {
        // Its own video, or a video about it ("The Rise and Fall of Details Magazine").
        const n = normName(it.name);
        const clip = rest.find((c) => normName(c.name) === n) ?? (n.length >= 6 ? rest.find((c) => normName(c.title).includes(n)) : undefined);
        return { it, m: at(it)!, clip };
      })
      .sort((a, b) => secs(a.m.time) - secs(b.m.time));
  }, [filter, episodeId, rest]);
  /** The Afterparty in sections - music, clubs, films & TV, fashion, publications, people - each ranked by YouTube views. */
  const sections = useMemo(() => {
    if (filter !== "episodes" || !episodeId) return [];
    const v = (id?: string) => (id ? (views[id] ?? 0) : -1);
    const pubClips = new Set(pubs.flatMap((p) => (p.clip ? [p.clip.id] : [])));
    const by: Record<EpCat, Entry[]> = { all: [], music: [], clubs: [], films: [], fashion: [], pubs: [], events: [], people: [] };
    for (const it of list) by.music.push({ key: `song:${it.slug}`, kind: "song", it, views: v(videoId(it)) });
    for (const c of rest) {
      if (pubClips.has(c.id)) continue;
      const cats = restCats.get(c) ?? [];
      const sec = SECTION_ORDER.find((k) => k !== "pubs" && cats.includes(k));
      if (sec) by[sec].push({ key: `clip:${c.id}`, kind: "clip", c, views: v(c.id) });
    }
    for (const p of pubs) by.pubs.push({ key: `pub:${p.it.slug}`, kind: "pub", it: p.it, m: p.m, c: p.clip, views: p.clip ? v(p.clip.id) : -1 });
    return SECTION_ORDER.map((id) => ({ id, label: EP_CATS.find((k) => k.id === id)!.label, entries: [...by[id]].sort((a, b) => b.views - a.views) })).filter((x) => x.entries.length);
  }, [filter, episodeId, list, rest, restCats, pubs, views]);
  const shownSections = epCat === "all" ? sections : sections.filter((x) => x.id === epCat);
  epQueueRef.current = shownSections.flatMap((x) => x.entries);
  const catCount = (k: EpCat) => (k === "all" ? sections.reduce((n, x) => n + x.entries.length, 0) : (sections.find((x) => x.id === k)?.entries.length ?? 0));
  /** Like a jukebox: after a song or a video, the next one down the list that plays. */
  const advance = (fromKey: string) => {
    const q = epQueueRef.current;
    const i = q.findIndex((e) => e.key === fromKey || (e.kind === "pub" && !!e.c && fromKey === `clip:${e.c.id}`));
    for (const e of q.slice(i + 1)) {
      if (e.kind === "song") {
        const k = bestKind(e.it);
        if (k) {
          setClip(null);
          setNow({ item: e.it, kind: k });
          return;
        }
      } else if (e.c && !failedRef.current.has(`clip:${e.c.id}`)) {
        setNow(null);
        setClip(e.c);
        return;
      }
    }
    setClip(null);
  };
  /** After a clip: the next one in the list (the whole episodes and trailers are skipped when moving on). */
  const nextClip = (from?: Clip) => {
    if (filter === "episodes" && from) return advance(`clip:${from.id}`);
    const l = queueRef.current;
    const at = from ? l.indexOf(from) : -1;
    const n = l.find((x, k) => k > at && x.cat !== "Night Fever" && !failedRef.current.has(`clip:${x.id}`));
    if (n) setClip(n);
    else setClip(null);
  };
  const failClip = (c: Clip) => {
    const f = new Set(failedRef.current).add(`clip:${c.id}`);
    failedRef.current = f;
    setFailed(f);
    nextClip(c);
  };

  const toScreen = () => {
    const top = screenRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > window.innerHeight * 0.6) screenRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const play = (item: CollectionItem, kind: Kind) => {
    setClip(null);
    setNow({ item, kind });
    toScreen();
  };
  const canPlay = (it: CollectionItem, kind: Kind) => (kind === "video" ? embeddable(it) && !failedRef.current.has(it.slug) : !!it.spotify);
  /** The big play button: the video, or the song from Spotify when there's no video (or when "Sound only" is on). */
  const bestKind = (it: CollectionItem): Kind | null =>
    mode === "sound" && it.spotify ? "sound" : canPlay(it, "video") ? "video" : it.spotify ? "sound" : null;
  /** Like a real jukebox: when a song ends, the next selection in the current list plays. */
  const next = (from: CollectionItem, kind: Kind) => {
    if (filter === "episodes") return advance(`song:${from.slug}`);
    const l = listRef.current;
    const at = l.indexOf(from);
    const n = l.find((x, k) => k > at && canPlay(x, kind));
    if (n) setNow({ item: n, kind });
  };
  const fail = (it: CollectionItem) => {
    const f = new Set(failedRef.current).add(it.slug);
    failedRef.current = f;
    setFailed(f);
    if (filter === "episodes") return advance(`song:${it.slug}`);
    // Move on to the next selection that plays (its video, or its song from Spotify).
    const l = listRef.current.includes(it) ? listRef.current : pool;
    const at = l.indexOf(it);
    const n = [...l.slice(at + 1), ...l.slice(0, at)].find((x) => canPlay(x, "video") || !!x.spotify);
    setNow(n ? { item: n, kind: canPlay(n, "video") ? "video" : "sound" } : null);
  };
  const shuffle = () => {
    const l = (filter === "clubs" ? items : list).filter((x) => canPlay(x, mode));
    if (l.length) play(l[Math.floor(Math.random() * l.length)]!, mode);
  };
  const switchMode = (k: Kind) => {
    setMode(k);
    if (now && now.kind !== k && canPlay(now.item, k)) setNow({ item: now.item, kind: k });
  };
  /** Episodes: tap a polaroid - the jukebox plays the first song of that Afterparty and lists its songs. */
  const pickEpisode = (id: string) => {
    setEpisodeId(id);
    onPickEpisode?.(id);
    const vw = viewsRef.current;
    const songs = items
      .filter((i) => i.moments.some((m) => m.episodeId === id))
      .sort((a, b) => (vw[videoId(b) ?? ""] ?? -1) - (vw[videoId(a) ?? ""] ?? -1) || secs(epMoment(a, id)?.time ?? "") - secs(epMoment(b, id)?.time ?? ""));
    listRef.current = songs;
    const first = songs.find((x) => canPlay(x, "video")) ?? songs.find((x) => x.spotify);
    if (first) play(first, canPlay(first, "video") ? "video" : "sound");
  };

  // A shared Afterparty link cues that Afterparty's first song on the screen instead of today's video.
  const cued = useMemo(() => {
    if (!initialEpisode) return undefined;
    const songs = items.filter((i) => i.moments.some((m) => m.episodeId === initialEpisode)).sort((a, b) => secs(epMoment(a, initialEpisode)?.time ?? "") - secs(epMoment(b, initialEpisode)?.time ?? ""));
    return songs.find((x) => embeddable(x)) ?? songs.find((x) => x.spotify);
  }, [initialEpisode, items]);
  const idleItem = cued ?? today;
  const shownItem = now?.item ?? idleItem;
  const label = stripLabel(shownItem);
  const at = (it: CollectionItem) => (filter === "episodes" && episodeId ? epMoment(it, episodeId) : undefined) ?? firstMoment(it);
  const shownAt = at(shownItem);
  const ep = filter === "episodes" && episodeId ? episodes.find((e) => e.id === episodeId) : undefined;

  const chip = (on: boolean) => `jbx-chip${on ? " on" : ""}`;

  /** One strip on an Afterparty list: a song, a video, or a publication. */
  const entryStrip = (e: Entry, ep: { id: string; season: number; episode: number }) => {
    const code = `S${ep.season}E${ep.episode}`;
    const seen = e.views > 0 ? ` · ${fmtViews(e.views)} views` : "";
    if (e.kind === "song") {
      const it = e.it;
      const l = stripLabel(it);
      const m = epMoment(it, ep.id);
      const hot = !clip && now?.item.slug === it.slug;
      const kind = bestKind(it);
      return (
        <li key={e.key} className={`jbx-strip${hot ? " hot" : ""}`}>
          {kind ? (
            <button type="button" className="jbx-big" onClick={() => play(it, kind)} aria-label={kind === "video" ? `Play the video of ${l.title}` : `Play ${l.title} from Spotify`} title={kind === "video" ? "Play the video" : "Play the song (no video)"}>
              <span aria-hidden="true">{hot ? "♫" : "▶"}</span>
              {kind === "sound" && <small>audio</small>}
            </button>
          ) : (
            <a className="jbx-big off" href={listenLinks(it.name).youtube} target="_blank" rel="noopener noreferrer" aria-label={`Find ${l.title} on YouTube`} title="Find it on YouTube">
              <span aria-hidden="true">↗</span>
              <small>YouTube</small>
            </a>
          )}
          <div className="jbx-tt">
            <Link to="/explore/$slug" params={{ slug: it.slug }} className="jbx-name">{l.title}</Link>
            <i>
              {l.sub}
              {YEARS[it.name] ? ` · ${YEARS[it.name]! < 1900 ? "19th century" : YEARS[it.name]}` : ""}
            </i>
            {m && (
              <small>
                in {code} <Timestamp episodeId={ep.id} time={m.time} className="jbx-ts" />
                {seen}
              </small>
            )}
          </div>
        </li>
      );
    }
    if (e.kind === "pub") {
      const it = e.it;
      const c = e.c;
      const shelf = BOOK_SHELVES.find((x) => x.key === it.shelf)?.label.replace(/s$/, "").replace("Columns & article", "Column or article") ?? "Publication";
      const hot = !!c && clip?.id === c.id;
      return (
        <li key={e.key} className={`jbx-strip${hot ? " hot" : ""}`}>
          {c && !failed.has(`clip:${c.id}`) ? (
            <button type="button" className="jbx-big" onClick={() => playClip(c, [])} aria-label={`Play the video: ${it.name}`} title="Play the video">
              <span aria-hidden="true">{hot ? "♫" : "▶"}</span>
            </button>
          ) : (
            <Link to="/explore/$slug" params={{ slug: it.slug }} className="jbx-big off" aria-label={`Read about ${it.name}`} title="No video - read about it on its card">
              <span aria-hidden="true">→</span>
              <small>Read</small>
            </Link>
          )}
          <div className="jbx-tt">
            <Link to="/explore/$slug" params={{ slug: it.slug }} className="jbx-name">{it.name}</Link>
            <i>
              {shelf}
              {e.m.context ? ` · ${e.m.context}` : ""}
            </i>
            <small>
              in {code} <Timestamp episodeId={ep.id} time={e.m.time} className="jbx-ts" />
              {seen}
            </small>
          </div>
        </li>
      );
    }
    const c = e.c;
    const hot = clip?.id === c.id;
    return (
      <li key={e.key} className={`jbx-strip${hot ? " hot" : ""}`}>
        {failed.has(`clip:${c.id}`) ? (
          <a className="jbx-big off" href={`https://www.youtube.com/watch?v=${c.id}`} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${c.name} on YouTube`} title="Won't play here - watch it on YouTube">
            <span aria-hidden="true">↗</span>
            <small>YouTube</small>
          </a>
        ) : (
          <button type="button" className="jbx-big" onClick={() => playClip(c, [])} aria-label={`Play the video: ${c.name}`} title="Play the video">
            <span aria-hidden="true">{hot ? "♫" : "▶"}</span>
          </button>
        )}
        <div className="jbx-tt">
          <EntityLink name={c.name} className="jbx-name" />
          <i>
            {c.cat === "Person" && restCats.get(c)?.includes("music") ? "Musician" : c.cat === "Mood" ? "Look" : c.cat} · {c.title}
          </i>
          <small>
            {c.time ? (
              <>
                in {code} <Timestamp episodeId={ep.id} time={c.time} className="jbx-ts" />
              </>
            ) : (
              <>in {code}</>
            )}
            {seen}
          </small>
        </div>
      </li>
    );
  };

  return (
    <div className="jbx">
      <div className="jbx-dome">
        <div className="jbx-tubes">
          <div className="jbx-inner">
            <p className="jbx-kicker">THE NIGHT FEVER</p>
            <h1 className="jbx-title">
              JUKE<span>BOX</span>
            </h1>
            <div ref={screenRef} className={`jbx-screen${now || clip ? " playing" : ""}`}>
              {clip ? (
                <VideoScreen key={`clip:${clip.id}`} vid={clip.id} title={clip.name} onEnd={() => nextClip(clip)} onFail={() => failClip(clip)} />
              ) : now?.kind === "video" ? (
                <VideoScreen key={now.item.slug} vid={videoId(now.item)!} title={stripLabel(now.item).title} onEnd={() => next(now.item, "video")} onFail={() => fail(now.item)} />
              ) : now?.kind === "sound" ? (
                <SoundScreen item={now.item} onEnd={(it) => next(it, "sound")} />
              ) : (
                <button type="button" className="jbx-idle" onClick={() => play(idleItem, (mode === "sound" || !embeddable(idleItem)) && idleItem.spotify ? "sound" : "video")} aria-label={`Play ${label.title}`}>
                  <span className="jbx-np">{cued && ep ? `${guestName(ep.guest)}’s AFTERPARTY PLAYLIST` : <>TODAY&rsquo;S VIDEO · A NEW ONE EVERY DAY</>}</span>
                  <span className="jbx-play" aria-hidden="true">▶</span>
                  <span className="jbx-st">{label.title}</span>
                  <span className="jbx-sa">{label.sub}</span>
                </button>
              )}
            </div>
            <div className="jbx-nowline">
              {clip ? (
                <>
                  <p className="jbx-np">
                    NOW PLAYING · VIDEO · <b>{clip.name}</b> - {clip.title}
                  </p>
                  {clip.time && clip.ep && (
                    <p className="jbx-drop">
                      dropped in {guestName(episodeById(clip.ep).guest)}&rsquo;s episode, S{episodeById(clip.ep).season}E{episodeById(clip.ep).episode}{" "}
                      <Timestamp episodeId={clip.ep} time={clip.time} className="jbx-ts" />
                    </p>
                  )}
                </>
              ) : now && (
                <p className="jbx-np">
                  NOW PLAYING · {now.kind === "video" ? "VIDEO" : "SOUND ONLY"} · <b>{label.title}</b> - {label.sub}
                </p>
              )}
              {!clip && shownAt && (
                <p className="jbx-drop">
                  dropped {shownItem.mentions || 1}× on Night Fever · {ep && shownAt.episodeId === ep.id ? "in" : "first by"} {shownAt.guest}, {shownAt.code}{" "}
                  <Timestamp episodeId={shownAt.episodeId} time={shownAt.time} className="jbx-ts" />
                </p>
              )}
            </div>
            <div className="jbx-mode" role="group" aria-label="How the jukebox plays">
              <button type="button" className={mode === "sound" ? "on" : ""} aria-pressed={mode === "sound"} onClick={() => switchMode("sound")}>
                ♫ Sound only
              </button>
              <button type="button" className={mode === "video" ? "on" : ""} aria-pressed={mode === "video"} onClick={() => switchMode("video")}>
                ▶ With the video
              </button>
              <button type="button" onClick={shuffle}>
                ⤨ Shuffle
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="jbx-grill" aria-hidden="true" />

      <div className="jbx-panel">
        <div className="jbx-chips">
          <button type="button" className={chip(filter === "all")} aria-pressed={filter === "all"} onClick={() => { setFilter("all"); setSort("az"); }}>Music <small>{items.length}</small></button>
          <button type="button" className={chip(filter === "episodes")} aria-pressed={filter === "episodes"} onClick={() => setFilter("episodes")}>AFTERPARTIES <small>{musicEpisodes.length}</small></button>
          <button type="button" className={chip(filter === "clubs")} aria-pressed={filter === "clubs"} onClick={() => setFilter("clubs")}>Clubs <small>{clubsMentioned.length}</small></button>
        </div>

        {filter === "episodes" && (
          <div ref={polsRef} className="jbx-pols" role="group" aria-label="Pick an Afterparty">
            {musicEpisodes.map((e) => (
              <button key={e.id} type="button" className={`jbx-pol${episodeId === e.id ? " on" : ""}`} aria-pressed={episodeId === e.id} onClick={() => pickEpisode(e.id)} title={`Play the songs from ${e.guest}'s Afterparty`}>
                {episodePortraits[e.id] && <img src={episodePortraits[e.id]} alt="" loading="lazy" />}
                <span>S{e.season}E{e.episode}</span>
                <b>{guestName(e.guest)}</b>
              </button>
            ))}
          </div>
        )}

        {ep && (
          <div className="jbx-ep">
            {episodePortraits[ep.id] && (
              <Link to={episodePath(ep.id)} className="jbx-ep-pol" aria-label={`${ep.guest}'s Afterparty`}>
                <img src={episodePortraits[ep.id]} alt="" />
                <span>S{ep.season}E{ep.episode}</span>
              </Link>
            )}
            <div>
              <p className="jbx-np dark">THE AFTERPARTY PLAYLIST</p>
              <h2 className="jbx-ep-name">{guestName(ep.guest)}</h2>
              <p className="jbx-ep-note">
                Everything from the episode you can play here - music first, then the clubs, films &amp; TV, fashion, publications, events and people, the most watched on top. Take it with you:
              </p>
              <div className="jbx-ep-links">
                {episodeSpotifyUrl(ep.id) && (
                  <a href={episodeSpotifyUrl(ep.id)} target="_blank" rel="noopener noreferrer">♫ Spotify playlist{SPOTIFY_SONGS[ep.id] ? <span className="jbx-count" title={`${SPOTIFY_SONGS[ep.id]} songs`}>{SPOTIFY_SONGS[ep.id]}</span> : null} ↗</a>
                )}
                {ep.youtubePlaylistUrl && (
                  <a href={ep.youtubePlaylistUrl} target="_blank" rel="noopener noreferrer">▶ YouTube playlist{YOUTUBE_VIDEOS[ep.id] ? <span className="jbx-count" title={`${YOUTUBE_VIDEOS[ep.id]} videos`}>{YOUTUBE_VIDEOS[ep.id]}</span> : null} ↗</a>
                )}
                <Link to={episodePath(ep.id)}>The Afterparty →</Link>
                <ShareButton className="jbx-share" path={`/jukebox?afterparty=${ep.id}`} title={`${guestName(ep.guest)}'s AFTERPARTY playlist – Night Fever Jukebox`} />
              </div>
            </div>
          </div>
        )}

        {ep && filter === "episodes" && sections.length > 0 && (
          <div className="jbx-subchips" role="group" aria-label="Show from this Afterparty">
            {EP_CATS.map((k) => {
              const n = catCount(k.id);
              if (!n) return null;
              return (
                <button key={k.id} type="button" className={chip(epCat === k.id)} aria-pressed={epCat === k.id} onClick={() => setEpCat(k.id)}>
                  {k.label} <small>{n}</small>
                </button>
              );
            })}
          </div>
        )}

        {filter === "clubs" ? (
          <ClubsShelf />
        ) : filter === "episodes" && !episodeId ? (
          <p className="jbx-hint">Pick a polaroid: the jukebox plays that Afterparty&rsquo;s songs and shows its playlists.</p>
        ) : (
          <>
            {filter === "episodes" && ep &&
              shownSections.map((sec) => (
                <section key={sec.id} className="jbx-sec">
                  <h3 className="jbx-rest-h">
                    {sec.label} <small>{sec.entries.length}</small>
                  </h3>
                  <ol className="jbx-rack jbx-rest">{sec.entries.map((e) => entryStrip(e, ep))}</ol>
                </section>
              ))}
            {filter !== "episodes" && (
            <ol className="jbx-rack">
              {shown.flatMap((it, k) => {
                const l = stripLabel(it);
                const m = at(it);
                const hot = now?.item.slug === it.slug;
                const kind = bestKind(it);
                const year = YEARS[it.name];
                const decade = (y?: number) => (!y ? "" : y < 1900 ? "Before 1900" : `${Math.floor(y / 10) * 10}s`);
                const prev = k > 0 ? decade(YEARS[shown[k - 1]!.name]) : "";
                const out = [];
                // Timeline: a marker at every new decade (the exact year sits on each strip).
                if (sort === "timeline" && year && decade(year) !== prev)
                  out.push(<li key={`y${decade(year)}`} className="jbx-year" aria-hidden="true"><span>{decade(year)}</span></li>);
                out.push(
                  <li key={it.slug} className={`jbx-strip${hot ? " hot" : ""}`}>
                    {kind ? (
                      <button type="button" className="jbx-big" onClick={() => play(it, kind)} aria-label={kind === "video" ? `Play the video of ${l.title}` : `Play ${l.title} from Spotify`} title={kind === "video" ? "Play the video" : "Play the song (no video)"}>
                        <span aria-hidden="true">{hot ? "♫" : "▶"}</span>
                        {kind === "sound" && <small>audio</small>}
                      </button>
                    ) : (
                      <a className="jbx-big off" href={videoId(it) ? `https://www.youtube.com/watch?v=${videoId(it)}` : listenLinks(it.name).youtube} target="_blank" rel="noopener noreferrer" aria-label={`Find ${l.title} on YouTube`} title="Find it on YouTube">
                        <span aria-hidden="true">↗</span>
                        <small>YouTube</small>
                      </a>
                    )}
                    <div className="jbx-tt">
                      <Link to="/explore/$slug" params={{ slug: it.slug }} className="jbx-name">{l.title}</Link>
                      <i>
                        {l.sub}
                        {year ? ` · ${year < 1900 ? "19th century" : year}` : ""}
                      </i>
                      {m && (
                        <small>
                          dropped {it.mentions || 1}× · first in {m.code}{" "}
                          <Timestamp episodeId={m.episodeId} time={m.time} className="jbx-ts" />
                        </small>
                      )}
                    </div>
                  </li>,
                );
                return out;
              })}
            </ol>
            )}
          </>
        )}
      </div>
      <p className="jbx-foot">
        ▶ plays the video on the jukebox screen - or the song from Spotify when there&rsquo;s no video · the timestamp plays the moment it&rsquo;s dropped on the show.
        <br />
        Take it with you: the Jukebox on{" "}
        <a href={SPOTIFY_PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
          Spotify ↗
        </a>{" "}
        and on{" "}
        <a href={JUKEBOX_YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
          YouTube ↗
        </a>
      </p>
    </div>
  );
}

function VideoScreen({ vid, title, onEnd, onFail }: { vid: string; title: string; onEnd: () => void; onFail: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const endRef = useRef(onEnd);
  endRef.current = onEnd;
  const failRef = useRef(onFail);
  failRef.current = onFail;
  useEffect(() => {
    // Ask the YouTube player to report its state, so the jukebox can move on when the video ends.
    const hello = () => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*");
    const t = setInterval(hello, 1000);
    let ended = false;
    const onMsg = (e: MessageEvent) => {
      if (!/youtube(-nocookie)?\.com$/.test(new URL(e.origin).hostname)) return;
      let d: { event?: string; info?: unknown } = {};
      try {
        d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (d.event === "initialDelivery" || d.event === "onReady") clearInterval(t);
      const state = d.event === "onStateChange" ? d.info : d.event === "infoDelivery" ? (d.info as { playerState?: number } | undefined)?.playerState : undefined;
      // The video can't play here (removed, or blocked in the visitor's country): skip it, like a jukebox with a stuck record.
      if (d.event === "onError" && !ended) {
        ended = true;
        failRef.current();
        return;
      }
      if (state === 0 && !ended) {
        ended = true;
        setTimeout(() => endRef.current(), 800);
      }
    };
    window.addEventListener("message", onMsg);
    // Only one thing plays at a time: the show (episode player) pauses the video, and the video pauses the show.
    pauseEpisode();
    const hush = () => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
    window.addEventListener("nf-episode-play", hush);
    return () => {
      clearInterval(t);
      window.removeEventListener("message", onMsg);
      window.removeEventListener("nf-episode-play", hush);
    };
  }, []);
  const id = vid;
  const origin = typeof window === "undefined" ? "" : `&origin=${encodeURIComponent(window.location.origin)}`;
  return (
    <iframe
      ref={frame}
      className="jbx-video"
      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&enablejsapi=1${origin}`}
      title={`${title} - video on YouTube`}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

type Controller = {
  loadUri: (uri: string) => void;
  play: () => void;
  pause?: () => void;
  addListener: (ev: string, cb: (e: { data: { isPaused: boolean; position: number; duration: number } }) => void) => void;
};

function SoundScreen({ item, onEnd }: { item: CollectionItem; onEnd: (it: CollectionItem) => void }) {
  const holder = useRef<HTMLDivElement>(null);
  const ctrl = useRef<Controller | null>(null);
  const cur = useRef(item);
  const ending = useRef(false);
  const endRef = useRef(onEnd);
  endRef.current = onEnd;
  const l = stripLabel(item);

  useEffect(() => {
    cur.current = item;
    ending.current = false;
    if (!item.spotify) return;
    pauseEpisode();
    if (ctrl.current) {
      ctrl.current.loadUri(item.spotify);
      ctrl.current.play();
      return;
    }
    let alive = true;
    void loadApi().then((api) => {
      if (!alive || !holder.current) return;
      const el = document.createElement("div");
      holder.current.replaceChildren(el);
      api.createController(el, { uri: item.spotify, width: "100%", height: 152 }, (c) => {
        ctrl.current = c as unknown as Controller;
        c.addListener("ready", () => c.play());
        c.addListener("playback_update", (e) => {
          const { position, duration, isPaused } = e.data;
          if (!ending.current && duration > 0 && position >= duration - 800 && !isPaused) {
            ending.current = true;
            setTimeout(() => endRef.current(cur.current), 900);
          }
        });
      });
    });
    return () => {
      alive = false;
    };
  }, [item]);
  useEffect(() => {
    const hush = () => ctrl.current?.pause?.();
    window.addEventListener("nf-episode-play", hush);
    return () => {
      window.removeEventListener("nf-episode-play", hush);
      ctrl.current = null;
    };
  }, []);

  return (
    <div className="jbx-sound">
      <span className="jbx-np">SOUND ONLY · FROM SPOTIFY</span>
      <span className="jbx-st">{l.title}</span>
      <span className="jbx-sa">{l.sub}</span>
      <div ref={holder} className="jbx-spotify" />
      <span className="jbx-small">Not logged in to Spotify? You&rsquo;ll hear 30-second previews - log in for full songs.</span>
    </div>
  );
}

function ClubsShelf({ children }: { children?: ReactNode }) {
  const chosen = new Set(CLUB_NIGHTS.map((c) => c.slug));
  return (
    <div className="jbx-clubs">
      <p className="jbx-clubs-intro">
        Three clubs have their own playlist: what they actually played, built only from documented DJ lists, recorded sets, club albums and live shows,
        with every song&rsquo;s source on the club&rsquo;s page.
      </p>
      <ul className="jbx-clubcards">
        {CLUB_NIGHTS.map((c) => (
          <li key={c.slug}>
            <p className="jbx-np">CLUB PLAYLIST · {c.songs.length} SONGS</p>
            <Link to="/explore/$slug" params={{ slug: c.slug }} className="jbx-clubname">{c.club}</Link>
            <ul>
              {c.songs.slice(0, 4).map((s) => (
                <li key={s.spotify ?? s.title}>
                  {s.title} <span>· {s.artist}</span>
                </li>
              ))}
              <li><span>+ {c.songs.length - 4} more</span></li>
            </ul>
            <div className="jbx-clublinks">
              <Link to="/explore/$slug" params={{ slug: c.slug }}>Songs &amp; sources →</Link>
              {c.playlistId && (
                <a href={playlistUrl(c.playlistId)} target="_blank" rel="noopener noreferrer">Spotify ↗</a>
              )}
              {c.youtubePlaylist && (
                <a href={c.youtubePlaylist} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
              )}
            </div>
          </li>
        ))}
      </ul>
      {children}
      <h2 className="jbx-h2">Every club mentioned on Night Fever <small>{clubsMentioned.length}</small></h2>
      <ol className="jbx-clublist">
        {clubsMentioned.map((c) => (
          <li key={c.slug} className={chosen.has(c.slug) ? "chosen" : ""}>
            <Link to="/explore/$slug" params={{ slug: c.slug }}>{c.name}</Link>
            <small>
              {c.episodes > 1 ? `${c.episodes} episodes` : "1 episode"}
              {c.mentions > 0 ? ` · ${c.mentions}×` : ""}
            </small>
          </li>
        ))}
      </ol>
    </div>
  );
}
