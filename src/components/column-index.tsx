import { EntityLink } from "@/components/entity-link";
import { EntityText } from "@/components/entity-text";
import type { CardView } from "@/lib/card-view";

// Column pages (Lisa, 21 Nov 2026): every piece that ran under the column, typed up like a magazine's contents page
// on the yellow of the column covers. A list we could only start says so in a stamp - "Known so far" - instead of
// pretending to be whole. Nothing here links off the site; names in the lines link to their own cards.

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";

export function ColumnIndex({ c, name }: { c: NonNullable<CardView["column"]>; name: string }) {
  const writer = c.writer.replace(/\s*\(.*\)$/, "");
  const extra = c.writer.slice(writer.length).trim();
  // "'Diary of a Mad Queen' (column)" -> "Diary of a Mad Queen"
  const title = name.replace(/\s*\([^)]*\)/g, "").replace(/^'|'$/g, "");
  return (
    <section aria-labelledby="every-column">
      <p className={h}>
        By <EntityLink name={writer} className="text-pink underline decoration-pink/40 underline-offset-4 hover:text-gold" />
        {extra && <> {extra}</>} · {c.publication} · {c.ran}
      </p>
      <div className="column-index mt-4">
        <div className="column-index-head">
          <h2 id="every-column" className="column-index-title">
            {c.complete ? "Every column" : "Known so far"}
          </h2>
          <span className={`column-index-stamp ${c.complete ? "" : "column-index-stamp-open"}`}>
            {c.complete ? `All ${c.articles.length}` : "List not complete"}
          </span>
        </div>
        <p className="column-index-how">
          {title} · {c.how}
        </p>
        {c.articles.length > 0 ? (
          <ol className="column-index-list">
            {c.articles.map((a, i) => (
              <li key={i} className="column-index-row">
                <span className="column-index-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="column-index-when">
                  {a.date ?? "Date not known"}
                  {a.issue && <span className="column-index-issue">{a.issue}</span>}
                </span>
                <span className="column-index-text">
                  {a.ours ? (
                    <EntityText text={a.title} self={name} className="column-index-name" />
                  ) : (
                    <strong className="column-index-headline">
                      <EntityText text={a.title} self={name} className="column-index-name" />
                    </strong>
                  )}
                  {a.note && <span className="column-index-note"> · {a.note}</span>}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="column-index-empty">No single column has been found and dated yet.</p>
        )}
        <p className="column-index-about">
          <EntityText text={c.about} self={name} className="column-index-name" />
        </p>
      </div>
    </section>
  );
}
