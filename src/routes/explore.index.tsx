import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CATEGORIES,
  categoryMentions,
  categoryMentionsByEpisode,
  entities,
  episodeShort,
  mentionsByEpisode,
  totalMentions,
} from "../data/entities";
import { episodes } from "../data/episodes";
import { LegalNote } from "../components/legal-links";

export const Route = createFileRoute("/explore/")({
  head: () => ({
    meta: [
      { title: "Everything A–Z — Night Fever fan page" },
      { name: "description", content: "Every person, club, song, book, film and look mentioned around Night Fever, each with one overview card." },
      { property: "og:title", content: "Everything A–Z — Night Fever fan page" },
      { property: "og:description", content: "Every name, room and story from Night Fever, linked to one overview card each." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/explore" }],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const [cat, setCat] = useState<string>("All");
  const shown = entities.filter((e) =>
    cat === "All" ? true : cat === "Fashion" ? e.refs.some((r) => r.fashion) : e.category === cat,
  );
  const chip = (c: string) =>
    `rounded-full border px-3 py-1 text-xs font-medium transition ${
      cat === c ? "border-gold bg-gold text-gold-foreground" : "border-border bg-secondary text-secondary-foreground hover:text-pink"
    }`;
  // "S6E1 336 · S1E1 293" — how one category's mentions split per episode
  const split = (c: string) => {
    const by = categoryMentionsByEpisode[c] ?? {};
    return episodes
      .filter((ep) => (by[ep.id] ?? 0) > 0)
      .map((ep) => `${episodeShort(ep.id)} ${by[ep.id]}`)
      .join(" · ");
  };
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center text-5xl font-bold tracking-tight text-cream text-glow">Everything A–Z</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Every person, room, song, book and look — each with its own card showing every story it turns up in.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} type="button" className={chip(c)} aria-pressed={cat === c} onClick={() => setCat(c)}>
              {c}
              <span className="ml-1 opacity-70">{categoryMentions[c] ?? 0}</span>
            </button>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-muted-foreground">
          Chip numbers are counted across all episodes
          {split(cat) && (
            <>
              {" — per episode: "}
              <span className="text-gold">{split(cat)}</span>
            </>
          )}
        </p>
        <p className="mt-3 text-center text-xs text-muted-foreground">{shown.length} cards</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((e) => {
            const n = e.refs.length + e.events.length + e.inGuestStories.length;
            const m = totalMentions(e);
            const per = mentionsByEpisode(e);
            return (
              <li key={e.slug}>
                <Link to="/explore/$slug" params={{ slug: e.slug }}
                  className="block rounded-xl border border-border bg-card p-4 transition hover:border-gold/50">
                  <span className="block font-semibold text-gold">{e.name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {e.guest ? "Night Fever guest" : e.category}
                    {" · "}
                    {n} {n === 1 ? "story" : "stories"}
                    {m > 0 ? ` · ${m} ${m === 1 ? "mention" : "mentions"} across all episodes` : ""}
                  </span>
                  {per.length > 0 && (
                    <span className="mt-1 block text-[11px] text-muted-foreground/70">
                      per episode: {per.map((p) => `${episodeShort(p.episode)} ${p.count}`).join(" · ")}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
          <footer className="border-t border-border px-6 py-10 text-center">
        <LegalNote />
      </footer>

</main>
  );
}
