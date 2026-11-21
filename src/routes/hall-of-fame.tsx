import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { SiteFooter } from "@/components/site-footer";
import { LinkDataProvider, linkToSlug, useLinks, type LinkData } from "@/lib/link-index";
import { MomentsBox, plainClick } from "@/components/moments-box";
import { ConnectorBadge, HallOfFameBadge } from "@/components/badges";
import { getHallOfFame, getHallOfFameMoments } from "@/lib/hall-of-fame.functions";
import { points, type HallOfFameView, type HofMomentsView } from "@/lib/mentor-tree";
import { Fragment, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import wall from "@/assets/hall-of-fame-wall.webp";
import wallPhone from "@/assets/hall-of-fame-wall-phone.webp";

// The Hall of Fame page (Lisa, 21 Nov 2026: "create the hall of fame website with top 10 on top"): one top 100 - the
// Hall of Fame top 10 with their gold stamps first, then places 11-100, the great connectors, with the pink sticker.
// The order comes from src/lib/mentor-rank.ts and src/lib/connector-rank.ts; the data from the server (hall-of-fame.server.ts).

export const Route = createFileRoute("/hall-of-fame")({
  staticData: { sitemap: true },
  loader: () => getHallOfFame(),
  component: HallOfFamePage,
  head: () =>
    pageHead({
      path: "/hall-of-fame",
      title: "Hall of Fame - the top 100 of the downtown scene | Night Fever AFTERPARTY",
      description: "The AFTERPARTY Hall of Fame: the top 10 who lifted the New York club scene the most, as the Night Fever guests tell it, and the 90 great connectors after them.",
      image: "/og/home.jpg",
    }),
});

function HallOfFamePage() {
  const v = Route.useLoaderData();
  // A box from 11-100 fetches its moments with their link answers; they join the page's own (Lisa, 21 Nov 2026).
  const [links, setLinks] = useState<LinkData>(v.links);
  const addLinks = (d: LinkData) =>
    setLinks((l) => ({ names: { ...l.names, ...d.names }, cards: { ...l.cards, ...d.cards }, texts: { ...l.texts, ...d.texts } }));
  return (
    <LinkDataProvider value={links}>
    <main
      className="page-sky min-h-screen bg-background text-foreground"
      style={{ "--sky": `url(${wall})`, "--sky-phone": `url(${wallPhone})` } as CSSProperties}
    >
      {/* Header (Lisa, 21 Nov 2026, "hall of fame needs a cover header image"): the top 10's polaroids as a wall, in the
          photocopy halftone, fading into the page (scripts/page-headers/fade.py, src/assets/hall-of-fame-wall*.webp). */}
      <section className="page-head px-4 text-center">
        <h1 className="timeline-title">
          <span className="timeline-strip timeline-strip-ink">The AFTERPARTY</span>
          <br />
          <span className="timeline-strip timeline-strip-pink">Hall of Fame</span>
        </h1>
        <p className="timeline-tag">The top 100 of the scene, as the guests tell it.</p>
      </section>
      <div className="mx-4 mb-12 max-w-3xl border-2 border-cream bg-card p-5 text-center shadow-[6px_6px_0_0_#111] sm:mx-auto sm:p-6">
        <p className="leading-relaxed text-cream sm:text-lg">
          On top, the 10 who lifted others the most: who gave them a start, stood by them and opened doors for them, as the
          guests tell it on Night Fever. After them, the great connectors - the names dropped in the most AFTERPARTIES.
        </p>
        <p className="mt-4 text-sm">
          <Link to="/hall-of-fame-rules" className="font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:text-pink">How this is calculated →</Link>
        </p>
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-4 pb-16 sm:px-6">
        <section aria-labelledby="top-10" className="space-y-6">
          <h2 id="top-10" className="border-b-[3px] border-gold pb-2 text-3xl font-bold uppercase tracking-tight text-cream sm:text-4xl">The top 10</h2>
          <TopTen top={v.top} />
          <p className="text-sm text-muted-foreground">Tap a name to see who they helped, with every moment. {v.of} people have a Hall of Fame score; the rest see their rank on their own page.</p>
        </section>

        <section aria-labelledby="top-100" className="space-y-6">
          <h2 id="top-100" className="border-b-[3px] border-pink pb-2 text-3xl font-bold uppercase tracking-tight text-cream sm:text-4xl">11 to 100 · Great connectors</h2>
          <p className="max-w-2xl text-muted-foreground">The names dropped in the most AFTERPARTIES, then by mentions - the people who tie the stars together, as on the <Link to="/network" className="text-gold underline underline-offset-2 hover:text-pink">Network</Link>.</p>
          <Rest rest={v.rest} addLinks={addLinks} />
          <div className="flex flex-col items-start gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
            <div className="w-28 shrink-0 sm:w-36"><ConnectorBadge rank={11} /></div>
            <p className="min-w-0 max-w-md">Everyone from 11 to 100 wears the pink badge on their page, the top 10 the gold one. One badge per person.</p>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
    </LinkDataProvider>
  );
}

// The box opens right under the row of the tapped name, like a Library cover opens under its row (Lisa, 21 Nov 2026):
// find the last item on that row (same top edge) and put the box straight after it, across the whole row.
function useRowEnd(items: React.RefObject<(HTMLLIElement | null)[]>, openIdx: number, count: number) {
  const [rowEnd, setRowEnd] = useState(-1);
  useLayoutEffect(() => {
    if (openIdx < 0) return setRowEnd(-1);
    const measure = () => {
      const top = items.current[openIdx]?.offsetTop ?? 0;
      let end = openIdx;
      while (end + 1 < count && (items.current[end + 1]?.offsetTop ?? -1) === top) end++;
      setRowEnd(end);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [openIdx, count]);
  return rowEnd;
}

const own = (name: string) => `${name}${name.endsWith("s") ? "'" : "'s"}`;
const pageLabel = (name: string, guest: boolean, tree = false) =>
  `${own(name)} ${guest ? "AFTERPARTY" : "page"}${tree ? " and family tree" : ""} →`;

function TopTen({ top }: { top: HallOfFameView["top"] }) {
  const links = useLinks();
  const [open, setOpen] = useState<number | null>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const openIdx = open === null ? -1 : open;
  const rowEnd = useRowEnd(items, openIdx, top.length);
  const sel = openIdx >= 0 ? top[openIdx] : undefined;
  const toggle = (i: number) => (ev: React.MouseEvent) => {
    if (!plainClick(ev)) return;
    ev.preventDefault();
    setOpen((o) => (o === i ? null : i));
  };
  return (
    <ol className="grid gap-5 md:grid-cols-2">
      {top.map((t, i) => {
        const card = t.slug ? linkToSlug(links, t.slug) : null;
        return (
          <Fragment key={t.name}>
            <li
              ref={(el) => {
                items.current[i] = el;
              }}
              className={`flex items-center gap-4 border-2 bg-card p-4 sm:gap-5 sm:p-5 ${open === i ? "border-pink" : "border-gold"}`}
            >
              <button type="button" onClick={toggle(i)} className="relative block w-28 shrink-0 cursor-pointer sm:w-36" aria-expanded={open === i} aria-label={`Who ${t.name} helped`}>
                {t.pic ? (
                  <img src={t.pic} alt={t.name} loading="lazy" className="aspect-square w-full border-2 border-pink object-cover" />
                ) : (
                  <span className="block py-4"><HallOfFameBadge rank={t.rank} plain /></span>
                )}
                {t.pic && <span className="absolute -bottom-2 -left-2"><HallOfFameBadge rank={t.rank} small plain /></span>}
              </button>
              <div className="min-w-0 space-y-1.5">
                {card ? (
                  <Link {...card} onClick={toggle(i)} aria-expanded={open === i} className={`block font-[family-name:var(--font-flyer)] text-2xl uppercase leading-tight hover:text-pink sm:text-3xl ${open === i ? "text-pink" : "text-cream"}`}>
                    {t.name}
                  </Link>
                ) : (
                  <button type="button" onClick={toggle(i)} className="block text-left font-[family-name:var(--font-flyer)] text-2xl uppercase leading-tight text-cream hover:text-pink sm:text-3xl">{t.name}</button>
                )}
                <p className="font-[family-name:var(--font-mono-body)] text-xs text-pink">
                  {points(t.score)} points · {t.helped.length} helped · {t.voices} {t.voices === 1 ? "voice" : "voices"}
                </p>
                <p className="text-sm leading-snug text-muted-foreground">Helped {t.helped.join(", ")}</p>
              </div>
            </li>
            {sel && i === rowEnd && (
              <li className="md:col-span-2">
                <MomentsBox
                  name={sel.name}
                  slug={sel.slug}
                  mentions={sel.mentions}
                  moments={sel.moments}
                  link={sel.link}
                  note={<>#{sel.rank} in the Hall of Fame · {points(sel.score)} points · helped {sel.helped.join(", ")}</>}
                  cardLabel={pageLabel(sel.name, sel.guest, true)}
                  onClose={() => setOpen(null)}
                />
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}

function Rest({ rest, addLinks }: { rest: HallOfFameView["rest"]; addLinks: (d: LinkData) => void }) {
  const links = useLinks();
  const [open, setOpen] = useState<number | null>(null);
  const [got, setGot] = useState<Record<string, HofMomentsView>>({});
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const openIdx = open === null ? -1 : open;
  const rowEnd = useRowEnd(items, openIdx, rest.length);
  const sel = openIdx >= 0 ? rest[openIdx] : undefined;
  const openBox = (i: number) => (ev: React.MouseEvent) => {
    if (!plainClick(ev)) return;
    ev.preventDefault();
    if (open === i) return setOpen(null);
    setOpen(i);
    const slug = rest[i]!.slug;
    if (!got[slug])
      getHallOfFameMoments({ data: slug }).then((d) => {
        addLinks(d.links);
        setGot((g) => ({ ...g, [slug]: d }));
      });
  };
  let box: ReactNode = null;
  if (sel) {
    const d = got[sel.slug];
    box = (
      <MomentsBox
        name={sel.name}
        slug={sel.slug}
        mentions={d?.mentions ?? sel.mentions}
        moments={d?.moments ?? []}
        link={d?.link}
        note={<>#{sel.rank} in the top 100{d ? "" : " · loading the moments…"}</>}
        cardLabel={pageLabel(sel.name, sel.guest)}
        onClose={() => setOpen(null)}
      />
    );
  }
  return (
    <ol className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
      {rest.map((p, i) => (
        <Fragment key={p.name}>
          <li
            ref={(el) => {
              items.current[i] = el;
            }}
            className="flex items-baseline gap-3 border-b border-border pb-2"
          >
            <span className="w-8 shrink-0 text-right font-[family-name:var(--font-flyer)] text-xl text-pink">{p.rank}</span>
            <span className="min-w-0">
              <Link
                {...linkToSlug(links, p.slug)}
                onClick={openBox(i)}
                aria-expanded={open === i}
                className={`font-[family-name:var(--font-flyer)] uppercase hover:text-pink ${open === i ? "text-pink" : "text-cream"}`}
              >
                {p.name}
              </Link>
              <span className="block font-[family-name:var(--font-mono-body)] text-[11px] text-muted-foreground">in {p.episodes} AFTERPARTIES · {p.mentions} mentions</span>
            </span>
          </li>
          {box && i === rowEnd && <li className="my-2 sm:col-span-2 lg:col-span-3">{box}</li>}
        </Fragment>
      ))}
    </ol>
  );
}
