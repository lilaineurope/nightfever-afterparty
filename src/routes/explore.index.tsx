import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type CSSProperties } from "react";
import { CATEGORIES, categoryMentions, entities, totalMentions, type Entity } from "../data/entities";
import { SiteFooter } from "@/components/site-footer";
import letterpress from "@/assets/explore-letterpress.webp";
import letterpressPhone from "@/assets/explore-letterpress-phone.webp";

export const Route = createFileRoute("/explore/")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/explore", title: "Everything A–Z – every name, club & look from Night Fever", description: "Every person, club, song, book, film and look mentioned around Night Fever - each with its very own card. Dive in!", image: "/og/explore.jpg" }),
  component: ExplorePage,
});

// Everything A–Z as sticker strips (Lisa, 29 Oct 2026, option "Z4"): every name is a flyer sticker, sized in four steps by how
// often it's dropped; each sticker carries its own category (the same categories as the chips - Lisa: "use the old categories"); letters A–Z with a sticky letter bar; the category chips filter as before.
// Names dropped once or less stay behind "+ N more" per letter. Michael Alig never gets the big sizes (Lisa, 28 Oct 2026).
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("");
const letterOf = (name: string) => {
  const c = name.replace(/^['‘’"“(]+/, "").replace(/^the\s+/i, "").charAt(0).toUpperCase();
  return /[A-Z]/.test(c) ? c : "#";
};
const NO_BIG = new Set(["Michael Alig"]);
const sizeOf = (e: Entity, m: number) => (NO_BIG.has(e.name) ? 1 : m >= 60 ? 4 : m >= 20 ? 3 : m >= 6 ? 2 : 1);
const KIND: Record<string, string> = {
  Person: "az-ink", Organisation: "az-ink", Podcast: "az-ink",
  Club: "az-pink", Event: "az-pink",
  Music: "az-yellow", Film: "az-yellow", TV: "az-yellow",
};
const kindOf = (e: Entity) => KIND[e.category] ?? "az-paper";

function ExplorePage() {
  const [cat, setCat] = useState<string>("All");
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const byLetter = useMemo(() => {
    const shown = entities.filter((e) =>
      cat === "All" ? true : cat === "Fashion" ? e.refs.some((r) => r.fashion) : e.category === cat,
    );
    const out = new Map<string, { e: Entity; m: number }[]>();
    for (const e of shown) {
      const l = letterOf(e.name);
      if (!out.has(l)) out.set(l, []);
      out.get(l)!.push({ e, m: totalMentions(e) });
    }
    return out;
  }, [cat]);

  return (
    <main
      className="page-sky min-h-screen bg-background text-foreground"
      style={{ "--sky": `url(${letterpress})`, "--sky-phone": `url(${letterpressPhone})` } as CSSProperties}
    >
      {/* Letterpress header (Lisa, 29 Oct 2026): a Gemini type-case picture in the photocopy halftone, fading after the tagline.
          Made with scripts/page-headers/fade.py. */}
      <section className="page-head px-4 text-center">
        <h1 className="timeline-title">
          <span className="timeline-strip timeline-strip-ink">Everything</span>
          <br />
          <span className="timeline-strip timeline-strip-pink">A–Z</span>
        </h1>
        <p className="timeline-tag">Every name dropped on Night Fever - the bigger, the more it&rsquo;s dropped.</p>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-2">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              className={`az-st az-cat ${c === "All" ? "az-ink" : (KIND[c] ?? "az-paper")}`}
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
            >
              {c === "All" ? "Everything" : c}
              <small>{categoryMentions[c] ?? 0}</small>
            </button>
          ))}
        </div>
      </div>

      <nav className="az-bar" aria-label="Jump to a letter">
        {LETTERS.map((l) =>
          byLetter.has(l) ? (
            <a key={l} href={`#az-${l === "#" ? "num" : l}`}>{l}</a>
          ) : (
            <span key={l} aria-hidden="true">{l}</span>
          ),
        )}
      </nav>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {LETTERS.filter((l) => byLetter.has(l)).map((l) => {
          const all = byLetter.get(l)!;
          const main = all.filter((x) => x.m >= 2 || x.e.guest);
          const rest = all.filter((x) => !(x.m >= 2 || x.e.guest));
          const show = open[l] || main.length === 0 ? all : main;
          return (
            <section key={l} id={`az-${l === "#" ? "num" : l}`} className="az-letter">
              <h2 className="az-big">{l}</h2>
              <div>
                {show.map(({ e, m }) => (
                  <Link
                    key={e.slug}
                    to="/explore/$slug"
                    params={{ slug: e.slug }}
                    className={`az-st az-s${sizeOf(e, m)} ${kindOf(e)}`}
                    title={`${e.guest ? "Night Fever guest" : e.category} · ${m} ${m === 1 ? "mention" : "mentions"}`}
                  >
                    <i>{e.guest ? "Guest" : e.category}</i>
                    {e.name}
                    <small>{m}</small>
                  </Link>
                ))}
                {rest.length > 0 && main.length > 0 && (
                  <button type="button" className="az-more" onClick={() => setOpen((o) => ({ ...o, [l]: !o[l] }))}>
                    {open[l] ? "Show fewer" : `+ ${rest.length} ${rest.length === 1 ? "name" : "names"} dropped once →`}
                  </button>
                )}
              </div>
            </section>
          );
        })}
      </div>
      <SiteFooter />
    </main>
  );
}
