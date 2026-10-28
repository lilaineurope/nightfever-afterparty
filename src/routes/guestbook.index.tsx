import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteFooter } from "@/components/site-footer";
import { listGuestbook, signGuestbook, type GuestbookNote } from "@/lib/guestbook.functions";
import { SHOW_EPISODES, showEpisode, episodeLabel } from "@/lib/guestbook-episodes";
import { episodePath } from "@/data/episodes";
import { sendToInbox } from "@/lib/web3forms";
import { GUESTBOOK_PAGES, guestbookPage } from "@/lib/pages";
import { FORM_FIELD } from "@/lib/styles";

export const Route = createFileRoute("/guestbook/")({
  staticData: { sitemap: true },
  loader: () => listGuestbook(),
  component: GuestbookPage,
  head: () =>
    pageHead({
      path: "/guestbook",
      title: "Guestbook | Night Fever fan page",
      description: "Sign the Night Fever Afterparty guestbook! Leave a note about your favourite episode, a club you loved or a night you'll never forget.",
      image: "/og/guestbook.jpg",
    }),
});

const MAX = 1000;

function GuestbookPage() {
  const notes = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative px-6 pb-12 pt-14">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Sign the <span className="text-pink text-glow-pink">guestbook</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Were you there? Which episode had you screaming? Which club do you still dream about? Leave a note for the
            Afterparty - I read every one before it goes up!
          </p>
        </div>
      </section>

      <section className="relative z-10 -mt-6 px-6 pb-16">
        <SignForm />
      </section>

      <section aria-labelledby="notes" className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 id="notes" className="text-center text-3xl font-bold text-cream">
            {notes.length > 0 ? (
              <>
                {notes.length} {notes.length === 1 ? "note" : "notes"} from the <span className="text-pink">dance floor</span>
              </>
            ) : (
              <>
                Be the <span className="text-pink">first</span> to sign!
              </>
            )}
          </h2>
          {notes.length > 0 && (
            <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
              {notes.map((n, i) => (
                <NoteCard key={n.id} note={n} tilt={i % 3} />
              ))}
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

const TILTS = ["-rotate-[0.8deg]", "rotate-[0.6deg]", "-rotate-[0.3deg]"];

function NoteCard({ note, tilt }: { note: GuestbookNote; tilt: number }) {
  const ep = showEpisode(note.episode);
  const pg = guestbookPage(note.page);
  const date = new Date(note.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <article className={`relative mb-6 break-inside-avoid rounded-2xl border border-gold/25 bg-card p-5 pt-7 shadow-lg ${TILTS[tilt]}`}>
      <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rotate-[-2deg] rounded-sm bg-pink/70" />
      <p className="whitespace-pre-line text-cream/95">{note.message}</p>
      <footer className="mt-4 text-sm">
        <span className="font-semibold text-gold">{note.name}</span>
        {note.place && <span className="text-muted-foreground"> · {note.place}</span>}
        <span className="block text-xs text-muted-foreground/70">{date}</span>
        {ep && (
          <span className="mt-2 block text-xs text-muted-foreground">
            Favourite episode:{" "}
            {ep.afterparty ? (
              <Link to={episodePath(ep.code as Parameters<typeof episodePath>[0])} className="text-gold underline decoration-gold/50 underline-offset-2 hover:text-pink">
                {episodeLabel(ep)}
              </Link>
            ) : (
              <Link to="/explore/$slug" params={{ slug: ep.guestSlug }} className="text-gold underline decoration-gold/50 underline-offset-2 hover:text-pink">
                {episodeLabel(ep)}
              </Link>
            )}
          </span>
        )}
        {pg && (
          <span className="mt-1 block text-xs text-muted-foreground">
            Favourite page:{" "}
            <a href={pg.to} className="text-gold underline decoration-gold/50 underline-offset-2 hover:text-pink">
              {pg.label}
            </a>
          </span>
        )}
      </footer>
      {note.reply && (
        <div className="mt-4 rounded-xl border border-pink/30 bg-pink/10 p-3 text-sm text-cream/90">
          <span className="font-semibold text-pink">Reply from the Afterparty: </span>
          <span className="whitespace-pre-line">{note.reply}</span>
        </div>
      )}
    </article>
  );
}

function SignForm() {
  const sign = useServerFn(signGuestbook);
  const started = useRef(Date.now());
  const [length, setLength] = useState(0);
  const [state, setState] = useState<{ status: "idle" | "sending" | "sent" | "error"; message?: string }>({ status: "idle" });
  useEffect(() => {
    started.current = Date.now();
  }, []);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    const fields = {
      name: String(form.get("name") ?? ""),
      place: String(form.get("place") ?? ""),
      episode: String(form.get("episode") ?? ""),
      page: String(form.get("page") ?? ""),
      message: String(form.get("message") ?? ""),
    };
    setState({ status: "sending" });
    try {
      const res = await sign({
        data: { ...fields, consent: form.get("consent") === "on", website: String(form.get("website") ?? ""), elapsed: Date.now() - started.current },
      });
      if (!res.ok) return setState({ status: "error", message: res.message });
      setState({ status: "sent", message: res.message });
      if (!form.get("website")) {
        // A heads-up in Lisa's inbox that a note is waiting for her (no visitor email is collected).
        void sendToInbox({
          subject: "New guestbook note waiting for you",
          name: fields.name,
          place: fields.place,
          episode: fields.episode,
          page: guestbookPage(fields.page)?.label ?? "",
          message: `${fields.message}\n\nApprove or hide it at ${window.location.origin}/guestbook/admin`,
        });
      }
    } catch (e) {
      setState({ status: "error", message: e instanceof Error ? e.message : "Oops - that didn't go through. Please try again!" });
    }
  }

  if (state.status === "sent") {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-gold/25 bg-card p-8 text-center">
        <p className="text-2xl font-bold text-cream">Thank you, darling!</p>
        <p className="mt-3 text-muted-foreground">{state.message}</p>
        <button type="button" onClick={() => setState({ status: "idle" })} className="mt-6 text-gold underline underline-offset-2 hover:text-pink">
          Write another note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4 rounded-3xl border border-gold/25 bg-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-muted-foreground">Your name or nickname</span>
          <input name="name" required maxLength={60} autoComplete="nickname" className={`mt-1 ${FORM_FIELD}`} />
        </label>
        <label className="block">
          <span className="text-sm text-muted-foreground">Where you're from (optional)</span>
          <input name="place" maxLength={60} placeholder="e.g. Berlin" className={`mt-1 ${FORM_FIELD}`} />
        </label>
      </div>
      <label className="block">
        <span className="text-sm text-muted-foreground">Favourite episode (optional)</span>
        <span className="relative mt-1 block">
          <select name="episode" defaultValue="" className={`appearance-none pr-10 [color-scheme:light] ${FORM_FIELD}`}>
            <option value="">Pick one if you like</option>
            {SHOW_EPISODES.map((e) => (
              <option key={e.code} value={e.code}>
                {episodeLabel(e)}
              </option>
            ))}
          </select>
          <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg>
        </span>
      </label>
      <label className="block">
        <span className="text-sm text-muted-foreground">Favourite page on this site (optional)</span>
        <span className="relative mt-1 block">
          <select name="page" defaultValue="" className={`appearance-none pr-10 [color-scheme:light] ${FORM_FIELD}`}>
            <option value="">Pick one if you like</option>
            {GUESTBOOK_PAGES.map((p) => (
              <option key={p.to} value={p.to}>
                {p.label}
              </option>
            ))}
          </select>
          <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg>
        </span>
      </label>
      <label className="block">
        <span className="flex justify-between text-sm text-muted-foreground">
          <span>Your note</span>
          <span className={length > MAX - 50 ? "text-pink" : ""}>{length}/{MAX}</span>
        </span>
        <textarea name="message" required minLength={2} maxLength={MAX} rows={5} onChange={(e) => setLength(e.target.value.length)} className={`mt-1 ${FORM_FIELD}`} />
      </label>
      {/* spam trap: hidden from people, bots fill it in */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-pink" />
        <span>
          Show my name, place and note on this page once it's been read. You can ask me to take it down any time via{" "}
          <Link to="/contact" className="text-gold underline underline-offset-2 hover:text-pink">Contact</Link>. More in the{" "}
          <Link to="/privacy" className="text-gold underline underline-offset-2 hover:text-pink">privacy policy</Link>.
        </span>
      </label>
      <p className="text-xs text-muted-foreground/80">
        House rules: be fabulous and be kind. No links, no private details about real people, nothing you wouldn't say on the show.
      </p>
      <button type="submit" disabled={state.status === "sending"} className="w-full rounded-full bg-pink px-6 py-3 font-semibold text-pink-foreground transition hover:opacity-90 disabled:opacity-60">
        {state.status === "sending" ? "Signing..." : "Sign the guestbook"}
      </button>
      {state.status === "error" && <p className="text-center text-sm text-pink">{state.message}</p>}
    </form>
  );
}
