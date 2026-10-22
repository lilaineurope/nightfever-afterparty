import { pageHead } from "@/lib/seo";
import { InterviewNext } from "@/components/interview-next";
import { NIGHT_FEVER_URL } from "@/data/guests";
import { createFileRoute, Link } from "@tanstack/react-router";
import { episodes, episodePath } from "../data/episodes";
import { EntityLink } from "../components/entity-link";
import { EpisodeCard } from "@/components/episode-block";
import { NamesEveryoneDrops } from "@/components/names-everyone-drops";
import { ExplorePages } from "@/components/explore-pages";
import { WOW_URL } from "../data/guests";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";
import { SiteFooter } from "@/components/site-footer";
import afterpartyFill from "@/assets/home-afterparty-fill.webp";

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


const latest = [...episodes].sort(
  (a, b) => b.afterpartyPublished.localeCompare(a.afterpartyPublished) || b.season - a.season || b.episode - a.episode,
)[0]!;

function Index() {
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
            {/* Lisa's intro (23 Oct 2026) */}
            <EntityText text="On the Night Fever podcast, James St. James, Fenton Bailey and Randy Barbato relive the campy, gossipy, jaw-dropping history of New York nightlife." />{" "}
            This site is <Link to="/about" className="text-gold">my</Link>{" "}
            <Link to="/episodes" className="text-gold">Afterparty</Link>, where every episode gets a{" "}
            <Link to="/explore" className="text-gold">timestamp index</Link> - every{" "}
            <Link to="/network" className="text-gold">name</Link>,{" "}
            <Link to="/map" className="text-gold">place</Link>,{" "}
            <Link to="/jukebox" className="text-gold">song</Link>, design and look, counted and linked to the exact moment it was said.

          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={episodePath(latest.id)}
              className="bg-gold px-5 py-3.5 font-semibold uppercase text-gold-foreground transition hover:bg-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
            >
              Latest Afterparty &rarr;
            </Link>
            <a
              href="https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gold px-5 py-3 font-semibold uppercase transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
            >
              Listen <span aria-hidden="true">&#8599;</span>
            </a>
            <a
              href={NIGHT_FEVER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gold px-5 py-3 font-semibold uppercase transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
            >
              Watch <span aria-hidden="true">&#8599;</span>
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

      {/* Who to interview next - tips heard on the show (Lisa, 23 Oct 2026) */}
      <InterviewNext />


      {/* Footer */}
      <SiteFooter />    </main>
  );
}
