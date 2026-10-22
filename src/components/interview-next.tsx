import { Link } from "@tanstack/react-router";
import { COME_BACK, NEW_FACES, type InterviewTip } from "@/data/interview-next";
import { episodeById, episodePath } from "@/data/episodes";
import { EntityLink } from "@/components/entity-link";
import { Timestamp } from "@/components/episode-player";

function Tip({ tip }: { tip: InterviewTip }) {
  const ep = episodeById(tip.episodeId);
  return (
    <li className="border-t border-border pt-4 first:border-t-0 first:pt-0">
      <EntityLink name={tip.name} className="font-[family-name:var(--font-flyer)] text-lg uppercase leading-tight text-cream hover:text-pink">
        {tip.name}
      </EntityLink>
      <p className="mt-1 text-sm leading-relaxed text-card-foreground/85">{tip.why}</p>
      <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
        <span>Said in</span>
        <Link to={episodePath(ep.id)} className="text-gold">
          S{ep.season}E{ep.episode} &middot; {ep.guest}
        </Link>
        <Timestamp episodeId={ep.id} time={tip.time} className="text-xs" />
      </p>
    </li>
  );
}

/** "Who to interview next" box (Lisa, 23 Oct 2026): every on-air tip for a future guest, with where it was said. */
export function InterviewNext({ className = "" }: { className?: string }) {
  return (
    <section aria-labelledby="interview-next" className={`px-6 py-14 ${className}`}>
      <div className="relative mx-auto max-w-5xl border-[3px] border-gold bg-card px-6 py-8 shadow-[8px_10px_0_var(--color-gold)] sm:px-10">
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-5 rotate-[6deg] bg-pink px-4 py-1.5 font-[family-name:var(--font-flyer)] text-xl uppercase text-pink-foreground sm:-right-6"
        >
          book them!
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-pink">Heard on the show</p>
        <h2 id="interview-next" className="mt-2 text-3xl leading-[0.95] sm:text-[40px]">
          Who to interview next
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Every time a host or guest says who the show should have on - or have back - with the episode and the exact
          moment. Tap &#9654; to hear it.
        </p>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">New faces, suggested by guests</h3>
            <ul className="mt-4 space-y-4">
              {NEW_FACES.map((t) => (
                <Tip key={t.name} tip={t} />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Back for a part two</h3>
            <ul className="mt-4 space-y-4">
              {COME_BACK.map((t) => (
                <Tip key={t.name} tip={t} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
