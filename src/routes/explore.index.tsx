import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CATEGORIES,
  categoryMentions,
  entities,
  episodeShort,
  mentionsByEpisode,
  totalMentions,
} from "../data/entities";
import { LegalNote } from "../components/legal-links";
import { SiteFooter } from "@/components/site-footer";
import exploreHeader from "@/assets/explore-header.jpg";

export const Route = createFileRoute("/explore/")({
  head: () => ({
    meta: [
      { title: "Everything A–Z | Night Fever fan page" },
      { name: "description", content: "Every person, club, song, book, film and look mentioned around Night Fever - each with its very own card. Dive in!" },
      { property: "og:title", content: "Everything A–Z | Night Fever fan page" },
      { property: "og:description", content: "Every name, room and story from Night Fever, each with its own card. Pick one and dive in!" },
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
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative flex min-h-[420px] items-center overflow-hidden px-6 pb-12 pt-24 sm:min-h-[480px]">
        <img
          src={exploreHeader}
          alt=""
          width={1920}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Everything <span className="text-pink text-glow-pink">A–Z</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every person, room, song, book and look - each with its own card
            showing every story it turns up in. Pick a category and dive in!
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-8">
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} type="button" className={chip(c)} aria-pressed={cat === c} onClick={() => setCat(c)}>
              {c}
              <span className="ml-1 opacity-70">{categoryMentions[c] ?? 0}</span>
            </button>
          ))}
        </div>
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
          <SiteFooter />
</main>
  );
}
