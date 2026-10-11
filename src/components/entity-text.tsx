import { SHOW_URL, WOW_URL } from "@/data/guests";

const LINK_CLASS =
  "text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink";

// Every visible mention of the show or its production company links out.
export function EntityText({
  text,
  className = LINK_CLASS,
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(/(Night Fever|World of Wonder)/g);
  return (
    <>
      {parts.map((part, i) =>
        part === "Night Fever" ? (
          <a
            key={i}
            href={SHOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            Night Fever
          </a>
        ) : part === "World of Wonder" ? (
          <a
            key={i}
            href={WOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            World of Wonder
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}
