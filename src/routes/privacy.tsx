import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SHOW_URL, WOW_URL } from "../data/guests";
import { EntityText } from "../components/entity-text";
import { SiteFooter } from "@/components/site-footer";

const IG_PROFILE = "https://www.instagram.com/lilaineurope/";

const GOLD_LINK =
  "text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink";

export const Route = createFileRoute("/privacy")({
  staticData: { sitemap: true },
  component: PrivacyPage,
  head: () => pageHead({ path: "/privacy", title: "Privacy Policy | Night Fever fan page", description: "How this fan-made Night Fever podcast index handles your data: no advertising trackers, cookie-free visit counting, what the host logs, and how to exercise your GDPR rights.", image: "/og/home.jpg" }),
});

const atAGlance = [
  "No advertising trackers are loaded on this site. Visits are counted anonymously with GoatCounter, without cookies.",
  "No cookies are set for tracking, profiling or personalisation.",
  "Nothing is ever sold or shared with advertisers.",
  "The Afterparty newsletter stores your address only if you tick the consent box.",
  "Every newsletter email carries a one-click unsubscribe link.",
  "Guestbook notes show only the name, place, favourites and note you choose to share, after I've read them - and come down whenever you ask.",
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

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-14 pt-24">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            className="text-xs font-medium uppercase tracking-[0.2em] text-gold transition hover:text-pink"
          >
            &larr; Night Fever Afterparty
          </Link>
          <h1 className="mt-6 text-4xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: 21 October 2026. Here's what happens to your data when
            you read my site - in plain words, promise!
          </p>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gold/25 bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
            At a glance
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-card-foreground/85">
            {atAGlance.map((line) => (
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
          <Section title="1. Who is responsible (the controller)">
            <p>
              This site is a personal, non-commercial fan page written and
              maintained by <strong className="text-cream">Lisa Lang</strong>,
              based in Sweden. She is the data controller for anything collected
              here.
            </p>
            <p>
              The quickest way to reach her is{" "}
              <a
                href={IG_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className={GOLD_LINK}
              >
                on Instagram
              </a>
              . Please write &ldquo;privacy&rdquo; in the first line so it is not
              mistaken for fan mail.
            </p>
            <p>
              The site is not affiliated with{" "}
              <a
                href={WOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={GOLD_LINK}
              >
                World of Wonder
              </a>{" "}
              or the{" "}
              <a
                href={SHOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={GOLD_LINK}
              >
                <em>Night Fever</em>
              </a>{" "}
              podcast, and no data is shared with either of them.
            </p>
          </Section>

          <Section title="2. What is collected, and why">
            <p>
              <strong className="text-cream">Hosting logs.</strong> Like every
              website on the internet, the platform that delivers this page
              records basic technical details of each request &mdash; IP address,
              browser and device type, the page requested, and the time of the
              request &mdash; so the site can be served at all and protected
              against abuse. Legal basis: legitimate interest in operating and
              securing the service.
            </p>
            <p>
              <strong className="text-cream">Error reports.</strong> If a page
              breaks in your browser, a short technical report (the error
              message, a stack trace and the page address) may be sent to the
              hosting platform&rsquo;s monitoring so the fault can be fixed. It
              is only triggered by a failure, never while you browse normally.
              Legal basis: legitimate interest in maintaining the site.
            </p>
            <p>
              <strong className="text-cream">Visit statistics.</strong> To see
              which pages people read, visits to the published site are counted
              with GoatCounter, a privacy-friendly, open-source counter. It sets
              no cookies and does not store your IP address. For each page view
              it records the page, the site you came from, your browser and
              system type, screen size and country, and it cannot recognise you
              across sites or build a profile of you. Legal basis: legitimate
              interest in knowing which parts of the site are read.
            </p>
            <p>
              <strong className="text-cream">Contact form.</strong> If you send
              a message through the contact page, your name, email address and
              message are delivered to my inbox by Web3Forms, a form-delivery
              service, so I can read and answer it. Nothing is stored on this
              site, and the messages are not used for anything else. Legal
              basis: your consent in sending it, and my legitimate interest in
              replying.
            </p>
            <p>
              <strong className="text-cream">Episode player.</strong> Nothing
              plays or loads until you press play or tap a timestamp. Then your
              browser streams the episode straight from the show&rsquo;s own
              podcast host (the same public feed podcast apps use), which sees
              your IP address like any podcast app would and may play the
              show&rsquo;s ads. This site stores no audio and doesn&rsquo;t
              record what you listen to.
            </p>
            <p>
              <strong className="text-cream">Email address.</strong> If you
              tick the consent box on the &ldquo;Join the Afterparty&rdquo;
              form and subscribe, your email address is stored together with
              the exact time you agreed. It is used only to send the
              newsletter: episode reminders, guest highlights and fan notes.
              The list is not shared with, sold to, or shown to anyone else,
              and the subscriber list is not publicly readable. You can
              unsubscribe at any time with the one-click link in every email,
              which marks your address as unsubscribed (the address stays
              blocked from re-adding automatically by accident). To have the
              address deleted entirely, write via the contact details above.
              Legal basis: consent, which you can withdraw at any time.
            </p>
            <p>
              <strong className="text-cream">Guestbook.</strong> If you sign the
              guestbook, the name or nickname, the optional place, favourite
              episode and favourite page, and the note you write are stored in the site&rsquo;s
              database together with the time you sent it. No email address is
              asked for. Every note waits until I have read it, and only
              approved notes are shown publicly on the guestbook page. A copy of
              the note is sent to my inbox by Web3Forms so I know it is waiting.
              Notes stay up until you ask me to take them down (via the contact
              page) or I remove them; hidden and removed notes are deleted from
              the database. Legal basis: your consent when you tick the box,
              which you can withdraw at any time.
            </p>
            <p>
              <strong className="text-cream">Remembered in your own browser.</strong>{" "}
              The Wardrobe remembers which style you picked (Afterparty or
              Clueless) in your browser&rsquo;s own storage, so it opens the
              same way next time. It never leaves your device, is not a cookie,
              is not used to recognise or track you, and you can clear it any
              time by clearing this site&rsquo;s data in your browser.
            </p>
            <p>
              <strong className="text-cream">Nothing else.</strong> There is no
              account system for visitors, no uploads, no payments, and no
              profile of you built from your reading. (The only private page is
              my own guestbook moderation page, opened with a secret key.)
            </p>
          </Section>

          <Section title="3. Cookies and trackers">
            <p>
              This site loads no advertising networks, no social-media pixels and
              no cross-site trackers, and it sets no cookies for measurement or
              personalisation. The only measurement is the cookie-free
              GoatCounter visit count described above. Only strictly necessary
              technical storage used by the hosting platform to deliver the page
              is involved, which does not require consent under the ePrivacy
              rules.
            </p>
            <p>
              Nothing is embedded from Spotify, YouTube, Instagram or any other
              service, so those companies cannot see that you were here - with
              one exception you switch on yourself: the Jukebox page, and the
              song, band and club cards in Everything A&ndash;Z, load
              Spotify&rsquo;s own player only after you press a Play button. From
              that moment Spotify&rsquo;s privacy policy applies to the player and
              Spotify may set its own cookies. Everywhere else their names appear
              only as ordinary links.
            </p>
          </Section>

          <Section title="4. Links to other sites">
            <p>
              When you click &ldquo;Listen on Spotify&rdquo;, an Apple Podcasts
              link, a World of Wonder link, an Instagram link or a Wikipedia
              link, you leave this site and that service&rsquo;s own privacy
              policy applies from that moment. This page has no influence over
              what they do with your data.
            </p>
            <p>
              Tips work the same way: the &ldquo;Tip on Tipeee&rdquo; buttons are
              plain links to my page on Tipeee. Nothing from Tipeee loads on this
              site, and Tipeee alone handles the payment and your payment details
              under its own privacy policy - I never see your card or bank
              details. What Tipeee shares with me, such as the name you tip
              under, is set out in its own policy.
            </p>
          </Section>

          <Section title="5. Who else can see it">
            <p>
              The hosting platform that publishes this site acts as a data
              processor for the technical logs above, under its own terms and
              privacy documentation. GoatCounter processes the anonymous visit
              statistics described above, Web3Forms delivers contact-form
              messages and guestbook alerts to my inbox, the hosting
              platform&rsquo;s built-in database keeps newsletter sign-ups and
              guestbook notes, and when you press play the show&rsquo;s own
              podcast host streams the episode to you. No data is sold, rented or brokered. If a
              future feature needs another processor (for example an email
              provider), it will be named here before it goes live.
            </p>
          </Section>

          <Section title="6. How long it is kept">
            <p>
              Hosting logs are kept for the short period the hosting platform
              needs them for security and operation, after which they are
              deleted. Error reports are kept only long enough to diagnose the
              fault. Visit statistics are kept as anonymous page counts.
              Because the email form stores nothing, there is nothing to
              delete there. Guestbook notes are kept while they are shown and
              deleted when you ask or when I take them down.
            </p>
          </Section>

          <Section title="7. Your rights under the GDPR">
            <p>
              Because you are in the European Union &mdash; and because this site
              applies the same rules to everyone &mdash; you can ask at any time
              to:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>see what personal data is held about you,</li>
              <li>have anything incorrect corrected,</li>
              <li>have it deleted,</li>
              <li>limit how it is used,</li>
              <li>receive a copy of it in a portable format,</li>
              <li>object to processing based on legitimate interest,</li>
              <li>withdraw any consent you gave, without effect on what happened before.</li>
            </ul>
            <p>
              You can withdraw your newsletter consent by unsubscribing with
              one click in any message, or on the unsubscribe page the emails
              link to. To take down a guestbook note, write via the contact
              page and tell me the name it was signed with.
            </p>
          </Section>

          <Section title="8. Complaints">
            <p>
              If you think your data is being handled badly and a reply does not
              satisfy you, you can complain to your national data protection
              authority at no cost. In Sweden that is{" "}
              <a
                href="https://www.imy.se/"
                target="_blank"
                rel="noopener noreferrer"
                className={GOLD_LINK}
              >
                Integritetsskyddsmyndigheten (IMY)
              </a>
              .
            </p>
          </Section>

          <Section title="9. Children">
            <p>
              This site is written for adults and deliberately talks about adult
              nightlife history. No personal data is knowingly collected from
              anyone under 16.
            </p>
          </Section>

          <Section title="10. Security and changes">
            <p>
              The site is served over HTTPS, so traffic between your browser and
              the server is encrypted. There is no automated decision-making and
              no profiling.
            </p>
            <p>
              If this policy ever changes in a way that matters, the date at the
              top is updated and the change is described here. Material changes
              affecting a mailing list would only ever happen after you are
              asked again.
            </p>
          </Section>

          <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
            See also the <Link to="/terms" className={GOLD_LINK}>Terms &amp;
            Conditions</Link> &mdash; and the honest note on the{" "}
            <Link to="/about" className={GOLD_LINK}>
              About page
            </Link>{" "}
            about how this index is researched.{" "}
            <EntityText text="This page is a fan-made privacy notice for the Night Fever podcast by World of Wonder; it is not legal advice." />
          </p>
        </div>
      </section>

      <SiteFooter />    </main>
  );
}
