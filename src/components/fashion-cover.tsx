import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { cardTo } from "@/lib/card-link";
import { polaroidThumb } from "@/lib/polaroids";
import type { FashionItem } from "@/data/library-fashion";

// Covers for the Library's Fashion & outfits category (Lisa, 24 Nov 2026), used by CoverCard (library-cover.tsx):
// - a look is a fabric swatch card: its own colours (sampled from the story or the screenshots) as cloth strips with
//   pinked edges, a tag (On camera / Look), its name, whose look and the episode;
// - a designer or label is a typed black cover, or the guest's polaroid when they have an AFTERPARTY;
// - a shop is a pink carrier bag with a paper handle;
// - a mood that isn't worn (a room, décor, a moment) is a swatch card too, with a black Mood tag.
// No outside pictures: nothing to license or credit.

/** Big type for short names; smaller when a long word would otherwise break mid-word ("Trash and Vaudeville"). */
const mastClass = (name: string) => {
  const longest = Math.max(...name.split(/\s+/).map((w) => w.length));
  return `lib-mast fsh-mast${longest >= 9 || name.length > 30 ? " fsh-mast-s" : ""}`;
};
const afterparties = (n: number) => `${n} ${n === 1 ? "Afterparty" : "Afterparties"}`;

export function FashionCover({ item }: { item: FashionItem }) {
  const f = item.fashion;
  const eps = new Set(item.moments.map((m) => m.episodeId)).size;
  const dropped = (
    <>
      <b>{item.mentions > 0 ? `${item.mentions}×` : "–"}</b>dropped in {afterparties(eps)}
    </>
  );

  if (f.look) {
    const l = f.look;
    const cloth = l.palette.length ? l.palette : ["#111111"];
    return (
      <span className={`lib-cv fsh-look${f.tag === "On camera" ? " fsh-cam" : f.tag === "Mood" ? " fsh-mood" : ""}`}>
        <span className="fsh-cloth" aria-hidden="true">
          {cloth.map((hex, i) => (
            <span key={i} style={{ "--c": hex } as CSSProperties} />
          ))}
        </span>
        <span className="fsh-tag">{f.tag}</span>
        <span className="fsh-label">
          <span className="fsh-nm">{f.tag === "On camera" && l.who ? `${l.who.name}` : item.name}</span>
          <span className="lib-foot">
            {f.tag === "On camera" ? (
              <>
                {l.code} · on camera
              </>
            ) : (
              <>
                {l.who ? `${l.who.name} · ` : ""}
                {l.code}
                {item.mentions > 1 ? ` · ${item.mentions}×` : ""}
              </>
            )}
          </span>
        </span>
      </span>
    );
  }

  const polaroid = f.polaroidEpisode ? polaroidThumb(f.polaroidEpisode, 512) : undefined;
  if (polaroid)
    return (
      <span className="lib-cv lib-book lib-diary-cover fsh-face">
        <img src={polaroid} alt={`${item.name} - their AFTERPARTY polaroid`} loading="lazy" decoding="async" />
        <span className="fsh-tag">{f.tag}</span>
        <span className="lib-strip">
          <span className="lib-nm">{item.name}</span>
          <span className="lib-foot">{dropped}</span>
        </span>
      </span>
    );

  if (f.kind === "shop")
    return (
      <span className="lib-cv lib-type fsh-bag">
        <span className="fsh-handle" aria-hidden="true" />
        <span className="lib-kind">Shop</span>
        <span className={mastClass(item.name)}>{item.name}</span>
        <span className="lib-foot">{dropped}</span>
      </span>
    );

  return (
    <span className="lib-cv lib-type lib-ink fsh-label-cover">
      <span className="lib-kind">{f.tag}</span>
      <span className={mastClass(item.name)}>{item.name}</span>
      {f.note && <span className="fsh-note">{f.note}</span>}
      <span className="lib-foot">{dropped}</span>
    </span>
  );
}

/** The words under the name in the tap-open box: what is worn, whose look it is, the designers its story names. */
export function FashionNote({ item }: { item: FashionItem }) {
  const f = item.fashion;
  const l = f.look;
  if (!l) return f.note ? <>{f.note}</> : null;
  return (
    <>
      <span className="text-cream">{l.worn}</span>
      {l.who && (
        <>
          {" · "}
          {l.who.slug ? (
            <Link {...cardTo(l.who.slug)} className="text-gold hover:text-pink">
              {l.who.name}
            </Link>
          ) : (
            l.who.name
          )}
        </>
      )}
      {l.designers.length > 0 && (
        <>
          {" · by "}
          {l.designers.map((d, i) => (
            <span key={d.slug}>
              {i > 0 && " & "}
              <Link {...cardTo(d.slug)} className="text-gold hover:text-pink">
                {d.name}
              </Link>
            </span>
          ))}
        </>
      )}
      {l.palette.length > 0 && (
        <span className="fsh-dots" aria-hidden="true">
          {l.palette.map((hex, i) => (
            <span key={i} style={{ background: hex }} />
          ))}
        </span>
      )}
    </>
  );
}
