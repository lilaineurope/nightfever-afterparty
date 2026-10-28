import { Link } from "@tanstack/react-router";
import { NIGHT_FEVER_URL, WOW_URL } from "@/data/guests";
import { EntityText } from "@/components/entity-text";
import { LegalNote } from "@/components/legal-links";
import { TipBox } from "@/components/tip-box";
import { ListenBox } from "@/components/listen-box";
import { NewsletterBox } from "@/components/newsletter-box";
import { TEXT_LINK } from "@/lib/styles";

const LINK =
  "transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

// One shared footer for every page (Lisa, 22-23 Oct 2026): on the left the Listen box, the newsletter sign-up, then all the footer text - the show and World of
// Wonder links, Meet the guests, About, Contact, Under the hood, Guestbook (no "Tip the fan page" link - Lisa, 23 Oct),
// the fan-page disclaimer and the legal note - and the Tipeee tip box on the right (below the text on phones); no extra text next to the box.
// The other page links live only in the top menu.
export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-[1fr_auto]">
        <div className="space-y-4 text-left">
          <ListenBox className="mb-10 max-w-[560px]" />
          <NewsletterBox className="mb-10 max-w-[560px]" />
          <p className="text-sm text-muted-foreground">
            My fan page for{" "}
            <a href={NIGHT_FEVER_URL} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
              <em>Night Fever</em>
            </a>{" "}
            by{" "}
            <a href={WOW_URL} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
              World of Wonder
            </a>
            {" · "}
            <Link to="/guests" className={`whitespace-nowrap ${TEXT_LINK}`}>
              Meet the guests
            </Link>
          </p>
          <nav aria-label="Footer">
            <p className="text-sm text-muted-foreground">
              <Link to="/about" className={LINK}>About</Link>
              {" · "}
              <Link to="/contact" className={LINK}>Contact</Link>
              {" · "}
              <Link to="/under-the-hood" className={LINK}>Under the hood</Link>
              {" · "}
              <Link to="/guestbook" className={LINK}>Guestbook</Link>
            </p>
          </nav>
          <p className="max-w-xl text-xs text-muted-foreground/60">
            <EntityText text="Made by a fan - not affiliated with World of Wonder or the Night Fever podcast. All show content and trademarks belong to their owners." />
          </p>
          <p>
            <LegalNote align="left" />
          </p>
        </div>
        <TipBox className="mx-auto w-full max-w-[400px] md:mx-0" />
      </div>
    </footer>
  );
}
