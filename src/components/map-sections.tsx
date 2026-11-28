import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { PlaceMapDrawing } from "@/components/place-page";
import { CoverFace } from "@/components/cover-face";
import { linkToSlug, useLinks } from "@/lib/link-index";
import { episodePath } from "@/data/episodes";
import type { MapBand, MapHome, MapLine, RoomsMap } from "@/lib/map-view";

// The map on the pages (Lisa, 27 Nov 2026, "yes to all Which page gets what"): "Around the block" on club and event
// pages - the place pages' drawing as a band of its own, the club in the middle - the yellow tape block where there is
// no pin, and a living person's rooms as numbered pins on a drawn New York. Data: src/lib/map-view.server.ts.

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const BRING_HOME = "Bring us home";
/** Walking minutes only, so the names keep the room (the place pages' list also gives metres). */
const mins = (m: number) => (m < 20 ? "next door" : `${Math.max(1, Math.round(m / 80))} min walk`);

/** An episode mention line (Lisa, 22 Nov 2026): the episode link in pink, the yellow ▶ time code, what was said below. */
function Line({ l }: { l: MapLine }) {
  return (
    <>
      <span className="mt-0.5 flex flex-wrap items-baseline gap-x-2 text-xs">
        <Link
          to={episodePath(l.episode as never)}
          className="font-semibold text-pink hover:text-[#111]"
        >
          {l.short} · {l.guest}
        </Link>
        <Timestamp episodeId={l.episode} time={l.time} />
      </span>
      <span className="mt-0.5 block font-[family-name:var(--font-type)] text-[13px] leading-snug text-[#333]">
        {l.context}
      </span>
    </>
  );
}

/** "Around the block": the drawn band with the big-map button in its corner, Around the corner with walking minutes, then
 *  the events next door as Library covers in a box of their own (Lisa, 28 Nov 2026: "just show the map and then around
 *  the corner"). */
export function AroundTheBlock({ b, slug }: { b: MapBand; slug: string }) {
  const links = useLinks();
  const at = b.kind === "club" ? slug : (b.pin.slug ?? slug);
  return (
    <section aria-labelledby="where-it-was">
      <h2 id="where-it-was" className={`${h} text-center`}>
        {b.kind === "club" ? "Where it was" : "Where it happened"}
      </h2>
      {b.kind === "event" && (
        <p className="mt-2 text-center text-sm text-muted-foreground">
          At{" "}
          {b.pin.slug ? (
            <Link
              {...linkToSlug(links, b.pin.slug)}
              className="font-semibold text-[#111] transition-colors hover:text-pink"
            >
              {b.pin.name}
            </Link>
          ) : (
            <span className="font-semibold text-[#111]">{b.pin.name}</span>
          )}
          {b.pin.tip ? ` · ${b.pin.tip}` : b.pin.area !== b.pin.name ? ` · ${b.pin.area}` : ""}
        </p>
      )}
      <div className="map-band mt-6">
        {/* The big-map button sits in the map's bottom-right corner (Lisa, 28 Nov 2026). */}
        <div className="relative">
          <PlaceMapDrawing m={b.map} name={b.pin.name} band />
          <Link to="/map" search={{ at }} className="map-btn map-btn-corner">
            Open the big map &rarr;
          </Link>
        </div>
        {b.near.length > 0 && (
          <div className="map-band-foot map-band-foot-one">
            <h3 className={h}>Around the corner</h3>
            <ul className="map-near map-near-wide mt-3">
              {b.near.slice(0, 12).map((n) => (
                <li key={n.slug} className="place-near">
                  <span>
                    <span
                      aria-hidden="true"
                      className={n.club ? "place-key place-key-club" : "place-key"}
                    />
                    <Link
                      {...linkToSlug(links, n.slug)}
                      className="font-semibold text-[#111] transition-colors hover:text-pink"
                    >
                      {n.name}
                    </Link>
                  </span>
                  <span className="whitespace-nowrap text-muted-foreground">{mins(n.metres)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              <span aria-hidden="true" className="place-key place-key-club" /> club &nbsp;
              <span aria-hidden="true" className="place-key" /> place &nbsp; · Pins are approximate,
              from the public address. The street grid is drawn, not traced.
            </p>
          </div>
        )}
      </div>
      {b.nextDoor.length > 0 && (
        // Its own box, in the Library's cover style (Lisa, 28 Nov 2026).
        <div className="map-next mt-10">
          <h3 className={`${h} text-center`}>Events next door</h3>
          <ul className="map-next-grid mt-6">
            {b.nextDoor.map((x) => (
              <li key={x.slug}>
                <Link {...linkToSlug(links, x.slug)} className="lib-hit block" aria-label={x.name}>
                  {x.design && <CoverFace d={x.design} />}
                </Link>
                <Link
                  {...linkToSlug(links, x.slug)}
                  className="mt-3 block font-semibold leading-snug text-[#111] transition-colors hover:text-pink"
                >
                  {x.name}
                </Link>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {[x.at, x.metres !== undefined ? mins(x.metres) : ""].filter(Boolean).join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

/** No pin, no guess (Lisa, 22 Nov 2026): the yellow tape block, asking anyone who remembers the address. */
export function BringUsHome({ m }: { m: MapHome }) {
  return (
    <section className="cc-block-home mx-auto max-w-3xl text-sm">
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="home-tag">{BRING_HOME}</span>
        <span>
          We don&apos;t know where {m.kind === "club" ? `${m.name} was` : `${m.name} happened`} yet,
          so it has no pin on the map.
        </span>
      </p>
      {m.hint && (
        <p className="mt-2 text-xs italic text-muted-foreground">What we know: {m.hint}</p>
      )}
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        <Link
          to="/contact"
          search={{ about: `${BRING_HOME}: ${m.name}` }}
          className="font-semibold text-[#111] transition-colors hover:text-pink"
        >
          I know where it was &rarr;
        </Link>
        <Link
          to="/map"
          search={{ layer: "home" }}
          className="font-semibold text-[#111] transition-colors hover:text-pink"
        >
          Everything still to bring home &rarr;
        </Link>
      </p>
    </section>
  );
}

/** A living person's rooms, or an AFTERPARTY's places (the reference list's Map view): numbered pins on a drawn New
 *  York, each with the episode line about it. */
export function RoomsMapSection({
  r,
  first,
  title,
  intro,
  id = "their-new-york",
  episode,
  noMap = false,
}: {
  r: RoomsMap;
  first: string;
  title?: string | undefined;
  intro?: string | undefined;
  id?: string | undefined;
  /** On an AFTERPARTY page: the big map opens on this episode's stops (/map?ep=). */
  episode?: string | undefined;
  /** On /map itself: only the list, the live map shows the stops. */
  noMap?: boolean;
}) {
  const links = useLinks();
  const m = noMap ? null : r.map;
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className={`${h} text-center`}>
        {title ?? `${first}'s New York`}
      </h2>
      {intro && (
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">{intro}</p>
      )}
      <div className={m ? "rooms-grid mt-6" : "mx-auto mt-6 max-w-3xl"}>
        {m && (
          <div className="rooms-map">
            <svg
              viewBox={`0 0 ${m.w} ${m.h}`}
              role="img"
              aria-label={`Map: ${first}'s rooms in New York`}
            >
              <defs>
                <pattern id="rooms-dots" width="6" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="1.1" className="place-dot" />
                </pattern>
                <clipPath id="rooms-island">
                  <polygon points={m.island} />
                </clipPath>
              </defs>
              <rect width={m.w} height={m.h} className="place-paper" />
              <rect width={m.w} height={m.h} fill="url(#rooms-dots)" />
              {m.water.map((w, i) => (
                <polygon key={i} points={w} className="rooms-water" />
              ))}
              <g clipPath="url(#rooms-island)">
                {m.streets.map((y) => (
                  <line key={`s${y}`} x1={0} y1={y} x2={m.w} y2={y} className="rooms-street" />
                ))}
                {m.avenues.map((x) => (
                  <line key={`a${x}`} x1={x} y1={0} x2={x} y2={m.h} className="rooms-avenue" />
                ))}
              </g>
              <polygon points={m.island} className="rooms-shore" />
              {r.stops.map((s) =>
                s.x !== s.tx || s.y !== s.ty ? (
                  <g key={`t${s.n}`} aria-hidden="true">
                    <line x1={s.tx} y1={s.ty} x2={s.x} y2={s.y} className="rooms-leader" />
                    <circle cx={s.tx} cy={s.ty} r={2.5} className="rooms-leader-dot" />
                  </g>
                ) : null,
              )}
              {r.stops.map((s) => (
                <a key={s.slug} href={`/explore/${s.slug}`}>
                  <title>{s.name}</title>
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={12}
                    className={s.club ? "place-pin-club" : "place-pin-place"}
                  />
                  <text
                    x={s.x}
                    y={s.y + 4}
                    textAnchor="middle"
                    className={s.club ? "rooms-num rooms-num-club" : "rooms-num"}
                  >
                    {s.n}
                  </text>
                </a>
              ))}
              <g transform={`translate(${m.w - 30 - m.scale.px} ${m.h - 24})`}>
                <line x1={0} y1={0} x2={m.scale.px} y2={0} className="place-scale" />
                <text x={m.scale.px / 2} y={-7} textAnchor="middle" className="place-scale-label">
                  {m.scale.label}
                </text>
              </g>
            </svg>
          </div>
        )}
        <div>
          <ol className="rooms-list">
            {r.stops.map((s) => (
              <li key={s.slug} id={`stop-${s.n}`}>
                <span
                  className={s.club ? "rooms-badge rooms-badge-club" : "rooms-badge"}
                  aria-hidden="true"
                >
                  {s.n}
                </span>
                <div>
                  <Link
                    {...linkToSlug(links, s.slug)}
                    className="font-semibold text-[#111] transition-colors hover:text-pink"
                  >
                    {s.name}
                  </Link>
                  <span className="text-xs text-muted-foreground"> · {s.area}</span>
                  {s.line && <Line l={s.line} />}
                </div>
              </li>
            ))}
            {r.home.map((x) => (
              <li key={x.slug}>
                <span className="home-tag rooms-tape">{BRING_HOME}</span>
                <div>
                  <Link
                    {...linkToSlug(links, x.slug)}
                    className="font-semibold text-[#111] transition-colors hover:text-pink"
                  >
                    {x.name}
                  </Link>
                  {x.line && <Line l={x.line} />}
                  {x.hint && (
                    <span className="mt-0.5 block text-xs italic text-muted-foreground">
                      What we know: {x.hint}
                    </span>
                  )}
                  <Link
                    to="/contact"
                    search={{ about: `${BRING_HOME}: ${x.name}` }}
                    className="mt-0.5 inline-block text-xs font-semibold text-[#111] transition-colors hover:text-pink"
                  >
                    I know where it was &rarr;
                  </Link>
                </div>
              </li>
            ))}
          </ol>
          {r.away.length > 0 && (
            <p className="mt-4 text-sm">
              <span className="font-semibold">Further away:</span>{" "}
              {r.away.map((x, i) => (
                <span key={x.slug}>
                  {i > 0 && ", "}
                  <Link
                    {...linkToSlug(links, x.slug)}
                    className="font-semibold text-[#111] transition-colors hover:text-pink"
                  >
                    {x.name}
                  </Link>
                  <span className="text-muted-foreground"> ({x.area})</span>
                </span>
              ))}
            </p>
          )}
          {r.stops.length > 0 && !noMap && (
            <p className="mt-5">
              <Link
                to="/map"
                search={episode ? { ep: episode } : { at: r.stops[0]!.slug }}
                className="map-btn"
              >
                See them on the big map &rarr;
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
