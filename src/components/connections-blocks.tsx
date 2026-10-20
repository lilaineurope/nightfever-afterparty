import { Link } from "@tanstack/react-router";
import { bestInFashion, popularPlaces, type EpisodeEntity } from "@/data/episode-connections";

/** Just the two numbers: connections (episodes the name links to) and mentions. */
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
function Stats({ item }: { item: { episodeIds: string[]; mentions: number } }) {
  return <>{plural(item.episodeIds.length, "connection")} · {plural(item.mentions, "mention")}</>;
}

function Card({ item, note }: { item: EpisodeEntity; note?: string | undefined }) {
  return (
    <li>
      <Link
        to="/explore/$slug"
        params={{ slug: item.slug }}
        className="block h-full rounded-xl border border-border bg-card p-4 transition hover:border-gold/50"
      >
        <span className="block font-semibold text-gold">{item.name}</span>
        <span className="mt-1 block text-xs text-muted-foreground">
          <Stats item={item} />
        </span>
        {note && (
          <span className="mt-2 block text-xs italic leading-relaxed text-cream/80">
            &ldquo;{note}&rdquo;
          </span>
        )}
      </Link>
    </li>
  );
}

function Block({
  title,
  highlight,
  blurb,
  children,
}: {
  title: string;
  highlight: string;
  blurb: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-cream sm:text-4xl">
          {title} <span className="text-gold">{highlight}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          {blurb}
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{children}</ul>
      </div>
    </section>
  );
}

export function PopularPlaces() {
  return (
    <TopTen
      title="Most popular"
      highlight="clubs"
      blurb="The top 10 clubs the gang keeps going back to - counted by how often they get named. Which one would you sneak into?"
      items={popularPlaces.map((p) => ({ slug: p.slug, name: p.name, episodeIds: p.episodeIds, mentions: p.mentions }))}
    />
  );
}

/** A numbered top-10 list - used for Great Connectors and Most popular clubs. */
export function TopTen({
  title,
  highlight,
  blurb,
  items,
}: {
  title: string;
  highlight: string;
  blurb: string;
  items: { slug: string; name: string; episodeIds: string[]; mentions: number }[];
}) {
  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-cream sm:text-4xl">
          {title} <span className="text-gold">{highlight}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          {blurb}
        </p>
        <ol className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {items.slice(0, 10).map((p, i) => (
            <li key={p.slug}>
              <Link
                to="/explore/$slug"
                params={{ slug: p.slug }}
                className="flex items-baseline gap-4 px-5 py-3 transition hover:bg-gold/5"
              >
                <span className="w-7 shrink-0 text-right text-lg font-bold text-pink">{i + 1}</span>
                <span className="flex-1 font-semibold text-gold">{p.name}</span>
                <span className="whitespace-nowrap text-right text-xs text-muted-foreground">
                  <Stats item={p} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function BestInFashion() {
  return (
    <Block
      title="Best in"
      highlight="fashion"
      blurb="What the episodes themselves say about the looks - the exact words used when the name came up. Love it!"
    >
      {bestInFashion.map((f) => (
        <Card key={f.slug} item={f} note={f.fashionNotes[0]} />
      ))}
    </Block>
  );
}
