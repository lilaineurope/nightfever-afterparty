import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminListGuestbook, changeGuestbookKey, moderateGuestbook, type ModeratedNote } from "@/lib/guestbook.functions";
import { adminListSuggestions, moderateSuggestion, type PendingSuggestion } from "@/lib/suggestions.functions";
import { showEpisode, episodeLabel } from "@/lib/guestbook-episodes";
import { guestbookPage } from "@/lib/pages";
import { FORM_FIELD } from "@/lib/styles";

// Lisa's moderation page. No accounts: she types her secret moderation key (it can be remembered on her own device),
// and every request carries it to the server, which checks it against a salted hash.
export const Route = createFileRoute("/guestbook/admin")({
  staticData: { sitemap: false },
  component: AdminPage,
  head: () =>
    pageHead({ path: "/guestbook/admin", title: "Guestbook moderation | Night Fever fan page", description: "Moderation for the Night Fever fan page guestbook.", noindex: true }),
});

const STORE = "nf-guestbook-key";
const BTN = "rounded-full px-4 py-1.5 text-sm font-semibold transition disabled:opacity-50";
type Tab = "pending" | "approved" | "hidden";
type Action = "approve" | "hide" | "pending" | "delete" | "reply";

const readKey = () => {
  try {
    return localStorage.getItem(STORE) ?? "";
  } catch {
    return "";
  }
};
const saveKey = (k: string | null) => {
  try {
    if (k) localStorage.setItem(STORE, k);
    else localStorage.removeItem(STORE);
  } catch {
    /* private mode - the key just isn't remembered */
  }
};

function AdminPage() {
  const [key, setKey] = useState<string | null>(null);
  useEffect(() => setKey(readKey()), []);
  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-24 text-foreground">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Guestbook &amp; interview suggestions</p>
        <h1 className="mt-3 text-4xl font-bold text-cream">Moderation</h1>
        {key === null ? (
          <p className="mt-8 text-muted-foreground">Loading...</p>
        ) : key ? (
          <Moderation keyValue={key} onForget={() => { saveKey(null); setKey(""); }} onChanged={(k) => { if (readKey()) saveKey(k); setKey(k); }} />
        ) : (
          <KeyForm onKey={(k, remember) => { if (remember) saveKey(k); setKey(k); }} />
        )}
        <p className="mt-12 text-sm">
          <Link to="/guestbook" className="text-gold underline underline-offset-2 hover:text-pink">← Back to the guestbook</Link>
        </p>
      </div>
    </main>
  );
}

function KeyForm({ onKey, error }: { onKey: (key: string, remember: boolean) => void; error?: string }) {
  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    onKey(String(f.get("key") ?? "").trim(), f.get("remember") === "on");
  }
  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-md space-y-4 rounded-2xl border border-gold/25 bg-card p-6">
      <label className="block">
        <span className="text-sm text-muted-foreground">Moderation key</span>
        <input name="key" type="password" required minLength={16} autoComplete="current-password" className={`mt-1 ${FORM_FIELD}`} />
      </label>
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <input type="checkbox" name="remember" defaultChecked className="h-4 w-4 accent-pink" />
        Remember it on this device
      </label>
      <button type="submit" className={`${BTN} w-full bg-pink py-2.5 text-pink-foreground hover:opacity-90`}>
        Open moderation
      </button>
      {error && <p className="text-sm text-pink">{error}</p>}
    </form>
  );
}

function Moderation({ keyValue, onForget, onChanged }: { keyValue: string; onForget: () => void; onChanged: (k: string) => void }) {
  const list = useServerFn(adminListGuestbook);
  const moderate = useServerFn(moderateGuestbook);
  const [notes, setNotes] = useState<ModeratedNote[] | null>(null);
  const [tab, setTab] = useState<Tab>("pending");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [failed, setFailed] = useState("");

  const load = useCallback(async () => {
    try {
      setNotes(await list({ data: { key: keyValue } }));
      setFailed("");
    } catch (e) {
      setFailed(e instanceof Error ? e.message : "Could not open the queue.");
    }
  }, [list, keyValue]);
  useEffect(() => {
    void load();
  }, [load]);

  async function act(id: string, action: Action, reply?: string) {
    setBusy(id + action);
    setError("");
    try {
      await moderate({ data: { key: keyValue, id, action, reply } });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "That didn't work.");
    } finally {
      setBusy(null);
    }
  }

  if (failed)
    return (
      <div className="mt-8 space-y-3">
        <p className="text-pink">{failed}</p>
        <button type="button" onClick={onForget} className={`${BTN} border border-border text-cream hover:border-gold`}>
          Try another key
        </button>
      </div>
    );
  if (!notes) return <p className="mt-8 text-muted-foreground">Loading notes...</p>;

  const counts = { pending: 0, approved: 0, hidden: 0 } as Record<Tab, number>;
  notes.forEach((n) => counts[n.status]++);
  const shown = notes.filter((n) => n.status === tab);

  return (
    <div className="mt-8">
      <Suggestions keyValue={keyValue} />
      <h2 className="mb-4 mt-12 text-xs font-semibold uppercase tracking-[0.2em] text-pink">Guestbook notes</h2>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="tablist">
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
        <button type="button" onClick={onForget} className="text-sm text-muted-foreground underline underline-offset-2 hover:text-pink">
          Forget the key on this device
        </button>
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
      <ChangeKey keyValue={keyValue} onChanged={onChanged} />
    </div>
  );
}

function ChangeKey({ keyValue, onChanged }: { keyValue: string; onChanged: (k: string) => void }) {
  const change = useServerFn(changeGuestbookKey);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const a = String(f.get("new") ?? "").trim();
    if (a !== String(f.get("again") ?? "").trim()) return setMsg("The two keys don't match.");
    try {
      await change({ data: { key: keyValue, newKey: a } });
      setMsg("Done - use the new key from now on.");
      onChanged(a);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "That didn't work.");
    }
  }
  return (
    <div className="mt-12 border-t border-border pt-6">
      {!open ? (
        <button type="button" onClick={() => setOpen(true)} className="text-sm text-muted-foreground underline underline-offset-2 hover:text-pink">
          Change the moderation key
        </button>
      ) : (
        <form onSubmit={onSubmit} className="max-w-md space-y-3">
          <input name="new" type="password" required minLength={16} autoComplete="new-password" placeholder="New key (16+ characters)" className={FORM_FIELD} />
          <input name="again" type="password" required minLength={16} autoComplete="new-password" placeholder="New key again" className={FORM_FIELD} />
          <button type="submit" className={`${BTN} border border-gold text-gold hover:bg-gold/10`}>Save new key</button>
          {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
        </form>
      )}
    </div>
  );
}

function AdminNote({ note, busy, act }: { note: ModeratedNote; busy: string | null; act: (id: string, action: Action, reply?: string) => Promise<void> }) {
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
        {guestbookPage(note.page) && <span className="block text-xs text-muted-foreground">Favourite page: {guestbookPage(note.page)!.label}</span>}
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
          <textarea value={reply} onChange={(e) => setReply(e.target.value)} maxLength={600} rows={2} className={`mt-1 ${FORM_FIELD}`} />
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

/** "Who to interview next" suggestions (Lisa, 27 Oct 2026). The email link opens this page with ?suggestion=<id>:
 *  that one is shown first, highlighted. Approve = on the home page straight away; Don't approve = deleted for good. */
function Suggestions({ keyValue }: { keyValue: string }) {
  const list = useServerFn(adminListSuggestions);
  const moderate = useServerFn(moderateSuggestion);
  const [rows, setRows] = useState<PendingSuggestion[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const [focus, setFocus] = useState<string | null>(null);
  useEffect(() => {
    try {
      setFocus(new URLSearchParams(window.location.search).get("suggestion"));
    } catch {
      /* no query string */
    }
  }, []);
  const load = useCallback(async () => {
    try {
      setRows(await list({ data: { key: keyValue } }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load the suggestions.");
    }
  }, [list, keyValue]);
  useEffect(() => {
    void load();
  }, [load]);

  async function act(row: PendingSuggestion, action: "approve" | "reject") {
    setBusy(row.id + action);
    setError("");
    try {
      await moderate({ data: { key: keyValue, id: row.id, action } });
      setDone(
        action === "approve"
          ? `${row.who} is on the home page now.`
          : row.status === "approved"
            ? `${row.who} is off the home page and deleted.`
            : `${row.who} was not approved and has been deleted.`,
      );
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "That didn't work.");
    } finally {
      setBusy(null);
    }
  }

  if (!rows) return <p className="text-muted-foreground">{error || "Loading suggestions..."}</p>;
  const pending = rows.filter((r) => r.status === "pending").sort((a, b) => Number(b.id === focus) - Number(a.id === focus));
  const approved = rows.filter((r) => r.status === "approved");
  const asked = focus && !rows.some((r) => r.id === focus);

  return (
    <section aria-labelledby="sugg-h">
      <h2 id="sugg-h" className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Who to interview next - suggestions</h2>
      {done && <p className="mt-4 border-2 border-pink p-3 text-sm font-semibold text-pink">{done}</p>}
      {asked && !done && <p className="mt-4 text-sm text-muted-foreground">That suggestion has already been handled.</p>}
      {error && <p className="mt-4 text-sm text-pink">{error}</p>}
      {pending.length === 0 ? (
        <p className="mt-4 text-muted-foreground">No suggestions waiting.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {pending.map((r) => (
            <li key={r.id} className={`rounded-2xl border bg-card p-5 ${r.id === focus ? "border-pink shadow-[0_0_0_2px_var(--color-pink)]" : "border-gold/25"}`}>
              <p className="text-xl font-bold text-cream">{r.who}</p>
              {r.why && <p className="mt-1 text-cream/90">&ldquo;{r.why}&rdquo;</p>}
              <p className="mt-2 text-sm text-muted-foreground">
                From {r.from_name || "(no name given)"} · {new Date(r.created_at).toLocaleString("en-GB")} · the name is never shown on the site
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" disabled={!!busy} onClick={() => act(r, "approve")} className={`${BTN} bg-pink px-6 py-2.5 text-pink-foreground hover:opacity-90`}>
                  {busy === r.id + "approve" ? "..." : "Approve"}
                </button>
                <button type="button" disabled={!!busy} onClick={() => act(r, "reject")} className={`${BTN} border border-border px-6 py-2.5 text-cream hover:border-gold`}>
                  {busy === r.id + "reject" ? "..." : "Don't approve"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {approved.length > 0 && (
        <details className="mt-6">
          <summary className="cursor-pointer text-sm text-muted-foreground hover:text-pink">On the home page ({approved.length})</summary>
          <ul className="mt-3 space-y-2">
            {approved.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-cream">{r.who}</span>
                {r.why && <span className="text-muted-foreground">&ldquo;{r.why}&rdquo;</span>}
                <button type="button" disabled={!!busy} onClick={() => act(r, "reject")} className="text-xs text-muted-foreground underline underline-offset-2 hover:text-pink">
                  {busy === r.id + "reject" ? "..." : "Take it off"}
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
