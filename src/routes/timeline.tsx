import { pageHead } from "@/lib/seo";
import { Timestamp } from "@/components/episode-player";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useEffect, useState, type CSSProperties } from "react";
import { EntityLink } from "../components/entity-link";
import { guestBySlug, WOW_URL } from "../data/guests";
import { decades, sceneEvents } from "../data/scene";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";
import { SiteFooter } from "@/components/site-footer";
import { EntityBox, plainClick } from "@/components/moments-box";
import { entityBySlug, entityFor } from "@/data/entities";
import skyline from "@/assets/timeline-skyline.webp";
import skylinePhone from "@/assets/timeline-skyline-phone.webp";

// "<N> years of one long night" counts itself (Lisa, 28 Oct 2026): from the earliest moment on the Timeline to today, in tens.
const WORDS: Record<number, string> = { 40: "Forty", 50: "Fifty", 60: "Sixty", 70: "Seventy", 80: "Eighty", 90: "Ninety", 100: "A hundred" };
// Worked out at render time, never at module load: the live server (Cloudflare) reads its clock as 1970 outside a request, which gave "0 years".
const FIRST_YEAR = Math.min(...sceneEvents.map((e) => e.year));
const spanWord = () => {
  const tens = Math.floor((new Date().getFullYear() - FIRST_YEAR) / 10) * 10;
  return WORDS[tens] ?? "Sixty";
};

export const Route = createFileRoute("/timeline")({
  staticData: { sitemap: true },
  component: TimelinePage,
  head: () => pageHead({ path: "/timeline", title: "New York nightlife timeline, decade by decade | Night Fever fan page", description: "The nightlife scene behind Night Fever, year by year - CBGB, Studio 54, Danceteria, Limelight, Wigstock, Drag Race. Grab a drink!", image: "/og/timeline.jpg" }),
});

function TimelinePage() {
  const [decade, setDecade] = useState<string>("all");
  // Year chips elsewhere (episode pages) link to /timeline#ev-<event id>: show every decade, jump there, mark it (Lisa, 23 Oct 2026)
  const [target, setTarget] = useState<string | null>(null);
  // Tap a name chip and its moments open in a box right under the chips, like the Library covers (Lisa, 29 Oct 2026);
  // the chips stay links to the A–Z card (cmd/ctrl-click opens the card).
  const [open, setOpen] = useState<string | null>(null);
  useEffect(() => {
    const jump = () => {
      const id = window.location.hash.startsWith("#ev-") ? decodeURIComponent(window.location.hash.slice(4)) : null;
      if (!id) return;
      setDecade("all");
      setTarget(id);
      window.setTimeout(() => document.getElementById(`ev-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    };
    jump();
    window.addEventListener("hashchange", jump);
    return () => window.removeEventListener("hashchange", jump);
  }, []);

  const sorted = useMemo(
    () => [...sceneEvents].sort((a, b) => a.year - b.year),
    [],
  );
  const shown = useMemo(
    () => (decade === "all" ? sorted : sorted.filter((e) => e.decade === decade)),
    [sorted, decade],
  );

  return (
    <main
      className="timeline-sky min-h-screen bg-background text-foreground"
      style={{ "--sky": `url(${skyline})`, "--sky-phone": `url(${skylinePhone})` } as CSSProperties}
    >
      {/* New York skyline header (Lisa, 29 Oct 2026, "S1" then "T3"): the photocopied night sky starts at the top of the page and
          fades in pixels upwards and downwards; the headline sits on black and pink flyer strips sinking into the skyline, one
          tagline on a paper strip. Made by scripts/timeline-skyline (no outside pictures). */}
      <section className="timeline-head relative px-4">
        <div className="timeline-head-in">
          <h1 className="timeline-title">
            <span className="timeline-strip timeline-strip-ink">{spanWord()} years of</span>
            <br />
            <span className="timeline-strip timeline-strip-pink">one long night</span>
          </h1>
          <p className="timeline-tag">The places, the drama, the releases. All there.</p>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2">
          {["all", ...decades].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDecade(d)}
              aria-pressed={decade === d}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                decade === d
                  ? "border-pink bg-pink/15 text-pink"
                  : "border-border bg-secondary text-secondary-foreground hover:border-gold/50"
              }`}
            >
              {d === "all" ? (<>Everything<span className="ml-1.5 text-pink">{sceneEvents.length}</span></>) : <Decades text={d} />}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 py-14">
        <ol className="mx-auto max-w-3xl space-y-8 border-l border-gold/25 pl-6">
          {shown.map((e) => (
            <li
              key={e.id}
              id={`ev-${e.id}`}
              className={`relative scroll-mt-28 border-2 border-gold bg-card px-5 py-4 shadow-[5px_5px_0_var(--color-gold)] transition-colors ${target === e.id ? "outline outline-4 outline-offset-2 outline-pink" : ""}`}
            >
              <span className="absolute -left-[33px] top-5 h-3 w-3 rounded-full bg-gold" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
                <Decades text={e.when} />
                {e.place && (<> &middot; <EntityLink name={e.place.split(",")[0] ?? e.place} className="hover:text-gold">{e.place}</EntityLink></>)}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-gold">{e.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                <EntityText text={e.text} />
              </p>
              {e.source && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Heard in the{" "}
                  <a href={`/episodes/${e.source.episodeId}`} className="text-pink underline-offset-2 hover:underline">
                    {e.source.guest} Afterparty ({e.source.label})
                  </a>
                  {e.source.time && e.source.time !== "On camera" ? (<> at <Timestamp episodeId={e.source.episodeId} time={e.source.time} /></>) : ""}
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {e.people.map((slug) => (
                  <Link
                    key={slug}
                    to="/explore/$slug"
                    params={{ slug }}
                    aria-expanded={open === `${e.id}|${slug}`}
                    onClick={(ev) => {
                      if (!plainClick(ev) || !entityBySlug[slug]) return;
                      ev.preventDefault();
                      setOpen((o) => (o === `${e.id}|${slug}` ? null : `${e.id}|${slug}`));
                    }}
                    className="tl-chip rounded-full border border-gold/40 px-3 py-1 text-xs font-medium text-gold transition hover:border-pink hover:bg-pink hover:text-pink-foreground"
                  >
                    {guestBySlug[slug]?.name ?? slug}
                  </Link>
                ))}
                {e.figures.map((f) => {
                  if (f === "World of Wonder")
                    return (
                      <a
                        key={f}
                        href={WOW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-gold/40 bg-secondary px-3 py-1 text-xs text-gold transition hover:border-pink hover:bg-pink hover:text-pink-foreground"
                      >
                        {f}
                      </a>
                    );
                  const ent = entityFor(f);
                  const cls = "tl-chip rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";
                  if (!ent) return <EntityLink key={f} name={f} className={cls} />;
                  const key = `${e.id}|${ent.slug}`;
                  return (
                    <Link
                      key={f}
                      to="/explore/$slug"
                      params={{ slug: ent.slug }}
                      aria-expanded={open === key}
                      onClick={(ev) => {
                        if (!plainClick(ev)) return;
                        ev.preventDefault();
                        setOpen((o) => (o === key ? null : key));
                      }}
                      className={cls}
                    >
                      {f}
                    </Link>
                  );
                })}
              </div>
              {open?.startsWith(`${e.id}|`) && entityBySlug[open.slice(e.id.length + 1)] && (
                <div className="mt-4">
                  <EntityBox entity={entityBySlug[open.slice(e.id.length + 1)]!} onClose={() => setOpen(null)} />
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      <SiteFooter />
    </main>
  );
}

// Labels are styled in capitals, but decades read "1970s", not "1970S".
function Decades({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\d{2,4}s)\b/).map((part, i) =>
        /^\d{2,4}s$/.test(part) ? (
          <span key={i}>
            {part.slice(0, -1)}
            <span className="normal-case">s</span>
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
