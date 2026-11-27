import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Timestamp } from "@/components/episode-player";
import { ProfileVideos } from "@/components/profile-videos";
import { episodePath } from "@/data/episodes";
import { CLUB_NIGHTS } from "@/data/club-nights";
import photo from "@/assets/clubs/paradise-garage-photo.webp";
import phone from "@/assets/clubs/paradise-garage-photo-phone.webp";
import polaroid from "@/assets/clubs/paradise-garage-polaroid.webp";

// MOCK ONLY (not for main): what a club night / theme night page could look like - Paradise Garage closing weekend.
export const Route = createFileRoute("/mock-night")({ component: MockNight });

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";

const TOLD = [
  { ep: "s06e02", code: "S6E2", guest: "Christina Visca", time: "00:18:46", ctx: "Christina remembers people lighting candles and crying, and nobody having a plan for what came next" },
  { ep: "s01e08", code: "S1E8", guest: "Luis \"Xtravaganza\" Camacho", time: "00:55:56", ctx: "Luis's one visit, with the big sit-in outside afterwards" },
];

function MockNight() {
  const night = CLUB_NIGHTS.find((n) => n.slug === "paradise-garage")!;
  const songs = night.songs.filter((s) => /closing/i.test(s.why));
  const films = (night.footage ?? []).filter((f) => /closing|final night/i.test(f.title));
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        className="card-head card-head-photo px-4"
        style={{ "--photo": `url(${photo})`, "--photo-phone": `url(${phone})`, "--focus": "50%" } as CSSProperties}
      >
        <figure className="card-polaroid">
          <img src={polaroid} alt="Paradise Garage, 84 King Street" width={720} height={893} />
          <figcaption>Paradise Garage, 84 King Street</figcaption>
        </figure>
        <div className="card-namecard">
          <Link to="/explore/$slug" params={{ slug: "paradise-garage" }} className="card-back">&larr; Paradise Garage</Link>
          <p className="mt-5">
            <span className="az-st az-s2 az-pink">Club night</span>
          </p>
          <h1 className="card-title">
            <span className="timeline-strip timeline-strip-ink">Paradise Garage closing weekend</span>
          </h1>
          <div>
            <p className="memoriam-aka">The last weekend at the Garage</p>
            <p className="mt-2 text-sm text-muted-foreground">84 King Street · September 1987 · 2 episodes</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-20 px-4 py-20">
        {/* 1. What it was: from the club's own timeline + the two episode moments. */}
        <section className="grid gap-10 md:grid-cols-[3fr_2fr]">
          <div>
            <p className={h}>What it was</p>
            <p className="mt-4 text-lg leading-relaxed">
              The last weekend at 84 King Street before the lease ended on 1 October 1987, with Larry Levan in the booth for the
              closing party. Christina remembers candles and tears; Luis came for the only time, and stayed for the big sit-in outside.
            </p>
          </div>
          <aside className="self-start border-2 border-[#111] bg-[#fbf8f1] p-5 font-sans text-sm shadow-[5px_6px_0_#111]">
            <p className={h}>The night</p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
              <dt className="text-[#6b6460]">When</dt><dd className="font-semibold">September 1987</dd>
              <dt className="text-[#6b6460]">Where</dt>
              <dd className="font-semibold">
                <Link to="/explore/$slug" params={{ slug: "paradise-garage" }} className="hover:text-pink">Paradise Garage</Link>, 84 King Street
              </dd>
              <dt className="text-[#6b6460]">DJ</dt><dd className="font-semibold">Larry Levan</dd>
              <dt className="text-[#6b6460]">Map</dt>
              <dd className="font-semibold"><Link to="/map" search={{ at: "paradise-garage" }} className="hover:text-pink">Open the big map &rarr;</Link></dd>
            </dl>
          </aside>
        </section>

        {/* 2. Quote from the guest who was there. */}
        <section>
          <p className={`${h} text-center`}>What the guests say</p>
          <figure className="mx-auto mt-6 max-w-2xl border-2 border-[#111] bg-white p-6 shadow-[6px_6px_0_var(--color-pink)]">
            <blockquote className="text-lg leading-relaxed">
              "I went to Paradise Garage once, at the end. There was that big weekend when they were closing, and there was a big sit-in outside afterwards..."
            </blockquote>
            <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2 text-sm">
              <b>Luis "Xtravaganza" Camacho</b>
              <Link to={episodePath("s01e08" as never)} className="font-semibold text-gold hover:text-pink">S1E8</Link>
              <Timestamp episodeId="s01e08" time="00:55:56" />
            </figcaption>
          </figure>
        </section>

        {/* 3. Played that night: the club night's songs tagged "closing night", with the Jukebox play button. */}
        <section className="jbx" style={{ maxWidth: "none" }}>
          <p className={`${h} text-center`}>Played that night · {songs.length} songs</p>
          <ol className="mx-auto mt-6 grid max-w-3xl gap-2">
            {songs.map((s) => (
              <li key={s.title} className="jbx-strip">
                <Link to="/jukebox" search={{ club: "paradise-garage" }} className="jbx-big" aria-label={`Play ${s.title} in the Jukebox`}>
                  <span aria-hidden="true">▶</span>
                </Link>
                <div className="jbx-tt">
                  <span className="jbx-name jbx-clubtitle">{s.title}</span>
                  <i className="block text-xs not-italic text-[#555]">{s.artist} ({s.year}) · {s.why}</i>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-center text-sm">
            <Link to="/jukebox" search={{ club: "paradise-garage" }} className="font-semibold text-gold hover:text-pink">
              The whole Paradise Garage night in the Jukebox &rarr;
            </Link>
          </p>
        </section>

        {/* 4. On film: only the closing-party tapes. */}
        <ProfileVideos videos={films} playlist={night.youtubePlaylist} first="The closing weekend" />

        {/* 5. In the episodes: the standing mention lines. */}
        <section>
          <p className={h}>In the episodes · {TOLD.length}</p>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {TOLD.map((t) => (
              <li key={t.ep} className="py-4">
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <Link to={episodePath(t.ep as never)} className="font-semibold text-gold hover:text-pink">{t.code} · {t.guest}</Link>
                  <Timestamp episodeId={t.ep} time={t.time} />
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{t.ctx}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Back to the club: the other nights at the same club. */}
        <section className="border-2 border-[#111] bg-[#fbf8f1] p-6 text-center shadow-[5px_6px_0_#111]">
          <p className={h}>More from the club</p>
          <p className="mt-3 text-lg">
            <Link to="/explore/$slug" params={{ slug: "paradise-garage" }} className="font-bold hover:text-pink">Paradise Garage</Link>
            <span className="text-muted-foreground"> · 1977–1987 · 84 King Street</span>
          </p>
        </section>
      </div>
    </main>
  );
}
