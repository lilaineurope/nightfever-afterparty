import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EntityLink } from "../components/entity-link";
import { guestBySlug, WOW_URL } from "../data/guests";
import { decades, sceneEvents } from "../data/scene";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";
import { GuestsSection } from "../components/guests-section";

export const Route = createFileRoute("/timeline")({
  component: TimelinePage,
  head: () => ({
    meta: [
      { title: "Timeline & Guests — 1970s to Today, Club by Club" },
      {
        name: "description",
        content:
          "A year-by-year timeline of the nightlife scene behind Night Fever — CBGB, Studio 54, Danceteria, Limelight, Wigstock, Drag Race — with every guest's career timeline, what they are doing now and their episode.",
      },
      {
        property: "og:title",
        content: "Nightlife Timeline — 1970s to Today, Club by Club",
      },
      {
        property: "og:description",
        content:
          "Fifty years of clubs, records and scandals, with the Night Fever guests marked in every scene.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/timeline" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/timeline" }],
  }),
});

function TimelinePage() {
  const [decade, setDecade] = useState<string>("all");

  const sorted = useMemo(
    () => [...sceneEvents].sort((a, b) => a.year - b.year),
    [],
  );
  const shown = useMemo(
    () => (decade === "all" ? sorted : sorted.filter((e) => e.decade === decade)),
    [sorted, decade],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-12 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            to="/connections"
            className="text-xs font-medium uppercase tracking-[0.2em] text-gold transition hover:text-pink"
          >
            &larr; The connection web
          </Link>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Fifty years of{" "}
            <span className="text-pink text-glow-pink">one long night</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The doors that opened, the records that broke, the scandals that
            closed rooms for good &mdash; and which of the guests was standing
            there when it happened.
          </p>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2">
          {["all", ...decades].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDecade(d)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                decade === d
                  ? "border-pink bg-pink/15 text-pink"
                  : "border-border bg-secondary text-secondary-foreground hover:border-gold/50"
              }`}
            >
              {d === "all" ? "Everything" : d}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 py-14">
        <ol className="mx-auto max-w-3xl space-y-8 border-l border-gold/25 pl-6">
          {shown.map((e) => (
            <li key={e.id} className="relative">
              <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-gold" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
                {e.when} &middot; <EntityLink name={e.place.split(",")[0]!} className="hover:text-gold">{e.place}</EntityLink>
              </p>
              <h2 className="mt-1 text-xl font-semibold text-gold">{e.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                <EntityText text={e.text} />
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {e.people.map((slug) => (
                  <Link
                    key={slug}
                    to="/explore/$slug"
                    params={{ slug }}
                    className="rounded-full border border-gold/40 px-3 py-1 text-xs font-medium text-gold transition hover:bg-gold hover:text-gold-foreground"
                  >
                    {guestBySlug[slug]?.name ?? slug}
                  </Link>
                ))}
                {e.figures.map((f) =>
                  f === "World of Wonder" ? (
                    <a
                      key={f}
                      href={WOW_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-gold/40 bg-secondary px-3 py-1 text-xs text-gold transition hover:bg-gold hover:text-gold-foreground"
                    >
                      {f}
                    </a>
                  ) : (
                    <EntityLink
                      key={f}
                      name={f}
                      className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:text-gold"
                    />
                  ),
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <GuestsSection />

      <section className="spotlight px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-cream">
            See how it all wires together
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every one of these nights put the same people in the same rooms.
            The connection web draws the lines.
          </p>
          <Link
            to="/connections"
            className="mt-8 inline-flex rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition hover:bg-spotlight"
          >
            Open the connection web
          </Link>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12 text-center">
        <p className="text-sm text-muted-foreground">
          Fan page for{" "}
          <a
            href="https://creators.spotify.com/pod/profile/night-fever/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink"
          >
            <em>Night Fever</em>
          </a>{" "}
          by{" "}
          <a
            href={WOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink"
          >
            World of Wonder
          </a>.{" "}
          <Link to="/" className="text-gold transition hover:text-pink">
            Home
          </Link>{" "}
          &middot;{" "}
          <Link to="/about" className="text-gold transition hover:text-pink">
            About
          </Link>
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-xs text-muted-foreground/60">
          <EntityText text="Dates and events compiled from public records, interviews and press coverage. Not affiliated with World of Wonder or the Night Fever podcast." />
        </p>
              <p className="mx-auto mt-3 max-w-2xl text-center"><LegalNote /></p>
</footer>
    </main>
  );
}
