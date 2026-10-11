import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImage from "../assets/hero-people.jpg";
import { latestEpisode } from "../data/episodes";
import { EntityLink } from "../components/entity-link";
import { SHOW_URL, WOW_URL } from "../data/guests";
import { EntityText } from "../components/entity-text";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Night Fever Fan Page — NYC Nightlife Stories" },
      {
        name: "description",
        content:
          "A fan page for Night Fever, the World of Wonder podcast hosted by James St. James, Fenton Bailey, and Randy Barbato. Celebrating the campy, glamorous history of New York nightlife.",
      },
      {
        property: "og:title",
        content: "Night Fever Fan Page — NYC Nightlife Stories",
      },
      {
        property: "og:description",
        content:
          "A fan celebration of the World of Wonder podcast about New York nightlife legends.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
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
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
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



      {/* Latest release */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-pink">
            Latest release
          </p>
          <div className="mt-6 grid overflow-hidden rounded-3xl border border-gold/25 bg-card md:grid-cols-[1fr_1.3fr]">
            <div className="disco-grid border-b border-border p-8 md:border-b-0 md:border-r">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Season {latestEpisode.season} &middot; Episode{" "}
                {latestEpisode.episode}
              </p>
              <h3 className="mt-3 text-4xl font-bold leading-[1] tracking-tight text-cream text-glow">
                {latestEpisode.guest}
              </h3>
              <p className="mt-5 text-sm text-muted-foreground">
                {latestEpisode.runtime} &middot; {latestEpisode.references}{" "}
                tagged references &middot; {latestEpisode.mentions} mentions
              </p>
            </div>
            <div className="p-8">
              <p className="text-base leading-relaxed text-card-foreground/85">
                {latestEpisode.blurb}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {latestEpisode.top.map((t) => (
                  <span
                    key={t.name}
                    className="rounded-full border border-gold/30 px-3 py-1 text-xs font-medium text-gold"
                  >
                    {t.name}
                    <span className="ml-1.5 text-muted-foreground">
                      {t.mentions} mentions
                    </span>
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={latestEpisode.audioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-pink px-5 py-2.5 text-sm font-semibold text-pink-foreground transition hover:bg-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
                >
                  Listen on Spotify
                </a>
                <Link
                  to="/episodes/s06e01"
                  className="inline-flex items-center gap-2 rounded-xl border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Every name, timestamped &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured guests */}
      <section className="spotlight px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Legendary guests
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            From club owners and columnists to musicians and performers, the
            voices that shaped New York nightlife take the mic.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {featuredGuests.map((guest) => (
              <EntityLink
                key={guest}
                name={guest}
                className="rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:border-pink/50 hover:text-pink"
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/guests"
              className="inline-flex items-center gap-2 rounded-xl bg-pink px-6 py-3 text-sm font-semibold text-pink-foreground transition hover:bg-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
            >
              Explore their careers &amp; connections
            </Link>
          </div>
        </div>
      </section>


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
          {submitted ? (
            <div className="mt-8 rounded-2xl border border-pink/30 bg-pink/10 p-6 text-pink">
              <p className="font-medium">You are on the list!</p>
              <p className="mt-1 text-sm text-pink/80">
                Watch your inbox for the next episode spotlight.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
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
                className="rounded-xl bg-pink px-6 py-3 text-sm font-semibold text-pink-foreground transition hover:bg-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            This is a fan page. Subscribing here only saves your email for this
            demo form.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Fan page for{" "}
              <a
                href={SHOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink"
              >
                <em>Night Fever</em>
              </a>{" "}
              by{" "}
              <a
                href={WOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink"
              >
                World of Wonder
              </a>.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link
                to="/"
                className="transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Home
              </Link>
              <Link
                to="/guests"
                className="transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Guests
              </Link>
              <Link
                to="/connections"
                className="transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Connections
              </Link>
              <Link
                to="/timeline"
                className="transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Timeline
              </Link>
              <Link
                to="/episodes/s06e01"
                className="transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Latest episode
              </Link>
              <Link
                to="/about"
                className="transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                About
              </Link>
              <a
                href="https://www.worldofwonder.com/"

                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                World of Wonder
              </a>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground/60">
            <EntityText text="Not affiliated with World of Wonder or the Night Fever podcast. All trademarks and show content belong to their respective owners." />
          </p>
        </div>
      </footer>
    </main>
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
