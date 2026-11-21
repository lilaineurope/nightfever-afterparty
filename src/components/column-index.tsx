import { EntityLink } from "@/components/entity-link";
import { EntityText } from "@/components/entity-text";
import { FanSuggestions } from "@/components/fan-suggestions";
import type { CardView } from "@/lib/card-view";

// Column pages (Lisa, 21 Nov 2026): every piece that ran under the column, typed up like a magazine's contents page
// on the yellow of the column covers. A list we could only start says so in a stamp - "Known so far" - instead of
// pretending to be whole. Each line opens the piece where it can be read, in a new tab (Lisa, 21 Nov 2026: "make each
// column clickable and connect to the article" - her exception to the outside-links rule). Lines with nowhere to read
// them yet link their names to our own cards instead. Under the list, "Suggest a source" (the shared fan_suggestions box).

type Article = NonNullable<CardView["column"]>["articles"][number];

function Row({ a, i }: { a: Article; i: number }) {
  return (
    <>
      <span className="column-index-no">{String(i + 1).padStart(2, "0")}</span>
      <span className="column-index-when">
        {a.date ?? "Date not known"}
        {a.issue && <span className="column-index-issue">{a.issue}</span>}
      </span>
    </>
  );
}

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
              <li key={i}>
                {a.source ? (
                  <a href={a.source} target="_blank" rel="noopener noreferrer" className="column-index-row column-index-link">
                    <Row a={a} i={i} />
                    <span className="column-index-text">
                      <span className={a.ours ? undefined : "column-index-headline"}>{a.title}</span>
                      {a.note && <span className="column-index-note"> · {a.note}</span>}
                      <span className="column-index-read">{a.source.includes("outweek") ? "Read the scan" : "Read it"} &#8599;</span>
                    </span>
                  </a>
                ) : (
                  <div className="column-index-row">
                    <Row a={a} i={i} />
                    <span className="column-index-text">
                      <span className={a.ours ? undefined : "column-index-headline"}>
                        <EntityText text={a.title} self={name} className="column-index-name" />
                      </span>
                      {a.note && <span className="column-index-note"> · {a.note}</span>}
                    </span>
                  </div>
                )}
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
      <FanSuggestions box="columns" kind={c.suggestKind} className="mt-10" />
    </section>
  );
}
