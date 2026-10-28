import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Timestamp } from "@/components/episode-player";
import { loadApi } from "@/components/jukebox-player";
import { CLUB_NIGHTS, playlistUrl } from "@/data/club-nights";
import { SPOTIFY_PLAYLIST_URL, clubsMentioned, listenLinks, type CollectionItem } from "@/data/collections";
import { episodes, episodeById, episodePath } from "@/data/episodes";
import { episodePortraits } from "@/components/episode-block";
import { JUKEBOX_YOUTUBE_URL, episodeSpotifyUrl } from "@/data/episode-spotify";
import { YEARS } from "@/data/jukebox-years";
import { NO_EMBED, YOUTUBE } from "@/data/jukebox-videos";

// The Jukebox as a jukebox (Lisa, 28 Oct 2026): a cabinet with a screen on top, title strips with a big play button below.
// ♫ plays a song through Spotify's player, ▶ plays its video through YouTube's privacy-enhanced player - both load only
// when a visitor presses a button. The screen's "video of the day" is the same for everyone all day (Stockholm time) and
// walks through a shuffled order of every video, like the quote of the day.

type Kind = "video" | "sound";
type Moment = CollectionItem["moments"][number];
type Filter = "all" | "songs" | "artists" | "sounds" | "stage" | "episodes" | "clubs";

const PAGE = 24;
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

export function JukeboxMachine({ items }: { items: CollectionItem[] }) {
  const pool = useMemo(() => items.filter(embeddable), [items]);
  const today = useMemo(() => videoOfTheDay(pool), [pool]);

  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<"dropped" | "az" | "timeline">("dropped");
  const [episodeId, setEpisodeId] = useState<string>("");
  const [page, setPage] = useState(0);
  const [mode, setMode] = useState<Kind>("video");
  const [now, setNow] = useState<{ item: CollectionItem; kind: Kind } | null>(null);
  const screenRef = useRef<HTMLDivElement>(null);
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
  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  const shown = list.slice(page * PAGE, page * PAGE + PAGE);
  useEffect(() => setPage(0), [filter, sort, episodeId]);

  const listRef = useRef(list);
  listRef.current = list;

  const toScreen = () => {
    const top = screenRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > window.innerHeight * 0.6) screenRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const play = (item: CollectionItem, kind: Kind) => {
    setNow({ item, kind });
    toScreen();
  };
  const canPlay = (it: CollectionItem, kind: Kind) => (kind === "video" ? embeddable(it) && !failedRef.current.has(it.slug) : !!it.spotify);
  /** The big play button: the video, or the song from Spotify when there's no video (or when "Sound only" is on). */
  const bestKind = (it: CollectionItem): Kind | null =>
    mode === "sound" && it.spotify ? "sound" : canPlay(it, "video") ? "video" : it.spotify ? "sound" : null;
  /** Like a real jukebox: when a song ends, the next selection in the current list plays. */
  const next = (from: CollectionItem, kind: Kind) => {
    const l = listRef.current;
    const at = l.indexOf(from);
    const n = l.find((x, k) => k > at && canPlay(x, kind));
    if (n) setNow({ item: n, kind });
  };
  const fail = (it: CollectionItem) => {
    const f = new Set(failedRef.current).add(it.slug);
    failedRef.current = f;
    setFailed(f);
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
    const songs = items.filter((i) => i.moments.some((m) => m.episodeId === id)).sort((a, b) => secs(epMoment(a, id)?.time ?? "") - secs(epMoment(b, id)?.time ?? ""));
    listRef.current = songs;
    const first = songs.find((x) => canPlay(x, "video")) ?? songs.find((x) => x.spotify);
    if (first) play(first, canPlay(first, "video") ? "video" : "sound");
  };

  const shownItem = now?.item ?? today;
  const label = stripLabel(shownItem);
  const at = (it: CollectionItem) => (filter === "episodes" && episodeId ? epMoment(it, episodeId) : undefined) ?? firstMoment(it);
  const shownAt = at(shownItem);
  const ep = filter === "episodes" && episodeId ? episodes.find((e) => e.id === episodeId) : undefined;

  const chip = (on: boolean) => `jbx-chip${on ? " on" : ""}`;
  const counts = (k: string) => items.filter((i) => i.shelf === k).length;

  return (
    <div className="jbx">
      <div className="jbx-dome">
        <div className="jbx-tubes">
          <div className="jbx-inner">
            <p className="jbx-kicker">THE NIGHT FEVER</p>
            <h1 className="jbx-title">
              JUKE<span>BOX</span>
            </h1>
            <div ref={screenRef} className={`jbx-screen${now ? " playing" : ""}`}>
              {now?.kind === "video" ? (
                <VideoScreen key={now.item.slug} item={now.item} onEnd={() => next(now.item, "video")} onFail={() => fail(now.item)} />
              ) : now?.kind === "sound" ? (
                <SoundScreen item={now.item} onEnd={(it) => next(it, "sound")} />
              ) : (
                <button type="button" className="jbx-idle" onClick={() => play(today, mode === "sound" && today.spotify ? "sound" : "video")} aria-label={`Play today's video: ${label.title}`}>
                  <span className="jbx-np">TODAY&rsquo;S VIDEO · A NEW ONE EVERY DAY</span>
                  <span className="jbx-play" aria-hidden="true">▶</span>
                  <span className="jbx-st">{label.title}</span>
                  <span className="jbx-sa">{label.sub}</span>
                </button>
              )}
            </div>
            <div className="jbx-nowline">
              {now && (
                <p className="jbx-np">
                  NOW PLAYING · {now.kind === "video" ? "VIDEO" : "SOUND ONLY"} · <b>{label.title}</b> - {label.sub}
                </p>
              )}
              {shownAt && (
                <p className="jbx-drop">
                  dropped {shownItem.mentions || 1}× on Night Fever · {ep ? "in" : "first by"} {shownAt.guest}, {shownAt.code}{" "}
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
          <button type="button" className={chip(sort === "dropped")} aria-pressed={sort === "dropped"} onClick={() => setSort("dropped")}>Most dropped</button>
          <button type="button" className={chip(sort === "az")} aria-pressed={sort === "az"} onClick={() => setSort("az")}>A–Z</button>
          <button type="button" className={chip(sort === "timeline")} aria-pressed={sort === "timeline"} onClick={() => setSort("timeline")}>Timeline</button>
          <span className="jbx-sep" aria-hidden="true" />
          <button type="button" className={chip(filter === "all")} aria-pressed={filter === "all"} onClick={() => setFilter("all")}>All <small>{items.length}</small></button>
          <button type="button" className={chip(filter === "songs")} aria-pressed={filter === "songs"} onClick={() => setFilter("songs")}>Songs <small>{counts("songs")}</small></button>
          <button type="button" className={chip(filter === "artists")} aria-pressed={filter === "artists"} onClick={() => setFilter("artists")}>Artists &amp; bands <small>{counts("artists")}</small></button>
          <button type="button" className={chip(filter === "sounds")} aria-pressed={filter === "sounds"} onClick={() => setFilter("sounds")}>Sounds &amp; scenes <small>{counts("sounds")}</small></button>
          <button type="button" className={chip(filter === "stage")} aria-pressed={filter === "stage"} onClick={() => setFilter("stage")}>Musicals <small>{counts("stage")}</small></button>
          <button type="button" className={chip(filter === "episodes")} aria-pressed={filter === "episodes"} onClick={() => setFilter("episodes")}>Episodes <small>{musicEpisodes.length}</small></button>
          <button type="button" className={chip(filter === "clubs")} aria-pressed={filter === "clubs"} onClick={() => setFilter("clubs")}>Clubs <small>{clubsMentioned.length}</small></button>
        </div>

        {filter === "episodes" && (
          <div className="jbx-pols" role="group" aria-label="Pick an Afterparty">
            {musicEpisodes.map((e) => (
              <button key={e.id} type="button" className={`jbx-pol${episodeId === e.id ? " on" : ""}`} aria-pressed={episodeId === e.id} onClick={() => pickEpisode(e.id)} title={`Play the songs from ${e.guest}'s Afterparty`}>
                {episodePortraits[e.id] && <img src={episodePortraits[e.id]} alt="" loading="lazy" />}
                <span>S{e.season}E{e.episode}</span>
                <b>{e.guest.replace(/ aka .*/, "").replace(/^Jenny Dembrow$/, "Jenny Talia")}</b>
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
              <h2 className="jbx-ep-name">{ep.guest.replace(/ aka .*/, "").replace(/^Jenny Dembrow$/, "Jenny Talia")}</h2>
              <p className="jbx-ep-note">
                {list.length} song{list.length === 1 ? "" : "s"}, records and bands from the episode, in the order they come up. Take them with you:
              </p>
              <div className="jbx-ep-links">
                {episodeSpotifyUrl(ep.id) && (
                  <a href={episodeSpotifyUrl(ep.id)} target="_blank" rel="noopener noreferrer">♫ Spotify playlist ↗</a>
                )}
                {ep.youtubePlaylistUrl && (
                  <a href={ep.youtubePlaylistUrl} target="_blank" rel="noopener noreferrer">▶ YouTube playlist ↗</a>
                )}
                <Link to={episodePath(ep.id)}>The Afterparty →</Link>
              </div>
            </div>
          </div>
        )}

        {filter === "clubs" ? (
          <ClubsShelf />
        ) : filter === "episodes" && !episodeId ? (
          <p className="jbx-hint">Pick a polaroid: the jukebox plays that Afterparty&rsquo;s songs and shows its playlists.</p>
        ) : (
          <>
            <div className="jbx-pager">
              <button type="button" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} aria-label="Previous page">◀</button>
              <span>
                <b>{shown.length ? `${page * PAGE + 1}–${page * PAGE + shown.length}` : "-"}</b> of {list.length}
              </span>
              <button type="button" onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={page >= pages - 1} aria-label="Next page">▶</button>
            </div>
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
                if (sort === "timeline" && filter !== "episodes" && year && decade(year) !== prev)
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
                          dropped {it.mentions || 1}× · {filter === "episodes" ? "in" : "first in"} {m.code}{" "}
                          <Timestamp episodeId={m.episodeId} time={m.time} className="jbx-ts" />
                        </small>
                      )}
                    </div>
                  </li>,
                );
                return out;
              })}
            </ol>
            {pages > 1 && (
              <div className="jbx-pager bottom">
                <button type="button" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} aria-label="Previous page">◀</button>
                <span>
                  Page {page + 1} of {pages}
                </span>
                <button type="button" onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={page >= pages - 1} aria-label="Next page">▶</button>
              </div>
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

function VideoScreen({ item, onEnd, onFail }: { item: CollectionItem; onEnd: () => void; onFail: () => void }) {
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
    return () => {
      clearInterval(t);
      window.removeEventListener("message", onMsg);
    };
  }, []);
  const id = videoId(item)!;
  const origin = typeof window === "undefined" ? "" : `&origin=${encodeURIComponent(window.location.origin)}`;
  return (
    <iframe
      ref={frame}
      className="jbx-video"
      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&enablejsapi=1${origin}`}
      title={`${stripLabel(item).title} - video on YouTube`}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

type Controller = {
  loadUri: (uri: string) => void;
  play: () => void;
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
  useEffect(
    () => () => {
      ctrl.current = null;
    },
    [],
  );

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

function ClubsShelf() {
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
