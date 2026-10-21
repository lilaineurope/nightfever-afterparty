import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { episodes, episodePath } from "../data/episodes";
import { subscribeNewsletter } from "../lib/newsletter.functions";
import { EntityLink } from "../components/entity-link";
import { EpisodeCard } from "@/components/episode-block";
import { NamesEveryoneDrops } from "@/components/names-everyone-drops";
import { ExplorePages } from "@/components/explore-pages";
import { WOW_URL } from "../data/guests";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";
import { SiteFooter } from "@/components/site-footer";
import afterpartyFill from "@/assets/home-afterparty-fill.webp";
import { TipBox } from "@/components/tip-box";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  component: Index,
  head: () => pageHead({ path: "/", title: "Night Fever podcast fan page – NYC nightlife names, clubs & stories", description: "My fan page for Night Fever, the World of Wonder podcast with James St. James, Fenton Bailey and Randy Barbato. The campy, glamorous history of New York nightlife - unpacked and timestamped!", image: "/og/home.jpg" }),
});

const hosts = [
  {
    name: "James St. James",
    role: "Host",
    bio: "Downtown legend, author and nightlife historian. He lived the stories most of us only read about!",
  },
  {
    name: "Fenton Bailey",
    role: "Co-Host",
    bio: "Co-founder of World of Wonder - the producer who helped shape modern queer TV.",
  },
  {
    name: "Randy Barbato",
    role: "Co-Host",
    bio: "Co-founder of World of Wonder and a longtime chronicler of pop culture and club life.",
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

const latest = [...episodes].sort(
  (a, b) => b.afterpartyPublished.localeCompare(a.afterpartyPublished) || b.season - a.season || b.episode - a.episode,
)[0]!;

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
    <main className="paper-home min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Hero: stacked headline NIGHT / FEVER / AFTERPARTY, the last word in a pink-on-black box with a collage shadow - no picture beside it */}
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-10">
        <div className="@container min-w-0">
          <p className="font-type text-lg">tonight · and every night since 1977 ·</p>
          <h1 className="mt-3 text-[clamp(2.4rem,13cqw,8.5rem)] leading-[0.86] tracking-[-0.02em]">
            Night
            <br />
            Fever
            <br />
            {/* "Afterparty" box (Lisa, 21 Oct): solid pink letters on a black box, tilted, whose offset shadow is cut
                out of a halftone photocopy of the jukebox collage */}
            <span className="relative mt-[0.12em] inline-block -rotate-[1.5deg] text-[11.6cqw] leading-[0.95]">
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-x-[0.1em] translate-y-[0.11em] bg-cover bg-center"
                style={{ backgroundImage: `url(${afterpartyFill})` }}
              />
              <span className="relative block whitespace-nowrap bg-cream px-[0.14em] pb-[0.02em] pt-[0.07em] text-pink">
                Afterparty
              </span>
            </span>
          </h1>
          <p className="mt-8 max-w-[480px] text-base leading-relaxed">
            <EntityText text="The World of Wonder podcast where James St. James, Fenton Bailey and Randy Barbato relive the campy, gossipy, jaw-dropping history of New York nightlife. Love it!" />
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={episodePath(latest.id)}
              className="bg-gold px-5 py-3.5 font-semibold uppercase text-gold-foreground transition hover:bg-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
            >
              Latest Afterparty &rarr;
            </Link>
            <a
              href="#listen"
              className="border-2 border-gold px-5 py-3 font-semibold uppercase transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
            >
              Listen
            </a>
          </div>
        </div>
      </section>

      {/* Latest episodes */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="border-b-[3px] border-gold pb-2 text-4xl sm:text-[44px]">Latest Afterparties</h2>
          {/* Same ranking as the Episodes page: Afterparty publish date, newest first. Only the three newest show here. */}
          <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[...episodes]
              .sort(
                (a, b) =>
                  b.afterpartyPublished.localeCompare(a.afterpartyPublished) ||
                  b.season - a.season ||
                  b.episode - a.episode,
              )
              .slice(0, 3)
              .map((ep, i) => (
                <EpisodeCard key={ep.id} ep={ep} index={i} />
              ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/episodes"
              className="inline-block bg-gold px-6 py-3 font-semibold uppercase text-gold-foreground transition hover:bg-pink">
              More Afterparties &rarr;
            </Link>
          </div>
          <ExplorePages />
        </div>
      </section>

      <NamesEveryoneDrops />

      {/* Welcome - the intro, below the design's sections */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-cream sm:text-4xl">
              Welcome to the Afterparty
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              On the Night Fever podcast, James St. James asks every guest
              about the nights they lived through - the people they loved,
              feuded with and lost. This site is my Afterparty, aka the
              morning-after debrief!
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every episode I publish here gets a timestamp index - every name,
              place, song, design and look, counted and linked to the exact
              moment it was said. A&ndash;Z gathers the whole gang,
              the Timeline follows the scene from the 1960s to today, and
              the Network shows how they're all tied together. Pick an episode
              and dive in!
            </p>
          </div>
      </section>

      {/* Listen */}
      <section id="listen" className="scroll-mt-20 px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gold/20 bg-card p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Listen wherever you party -
            <span className="mt-1 block text-pink text-glow-pink">Celebrate the Original!</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            New episodes drop on Mondays - so exciting! Find the show on your
            favourite podcast app.
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
            Join the Afterparty!
          </h2>
          <p className="mt-4 text-muted-foreground">
            Want a heads-up when a new Afterparty goes up? I'll send episode
            reminders, guest highlights and fan notes straight to your inbox.
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
                  I store your address with the moment you agreed. You can
                  unsubscribe any time with the link in every email.
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
                  I want to receive the Night Fever Afterparty newsletter and I
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
                  {pending ? "Signing you up…" : "Count me in!"}
                </button>
              </div>
            </form>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            No trackers, no advertising cookies - and I never sell anything about you.
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

      {/* Tip the fan page on Tipeee - last section before the footer; the footer "Tip the fan page" link jumps here */}
      <TipBox />

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
