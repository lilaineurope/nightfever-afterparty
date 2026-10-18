import { pageHead } from "@/lib/seo";
import { Timestamp } from "@/components/episode-player";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EntityLink } from "../components/entity-link";
import { guestBySlug, WOW_URL } from "../data/guests";
import { decades, sceneEvents } from "../data/scene";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";
import { SiteFooter } from "@/components/site-footer";
import timelineHeader from "@/assets/timeline-header.jpg";

export const Route = createFileRoute("/timeline")({
  staticData: { sitemap: true },
  component: TimelinePage,
  head: () => pageHead({ path: "/timeline", title: "New York nightlife timeline, decade by decade | Night Fever fan page", description: "The nightlife scene behind Night Fever, year by year - CBGB, Studio 54, Danceteria, Limelight, Wigstock, Drag Race. Grab a drink!", image: "/og/timeline.jpg" }),
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
      <section className="relative flex min-h-[420px] items-center overflow-hidden px-6 pb-12 pt-24 sm:min-h-[480px]">
        <img
          src={timelineHeader}
          alt=""
          width={1920}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_50%_46%,color-mix(in_oklab,var(--background)_88%,transparent),transparent_72%)]" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Fifty years of{" "}
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
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                decade === d
                  ? "border-pink bg-pink/15 text-pink"
                  : "border-border bg-secondary text-secondary-foreground hover:border-gold/50"
              }`}
            >
              {d === "all" ? "Everything" : <Decades text={d} />}
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
