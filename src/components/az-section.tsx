import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, entities } from "../data/entities";

const storyCount = (e: (typeof entities)[number]) =>
  e.refs.length + e.events.length + e.inGuestStories.length;

// The A–Z strip: every name on the site, one card each. Shown on the home page
// and on the connections page; the full list lives at /explore.
export function AzSection({ limit = 12 }: { limit?: number }) {
  const [cat, setCat] = useState("All");
  const shown = entities.filter((e) =>
    cat === "All"
      ? true
      : cat === "Fashion"
        ? e.refs.some((r) => r.fashion)
        : e.category === cat,
  );
  // In "All" the names with the most stories come first, so the strip leads with
  // the big recurring names instead of the first twelve lines of the A–Z list.
  const ordered =
    cat === "All"
      ? [...shown].sort(
          (a, b) => storyCount(b) - storyCount(a) || a.name.localeCompare(b.name),
        )
      : shown;
  const chip = (c: string) =>
    `rounded-full border px-3 py-1 text-xs font-medium transition ${
      cat === c
        ? "border-gold bg-gold text-gold-foreground"
        : "border-border bg-secondary text-secondary-foreground hover:text-pink"
    }`;

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-cream sm:text-4xl">
          Everything A&ndash;Z
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Every person, room, song, book and look &mdash; each with its own card
          showing every story it turns up in.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={chip(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.slice(0, limit).map((e) => {
            const n = storyCount(e);
            return (
              <li key={e.slug}>
                <Link
                  to="/explore/$slug"
                  params={{ slug: e.slug }}
                  className="block rounded-xl border border-border bg-card p-4 transition hover:border-gold/50"
                >
                  <span className="block font-semibold text-gold">
                    {e.name}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {e.guest ? "Night Fever guest" : e.category}
                    {" · "}
                    {n} {n === 1 ? "story" : "stories"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {cat === "All"
            ? `${shown.length} cards in total`
            : `${shown.length} ${cat.toLowerCase()} cards of ${shown.length === entities.length ? "" : entities.length}`}
        </p>
        <div className="mt-6 text-center">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-xl border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            See the full A&ndash;Z &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
