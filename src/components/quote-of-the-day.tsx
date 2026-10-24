import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { episodePortraits } from "@/components/episode-block";
import { episodes, episodePath } from "@/data/episodes";
import allQuotes from "@/data/quotes-all.json";

// Quote of the day (Lisa, 24 Oct 2026): a random quote from the quotes spreadsheet (5 per guest, "Night Fever Afterparty
// quotes.xlsx"), a new one every day, under the intro on Home - with the guest, a play button for the exact moment and a
// link to the episode. Same quote for everyone all day (Stockholm time). The days walk through a shuffled order of every
// quote, so nothing repeats until all have been shown. New episodes join automatically: add their 5 quotes to
// src/data/quotes-all.json when they go into the spreadsheet (see AGENTS.md).
type Q = { episode: string; time: string; quote: string; who?: string };

// Small seeded random number generator, so every visitor gets the same shuffle.
function rng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function todaysQuote(pool: Q[]): Q {
  const day = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Stockholm" }); // YYYY-MM-DD
  const days = Math.floor(Date.parse(`${day}T00:00:00Z`) / 86_400_000);
  const round = Math.floor(days / pool.length);
  const order = pool.map((_, i) => i);
  const rand = rng(round * 7919 + pool.length);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j]!, order[i]!];
  }
  return pool[order[days % pool.length]!]!;
}

export function QuoteOfTheDay() {
  // Only guests whose Afterparty is on the site.
  const pool = (allQuotes as Q[]).filter((q) => episodes.some((e) => e.id === q.episode));
  if (!pool.length) return null;
  const q = todaysQuote(pool);
  const ep = episodes.find((e) => e.id === q.episode)!;
  const photo = episodePortraits[ep.id];
  return (
    <figure className="mt-10 flex max-w-[1000px] items-center gap-5 sm:gap-7">
      {photo && (
        <Link to={episodePath(ep.id)} className="shrink-0 rotate-2 bg-cream p-1.5 pb-5 shadow-md transition hover:rotate-0" aria-label={`${ep.guest}'s Afterparty`}>
          <img src={photo} alt="" className="h-20 w-20 object-cover sm:h-24 sm:w-24" />
        </Link>
      )}
      <div className="min-w-0">
        <p className="font-type text-xs uppercase tracking-[0.25em] text-[#141414]/70">Quote of the day</p>
        <blockquote
          className="mt-1 -rotate-1"
          style={{ color: "#E2287F", fontFamily: "'Covered By Your Grace', cursive", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.2 }}
        >
          &ldquo;{q.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-type text-sm text-[#141414]">
          <span>- {q.who ?? ep.guest}</span>
          <Timestamp episodeId={ep.id} time={q.time} />
          <Link to={episodePath(ep.id)} className="text-gold underline-offset-2 hover:underline">
            S{ep.season} E{ep.episode} Afterparty &rarr;
          </Link>
        </figcaption>
      </div>
    </figure>
  );
}
