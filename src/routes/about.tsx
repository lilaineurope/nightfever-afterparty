import { createFileRoute, Link } from "@tanstack/react-router";
import portraitImage from "../assets/about-portrait-illustrated-2.jpg";
import { SHOW_URL } from "../data/guests";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";
import { SiteFooter } from "@/components/site-footer";

const IG_POST = "https://www.instagram.com/p/Cip1xrSM33P/";
const IG_PROFILE = "https://www.instagram.com/lilaineurope/";
const BAR_KAJA = "https://barkaja.org/";

const GOLD_LINK =
  "text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About | Night Fever fan page" },
      {
        name: "description",
        content:
          "Night Fever is my happy place - I started writing down every name, place and story the guests drop, and turned it into this fan page with Lovable and Claude.",
      },
      {
        property: "og:title",
        content: "About | Night Fever fan page",
      },
      {
        property: "og:description",
        content:
          "Night Fever is my happy place - how my note-taking became this fan page, built with Lovable and Claude in Stockholm.",
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
            &larr; Night Fever fan page
          </Link>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Why I made <span className="text-pink text-glow-pink">this</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            <a
              href={SHOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={GOLD_LINK}
            >
              <em>Night Fever</em>
            </a>{" "}
            is my happy place. I listen for the stories - and every episode is
            a treasure chest of gems: cross-references to other stories, books,
            places, and so many interesting people and their work. I think it
            is absolutely awesome. Dive in.
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
              Drawn from a snapshot by Christine Hasebrink at CEF22, Zurich, September 2022 -{" "}
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
              It started as a list
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Because once you start noticing the names, you can't stop. So I
              wrote them all down: every name, every club, every book and song
              the guests drop - who, where, what, and at what minute.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Then I discovered Lovable (easily obvious - I live in Stockholm)
              and asked Claude to help me build it. Now I get to play with my
              notes: collect them, sort them, figure out how to show them - and
              turn the whole thing into a game. Love it!
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              You can usually meet me on Tuesdays at{" "}
              <a
                href={BAR_KAJA}
                target="_blank"
                rel="noopener noreferrer"
                className={GOLD_LINK}
              >
                Bar Kaja
              </a>{" "}
              for Pub Quiz night - come say hi. Everything you're looking at is
              my note-taking, shared with you. Hope you enjoy data
              visualisation as much as I do!
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
            , and it doesn't host audio - the listen buttons go to the show
            itself. If you spot something wrong, or you would like to add
            something let me know -{" "}
            <a
              href={IG_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className={GOLD_LINK}
            >
              find me on Instagram
            </a>
            .
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
