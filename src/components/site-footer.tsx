import { Link } from "@tanstack/react-router";
import { SHOW_URL, WOW_URL } from "@/data/guests";
import { EntityText } from "@/components/entity-text";
import { LegalNote } from "@/components/legal-links";

const LINK =
  "transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

// One shared footer for every page, identical to the home footer.
export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-12">
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
            .
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/" className={LINK}>
              Home
            </Link>
            <Link to="/episodes" className={LINK}>
              Afterparty
            </Link>
            <Link to="/explore" className={LINK}>
              Everything A&ndash;Z
            </Link>
            <Link to="/guests" className={LINK}>
              Guests
            </Link>
            <Link to="/timeline" className={LINK}>
              Timeline
            </Link>
            <Link to="/connections" className={LINK}>
              Connections
            </Link>
            <Link to="/map" className={LINK}>
              Map
            </Link>
            <Link to="/quiz" className={LINK}>
              Pub Quiz
            </Link>
            <Link to="/about" className={LINK}>
              About
            </Link>
            <a
              href={WOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK}
            >
              World of Wonder
            </a>
          </div>
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
