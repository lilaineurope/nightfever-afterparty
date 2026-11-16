import { NIGHT_FEVER_URL, WOW_URL } from "@/data/guests";

export const LINK_CLASS =
  "text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink";

/** Text where every visible mention of the show or its production company links out. No card links, so it doesn't load
 *  the A–Z data (page weight, 16 Nov 2026) - the footer and the About, Terms and Privacy pages use it. EntityText with
 *  `self` also links every other known name to its card. */
export function ShowText({ text, className = LINK_CLASS }: { text: string; className?: string }) {
  const parts = text.split(/(Night Fever|World of Wonder)/g);
  return (
    <>
      {parts.map((part, i) =>
        part === "Night Fever" ? (
          <a
            key={i}
            href={NIGHT_FEVER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            Night Fever
          </a>
        ) : part === "World of Wonder" ? (
          <a key={i} href={WOW_URL} target="_blank" rel="noopener noreferrer" className={className}>
            World of Wonder
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}
