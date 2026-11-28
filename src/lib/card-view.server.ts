// Server side of the A–Z card page (page weight, 16 Nov 2026): loads the whole A–Z, works out what one card shows and
// every name -> card answer its links need, and sends just that (CardView, src/lib/card-view.ts). Only the server and
// the server function in card-view.functions.ts load this file.
import { notFound, redirect } from "@tanstack/react-router";
import { afterpartyOf, entityBySlug, entityFor, SAME_AS, slugify, episodeShort, isThinCard, relatedTo, type Entity } from "@/data/entities";
import { namedOn } from "@/lib/name-links";
import { jukebox } from "@/data/collections";
import { clubNightFor } from "@/data/club-nights";
import { MEMORIAM } from "@/data/memoriam";
import { CLUB_PROFILES } from "@/data/club-profiles";
import { CLUB_PARTS } from "@/data/club-parts";
import { PERSON_PORTRAITS } from "@/data/person-portraits";
import { PERSON_PROFILES } from "@/data/person-profiles";
import { DIARY_PAGES } from "@/data/diaries";
import { COLUMN_PAGES } from "@/data/column-articles";
import { polaroidThumb } from "@/lib/polaroids";
import { episodeIdOf, episodePath, episodes } from "@/data/episodes";
import { GUEST_LINES } from "@/data/guest-lines";
import { cleanStory } from "@/lib/seo";
import { linkRecorder } from "@/lib/link-recorder.server";
import type { CardView, ClubCrowdView, ClubLibraryView, ClubPartsView } from "@/lib/card-view";
import { mentorTreeOf } from "@/lib/mentor-rank";
import { connectorRank } from "@/lib/connector-rank";
import { libraryItemView, storyView } from "@/lib/library-item.server";
import { placeView } from "@/lib/place-view.server";
import { mapSectionOf, roomsMapOf } from "@/lib/map-view.server";
import { worksOf } from "@/lib/works";
import { tapesOf } from "@/lib/tapes.server";
import { allCovers, coverFor } from "@/data/library-covers";
import { storyPagesFor } from "@/lib/story-links.server";
import { CLUB_TICKETS } from "@/data/club-tickets";
import { CLUB_PIECES, coverArt, clubPieceFacts } from "@/data/cover-art";
import { CLUB_READING } from "@/data/club-reading";
import { bookClub } from "@/data/collections";
import { coverDesign, KIND as COVER_KIND } from "@/lib/cover-design";

/** The picture on a work in "<first>'s work": the Library cover of a book, else - for a club they opened or ran (Lisa,
 *  27 Nov 2026: "cover for xenon") - the club's period ticket or poster, else its polaroid from the club page. */
const workCover = (n: string): string | undefined => {
  const c = coverFor(n);
  if (c?.kind === "book") return c.src;
  const s = slugify(n);
  return CLUB_TICKETS[s]?.src ?? CLUB_PROFILES[s]?.portrait?.polaroid;
};
/** A magazine or paper with only a masthead in the Library shows its logo on the typed cover. */
const workLogo = (n: string): string | undefined => {
  const c = coverFor(n);
  return c?.kind === "mast" ? c.src : undefined;
};

/** The picture for a name in a story box (Lisa, 27 Nov 2026: make the pages "sticky"): the person's polaroid, their
 *  AFTERPARTY polaroid, the club's polaroid or ticket, the diary keeper's polaroid, else a Library cover. Names without
 *  one stay plain chips. */
type Face = { src: string; framed?: boolean; mast?: "light" | "dark" };
const faceOf = (n: string): Face | undefined => {
  const e = entityFor(n);
  const s = e?.slug ?? slugify(n);
  const ep = afterpartyOf(e);
  const diary = DIARY_PAGES[s];
  // Person and club polaroids are whole polaroid cards (photo at 40-680 px of a 720 x 892 card): the pile shows the photo part.
  const framed = PERSON_PORTRAITS[s]?.polaroid ?? CLUB_PROFILES[s]?.portrait?.polaroid;
  if (framed && PERSON_PORTRAITS[s]) return { src: framed, framed: true };
  const flat =
    (ep ? polaroidThumb(ep, 240) : undefined) ??
    (framed ? undefined : CLUB_TICKETS[s]?.src) ??
    (diary?.keeperEpisode ? polaroidThumb(diary.keeperEpisode, 240) : undefined);
  if (flat) return { src: flat };
  if (framed) return { src: framed, framed: true };
  // A magazine's masthead is a wide logo: shown whole on paper (Lisa, 28 Nov 2026: Details "needs ... its own logo
  // displayed on the box"), not cropped to a square. A cover with a slugified name ("Nations (Chi Chi Valenti, Details)" is the
  // Nations card) is found by its slug.
  const cover = coverFor(n) ?? coverBySlug(s);
  if (!cover) return undefined;
  return cover.kind === "mast" ? { src: cover.src, mast: cover.light ? "dark" : "light" } : { src: cover.src };
};
let slugCovers: Map<string, ReturnType<typeof coverFor>> | undefined;
const coverBySlug = (s: string) => {
  slugCovers ??= new Map(allCovers().map(([name, c]) => [slugify(name), c]));
  return slugCovers.get(s);
};
const facesOf = (names: string[]): Record<string, Face> =>
  Object.fromEntries(names.flatMap((n) => {
    const f = faceOf(n);
    return f ? [[n, f]] : [];
  }));

/** "Who else was there" on a club page (Lisa, 27 Nov 2026, W1): every guest who talks about the club with their biggest
 *  moment (most mentions first), the regulars - people whose own page (living or In memoriam) lists the club as one of their
 *  rooms, minus those already on its stage - and who made or is named on its posters (CLUB_PIECES). */
function clubCrowdOf(e: Entity, stage: string[]): ClubCrowdView {
  const best = new Map<string, { time: string; context: string; mentions: number; total: number }>();
  for (const r of e.refs) {
    if (!r.episode) continue;
    const b = best.get(r.episode);
    const total = (b?.total ?? 0) + r.mentions;
    if (!b || r.mentions > b.mentions) best.set(r.episode, { time: r.time, context: r.context, mentions: r.mentions, total });
    else b.total = total;
  }
  const told = [...best]
    .sort((a, b) => b[1].total - a[1].total)
    .map(([id, b]) => {
      const ep = episodes.find((x) => x.id === id)!;
      return { episode: id, code: episodeShort(id), guest: ep.guest, time: b.time, context: b.context, mentions: b.total, pol: polaroidThumb(id, 240) };
    });
  const onStage = new Set(stage.map((n) => entityFor(n)?.slug ?? slugify(n)));
  const regulars = [...Object.entries(PERSON_PROFILES), ...Object.entries(MEMORIAM)]
    .filter(([s, p]) => !onStage.has(s) && p.rooms.some((r) => entityFor(r)?.slug === e.slug))
    .map(([s]) => entityBySlug[s]?.name)
    .filter((n): n is string => !!n);
  const posters: { name: string; role: string }[] = [];
  for (const which of ["ticket", "jukebox"]) {
    const f = CLUB_PIECES[`${e.slug}:${which}`];
    if (!f) continue;
    for (const m of f.madeBy) posters.push({ name: m.name, role: m.role });
    for (const n of f.onIt) if (n !== e.name) posters.push({ name: n, role: "On the poster" });
  }
  const seen = new Set<string>();
  return { told, regulars: [...new Set(regulars)], posters: posters.filter((p) => !seen.has(p.name) && seen.add(p.name)) };
}

/** "The poster + read about it" on a club page (Lisa, 27 Nov 2026, L2). */
function clubLibraryOf(e: Entity): ClubLibraryView | null {
  const posters = coverArt
    .filter((it) => it.shelf === "club-pieces" && it.slug === e.slug && it.art)
    .map((it) => {
      const f = clubPieceFacts(it);
      const a = it.art!;
      return { page: a.page, src: a.src, alt: a.alt, piece: a.piece, credit: a.credit, w: a.w, h: a.h, forWhat: f?.forWhat, date: f?.date, madeBy: f?.madeBy ?? [], onIt: (f?.onIt ?? []).filter((n) => n !== e.name) };
    });
  const reads = (CLUB_READING[e.slug] ?? []).flatMap((r, i) => {
    const it = bookClub.find((b) => b.name === r.name);
    const m = it?.moments.find((x) => x.episodeId === r.episode && x.time === r.time);
    if (!it || !m) return [];
    return [{ slug: it.slug, name: it.name, kind: COVER_KIND[it.shelf] ?? it.shelf, design: coverDesign(it, i), episode: m.episodeId, code: m.code, guest: m.guest, time: m.time, context: m.context }];
  });
  return posters.length || reads.length ? { posters, reads } : null;
}

/** A club's theme nights and parties (src/data/club-parts.ts) with their episode rows, biggest first inside a tile. */
function clubPartsView(e: Entity): ClubPartsView | null {
  const p = CLUB_PARTS[e.slug];
  if (!p) return null;
  const rowsOf = (names: string[]) =>
    e.refs.filter((r) => names.includes(r.name)).sort((a, b) => b.mentions - a.mentions);
  const groups = p.groups
    .map((g) => ({
      heading: g.heading,
      intro: rowsOf(g.intro ?? []),
      parts: g.parts.map((x) => ({ title: x.title, refs: rowsOf(x.names) })).filter((x) => x.refs.length > 0),
    }))
    .filter((g) => g.parts.length > 0 || g.intro.length > 0);
  const names = p.groups.flatMap((g) => [...(g.intro ?? []), ...g.parts.flatMap((x) => x.names)]);
  return { groups, looks: p.looks ?? [], names };
}

/** What the card page shows (mirrors src/components/card-sections.tsx, memoriam.tsx and club-profile.tsx). */
function cardView(e: Entity): CardView {
  const g = e.guest;
  const club = g ? null : (CLUB_PROFILES[e.slug] ?? null);
  const mem = g ? null : (MEMORIAM[e.slug] ?? null);
  const pic = g ? null : (PERSON_PORTRAITS[e.slug] ?? club?.portrait ?? null);
  const profile = g || club || mem ? null : (PERSON_PROFILES[e.slug] ?? null);
  const L = linkRecorder();
  const diaryPage = g ? undefined : DIARY_PAGES[e.slug];
  const diary = diaryPage
    ? { ...diaryPage, polaroid: diaryPage.keeperEpisode ? polaroidThumb(diaryPage.keeperEpisode, 512) : PERSON_PORTRAITS[slugify(diaryPage.keeper)]?.polaroid }
    : null;
  if (diary) L.name(diary.keeper);
  // Column pages: every piece under the column, each linking to where it can be read (Lisa, 21 Nov 2026).
  const column = g ? null : (COLUMN_PAGES[e.slug] ?? null);
  if (column) {
    L.name(column.writer.replace(/\s*\(.*\)$/, ""));
    for (const a of column.articles) L.text(a.title, e.name);
    L.text(column.about, e.name);
  }

  // Stories and timelines link the names in them (A6, Lisa 27 Nov 2026): record those links for the page.
  for (const t of [club?.story, mem?.story, profile?.story, diaryPage?.story, ...(club?.timeline ?? []).map((x) => x[1]), ...(mem?.timeline ?? []).map((x) => x[1]), ...(profile?.timeline ?? []).map((x) => x[1])])
    if (t) L.text(t, e.name);
  for (const n of [...(club?.also?.names ?? []), ...(mem?.also?.names ?? []), ...(profile?.also?.names ?? [])]) L.name(n);
  mem?.liftedUp.forEach(L.name);
  mem?.rooms.forEach(L.name);
  club?.stage.forEach(L.name);
  club?.rooms.forEach(L.name);
  const parts = g ? null : clubPartsView(e);
  const crowd = club ? clubCrowdOf(e, club.stage) : null;
  if (crowd) {
    crowd.regulars.forEach(L.name);
    crowd.posters.forEach((p) => L.name(p.name));
  }
  const clubLib = club ? clubLibraryOf(e) : null;
  if (clubLib) {
    for (const r of clubLib.reads) L.card(r.slug);
    for (const p of clubLib.posters) [...p.madeBy.map((m) => m.name), ...p.onIt].forEach(L.name);
  }
  parts?.looks.forEach(L.name);
  profile?.liftedUp.forEach(L.name);
  profile?.rooms.forEach(L.name);
  if (g) {
    g.scenes.forEach(L.name);
    for (const s of g.linkedTo) {
      L.name(s);
      L.card(s);
    }
  }
  for (const r of e.refs) {
    L.text(r.context, e.name);
    if (r.fashion) L.text(r.fashion, e.name);
  }
  for (const ev of e.events) {
    L.name(ev.place.split(",")[0]!);
    for (const p of ev.people) {
      L.name(p);
      L.card(p);
    }
    ev.figures.forEach(L.name);
  }
  const named = namedOn(e).map((x) => {
    L.card(x.entity.slug);
    return { slug: x.entity.slug, name: x.entity.name, episode: x.ref.episode, short: x.ref.episode ? episodeShort(x.ref.episode) : undefined };
  });
  const inGuestStories = e.inGuestStories.map((x) => {
    L.name(x.slug);
    return { slug: x.slug, name: x.name };
  });
  // Two-way story links (A6): the club, In memoriam, person and diary pages whose story names this card.
  const onPages = storyPagesFor(e.slug).map((x) => {
    L.card(x.slug);
    return x;
  });
  const related = relatedTo(e).map((x) => {
    L.card(x.slug);
    return { slug: x.slug, name: x.name };
  });
  // Library item pages (Lisa, 21 Nov 2026): cover, facts, who dropped it, connections, trailers, find/borrow/buy.
  const item = g ? null : libraryItemView(e);
  if (item) {
    if (item.facts?.author) L.text(item.facts.author, e.name);
    if (item.madeSince) L.text(item.madeSince.why, e.name);
    for (const c of item.connections) L.card(c.slug);
    for (const m of item.shelfMates) L.card(m.slug);
    for (const c of item.credits) if (c.slug) L.card(c.slug);
    for (const x of [...(item.press?.by ?? []), ...(item.press?.team ?? [])]) if (x.slug) L.card(x.slug);
  }
  // Place pages (Lisa, 22 Nov 2026): every Location card gets the drawn map header and the guests who talk about it.
  const place = e.category === "Location" && !g && !club && !mem && !profile && !item && !diary && !column ? placeView(e) : null;
  if (place) {
    for (const n of place.near) L.card(n.slug);
    for (const p of place.map?.pins ?? []) L.card(p.slug);
  }
  // The map on club and event pages ("Around the block", Lisa 27 Nov 2026) and on living-people pages (their rooms).
  const section = g || mem ? null : mapSectionOf(e);
  const mapBand = section && "band" in section ? section.band : null;
  const mapHome = section && "home" in section ? section.home : null;
  if (mapBand) {
    if (mapBand.pin.slug) L.card(mapBand.pin.slug);
    for (const n of mapBand.near) L.card(n.slug);
    for (const p of mapBand.map.pins) L.card(p.slug);
    for (const x of [...mapBand.here, ...mapBand.nextDoor]) L.card(x.slug);
  }
  const rooms = profile ? roomsMapOf(profile, e.name) : null;
  if (rooms) for (const x of [...rooms.stops, ...rooms.home, ...rooms.away]) L.card(x.slug);
  // "<first>'s work" (Lisa, 22 Nov 2026): every person card lists what they made, linking to each work's own page.
  const works = e.category === "Person" ? worksOf(e.slug, workCover) : [];
  for (const w of works) if (!w.cover && w.slug) w.logo = workLogo(w.coverName ?? w.name);
  for (const w of works) if (w.slug) L.card(w.slug);
  const tapes = e.category === "Person" ? tapesOf(e.name) : [];
  const j = jukebox.find((x) => x.slug === e.slug);
  const tree = mentorTreeOf(e.slug);
  if (tree) {
    L.name(tree.name);
    for (const k of tree.kids) {
      L.name(k.name.replace(/ \(as heard\)$/, ""));
      for (const g of k.grand) L.name(g.name.replace(/ \(as heard\)$/, ""));
    }
  }

  return {
    slug: e.slug,
    name: e.name,
    category: e.category,
    link: e.link,
    guest: g ? g.slug : null,
    refs: e.refs,
    events: e.events,
    named,
    inGuestStories,
    related,
    onPages,
    music: j ? { name: j.name, shelf: j.shelf, spotify: j.spotify } : null,
    night: clubNightFor(e.slug) ?? null,
    mem,
    club,
    parts,
    crowd,
    clubLib,
    pic,
    profile,
    diary,
    column,
    tree,
    item,
    // Songs, bands, albums and clubs a guest made are not on the Library shelves, but get "The story" too (Lisa, 23 Nov 2026).
    story: item ? null : storyView(e, true),
    place,
    mapBand,
    mapHome,
    rooms,
    works,
    tapes,
    faces: facesOf([
      ...(profile ? [...profile.liftedUp, ...profile.rooms, ...(profile.also?.names ?? [])] : []),
      ...(mem ? [...mem.liftedUp, ...mem.rooms, ...(mem.also?.names ?? [])] : []),
      ...(club ? [...club.stage, ...club.rooms, ...(club.also?.names ?? [])] : []),
      ...(crowd ? [...crowd.regulars, ...crowd.posters.map((p) => p.name)] : []),
      // The A–Z lists under the card show picture boxes too (Lisa, 28 Nov 2026).
      ...named.map((x) => x.name),
      ...inGuestStories.map((x) => x.name),
      ...onPages.map((x) => x.name),
      ...related.map((x) => x.name),
    ]),
    connector: connectorRank(e.slug),
    links: L.data,
  };
}

/** "Season 1, Episode 6" -> the episode id, code, guest line and AFTERPARTY page (when there is one) for the Person markup. */
function guestFacts(episode: string, tagline: string) {
  const id = episodeIdOf(episode);
  const ep = id ? episodes.find((x) => x.id === id) : undefined;
  return { id, code: id.toUpperCase(), tagline, line: GUEST_LINES[id] ?? null, path: ep ? episodePath(ep.id) : null };
}

/** The card page's loader data: the head's facts plus the CardView. Throws the redirects and the 404 the page had before. */
export function cardPageData(slug: string) {
  const e = entityBySlug[slug];
  if (!e) {
    // /explore/CBGB or /explore/Studio-54 (typed or shared with capitals) finds the card instead of a 404.
    const lower = slug.toLowerCase();
    if (lower !== slug && entityBySlug[lower]) throw redirect({ to: "/explore/$slug", params: { slug: lower }, statusCode: 301 });
    // A merged card ("Paper magazine" is now "Paper") keeps its old address working.
    const merged = SAME_AS[lower];
    if (merged && entityBySlug[merged]) throw redirect({ to: "/explore/$slug", params: { slug: merged }, statusCode: 301 });
    throw notFound();
  }
  // One page per guest (Lisa, 1 Nov 2026): a guest with an AFTERPARTY lives on the episode page; old links forward there.
  const ep = afterpartyOf(e);
  if (ep) throw redirect({ to: episodePath(ep), statusCode: 301 });
  // The first story line that still says something once research notes are left out ("Likewise" alone doesn't).
  const lines = [...e.refs.map((r) => r.context), ...e.events.map((ev) => ev.text)].filter((t): t is string => !!t);
  // A club page leads with its own story (Lisa, 13 Nov 2026) - CBGB's first line was a guest saying she skipped it.
  const club = CLUB_PROFILES[e.slug];
  const mem = MEMORIAM[e.slug];
  const profile = club || mem ? undefined : PERSON_PROFILES[e.slug];
  const story = club?.story ?? profile?.story ?? DIARY_PAGES[e.slug]?.story ?? lines.find((t) => cleanStory(t)) ?? lines[0] ?? "";
  return {
    slug: e.slug,
    name: e.name,
    category: e.guest ? "Night Fever guest" : e.category,
    rawCategory: e.guest ? "Person" : e.category,
    episodes: [...new Set(e.refs.map((r) => r.episode).filter(Boolean))].map((id) => episodeShort(id as string)),
    story,
    link: e.link ?? "",
    thin: isThinCard(e),
    guest: e.guest ? guestFacts(e.guest.episode, e.guest.tagline) : null,
    // In memoriam and club pages (not guests) get their own head (SEO check, 16 Nov 2026): the facts it needs travel here.
    club: !e.guest && club ? { story: club.story, address: club.address, opened: club.opened, closed: club.closed, portrait: !!club.portrait, aka: club.aka ?? null, city: club.city ?? null, country: club.country ?? null } : null,
    mem: !e.guest && mem ? { born: mem.born, died: mem.died, aka: mem.aka ?? null, story: mem.story, wikidata: mem.wikidata ?? null } : null,
    portrait: !!PERSON_PORTRAITS[e.slug],
    view: cardView(e),
  };
}
