// The Map page header (Lisa, 27 Nov 2026, "H1"): "The drawn city". Manhattan on its side, downtown left and uptown
// right, in the paper look of the place pages and the club map band. Every pin is on it: clubs black and sized by how
// often they come up, places open, events yellow. The biggest clubs are named. The title sits over uptown, so
// downtown, where most of the clubs are, stays clear. Drawn from the same pins as the map below it.

type Pin = {
  lat: number;
  lng: number;
  club: boolean;
  event?: boolean | undefined;
  world: boolean;
  mentions: number;
  name: string;
};

const W = 1280;
const H = 520;
const S = 0.098;
const C = { lat: 40.7475, lng: -73.982 };
const TURN = (29 * Math.PI) / 180;

/** Metres east/north of the middle, turned 29° so the avenues run straight, then laid on its side: uptown right. */
function xy(lat: number, lng: number): [number, number] {
  const e = (lng - C.lng) * 111320 * Math.cos((C.lat * Math.PI) / 180);
  const n = (lat - C.lat) * 110540;
  const xr = e * Math.cos(TURN) - n * Math.sin(TURN);
  const yr = e * Math.sin(TURN) + n * Math.cos(TURN);
  return [W / 2 + yr * S, H / 2 + 10 + xr * S];
}

const ISLAND: [number, number][] = [
  [40.7003, -74.0158],
  [40.7095, -74.017],
  [40.72, -74.0128],
  [40.73, -74.011],
  [40.742, -74.0095],
  [40.755, -74.0075],
  [40.765, -73.999],
  [40.776, -73.9915],
  [40.8, -73.972],
  [40.83, -73.951],
  [40.855, -73.938],
  [40.873, -73.927],
  [40.877, -73.922],
  [40.871, -73.911],
  [40.85, -73.928],
  [40.83, -73.934],
  [40.81, -73.933],
  [40.797, -73.929],
  [40.785, -73.94],
  [40.77, -73.948],
  [40.756, -73.963],
  [40.744, -73.971],
  [40.733, -73.9725],
  [40.725, -73.9718],
  [40.713, -73.977],
  [40.709, -73.999],
  [40.701, -74.013],
];
const pts = (ll: [number, number][]) =>
  ll
    .map(([a, b]) =>
      xy(a, b)
        .map((v) => v.toFixed(1))
        .join(","),
    )
    .join(" ");
const HUDSON = ISLAND.slice(0, 9);
const EAST = ISLAND.slice(13);
const WATER = [
  pts([...HUDSON, ...[...HUDSON].reverse().map(([a, b]) => [a, b - 0.03] as [number, number])]),
  pts([...EAST, ...[...EAST].reverse().map(([a, b]) => [a, b + 0.012] as [number, number])]),
  pts([
    [40.7003, -74.0158],
    [40.701, -74.013],
    [40.709, -73.999],
    [40.7, -73.985],
    [40.68, -74.0],
    [40.675, -74.06],
    [40.71, -74.05],
  ]),
];
const ISLAND_PTS = pts(ISLAND);

/** In the sideways map the streets run up and down (every three blocks), the avenues across. */
const STREETS: number[] = [];
for (let x = (W / 2) % (240 * S); x < W; x += 240 * S) STREETS.push(x);
const AVENUES: number[] = [];
for (let y = (H / 2 + 10) % (275 * S); y < H; y += 275 * S) AVENUES.push(y);

const LABELS = 10;

export function MapHeader({ pins }: { pins: Pin[] }) {
  const onMap = pins
    .filter((p) => !p.world)
    .map((p) => ({ p, at: xy(p.lat, p.lng) }))
    .filter(({ at: [x, y] }) => x >= 0 && x <= W && y >= 0 && y <= H);
  // places under events under clubs, the biggest clubs on top
  const order = (p: Pin) => (p.club && !p.event ? 2 : p.event ? 1 : 0);
  const drawn = [...onMap].sort((a, b) => order(a.p) - order(b.p) || a.p.mentions - b.p.mentions);
  const r = (p: Pin) =>
    p.club && !p.event ? 2.6 + Math.min(Math.log2(1 + p.mentions), 7) * 0.75 : p.event ? 3 : 2.6;
  // Name the biggest clubs, skipping one whose name would sit on another's.
  const named: { x: number; y: number; w: number; name: string }[] = [];
  for (const { p, at } of onMap
    .filter(({ p }) => p.club && !p.event)
    .sort((a, b) => b.p.mentions - a.p.mentions)) {
    if (named.length >= LABELS) break;
    const w = p.name.length * 7.4 + 8;
    const [x, y] = [at[0], at[1] - r(p) - 5];
    if (x - w / 2 < 8 || x + w / 2 > W - 8 || y < 18) continue;
    if (named.some((o) => Math.abs(o.x - x) < (o.w + w) / 2 && Math.abs(o.y - y) < 15)) continue;
    named.push({ x, y, w, name: p.name });
  }
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="map-hdr-svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="map-hdr-island">
          <polygon points={ISLAND_PTS} />
        </clipPath>
        <pattern id="map-hdr-dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.1" className="place-dot" />
        </pattern>
        <pattern id="map-hdr-waves" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1" className="map-hdr-wave" />
        </pattern>
      </defs>
      <rect width={W} height={H} className="place-paper" />
      <rect width={W} height={H} fill="url(#map-hdr-dots)" />
      {WATER.map((w, i) => (
        <g key={i}>
          <polygon points={w} className="rooms-water" />
          <polygon points={w} fill="url(#map-hdr-waves)" />
        </g>
      ))}
      <polygon points={ISLAND_PTS} className="map-hdr-island" />
      <g clipPath="url(#map-hdr-island)">
        {STREETS.map((x) => (
          <line key={`s${x}`} x1={x} y1={0} x2={x} y2={H} className="rooms-street" />
        ))}
        {AVENUES.map((y) => (
          <line key={`a${y}`} x1={0} y1={y} x2={W} y2={y} className="rooms-avenue" />
        ))}
      </g>
      <polygon points={ISLAND_PTS} className="rooms-shore" />
      {drawn.map(({ p, at: [x, y] }, i) => (
        <circle
          key={i}
          cx={x.toFixed(1)}
          cy={y.toFixed(1)}
          r={r(p).toFixed(1)}
          className={
            p.club && !p.event ? "map-hdr-club" : p.event ? "map-hdr-event" : "map-hdr-place"
          }
        />
      ))}
      {named.map((l) => (
        <text
          key={l.name}
          x={l.x.toFixed(1)}
          y={l.y.toFixed(1)}
          textAnchor="middle"
          className="map-hdr-label"
        >
          {l.name.toUpperCase()}
        </text>
      ))}
      <text x={W - 40} y={H - 24} textAnchor="end" className="map-hdr-river">
        EAST RIVER
      </text>
      <text x={W - 40} y={34} textAnchor="end" className="map-hdr-river">
        HUDSON RIVER
      </text>
      <g transform={`translate(70 ${H - 120})`}>
        <circle r="22" className="map-hdr-compass" />
        <path d="M14,0 L-8,-7 L-8,7 Z" fill="#111" />
        <text x="-2" y="40" textAnchor="middle" className="map-hdr-n">
          N
        </text>
      </g>
    </svg>
  );
}
