import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { Timestamp } from "@/components/episode-player";
import { episodes } from "@/data/episodes";
import { MODES, PIECES, SLOTS, options, piecesFor, verdict, type Mode, type Piece, type Slot } from "@/data/closet";
import vt323 from "@/assets/fonts/vt323.woff2?url";
import leopard from "@/assets/leopard.svg?url";
import makos from "@/assets/cards/guestbook.jpg";

// The Wardrobe - built from the looks in the episodes, in two styles that share everything but the skin:
// "Afterparty Style" (the site's navy, pink dry-brush, torn scraps and gold) and "Clueless Style" (a homage to the 90s
// wardrobe computer: beige monitor, leopard panels, white screen, chunky bevelled buttons, pixel font).
export const Route = createFileRoute("/wardrobe")({
  staticData: { sitemap: true },
  component: ClosetPage,
  head: () =>
    pageHead({
      path: "/wardrobe",
      title: "The Wardrobe – dress like the Night Fever guests | Night Fever fan page",
      description: "Dress yourself from 700 looks in Night Fever's stories - by episode, guest, designer, club, place or colour mood. Afterparty Style or Clueless Style!",
      image: "/og/wardrobe.jpg",
    }),
});

type StyleId = "afterparty" | "clueless";
const PIXEL = "font-[ClubPixel,ui-monospace,monospace] tracking-widest";
const SKINS = {
  clueless: {
    name: "Clueless Style",
    font: PIXEL,
    bezel: "rounded-[28px] p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,.8)] sm:p-5",
    bezelStyle: { backgroundImage: "linear-gradient(180deg,#e6dfcf,#c9bfaa)" } as React.CSSProperties,
    frame: "overflow-hidden rounded-[14px] border-4 border-[#2a2620] bg-black",
    bar: "bg-[#120d16] text-[#f0e6d2] text-base sm:text-xl",
    barBox: "border-2 border-[#f0e6d2]",
    panel: "leopard",
    screen: "bg-[#f7f5f0] text-[#1b1820]",
    match: "text-[#1f6f3a]",
    mis: "text-[#c2185b]",
    card: "rounded-sm border-2 border-[#1b1820] bg-white",
    keys: "border-t-2 border-[#1b1820] bg-[#2b2533]",
    key: "bevel m-1 flex-1 bg-[#d8d2dc] py-1 text-lg text-[#1b1820]",
    keyOn: "!bg-gold",
    btn: "bevel border-2 border-[#1b1820] px-2 leading-none text-white",
    btnSmall: "bg-[#5b2a86] py-2 text-lg md:text-xl",
    btnBig: "bg-pink py-3 text-2xl md:text-3xl",
    btnOn: "!bg-gold !text-[#1b1820]",
    small: "text-[#6b5b70]",
    src: "text-[#5c5560]",
    who: "text-[#8a5a00]",
    ts: "!text-[#8a5a00]",
    link: "hover:text-[#c2185b]",
    rule: "border-dashed border-[#cfc6d4]",
    chip: "bevel bg-[#d8d2dc] text-[#1b1820]",
    chipOn: "!bg-gold",
    nav: "bg-[#120d16] text-[#f0e6d2] text-base sm:text-lg",
    brand: "text-[#6b6150]",
    ink: "#1b1820",
    verdictSize: "text-2xl",
  },
  afterparty: {
    name: "Afterparty Style",
    font: "font-semibold uppercase tracking-[0.18em]",
    bezel: "rounded-[28px] border-2 border-gold/50 bg-card p-3 shadow-[0_0_70px_-15px] shadow-pink/50 sm:p-5",
    bezelStyle: {} as React.CSSProperties,
    frame: "overflow-hidden rounded-2xl border border-gold/40 bg-background",
    bar: "bg-gradient-to-r from-pink to-[oklch(0.5_0.2_320)] text-pink-foreground text-xs sm:text-sm",
    barBox: "rounded-full border border-pink-foreground/70",
    panel: "makos",
    screen: "bg-[#0b0e26] text-cream",
    match: "text-gold",
    mis: "text-pink",
    card: "rounded-xl border border-gold/30 bg-background/70",
    keys: "border-t border-gold/20",
    key: "m-1 flex-1 rounded-full border border-border bg-card py-1.5 text-xs text-cream transition hover:border-gold",
    keyOn: "!border-gold !bg-gold/20 !text-gold",
    btn: "rounded-2xl border px-2 leading-tight shadow-lg transition hover:scale-[1.03] active:scale-95",
    btnSmall: "border-gold/70 bg-background/85 py-2.5 text-xs text-gold backdrop-blur",
    btnBig: "border-pink bg-pink py-4 text-lg text-pink-foreground shadow-pink/40",
    btnOn: "!border-gold !bg-gold !text-[#1b1820]",
    small: "text-gold/80",
    src: "text-muted-foreground",
    who: "text-gold",
    ts: "",
    link: "hover:text-pink",
    rule: "border-border",
    chip: "rounded-full border border-gold/60 bg-background text-gold",
    chipOn: "!bg-gold !text-[#1b1820]",
    nav: "bg-background text-gold text-[11px] sm:text-xs",
    brand: "text-gold/60",
    ink: "#f2d58a",
    verdictSize: "text-lg",
  },
};
type Skin = (typeof SKINS)["clueless"];
const SkinCtx = createContext<Skin>(SKINS.afterparty);
const useSkin = () => useContext(SkinCtx);
const STORE = "nf-closet-style";

const SHORT: Record<Slot, string> = { head: "HAIR & HATS", top: "TOPS & DRESSES", bottom: "SKIRTS & PANTS", feet: "SHOES", extra: "EXTRAS" };
const epLabel = (id: string) => {
  const e = episodes.find((x) => x.id === id);
  return e ? `S${String(e.season).padStart(2, "0")}E${String(e.episode).padStart(2, "0")}` : id.toUpperCase();
};
const rnd = (n: number) => Math.floor(Math.random() * n);

function ClosetPage() {
  const [style, setStyle] = useState<StyleId>("afterparty");
  useEffect(() => {
    try {
      const s = localStorage.getItem(STORE);
      if (s === "clueless" || s === "afterparty") setStyle(s);
    } catch {
      /* private mode */
    }
  }, []);
  const chooseStyle = (s: StyleId) => {
    setStyle(s);
    try {
      localStorage.setItem(STORE, s);
    } catch {
      /* private mode */
    }
  };
  const k = SKINS[style];

  const [mode, setMode] = useState<Mode>("all");
  const [pick, setPick] = useState("");
  const opts = useMemo(() => options(mode), [mode]);
  const pool = useMemo(() => piecesFor(mode, pick), [mode, pick]);
  const rails = useMemo(() => {
    const out = {} as Record<Slot, { items: Piece[]; borrowed: boolean }>;
    for (const s of SLOTS) {
      const own = pool.filter((p) => p.slot === s.id);
      out[s.id] = own.length ? { items: own, borrowed: false } : { items: PIECES.filter((p) => p.slot === s.id), borrowed: true };
    }
    return out;
  }, [pool]);
  const [idx, setIdx] = useState<Record<Slot, number>>({ head: 0, top: 0, bottom: 0, feet: 0, extra: 0 });
  const [locked, setLocked] = useState<Record<Slot, boolean>>({ head: false, top: false, bottom: false, feet: false, extra: false });
  const [view, setView] = useState<"dressed" | "browse">("dressed");
  const [focus, setFocus] = useState<Slot | null>(null);
  const [flash, setFlash] = useState(0);

  const autoDress = () => {
    setIdx((cur) => {
      const next = { ...cur };
      for (const s of SLOTS) if (!locked[s.id]) next[s.id] = rnd(rails[s.id].items.length);
      return next;
    });
    setFlash((n) => n + 1);
  };
  useEffect(autoDress, [rails]); // eslint-disable-line react-hooks/exhaustive-deps

  const step = (s: Slot, d: number) => setIdx((cur) => ({ ...cur, [s]: (cur[s] + d + rails[s].items.length) % rails[s].items.length }));
  const toggleLock = (s: Slot) => setLocked((l) => ({ ...l, [s]: !l[s] }));
  const chosen = Object.fromEntries(SLOTS.map((s) => [s.id, rails[s.id].items[idx[s.id] % rails[s.id].items.length]!])) as Record<Slot, Piece>;
  const full = !!chosen.top.full;
  const worn = SLOTS.map((s) => chosen[s.id]).filter((p) => !(full && p.slot === "bottom"));
  const v = verdict(worn);
  const label =
    mode === "all" ? "THE WHOLE SHOW" : (opts.find((o) => o.id === pick)?.label ?? MODES.find((m) => m.id === mode)!.label).toUpperCase();
  const browseSlots = focus ? SLOTS.filter((s) => s.id === focus) : SLOTS.filter((s) => !(full && s.id === "bottom"));
  const toggleView = () => {
    setView(view === "browse" ? "dressed" : "browse");
    setFocus(null);
  };

  return (
    <SkinCtx.Provider value={k}>
      <main className="min-h-screen bg-background text-foreground">
        <style>{`@font-face{font-family:ClubPixel;src:url(${vt323}) format("woff2");font-display:swap}
.leopard{background:#e9c995 url(${leopard}) repeat;background-size:120px 120px}
.makos{background:linear-gradient(180deg,rgba(11,14,38,.15),rgba(11,14,38,.55)),url(${makos}) center/cover}
.bevel{box-shadow:inset 3px 3px 0 rgba(255,255,255,.55),inset -3px -3px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.4)}
.bevel:active{box-shadow:inset -3px -3px 0 rgba(255,255,255,.4),inset 3px 3px 0 rgba(0,0,0,.45)}`}</style>

        <section className="disco-grid px-6 pb-6 pt-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Dress me!</p>
          <h1 className="mt-4 text-balance text-5xl font-bold tracking-tight text-cream text-glow sm:text-6xl">
            The <span className="text-pink text-glow-pink">Wardrobe</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            {PIECES.length} pieces from the looks in the guests&rsquo; stories, each in its real colour. Choose who or what dresses
            you, then hit <strong className="text-cream">Dress me</strong>.
          </p>
          {/* style switch */}
          <div role="radiogroup" aria-label="Wardrobe style" className="mx-auto mt-6 inline-flex rounded-full border border-gold/50 bg-card p-1">
            {(["afterparty", "clueless"] as StyleId[]).map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={style === s}
                onClick={() => chooseStyle(s)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${style === s ? "bg-pink text-pink-foreground" : "text-cream hover:text-gold"} ${s === "clueless" ? "font-[ClubPixel,ui-monospace,monospace] text-base tracking-widest" : ""}`}
              >
                {SKINS[s].name}
              </button>
            ))}
          </div>
        </section>

        {/* dress me for... */}
        <section className="px-4 pb-6">
          <div className="mx-auto max-w-5xl">
            <p className={`${k.font} text-center text-gold ${style === "clueless" ? "text-xl" : "text-xs"}`}>DRESS ME FOR…</p>
            <div className="mt-2 flex flex-wrap justify-center gap-1.5">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setMode(m.id);
                    setPick(m.id === "all" ? "" : (options(m.id)[0]?.id ?? ""));
                    setFocus(null);
                  }}
                  className={`border px-3 py-1 text-xs font-semibold transition ${style === "clueless" ? "rounded-sm" : "rounded-full"} ${mode === m.id ? "border-pink bg-pink text-pink-foreground" : "border-border text-cream hover:border-gold"}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            {mode !== "all" && (
              <div className="mx-auto mt-3 max-w-md">
                <label className="sr-only" htmlFor="closet-pick">Choose</label>
                <span className="relative block">
                  <select
                    id="closet-pick"
                    value={pick}
                    onChange={(e) => setPick(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-gold/50 bg-card px-4 py-2.5 pr-10 text-cream [color-scheme:dark] focus:border-pink focus:outline-none"
                  >
                    {opts.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label} ({o.count} {o.count === 1 ? "piece" : "pieces"})
                      </option>
                    ))}
                  </select>
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg>
                </span>
              </div>
            )}
          </div>
        </section>

        {/* the wardrobe */}
        <section className="px-2 pb-6 sm:px-4">
          <div className={`mx-auto max-w-5xl ${k.bezel}`} style={k.bezelStyle}>
            <div className={k.frame}>
              <div className={`${k.font} ${k.bar} flex items-center justify-between gap-2 px-3 py-1.5`}>
                <span>WARDROBE</span>
                <span className={`${k.barBox} truncate px-2 leading-tight`}>{label}</span>
                <span className={style === "clueless" ? "text-pink" : ""}>♥</span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[110px_minmax(0,1fr)_110px] md:grid-cols-[150px_minmax(0,1fr)_150px]">
                <div className={`${k.panel} hidden flex-col justify-end gap-3 p-3 sm:flex`}>
                  <ChunkyButton onClick={autoDress}>AUTO DRESS</ChunkyButton>
                  <ChunkyButton onClick={toggleView} active={view === "browse"}>{view === "browse" ? "SEE IT ON" : "BROWSE"}</ChunkyButton>
                </div>

                <div className={`min-h-[460px] p-3 sm:p-4 ${k.screen}`}>
                  {view === "dressed" ? (
                    <div key={flash} className="grid h-full grid-cols-1 items-center gap-3 animate-in fade-in duration-300 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                      <Figure chosen={chosen} full={full} />
                      <div className="min-w-0">
                        <p className={`${k.font} ${k.verdictSize} ${v.match ? k.match : `animate-pulse ${k.mis}`}`}>{v.match ? "MATCH!" : "MIS-MATCH!"}</p>
                        <p className="text-sm">{v.line}</p>
                        <ul className="mt-3 space-y-2">
                          {SLOTS.filter((s) => !(full && s.id === "bottom")).map((s) => (
                            <PieceLine key={s.id} piece={chosen[s.id]} slot={s.id} locked={locked[s.id]} borrowed={rails[s.id].borrowed} onLock={() => toggleLock(s.id)} />
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {browseSlots.map((s) => (
                        <li key={s.id} className={k.card}>
                          <div className="flex items-center gap-3 p-2">
                            <Garment slot={s.id} piece={chosen[s.id]} big />
                            <div className="min-w-0 flex-1">
                              <p className={`${k.font} text-[11px] sm:text-sm ${k.small}`}>{SHORT[s.id]}{rails[s.id].borrowed && " · FROM THE WHOLE WARDROBE"}</p>
                              <p className="truncate text-lg font-semibold">{chosen[s.id].label}</p>
                              <Source piece={chosen[s.id]} />
                            </div>
                          </div>
                          <div className={`flex ${k.keys}`}>
                            <PixelKey onClick={() => step(s.id, -1)} label={`Previous ${s.label}`}>◀◀</PixelKey>
                            <PixelKey onClick={() => toggleLock(s.id)} label={locked[s.id] ? "Unlock" : "Keep this one"} active={locked[s.id]}>
                              {locked[s.id] ? "KEPT" : "▶ KEEP"}
                            </PixelKey>
                            <PixelKey onClick={() => step(s.id, 1)} label={`Next ${s.label}`}>▶▶</PixelKey>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className={`${k.panel} hidden flex-col justify-end p-3 sm:flex`}>
                  <ChunkyButton onClick={() => { autoDress(); setView("dressed"); setFocus(null); }} big>DRESS ME</ChunkyButton>
                </div>
              </div>

              <div className={`${k.panel} flex gap-2 p-2 sm:hidden`}>
                <ChunkyButton grow onClick={autoDress}>AUTO DRESS</ChunkyButton>
                <ChunkyButton grow onClick={toggleView} active={view === "browse"}>{view === "browse" ? "SEE IT ON" : "BROWSE"}</ChunkyButton>
                <ChunkyButton grow onClick={() => { autoDress(); setView("dressed"); }} big>DRESS ME</ChunkyButton>
              </div>

              <nav aria-label="Wardrobe rails" className={`${k.font} ${k.nav} flex gap-x-4 overflow-x-auto px-3 py-1.5`}>
                {SLOTS.map((s) => (
                  <button key={s.id} type="button" onClick={() => { setView("browse"); setFocus(s.id); }}
                    className={`shrink-0 hover:text-pink ${focus === s.id && view === "browse" ? "text-pink underline" : ""}`}>
                    {SHORT[s.id]}
                  </button>
                ))}
                <button type="button" onClick={() => { setView("browse"); setFocus(null); }} className={`ml-auto shrink-0 px-2 hover:text-pink ${k.barBox}`}>ALL</button>
              </nav>
            </div>
            <p className={`${k.font} mt-2 text-center text-xs sm:text-sm ${k.brand}`}>NIGHT FEVER AFTERPARTY</p>
          </div>
          <p className="mx-auto mt-4 max-w-5xl text-center text-xs text-muted-foreground">
            Every piece links back to the look it comes from and the moment in the episode. Shapes are simple drawings in each
            piece&rsquo;s own colour - original artwork can follow.
          </p>
        </section>
        <SiteFooter />
      </main>
    </SkinCtx.Provider>
  );
}

function ChunkyButton({ children, onClick, active, big, grow }: { children: React.ReactNode; onClick: () => void; active?: boolean; big?: boolean; grow?: boolean }) {
  const k = useSkin();
  return (
    <button type="button" onClick={onClick}
      className={`${k.font} ${k.btn} ${grow ? "flex-1" : "w-full"} ${big ? k.btnBig : k.btnSmall} ${active ? k.btnOn : ""}`}>
      {children}
    </button>
  );
}

function PixelKey({ children, onClick, label, active }: { children: React.ReactNode; onClick: () => void; label: string; active?: boolean }) {
  const k = useSkin();
  return (
    <button type="button" aria-label={label} onClick={onClick} className={`${k.font} ${k.key} ${active ? k.keyOn : ""}`}>
      {children}
    </button>
  );
}

function Source({ piece }: { piece: Piece }) {
  const k = useSkin();
  return (
    <p className={`relative truncate text-xs ${k.src}`}>
      {piece.who && <span className={`font-semibold ${k.who}`}>{piece.who} · </span>}
      {piece.lookSlug ? (
        <Link to="/explore/$slug" params={{ slug: piece.lookSlug }} className={`underline decoration-dotted underline-offset-2 ${k.link}`}>{piece.look}</Link>
      ) : (
        piece.look
      )}
      {" · "}
      {epLabel(piece.episode)} <Timestamp episodeId={piece.episode} time={piece.time} className={`text-xs ${k.ts}`} />
    </p>
  );
}

function PieceLine({ piece, slot, locked, borrowed, onLock }: { piece: Piece; slot: Slot; locked: boolean; borrowed: boolean; onLock: () => void }) {
  const k = useSkin();
  return (
    <li className={`flex items-center gap-2 border-b pb-2 ${k.rule}`}>
      <span className="h-6 w-6 shrink-0 rounded-sm border" style={{ background: colourOf(piece), borderColor: k.ink }} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">
          <span className={`${k.font} mr-1 text-[10px] sm:text-xs ${k.small}`}>{SHORT[slot]}</span>
          {piece.label}
          {borrowed && <span className="ml-1 text-[10px] text-pink">(whole wardrobe)</span>}
        </p>
        <Source piece={piece} />
      </div>
      <button type="button" onClick={onLock} aria-pressed={locked} title={locked ? "Unlock" : "Keep this one when you auto-dress"}
        className={`${k.font} shrink-0 px-2 py-0.5 text-[11px] sm:text-sm ${k.chip} ${locked ? k.chipOn : ""}`}>
        {locked ? "KEPT" : "KEEP"}
      </button>
    </li>
  );
}

// ---- drawings ------------------------------------------------------------------------------------------------------

const texture = (label: string) => {
  const l = label.toLowerCase();
  if (/sequin|glitter|rhinestone|sparkle|lam[eé]|crystal|diamant/.test(l)) return "sparkle";
  if (/stripe|pinstripe/.test(l)) return "stripe";
  if (/plaid|tartan|gingham|check/.test(l)) return "plaid";
  if (/leopard|animal|zebra|cheetah/.test(l)) return "spots";
  if (/fishnet|lace|net|mesh/.test(l)) return "mesh";
  if (/polka|dot/.test(l)) return "dots";
  return "";
};
// Pieces whose story names no colour get one from the house palette, picked by name so it never changes.
const HOUSE = ["#e8337f", "#c8a24b", "#141414", "#efe8da", "#7d2bd1", "#c62828", "#1d5fa8", "#f2d58a", "#2fb5a3"];
const colourOf = (p: Piece) =>
  p.hex ?? p.palette[0] ?? HOUSE[[...p.label].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % HOUSE.length]!;

function Patterns({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={`${id}-sparkle`} width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#fff" opacity="0.85" /><circle cx="6" cy="6" r="0.9" fill="#fff" opacity="0.55" /></pattern>
      <pattern id={`${id}-stripe`} width="7" height="7" patternUnits="userSpaceOnUse"><rect width="3" height="7" fill="#000" opacity="0.28" /></pattern>
      <pattern id={`${id}-plaid`} width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="3" fill="#000" opacity="0.22" /><rect width="3" height="12" fill="#fff" opacity="0.2" /><rect y="7" width="12" height="1" fill="#c62828" opacity="0.5" /></pattern>
      <pattern id={`${id}-spots`} width="14" height="14" patternUnits="userSpaceOnUse"><ellipse cx="4" cy="4" rx="3" ry="2.2" fill="#2a1a0e" opacity="0.7" /><ellipse cx="11" cy="11" rx="2.4" ry="1.8" fill="#2a1a0e" opacity="0.6" /></pattern>
      <pattern id={`${id}-mesh`} width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 0L6 6M6 0L0 6" stroke="#000" strokeWidth="0.9" opacity="0.7" /></pattern>
      <pattern id={`${id}-dots`} width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="2.2" fill="#fff" opacity="0.85" /></pattern>
      <linearGradient id={`${id}-sheen`} x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.4" /><stop offset="0.55" stopColor="#fff" stopOpacity="0" /></linearGradient>
    </defs>
  );
}

function Fill({ d, piece, id }: { d: string; piece: Piece; id: string }) {
  const ink = useSkin().ink;
  const tex = texture(piece.label);
  return (
    <>
      <path d={d} fill={colourOf(piece)} stroke={ink} strokeWidth="1.6" strokeLinejoin="round" />
      {tex && <path d={d} fill={`url(#${id}-${tex})`} />}
      <path d={d} fill={`url(#${id}-sheen)`} />
    </>
  );
}

const isTrousers = (l: string) => /trouser|pants|jeans|chino|leggings|flares|slacks/i.test(l);
const isLegwear = (l: string) => /stocking|fishnet|tights|garter|pantyhose/i.test(l);
const isHat = (l: string) => /hat|cap|beanie|beret|crown|tiara|headdress|turban|veil|wimple|halo|horn/i.test(l);
const isFace = (l: string) => /lip|rouge|eyeliner|mascara|lash|make-?up|paint|frames|glasses|sunglasses|shades|lens|mask|beauty/i.test(l);
const isDrape = (l: string) => /boa|feather|fur|mink|stole|shawl|scarf|scarves|cape/i.test(l);
const isNecklace = (l: string) => /pearl|bead|necklace|chain|choker|collar|rhinestone|crystal|jewel/i.test(l);

/** The outfit on a figure, Clueless-style. */
function Figure({ chosen, full }: { chosen: Record<Slot, Piece>; full: boolean }) {
  const id = "fig";
  const { head, top, bottom, feet, extra } = chosen;
  const skin = "#e9d3c0";
  const ink = useSkin().ink;
  return (
    <svg viewBox="0 0 200 420" className="mx-auto h-[380px] w-auto max-w-full" role="img" aria-label="The outfit on a figure">
      <Patterns id={id} />
      {/* figure */}
      <g fill={skin} stroke={ink} strokeWidth="1.4">
        <circle cx="100" cy="52" r="22" />
        <rect x="92" y="70" width="16" height="16" />
        <path d="M66 92Q100 80 134 92L146 190L134 192L126 120L124 200L76 200L74 120L66 192L54 190Z" />
        <path d="M78 200L76 380L94 380L100 236L106 380L124 380L122 200Z" />
      </g>
      {/* legwear under everything */}
      {!full && isLegwear(bottom.label) && <Fill id={id} piece={bottom} d="M78 200L76 380L94 380L100 236L106 380L124 380L122 200Z" />}
      {/* bottom */}
      {!full && !isLegwear(bottom.label) &&
        (isTrousers(bottom.label) ? (
          <Fill id={id} piece={bottom} d="M76 192L124 192L127 378L105 378L100 238L95 378L73 378Z" />
        ) : (
          <Fill id={id} piece={bottom} d="M78 190L122 190L140 286L60 286Z" />
        ))}
      {/* top or dress */}
      {full ? (
        <Fill id={id} piece={top} d="M66 92Q100 82 134 92L140 130L126 132L124 170L150 318L50 318L76 170L74 132L60 130Z" />
      ) : (
        <Fill id={id} piece={top} d="M64 92Q100 80 136 92L148 150L132 154L128 128L126 200L74 200L72 128L68 154L52 150Z" />
      )}
      {/* shoes */}
      <Fill id={id} piece={feet} d="M70 378L96 378L97 392L66 394Q64 386 70 378Z" />
      <Fill id={id} piece={feet} d="M104 378L130 378Q136 386 134 394L103 392Z" />
      {/* head: hair/hat or face */}
      {isHat(head.label) ? (
        <Fill id={id} piece={head} d="M70 40Q100 4 130 40L144 44Q100 34 56 44Z" />
      ) : isFace(head.label) ? (
        /lip/i.test(head.label) ? (
          <Fill id={id} piece={head} d="M92 62Q100 58 108 62Q100 68 92 62Z" />
        ) : (
          <Fill id={id} piece={head} d="M82 46L96 46L96 54L82 54ZM104 46L118 46L118 54L104 54ZM96 49L104 49L104 51L96 51Z" />
        )
      ) : (
        <Fill id={id} piece={head} d="M76 56Q72 18 100 18Q128 18 124 56L128 84L116 80L118 50Q100 34 82 50L84 80L72 84Z" />
      )}
      {/* extra */}
      {isDrape(extra.label) ? (
        <Fill id={id} piece={extra} d="M60 92Q100 120 140 92L146 104Q100 136 54 104Z" />
      ) : isNecklace(extra.label) ? (
        <g>{[...Array(9)].map((_, i) => <circle key={i} cx={84 + i * 4} cy={94 + Math.sin((i / 8) * Math.PI) * 10} r="2.6" fill={colourOf(extra)} stroke={ink} strokeWidth="0.6" />)}</g>
      ) : /bag|clutch|purse|lunchbox/i.test(extra.label) ? (
        <Fill id={id} piece={extra} d="M146 196L168 196L170 222L144 222Z" />
      ) : (
        <Fill id={id} piece={extra} d="M160 40L165 54L180 54L168 63L172 78L160 69L148 78L152 63L140 54L155 54Z" />
      )}
    </svg>
  );
}

/** One piece drawn on its own, for browsing. */
function Garment({ slot, piece, big }: { slot: Slot; piece: Piece; big?: boolean }) {
  const id = `g-${slot}`;
  const l = piece.label;
  const d =
    slot === "head"
      ? isHat(l) ? "M14 40Q32 6 50 40L60 44Q32 34 4 44Z" : isFace(l) ? "M10 26L28 26L28 38L10 38ZM36 26L54 26L54 38L36 38ZM28 31L36 31L36 33L28 33Z" : "M12 42C10 16 54 16 52 42L52 56L44 56L44 34C44 25 20 25 20 34L20 56L12 56Z"
      : slot === "top"
        ? piece.full ? "M24 4L40 4L38 20L54 60L10 60L26 20Z" : "M20 8L28 12Q32 16 36 12L44 8L58 20L51 29L47 25L47 58L17 58L17 25L13 29L6 20Z"
        : slot === "bottom"
          ? isTrousers(l) ? "M18 6L46 6L50 60L36 60L32 24L28 60L14 60Z" : isLegwear(l) ? "M20 4L30 4L30 60L20 60ZM34 4L44 4L44 60L34 60Z" : "M20 8L44 8L56 56L8 56Z"
          : slot === "feet"
            ? "M6 46L30 46Q40 32 48 22L57 24L55 31Q46 39 44 52L41 52L39 44L14 52L6 52Z"
            : isNecklace(l) ? "M12 14Q32 52 52 14L56 16Q32 62 8 16Z" : isDrape(l) ? "M4 16Q32 40 60 16L60 30Q32 56 4 30Z" : "M32 5L39 24L59 24L43 36L49 57L32 44L15 57L21 36L5 24L25 24Z";
  return (
    <svg viewBox="0 0 64 64" className={`${big ? "h-20 w-20" : "h-12 w-12"} shrink-0`} aria-hidden="true">
      <Patterns id={id} />
      <Fill id={id} piece={piece} d={d} />
    </svg>
  );
}
