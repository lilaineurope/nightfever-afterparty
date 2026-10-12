import { entities, totalMentions, type Entity } from "@/data/entities";
import { episodes } from "@/data/episodes";

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
      prompt: `"${e.name}" — is it a…`,
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
      explain: `It's ${e.name} — ${guestOf.get(ref.episode!)} episode, ${ref.time}.`,
      slug: e.slug,
    };
  },
];

export function generateQuiz(seed: number, count = 10): QuizQuestion[] {
  const r = rng(seed);
  const out: QuizQuestion[] = [];
  const seen = new Set<string>();
  let guard = 0;
  while (out.length < count && guard++ < 200) {
    const q = makers[out.length % makers.length]!(r, out.length);
    if (!q || seen.has(q.slug) || new Set(q.options).size !== q.options.length) continue;
    seen.add(q.slug);
    out.push(q);
  }
  return out;
}
