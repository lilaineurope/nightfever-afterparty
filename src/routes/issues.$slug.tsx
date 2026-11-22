import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { pageHead, jsonLd, abs } from "@/lib/seo";
import { SiteFooter } from "@/components/site-footer";
import { Timestamp } from "@/components/episode-player";
import { FanSuggestions } from "@/components/fan-suggestions";
import { episodePath, episodes } from "@/data/episodes";
import { issueBySlug, type Issue, type IssueQuote } from "@/data/issues";
import { polaroidThumb } from "@/lib/polaroids";
import { PERSON_PORTRAITS } from "@/data/person-portraits";

// Issue pages (Lisa, 22 Nov 2026, mockup A "the cover story"): one page per real issue a guest talks about on the show.
// All content lives in src/data/issues.ts - a new issue is a new entry there, this page stays as it is.

export const Route = createFileRoute("/issues/$slug")({
  staticData: { sitemap: false }, // listed one by one in sitemap.xml from ISSUES
  loader: ({ params }) => {
    const issue = issueBySlug(params.slug);
    if (!issue) throw notFound();
    return issue;
  },
  component: IssuePage,
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const i = loaderData;
    const path = `/issues/${i.slug}`;
    const head = pageHead({
      path,
      title: `${i.mast} ${i.number}, ${i.date} – ${i.title} | Night Fever AFTERPARTY`,
      description: i.description,
      image: `/og/issues/${i.slug}.jpg`,
      type: "article",
    });
    return {
      ...head,
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "PublicationIssue",
          name: `${i.mast} ${i.number}`,
          issueNumber: i.number.replace(/^No\.\s*/, ""),
          datePublished: i.date,
          url: abs(path),
          isPartOf: { "@type": "Periodical", name: i.mast },
          description: i.description,
        }),
      ],
    };
  },
});

const out = { target: "_blank", rel: "noopener noreferrer" } as const;
const short = (id: string) => {
  const e = episodes.find((x) => x.id === id);
  return e ? `S${e.season}E${e.episode}${e.part ?? ""}` : id.toUpperCase();
};
const quotePic = (q: IssueQuote) =>
  (q.host ? PERSON_PORTRAITS[q.host]?.polaroid : undefined) ?? guestPic(q.who);
// The guests' polaroids by name: the AFTERPARTY polaroid of the episode they are the guest of.
const GUEST_EPISODE: Record<string, string> = {
  "Michelangelo Signorile": "s02e08",
  "James St. James": "s06e01",
};
const guestPic = (name: string) =>
  GUEST_EPISODE[name] ? polaroidThumb(GUEST_EPISODE[name]!, 240) : undefined;

function IssuePage() {
  const i = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="iss mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-6">
        <Link to="/explore/$slug" params={{ slug: i.publication }} className="iss-crumb">
          &larr; {i.mast} · The issues they talk about
        </Link>
        <Hero i={i} />
        <Quotes i={i} />
        <Travelled i={i} />
        <Inside i={i} />
        <People i={i} />
        <div className="iss-sec">
          <FanSuggestions
            box="copies"
            about={`${i.mast} ${i.number} (${i.date})`}
            variant="inset"
            className="lit-copy"
          />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}

function Hero({ i }: { i: Issue }) {
  return (
    <div className="iss-hero">
      <figure className="iss-cover-wrap">
        <div className="iss-cover">
          <span className="iss-tape" aria-hidden />
          <img
            src={i.cover}
            alt={i.coverAlt}
            width={658}
            height={884}
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <figcaption className="iss-credit">{i.coverCredit}</figcaption>
      </figure>
      <div>
        <p className="iss-kicker">The issue they talk about · {short(i.dropped.episode)}</p>
        <h1 className="iss-title">
          <span>{i.title}</span>
        </h1>
        <p className="iss-intro">{i.intro}</p>
        <dl className="iss-facts">
          {i.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
          <div>
            <dt>Who dropped it</dt>
            <dd>
              <Link
                to={episodePath(i.dropped.episode as never)}
                className="font-semibold hover:text-pink"
              >
                {short(i.dropped.episode)} {i.dropped.guest}
              </Link>{" "}
              <Timestamp episodeId={i.dropped.episode} time={i.dropped.time} />
            </dd>
          </div>
        </dl>
        <p className="iss-btns">
          <a
            {...out}
            className="iss-btn"
            href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(i.search)}`}
          >
            Find this issue on eBay ↗
          </a>
          {i.scan && (
            <a {...out} className="iss-btn iss-btn-w" href={i.scan}>
              Read the whole issue ↗
            </a>
          )}
        </p>
      </div>
    </div>
  );
}

function Quotes({ i }: { i: Issue }) {
  return (
    <section aria-labelledby="iss-words" className="iss-sec">
      <h2 id="iss-words" className="iss-h">
        How it happened, in their words
      </h2>
      <ul className="lit-quotes mt-6">
        {i.quotes.map((q) => {
          const pic = quotePic(q);
          return (
            <li key={q.time} className="lit-quote">
              <blockquote>{q.quote}</blockquote>
              <p className="lit-quote-who">
                {pic && (
                  <img src={pic} alt="" width={240} height={240} loading="lazy" decoding="async" />
                )}
                <span>
                  <span className="iss-who">{q.who}</span>
                  <br />
                  <Link
                    to={episodePath(q.episode as never)}
                    className="font-semibold hover:text-pink"
                  >
                    {short(q.episode)}
                  </Link>{" "}
                  <Timestamp episodeId={q.episode} time={q.time} />
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Travelled({ i }: { i: Issue }) {
  const t = i.travelled;
  if (!t) return null;
  return (
    <section aria-labelledby="iss-travel" className="iss-sec">
      <h2 id="iss-travel" className="iss-h">
        How the story travelled
      </h2>
      <ol className="iss-chain">
        {t.steps.map((s) => (
          <li key={s.mast} className={`iss-link${s.kind ? ` iss-link-${s.kind}` : ""}`}>
            <p className="iss-link-m">{s.mast}</p>
            <p className="iss-link-t">{s.text}</p>
          </li>
        ))}
      </ol>
      <p className="iss-small">
        As {t.who} tells it <Timestamp episodeId={t.episode} time={t.time} />
      </p>
    </section>
  );
}

function Inside({ i }: { i: Issue }) {
  if (!i.inside?.length) return null;
  return (
    <section aria-labelledby="iss-inside" className="iss-sec">
      <h2 id="iss-inside" className="iss-h">
        What else is in this issue
      </h2>
      <ul className="iss-inside">
        {i.inside.map((b) => (
          <li key={b.title} className="iss-box">
            <h3>{b.title}</h3>
            <p>{b.text}</p>
            {b.card && (
              <p className="mt-2">
                <Link
                  to="/explore/$slug"
                  params={{ slug: b.card }}
                  className="font-semibold hover:text-pink"
                >
                  {b.cardLabel ?? "Read more"} →
                </Link>
              </p>
            )}
            {b.episode && b.time && (
              <p className="mt-2">
                <Timestamp episodeId={b.episode} time={b.time} />
              </p>
            )}
          </li>
        ))}
      </ul>
      {i.note && <p className="iss-note">{i.note}</p>}
    </section>
  );
}

function People({ i }: { i: Issue }) {
  return (
    <section aria-labelledby="iss-people" className="iss-sec">
      <h2 id="iss-people" className="iss-h">
        Who&rsquo;s in this issue
      </h2>
      <ul className="iss-people">
        {i.people.map((p) => {
          const pic = p.episode
            ? polaroidThumb(p.episode, 240)
            : p.card
              ? PERSON_PORTRAITS[p.card]?.polaroid
              : undefined;
          const body = (
            <>
              {pic && (
                <img src={pic} alt="" width={240} height={240} loading="lazy" decoding="async" />
              )}
              {p.name} →
            </>
          );
          return (
            <li key={p.name}>
              {p.episode ? (
                <Link to={episodePath(p.episode as never)} className="iss-chip">
                  {body}
                </Link>
              ) : p.card ? (
                <Link to="/explore/$slug" params={{ slug: p.card }} className="iss-chip">
                  {body}
                </Link>
              ) : (
                <span className="iss-chip">{body}</span>
              )}
            </li>
          );
        })}
      </ul>
      <p className="iss-small mt-4">
        Hear it all in the{" "}
        <Link
          to={episodePath(i.dropped.episode as never)}
          className="font-semibold text-pink hover:underline"
        >
          {short(i.dropped.episode)} AFTERPARTY
        </Link>
        .
      </p>
    </section>
  );
}
