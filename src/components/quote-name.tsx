import { Link } from "@tanstack/react-router";
import { quoteNamePath } from "@/data/episodes";

/** The name under a quote, in every quote box on the site (Lisa, 27 Nov 2026: "in all of the quotes boxes on all pages make
 *  sure the name of the guest is clickable and links to their afterparty page"). It goes to the speaker's own AFTERPARTY
 *  (the right A/B page for two-interview episodes), or to the AFTERPARTY the quote comes from when the speaker has none
 *  (the hosts). Clickable look: the name keeps its colour and turns pink on hover, never underlined. */
export function QuoteName({
  who,
  episodeId,
  className = "",
}: {
  who: string;
  episodeId: string;
  className?: string;
}) {
  return (
    <Link
      to={quoteNamePath(who, episodeId)}
      className={`transition-colors hover:text-pink focus-visible:text-pink ${className}`}
    >
      {who}
    </Link>
  );
}
