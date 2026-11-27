import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { EntityText } from "@/components/entity-text";
import { linkToSlug, useLinks } from "@/lib/link-index";
import { episodePath } from "@/data/episodes";
import type { SceneEvent } from "@/data/scene";
import type { PlaceMap, PlaceView } from "@/lib/place-view";
import { QuoteName } from "@/components/quote-name";

// Place pages (Lisa, 22 Nov 2026, mockup C): mockup B's map header, then mockup A's guest polaroids and taped boxes, then
// B's "Around the corner" with walking distances and the Timeline box. Data: src/lib/place-view.server.ts.

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const TILT = [-2, 1.5, -1, 2, -1.5, 1, -2, 1.5, -1];

/** The drawn map behind the name card: the place in pink, clubs as black dots, other places as open dots. Pins are
 *  approximate, from the public address; the street grid is drawn, not traced. */
export function PlaceMapDrawing({ m, name }: { m: PlaceMap; name: string }) {
  const lines: ReactNode[] = [];
  if (m.grid) {
    // Streets across, avenues up, through the place itself (it sits on a street).
    for (let y = m.self.y % m.grid.street; y < m.h; y += m.grid.street)
      lines.push(<line key={`s${y}`} x1={0} y1={y} x2={m.w} y2={y} className="place-street" />);
    for (let x = (m.self.x + m.grid.avenue / 2) % m.grid.avenue; x < m.w; x += m.grid.avenue)
      lines.push(<line key={`a${x}`} x1={x} y1={0} x2={x} y2={m.h} className="place-avenue" />);
  }
  return (
    <svg viewBox={`0 0 ${m.w} ${m.h}`} preserveAspectRatio="xMaxYMid slice" className="place-map" role="img" aria-label={`Map: ${name} and the places around it`}>
      <defs>
        <pattern id="place-dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.1" className="place-dot" />
        </pattern>
      </defs>
      <rect width={m.w} height={m.h} className="place-paper" />
      <rect width={m.w} height={m.h} fill="url(#place-dots)" />
      {lines}
      {m.grid && <line x1={0} y1={m.self.y} x2={m.w} y2={m.self.y} className="place-own-street" />}
      {m.pins.map((p) => (
        <a key={p.slug} href={`/explore/${p.slug}`}>
          <title>{p.name}</title>
          <circle cx={p.x} cy={p.y} r={7} className={p.club ? "place-pin-club" : "place-pin-place"} />
          {p.label && (
            <text x={p.left ? p.x - 11 : p.x + 11} y={p.y + 4} textAnchor={p.left ? "end" : undefined} className="place-label">
              {p.name}
            </text>
          )}
        </a>
      ))}
      <circle cx={m.self.x} cy={m.self.y} r={24} className="place-halo" />
      <circle cx={m.self.x} cy={m.self.y} r={10} className="place-pin-self" />
      {m.selfName && (
        <text x={m.self.x + 18} y={m.self.y - 14} className="place-label-self">
          {m.selfName.toUpperCase()}
        </text>
      )}
      {m.scale && (
        <g transform={`translate(${m.w - 40 - m.scale.px} ${m.h - 26})`}>
          <line x1={0} y1={0} x2={m.scale.px} y2={0} className="place-scale" />
          <text x={m.scale.px / 2} y={-7} textAnchor="middle" className="place-scale-label">{m.scale.label}</text>
        </g>
      )}
    </svg>
  );
}

const walk = (m: number) => (m < 20 ? "right here" : m < 2000 ? `${m} m · ${Math.max(1, Math.round(m / 80))} min walk` : m < 100_000 ? `${(m / 1000).toFixed(1)} km` : `${Math.round(m / 1000)} km`);

/** Under the header: who was there, what they say, around the corner, on the Timeline. */
export function PlaceSections({ p, name, events }: { p: PlaceView; name: string; events: SceneEvent[] }) {
  const links = useLinks();
  const boxes = p.who.slice(0, 9);
  return (
    <>
      {p.who.length > 0 && (
        <section className="pt-6">
          <h2 className={`${h} text-center`}>Who was there</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-5">
            {p.who.slice(0, 12).map((w, i) => (
              <Link key={w.episode} to={episodePath(w.episode as never)} className="place-polaroid" style={{ transform: `rotate(${TILT[i % TILT.length]}deg)` }}>
                {w.polaroid ? <img src={w.polaroid} alt="" loading="lazy" width={240} height={240} /> : <span className="place-polaroid-blank" aria-hidden="true" />}
                <span className="place-polaroid-name">{w.guest}</span>
                <span className="place-polaroid-ep">{w.short}</span>
              </Link>
            ))}
          </div>
          {p.who.length > 12 && (
            <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted-foreground">
              And {p.who.slice(12).map((w, i, all) => (
                <span key={w.episode}>
                  <Link to={episodePath(w.episode as never)} className="text-foreground underline decoration-dotted hover:text-pink">{w.guest}</Link>
                  {i < all.length - 2 ? ", " : i === all.length - 2 ? " and " : ""}
                </span>
              ))}.
            </p>
          )}
        </section>
      )}

      {boxes.length > 0 && (
        <section>
          <h2 className={`${h} text-center`}>What the guests say</h2>
          <div className={boxes.length === 1 ? "mx-auto mt-10 grid max-w-sm gap-10" : boxes.length === 2 ? "mx-auto mt-10 grid max-w-3xl gap-10 sm:grid-cols-2" : "mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"}>
            {boxes.map((w, i) => (
              <figure
                key={w.episode}
                className="relative border-2 border-[#111] bg-[#f6f0ea] p-5 pt-8 text-[#111] shadow-[5px_6px_0_#111]"
                style={{ transform: `rotate(${TILT[i % TILT.length]! / 2}deg)` }}
              >
                <span aria-hidden="true" className="absolute -top-4 left-1/2 h-7 w-24 -translate-x-1/2 rotate-3 bg-[rgba(240,230,200,.9)] shadow" />
                {w.polaroid && <img src={w.polaroid} alt="" loading="lazy" className="absolute -right-4 -top-6 w-16 rotate-6 border-2 border-[#111] shadow-[3px_3px_0_#111]" />}
                <p className="font-[family-name:var(--font-type)] text-[15px] leading-relaxed">
                  {/* Pictures never sit on text (Lisa, 5 Nov 2026): the first lines wrap around the guest polaroid */}
                  {w.polaroid && <span aria-hidden="true" className="float-right -mr-2 ml-2 h-11 w-14" />}
                  <EntityText text={w.context} self={name} />
                </p>
                <figcaption className="mt-4 flex items-end justify-between gap-2 text-xs">
                  <span className="font-semibold">
                    <QuoteName who={w.guest} episodeId={w.episode} />
                    <br />
                    <Link to={episodePath(w.episode as never)} className="font-normal text-[#555] hover:text-pink">{w.short}</Link>
                  </span>
                  <Timestamp episodeId={w.episode} time={w.time} />
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {(p.near.length > 0 || events.length > 0) && (
        <section className="grid items-start gap-8 md:grid-cols-[1.35fr_1fr]">
          {p.near.length > 0 && (
            <div className="place-box">
              <h2 className={h}>Around the corner</h2>
              <ul className="mt-3">
                {p.near.map((n) => (
                  <li key={n.slug} className="place-near">
                    <span>
                      <span aria-hidden="true" className={n.club ? "place-key place-key-club" : "place-key"} />
                      <Link {...linkToSlug(links, n.slug)} className="hover:text-pink">{n.name}</Link>
                    </span>
                    <span className="text-muted-foreground">{walk(n.metres)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                <span aria-hidden="true" className="place-key place-key-club" /> club &nbsp;
                <span aria-hidden="true" className="place-key" /> place &nbsp; · Pins are approximate.
              </p>
            </div>
          )}
          {events.length > 0 && (
            <div className="place-box">
              <h2 className={h}>On the Timeline</h2>
              <ol className="mt-3 space-y-2 border-l-2 border-[#999] pl-4 text-sm">
                {events.map((ev) => (
                  <li key={ev.id}>
                    <Link to="/timeline" hash={`ev-${ev.id}`} className="hover:text-pink">
                      <b>{ev.when}</b> · {ev.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>
      )}
    </>
  );
}
