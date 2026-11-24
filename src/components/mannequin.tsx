import { useId } from "react";
import type { Slot } from "@/data/fashion-words";

// The Wardrobe's figure (src/routes/wardrobe.tsx, Clueless-style), shared so a Library look can be dressed on it
// (Lisa, 24 Nov 2026: "a page per look and outfit ... with a mannequin setup like we have it in wardrobe"). The same
// drawings: hair or hat, top or dress, skirt or trousers or legwear, shoes, and one finishing touch. A rail the look
// doesn't name stays bare - the dress form shows through. When the Wardrobe relaunches it can draw with this too.

export type Garb = { label: string; hex: string; full?: boolean | undefined };
export type Outfit = Partial<Record<Slot, Garb>>;

const texture = (label: string) => {
  const l = label.toLowerCase();
  if (/sequin|glitter|rhinestone|sparkle|lam[eé]|crystal|diamant|bugle|bead/.test(l)) return "sparkle";
  if (/stripe|pinstripe|breton/.test(l)) return "stripe";
  if (/plaid|tartan|gingham|check/.test(l)) return "plaid";
  if (/leopard|animal|zebra|cheetah/.test(l)) return "spots";
  if (/fishnet|lace|net|mesh/.test(l)) return "mesh";
  if (/polka|dot/.test(l)) return "dots";
  return "";
};

export const isTrousers = (l: string) => /trouser|pants|jeans|chino|leggings|flares|slacks|501|bell-bottom/i.test(l);
const isLegwear = (l: string) => /stocking|fishnet|tights|garter|pantyhose/i.test(l);
const isHat = (l: string) => /hat|cap\b|caps|beanie|beret|crown|tiara|headdress|headpiece|turban|veil|wimple|halo|horn/i.test(l);
const isFace = (l: string) => /lip|rouge|eyeliner|mascara|lash|make-?up|paint|frames|glasses|sunglasses|shades|lens|mask|beauty|eye/i.test(l);
const isDrape = (l: string) => /boa|feather|fur|mink|stole|shawl|scarf|scarves|cape/i.test(l);
const isNecklace = (l: string) => /pearl|bead|necklace|chain|choker|collar|rhinestone|crystal|jewel|brooch/i.test(l);

function Patterns({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={`${id}-sparkle`} width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#fff" opacity="0.85" /><circle cx="6" cy="6" r="0.9" fill="#fff" opacity="0.55" /></pattern>
      <pattern id={`${id}-stripe`} width="7" height="7" patternUnits="userSpaceOnUse"><rect width="3" height="7" fill="#000" opacity="0.28" /></pattern>
      <pattern id={`${id}-plaid`} width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="3" fill="#000" opacity="0.22" /><rect width="3" height="12" fill="#fff" opacity="0.2" /><rect y="7" width="12" height="1" fill="#c62828" opacity="0.5" /></pattern>
      <pattern id={`${id}-spots`} width="14" height="14" patternUnits="userSpaceOnUse"><ellipse cx="4" cy="4" rx="3" ry="2.2" fill="#2a1a0e" opacity="0.7" /><ellipse cx="11" cy="11" rx="2.4" ry="1.8" fill="#2a1a0e" opacity="0.6" /></pattern>
      <pattern id={`${id}-mesh`} width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 0L6 6M6 0L0 6" stroke="#000" strokeWidth="0.9" opacity="0.7" /></pattern>
      <pattern id={`${id}-dots`} width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="2.2" fill="#fff" opacity="0.85" /></pattern>
      <linearGradient id={`${id}-sheen`} x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.4" /><stop offset="0.55" stopColor="#fff" stopOpacity="0" /></linearGradient>
    </defs>
  );
}

function Fill({ d, garb, id, ink }: { d: string; garb: Garb; id: string; ink: string }) {
  const tex = texture(garb.label);
  return (
    <>
      <path d={d} fill={garb.hex} stroke={ink} strokeWidth="1.6" strokeLinejoin="round" />
      {tex && <path d={d} fill={`url(#${id}-${tex})`} />}
      <path d={d} fill={`url(#${id}-sheen)`} />
    </>
  );
}

/** The outfit on the figure. */
export function Mannequin({ outfit, ink = "#111", className, label }: { outfit: Outfit; ink?: string; className?: string; label?: string }) {
  const id = `mq${useId().replace(/[^\w]/g, "")}`;
  const { head, top, bottom, feet, extra } = outfit;
  const full = !!top?.full;
  const skin = "#e9d3c0";
  return (
    <svg viewBox="0 0 200 420" className={className} role="img" aria-label={label ?? "The outfit on a mannequin"}>
      <Patterns id={id} />
      <g fill={skin} stroke={ink} strokeWidth="1.4">
        <circle cx="100" cy="52" r="22" />
        <rect x="92" y="70" width="16" height="16" />
        <path d="M66 92Q100 80 134 92L146 190L134 192L126 120L124 200L76 200L74 120L66 192L54 190Z" />
        <path d="M78 200L76 380L94 380L100 236L106 380L124 380L122 200Z" />
      </g>
      {!full && bottom && isLegwear(bottom.label) && <Fill id={id} ink={ink} garb={bottom} d="M78 200L76 380L94 380L100 236L106 380L124 380L122 200Z" />}
      {!full && bottom && !isLegwear(bottom.label) &&
        (isTrousers(bottom.label) ? (
          <Fill id={id} ink={ink} garb={bottom} d="M76 192L124 192L127 378L105 378L100 238L95 378L73 378Z" />
        ) : (
          <Fill id={id} ink={ink} garb={bottom} d="M78 190L122 190L140 286L60 286Z" />
        ))}
      {top &&
        (full ? (
          <Fill id={id} ink={ink} garb={top} d="M66 92Q100 82 134 92L140 130L126 132L124 170L150 318L50 318L76 170L74 132L60 130Z" />
        ) : (
          <Fill id={id} ink={ink} garb={top} d="M64 92Q100 80 136 92L148 150L132 154L128 128L126 200L74 200L72 128L68 154L52 150Z" />
        ))}
      {feet && (
        <>
          <Fill id={id} ink={ink} garb={feet} d="M70 378L96 378L97 392L66 394Q64 386 70 378Z" />
          <Fill id={id} ink={ink} garb={feet} d="M104 378L130 378Q136 386 134 394L103 392Z" />
        </>
      )}
      {head &&
        (isHat(head.label) ? (
          <Fill id={id} ink={ink} garb={head} d="M70 40Q100 4 130 40L144 44Q100 34 56 44Z" />
        ) : isFace(head.label) ? (
          /lip/i.test(head.label) ? (
            <Fill id={id} ink={ink} garb={head} d="M92 62Q100 58 108 62Q100 68 92 62Z" />
          ) : (
            <Fill id={id} ink={ink} garb={head} d="M82 46L96 46L96 54L82 54ZM104 46L118 46L118 54L104 54ZM96 49L104 49L104 51L96 51Z" />
          )
        ) : (
          <Fill id={id} ink={ink} garb={head} d="M76 56Q72 18 100 18Q128 18 124 56L128 84L116 80L118 50Q100 34 82 50L84 80L72 84Z" />
        ))}
      {extra &&
        (isDrape(extra.label) ? (
          <Fill id={id} ink={ink} garb={extra} d="M60 92Q100 120 140 92L146 104Q100 136 54 104Z" />
        ) : isNecklace(extra.label) ? (
          <g>
            {[...Array(9)].map((_, i) => (
              <circle key={i} cx={84 + i * 4} cy={94 + Math.sin((i / 8) * Math.PI) * 10} r="2.6" fill={extra.hex} stroke={ink} strokeWidth="0.6" />
            ))}
          </g>
        ) : /bag|clutch|purse|lunchbox/i.test(extra.label) ? (
          <Fill id={id} ink={ink} garb={extra} d="M146 196L168 196L170 222L144 222Z" />
        ) : (
          <Fill id={id} ink={ink} garb={extra} d="M160 40L165 54L180 54L168 63L172 78L160 69L148 78L152 63L140 54L155 54Z" />
        ))}
    </svg>
  );
}
