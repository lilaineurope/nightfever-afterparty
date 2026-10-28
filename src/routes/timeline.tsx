import { pageHead } from "@/lib/seo";
import { Timestamp } from "@/components/episode-player";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useEffect, useState } from "react";
import { EntityLink } from "../components/entity-link";
import { guestBySlug, WOW_URL } from "../data/guests";
import { decades, sceneEvents } from "../data/scene";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";
import { SiteFooter } from "@/components/site-footer";

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
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative px-6 pb-12 pt-14">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            {spanWord()} years of{" "}
            <span className="text-pink text-glow-pink">one long night</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85">
            The doors that opened, the records that broke, the scandals that
            closed rooms for good - and which of the guests was standing there
            when it happened! Pick a decade and dive in.
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
              className={`relative scroll-mt-28 transition-colors ${target === e.id ? "-ml-3 bg-pink/10 py-3 pl-3 outline outline-2 outline-pink" : ""}`}
            >
              <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-gold" />
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
                    className="rounded-full border border-gold/40 px-3 py-1 text-xs font-medium text-gold transition hover:border-pink hover:bg-pink hover:text-pink-foreground"
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
                      className="rounded-full border border-gold/40 bg-secondary px-3 py-1 text-xs text-gold transition hover:border-pink hover:bg-pink hover:text-pink-foreground"
                    >
                      {f}
                    </a>
                  ) : (
                    <EntityLink
                      key={f}
                      name={f}
                      className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground"
                    />
                  ),
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <SiteFooter />    </main>
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
