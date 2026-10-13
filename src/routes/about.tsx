import { createFileRoute, Link } from "@tanstack/react-router";
import portraitImage from "../assets/about-portrait-illustrated-2.jpg";
import { SHOW_URL } from "../data/guests";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";
import { SiteFooter } from "@/components/site-footer";

const IG_POST = "https://www.instagram.com/p/Cip1xrSM33P/";

const GOLD_LINK =
  "text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Why this Night Fever Afterparty exists" },
      {
        name: "description",
        content:
          "Why this fan page for the Night Fever podcast was made: one listener's spreadsheet of every name, place and story dropped in the interviews, turned into timelines and a connection map.",
      },
      {
        property: "og:title",
        content: "About — Why this Night Fever Afterparty exists",
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
            &larr; Night Fever Afterparty
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
                alt="Illustrated portrait of Lisa Lang, the person who made this fan page"
                className="aspect-square w-full rounded-2xl object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />
            </div>
            <figcaption className="mt-3 text-center text-xs text-muted-foreground">
              Drawn from a snapshot by Christine Hasebrink at CEF22, Zurich, September 2022 —{" "}
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

      {/* Fan page note */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gold/20 bg-card p-8 sm:p-12">
          <p className="leading-relaxed text-muted-foreground">
            This is a fan page. It isn't affiliated with{" "}
            <EntityText text="World of Wonder" />
            , and it doesn't host audio — the listen buttons go to the show
            itself. If you spot something wrong, or you were in one of these
            nights, I'd genuinely like to hear about it.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
