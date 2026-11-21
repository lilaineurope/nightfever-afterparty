import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendToInbox } from "@/lib/web3forms";
import { FAN_BOX, type FanBox } from "@/lib/fan-suggestions";
import { listFanIdeas, suggestFanIdea, type FanIdea } from "@/lib/fan-suggestions.functions";

// One fan suggestion box (src/lib/fan-suggestions.ts): the approved ideas under "Suggested by you, the fans", then the form.
// inset: inside another box (the Library's Publish this) with a rule on top; panel: its own card under a page's list.

const FIELD =
  "w-full border-2 border-gold bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink";

const fanBadge = (count: number) => (count > 1 ? `Suggested by ${count} fans` : "Suggested by a fan");

/** kind: a fixed kind for this spot (the Library's Books tab = Book, Films tab = Film; Lisa, 21 Nov 2026) - no choice chips, and only
 *  that kind's approved ideas are listed. */
export function FanSuggestions({
  box,
  kind: fixedKind,
  variant = "panel",
  className = "",
  about,
}: {
  box: FanBox;
  kind?: string;
  /** The thing the idea is about, set by the page (Got a copy?: the Library item) - the "what" field is then hidden and the story is asked for. */
  about?: string;
  variant?: "inset" | "panel";
  className?: string;
}) {
  const cfg = FAN_BOX[box];
  const list = useServerFn(listFanIdeas);
  const suggest = useServerFn(suggestFanIdea);
  const [ideas, setIdeas] = useState<FanIdea[]>([]);
  const [pickedKind, setKind] = useState(cfg.kinds?.[0]?.value ?? "");
  const kind = fixedKind ?? pickedKind;
  const [typed, setWhat] = useState("");
  const [why, setWhy] = useState("");
  const [from, setFrom] = useState("");
  const [trap, setTrap] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [problem, setProblem] = useState("");
  const opened = useRef(Date.now());
  useEffect(() => {
    if (cfg.listApproved === false) return;
    list({ data: box })
      .then((all) => setIdeas(fixedKind ? all.filter((i) => i.kind === fixedKind) : all))
      .catch(() => setIdeas([]));
  }, [list, box, fixedKind, cfg.listApproved]);

  const id = `fan-${box}${fixedKind ? `-${fixedKind.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : ""}`;
  const kindCfg = cfg.kinds?.find((k) => k.value === kind);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const what = about ? about.slice(0, 120) : typed;
    if (!what.trim() || (about && !why.trim())) return;
    setState("sending");
    setProblem("");
    try {
      const res = await suggest({ data: { box, kind, what, why, from, website: trap, elapsed: Date.now() - opened.current } });
      if (!res.ok) {
        setProblem(res.message);
        setState("error");
        return;
      }
      if (res.id) {
        // Heads-up to Lisa's inbox, with the link to approve or reject this one idea.
        void sendToInbox({
          subject: `${cfg.page}: ${kind ? `(${kind.toLowerCase()}) ` : ""}${what.trim()}`,
          box: cfg.page,
          ...(kind ? { kind } : {}),
          suggestion: what.trim(),
          why: why.trim() || "(no reason given)",
          from: from.trim() || "(no name given)",
          approve_or_reject: `${window.location.origin}/guestbook/admin?fan=${res.id}`,
        });
      }
      setState("sent");
      setWhat("");
      setWhy("");
      setFrom("");
    } catch (err) {
      setProblem(err instanceof Error ? err.message : "");
      setState("error");
    }
  };

  const outer =
    variant === "inset"
      ? `mt-8 border-t-2 border-gold pt-6 ${className}`
      : `mx-auto max-w-6xl border-[3px] border-gold bg-card px-4 py-8 shadow-[8px_10px_0_var(--color-gold)] sm:px-10 ${className}`;

  return (
    <section aria-labelledby={`${id}-h`} className={outer}>
      {ideas.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Suggested by you, the fans</h3>
          <ul className="mt-4 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {ideas.map((it) => (
              <li key={`${it.kind}|${it.what}`} className="border-t border-border pt-4 first:border-t-0 first:pt-0 md:[&:nth-child(2)]:border-t-0 md:[&:nth-child(2)]:pt-0">
                <p className="font-[family-name:var(--font-flyer)] text-lg uppercase leading-tight text-cream">
                  {it.what}
                  {it.kind && <span className="ml-2 align-middle text-xs normal-case text-muted-foreground">({it.kind.toLowerCase()})</span>}
                </p>
                {it.why && <p className="mt-1 text-sm leading-relaxed text-card-foreground/85">&ldquo;{it.why}&rdquo;</p>}
                <p className="mt-1.5 text-xs">
                  <span className="bg-pink px-1.5 py-0.5 font-semibold uppercase tracking-wide text-pink-foreground">{fanBadge(it.count)}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <h3 id={`${id}-h`} className={variant === "inset" ? "text-xs font-semibold uppercase tracking-[0.2em] text-pink" : "text-2xl uppercase leading-[0.95] text-cream sm:text-3xl"}>
        {cfg.heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-card-foreground/85">{cfg.intro}</p>
      {state === "sent" ? (
        <div className="mt-4 space-y-2">
          <p className="border-2 border-pink p-3 text-sm font-semibold text-pink">{cfg.thanks}</p>
          <button type="button" onClick={() => setState("idle")} className="text-xs text-gold underline underline-offset-2 hover:text-pink">
            Suggest another
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-4 max-w-3xl space-y-2">
          {cfg.kinds && !fixedKind && (
            <div className="flex gap-2" role="radiogroup" aria-label="What kind?">
              {cfg.kinds.map((k) => (
                <button key={k.value} type="button" role="radio" aria-checked={kind === k.value} onClick={() => setKind(k.value)} className="season-chip rounded-full">
                  {k.label}
                </button>
              ))}
            </div>
          )}
          {!about && (
            <>
              <label htmlFor={`${id}-what`} className="sr-only">{kindCfg?.placeholder ?? cfg.placeholder}</label>
              <input id={`${id}-what`} required maxLength={120} value={typed} onChange={(e) => setWhat(e.target.value)} placeholder={kindCfg?.placeholder ?? cfg.placeholder} className={FIELD} />
            </>
          )}
          <label htmlFor={`${id}-why`} className="sr-only">{cfg.whyPlaceholder}</label>
          <input id={`${id}-why`} required={!!about} maxLength={300} value={why} onChange={(e) => setWhy(e.target.value)} placeholder={cfg.whyPlaceholder} className={FIELD} />
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor={`${id}-from`} className="sr-only">Your name (optional)</label>
            <input id={`${id}-from`} maxLength={60} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Your name (optional)" className={`${FIELD} sm:flex-1`} />
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} className="hidden" />
            <button
              type="submit"
              disabled={state === "sending"}
              className="whitespace-nowrap border-2 border-pink bg-pink px-4 py-2 text-xs font-semibold uppercase text-pink-foreground transition hover:bg-card hover:text-cream disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
            >
              {state === "sending" ? "Sending…" : (cfg.submitLabel ?? "Suggest!")}
            </button>
          </div>
          {state === "error" && <p className="text-xs text-destructive">{problem || "That didn’t go through - please try again."}</p>}
          <p className="text-xs text-muted-foreground">
            {cfg.footnote ?? (
              <>
                I read every suggestion first. {cfg.listApproved === false ? "If I use yours, it goes into the list above" : "If I pick yours, it shows up here"} - your name never does.
              </>
            )}{" "}
            See the{" "}
            <Link to="/privacy" className="text-gold">Privacy Policy</Link>.
          </p>
        </form>
      )}
    </section>
  );
}
