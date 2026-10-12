import { createFileRoute, Link } from "@tanstack/react-router";
import { SHOW_URL, WOW_URL } from "../data/guests";
import { EntityText } from "../components/entity-text";
import { SiteFooter } from "@/components/site-footer";

const IG_PROFILE = "https://www.instagram.com/lilaineurope/";

const GOLD_LINK =
  "text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Night Fever fan page" },
      {
        name: "description",
        content:
          "The rules of this fan-made Night Fever podcast index: what it is, what it isn't, who owns what, how to ask for a correction, and how the data behind it may be reused.",
      },
      {
        property: "og:title",
        content: "Terms & Conditions — Night Fever fan page",
      },
      {
        property: "og:description",
        content:
          "An unofficial, non-commercial fan index. What you can expect from it, what belongs to whom, and how to request a correction or removal.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

const quickFacts = [
  "Unofficial fan page. Not run by, endorsed by or connected to World of Wonder.",
  "Non-commercial. Nothing is sold here and there are no ads.",
  "No audio is hosted — every listen button goes to the official release.",
  "Anyone named on the site can ask for a correction or a removal.",
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-xl font-bold tracking-tight text-cream">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-14 pt-24">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            className="text-xs font-medium uppercase tracking-[0.2em] text-gold transition hover:text-pink"
          >
            &larr; Night Fever fan page
          </Link>
          <h1 className="mt-6 text-4xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: 11 October 2026. Plain-language rules for using this
            site. They are written for people, not for lawyers.
          </p>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gold/25 bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
            The short version
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-card-foreground/85">
            {quickFacts.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden className="text-gold">
                  &middot;
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/40 p-6 sm:p-10">
          <Section title="1. What this site is">
            <p>
              This is a fan-made index of the{" "}
              <a
                href={SHOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={GOLD_LINK}
              >
                <em>Night Fever</em>
              </a>{" "}
              podcast: timelines, a connection map, and a timestamped list of the
              names, places, songs and things that come up in conversation. It is
              written and maintained by one listener, Lisa Lang, as a personal,
              non-commercial project.
            </p>
            <p>
              It is not affiliated with, endorsed by or operated by{" "}
              <a
                href={WOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={GOLD_LINK}
              >
                World of Wonder
              </a>
              , the podcast&rsquo;s producers, its hosts, or any of the people
              listed. Nothing here should be read as an official statement from
              any of them.
            </p>
          </Section>

          <Section title="2. Using the site">
            <p>
              You are free to read, link to and discuss everything here. By
              using the site you agree to these terms. If you do not agree,
              please don&rsquo;t use it &mdash; no hard feelings.
            </p>
            <p>
              Please don&rsquo;t scrape or bulk-download the pages, the
              timestamps or the underlying data, and don&rsquo;t republish the
              compiled index elsewhere without asking first. Browsing, quoting a
              short passage with credit, and pointing a link at a page are all
              welcome.
            </p>
          </Section>

          <Section title="3. Accuracy and no guarantees">
            <p>
              Entries start from what was actually said in an episode and are
              then checked against public interviews, obituaries and press
              coverage. Where something could not be confirmed, the site says so
              rather than tidying it up.
            </p>
            <p>
              Even so, the site is provided &ldquo;as is&rdquo;, with no warranty
              of accuracy, completeness or fitness for a purpose. People, dates
              and stories from decades of nightlife history are genuinely hard to
              pin down. If you rely on something here for research, journalism or
              anything consequential, check it against a primary source.
            </p>
          </Section>

          <Section title="4. Who owns what">
            <p>
              The <em>Night Fever</em> name, artwork, audio, and everything
              belonging to{" "}
              <EntityText text="World of Wonder" /> and the show&rsquo;s
              contributors remain the property of their respective owners and are
              referenced here for identification and commentary only.
            </p>
            <p>
              The editorial text, timelines, categorisation and the compiled
              reference index on this site are the original work of Lisa Lang and
              may not be republished wholesale without permission. Short quotes
              with a link back are fine.
            </p>
            <p>
              No episode audio is hosted, embedded or reproduced here. Every
              listen button takes you to the official release on Spotify, Apple
              Podcasts or WOW Presents Plus.
            </p>
          </Section>

          <Section title="5. Corrections, personality rights and removals">
            <p>
              If you are named on this site &mdash; or you are a representative
              of someone who is &mdash; you can ask for a factual correction, for
              a private person to be unlinked, or for an entry to be removed
              altogether. Send a message{" "}
              <a
                href={IG_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className={GOLD_LINK}
              >
                on Instagram
              </a>{" "}
              and say which page you mean. Requests are handled as a priority,
              and the site would rather fix or withdraw an entry than argue about
              it.
            </p>
            <p>
              The same route works for &ldquo;I was actually there, and it
              happened differently&rdquo; &mdash; that is the most useful message
              this site can receive.
            </p>
          </Section>

          <Section title="6. Links out">
            <p>
              Links to Spotify, Apple Podcasts, WOW Presents Plus, Instagram,
              Wikipedia and other services leave this site. This page is not
              responsible for their content, their availability, or how they
              handle your data.
            </p>
          </Section>

          <Section title="7. Changes and availability">
            <p>
              The site can be edited, moved or taken down at any time, with or
              without notice. Nothing here creates an obligation to keep it
              running, and no account or service is promised to you.
            </p>
          </Section>

          <Section title="8. Liability">
            <p>
              To the extent the law allows, the person behind this site is not
              liable for losses arising from reading or relying on it. Nothing in
              these terms limits rights you cannot contractually give up &mdash;
              including your statutory consumer rights in your own country.
            </p>
          </Section>

          <Section title="9. Governing law">
            <p>
              These terms are written under Swedish and European Union law,
              where the site is run from. That does not remove any mandatory
              protection you have where you live.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              Corrections, permissions, removals and general questions:{" "}
              <a
                href={IG_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className={GOLD_LINK}
              >
                @lilaineurope on Instagram
              </a>
              . Please say which page you are writing about.
            </p>
          </Section>

          <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
            How your data is handled is covered separately in the{" "}
            <Link to="/privacy" className={GOLD_LINK}>
              Privacy Policy
            </Link>
            . The story behind the project is on the{" "}
            <Link to="/about" className={GOLD_LINK}>
              About page
            </Link>
            .{" "}
            <EntityText text="This is a fan page for the Night Fever podcast by World of Wonder." />
          </p>
        </div>
      </section>

      <SiteFooter />    </main>
  );
}
