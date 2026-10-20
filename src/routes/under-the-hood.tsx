import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { SiteFooter } from "@/components/site-footer";

// Every tool and service used to make and run the fan page - keep this list in step with the site
// (a new service on the site gets a line here, and on the privacy page if it touches visitors).

type Tool = { name: string; href: string; what: string };
type Group = { title: string; blurb: string; tools: Tool[] };

const GROUPS: Group[] = [
  {
    title: "Building the site",
    blurb: "Where the pages are made, stored and put online.",
    tools: [
      { name: "Lovable", href: "https://lovable.dev", what: "Builds, hosts and publishes the whole site, and keeps the newsletter sign-ups and guestbook notes in its built-in database (Lovable Cloud)." },
      { name: "Claude", href: "https://claude.ai", what: "My co-pilot for everything behind the scenes: writes the code, researches every name and place, checks the links, transcribes the episodes and builds the reference sheets." },
      { name: "GitHub", href: "https://github.com", what: "Stores the site's code; every change syncs straight into Lovable." },
      { name: "Archivo Black, IBM Plex Mono, Permanent Marker and Special Elite", href: "https://fontsource.org", what: "The flyer fonts - headlines (Archivo Black), the typewriter text everywhere (Special Elite), timestamps and small data (IBM Plex Mono) and the handwritten Polaroid caption (Permanent Marker). Open licences (SIL OFL and Apache), served from this site, not from a font service." },
      { name: "VT323", href: "https://github.com/phoikoi/VT323", what: "The pixel font in the Wardrobe's Clueless Style - open licence (SIL OFL), served from this site, not from a font service." },
      { name: "React, TanStack and Tailwind", href: "https://tanstack.com", what: "The open-source building blocks the pages are written in." },
    ],
  },
  {
    title: "Pictures and design",
    blurb: "All artwork is original - no footage or photos from the show.",
    tools: [
      { name: "Gemini", href: "https://gemini.google.com", what: "Makes the collages of objects in the page headers." },
      { name: "Microsoft Copilot", href: "https://copilot.microsoft.com", what: "Makes the illustrated guest portraits." },
      { name: "Figma", href: "https://www.figma.com", what: "Design sketches and layouts." },
    ],
  },
  {
    title: "Listening and watching",
    blurb: "Nothing is hosted here - every play goes straight to the show's own sources.",
    tools: [
      { name: "The Night Fever podcast feed", href: "https://creators.spotify.com", what: "The episode player streams each episode straight from the show's own podcast feed." },
      { name: "Spotify", href: "https://open.spotify.com", what: "Plays the Jukebox and the song, band and club cards (only after you press play), opens the listen links and hosts the Night Fever Afterparty Jukebox playlist." },
      { name: "Apple Podcasts", href: "https://podcasts.apple.com", what: "Listen links for every episode." },
      { name: "WOW Presents Plus", href: "https://www.wowpresentsplus.com", what: "Where the watch links take you to see the episodes." },
    ],
  },
  {
    title: "Maps, books and facts",
    blurb: "Where the extra detail on the cards comes from.",
    tools: [
      { name: "Google Maps", href: "https://maps.google.com", what: "Draws the Map page with every club and location the guests name." },
      { name: "Wikipedia", href: "https://www.wikipedia.org", what: "Most of the \"Read more\" links on the cards." },
      { name: "Open Library", href: "https://openlibrary.org", what: "The \"Find a copy\" links in the Book Club." },
    ],
  },
  {
    title: "Transcripts",
    blurb: "Used only to build the references - the transcripts are never published.",
    tools: [
      { name: "sherpa-onnx", href: "https://github.com/k2-fsa/sherpa-onnx", what: "Open-source speech recognition that turns each episode into a timestamped transcript, speaker by speaker." },
      { name: "Microsoft Word", href: "https://www.microsoft.com/microsoft-365/word", what: "Its built-in transcription, for some of the early episodes." },
    ],
  },
  {
    title: "Visitors and search",
    blurb: "Counting visits without tracking you, and helping people find the site.",
    tools: [
      { name: "Web3Forms", href: "https://web3forms.com", what: "Delivers contact-form messages and new-guestbook-note alerts to my inbox." },
      { name: "GoatCounter", href: "https://www.goatcounter.com", what: "Counts page visits without cookies or personal data." },
      { name: "Google Search Console", href: "https://search.google.com/search-console", what: "Tells Google which pages exist so they show up in search." },
    ],
  },
];

export const Route = createFileRoute("/under-the-hood")({
  staticData: { sitemap: true },
  component: UnderTheHood,
  head: () =>
    pageHead({
      path: "/under-the-hood",
      title: "Under the hood | Night Fever fan page",
      description: "Every tool and service used to make and run my Night Fever fan page - Lovable, Claude, Gemini, Copilot, Spotify, Google Maps, GoatCounter and more.",
      image: "/og/home.jpg",
    }),
});

function UnderTheHood() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-12 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <Link to="/" className="text-xs font-medium uppercase tracking-[0.2em] text-gold transition hover:text-pink">
            &larr; Night Fever fan page
          </Link>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Under the <span className="text-pink text-glow-pink">hood</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every tool and service I use to make and run this fan page - from the code and the collages to the
            jukebox and the visitor counter.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-12 px-6 pb-16">
        {GROUPS.map((g) => (
          <section key={g.title} aria-labelledby={`g-${g.title}`}>
            <h2 id={`g-${g.title}`} className="text-2xl font-bold tracking-tight text-cream">{g.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{g.blurb}</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {g.tools.map((t) => (
                <li key={t.name} className="rounded-2xl border border-border bg-card p-5">
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gold underline decoration-gold/40 underline-offset-4 transition hover:text-pink">
                    {t.name} ↗
                  </a>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.what}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="text-sm text-muted-foreground">
          What each service sees about you is on the <Link to="/privacy" className="text-gold underline decoration-gold/50 underline-offset-2 hover:text-pink">privacy page</Link>.
        </p>
      </div>
      <SiteFooter />
    </main>
  );
}
