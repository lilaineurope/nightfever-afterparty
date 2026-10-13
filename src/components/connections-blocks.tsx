import { Link } from "@tanstack/react-router";
import { episodeShort } from "@/data/entities";
import { bestInFashion, popularPlaces, type EpisodeEntity } from "@/data/episode-connections";

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
          {item.mentions} {item.mentions === 1 ? "mention" : "mentions"}
          {" · "}
          {item.episodeIds.length} {item.episodeIds.length === 1 ? "episode" : "episodes"}
        </span>
        {note && (
          <span className="mt-2 block text-xs italic leading-relaxed text-cream/80">
            &ldquo;{note}&rdquo;
          </span>
        )}
        <span className="mt-2 block text-[11px] text-muted-foreground/70">
          {item.episodeIds.map((id) => episodeShort(id)).join(" · ")}
        </span>
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
    <Block
      title="Most popular"
      highlight="places"
      blurb="The rooms the gang keeps going back to - counted by how often they get named. Which one would you sneak into?"
    >
      {popularPlaces.map((p) => (
        <Card key={p.slug} item={p} />
      ))}
    </Block>
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
