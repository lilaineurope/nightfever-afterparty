import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  type SimulationNodeDatum,
} from "d3-force";
import { episodes, episodePath } from "@/data/episodes";
import { CATEGORIES } from "@/data/entities";
import { categoryCounts, episodeEntities } from "@/data/episode-connections";

type Node = SimulationNodeDatum & {
  id: string;
  label: string;
  kind: "episode" | "person";
  weight: number;
  slug?: string;
  episodeId?: (typeof episodes)[number]["id"];
  categories: string[];
};
type Edge = { source: string | Node; target: string | Node };

const W = 1200;
const H = 800;

function nodeRadius(n: Node) {
  return n.kind === "episode" ? 22 : 4 + n.weight * 3;
}

/** Five-pointed star around (0,0), point up - every episode is a pink star. */
function starPoints(outer: number): string {
  const inner = outer * 0.48;
  return Array.from({ length: 10 }, (_, i) => {
    const rad = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    return `${(rad * Math.cos(a)).toFixed(1)},${(rad * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

export function ConnectionsGraph() {
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement>(null);
  const [, setTick] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const drag = useRef<{ node?: Node; panX?: number; panY?: number; moved: boolean } | null>(null);

  const [cat, setCat] = useState<string>("All");

  const { nodes, edges, neighbours, sim } = useMemo(() => {
    const people = episodeEntities.filter((p) => cat === "All" || p.categories.includes(cat));
    const nodes: Node[] = [
      ...episodes.map((ep) => ({
        id: `ep:${ep.id}`,
        label: `S${ep.season}E${ep.episode} · ${ep.guest}`,
        kind: "episode" as const,
        episodeId: ep.id,
        weight: 5,
        categories: [] as string[],
      })),
      ...people.map((p) => ({
        id: p.slug,
        slug: p.slug,
        label: p.name,
        kind: "person" as const,
        weight: p.episodeIds.length,
        categories: p.categories,
      })),
    ];
    const edges: Edge[] = people.flatMap((p) =>
      p.episodeIds.map((e) => ({ source: p.slug, target: `ep:${e}` })),
    );
    const neighbours = new Map<string, Set<string>>();
    for (const e of edges) {
      const s = e.source as string, t = e.target as string;
      (neighbours.get(s) ?? neighbours.set(s, new Set()).get(s)!).add(t);
      (neighbours.get(t) ?? neighbours.set(t, new Set()).get(t)!).add(s);
    }
    const sim = forceSimulation(nodes)
      .force("link", forceLink<Node, Edge>(edges).id((d) => d.id).distance(90).strength(0.4))
      .force("charge", forceManyBody<Node>().strength((d) => (d.kind === "episode" ? -900 : -60)))
      .force("center", forceCenter(W / 2, H / 2))
      .force("collide", forceCollide<Node>().radius((d) => nodeRadius(d) + 3))
      .stop();
    for (let i = 0; i < 300; i++) sim.tick();
    return { nodes, edges, neighbours, sim };
  }, [cat]);

  useEffect(() => {
    sim.on("tick", () => setTick((t) => t + 1));
    return () => { sim.stop(); };
  }, [sim]);

  const active = hover ?? selected;
  const lit = active ? new Set([active, ...(neighbours.get(active) ?? [])]) : null;
  const matches = query.trim()
    ? nodes.filter((n) => n.label.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 8)
    : [];

  function toGraph(e: { clientX: number; clientY: number }) {
    const r = svgRef.current!.getBoundingClientRect();
    const sx = ((e.clientX - r.left) / r.width) * W;
    const sy = ((e.clientY - r.top) / r.height) * H;
    return { x: (sx - view.x) / view.k, y: (sy - view.y) / view.k };
  }

  function focusNode(n: Node) {
    setSelected(n.id);
    setQuery("");
    setView({ k: 1.6, x: W / 2 - (n.x ?? 0) * 1.6, y: H / 2 - (n.y ?? 0) * 1.6 });
  }

  const sel = nodes.find((n) => n.id === selected);

  /** Every star and dot opens its own page: an episode's Afterparty, or a name's A–Z card. */
  function openNode(n: Node) {
    if (n.episodeId) navigate({ to: episodePath(n.episodeId) });
    else if (n.slug) navigate({ to: "/explore/$slug", params: { slug: n.slug } });
  }

  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {["All", ...CATEGORIES.filter((c) => (categoryCounts[c] ?? 0) > 0)].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => { setCat(c); setSelected(null); setHover(null); }}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              cat === c
                ? "border-gold bg-gold text-gold-foreground"
                : "border-border bg-secondary text-secondary-foreground hover:text-pink"
            }`}
          >
            {c}
            <span className="ml-1 opacity-70">{categoryCounts[c] ?? 0}</span>
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Who are you looking for?"
            className="w-full rounded-xl border border-gold/30 bg-card px-4 py-2.5 text-cream placeholder:text-muted-foreground focus:border-pink focus:outline-none"
          />
          {matches.length > 0 && (
            <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg">
              {matches.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => focusNode(n)}
                    className="block w-full px-4 py-2 text-left text-sm text-cream hover:bg-pink/20"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button onClick={() => setView((v) => ({ ...v, k: Math.min(4, v.k * 1.25) }))} className="rounded-lg border border-border px-3 py-2 text-cream hover:border-pink" aria-label="Zoom in">+</button>
        <button onClick={() => setView((v) => ({ ...v, k: Math.max(0.4, v.k / 1.25) }))} className="rounded-lg border border-border px-3 py-2 text-cream hover:border-pink" aria-label="Zoom out">−</button>
        <button onClick={() => { setView({ x: 0, y: 0, k: 1 }); setSelected(null); }} className="rounded-lg border border-border px-3 py-2 text-sm text-cream hover:border-pink">Reset</button>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-card">
        {sel && (
          <div className="absolute left-3 top-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-pink/40 bg-background/90 px-4 py-2 shadow-lg backdrop-blur">
            <span className="font-semibold text-gold">{sel.label}</span>
            <NodeLink n={sel} className="text-sm font-semibold text-pink hover:underline" />
          </div>
        )}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="block h-[70vh] min-h-[420px] w-full touch-none cursor-grab select-none"
          onWheel={(e) => {
            const p = toGraph(e);
            const k = Math.max(0.4, Math.min(4, view.k * (e.deltaY < 0 ? 1.1 : 0.9)));
            const r = svgRef.current!.getBoundingClientRect();
            const sx = ((e.clientX - r.left) / r.width) * W;
            const sy = ((e.clientY - r.top) / r.height) * H;
            setView({ k, x: sx - p.x * k, y: sy - p.y * k });
          }}
          onPointerDown={(e) => {
            (e.target as Element).setPointerCapture?.(e.pointerId);
            drag.current = { panX: e.clientX, panY: e.clientY, moved: false };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d) return;
            d.moved = true;
            if (d.node) {
              const p = toGraph(e);
              d.node.fx = p.x; d.node.fy = p.y;
              sim.alphaTarget(0.3).restart();
            } else {
              const r = svgRef.current!.getBoundingClientRect();
              const dx = ((e.clientX - d.panX!) / r.width) * W;
              const dy = ((e.clientY - d.panY!) / r.height) * H;
              d.panX = e.clientX; d.panY = e.clientY;
              setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
            }
          }}
          onPointerUp={() => {
            const d = drag.current;
            if (d?.node) { d.node.fx = null; d.node.fy = null; sim.alphaTarget(0); }
            if (d && !d.moved && !d.node) setSelected(null);
            drag.current = null;
          }}
        >
          <g transform={`translate(${view.x},${view.y}) scale(${view.k})`}>
            {edges.map((e, i) => {
              const s = e.source as Node, t = e.target as Node;
              const on = lit && lit.has(s.id) && lit.has(t.id) && (s.id === active || t.id === active);
              return (
                <line key={i} x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                  className={on ? "stroke-pink" : "stroke-gold"}
                  strokeOpacity={on ? 0.9 : lit ? 0.05 : 0.18}
                  strokeWidth={on ? 1.6 : 0.8} />
              );
            })}
            {nodes.map((n) => {
              const r = nodeRadius(n);
              const dim = lit && !lit.has(n.id);
              const showLabel = n.kind === "episode" || n.weight > 1 || view.k > 1.5 || (lit && lit.has(n.id));
              return (
                <g key={n.id} transform={`translate(${n.x},${n.y})`} opacity={dim ? 0.15 : 1}
                  className="cursor-pointer"
                  role="link"
                  aria-label={n.kind === "episode" ? `${n.label} - open the Afterparty` : `${n.label} - open the card`}
                  tabIndex={n.kind === "episode" ? 0 : -1}
                  onKeyDown={(e) => { if (e.key === "Enter") openNode(n); }}
                  onPointerEnter={() => setHover(n.id)}
                  onPointerLeave={() => setHover(null)}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
                    drag.current = { node: n, moved: false };
                  }}
                  onPointerUp={(e) => {
                    e.stopPropagation();
                    const d = drag.current;
                    if (d?.node) { d.node.fx = null; d.node.fy = null; sim.alphaTarget(0); }
                    if (d && !d.moved) {
                      // First tap lights up the links, a second tap (or ctrl/cmd-click) opens the page.
                      if (e.metaKey || e.ctrlKey || selected === n.id) openNode(n);
                      else setSelected(n.id);
                    }
                    drag.current = null;
                  }}
                >
                  {n.kind === "episode" ? (
                    <polygon points={starPoints(r * 1.35)} className="fill-pink stroke-cream" strokeWidth={2} strokeLinejoin="round" />
                  ) : (
                    <circle r={r}
                      className={n.id === active ? "fill-pink" : n.weight > 1 ? "fill-cream" : "fill-gold"} />
                  )}
                  {showLabel && (
                    <text y={r + 12} textAnchor="middle"
                      className={n.kind === "episode" ? "fill-pink font-semibold" : "fill-cream"}
                      fontSize={n.kind === "episode" ? 15 : 10 / Math.max(1, view.k * 0.7)}
                      style={{ pointerEvents: n.kind === "episode" ? "auto" : "none" }}>
                      {n.label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Drag to move around · scroll or +/− to zoom · pull a dot to play with it · tap a star or dot to light up its links, tap it again to open it!
      </p>

      {sel && (
        <div className="mt-6 rounded-2xl border border-pink/30 bg-card p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl font-semibold text-gold">{sel.label}</h2>
            <NodeLink n={sel} className="text-xs font-medium uppercase tracking-wider text-pink hover:underline" />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {sel.kind === "episode" ? "Everyone timestamped in this episode:" : "Turns up in:"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[...(neighbours.get(sel.id) ?? [])].map((id) => {
              const n = nodes.find((x) => x.id === id)!;
              return (
                <button key={id} onClick={() => focusNode(n)}
                  className="rounded-full border border-gold/30 px-3 py-1 text-sm text-cream hover:border-pink hover:text-pink">
                  {n.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/** The link a selected star or dot opens: the episode's Afterparty, or the name's A–Z card. */
function NodeLink({ n, className }: { n: Node; className: string }) {
  if (n.episodeId)
    return (
      <Link to={episodePath(n.episodeId)} className={className}>
        Open the Afterparty →
      </Link>
    );
  if (n.slug)
    return (
      <Link to="/explore/$slug" params={{ slug: n.slug }} className={className}>
        Dive in →
      </Link>
    );
  return null;
}
