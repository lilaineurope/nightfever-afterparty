import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendToInbox } from "@/lib/web3forms";
import { listFanPicks, suggestGuest, type FanPick } from "@/lib/suggestions.functions";
import { COME_BACK, NEW_FACES, type InterviewTip } from "@/data/interview-next";
import { episodeById, episodePath } from "@/data/episodes";
import { EntityLink } from "@/components/entity-link";
import { Timestamp } from "@/components/episode-player";

function Tip({ tip }: { tip: InterviewTip }) {
  const ep = episodeById(tip.episodeId);
  return (
    <li className="border-t border-border pt-4 first:border-t-0 first:pt-0">
      <EntityLink name={tip.name} className="font-[family-name:var(--font-flyer)] text-lg uppercase leading-tight text-cream hover:text-pink">
        {tip.name}
      </EntityLink>
      <p className="mt-1 text-sm leading-relaxed text-card-foreground/85">{tip.why}</p>
      <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <span className="bg-gold px-1.5 py-0.5 font-semibold uppercase tracking-wide text-gold-foreground">Suggested on the show</span>
        <span>Said in</span>
        <Link to={episodePath(ep.id)} className="text-gold">
          S{ep.season}E{ep.episode} &middot; {ep.guest}
        </Link>
        <Timestamp episodeId={ep.id} time={tip.time} className="text-xs" />
      </p>
    </li>
  );
}

/** "Your choice": visitors suggest a guest (Lisa, 23 Oct 2026). Since 27 Oct each suggestion is stored as pending
 *  (src/lib/suggestions.functions.ts) and Lisa gets an email with a link to approve or reject it; approved ones show
 *  under "Suggested by you, the fans" straight away - never with the visitor's name. */
function YourChoice() {
  const [who, setWho] = useState("");
  const [why, setWhy] = useState("");
  const [from, setFrom] = useState("");
  const [trap, setTrap] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [problem, setProblem] = useState("");
  const opened = useRef(Date.now());
  const suggest = useServerFn(suggestGuest);
  const field =
    "w-full border-2 border-gold bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!who.trim()) return;
    setState("sending");
    setProblem("");
    try {
      const res = await suggest({ data: { who, why, from, website: trap, elapsed: Date.now() - opened.current } });
      if (!res.ok) {
        setProblem(res.message);
        setState("error");
        return;
      }
      if (res.id) {
        // Heads-up to Lisa's inbox, with the link to approve or reject this one suggestion.
        void sendToInbox({
          subject: `Who to interview next: ${who.trim()}`,
          suggestion: who.trim(),
          why: why.trim() || "(no reason given)",
          from: from.trim() || "(no name given)",
          approve_or_reject: `${window.location.origin}/guestbook/admin?suggestion=${res.id}`,
        });
      }
      setState("sent");
      setWho("");
      setWhy("");
      setFrom("");
    } catch (err) {
      setProblem(err instanceof Error ? err.message : "");
      setState("error");
    }
  };

  return (
    <div className="mt-8 border-t-2 border-gold pt-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Your choice</h3>
      <p className="mt-2 text-sm leading-relaxed text-card-foreground/85">
        Who should James, Fenton and Randy have on next? Tell me - the best suggestions go up here.
      </p>
      {state === "sent" ? (
        <p className="mt-4 border-2 border-pink p-3 text-sm font-semibold text-pink">Thank you - your suggestion is on its way to me!</p>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-2">
          <label htmlFor="yc-who" className="sr-only">Who should they interview?</label>
          <input id="yc-who" required maxLength={80} value={who} onChange={(e) => setWho(e.target.value)} placeholder="Who should they interview?" className={field} />
          <label htmlFor="yc-why" className="sr-only">Why? (optional)</label>
          <input id="yc-why" maxLength={200} value={why} onChange={(e) => setWhy(e.target.value)} placeholder="Why? (optional)" className={field} />
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="yc-from" className="sr-only">Your name (optional)</label>
            <input id="yc-from" maxLength={60} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Your name (optional)" className={`${field} sm:flex-1`} />
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} className="hidden" />
            <button
              type="submit"
              disabled={state === "sending"}
              className="whitespace-nowrap border-2 border-pink bg-pink px-4 py-2 text-xs font-semibold uppercase text-pink-foreground transition hover:bg-card hover:text-cream disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
            >
              {state === "sending" ? "Sending…" : "Suggest!"}
            </button>
          </div>
          {state === "error" && <p className="text-xs text-destructive">{problem || "That didn\u2019t go through - please try again."}</p>}
          <p className="text-xs text-muted-foreground">
            I read every suggestion first. If I pick yours, it joins the list above - your name never does. See the{" "}
            <Link to="/privacy" className="text-gold">Privacy Policy</Link>.
          </p>
        </form>
      )}
    </div>
  );
}

/** A fan suggestion Lisa approved: part of the New faces list, tagged "Suggested by a fan". */
function FanTip({ pick }: { pick: FanPick }) {
  return (
    <li className="border-t border-border pt-4 first:border-t-0 first:pt-0">
      <EntityLink name={pick.who} className="font-[family-name:var(--font-flyer)] text-lg uppercase leading-tight text-cream hover:text-pink">
        {pick.who}
      </EntityLink>
      {pick.why && <p className="mt-1 text-sm leading-relaxed text-card-foreground/85">&ldquo;{pick.why}&rdquo;</p>}
      <p className="mt-1.5 text-xs text-muted-foreground">
        <span className="bg-pink px-1.5 py-0.5 font-semibold uppercase tracking-wide text-pink-foreground">
          {pick.count > 1 ? `Suggested by ${pick.count} fans` : "Suggested by a fan"}
        </span>
      </p>
    </li>
  );
}

/** "Who to interview next" box (Lisa, 23 Oct 2026): every on-air tip for a future guest, with where it was said. */
export function InterviewNext({ className = "" }: { className?: string }) {
  // Fans' suggestions that Lisa approved join the New faces list (src/lib/suggestions.functions.ts).
  const list = useServerFn(listFanPicks);
  const [picks, setPicks] = useState<FanPick[]>([]);
  useEffect(() => {
    list().then(setPicks).catch(() => setPicks([]));
  }, [list]);
  return (
    <section aria-labelledby="interview-next" className={`px-6 py-14 ${className}`}>
      <div className="relative mx-auto max-w-5xl border-[3px] border-gold bg-card px-6 py-8 shadow-[8px_10px_0_var(--color-gold)] sm:px-10">
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-5 rotate-[6deg] bg-pink px-4 py-1.5 font-[family-name:var(--font-flyer)] text-xl uppercase text-pink-foreground sm:-right-6"
        >
          book them!
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-pink">Heard on the show</p>
        <h2 id="interview-next" className="mt-2 text-3xl leading-[0.95] sm:text-[40px]">
          Who to interview next
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Who should James, Fenton and Randy have on next? Every name put forward on the show - with the episode and the
          exact moment, tap &#9654; to hear it - and the ones suggested by you, the fans.
        </p>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">New faces</h3>
            <ul className="mt-4 space-y-4">
              {NEW_FACES.map((t) => (
                <Tip key={t.name} tip={t} />
              ))}
              {picks.map((p) => (
                <FanTip key={p.who} pick={p} />
              ))}
            </ul>
            <YourChoice />
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Back for a part two</h3>
            <ul className="mt-4 space-y-4">
              {COME_BACK.map((t) => (
                <Tip key={t.name} tip={t} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
