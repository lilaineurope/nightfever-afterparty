import { pageHead } from "@/lib/seo";
import { InterviewNext } from "@/components/interview-next";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getHomePage } from "@/lib/home-view.functions";
import { LinkDataProvider } from "@/lib/link-index";
import { episodeById } from "../data/episodes";
import { EpisodeCard } from "@/components/episode-block";
import { HallOfFame } from "@/components/hall-of-fame";
import { ExplorePages } from "@/components/explore-pages";
import { EntityText } from "../components/entity-text";
import { SiteFooter } from "@/components/site-footer";
import { QuoteOfTheDay } from "@/components/quote-of-the-day";
import afterpartyFill from "@/assets/home-afterparty-fill.webp";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  component: Index,
  // The Hall of Fame, interview tips, latest totals and counts come from the server, so the home page doesn't download
  // the whole A–Z (page weight, 17 Nov 2026).
  loader: () => getHomePage(),
  head: () => pageHead({ path: "/", title: "Night Fever AFTERPARTY – an archive of NYC club kid culture", description: "My fan-made archive of NYC club kid culture from Night Fever, the World of Wonder podcast with James St. James, Fenton Bailey and Randy Barbato, timestamped!", image: "/og/home.jpg" }),
});

function Index() {
  const home = Route.useLoaderData();
  return (
    <LinkDataProvider value={home.links}>
    <main className="paper-home min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Hero: stacked headline NIGHT / FEVER / AFTERPARTY, the last word in a pink-on-black box with a collage shadow - no picture beside it */}
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-10">
        <div className="@container min-w-0">
          <p className="font-type text-lg">Clubkid Culture Archive</p>
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
          {/* Lisa's intro (23 Oct 2026), in two columns side by side (Lisa, 23 Oct): the podcast on the left, the site on the right; stacked on phones */}
          <div className="mt-8 grid max-w-[1000px] gap-5 text-base leading-relaxed sm:grid-cols-2 sm:gap-10">
            <p>
              <EntityText text="On the Night Fever podcast, James St. James, Fenton Bailey and Randy Barbato relive the campy, gossipy, jaw-dropping history of New York nightlife." />
            </p>
            <p>
              This site is <Link to="/about" className="text-gold">my</Link>{" "}
              <Link to="/episodes" className="text-gold">AFTERPARTY</Link>, where every episode gets a{" "}
              <Link to="/explore" className="text-gold">timestamp index</Link> - every{" "}
              <Link to="/network" className="text-gold">name</Link>,{" "}
              <Link to="/map" className="text-gold">place</Link>,{" "}
              <Link to="/jukebox" className="text-gold">song</Link>, design and look, counted and linked to the exact moment it was said.
            </p>
          </div>
          <QuoteOfTheDay />
        </div>
      </section>

      {/* Daily pick (Lisa, 28 Nov 2026): three AFTERPARTIES, shuffled once a day, the same for everyone (dailyPick in
          src/lib/home-view.server.ts) */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="border-b-[3px] border-gold pb-2 text-4xl sm:text-[44px]">Daily pick</h2>
          <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {home.dailyPick.map((id, i) => (
              <EpisodeCard key={id} ep={episodeById(id)} stats={home.stats[id]!} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/episodes"
              className="inline-block bg-gold px-6 py-3 font-semibold uppercase text-gold-foreground transition hover:bg-pink">
              More Afterparties &rarr;
            </Link>
          </div>
          <ExplorePages counts={home.counts} />
        </div>
      </section>

      <HallOfFame mentors={home.mentors} />

      {/* Who to interview next - tips heard on the show (Lisa, 23 Oct 2026) */}
      <InterviewNext boxes={home.boxes} interviewed={home.interviewed} />


      {/* Footer */}
      <SiteFooter />    </main>
    </LinkDataProvider>
  );
}
