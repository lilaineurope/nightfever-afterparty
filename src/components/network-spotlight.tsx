import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { episodes, episodePath } from "@/data/episodes";
import { CATEGORIES } from "@/data/entities";
import { episodeEntities, type EpisodeEntity } from "@/data/episode-connections";

/**
 * The Network "Spotlight" (Lisa, 23 Oct 2026 - it replaced the force graph, which got unreadable at ~2,000 dots):
 * one Afterparty in the middle, every other episode on a ring around it; a line is thicker the more names the two
 * episodes share, with the count on it. Tap a line (or its number) to list the shared names beside the graph;
 * tap a star on the ring to move the spotlight there. The hosts, World of Wonder and the city of New York are in
 * every episode, so they are left out of the counts.
 */
const EVERYWHERE = new Set(["James St. James", "Fenton Bailey", "Randy Barbato", "World of Wonder", "World of Wonder (WOW)", "New York"]);

const W = 1000;
const H = 760;
const CX = W / 2;
const CY = H / 2;
const RX = 250;
const RY = 300;

type Ep = (typeof episodes)[number];

function starPoints(cx: number, cy: number, r: number) {
  const p: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    p.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return p.join(" ");
}

const code = (ep: Ep) => `S${ep.season}E${ep.episode}`;
const newest = [...episodes].sort((a, b) => b.afterpartyPublished.localeCompare(a.afterpartyPublished))[0]!;

export function NetworkSpotlight() {
  const [focusId, setFocusId] = useState<string>(newest.id);
  const [pairId, setPairId] = useState<string | null>(null);
  const [cat, setCat] = useState("All");
  // Phones: the ring keeps just the episode codes in big type, and a tappable list of episodes sits under it.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const on = () => setCompact(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const names = useMemo(
    () => episodeEntities.filter((p) => !EVERYWHERE.has(p.name) && (cat === "All" || p.categories.includes(cat))),
    [cat],
  );
  const catCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of episodeEntities) if (!EVERYWHERE.has(p.name) && p.episodeIds.length > 1) for (const k of p.categories) c[k] = (c[k] ?? 0) + 1;
    return c;
  }, []);

  const focus = episodes.find((e) => e.id === focusId) ?? newest;
  const ring = useMemo(() => {
    const others = episodes
      .filter((e) => e.id !== focus.id)
      .map((ep) => ({
        ep,
        shared: names
          .filter((p) => p.episodeIds.includes(focus.id) && p.episodeIds.includes(ep.id))
          .sort((a, b) => b.episodeIds.length - a.episodeIds.length || b.mentions - a.mentions || a.name.localeCompare(b.name)),
      }))
      .sort((a, b) => b.shared.length - a.shared.length || a.ep.season - b.ep.season || a.ep.episode - b.ep.episode);
    return others.map((o, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / others.length;
      return { ...o, a, x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) };
    });
  }, [focus.id, names]);

  const max = Math.max(1, ...ring.map((r) => r.shared.length));
  const ownTotal = names.filter((p) => p.episodeIds.includes(focus.id)).length;
  const sharedTotal = names.filter((p) => p.episodeIds.includes(focus.id) && p.episodeIds.length > 1).length;
  const pair = ring.find((r) => r.ep.id === pairId) ?? ring[0];

  const move = (id: string) => {
    setFocusId(id);
    setPairId(null);
  };
  const keyed = (fn: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        <label htmlFor="spotlight-pick" className="text-sm font-semibold uppercase tracking-wider">
          Spotlight on
        </label>
        <select
          id="spotlight-pick"
          value={focus.id}
          onChange={(e) => move(e.target.value)}
          className="border-2 border-gold bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
        >
          {[...episodes]
            .sort((a, b) => a.season - b.season || a.episode - b.episode)
            .map((ep) => (
              <option key={ep.id} value={ep.id}>
                {code(ep)} · {ep.guest}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {["All", ...CATEGORIES.filter((c) => (catCounts[c] ?? 0) > 0)].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition"
          >
            {c === "All" ? <span className="uppercase">Everything</span> : c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="border-2 border-gold bg-card">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`${code(focus)} ${focus.guest} and the names it shares with every other Afterparty`}>
            {ring.map((r) => {
              const t = r.shared.length / max;
              const on = r.ep.id === pair?.ep.id;
              return (
                <line
                  key={`l-${r.ep.id}`}
                  x1={CX} y1={CY} x2={r.x} y2={r.y}
                  stroke="var(--color-pink)"
                  strokeOpacity={on ? 0.95 : 0.2 + 0.55 * t}
                  strokeWidth={1.5 + 11 * t}
                  strokeLinecap="round"
                  className="cursor-pointer"
                  onClick={() => setPairId(r.ep.id)}
                />
              );
            })}
            {ring.map((r) => {
              const mx = CX + (r.x - CX) * 0.56;
              const my = CY + (r.y - CY) * 0.56;
              const on = r.ep.id === pair?.ep.id;
              return (
                <g
                  key={`b-${r.ep.id}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${r.shared.length} names shared with ${code(r.ep)} ${r.ep.guest} - show them`}
                  aria-pressed={on}
                  onClick={() => setPairId(r.ep.id)}
                  onKeyDown={keyed(() => setPairId(r.ep.id))}
                  className="cursor-pointer focus:outline-none"
                >
                  <circle cx={mx} cy={my} r={compact ? 24 : 15} className={on ? "fill-pink stroke-cream" : "fill-card stroke-cream"} strokeWidth={on ? 2 : 1.2} />
                  <text x={mx} y={my + (compact ? 8 : 4.5)} textAnchor="middle" className={`font-mono ${compact ? "text-[22px]" : "text-[13px]"} font-bold ${on ? "fill-pink-foreground" : "fill-cream"}`}>
                    {r.shared.length}
                  </text>
                </g>
              );
            })}
            {ring.map((r) => {
              const c = Math.cos(r.a);
              const s = Math.sin(r.a);
              const anchor = c > 0.35 ? "start" : c < -0.35 ? "end" : "middle";
              const gap = compact ? 30 : 22;
              const lx = r.x + (anchor === "start" ? gap : anchor === "end" ? -gap : 0);
              const ly = anchor === "middle" ? r.y + (s > 0 ? (compact ? 52 : 36) : compact ? -32 : -24) : r.y + (compact ? 9 : 5);
              return (
                <g
                  key={`s-${r.ep.id}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Move the spotlight to ${code(r.ep)} ${r.ep.guest}`}
                  onClick={() => move(r.ep.id)}
                  onKeyDown={keyed(() => move(r.ep.id))}
                  className="group cursor-pointer focus:outline-none"
                >
                  <polygon points={starPoints(r.x, r.y, compact ? 24 : 16)} className="fill-white stroke-cream transition group-hover:fill-pink group-focus-visible:fill-pink" strokeWidth={2} />
                  <text x={lx} y={ly} textAnchor={anchor} className={`fill-pink font-bold ${compact ? "text-[28px]" : "text-[15px]"}`} style={{ paintOrder: "stroke", stroke: "var(--color-card)", strokeWidth: 4 }}>
                    {compact ? code(r.ep) : `${code(r.ep)} · ${r.ep.guest}`}
                  </text>
                </g>
              );
            })}
            <polygon points={starPoints(CX, CY, compact ? 48 : 38)} className="fill-pink stroke-cream" strokeWidth={2.5} />
            <text x={CX} y={CY + (compact ? 84 : 64)} textAnchor="middle" className={`fill-cream font-bold ${compact ? "text-[30px]" : "text-[18px]"}`} style={{ paintOrder: "stroke", stroke: "var(--color-card)", strokeWidth: 5 }}>
              {compact ? code(focus) : `${code(focus)} · ${focus.guest}`}
            </text>
          </svg>
          {compact && (
            <ul className="border-t-2 border-gold">
              {ring.map((r) => (
                <li key={`m-${r.ep.id}`} className="border-b border-border last:border-b-0">
                  <button
                    type="button"
                    aria-pressed={r.ep.id === pair?.ep.id}
                    onClick={() => setPairId(r.ep.id)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm ${r.ep.id === pair?.ep.id ? "bg-pink text-pink-foreground" : ""}`}
                  >
                    <span>
                      <b>{code(r.ep)}</b> · {r.ep.guest}
                    </span>
                    <span className="font-mono font-bold">{r.shared.length}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="border-2 border-gold bg-card p-5" aria-live="polite">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-pink">In the spotlight</p>
          <h2 className="mt-1 text-2xl leading-tight">
            {code(focus)} · {focus.guest}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {ownTotal} names, {sharedTotal} of them heard in other Afterparties too.
          </p>
          <Link to={episodePath(focus.id)} className="mt-2 inline-block text-sm text-gold">
            Open the Afterparty →
          </Link>
          {pair && (
            <div className="mt-6 border-t-2 border-gold pt-4">
              <p className="text-sm font-semibold">
                {pair.shared.length} shared with{" "}
                <button type="button" onClick={() => move(pair.ep.id)} className="font-bold text-pink underline decoration-dotted underline-offset-2">
                  {code(pair.ep)} · {pair.ep.guest}
                </button>
              </p>
              {pair.shared.length ? (
                <ul className="mt-3 flex max-h-[420px] flex-wrap gap-2 overflow-y-auto pr-1">
                  {pair.shared.map((p: EpisodeEntity) => (
                    <li key={p.slug}>
                      <Link
                        to="/explore/$slug"
                        params={{ slug: p.slug }}
                        className="inline-block rounded-full border border-gold/30 px-3 py-1 text-xs font-medium text-cream transition hover:border-pink hover:bg-pink hover:text-pink-foreground"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">No names in common{cat !== "All" ? ` in ${cat}` : ""}.</p>
              )}
            </div>
          )}
        </aside>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        The thicker the line, the more names two episodes share · tap a line or its number to see the names · tap a star to
        move the spotlight. The hosts and New York are in every episode, so they're left out of the counts.
      </p>
    </div>
  );
}
