import { Link } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { EntityLink } from "@/components/entity-link";
import { Timestamp } from "@/components/episode-player";
import { KIND_LABEL, points, type MentorTreeData } from "@/lib/mentor-tree";
import { episodePath, type Episode } from "@/data/episodes";

// Hall of Fame family tree (Lisa, 21 Nov 2026: "the top 10 should get a family tree on their pages", after the Kim effect
// infographic): the mentor at the top, every person they helped under them (lifted / stood by / opened a door, with the
// moment and who tells it), and the people those went on to help underneath, dashed. A tree on its side on phones.
// Light: takes plain data (src/lib/mentor-tree.ts); names link through EntityLink, so the page must know them
// (card pages: recorded in card-view.server.ts; episode pages: full-links).
export function MentorTree({ t, badge, title = "Family tree", foldable = false }: {
  t: MentorTreeData;
  badge?: ReactNode;
  title?: string;
  /** Person and guest pages (Lisa, 21 Nov 2026): the words "Family tree" are a tap-to-open line and the tree itself opens in
   *  a Library-style box underneath. It opens by itself when the page is reached on #mentor-tree (the Hall of Fame badge link). */
  foldable?: boolean;
}) {
  const [open, setOpen] = useState(!foldable);
  useEffect(() => {
    if (!foldable) return;
    const check = () => { if (window.location.hash === "#mentor-tree") setOpen(true); };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, [foldable]);
  const name = t.name.replace(/ \(as heard\)$/, "");
  const summary = (
    <p className="mt-1 text-sm text-muted-foreground">
      <span className="font-semibold text-pink">#{t.rank} in the Hall of Fame</span> · {points(t.score)} points · everyone {name} helped, as the guests tell it, and who they went on to help.
    </p>
  );
  const body = (
    <>
        <div className="mtree-root"><EntityLink name={t.name} className="hover:text-pink" /></div>
        <ol className="mtree-kids" style={{ "--n": Math.min(t.kids.length, 5) } as CSSProperties}>
          {t.kids.map((k) => (
            <li key={k.name} className="mtree-branch">
              <div className="mtree-kid">
                <span className={`mtree-tag mtree-${k.kind}`}>{KIND_LABEL[k.kind]} +{k.points}</span>
                <EntityLink name={k.name.replace(/ \(as heard\)$/, "")} className="mtree-name hover:text-pink" />
                <span className="mtree-line">{k.line}</span>
                <span className="mtree-meta">
                  <Link to={episodePath(k.episode as Episode["id"])} className="hover:text-pink">{k.code}</Link>{" "}
                  <Timestamp episodeId={k.episode} time={k.time} className="text-xs" />
                </span>
                {k.told && <span className="mtree-voice">told by {k.told} · voice +1</span>}
              </div>
              {k.grand.length > 0 && (
                <ul className="mtree-grands">
                  {k.grand.map((g) => (
                    <li key={g.name} className={`mtree-grand ${g.counted ? "" : "mtree-out"}`}>
                      <EntityLink name={g.name.replace(/ \(as heard\)$/, "")} className="mtree-name hover:text-pink" />
                      <span className="mtree-line">{g.line} · {g.code}</span>
                      <span className="mtree-tree">{g.counted ? `family tree +½` : `${KIND_LABEL[g.kind].toLowerCase()}, not counted`}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
        <p className="mtree-sum">
          <span>{points(t.help)} for people helped</span>
          <span>+ {t.voices} {t.voices === 1 ? "voice" : "voices"}</span>
          <span>+ {points(t.tree)} family tree</span>
          <b>= {points(t.score)} points</b>
          <Link to="/hall-of-fame-rules" className="mtree-how">How this is calculated →</Link>
        </p>
    </>
  );
  return (
    <section aria-labelledby="mentor-tree" className="mtree">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b-[3px] border-gold pb-3">
        {badge}
        <div className="min-w-0">
          <h2 id="mentor-tree" className="text-3xl font-bold uppercase text-cream sm:text-4xl">
            {foldable ? (
              <button type="button" aria-expanded={open} aria-controls="mentor-tree-box" onClick={() => setOpen(!open)}
                className={`text-left uppercase hover:text-pink ${open ? "text-pink" : ""}`}>
                {title} <span aria-hidden className="text-2xl">{open ? "▴" : "▾"}</span>
              </button>
            ) : title}
          </h2>
          {summary}
        </div>
      </div>
      {foldable ? (
        open && (
          <div id="mentor-tree-box" className="mt-5 border-2 border-gold bg-card p-5 shadow-[6px_6px_0_var(--color-gold)]">
            <div className="flex justify-end">
              <button type="button" onClick={() => setOpen(false)} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-pink">Close ✕</button>
            </div>
            {body}
          </div>
        )
      ) : body}
    </section>
  );
}
