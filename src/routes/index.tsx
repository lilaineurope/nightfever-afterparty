import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import heroImage from "../assets/hero-people.jpg";
import { episodes } from "../data/episodes";
import { subscribeNewsletter } from "../lib/newsletter.functions";
import { EntityLink } from "../components/entity-link";
import { EpisodeBlock } from "@/components/episode-block";
import { NamesEveryoneDrops } from "@/components/names-everyone-drops";
import { WOW_URL } from "../data/guests";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Night Fever Afterparty — NYC Nightlife Stories" },
      {
        name: "description",
        content:
          "A fan page for Night Fever, the World of Wonder podcast hosted by James St. James, Fenton Bailey, and Randy Barbato. Celebrating the campy, glamorous history of New York nightlife.",
      },
      {
        property: "og:title",
        content: "Night Fever Afterparty — NYC Nightlife Stories",
      },
      {
        property: "og:description",
        content:
          "A fan celebration of the World of Wonder podcast about New York nightlife legends.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const hosts = [
  {
    name: "James St. James",
    role: "Host",
    bio: "Downtown legend, author, and nightlife historian who lived the stories most people only read about.",
  },
  {
    name: "Fenton Bailey",
    role: "Co-Host",
    bio: "Co-founder of World of Wonder and producer who helped shape modern queer television.",
  },
  {
    name: "Randy Barbato",
    role: "Co-Host",
    bio: "Co-founder of World of Wonder and longtime chronicler of pop culture and club life.",
  },
];

const featuredGuests = [
  "Dianne Brill",
  "Michael Musto",
  "Peter Gatien",
  "Lisa Edelstein",
  "Moby",
  "Joey Arias",
  "Tish & Snooky",
  "Nick Egan",
  "Christina Visca",
];

const platforms = [
  {
    name: "Spotify",
    href: "https://creators.spotify.com/pod/profile/night-fever/",
    icon: SpotifyIcon,
  },
  {
    name: "Apple Podcasts",
    href: "https://podcasts.apple.com/us/podcast/night-fever/id1584126843",
    icon: AppleIcon,
  },
  {
    name: "WOW Presents Plus",
    href: "https://www.wowpresentsplus.com/night-fever",
    icon: WowIcon,
  },
];

function Index() {
  const subscribeFn = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(
    null,
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !consent) return;
    setPending(true);
    subscribeFn({ data: { email: email.trim(), consent: true } })
      .then((res) => {
        setResult(res);
        if (res.ok) {
          setEmail("");
          setConsent(false);
        }
      })
      .finally(() => setPending(false));
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center justify-center px-6 py-24">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Disco ball scattering gold and pink light across a glamorous nightclub"
            className="h-full w-full object-cover opacity-60"
            width={1536}
            height={864}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        <div className="relative z-10 max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-gold">
            A fan celebration
          </p>
          <h1 className="text-balance text-6xl font-bold leading-[0.95] tracking-tight text-cream text-glow sm:text-7xl md:text-8xl">
            Night
            <span className="block text-pink text-glow-pink">Fever</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/90 md:text-xl">
            <EntityText text="The World of Wonder podcast where James St. James, Fenton Bailey, and Randy Barbato relive the campy, gossipy, jaw-dropping history of New York nightlife." />
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-night/80 px-5 py-2.5 text-sm font-medium text-gold backdrop-blur-sm transition hover:border-gold hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <platform.icon className="h-4 w-4" />
                Listen on {platform.name}
              </a>
            ))}
          </div>
        </div>
      </section>



      {/* Latest episodes */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-pink">
            Latest afterparty
          </p>
          <div className="mx-auto mt-6 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-cream sm:text-4xl">
              Welcome to the afterparty
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              On the Night Fever podcast, James St. James asks every guest
              about the nights they lived through &mdash; the people they
              loved, feuded with, and lost. This site is the afterparty: the
              morning-after debrief. Every episode that has been published here
              gets a timestamp index &mdash; every name, place, song, design and
              look dropped in the conversation, counted and linked to the
              moment it was said. Everything A&ndash;Z gathers the people,
              places and things across all episodes, the Timeline follows the
              scene from the 1970s to today, and Connections shows how the
              names are tied together.
            </p>
          </div>
          {/* Same ranking as the Episodes page: afterparty publish date, newest first. */}
          <div className="mt-6 flex flex-col gap-6">
            {[...episodes]
              .sort(
                (a, b) =>
                  b.afterpartyPublished.localeCompare(a.afterpartyPublished) ||
                  b.season - a.season ||
                  b.episode - a.episode,
              )
              .map((ep) => (
                <EpisodeBlock key={ep.id} ep={ep} showDates />
              ))}
          </div>
        </div>
      </section>

      <NamesEveryoneDrops />

      {/* Listen */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gold/20 bg-card p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Listen wherever you party
          </h2>
          <p className="mt-4 text-muted-foreground">
            New episodes drop on Mondays. Find the show on your favorite
            podcast platform.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition hover:bg-spotlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <platform.icon className="h-5 w-5" />
                {platform.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Fan club / newsletter */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Join the afterparty
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get episode reminders, guest highlights, and fan notes delivered to
            your inbox.
          </p>
          {result ? (
            <div
              className={
                result.ok
                  ? "mt-8 rounded-2xl border border-pink/30 bg-pink/10 p-6 text-pink"
                  : "mt-8 rounded-2xl border border-destructive/40 bg-destructive/10 p-6 text-destructive-foreground"
              }
            >
              <p className="font-medium">{result.message}</p>
              {result.ok && (
                <p className="mt-1 text-sm text-pink/80">
                  Your address is stored with the moment you agreed, and you
                  can unsubscribe any time with the link in every email.
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-8 flex flex-col gap-4">
              <label
                htmlFor="consent"
                className="flex items-start gap-3 text-left text-xs leading-relaxed text-muted-foreground"
              >
                <input
                  id="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-pink"
                />
                <span>
                  I want to receive the Night Fever afterparty newsletter and I
                  understand my email address is stored only for this list. I
                  can unsubscribe any time with the link in every email. See
                  the{" "}
                  <Link
                    to="/privacy"
                    className="text-gold underline decoration-gold/40 underline-offset-2 transition hover:text-pink"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-xl bg-pink px-6 py-3 text-sm font-semibold text-pink-foreground transition hover:bg-pink/90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
                >
                  {pending ? "Signing you up…" : "Subscribe"}
                </button>
              </div>
            </form>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            No trackers, no advertising cookies, and nothing about you is sold.
            Read the{" "}
            <Link
              to="/privacy"
              className="text-gold underline decoration-gold/40 underline-offset-2 transition hover:text-pink"
            >
              Privacy Policy
            </Link>{" "}
            or the{" "}
            <Link
              to="/terms"
              className="text-gold underline decoration-gold/40 underline-offset-2 transition hover:text-pink"
            >
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />    </main>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.369-2.1-10.56-1.14-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53-1.71-2.52-3.01-7.13.52-10.23 1.71-1.46 3.89-1.57 4.85-.95.96.62 1.77.53 3.02-.22 1.25-.75 2.35-.56 3.14.22 1.27 1.17 1.78 2.61 1.78 2.61s-2.12 1.06-2.12 3.24c0 2.57 2.26 3.42 2.26 3.42l-.02.04zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function WowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );
}
