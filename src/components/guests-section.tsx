import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { guestBySlug, guests, WOW_URL } from "../data/guests";
import { EntityLink } from "./entity-link";
import { EntityText } from "./entity-text";
import { GuestEpisodeLinks } from "./guest-episode-links";

/**
 * The guest half of the scene story: the expandable guest cards. Rendered on
 * the Guests page (/guests) so the people live on one page.
 */
const SEASONS = [1, 2, 3, 4, 5, 6];
const seasonOf = (episode: string) => Number(episode.match(/Season (\d+)/)?.[1] ?? 0);

export function GuestsSection() {
  const [active, setActive] = useState<string | null>(null);
  const [season, setSeason] = useState<number | null>(null);

  return (
    <section className="px-6 pb-16 pt-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-sm text-muted-foreground">
          Tap a name to open their full timeline - so many stories!
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by season">
          {[null, ...SEASONS].map((s) => {
            const count = s === null ? guests.length : guests.filter((g) => seasonOf(g.episode) === s).length;
            const on = season === s;
            return (
              <button key={s ?? "all"} type="button" aria-pressed={on} disabled={count === 0}
                onClick={() => setSeason(s)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  on
                    ? "border-gold bg-gold text-gold-foreground"
                    : "border-border text-muted-foreground hover:border-pink hover:text-pink"
                } disabled:cursor-not-allowed disabled:opacity-40`}>
                {s === null ? "All seasons" : `Season ${s}`}
                <span className={`ml-1.5 text-xs ${on ? "" : "text-pink"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 space-y-4">
          {guests.filter((g) => season === null || seasonOf(g.episode) === season).map((guest) => {
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
                                <EntityText text={item.text} />
                              </p>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
                            What they're up to now
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

                        <div className="mt-3 flex flex-wrap gap-3">
                        <Link
                          to="/explore/$slug"
                          params={{ slug: guest.slug }}
                          className="inline-flex items-center gap-2 rounded-xl border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-gold-foreground"
                        >
                          Their full card &rarr;
                        </Link>
                        <GuestEpisodeLinks guest={guest} className="contents" />
                        </div>
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
