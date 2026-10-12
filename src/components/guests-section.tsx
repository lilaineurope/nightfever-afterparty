import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { guestBySlug, guests, WOW_URL } from "../data/guests";
import { EntityLink } from "./entity-link";
import { EntityText } from "./entity-text";
import { episodePath, episodes } from "../data/episodes";

/**
 * The guest half of the scene story: the expandable guest cards. Rendered on
 * the Guests page (/guests) so the people live on one page.
 */
export function GuestsSection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="px-6 pb-16 pt-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-sm text-muted-foreground">
          Tap a name to open their full timeline.
        </p>

        <div className="mt-8 space-y-4">
          {guests.map((guest) => {
            const open = active === guest.slug;
            const indexedEpisode = episodes.find((episode) => episode.guest === guest.name);
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
                                <EntityText text={item.text} />
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
                            <EntityText text={guest.now} />
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
                            Scenes &amp; rooms
                          </h3>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {guest.scenes.map((scene) =>
                              scene === "World of Wonder" ? (
                                <a
                                  key={scene}
                                  href={WOW_URL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded-full border border-gold/40 bg-secondary px-3 py-1 text-xs text-gold transition hover:bg-gold hover:text-gold-foreground"
                                >
                                  {scene}
                                </a>
                              ) : (
                                <EntityLink
                                  key={scene}
                                  name={scene}
                                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-gold/50 hover:text-gold"
                                />
                              ),
                            )}
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

                        <Link
                          to="/explore/$slug"
                          params={{ slug: guest.slug }}
                          className="mr-3 inline-flex items-center gap-2 rounded-xl border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-gold-foreground"
                        >
                          Full overview &rarr;
                        </Link>
                        {indexedEpisode && (
                          <Link
                            to={episodePath(indexedEpisode.id)}
                            className="mr-3 inline-flex items-center gap-2 rounded-xl border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-gold-foreground"
                          >
                            Afterparty connection &rarr;
                          </Link>
                        )}
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
  );
}
