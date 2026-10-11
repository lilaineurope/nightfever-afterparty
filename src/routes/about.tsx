import { createFileRoute, Link } from "@tanstack/react-router";
import portraitImage from "../assets/about-portrait.jpg";
import { SHOW_URL, WOW_URL } from "../data/guests";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";

const IG_POST = "https://www.instagram.com/p/Cip1xrSM33P/";
const IG_PROFILE = "https://www.instagram.com/lilaineurope/";

const GOLD_LINK =
  "text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Why this Night Fever fan page exists" },
      {
        name: "description",
        content:
          "Why this fan page for the Night Fever podcast was made: one listener's spreadsheet of every name, place and story dropped in the interviews, turned into timelines and a connection map.",
      },
      {
        property: "og:title",
        content: "About — Why this Night Fever fan page exists",
      },
      {
        property: "og:description",
        content:
          "A fan-made index of every name, place and story dropped in the Night Fever interviews — how it started and how it's made.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const pages = [
  {
    to: "/timeline" as const,
    title: "The timeline",
    text: "The scene itself, from the 1970s to today, plus every guest: real nights, real places, career timelines and what they are doing now.",
  },
  {
    to: "/timeline" as const,
    title: "The timeline",
    text: "The scene itself, from the 1970s to today: real nights, real places, the people who moved through them.",
  },
  {
    to: "/episodes/s06e01" as const,
    title: "The episode index",
    text: "Every name, place, song and look dropped in one episode, counted and timestamped.",
  },
];

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="disco-grid px-6 pb-16 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            to="/"
            className="text-xs font-medium uppercase tracking-[0.2em] text-gold transition hover:text-pink"
          >
            &larr; Night Fever fan page
          </Link>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Why I made <span className="text-pink text-glow-pink">this</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Because I kept hitting pause. Every episode of{" "}
            <a
              href={SHOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={GOLD_LINK}
            >
              <em>Night Fever</em>
            </a>{" "}
            is stuffed with names, clubs, songs, lawsuits and design credits,
            and I got tired of being the one person in the room who had to look
            all of them up.
          </p>
        </div>
      </section>

      {/* Portrait + intro */}
      <section className="px-6 pb-8">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          <figure className="mx-auto w-full max-w-sm">
            <div className="rounded-3xl border border-gold/30 bg-card p-3 spotlight">
              <img
                src={portraitImage}
                alt="Portrait of Lisa Lang, the person who made this fan page"
                className="aspect-square w-full rounded-2xl object-cover"
                loading="lazy"
                width={1124}
                height={1124}
              />
            </div>
            <figcaption className="mt-3 text-center text-xs text-muted-foreground">
              Snapshot by Christine Hasebrink at CEF22, Zurich, September 2022 —{" "}
              <a
                href={IG_POST}
                target="_blank"
                rel="noopener noreferrer"
                className={GOLD_LINK}
              >
                the original post
              </a>
              .
            </figcaption>
          </figure>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-cream">
              It started as a spreadsheet
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              I listened to the Season 6 opener — James St. James, with Fenton
              Bailey and Randy Barbato — and wrote down every single thing they
              mentioned. Who, where, what, at what minute. It ended up at 119
              references and 319 mentions in one 54-minute conversation.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Once the list existed, the obvious next question was who keeps
              turning up in other people's lists. That's how the connection web
              and the scene timeline got built. What you're looking at is one
              listener's note-taking, published instead of hoarded.
            </p>
          </div>
        </div>
      </section>

      {/* What's here */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            What's on the site
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {pages.map((page) => (
              <Link
                key={page.to}
                to={page.to}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <h3 className="text-lg font-semibold text-cream transition group-hover:text-gold">
                  {page.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {page.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it's made */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gold/20 bg-card p-8 sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-cream">
            How it's made, and what it isn't
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Every entry starts from what was actually said in an episode, then
            gets checked against public interviews, obituaries and press
            coverage. Where something couldn't be confirmed, it's marked as
            such rather than tidied up. Names that belong to private people
            stay unlinked.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            This is a fan page. It isn't affiliated with{" "}
            <EntityText text="World of Wonder" />
            , and it doesn't host audio — the listen buttons go to the show

            itself. If you spot something wrong, or you were in one of these
            nights, I'd genuinely like to hear about it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={IG_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink px-6 py-3 text-sm font-semibold text-pink-foreground transition hover:bg-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
            >
              Say hello on Instagram
            </a>
            <a
              href={SHOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition hover:bg-spotlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Listen to the show
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12 text-center">
        <p className="text-sm text-muted-foreground">
          Fan page for{" "}
          <a
            href={SHOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={GOLD_LINK}
          >
            <em>Night Fever</em>
          </a>{" "}
          by{" "}
          <a
            href={WOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={GOLD_LINK}
          >
            World of Wonder
          </a>
          .{" "}
          <Link to="/" className="text-gold transition hover:text-pink">
            Home
          </Link>{" "}
          &middot;{" "}
          <Link
            to="/connections"
            className="text-gold transition hover:text-pink"
          >
            Connections
          </Link>{" "}
          &middot;{" "}
          <Link to="/timeline" className="text-gold transition hover:text-pink">
            Timeline
          </Link>{" "}
          &middot;{" "}
          <Link
            to="/episodes"
            className="text-gold transition hover:text-pink"
          >
            Episodes
          </Link>
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-xs text-muted-foreground/60">
          <EntityText text="Not affiliated with World of Wonder or the Night Fever podcast. All show content and trademarks belong to their respective owners." />
        </p>
              <p className="mx-auto mt-3 max-w-2xl text-center"><LegalNote /></p>
</footer>
    </main>
  );
}
