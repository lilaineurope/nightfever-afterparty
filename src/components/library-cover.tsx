import type { CollectionItem } from "@/data/collections";
import { coverFor } from "@/data/library-covers";
import { polaroidThumb } from "@/lib/polaroids";
import { isScreenItem } from "@/data/moving-images";
import { FULL_WATCH } from "@/data/screen-full";
import headPaper from "@/assets/library/col-head-paper.webp";
import headOutweek from "@/assets/library/col-head-outweek.webp";
import headSoho from "@/assets/library/col-head-soho-news.webp";
import faceHeimel from "@/assets/library/col-face-cynthia-heimel.webp";

// One Library cover (the newsstand look): used by the Library (src/routes/library.tsx) and each guest's own Library
// (src/routes/library_.$slug.tsx).

const KIND: Record<string, string> = {
  books: "Books",
  magazines: "Magazines",
  newspapers: "Newspapers",
  columns: "Columns",
  diaries: "Diary",
  movies: "Film",
  documentaries: "Documentary",
  "tv-shows": "TV",
  "music-videos": "Music video",
};
const episodesOf = (it: CollectionItem) => new Set(it.moments.map((m) => m.episodeId)).size;
const afterparties = (n: number) => `${n} ${n === 1 ? "Afterparty" : "Afterparties"}`;

// Lisa, 21 Nov 2026: a diary's cover is the polaroid of the guest or host who kept it (their AFTERPARTY episode).
const DIARY_KEEPER: Record<string, string> = {
  "James St. James's diaries (1981–91)": "s06e01",
  "Nora Burns's diaries (1980)": "s06e05",
  "Miss Guy's journals (1989)": "s03e10",
  "Richard Boch's journals": "s02e11",
  "Ann Magnuson's journals": "s04e10",
  "Mickey Boardman's journal": "s04e02",
};

// Lisa, 21 Nov 2026: a column shows where it ran (masthead band) over the writer's polaroid (their AFTERPARTY episode).
const COLUMN_IN: Record<string, { paper: string; head: string; writer?: string; face?: string }> = {
  "Lunch with Lauren (Paper column)": { paper: "Paper", head: headPaper, writer: "s04e06" },
  "Fat and All That (Paper column)": { paper: "Paper", head: headPaper, writer: "s04e02" },
  "'Diary of a Mad Queen' (column)": { paper: "OutWeek", head: headOutweek, writer: "s06e01" },
  "Ms. Lonely Hearts": { paper: "the SoHo News", head: headSoho, face: faceHeimel }, // Cynthia Heimel, from her In memoriam polaroid
};

export function CoverCard({ item, tint }: { item: CollectionItem; tint: number }) {
  const cover = coverFor(item.name);
  const keeper = item.shelf === "diaries" ? DIARY_KEEPER[item.name] : undefined;
  const polaroid = keeper ? polaroidThumb(keeper, 512) : undefined;
  const column = item.shelf === "columns" ? COLUMN_IN[item.name] : undefined;
  const foot = (
    <span className="lib-foot">
      {item.by ? (
        <>by {item.by.name}</>
      ) : (
        <>
          <b>{item.mentions > 0 ? `${item.mentions}×` : "–"}</b>dropped in{" "}
          {afterparties(episodesOf(item))}
        </>
      )}
    </span>
  );
  // Cover art & posters (Lisa, 24 Nov 2026): the whole piece shows, never cropped - a square sleeve, a tall poster or a
  // wide ticket sits on black with a tag saying what it is, the designer under the name when the credits name them.
  if (item.art)
    return (
      <span className="lib-cv lib-art">
        <img src={item.art.src} alt={`${item.art.piece} - ${item.name}`} loading="lazy" decoding="async" />
        <span className="lib-art-tag">{item.shelf === "club-pieces" ? "From the club" : item.art.piece}</span>
        <span className="lib-strip">
          <span className="lib-nm">{item.name}</span>
          {item.shelf === "club-pieces" && <span className="lib-art-by">{item.art.piece}</span>}
          {item.art.designers.length > 0 && <span className="lib-art-by">Cover: {item.art.designers.join(" & ")}</span>}
          {foot}
        </span>
      </span>
    );
  // Moving Images (Lisa, 24 Nov 2026): the poster or title card whole on black, like Cover art & posters, tagged Film / TV /
  // Documentary; without one, a black screen card with the title.
  if (isScreenItem(item)) {
    const pic = cover?.kind === "book" && !/^Photo:|^Logo/i.test(cover.credit) ? cover.src : undefined;
    return (
      <span className={`lib-cv lib-art lib-screen${pic ? "" : " lib-screen-type"}`}>
        {pic ? (
          <img src={pic} alt={`${item.shelf === "tv-shows" ? "Title card" : "Poster"} - ${item.name}`} loading="lazy" decoding="async" />
        ) : (
          <span className="lib-screen-nm" aria-hidden>
            {item.name}
          </span>
        )}
        <span className="lib-art-tag">{KIND[item.shelf]}</span>
        {FULL_WATCH[item.slug] && <span className="lib-full">▶ In full</span>}
        <span className="lib-strip">
          <span className="lib-nm">{item.name}</span>
          {foot}
        </span>
      </span>
    );
  }
  // Lisa, 21 Nov 2026: the keeper's portrait fills the whole diary cover.
  if (polaroid)
    return (
      <span className="lib-cv lib-book lib-diary-cover">
        <img
          src={polaroid}
          alt={`${item.name} - cover with the keeper's portrait`}
          loading="lazy"
          decoding="async"
        />
        <span className="lib-diary-tag">Diary</span>
        <span className="lib-strip">
          <span className="lib-nm">{item.name}</span>
          {foot}
        </span>
      </span>
    );
  if (column) {
    const face = column.face ?? (column.writer ? polaroidThumb(column.writer, 512) : undefined);
    return (
      <span className={`lib-cv lib-book lib-col-cover${face ? "" : " lib-col-noface"}`}>
        {face && (
          <img
            src={face}
            alt={`${item.name} - the writer's portrait`}
            loading="lazy"
            decoding="async"
          />
        )}
        <span className="lib-col-band">
          <img src={column.head} alt={`${column.paper} masthead`} loading="lazy" decoding="async" />
          <span>Column in {column.paper}</span>
        </span>
        <span className="lib-strip">
          <span className="lib-nm">{item.name}</span>
          {foot}
        </span>
      </span>
    );
  }
  if (cover?.kind === "book")
    return (
      <span className="lib-cv lib-book">
        <img src={cover.src} alt={`Cover of ${item.name}`} loading="lazy" decoding="async" />
        <span className="lib-strip">
          <span className="lib-nm">{item.name}</span>
          {foot}
        </span>
      </span>
    );
  // Magazines alternate pink and black; newspapers are newsprint; columns are marker yellow; diaries are burgundy notebooks; books without a cover are black.
  const colour =
    item.shelf === "newspapers"
      ? "lib-news"
      : item.shelf === "columns"
        ? "lib-col"
        : item.shelf === "diaries"
          ? "lib-diary"
          : item.shelf === "books"
            ? "lib-ink"
            : tint % 2
              ? "lib-ink"
              : "lib-pink";
  return (
    <span className={`lib-cv lib-type ${colour}`}>
      <span className="lib-kind">{KIND[item.shelf]}</span>
      {cover?.kind === "mast" ? (
        <>
          <img
            className="lib-logo"
            src={cover.src}
            alt={`${item.name} masthead`}
            loading="lazy"
            decoding="async"
          />
          <span className="lib-lines">
            The AFTERPARTY issue
            <br />
            {item.name}
          </span>
        </>
      ) : (
        <span
          className={`lib-mast${item.name.length > 44 ? " lib-mast-xl" : item.name.length > 24 ? " lib-mast-l" : ""}`}
        >
          {item.name}
        </span>
      )}
      {foot}
    </span>
  );
}
