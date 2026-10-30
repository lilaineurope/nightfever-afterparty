import { Link } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import { EntityBox, plainClick } from "@/components/moments-box";
import { entityBySlug } from "@/data/entities";
import { CLUB_NIGHTS, playlistUrl } from "@/data/club-nights";
import { clubsMentioned } from "@/data/collections";
import { LOCATIONS } from "@/data/locations";

// Inside the Clubs (Lisa, 30 Oct 2026, was Clubkid Culture): a wall of club flyers as the header, then every club ever mentioned on
// Night Fever street by street (New York neighbourhood by neighbourhood, then London, Paris, Los Angeles and the rest), then the
// three club nights as tickets that open in the Jukebox. Each club is a sticker sized by its mentions; a tap opens its moments right under the block
// (cmd/ctrl-click opens the A–Z card). Areas come from src/data/locations.ts - a club without coordinates lands in "Address unknown".

type Club = (typeof clubsMentioned)[number];
const NIGHTS = new Set(CLUB_NIGHTS.map((c) => c.slug));
const size = (m: number) => (m >= 60 ? 4 : m >= 20 ? 3 : m >= 6 ? 2 : 1);

// Small neighbourhoods folded into their neighbours so each block has a few clubs.
const NYC: Record<string, string> = {
  "East Village": "East Village", "Alphabet City": "East Village",
  Flatiron: "Flatiron", "Union Square": "Union Square",
  Meatpacking: "Meatpacking", "Meatpacking District": "Meatpacking",
  Chelsea: "Chelsea", "Hudson Yards": "Hell's Kitchen", "Hell's Kitchen": "Hell's Kitchen",
  "Times Square": "Times Square", Midtown: "Midtown", "Midtown East": "Midtown", "Sutton Place": "Midtown",
  Tribeca: "Tribeca & Hudson Square", "Hudson Square": "Tribeca & Hudson Square",
  SoHo: "SoHo", Bowery: "Bowery & NoHo", NoHo: "Bowery & NoHo",
  "West Village": "The Village", "Greenwich Village": "The Village",
  "Upper East Side": "Uptown", "Upper West Side": "Uptown", "Bay Ridge": "Brooklyn",
};
const LA = new Set(["Sunset Strip", "Beverly Hills", "West Hollywood"]);
const areaOf = new Map(LOCATIONS.map((l) => [l.name, l.area]));

type Block = { city: string; area: string; clubs: Club[]; weight: number };
export const clubBlocks: Block[] = (() => {
  const m = new Map<string, Block>();
  for (const c of clubsMentioned) {
    const raw = areaOf.get(c.name);
    const [city, area] = !raw
      ? ["Somewhere in the night", "Address unknown"]
      : NYC[raw]
        ? ["New York", NYC[raw]!]
        : LA.has(raw)
          ? ["Los Angeles", "Los Angeles"]
          : raw === "London" || raw === "Paris"
            ? [raw, raw]
            : ["Elsewhere", "Elsewhere"];
    const k = `${city}|${area}`;
    if (!m.has(k)) m.set(k, { city, area, clubs: [], weight: 0 });
    const b = m.get(k)!;
    b.clubs.push(c);
    b.weight += c.mentions;
  }
  const order = ["New York", "London", "Paris", "Los Angeles", "Elsewhere", "Somewhere in the night"];
  return [...m.values()].sort((a, b) => order.indexOf(a.city) - order.indexOf(b.city) || b.weight - a.weight);
})();

/** The flyer wall behind the Inside the Clubs title: every club's name pasted up, biggest first, mixed by a fixed shuffle. */
export function ClubWall() {
  const names = [...clubsMentioned]
    .map((c, i) => ({ c, k: (i * 7919) % 157 }))
    .sort((a, b) => a.k - b.k)
    .map((x) => x.c);
  const tone = ["cc-ink", "cc-pink", "cc-paper", "cc-ink", "cc-paper", "cc-pink", "cc-yellow"];
  return (
    <div className="cc-wall" aria-hidden="true">
      <div className="cc-wall-in">
        {[...names, ...names].map((c, i) => (
          <span key={i} className={`cc-fl cc-f${size(c.mentions)} ${tone[i % tone.length]}`} style={{ transform: `rotate(${((i * 37) % 9) - 4}deg)` }}>
            {c.name.replace(/ \((?:as heard|unclear|club|nightclub)\)$/, "")}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ClubsShelf() {
  const [open, setOpen] = useState<string | null>(null);
  let lastCity = "";
  return (
    <div className="cc-body">
      <h2 className="cc-h2">Every club, street by street <small>{clubsMentioned.length} clubs</small></h2>
      <p className="cc-sub">
        Every club ever mentioned in the Afterparties, where it stood. The bigger the sticker, the more it&rsquo;s dropped. Tap a club to
        step inside: every moment it comes up on the show, timestamped, with its own card. ♫ means you can hear a whole night there on the
        Jukebox.{" "}
        <Link to="/jukebox" search={{ show: "clubs" }} className="text-gold">Watch the clubs on video &rarr;</Link>
      </p>
      {clubBlocks.map((b) => {
        const head = b.city !== lastCity && b.city !== b.area ? b.city : null;
        lastCity = b.city;
        const sel = b.clubs.find((c) => c.slug === open);
        return (
          <Fragment key={`${b.city}|${b.area}`}>
            {head && <h3 className="cc-city">{head}</h3>}
            <section className="cc-block">
              <h4 className="cc-sign">
                <span>{b.area}</span>
                <small>{b.clubs.length} {b.clubs.length === 1 ? "club" : "clubs"}</small>
              </h4>
              <div>
                {b.clubs.map((c) => (
                  <Link
                    key={c.slug}
                    to="/explore/$slug"
                    params={{ slug: c.slug }}
                    className={`az-st az-s${size(c.mentions)} ${NIGHTS.has(c.slug) ? "az-ink" : c.episodes > 1 ? "az-pink" : "az-paper"}`}
                    title={`${c.episodes} ${c.episodes === 1 ? "episode" : "episodes"} · ${c.mentions} ${c.mentions === 1 ? "mention" : "mentions"}`}
                    aria-expanded={open === c.slug}
                    onClick={(ev) => {
                      if (!plainClick(ev) || !entityBySlug[c.slug]) return;
                      ev.preventDefault();
                      setOpen((o) => (o === c.slug ? null : c.slug));
                    }}
                  >
                    {NIGHTS.has(c.slug) && <i>♫ club night</i>}
                    {c.name}
                    <small>{c.mentions}</small>
                  </Link>
                ))}
                {sel && entityBySlug[sel.slug] && (
                  <div className="az-detail">
                    <EntityBox entity={entityBySlug[sel.slug]!} onClose={() => setOpen(null)} />
                  </div>
                )}
              </div>
            </section>
          </Fragment>
        );
      })}
      <h2 className="cc-h2">Hear a whole night</h2>
      <p className="cc-sub">Three clubs so far with a night you can play from start to finish - what was really played there, from DJ lists, recorded sets and live shows, every song with its source.</p>
      <ul className="cc-tickets">
        {CLUB_NIGHTS.map((c, i) => (
          <li key={c.slug} className={`cc-ticket cc-t${i % 3}`}>
            <Link to="/jukebox" search={{ club: c.slug }} className="cc-ticket-main">
              <span className="cc-admit">Admit one · a night at</span>
              <b>{c.club}</b>
              <span className="cc-sounded">sounded like this</span>
              <span className="cc-first">
                {c.songs.slice(0, 3).map((s) => (
                  <span key={s.spotify ?? s.title}>
                    {s.title} <em>· {s.artist}</em>
                  </span>
                ))}
              </span>
              <span className="cc-play">▶ {c.songs.length} songs on the Jukebox</span>
            </Link>
            <span className="cc-stub">
              {c.playlistId && <a href={playlistUrl(c.playlistId)} target="_blank" rel="noopener noreferrer">Spotify ↗</a>}
              {c.youtubePlaylist && <a href={c.youtubePlaylist} target="_blank" rel="noopener noreferrer">YouTube ↗</a>}
            </span>
          </li>
        ))}
      </ul>

    </div>
  );
}
