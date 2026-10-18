// Site-wide search index: every card in Everything A–Z, every Afterparty episode and every page.
// Built from the same data the pages use (entities.ts, episodes.ts), so new episodes are searchable automatically.
// Loaded lazily by SiteSearch the first time someone opens search, so it never weighs down page loads.
import { entities, episodeShort } from "@/data/entities";
import { episodes, episodePath } from "@/data/episodes";
import { PAGES } from "@/components/site-menu";

export type SearchHit = {
  kind: "card" | "episode" | "page";
  title: string;
  sub: string;
  snippet?: string | undefined;
  to: string;
  params?: Record<string, string>;
};

type Item = Omit<SearchHit, "snippet"> & { key: string; texts: { text: string; norm: string; label: string }[] };

export const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’']/g, "'");

const items: Item[] = [
  ...PAGES.map((p) => ({ kind: "page" as const, title: p.label, sub: "Page", to: p.to, key: norm(p.label), texts: [] })),
  ...episodes.map((e) => ({
    kind: "episode" as const,
    title: `${e.guest}`,
    sub: `Season ${e.season} · Episode ${e.episode} · Afterparty`,
    to: episodePath(e.id),
    key: norm(`${e.guest} s${e.season}e${e.episode} season ${e.season} episode ${e.episode}`),
    texts: [{ text: e.blurb, norm: norm(e.blurb), label: `S${e.season}E${e.episode}` }],
  })),
  ...entities.map((en) => {
    const eps = [...new Set(en.refs.map((r) => r.episode).filter(Boolean))].map((id) => episodeShort(id as string));
    return {
      kind: "card" as const,
      title: en.name,
      sub: [en.guest ? "Night Fever guest" : en.category, eps.length ? eps.join(", ") : ""].filter(Boolean).join(" · "),
      to: "/explore/$slug",
      params: { slug: en.slug },
      key: norm([en.name, ...en.refs.map((r) => r.heard).filter((h) => h && h !== "—")].join(" | ")),
      texts: [
        ...en.refs.map((r) => ({ text: r.context, norm: norm(r.context), label: r.episode ? episodeShort(r.episode) : "" })),
        ...en.refs.filter((r) => r.fashion).map((r) => ({ text: r.fashion as string, norm: norm(r.fashion as string), label: "Fashion" })),
        ...en.events.map((ev) => ({ text: `${ev.year}: ${ev.title}`, norm: norm(`${ev.year} ${ev.title}`), label: "Timeline" })),
      ],
    };
  }),
];

function snippetOf(text: string, at: number, len: number) {
  const start = Math.max(0, at - 50);
  const end = Math.min(text.length, at + len + 70);
  return (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "");
}

/** Names first (starts-with beats contains), then mentions inside the stories, capped so the list stays readable. */
export function search(q: string, limit = 40): SearchHit[] {
  const nq = norm(q.trim());
  if (nq.length < 2) return [];
  const words = nq.split(/\s+/).filter(Boolean);
  const scored: { hit: SearchHit; score: number }[] = [];
  for (const it of items) {
    const name = norm(it.title);
    let score = 0;
    let snippet: string | undefined;
    if (name === nq) score = 100;
    else if (name.startsWith(nq)) score = 90;
    else if (new RegExp(`\\b${nq.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(name)) score = 80;
    else if (words.every((w) => it.key.includes(w))) score = 60;
    else {
      for (const t of it.texts) {
        if (words.every((w) => t.norm.includes(w))) {
          const w0 = words[0] ?? nq;
          const at = t.norm.indexOf(w0);
          snippet = (t.label ? `${t.label}: ` : "") + snippetOf(t.text, at, w0.length);
          score = 20;
          break;
        }
      }
    }
    if (!score) continue;
    if (it.kind === "page") score += 5;
    if (it.kind === "episode") score += 3;
    const { key: _k, texts: _t, ...hit } = it;
    scored.push({ hit: { ...hit, snippet }, score: score + Math.min(it.texts.length, 10) / 10 });
  }
  return scored.sort((a, b) => b.score - a.score || a.hit.title.localeCompare(b.hit.title)).slice(0, limit).map((s) => s.hit);
}

export const totalSearchable = items.length;
