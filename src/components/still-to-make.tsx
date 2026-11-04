import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { sendToInbox } from "@/lib/web3forms";
import { cardTo } from "@/lib/card-link";
import { episodeById, episodePath } from "@/data/episodes";
import {
  BOOKS_TO_WRITE,
  FILMS_TO_MAKE,
  type MadeYet,
  type StillToMake,
} from "@/data/still-to-make";
import { Timestamp } from "@/components/episode-player";

// "Still to be made" box on the Library page (Lisa, 4 Nov 2026: "add it to the library page as a box first"): the books
// and films the guests and hosts say should exist, in two tabs, laid out like "Who to interview next".

const ITEM_CLASS =
  "border-t border-border pt-4 first:border-t-0 first:pt-0 md:[&:nth-child(2)]:border-t-0 md:[&:nth-child(2)]:pt-0";

const TAG: Record<MadeYet, { label: string; className: string }> = {
  "not yet": { label: "Not made yet", className: "bg-pink text-pink-foreground" },
  "in the works": { label: "In the works", className: "bg-gold text-gold-foreground" },
  partly: { label: "Partly made", className: "bg-gold text-gold-foreground" },
  lost: { label: "Lost", className: "bg-gold text-gold-foreground" },
  made: { label: "Made since!", className: "border border-gold text-cream" },
};

function Item({ it }: { it: StillToMake }) {
  const ep = episodeById(it.episodeId);
  const tag = TAG[it.made];
  return (
    <li className={ITEM_CLASS}>
      <p className="font-[family-name:var(--font-flyer)] text-lg uppercase leading-tight text-cream">
        {it.title}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-card-foreground/85">{it.why}</p>
      <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <span className={`px-1.5 py-0.5 font-semibold uppercase tracking-wide ${tag.className}`}>
          {tag.label}
        </span>
        <span>{it.status}</span>
        {it.source?.card && (
          <Link {...cardTo(it.source.card)} className="text-gold hover:text-pink">
            {it.source.label} →
          </Link>
        )}
        {it.source?.href && (
          <a
            href={it.source.href}
            target="_blank"
            rel="noreferrer"
            className="text-gold hover:text-pink"
          >
            {it.source.label} ↗
          </a>
        )}
      </p>
      <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <span>Said in</span>
        <Link to={episodePath(ep.id)} className="text-gold">
          S{ep.season}E{ep.episode} &middot; {ep.guest}
        </Link>
        {it.time && <Timestamp episodeId={ep.id} time={it.time} className="text-xs" />}
      </p>
    </li>
  );
}

/** "What do you want to be made?" (Lisa, 4 Nov 2026): visitors suggest a book or film. It goes to Lisa's inbox only
 *  (Web3Forms, like the guestbook), nothing is shown on the site, and the visitor's name stays with Lisa. */
function SuggestOne() {
  const [kind, setKind] = useState<"Book" | "Film">("Book");
  const [what, setWhat] = useState("");
  const [why, setWhy] = useState("");
  const [from, setFrom] = useState("");
  const [trap, setTrap] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const opened = useRef(Date.now());
  const field =
    "w-full border-2 border-gold bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink";
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!what.trim()) return;
    // Bots fill the hidden field or send within a second or two; drop those quietly.
    if (trap || Date.now() - opened.current < 2500) return setState("sent");
    setState("sending");
    const ok = await sendToInbox({
      subject: `Still to be made (${kind.toLowerCase()}): ${what.trim()}`,
      kind,
      suggestion: what.trim(),
      why: why.trim() || "(no reason given)",
      from: from.trim() || "(no name given)",
    });
    setState(ok ? "sent" : "error");
    if (ok) {
      setWhat("");
      setWhy("");
      setFrom("");
    }
  };
  return (
    <div className="mt-8 border-t-2 border-gold pt-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
        What do you want to be made?
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-card-foreground/85">
        Which downtown story needs a book or a film? Tell me - the best ones go up here.
      </p>
      {state === "sent" ? (
        <p className="mt-4 border-2 border-pink p-3 text-sm font-semibold text-pink">
          Thank you - your idea is on its way to me!
        </p>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-2">
          <div className="flex gap-2" role="radiogroup" aria-label="A book or a film?">
            {(["Book", "Film"] as const).map((k) => (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={kind === k}
                onClick={() => setKind(k)}
                className="season-chip rounded-full"
                aria-pressed={kind === k}
              >
                {k === "Book" ? "A book" : "A film"}
              </button>
            ))}
          </div>
          <label htmlFor="stm-what" className="sr-only">
            What should be made?
          </label>
          <input
            id="stm-what"
            required
            maxLength={120}
            value={what}
            onChange={(e) => setWhat(e.target.value)}
            placeholder={
              kind === "Book" ? "Which book should be written?" : "Which film should be made?"
            }
            className={field}
          />
          <label htmlFor="stm-why" className="sr-only">
            Why? (optional)
          </label>
          <input
            id="stm-why"
            maxLength={300}
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            placeholder="Why? (optional)"
            className={field}
          />
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="stm-from" className="sr-only">
              Your name (optional)
            </label>
            <input
              id="stm-from"
              maxLength={60}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Your name (optional)"
              className={`${field} sm:flex-1`}
            />
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
              className="hidden"
            />
            <button
              type="submit"
              disabled={state === "sending"}
              className="whitespace-nowrap border-2 border-pink bg-pink px-4 py-2 text-xs font-semibold uppercase text-pink-foreground transition hover:bg-card hover:text-cream disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
            >
              {state === "sending" ? "Sending…" : "Suggest!"}
            </button>
          </div>
          {state === "error" && (
            <p className="text-xs text-destructive">
              That didn&rsquo;t go through - please try again.
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            I read every idea first. If I pick yours, it joins the list above - your name never
            does. See the{" "}
            <Link to="/privacy" className="text-gold">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
}

export function StillToMakeBox({ className = "" }: { className?: string }) {
  // Folded shut by default (Lisa, 4 Nov 2026: "click-and-expand box"): title, intro and tabs show, the list opens on a tap.
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<"books" | "films">("books");
  const tabs = [
    { key: "books" as const, label: "Books to be written", short: "Books", items: BOOKS_TO_WRITE },
    { key: "films" as const, label: "Films to be made", short: "Films", items: FILMS_TO_MAKE },
  ];
  const items = tab === "books" ? BOOKS_TO_WRITE : FILMS_TO_MAKE;
  return (
    <section aria-labelledby="still-to-make" className={className}>
      <div className="relative border-[3px] border-gold bg-card px-6 py-8 shadow-[8px_10px_0_var(--color-gold)] sm:px-10">
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-5 rotate-[6deg] bg-pink px-4 py-1.5 font-[family-name:var(--font-flyer)] text-xl uppercase text-pink-foreground sm:-right-6"
        >
          someone make it!
        </span>
        <h2 id="still-to-make" className="text-3xl leading-[0.95] sm:text-[40px]">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="still-to-make-body"
            onClick={() => setExpanded((e) => !e)}
            className="group flex w-full items-center justify-between gap-4 text-left uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
          >
            <span className="group-hover:text-pink">Still to be made</span>
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-gold text-2xl leading-none transition group-hover:bg-pink group-hover:text-pink-foreground"
            >
              {expanded ? "\u2212" : "+"}
            </span>
          </button>
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The books that need to be written and the films that have to be made - every one the
          guests and hosts call for on the show, with the exact moment (tap &#9654; to hear it) and
          whether anyone has made it since.
        </p>
        <div
          role="tablist"
          aria-label="Still to be made"
          className="mt-8 flex gap-1 border-b-2 border-gold sm:gap-2"
        >
          {tabs.map((t) => {
            // While the box is shut no tab is lit; tapping a tab opens the box on that list.
            const on = expanded && tab === t.key;
            const open = t.items.filter((i) => i.made !== "made").length;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                id={`stm-tab-${t.key}`}
                aria-selected={on}
                aria-controls="still-to-make-body"
                aria-expanded={on}
                onClick={() => {
                  if (on) return setExpanded(false);
                  setTab(t.key);
                  setExpanded(true);
                }}
                className={`-mb-[2px] whitespace-nowrap border-2 border-b-0 px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-3 sm:text-xs sm:tracking-[0.2em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink ${
                  on
                    ? "border-gold bg-pink text-pink-foreground"
                    : "border-transparent text-pink hover:border-gold"
                }`}
              >
                <span className="sm:hidden">{t.short}</span>
                <span className="hidden sm:inline">{t.label}</span>{" "}
                <span className={on ? "opacity-80" : "text-muted-foreground"}>({open})</span>
              </button>
            );
          })}
        </div>
        {expanded && (
          <div
            role="tabpanel"
            id="still-to-make-body"
            aria-labelledby={`stm-tab-${tab}`}
            className="mt-6"
          >
            <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
              {items.map((it) => (
                <Item key={it.title} it={it} />
              ))}
            </ul>
            <SuggestOne />
          </div>
        )}
      </div>
    </section>
  );
}
