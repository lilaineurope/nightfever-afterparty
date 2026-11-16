import { Link } from "@tanstack/react-router";
import { NIGHT_FEVER_URL, WOW_URL } from "@/data/guests";
import { linkToSlug, useLinks } from "@/lib/link-index";
import { LINK_CLASS, ShowText, showParts } from "@/components/show-text";

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
  const links = useLinks();
  if (self === undefined) return <ShowText text={text} className={className} />;
  const parts = showParts(text);
  const selfSlug = links.cardForName(self)?.slug ?? "";
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
        ) : (
          links.linkNames(part, selfSlug).map((seg, j) =>
            seg.slug ? (
              <Link key={`${i}-${j}`} {...linkToSlug(links, seg.slug)} className={NAME_CLASS}>
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
