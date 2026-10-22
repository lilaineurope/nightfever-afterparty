import { Link } from "@tanstack/react-router";
import { NIGHT_FEVER_URL, WOW_URL } from "@/data/guests";
import { entityFor } from "@/data/entities";
import { linkNames } from "@/lib/name-links";

const LINK_CLASS =
  "text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink";
const NAME_CLASS =
  "text-cream/90 underline decoration-pink/40 decoration-dotted underline-offset-2 transition hover:text-pink";

// Every visible mention of the show or its production company links out.
// With `self` set (the card's own name), every other known name in the text links to its own card.
export function EntityText({
  text,
  className = LINK_CLASS,
  self,
}: {
  text: string;
  className?: string;
  self?: string;
}) {
  const parts = text.split(/(Night Fever|World of Wonder)/g);
  const selfSlug = self !== undefined ? (entityFor(self)?.slug ?? "") : undefined;
  return (
    <>
      {parts.map((part, i) =>
        part === "Night Fever" ? (
          <a key={i} href={NIGHT_FEVER_URL} target="_blank" rel="noopener noreferrer" className={className}>
            Night Fever
          </a>
        ) : part === "World of Wonder" ? (
          <a key={i} href={WOW_URL} target="_blank" rel="noopener noreferrer" className={className}>
            World of Wonder
          </a>
        ) : selfSlug === undefined ? (
          part
        ) : (
          linkNames(part, selfSlug).map((seg, j) =>
            seg.slug ? (
              <Link key={`${i}-${j}`} to="/explore/$slug" params={{ slug: seg.slug }} className={NAME_CLASS}>
                {seg.text}
              </Link>
            ) : (
              <span key={`${i}-${j}`}>{seg.text}</span>
            ),
          )
        ),
      )}
    </>
  );
}
