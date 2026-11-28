import { Link } from "@tanstack/react-router";
import { EntityLink } from "@/components/entity-link";
import { linkToSlug, useLinks } from "@/lib/link-index";

const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";
const TILT = [-3, 2, -1.5, 2.5, -2, 1];

/** The names in a story box (rooms, who they lifted up, a club's stage, "also" lists) as a pile of small polaroids
 *  (Lisa, 27 Nov 2026: make the pages "cohesive and sticky"): every name that has a picture on the site - a person's
 *  polaroid, a guest's AFTERPARTY polaroid, a club's polaroid or ticket, a Library cover - shows it, so the next page
 *  is a face to tap instead of a word. Names without a picture stay chips, after the pictures. */
export function NamePile({ names, faces }: { names: string[]; faces: Record<string, { src: string; framed?: boolean }> | undefined }) {
  const pics = names.filter((n) => faces?.[n]);
  const rest = names.filter((n) => !faces?.[n]);
  return (
    <>
      {pics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-4">
          {pics.map((n, i) => (
            <EntityLink key={n} name={n} className="group block w-[84px] text-center">
              <Face face={faces![n]!} i={i} />
              <span className="mt-1.5 block text-[11px] leading-tight text-card-foreground/80 transition-colors group-hover:text-pink">{n}</span>
            </EntityLink>
          ))}
        </div>
      )}
      {rest.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{rest.map((x) => <EntityLink key={x} name={x} className={chip} />)}</div>}
    </>
  );
}

/** The same pile for the A–Z lists under a card ("Also named on these cards", "In the same rooms", "Pops up in the guests'
 *  stories", "On these AFTERPARTY pages" - Lisa, 28 Nov 2026: "don't we show them with picture boxes instead?"). Items link
 *  by slug; `sub` is the small grey line under the name (the episode code, or what kind of page it is). */
export function SlugPile({ items, faces }: { items: { slug: string; name: string; sub?: string | undefined }[]; faces: Record<string, { src: string; framed?: boolean }> | undefined }) {
  const links = useLinks();
  const pics = items.filter((x) => faces?.[x.name]);
  const rest = items.filter((x) => !faces?.[x.name]);
  return (
    <>
      {pics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-4">
          {pics.map((x, i) => (
            <Link key={x.slug} {...linkToSlug(links, x.slug)} className="group block w-[84px] text-center">
              <Face face={faces![x.name]!} i={i} />
              <span className="mt-1.5 block text-[11px] leading-tight text-card-foreground/80 transition-colors group-hover:text-pink">{x.name}</span>
              {x.sub && <span className="block text-[10px] leading-tight text-muted-foreground">{x.sub}</span>}
            </Link>
          ))}
        </div>
      )}
      {rest.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {rest.map((x) => (
            <Link key={x.slug} {...linkToSlug(links, x.slug)} className={chip}>
              {x.name}
              {x.sub && <span className="ml-1.5 text-muted-foreground">{x.sub}</span>}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

function Face({ face, i }: { face: { src: string; framed?: boolean }; i: number }) {
  return (
    <span
      className="block border border-[#111]/15 bg-white p-1 pb-1.5 shadow-[2px_3px_0_#111] transition-transform group-hover:rotate-0 group-hover:shadow-[3px_4px_0_var(--pink,#e0007a)]"
      style={{ transform: `rotate(${TILT[i % TILT.length]}deg)` }}
    >
      <span className="block aspect-square w-full overflow-hidden">
        {face.framed ? (
          // A whole polaroid card: show only its photo (40-680 px of the 720 px wide card).
          <img src={face.src} alt="" loading="lazy" decoding="async" className="block w-[112.5%] max-w-none" style={{ margin: "-6.25% 0 0 -6.25%" }} />
        ) : (
          <img src={face.src} alt="" loading="lazy" decoding="async" className="block h-full w-full object-cover" />
        )}
      </span>
    </span>
  );
}
