import { useRouter, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useRef, useState } from "react";
import { getRandomNight } from "@/lib/random-pick.functions";
import type { RandomNight, RandomPick } from "@/lib/random-pick";

// "Random night out" at the bottom of every page (Lisa, 27 Nov 2026: "we should add a 'random pick' category on the bottom
// of every pages, for fun"; 28 Nov 2026, option C: "just show the version where you can see the choices and pictures already
// and then you can spin again if you like"). Four reels - who you meet, where you go, what the DJ plays, what you take home -
// already filled in with their pictures, one line that tells the night, and "Spin again!". It sits in the shared SiteFooter
// right above "Got a suggestion for this page?", so every page gets it - except the guest AFTERPARTY pages (Lisa, 28 Nov 2026). The night is drawn on the server
// (src/lib/random-pick.server.ts) as the box comes near the screen, and every pick opens a page on this site.

const REELS: { key: keyof RandomNight; q: string }[] = [
  { key: "who", q: "Who you meet" },
  { key: "where", q: "Where you go" },
  { key: "plays", q: "What the DJ plays" },
  { key: "home", q: "What you take home" },
];

/** Wait for the pictures so the reels stop on a full picture, not a half-loaded one (at most 2.5 s). */
const preload = (srcs: (string | undefined)[]) =>
  Promise.all(
    srcs.filter(Boolean).map(
      (src) =>
        new Promise<void>((done) => {
          const img = new Image();
          const t = window.setTimeout(done, 2500);
          img.onload = img.onerror = () => {
            window.clearTimeout(t);
            done();
          };
          img.src = src!;
        }),
    ),
  );

function Window({ p }: { p: RandomPick }) {
  if (p.kind === "song") return <span className="rn-record" aria-hidden="true" />;
  if (!p.pic)
    return (
      <span className="rn-blank" aria-hidden="true">
        {p.name}
      </span>
    );
  // A whole polaroid card (person and club pages): show only its photo (40-680 px of the 720 px wide card).
  if (p.pic.framed)
    return (
      <img
        src={p.pic.src}
        alt=""
        decoding="async"
        className="block w-[112.5%] max-w-none"
        style={{ margin: "-6.25% 0 0 -6.25%" }}
      />
    );
  return (
    <img
      src={p.pic.src}
      alt=""
      decoding="async"
      className={p.kind === "library" || p.kind === "film" ? "rn-cover" : "rn-photo"}
    />
  );
}

/** A guest's AFTERPARTY page (/episodes/s05e03, /episodes/s05e07a) - the AFTERPARTY list at /episodes keeps the box. */
const isGuestAfterparty = (path: string) => /^\/episodes\/s\d{2}e\d{2}[a-z]?\/?$/.test(path);

export function RandomPickBox({ className = "" }: { className?: string }) {
  const draw = useServerFn(getRandomNight);
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [night, setNight] = useState<RandomNight | null>(null);
  const [state, setState] = useState<"idle" | "spinning" | "error">("idle");
  const box = useRef<HTMLElement>(null);

  const spin = useCallback(
    async (first = false) => {
      setState("spinning");
      const started = Date.now();
      try {
        const next = await draw({ data: { here: pathname } });
        await preload(REELS.map((r) => next[r.key].pic?.src));
        // Let the reels spin a moment when the visitor pulled the lever, even when the server is quick.
        const left = (first ? 0 : 750) - (Date.now() - started);
        if (left > 0) await new Promise((r) => window.setTimeout(r, left));
        setNight(next);
        setState("idle");
      } catch {
        setState("error");
      }
    },
    [draw, pathname],
  );

  // Filled in before the visitor gets there: the first night is drawn as the box comes near the screen, again on every page.
  useEffect(() => {
    setNight(null);
    const el = box.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      void spin(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void spin(true);
        }
      },
      { rootMargin: "900px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [spin]);

  const go = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    void router.navigate({ href });
  };

  // Every page except the guest AFTERPARTY pages (Lisa, 28 Nov 2026: "publish for all pages, except guest afterparty pages").
  if (isGuestAfterparty(pathname)) return null;

  const spinning = state === "spinning";
  // The links carry bg-transparent so the episode pages' pink text-link look (main.episode-page a, styles.css) leaves them alone.
  const Name = ({ p }: { p: RandomPick }) => (
    <a href={p.href} onClick={go(p.href)} className="rn-story-link bg-transparent">
      {p.name}
    </a>
  );

  return (
    <section ref={box} aria-labelledby="random-night-heading" className={className}>
      <div className="w-full border-[3px] border-[#111] bg-[#111] px-6 py-8 text-[#f4f1ea] shadow-[8px_10px_0_var(--color-pink)] sm:px-8">
        <h2 id="random-night-heading" className="text-3xl leading-[0.95] text-[#f4f1ea]">
          Random <span className="text-pink">night out</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#e9e4d8]">
          Who you meet, where you go, what the DJ plays and what you take home - picked at random
          from the AFTERPARTY. Don&rsquo;t like your night? Spin again.
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-live="polite">
          {REELS.map(({ key, q }) => {
            const p = night?.[key];
            return (
              <li key={key} className={`rn-reel ${spinning || !p ? "rn-spinning" : ""}`}>
                <span className="rn-q">{q}</span>
                {p ? (
                  <a
                    href={p.href}
                    onClick={go(p.href)}
                    className="group flex flex-col gap-2 bg-transparent"
                    key={p.href}
                  >
                    <span className="rn-win">
                      <Window p={p} />
                    </span>
                    <span className="rn-name text-[#111] transition-colors group-hover:text-pink group-focus-visible:text-pink">
                      {p.name}
                    </span>
                    <span className="rn-sub">{p.kind === "song" ? p.line : p.tag}</span>
                  </a>
                ) : (
                  <span className="flex flex-col gap-2">
                    <span className="rn-win rn-empty" aria-hidden="true">
                      ?
                    </span>
                    <span className="rn-name">&nbsp;</span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        {night && (
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-[#f4f1ea] sm:text-lg">
            Tonight you meet <Name p={night.who} /> at <Name p={night.where} />, the DJ drops{" "}
            <Name p={night.plays} />, and you go home with <Name p={night.home} />.
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => void spin()}
            disabled={spinning}
            className="whitespace-nowrap border-2 border-pink bg-pink px-5 py-2 text-xs font-semibold uppercase text-pink-foreground transition hover:bg-[#111] hover:text-[#f4f1ea] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
          >
            {spinning ? "Spinning…" : "Spin again!"}
          </button>
          {state === "error" && (
            <span className="text-xs text-[#f6e06a]">The reels got stuck - please spin again.</span>
          )}
        </div>
      </div>
    </section>
  );
}
