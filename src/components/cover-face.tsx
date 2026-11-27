import type { ReactNode } from "react";
import type { CoverDesign } from "@/lib/cover-design";

// Draws one Library cover from its CoverDesign (src/lib/cover-design.ts). Loads no data, so any page can use it - the
// Library shelves, a guest's own Library and "Also on the shelf in these Afterparties" all look the same.

const afterparties = (n: number) => `${n} ${n === 1 ? "Afterparty" : "Afterparties"}`;

export function CoverFace({ d }: { d: CoverDesign }) {
  const foot = (
    <span className="lib-foot">
      {"by" in d.foot ? (
        <>by {d.foot.by}</>
      ) : (
        <>
          <b>{d.foot.mentions > 0 ? `${d.foot.mentions}×` : "–"}</b>dropped in{" "}
          {afterparties(d.foot.afterparties)}
        </>
      )}
    </span>
  );
  const strip = (extra?: ReactNode) => (
    <span className="lib-strip">
      <span className="lib-nm">{d.name}</span>
      {extra}
      {foot}
    </span>
  );
  switch (d.look) {
    case "art":
      return (
        <span className="lib-cv lib-art">
          <img src={d.src} alt={d.alt} loading="lazy" decoding="async" />
          <span className="lib-art-tag">{d.tag}</span>
          {strip(
            d.lines.map((l) => (
              <span key={l} className="lib-art-by">
                {l}
              </span>
            )),
          )}
        </span>
      );
    case "screen":
      return (
        <span className={`lib-cv lib-art lib-screen${d.src ? "" : " lib-screen-type"}`}>
          {d.src ? (
            <img src={d.src} alt={d.alt} loading="lazy" decoding="async" />
          ) : (
            <span className="lib-screen-nm" aria-hidden>
              {d.name}
            </span>
          )}
          <span className="lib-art-tag">{d.tag}</span>
          {d.full && <span className="lib-full">▶ In full</span>}
          {strip()}
        </span>
      );
    case "diary":
      return (
        <span className="lib-cv lib-book lib-diary-cover">
          <img
            src={d.src}
            alt={`${d.name} - cover with the keeper's portrait`}
            loading="lazy"
            decoding="async"
          />
          <span className="lib-diary-tag">Diary</span>
          {strip()}
        </span>
      );
    case "column":
      return (
        <span className={`lib-cv lib-book lib-col-cover${d.face ? "" : " lib-col-noface"}`}>
          {d.face && (
            <img
              src={d.face}
              alt={`${d.name} - the writer's portrait`}
              loading="lazy"
              decoding="async"
            />
          )}
          <span className="lib-col-band">
            <img src={d.head} alt={`${d.paper} masthead`} loading="lazy" decoding="async" />
            <span>Column in {d.paper}</span>
          </span>
          {strip()}
        </span>
      );
    case "book":
      return (
        <span className="lib-cv lib-book">
          <img src={d.src} alt={`Cover of ${d.name}`} loading="lazy" decoding="async" />
          {strip()}
        </span>
      );
    case "type":
      return (
        <span className={`lib-cv lib-type ${d.colour}`}>
          <span className="lib-kind">{d.kind}</span>
          {d.mast ? (
            <>
              <img
                className="lib-logo"
                src={d.mast}
                alt={`${d.name} masthead`}
                loading="lazy"
                decoding="async"
              />
              <span className="lib-lines">
                The AFTERPARTY issue
                <br />
                {d.name}
              </span>
            </>
          ) : (
            <span
              className={`lib-mast${d.name.length > 44 ? " lib-mast-xl" : d.name.length > 24 ? " lib-mast-l" : ""}`}
            >
              {d.name}
            </span>
          )}
          {foot}
        </span>
      );
  }
}
