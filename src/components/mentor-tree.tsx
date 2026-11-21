import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { EntityLink } from "@/components/entity-link";
import { Timestamp } from "@/components/episode-player";
import { KIND_LABEL, points, type MentorTreeData } from "@/lib/mentor-tree";
import { episodePath, type Episode } from "@/data/episodes";

// Hall of Fame family tree (Lisa, 21 Nov 2026: "the top 10 should get a family tree on their pages", after the Kim effect
// infographic): the mentor at the top, every person they helped under them (lifted / stood by / opened a door, with the
// moment and who tells it), and the people those went on to help underneath, dashed. A tree on its side on phones.
// Light: takes plain data (src/lib/mentor-tree.ts); names link through EntityLink, so the page must know them
// (card pages: recorded in card-view.server.ts; episode pages: full-links).
export function MentorTree({ t, badge, title = "Family tree" }: { t: MentorTreeData; badge?: ReactNode; title?: string }) {
  return (
    <section aria-labelledby="mentor-tree" className="mtree">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b-[3px] border-gold pb-3">
        {badge}
        <div className="min-w-0">
          <h2 id="mentor-tree" className="text-3xl font-bold uppercase text-cream sm:text-4xl">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="font-semibold text-pink">#{t.rank} in the Hall of Fame</span> · {points(t.score)} points · everyone {t.name.replace(/ \(as heard\)$/, "")} helped, as the guests tell it, and who they went on to help.
          </p>
        </div>
      </div>
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
    </section>
  );
}
