import { Link, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { sendToInbox } from "@/lib/web3forms";
import { suggestForPage } from "@/lib/page-suggestions.functions";

// "Got a suggestion for this page?" - the last box on every page (Lisa, 24 Nov 2026: "every page should have a suggestion
// box in the bottom - the request then will know from which page exactly this suggestion comes from - do that to all pages
// and from there onwards"). It sits at the top of the shared SiteFooter (and on the 404 page), so every page that uses the
// footer - which every page must - gets it without any extra step. The page is read from the address bar when the visitor
// sends (path + #anchor, never the query string) together with the page's title, stored in page_suggestions and sent to
// Lisa's inbox. Nothing from this box is ever shown on the site.

const FIELD =
  "w-full border-2 border-gold bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink";

/** "Studio 54 | Night Fever AFTERPARTY" -> "Studio 54" */
const pageName = (title: string) =>
  title
    .replace(/\s*[|·–-]\s*Night Fever AFTERPARTY.*$/i, "")
    .replace(/^Night Fever AFTERPARTY\s*[|·–-]\s*/i, "")
    .trim() || title.trim();

/** notFound: on the 404 page, where the title is the site's own - the box names the broken address instead. */
export function PageSuggestionBox({ className = "", notFound = false }: { className?: string; notFound?: boolean }) {
  const suggest = useServerFn(suggestForPage);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [from, setFrom] = useState("");
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [problem, setProblem] = useState("");
  const opened = useRef(Date.now());

  // The page title is set by the route's head after it renders: read it once the page has settled, again on every move.
  useEffect(() => {
    const read = () => setTitle(pageName(document.title));
    read();
    const t = window.setTimeout(read, 400);
    setState((s) => (s === "sent" ? "idle" : s));
    return () => window.clearTimeout(t);
  }, [pathname]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length < 3) return;
    // Exactly where the visitor is right now: the path and any #anchor, without utm tags or ?me.
    const path = `${window.location.pathname}${window.location.hash}`;
    const pageTitle = notFound ? `Page not found: ${path}` : pageName(document.title);
    setState("sending");
    setProblem("");
    try {
      const res = await suggest({
        data: { path, title: pageTitle, message, from, email, website: trap, elapsed: Date.now() - opened.current },
      });
      if (!res.ok) {
        setProblem(res.message);
        setState("error");
        return;
      }
      if (res.id) {
        // Heads-up to Lisa's inbox: which page, the suggestion, and the link to it on the moderation page.
        // Web3Forms uses "email" as reply-to, so Lisa can answer straight from her inbox when the visitor left one.
        void sendToInbox({
          subject: `Suggestion on ${pageTitle || path}: ${message.trim().slice(0, 60)}${message.trim().length > 60 ? "…" : ""}`,
          box: "Suggestion for this page",
          page: `${window.location.origin}${path}`,
          page_title: pageTitle || "(no title)",
          suggestion: message.trim(),
          from: from.trim() || "(no name given)",
          ...(email.trim() ? { email: email.trim() } : { reply: "(no email given)" }),
          see_all: `${window.location.origin}/guestbook/admin?page=${res.id}`,
        });
      }
      setState("sent");
      setMessage("");
      setFrom("");
      setEmail("");
    } catch (err) {
      setProblem(err instanceof Error ? err.message : "");
      setState("error");
    }
  };

  const here = notFound ? `Page not found - ${pathname}` : title || pathname;

  return (
    <section id="suggest" aria-labelledby="suggest-heading" className={`scroll-mt-20 ${className}`}>
      <div className="w-full border-[3px] border-gold bg-card px-6 py-7 shadow-[8px_10px_0_var(--color-gold)] sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="suggest-heading" className="text-3xl leading-[0.95]">
            Got a suggestion for <span className="text-pink">this page?</span>
          </h2>
          <p className="line-clamp-2 max-w-full text-xs uppercase tracking-[0.18em] text-muted-foreground" title={here}>
            This page: <span className="font-semibold text-gold">{here}</span>
          </p>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed">
          {notFound
            ? "Were you looking for something here? Tell me what you expected to find - your note comes with this address attached."
            : <>A name that&rsquo;s missing, a date that&rsquo;s off, a better picture, a story I should add? Tell me - your note comes with this page attached, so I&rsquo;ll know exactly what you mean.</>}
        </p>
        {state === "sent" ? (
          <div className="mt-5 space-y-2">
            <p className="border-2 border-pink p-4 text-sm font-semibold text-pink">Thank you - your suggestion is on its way to me!</p>
            <button type="button" onClick={() => setState("idle")} className="text-xs text-gold underline underline-offset-2 hover:text-pink">
              Suggest something else
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-5 space-y-2">
            <label htmlFor="suggest-message" className="sr-only">Your suggestion for this page</label>
            <textarea
              id="suggest-message"
              required
              minLength={3}
              maxLength={1000}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your suggestion for this page"
              className={`${FIELD} resize-y`}
            />
            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="suggest-from" className="sr-only">Your name (optional)</label>
              <input id="suggest-from" maxLength={60} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Your name (optional)" className={`${FIELD} sm:flex-1`} />
              <label htmlFor="suggest-email" className="sr-only">Your email (optional, only if you&rsquo;d like an answer)</label>
              <input
                id="suggest-email"
                type="email"
                maxLength={200}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email, if you'd like a reply"
                className={`${FIELD} sm:flex-[1.4]`}
              />
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} className="hidden" />
              <button
                type="submit"
                disabled={state === "sending"}
                className="whitespace-nowrap border-2 border-pink bg-pink px-5 py-2 text-xs font-semibold uppercase text-pink-foreground transition hover:bg-card hover:text-cream disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
              >
                {state === "sending" ? "Sending…" : "Send it!"}
              </button>
            </div>
            {state === "error" && <p className="text-xs text-destructive">{problem || "That didn’t go through - please try again."}</p>}
            <p className="text-xs text-muted-foreground">
              Only I read these - nothing from this box is shown on the site. See the{" "}
              <Link to="/privacy" className="text-gold hover:text-pink">Privacy Policy</Link>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
