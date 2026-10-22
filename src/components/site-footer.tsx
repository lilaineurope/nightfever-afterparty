import { Link } from "@tanstack/react-router";
import { NIGHT_FEVER_URL, WOW_URL } from "@/data/guests";
import { EntityText } from "@/components/entity-text";
import { LegalNote } from "@/components/legal-links";
import { TipBox } from "@/components/tip-box";

const LINK =
  "transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";
const TEXT_LINK = "text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink";

// One shared footer for every page (Lisa, 22 Oct 2026): all the footer text on the left - the show and World of
// Wonder links, Meet the guests, About, Contact, Under the hood, Guestbook, "Tip the fan page" (jumps to the box),
// the fan-page disclaimer and the legal note - and the Tipeee tip box on the right (below the text on phones); no extra text next to the box.
// The other page links live only in the top menu.
export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_auto]">
        <div className="space-y-4 text-left">
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
              {" · "}
              <a href="#tip" className={LINK}>Tip the fan page</a>
            </p>
          </nav>
          <p className="max-w-xl text-xs text-muted-foreground/60">
            <EntityText text="Made by a fan - not affiliated with World of Wonder or the Night Fever podcast. All show content and trademarks belong to their owners." />
          </p>
          <p>
            <LegalNote align="left" />
          </p>
        </div>
        <TipBox className="mx-auto w-full max-w-[460px] md:mx-0" />
      </div>
    </footer>
  );
}
