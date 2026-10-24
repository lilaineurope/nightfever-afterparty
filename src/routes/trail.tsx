import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { Timestamp } from "@/components/episode-player";
import { episodePortraits } from "@/components/episode-block";
import { episodes, episodePath, type Episode } from "@/data/episodes";
import { entityFor } from "@/data/entities";
import { GUEST_LINES } from "@/data/guest-lines";

// Follow the Names - a playable first draft of the discovery-journey game (Lisa, 24 Oct 2026).
// You start with James St. James; a guest's door only opens once someone in an episode you've opened drops their name.
// Unlinked for now: not in the menu, search or sitemap, and noindex. See UNLINKED_PAGES in src/lib/pages.ts.
export const Route = createFileRoute("/trail")({
  staticData: { sitemap: false }, // unlinked for now (Lisa, 24 Oct 2026) - see UNLINKED_PAGES in src/lib/pages.ts
  component: TrailPage,
  head: () =>
    pageHead({
      path: "/trail",
      title: "Follow the Names – a Night Fever discovery game | Night Fever fan page",
      description: "Start with James St. James and follow the names the guests drop, one episode at a time. Collect every guest's polaroid.",
      image: "/og/home.jpg",
      noindex: true,
    }),
});

const START = "s06e01";
const STORE = "nf-trail-v1";
const short = (id: string) => `S${Number(id.slice(1, 3))} E${Number(id.slice(4, 6))}`;

type Drop = { to: Episode; time: string; context: string };

// Every name-drop of an Afterparty guest inside another Afterparty episode.
function useDrops() {
  return useMemo(() => {
    const drops: Record<string, Drop[]> = {};
    for (const e of episodes) drops[e.id] = [];
    for (const g of episodes) {
      const names = [g.guest, ...g.guest.split(" & ")];
      const refs = names.flatMap((n) => entityFor(n)?.refs ?? []);
      const seen = new Set<string>();
      for (const r of refs) {
        if (!r.episode || r.episode === g.id || seen.has(r.episode) || !drops[r.episode]) continue;
        seen.add(r.episode);
        drops[r.episode]!.push({ to: g, time: r.time, context: r.context });
      }
    }
    for (const id in drops) drops[id]!.sort((a, b) => a.time.localeCompare(b.time));
    return drops;
  }, []);
}

// Lisa's own route: the order she published the Afterparties, and the episode where she found each name.
function useLisa(drops: Record<string, Drop[]>) {
  return useMemo(() => {
    const ordered = [...episodes].sort((a, b) => a.afterpartyPublished.localeCompare(b.afterpartyPublished));
    const foundIn: Record<string, string> = {};
    ordered.forEach((g, i) => {
      const by = ordered.slice(0, i).find((p) => drops[p.id]?.some((d) => d.to.id === g.id));
      if (by) foundIn[g.id] = by.id;
    });
    return { order: ordered.map((e) => e.id), foundIn };
  }, [drops]);
}

type Saved = { found: string[]; wildcards: number };
const fresh = (): Saved => ({ found: [START], wildcards: 1 });

function load(): Saved {
  try {
    const s = JSON.parse(localStorage.getItem(STORE) ?? "null") as Saved | null;
    if (s && Array.isArray(s.found) && s.found.includes(START)) return s;
  } catch {
    /* storage unavailable - start fresh */
  }
  return fresh();
}

function TrailPage() {
  const drops = useDrops();
  const lisa = useLisa(drops);
  const byId = useMemo(() => Object.fromEntries(episodes.map((e) => [e.id, e])), []);
  const [state, setState] = useState<Saved>(fresh);
  const [at, setAt] = useState(START);
  const [showLisa, setShowLisa] = useState(false);
  const [wild, setWild] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = load();
    setState(s);
    setAt(s.found[s.found.length - 1] ?? START);
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return; // don't overwrite saved progress before it has been read
    try {
      localStorage.setItem(STORE, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, ready]);

  const found = new Set(state.found);
  const total = episodes.length;
  const current = byId[at]!;
  const doors = drops[at] ?? [];
  // Every guest whose name has been dropped in an episode you've opened, still waiting behind a door.
  const waiting = new Set(state.found.flatMap((id) => (drops[id] ?? []).map((d) => d.to.id)).filter((id) => !found.has(id)));
  const lost = episodes.filter((e) => !found.has(e.id) && !waiting.has(e.id));

  const open = (id: string, viaWildcard = false) => {
    if (found.has(id)) return setAt(id);
    setState((s) => ({ found: [...s.found, id], wildcards: s.wildcards - (viaWildcard ? 1 : 0) + (Math.floor((s.found.length + 1) / 5) > Math.floor(s.found.length / 5) ? 1 : 0) }));
    setAt(id);
    setWild(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const reset = () => {
    setState(fresh());
    setAt(START);
    setWild(false);
  };
  const playLisa = () => {
    setState({ found: lisa.order, wildcards: 0 });
    setAt(lisa.order[lisa.order.length - 1]!);
    setShowLisa(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-10 pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <Link to="/games" className="text-xs font-medium uppercase tracking-[0.2em] text-gold transition hover:text-pink">
            &larr; Game ideas
          </Link>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Follow the <span className="text-pink text-glow-pink">Names</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Start with James St. James. Every guest he name-drops becomes a door. Open one, listen to who <em>they</em> drop, and keep
            going until you've found all {total} guests.
          </p>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            {state.found.length} of {total} guests found · {state.wildcards} wildcard{state.wildcards === 1 ? "" : "s"}
          </p>
        </div>
      </section>

      {/* Passport: the polaroids in the order you found them */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Your Polaroid Passport</h2>
          <ol className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {state.found.map((id, i) => (
              <li key={id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setAt(id)}
                  title={`${i + 1}. ${byId[id]?.guest}`}
                  className={`relative block rounded-sm bg-cream p-1 pb-4 shadow transition hover:-translate-y-0.5 ${id === at ? "ring-2 ring-pink" : ""}`}
                >
                  <img src={episodePortraits[id]} alt={byId[id]?.guest ?? ""} className="h-16 w-16 object-cover" />
                  <span className="absolute bottom-0.5 left-0 right-0 text-center text-[10px] font-semibold text-background">{i + 1}</span>
                </button>
              </li>
            ))}
            {Array.from({ length: total - state.found.length }, (_, i) => (
              <li key={`empty-${i}`} className="h-[5.25rem] w-[4.5rem] shrink-0 rounded-sm border border-dashed border-border" />
            ))}
          </ol>
        </div>
      </section>

      {/* The episode you're in */}
      <section className="px-6 pb-10">
        <div className="mx-auto grid max-w-5xl gap-6 rounded-2xl border border-gold/40 bg-card p-6 md:grid-cols-[220px_1fr]">
          <div>
            <img src={episodePortraits[at]} alt={current.guest} className="w-full rounded-sm bg-cream p-2 pb-8 shadow" />
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gold">You're in {short(at)}</p>
            <h2 className="mt-1 text-2xl font-bold text-cream">{current.guest}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{GUEST_LINES[at]}</p>
            <Link to={episodePath(at as Episode["id"])} className="mt-3 inline-block text-sm text-pink underline underline-offset-2">
              Open the Afterparty &rarr;
            </Link>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
              Names dropped in this episode ({doors.length})
            </h3>
            {doors.length === 0 && <p className="mt-3 text-sm text-muted-foreground">No other Afterparty guests are named here - try another polaroid in your passport.</p>}
            <ul className="mt-3 grid gap-3">
              {doors.map((d) => {
                const isFound = found.has(d.to.id);
                const lisaWent = showLisa && lisa.foundIn[d.to.id] === at;
                return (
                  <li key={d.to.id} className={`flex items-start gap-3 rounded-xl border p-3 ${isFound ? "border-border bg-background/40" : "border-pink/50"}`}>
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-muted">
                      {isFound ? (
                        <img src={episodePortraits[d.to.id]} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-2xl text-muted-foreground">?</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 text-sm leading-relaxed">
                      <p>
                        <span className="font-semibold text-cream">{d.to.guest}</span>{" "}
                        <Timestamp episodeId={at} time={d.time} className="text-xs" />
                        {lisaWent && <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[11px] font-semibold text-gold">Lisa went here next</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">{d.context}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => open(d.to.id)}
                      className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider ${isFound ? "border border-border text-muted-foreground hover:text-cream" : "bg-pink text-pink-foreground hover:opacity-90"}`}
                    >
                      {isFound ? "Visit" : "Open door"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Stuck: doors waiting elsewhere, or a wildcard */}
      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Doors still waiting ({waiting.size})</h2>
            <p className="mt-2 text-sm text-muted-foreground">Names already dropped somewhere on your trail. Go back to the episode that named them.</p>
            <ul className="mt-3 space-y-1 text-sm">
              {[...waiting].map((id) => {
                const where = state.found.find((f) => drops[f]?.some((d) => d.to.id === id))!;
                return (
                  <li key={id}>
                    <button type="button" onClick={() => setAt(where)} className="text-left hover:text-pink">
                      <span className="text-cream">?</span> named in <span className="text-cream">{byId[where]?.guest}</span>'s episode
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Wildcard</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Nobody has dropped the name? Jump straight to a guest - like Lisa did with Chi Chi Valenti & Johnny Dynell. You get one to
              start and another for every five guests you find.
            </p>
            {state.wildcards > 0 && lost.length > 0 ? (
              wild ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {lost.map((e) => (
                    <li key={e.id}>
                      <button type="button" onClick={() => open(e.id, true)} className="rounded-full border border-gold/60 px-3 py-1 text-xs text-gold hover:bg-gold/10">
                        {short(e.id)} · {e.guest}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <button type="button" onClick={() => setWild(true)} className="mt-3 rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-background">
                  Use a wildcard ({lost.length} guests nobody has named yet)
                </button>
              )
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">{lost.length === 0 ? "Every guest left can be reached by a name-drop." : "No wildcards left - keep following names."}</p>
            )}
          </div>
        </div>

        {state.found.length === total && (
          <div className="mx-auto mt-6 max-w-5xl rounded-2xl bg-pink p-6 text-center text-pink-foreground">
            <p className="text-2xl font-bold">All {total} guests found! Welcome to the Afterparty.</p>
          </div>
        )}

        <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-3 text-sm">
          <button type="button" onClick={() => setShowLisa((v) => !v)} className="rounded-full border border-gold/60 px-4 py-2 text-gold hover:bg-gold/10">
            {showLisa ? "Hide" : "Show"} Lisa's trail
          </button>
          <button type="button" onClick={playLisa} className="rounded-full border border-border px-4 py-2 hover:text-pink">
            Jump to the end of Lisa's trail
          </button>
          <button type="button" onClick={reset} className="rounded-full border border-border px-4 py-2 hover:text-pink">
            Start again
          </button>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
