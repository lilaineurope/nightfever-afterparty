import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { cardTo } from "@/lib/card-link";
import { polaroidThumb } from "@/lib/polaroids";
import { PERSON_PORTRAITS } from "@/data/person-portraits";
import { SHOP_PHOTOS } from "@/data/shop-photos";
import { Mannequin } from "@/components/mannequin";
import type { FashionItem } from "@/data/library-fashion";

// Covers for the Library's Fashion & outfits category (Lisa, 24 Nov 2026), drawn by CoverFace (cover-face.tsx) for every Library cover:
// - a look is the Wardrobe mannequin dressed in it, on a fabric swatch card: its own colours (sampled from the story or the screenshots) as cloth strips with
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
    const dressed = f.tag !== "Mood" && Object.keys(l.outfit).length > 0;
    return (
      <span className={`lib-cv fsh-look${f.tag === "On camera" ? " fsh-cam" : f.tag === "Mood" ? " fsh-mood" : ""}`}>
        {/* A look you can wear stands on the mannequin (Lisa, 24 Nov 2026); a room or a moment stays a swatch. */}
        <span className={`fsh-cloth${dressed ? " fsh-dressed" : ""}`} aria-hidden="true">
          {cloth.map((hex, i) => (
            <span key={i} style={{ "--c": hex } as CSSProperties} />
          ))}
          {dressed && <Mannequin outfit={l.outfit} className="fsh-mq" />}
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

  // A designer's or label's face: their AFTERPARTY polaroid, else their person polaroid, else the label's maker's.
  const polaroid = f.polaroidEpisode ? polaroidThumb(f.polaroidEpisode, 512) : f.face ? PERSON_PORTRAITS[f.face]?.polaroid : undefined;
  if (polaroid)
    return (
      <span className="lib-cv lib-book lib-diary-cover fsh-face">
        <img src={polaroid} alt={`${f.maker?.name ?? item.name} - polaroid`} loading="lazy" decoding="async" />
        <span className="fsh-tag">{f.tag}</span>
        <span className="lib-strip">
          <span className="lib-nm">{item.name}</span>
          {f.maker && <span className="lib-art-by">{f.maker.name}'s label</span>}
          <span className="lib-foot">{dropped}</span>
        </span>
      </span>
    );

  // A shop shows its free photo (Lisa, 27 Nov 2026: "cover pictures also"), else its Gemini-made polaroid (28 Nov, shopfront on the right, so the 3:4 cover keeps the right side); the bag is the fallback.
  const shopPhoto = f.kind === "shop" ? SHOP_PHOTOS[item.slug] : undefined;
  if (shopPhoto)
    return (
      <span className="lib-cv fsh-shop-photo">
        <img src={shopPhoto.src} alt={shopPhoto.alt} loading="lazy" decoding="async" style={shopPhoto.drawing ? { objectPosition: "82% 50%" } : undefined} />
        <span className="fsh-tag">Shop</span>
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
