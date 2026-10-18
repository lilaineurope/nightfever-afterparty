import { entities, entityFor, totalMentions, type Entity } from "@/data/entities";
import { episodes } from "@/data/episodes";
import { sceneEvents } from "@/data/scene";
import { guests } from "@/data/guests";

// Pub quiz questions generated only from the published episode indexes.

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  explain: string;
  slug: string;
};

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

const spoken = (e: Entity) =>
  e.refs.filter((r) => r.mentions > 0 && r.time && r.time !== "On camera");

const pool = entities.filter((e) => spoken(e).length > 0);
const guestOf = new Map(episodes.map((ep) => [ep.id, ep.guest]));

function pick<T>(arr: T[], r: () => number): T {
  return arr[Math.floor(r() * arr.length)]!;
}
function shuffle<T>(arr: T[], r: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function maskName(text: string, name: string) {
  const core = name.replace(/\s*\([^)]*\)/g, "").trim();
  const parts = [core, ...core.split(/\s+/).filter((w) => w.length > 3)];
  let out = text;
  for (const p of parts) {
    out = out.replace(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "_____");
  }
  return out;
}

type Maker = (r: () => number, i: number) => QuizQuestion | null;

const makers: Maker[] = [
  // Which episode?
  (r, i) => {
    const single = pool.filter((e) => new Set(spoken(e).map((x) => x.episode)).size === 1);
    const e = pick(single, r);
    const ref = spoken(e)[0]!;
    const answer = guestOf.get(ref.episode!)!;
    return {
      id: `ep-${i}-${e.slug}`,
      prompt: `In which guest's episode does "${e.name}" come up?`,
      options: shuffle([...guestOf.values()], r),
      answer,
      explain: `${e.name} is mentioned in the ${answer} episode at ${ref.time}.`,
      slug: e.slug,
    };
  },
  // Category
  (r, i) => {
    const e = pick(pool, r);
    const cats = [...new Set(pool.map((x) => x.category))].filter((c) => c !== e.category);
    const options = shuffle([e.category, ...shuffle(cats, r).slice(0, 3)], r);
    return {
      id: `cat-${i}-${e.slug}`,
      prompt: `"${e.name}" - is it a…`,
      options,
      answer: e.category,
      explain: `${e.name} is filed under ${e.category}.`,
      slug: e.slug,
    };
  },
  // Who is mentioned more?
  (r, i) => {
    const people = pool.filter((e) => e.category === "Person");
    const a = pick(people, r);
    const b = pick(people.filter((p) => totalMentions(p) !== totalMentions(a)), r);
    const winner = totalMentions(a) > totalMentions(b) ? a : b;
    return {
      id: `more-${i}-${a.slug}-${b.slug}`,
      prompt: `Across all published episodes, who gets mentioned more often?`,
      options: [a.name, b.name],
      answer: winner.name,
      explain: `${a.name}: ${totalMentions(a)} mentions · ${b.name}: ${totalMentions(b)} mentions.`,
      slug: winner.slug,
    };
  },
  // Fill the blank from context
  (r, i) => {
    const withContext = pool.filter((e) =>
      spoken(e).some((x) => x.context && x.context.length > 30 && x.context.toLowerCase().includes(e.name.split(" ")[0]!.toLowerCase()) === false),
    );
    const e = pick(withContext.length ? withContext : pool, r);
    const ref = spoken(e).find((x) => x.context)!;
    if (!ref) return null;
    const same = pool.filter((x) => x.category === e.category && x.slug !== e.slug);
    const options = shuffle([e.name, ...shuffle(same, r).slice(0, 3).map((x) => x.name)], r);
    return {
      id: `ctx-${i}-${e.slug}`,
      prompt: `Who or what is this? "${maskName(ref.context, e.name)}"`,
      options,
      answer: e.name,
      explain: `It's ${e.name} - ${guestOf.get(ref.episode!)} episode, ${ref.time}.`,
      slug: e.slug,
    };
  },
];

// Story questions: about the nights, clubs, people and events themselves.
const linked = sceneEvents
  .map((ev) => ({ ev, ents: ev.figures.map((f) => entityFor(f)).filter((x): x is Entity => !!x) }))
  .filter((x) => x.ents.length > 0);

const storyMakers: Maker[] = [
  // Story clue → who/what (from what's said in the episodes)
  makers[3]!,
  // What year?
  (r, i) => {
    const { ev, ents } = pick(linked, r);
    const years = new Set<number>([ev.year]);
    while (years.size < 4) years.add(ev.year + Math.round((r() - 0.5) * 16));
    return {
      id: `yr-${i}-${ev.id}`,
      prompt: `When did this happen? "${ev.title}"`,
      options: [...years].sort((a, b) => a - b).map(String),
      answer: String(ev.year),
      explain: `${ev.when} - ${ev.text}`,
      slug: ents[0]!.slug,
    };
  },
  // Where did it happen?
  (r, i) => {
    const located = linked.filter(({ ev }) => ev.place.trim().length > 0);
    if (!located.length) return null;
    const { ev, ents } = pick(located, r);
    const others = shuffle([...new Set(sceneEvents.map((x) => x.place))].filter((p) => p.trim().length > 0 && p !== ev.place), r).slice(0, 3);
    return {
      id: `where-${i}-${ev.id}`,
      prompt: `Where did this happen? "${ev.title}"`,
      options: shuffle([ev.place, ...others], r),
      answer: ev.place,
      explain: ev.text,
      slug: ents[0]!.slug,
    };
  },
  // Which guest is this?
  (r, i) => {
    const g = pick(guests, r);
    const others = shuffle(guests.filter((x) => x.slug !== g.slug), r).slice(0, 3);
    return {
      id: `guest-${i}-${g.slug}`,
      prompt: `Which Night Fever guest is this? "${maskName(g.tagline, g.name)}"`,
      options: shuffle([g.name, ...others.map((x) => x.name)], r),
      answer: g.name,
      explain: `${g.name} - ${g.now}`,
      slug: g.slug,
    };
  },
  // Who was in the story?
  (r, i) => {
    const { ev, ents } = pick(linked, r);
    const e = pick(ents, r);
    const absent = shuffle(
      pool.filter((p) => p.category === "Person" && !ev.figures.includes(p.name) && !ev.text.includes(p.name)),
      r,
    ).slice(0, 3);
    return {
      id: `who-${i}-${ev.id}-${e.slug}`,
      prompt: `Who was part of this story? "${maskName(ev.text, e.name)}"`,
      options: shuffle([e.name, ...absent.map((x) => x.name)], r),
      answer: e.name,
      explain: `${e.name} - ${ev.when}${ev.place ? `, ${ev.place}` : ""}.`,
      slug: e.slug,
    };
  },
];

// Mostly story questions; an episode-trivia question only now and then.
const episodeMakers: Maker[] = [makers[0]!, makers[1]!, makers[2]!];

export function generateQuiz(seed: number, count = 10): QuizQuestion[] {
  const r = rng(seed);
  const out: QuizQuestion[] = [];
  const seen = new Set<string>();
  let guard = 0;
  while (out.length < count && guard++ < 400) {
    const fromEpisodes = r() < 0.1;
    const q = fromEpisodes ? pick(episodeMakers, r)(r, out.length) : pick(storyMakers, r)(r, out.length);
    if (!q || seen.has(q.id.split("-").slice(2).join("-")) || new Set(q.options).size !== q.options.length) continue;
    seen.add(q.id.split("-").slice(2).join("-"));
    out.push(q);
  }
  return out;
}
