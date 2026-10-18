import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { adminListGuestbook, moderateGuestbook, type ModeratedNote } from "@/lib/guestbook.functions";
import { showEpisode, episodeLabel } from "@/lib/guestbook-episodes";

// Lisa's moderation page: sign in with an emailed link (no password), then approve, hide, delete or reply.
// Only accounts listed in the guestbook_admins table can see or change notes.
export const Route = createFileRoute("/guestbook/admin")({
  staticData: { sitemap: false },
  component: AdminPage,
  head: () =>
    pageHead({ path: "/guestbook/admin", title: "Guestbook moderation | Night Fever fan page", description: "Moderation for the Night Fever fan page guestbook.", noindex: true }),
});

const FIELD =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-cream placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none";
const BTN = "rounded-full px-4 py-1.5 text-sm font-semibold transition disabled:opacity-50";
type Tab = "pending" | "approved" | "hidden";

function AdminPage() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-24 text-foreground">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Guestbook</p>
        <h1 className="mt-3 text-4xl font-bold text-cream">Moderation</h1>
        {session === undefined ? (
          <p className="mt-8 text-muted-foreground">Loading...</p>
        ) : session ? (
          <Moderation email={session.user.email ?? ""} />
        ) : (
          <SignIn />
        )}
        <p className="mt-12 text-sm">
          <Link to="/guestbook" className="text-gold underline underline-offset-2 hover:text-pink">← Back to the guestbook</Link>
        </p>
      </div>
    </main>
  );
}

function SignIn() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const email = String(new FormData(ev.currentTarget).get("email") ?? "").trim();
    setState("sending");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/guestbook/admin` },
    });
    if (error) {
      setError(error.message);
      setState("error");
    } else setState("sent");
  }
  if (state === "sent")
    return <p className="mt-8 rounded-2xl border border-gold/25 bg-card p-6 text-cream">Check your inbox - the sign-in link brings you straight back here.</p>;
  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-md space-y-4 rounded-2xl border border-gold/25 bg-card p-6">
      <label className="block">
        <span className="text-sm text-muted-foreground">Your email</span>
        <input name="email" type="email" required autoComplete="email" className={`mt-1 ${FIELD}`} />
      </label>
      <button type="submit" disabled={state === "sending"} className={`${BTN} w-full bg-pink py-2.5 text-pink-foreground hover:opacity-90`}>
        {state === "sending" ? "Sending..." : "Email me a sign-in link"}
      </button>
      {state === "error" && <p className="text-sm text-pink">{error}</p>}
    </form>
  );
}

function Moderation({ email }: { email: string }) {
  const list = useServerFn(adminListGuestbook);
  const moderate = useServerFn(moderateGuestbook);
  const [data, setData] = useState<{ admin: boolean; notes: ModeratedNote[] } | null>(null);
  const [tab, setTab] = useState<Tab>("pending");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setData(await list());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load the notes.");
    }
  }, [list]);
  useEffect(() => {
    void load();
  }, [load]);

  async function act(id: string, action: "approve" | "hide" | "pending" | "delete" | "reply", reply?: string) {
    setBusy(id + action);
    setError("");
    try {
      await moderate({ data: { id, action, reply } });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "That didn't work.");
    } finally {
      setBusy(null);
    }
  }

  const signOut = (
    <button type="button" onClick={() => supabase.auth.signOut()} className="text-sm text-muted-foreground underline underline-offset-2 hover:text-pink">
      Sign out
    </button>
  );

  if (!data) return <p className="mt-8 text-muted-foreground">{error || "Loading notes..."}</p>;
  if (!data.admin)
    return (
      <div className="mt-8 space-y-3 rounded-2xl border border-gold/25 bg-card p-6">
        <p className="text-cream">You're signed in as {email}, but this account isn't a guestbook moderator.</p>
        {signOut}
      </div>
    );

  const counts = { pending: 0, approved: 0, hidden: 0 } as Record<Tab, number>;
  data.notes.forEach((n) => counts[n.status]++);
  const shown = data.notes.filter((n) => n.status === tab);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2" role="tablist">
          {(["pending", "approved", "hidden"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`${BTN} border ${tab === t ? "border-pink bg-pink text-pink-foreground" : "border-border text-cream hover:border-gold"}`}
            >
              {t === "pending" ? "Waiting" : t === "approved" ? "On the page" : "Hidden"} ({counts[t]})
            </button>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {email} · {signOut}
        </span>
      </div>
      {error && <p className="mt-4 text-sm text-pink">{error}</p>}
      {shown.length === 0 ? (
        <p className="mt-8 text-muted-foreground">Nothing here.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {shown.map((n) => (
            <AdminNote key={n.id} note={n} busy={busy} act={act} />
          ))}
        </ul>
      )}
    </div>
  );
}

function AdminNote({
  note,
  busy,
  act,
}: {
  note: ModeratedNote;
  busy: string | null;
  act: (id: string, action: "approve" | "hide" | "pending" | "delete" | "reply", reply?: string) => Promise<void>;
}) {
  const [reply, setReply] = useState(note.reply ?? "");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const ep = showEpisode(note.episode);
  const is = (a: string) => busy === note.id + a;
  return (
    <li className="rounded-2xl border border-gold/25 bg-card p-5">
      <p className="whitespace-pre-line text-cream">{note.message}</p>
      <p className="mt-3 text-sm">
        <span className="font-semibold text-gold">{note.name}</span>
        {note.place && <span className="text-muted-foreground"> · {note.place}</span>}
        <span className="text-muted-foreground"> · {new Date(note.created_at).toLocaleString("en-GB")}</span>
        {ep && <span className="block text-xs text-muted-foreground">Favourite: {episodeLabel(ep)}</span>}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {note.status !== "approved" && (
          <button type="button" disabled={!!busy} onClick={() => act(note.id, "approve")} className={`${BTN} bg-pink text-pink-foreground hover:opacity-90`}>
            {is("approve") ? "..." : "Approve"}
          </button>
        )}
        {note.status !== "hidden" && (
          <button type="button" disabled={!!busy} onClick={() => act(note.id, "hide")} className={`${BTN} border border-border text-cream hover:border-gold`}>
            {is("hide") ? "..." : "Hide"}
          </button>
        )}
        {confirmDelete ? (
          <>
            <button type="button" disabled={!!busy} onClick={() => act(note.id, "delete")} className={`${BTN} border border-pink text-pink`}>
              {is("delete") ? "..." : "Yes, delete for good"}
            </button>
            <button type="button" onClick={() => setConfirmDelete(false)} className={`${BTN} text-muted-foreground`}>
              Keep it
            </button>
          </>
        ) : (
          <button type="button" disabled={!!busy} onClick={() => setConfirmDelete(true)} className={`${BTN} text-muted-foreground hover:text-pink`}>
            Delete
          </button>
        )}
      </div>
      <div className="mt-4">
        <label className="block">
          <span className="text-xs text-muted-foreground">Your reply (shown under the note, optional)</span>
          <textarea value={reply} onChange={(e) => setReply(e.target.value)} maxLength={600} rows={2} className={`mt-1 ${FIELD}`} />
        </label>
        {reply !== (note.reply ?? "") && (
          <button type="button" disabled={!!busy} onClick={() => act(note.id, "reply", reply)} className={`${BTN} mt-2 border border-gold text-gold hover:bg-gold/10`}>
            {is("reply") ? "Saving..." : "Save reply"}
          </button>
        )}
      </div>
    </li>
  );
}
