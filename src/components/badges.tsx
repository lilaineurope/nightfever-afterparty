import { Link } from "@tanstack/react-router";
import { useId } from "react";

// Badges (Lisa, 21 Nov 2026): gold for the Hall of Fame top 10 (src/lib/mentor-rank.ts), pink for the top 100 great
// connectors (the names dropped in the most AFTERPARTIES, src/lib/connector-rank.ts). Big: the club DOOR STAMP (Lisa's pick,
// option F of eight) - the smudgy rubber stamp on your wrist at the door, gold or pink ink. Small, next to a name: the flyer
// tape STICKER (option D). Drawn in code, no picture files.

const GOLD_INK = "#b8860b";
const PINK_INK = "#e0177a";

/** Rough rubber-stamp edges (displacement) and patchy ink (a soft noise mask). */
function Ink({ id, seed, patchy }: { id: string; seed: number; patchy: boolean }) {
  return (
    <>
      <filter id={`ink${id}`} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={seed} result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale={patchy ? 3.5 : 2.5} />
      </filter>
      {patchy && (
        <>
          <filter id={`blot${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves={3} seed={4} />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 0.75" />
          </filter>
          <mask id={`mask${id}`}>
            <rect width="240" height="170" fill="#fff" />
            <rect width="240" height="170" filter={`url(#blot${id})`} fill="#000" />
          </mask>
        </>
      )}
    </>
  );
}

/** Big stamp: double frame, the title, a small line and the rank. */
function BigStamp({ ink, title, line, rank, seed, label }: { ink: string; title: string; line: string; rank: number; seed: number; label: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 240 170" role="img" aria-label={label} className="h-24 w-auto shrink-0 sm:h-28">
      <defs><Ink id={id} seed={seed} patchy /></defs>
      <g transform="rotate(-8 120 85)" filter={`url(#ink${id})`} mask={`url(#mask${id})`} fill={ink}>
        <rect x="22" y="30" width="196" height="110" rx="10" fill="none" stroke={ink} strokeWidth="6" />
        <rect x="32" y="40" width="176" height="90" rx="6" fill="none" stroke={ink} strokeWidth="2" />
        <text x="120" y="70" textAnchor="middle" fontFamily="var(--font-flyer)" fontSize={title.length > 12 ? 17 : 22}>{title}</text>
        <text x="120" y="88" textAnchor="middle" fontFamily="var(--font-mono-body)" fontWeight="600" fontSize="11" letterSpacing="3">{line}</text>
        <text x="120" y="120" textAnchor="middle" fontFamily="var(--font-flyer)" fontSize="38">#{rank}</text>
      </g>
    </svg>
  );
}

/** Small badge for next to a name: the flyer tape sticker (option D, Lisa 21 Nov 2026 - "door stamp ... and d sticker"). */
function SmallSticker({ tone, text, label }: { tone: "gold" | "pink"; text: string; label: string }) {
  return <span role="img" aria-label={label} className={`badge-sticker badge-${tone}`}>{text}</span>;
}

/** Gold stamp: Hall of Fame top 10. Links to how it is worked out. */
export function HallOfFameBadge({ rank, small }: { rank: number; small?: boolean }) {
  const label = `Hall of Fame top 10, number ${rank}`;
  return (
    <Link to="/hall-of-fame-rules" title={label} className="inline-flex">
      {small ? <SmallSticker tone="gold" text={`TOP 10 · #${rank}`} label={label} /> : <BigStamp ink={GOLD_INK} title="HALL OF FAME" line="TOP 10" rank={rank} seed={3} label={label} />}
    </Link>
  );
}

/** Pink stamp: top 100 great connectors. Links to the Network's Great Connectors. */
export function ConnectorBadge({ rank, small }: { rank: number; small?: boolean }) {
  const label = `Top 100 great connector, number ${rank}`;
  return (
    <Link to="/network" title={label} className="inline-flex">
      {small ? <SmallSticker tone="pink" text={`TOP 100 · #${rank}`} label={label} /> : <BigStamp ink={PINK_INK} title="CONNECTOR" line="TOP 100" rank={rank} seed={9} label={label} />}
    </Link>
  );
}
