import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { eras, guestBySlug, guests } from "../data/guests";

export const Route = createFileRoute("/guests")({
  component: GuestsPage,
  head: () => ({
    meta: [
      { title: "Night Fever Guests — Careers, Timelines & Connections" },
      {
        name: "description",
        content:
          "Every Night Fever guest, with a career timeline, what they are doing now, how they connect to each other, and a link to their episode.",
      },
      {
        property: "og:title",
        content: "Night Fever Guests — Careers, Timelines & Connections",
      },
      {
        property: "og:description",
        content:
          "Career timelines and connection maps for the nightlife legends interviewed on Night Fever.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/guests" }],
  }),
});

function GuestsPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="disco-grid px-6 pb-16 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            to="/"
            className="text-xs font-medium uppercase tracking-[0.2em] text-gold transition hover:text-pink"
          >
            &larr; Night Fever fan page
          </Link>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            The people <span className="text-pink text-glow-pink">in the room</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Everyone interviewed on <em>Night Fever</em> has a long, strange,
            brilliant career behind them &mdash; and most of them are still at
            it. Here is who they are, what they did, what they are doing now,
            and how their paths keep crossing.
          </p>
        </div>
      </section>

      {/* Era timeline */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Four decades, one crowd
          </h2>
          <ol className="mt-12 space-y-8 border-l border-gold/25 pl-6">
            {eras.map((era) => (
              <li key={era.label} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-gold" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
                  {era.label}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-gold">
                  {era.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {era.text}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {era.people.map((slug) => (
                    <a
                      key={slug}
                      href={`#${slug}`}
                      onClick={() => setActive(slug)}
                      className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition hover:border-pink/50 hover:text-pink"
                    >
                      {guestBySlug[slug]?.name}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Guest cards */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Guest by guest
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Tap a name to open their full timeline.
          </p>

          <div className="mt-12 space-y-4">
            {guests.map((guest) => {
              const open = active === guest.slug;
              return (
                <article
                  key={guest.slug}
                  id={guest.slug}
                  className="scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-card transition hover:border-gold/40"
                >
                  <button
                    type="button"
                    onClick={() => setActive(open ? null : guest.slug)}
                    aria-expanded={open}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <span>
                      <span className="block text-xl font-semibold text-gold">
                        {guest.name}
                      </span>
                      <span className="mt-1 block text-sm text-card-foreground/80">
                        {guest.tagline}
                      </span>
                      <span className="mt-2 block text-xs font-medium uppercase tracking-wider text-pink">
                        {guest.episode}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-1 shrink-0 text-gold transition-transform ${open ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>

                  {open && (
                    <div className="border-t border-border px-6 pb-6 pt-6">
                      <div className="grid gap-8 md:grid-cols-2">
                        <div>
                          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
                            Timeline
                          </h3>
                          <ol className="mt-4 space-y-4 border-l border-gold/25 pl-5">
                            {guest.timeline.map((item) => (
                              <li key={item.year} className="relative">
                                <span className="absolute -left-[27px] top-2 h-2 w-2 rounded-full bg-gold/70" />
                                <p className="text-sm font-semibold text-gold">
                                  {item.year}
                                </p>
                                <p className="mt-1 text-sm leading-relaxed text-card-foreground/80">
                                  {item.text}
                                </p>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
                              What they are doing now
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-card-foreground/80">
                              {guest.now}
                            </p>
                          </div>

                          <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
                              Scenes &amp; rooms
                            </h3>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {guest.scenes.map((scene) => (
                                <span
                                  key={scene}
                                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                                >
                                  {scene}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
                              Connected to
                            </h3>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {guest.linkedTo.map((slug) => (
                                <a
                                  key={slug}
                                  href={`#${slug}`}
                                  onClick={() => setActive(slug)}
                                  className="rounded-full border border-gold/30 px-3 py-1 text-xs font-medium text-gold transition hover:bg-gold hover:text-gold-foreground"
                                >
                                  {guestBySlug[slug]?.name}
                                </a>
                              ))}
                            </div>
                          </div>

                          <a
                            href={guest.episodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-pink px-5 py-2.5 text-sm font-semibold text-pink-foreground transition hover:bg-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
                          >
                            Listen to this episode
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="spotlight px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-cream">
            Hear it from them
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every story above is told properly, and much more scandalously, on
            the show itself.
          </p>
          <a
            href="https://creators.spotify.com/pod/profile/night-fever/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition hover:bg-spotlight"
          >
            Browse all episodes
          </a>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12 text-center">
        <p className="text-sm text-muted-foreground">
          Fan page for <em>Night Fever</em> by World of Wonder.{" "}
          <Link to="/" className="text-gold transition hover:text-pink">
            Back to home
          </Link>{" "}
          &middot;{" "}
          <Link
            to="/connections"
            className="text-gold transition hover:text-pink"
          >
            The connection web
          </Link>{" "}
          &middot;{" "}
          <Link
            to="/episodes/s06e01"
            className="text-gold transition hover:text-pink"
          >
            Latest episode: James St. James
          </Link>

        </p>
        <p className="mx-auto mt-4 max-w-2xl text-xs text-muted-foreground/60">
          Biographical details compiled from public interviews and press
          coverage. Not affiliated with World of Wonder or the Night Fever
          podcast.
        </p>
      </footer>
    </main>
  );
}
