import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { QuoteName } from "@/components/quote-name";
import { EntityText } from "@/components/entity-text";
import { polaroidThumb } from "@/lib/polaroids";
import { episodeById, episodePath } from "@/data/episodes";
import type { SaidBox } from "@/lib/card-view";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const TILT = [-1.2, 0.8, -0.5, 1.1, -0.9, 0.6];
/** At most nine boxes on the wall (Lisa's quote-wall rule); the rest open one by one. */
const SHOW = 9;

/** "What the guests say" on club, event and night pages (Lisa, 28 Nov 2026: "show all quotes"): every time a guest talks
 *  about it is a taped box with their polaroid. A quote shows their own words; any other mention shows what was said,
 *  labelled "On the show". It replaces the old "In the episodes" list on these pages. */
export function SaidWall({ items, name, id }: { items: SaidBox[]; name: string; id: string }) {
  if (items.length === 0) return null;
  const grid =
    items.length === 1
      ? "mx-auto max-w-xl"
      : items.length === 2
        ? "mx-auto max-w-4xl md:grid-cols-2"
        : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className={`${h} text-center`}>
        What the guests say
      </h2>
      <div className={`mt-10 grid gap-x-8 gap-y-12 ${grid}`}>
        {items.slice(0, SHOW).map((q, i) => (
          <SaidFigure key={`${q.episode}-${q.time}-${i}`} q={q} i={i} name={name} />
        ))}
      </div>
      {items.length > SHOW && (
        // More than 9: the rest are one line each, and a click opens the box underneath (Lisa, 28 Nov 2026).
        <ul className="said-more mx-auto mt-14 max-w-3xl">
          {items.slice(SHOW).map((q, i) => (
            <li key={`${q.episode}-${q.time}-${i}`}>
              <details className="said-row">
                <summary>
                  <span className="min-w-0">
                    <span className="said-row-who">{q.who}</span>
                    <span className="said-row-what">
                      {q.quote ? `\u201c${q.quote}\u201d` : (q.context ?? "")}
                    </span>
                  </span>
                  <span className="said-row-code">{q.code}</span>
                  <span aria-hidden="true" className="map-event-plus">
                    +
                  </span>
                </summary>
                <div className="said-row-box">
                  <SaidFigure q={q} i={i + 1} name={name} />
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** One taped box on the wall: a quote, or a mention with what was said. */
function SaidFigure({ q, i, name }: { q: SaidBox; i: number; name: string }) {
  const ep = episodeById(q.episode);
  const pol = polaroidThumb(q.episode, 240);
  return (
    <figure
      className="relative border-2 border-[#111] bg-[#f6f0ea] p-5 pt-8 text-[#111] shadow-[5px_6px_0_#111]"
      style={{ transform: `rotate(${TILT[i % TILT.length]}deg)` }}
    >
      <span
        aria-hidden="true"
        className="absolute -top-4 left-1/2 h-7 w-24 -translate-x-1/2 rotate-3 bg-[rgba(240,230,200,.9)] shadow"
      />
      {pol && (
        <img
          src={pol}
          alt=""
          loading="lazy"
          className="absolute -right-4 -top-6 w-16 rotate-6 border-2 border-[#111] shadow-[3px_3px_0_#111]"
        />
      )}
      <blockquote className="font-[family-name:var(--font-type)] text-[15px] leading-relaxed">
        {/* Pictures never sit on text (Lisa, 5 Nov 2026): the first lines wrap around the guest polaroid */}
        {pol && <span aria-hidden="true" className="float-right -mr-2 ml-2 h-11 w-14" />}
        {q.quote ? (
          <>
            {q.label && (
              <span className="mb-2 block font-[family-name:var(--font-mono-body)] text-[11px] uppercase leading-snug tracking-wide text-[#6b6460]">
                {q.label}
              </span>
            )}
            &ldquo;{q.quote}&rdquo;
          </>
        ) : (
          <>
            <span className="mb-2 block font-[family-name:var(--font-mono-body)] text-[11px] uppercase leading-snug tracking-wide text-[#6b6460]">
              On the show
              {q.mentions && q.mentions > 1 ? ` · ${q.mentions} mentions` : ""}
            </span>
            <EntityText text={q.context ?? ""} self={name} />
          </>
        )}
      </blockquote>
      <figcaption className="mt-4 flex items-end justify-between gap-2 text-xs">
        <span className="font-semibold">
          <QuoteName who={q.who} episodeId={q.episode} />
          <br />
          <Link to={episodePath(ep.id)} className="font-normal text-[#555] hover:text-pink">
            {q.who === ep.guest ? q.code : `${q.code} · ${ep.guest}`}
          </Link>
        </span>
        {q.time && q.time !== "On camera" && <Timestamp episodeId={q.episode} time={q.time} />}
      </figcaption>
    </figure>
  );
}
