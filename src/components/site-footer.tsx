import { Link } from "@tanstack/react-router";
import { SHOW_URL, WOW_URL } from "@/data/guests";
import { EntityText } from "@/components/entity-text";
import { LegalNote } from "@/components/legal-links";
import { TipBox } from "@/components/tip-box";

const LINK =
  "transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

// One shared footer for every page: the Ko-fi "Buy the Afterparty a drink" box (Lisa, 22 Oct 2026), then the show and World of Wonder links, Meet the guests, About, Contact, Under the hood, Guestbook and "Tip the fan page" (jumps to the box).
// The other page links live only in the top menu.
export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <TipBox className="mb-14 mt-4" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            My fan page for{" "}
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
            </a>
            {" · "}
            <Link to="/guests" className="whitespace-nowrap text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink">
              Meet the guests
            </Link>

          </p>
          <nav aria-label="Footer" className="flex flex-col items-center gap-2 sm:items-end">
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
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          <EntityText text="Made by a fan - not affiliated with World of Wonder or the Night Fever podcast. All show content and trademarks belong to their owners." />
        </p>
      </div>
      <p className="mx-auto mt-3 max-w-2xl text-center">
        <LegalNote />
      </p>
    </footer>
  );
}
