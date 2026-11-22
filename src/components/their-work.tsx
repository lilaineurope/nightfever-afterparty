import { Link } from "@tanstack/react-router";
import type { PersonWork, WorkKind } from "@/lib/works";

// "<first>'s work" (Lisa, 22 Nov 2026: Gabriel Rotello's page should show OutWeek; every person's own books, papers, films,
// TV, podcasts and music on their page). The Library newsstand look: real covers where we have them, typed covers for the
// rest, each linking to the item's own page. Works no guest has dropped yet sit at the end with a dashed edge and no link.
// The list comes from src/lib/works.ts (card-view.server.ts for A–Z pages, episode-page.tsx for guests).

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";

const LABEL: Record<WorkKind, string> = {
  Book: "Book", Diary: "Diary", Magazine: "Magazine", Paper: "Newspaper", Column: "Column", Film: "Film", TV: "TV", Podcast: "Podcast", Music: "Music", Play: "Stage",
};
const GROUP: Record<WorkKind, string> = {
  Book: "Books", Diary: "Books", Magazine: "Magazines & papers", Paper: "Magazines & papers", Column: "Columns & articles",
  Film: "Films", TV: "TV & videos", Podcast: "Podcasts", Music: "Music", Play: "On stage",
};
const COLOUR: Record<WorkKind, string> = {
  Book: "lib-ink", Diary: "lib-diary", Magazine: "lib-pink", Paper: "lib-news", Column: "lib-col", Film: "lib-ink", TV: "lib-pink", Podcast: "lib-col", Music: "lib-news", Play: "lib-pink",
};

function Cover({ w }: { w: PersonWork }) {
  const foot = (
    <span className="lib-foot">
      {w.roles.join(" · ")}
      {w.year && <> · {w.year}</>}
    </span>
  );
  if (w.cover)
    return (
      <span className="lib-cv lib-book">
        <img src={w.cover} alt={`Cover of ${w.name}`} loading="lazy" decoding="async" />
        <span className="lib-strip">
          <span className="lib-nm">{w.name}</span>
          {foot}
        </span>
      </span>
    );
  return (
    <span className={`lib-cv lib-type ${COLOUR[w.kind]}`}>
      <span className="lib-kind">{LABEL[w.kind]}{w.offShow && <> · not on the show yet</>}</span>
      <span className={`lib-mast${w.name.length > 44 ? " lib-mast-xl" : w.name.length > 24 ? " lib-mast-l" : ""}`}>{w.name}</span>
      {foot}
    </span>
  );
}

export function TheirWork({ works, first, id = "their-work" }: { works: PersonWork[]; first: string; id?: string }) {
  if (!works.length) return null;
  const onShow = works.filter((w) => !w.offShow);
  const off = works.filter((w) => w.offShow);
  const groups: [string, PersonWork[]][] = [];
  for (const w of onShow) {
    const g = GROUP[w.kind];
    const have = groups.find(([k]) => k === g);
    if (have) have[1].push(w);
    else groups.push([g, [w]]);
  }
  const many = onShow.length > 6 && groups.length > 1;
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="their-work">
      <h2 id={`${id}-h`} className={`${h} text-center`}>{first}'s work</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
        What {first} made, wrote, ran or starred in{onShow.length ? " - tap one for its page" : ""}.
      </p>
      {(many ? groups : [["", onShow] as [string, PersonWork[]]]).filter(([, list]) => list.length).map(([g, list], i, all) => (
        <div key={g || "all"}>
          {g && <h3 className="their-work-group">{g}</h3>}
          <ul className="lib-grid their-work-grid">
            {list.map((w) => (
              <li key={w.slug ?? w.name} className="lib-item">
                <Link to="/explore/$slug" params={{ slug: w.slug! }} className="lib-hit">
                  <Cover w={w} />
                </Link>
              </li>
            ))}
            {/* Works no guest has dropped yet: same row when the list is short, dashed, no link. */}
            {!many && i === all.length - 1 && off.map((w) => (
              <li key={w.name} className="lib-item their-work-off">
                <Cover w={w} />
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!many && onShow.length === 0 && off.length > 0 && (
        <ul className="lib-grid their-work-grid">
          {off.map((w) => (
            <li key={w.name} className="lib-item their-work-off">
              <Cover w={w} />
            </li>
          ))}
        </ul>
      )}
      {many && off.length > 0 && (
        <>
          <h3 className="their-work-group">Not dropped on the show yet</h3>
          <ul className="lib-grid their-work-grid">
            {off.map((w) => (
              <li key={w.name} className="lib-item their-work-off">
                <Cover w={w} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
