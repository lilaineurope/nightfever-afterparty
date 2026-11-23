// Server side of the A–Z card page (page weight, 16 Nov 2026): loads the whole A–Z, works out what one card shows and
// every name -> card answer its links need, and sends just that (CardView, src/lib/card-view.ts). Only the server and
// the server function in card-view.functions.ts load this file.
import { notFound, redirect } from "@tanstack/react-router";
import { afterpartyOf, entityBySlug, SAME_AS, slugify, episodeShort, isThinCard, relatedTo, type Entity } from "@/data/entities";
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
import type { CardView, ClubPartsView } from "@/lib/card-view";
import { mentorTreeOf } from "@/lib/mentor-rank";
import { connectorRank } from "@/lib/connector-rank";
import { libraryItemView, storyView } from "@/lib/library-item.server";
import { placeView } from "@/lib/place-view.server";
import { worksOf } from "@/lib/works";
import { coverFor } from "@/data/library-covers";

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

  mem?.liftedUp.forEach(L.name);
  mem?.rooms.forEach(L.name);
  club?.stage.forEach(L.name);
  club?.rooms.forEach(L.name);
  const parts = g ? null : clubPartsView(e);
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
  // "<first>'s work" (Lisa, 22 Nov 2026): every person card lists what they made, linking to each work's own page.
  const works = e.category === "Person" ? worksOf(e.slug, (n) => (coverFor(n)?.kind === "book" ? coverFor(n)!.src : undefined)) : [];
  for (const w of works) if (w.slug) L.card(w.slug);
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
    music: j ? { name: j.name, shelf: j.shelf, spotify: j.spotify } : null,
    night: clubNightFor(e.slug) ?? null,
    mem,
    club,
    parts,
    pic,
    profile,
    diary,
    column,
    tree,
    item,
    // Songs, bands, albums and clubs a guest made are not on the Library shelves, but get "The story" too (Lisa, 23 Nov 2026).
    story: item ? null : storyView(e),
    place,
    works,
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
    club: !e.guest && club ? { story: club.story, address: club.address, opened: club.opened, closed: club.closed, portrait: !!club.portrait } : null,
    mem: !e.guest && mem ? { born: mem.born, died: mem.died, aka: mem.aka ?? null, story: mem.story, wikidata: mem.wikidata ?? null } : null,
    portrait: !!PERSON_PORTRAITS[e.slug],
    view: cardView(e),
  };
}
