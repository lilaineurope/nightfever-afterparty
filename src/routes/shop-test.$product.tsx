import { pageHead } from "@/lib/seo";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { MiniMarkdown } from "@/components/mini-markdown";
import wardrobeSample from "@/shop/wardrobe-sample.json";
import networkSample from "@/shop/network-sample.json";
import quizSample from "@/shop/quiz-sample.json";
import wardrobeTests from "@/shop/wardrobe-tests.json";
import networkTests from "@/shop/network-tests.json";
import quizTests from "@/shop/quiz-tests.json";
import wardrobeReadme from "@/shop/wardrobe-readme.md?raw";
import networkReadme from "@/shop/network-readme.md?raw";
import quizReadme from "@/shop/quiz-readme.md?raw";

// Hidden shop sub-pages (not in menu, search or sitemap; noindex): the sample data, test results and docs that come
// with each licensed product. The sample data is invented; the docs are the package README; the test list is the
// package's own test run (src/shop/*-tests.json, refreshed when a package changes).

type Key = "wardrobe" | "network" | "quiz";
type TestRun = { ran: string; tests: { name: string; ok: boolean }[] };

const PRODUCTS: Record<Key, { title: string; sampleTitle: string; tests: TestRun; readme: string }> = {
  wardrobe: { title: "Wardrobe", sampleTitle: "Sample looks", tests: wardrobeTests, readme: wardrobeReadme },
  network: { title: "Network", sampleTitle: "Sample network", tests: networkTests, readme: networkReadme },
  quiz: { title: "Pub Quiz", sampleTitle: "Sample facts", tests: quizTests, readme: quizReadme },
};

export const Route = createFileRoute("/shop-test/$product")({
  staticData: { sitemap: false },
  loader: ({ params }) => {
    if (!(params.product in PRODUCTS)) throw notFound();
    return { key: params.product as Key };
  },
  component: ProductPage,
  head: ({ params }) =>
    pageHead({
      path: `/shop-test/${params.product}`,
      title: `${PRODUCTS[params.product as Key]?.title ?? "Product"} - samples, tests & docs | Night Fever fan page`,
      description: "Sample data, tests and documentation.",
      noindex: true,
    }),
});

const TABS = ["samples", "tests", "docs"] as const;
type Tab = (typeof TABS)[number];

function ProductPage() {
  const { key } = Route.useLoaderData();
  const p = PRODUCTS[key];
  const [tab, setTab] = useState<Tab>("samples");
  const passed = p.tests.tests.filter((t) => t.ok).length;
  const label: Record<Tab, string> = { samples: p.sampleTitle, tests: `Tests (${passed}/${p.tests.tests.length})`, docs: "Docs" };
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-8 pt-16">
        <div className="mx-auto max-w-5xl">
          <Link to="/shop-test" className="text-xs font-medium uppercase tracking-[0.2em] text-gold hover:text-pink">
            ← All engines
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-pink">Licensed software · €29 + VAT</p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight text-cream text-glow">{p.title}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Everything that comes with it, before you buy: the invented sample data it ships with, its own test run and the full documentation.
          </p>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${tab === t ? "border-pink bg-pink text-pink-foreground" : "border-border text-cream hover:border-gold"}`}
              >
                {label[t]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          {tab === "samples" && (key === "wardrobe" ? <WardrobeSamples /> : key === "network" ? <NetworkSamples /> : <QuizSamples />)}
          {tab === "tests" && <Tests run={p.tests} />}
          {tab === "docs" && (
            <article className="rounded-3xl border border-gold/20 bg-card p-6 sm:p-8">
              <MiniMarkdown source={p.readme} />
            </article>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

const CARD = "rounded-2xl border border-gold/20 bg-card p-4";
const Note = ({ children }: { children: React.ReactNode }) => <p className="mb-6 text-sm text-muted-foreground">{children}</p>;

function WardrobeSamples() {
  const { SAMPLE_LOOKS: looks, SAMPLE_DESIGNERS: designers } = wardrobeSample;
  return (
    <>
      <Note>
        {looks.length} invented looks and {designers.length} invented designers ({designers.map((d) => d.name).join(", ")}) - the data the Wardrobe ships with. Replace them with your own.
      </Note>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {looks.map((l) => (
          <li key={l.id} className={CARD}>
            <p className="font-semibold text-gold">{l.label}</p>
            <p className="mt-2 text-sm text-cream/90">{l.text}</p>
            {l.colours && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {l.colours.map((c) => (
                  <span key={c.name} title={`${c.name} ${c.hex}`} className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                    <span className="h-3 w-3 rounded-full border border-white/20" style={{ background: c.hex }} />
                    {c.name}
                  </span>
                ))}
              </div>
            )}
            {l.tags && (
              <p className="mt-3 text-[11px] text-muted-foreground/80">
                {Object.entries(l.tags as Record<string, string[]>).map(([k, v]) => `${k}: ${v.join(", ")}`).join(" · ")}
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

function NetworkSamples() {
  const { hubs, items } = networkSample;
  return (
    <>
      <Note>
        {hubs.length} invented hubs (the stars) and {items.length} invented names (the dots) that link them - the data the Network ships with. Replace them with your own.
      </Note>
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className={CARD}>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-pink">Hubs</h2>
          <ul className="mt-3 space-y-1 text-sm text-cream/90">
            {hubs.map((h) => (
              <li key={h.id}>★ {h.label}</li>
            ))}
          </ul>
        </div>
        <div className={CARD}>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-pink">Names</h2>
          <ul className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
            {items.map((it) => (
              <li key={it.id} className="flex justify-between gap-2">
                <span className="text-cream/90">{it.label}</span>
                <span className="whitespace-nowrap text-xs text-muted-foreground">
                  {it.categories.join(", ")} · {it.hubIds.length} {it.hubIds.length === 1 ? "connection" : "connections"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function QuizSamples() {
  const facts = quizSample.sampleFacts;
  return (
    <>
      <Note>{facts.length} invented facts - the data the Pub Quiz ships with. Only a name and a category are required; years, places, people and sources unlock more question types.</Note>
      <ul className="grid gap-4 sm:grid-cols-2">
        {facts.map((f) => (
          <li key={f.id} className={CARD}>
            <p className="flex justify-between gap-2">
              <span className="font-semibold text-gold">{f.name}</span>
              <span className="text-xs text-muted-foreground">{f.category}</span>
            </p>
            {"context" in f && f.context && <p className="mt-2 text-sm text-cream/90">{f.context}</p>}
            <p className="mt-2 text-[11px] text-muted-foreground/80">
              {[("year" in f && f.year) || null, ("place" in f && f.place) || null, "people" in f && f.people ? (f.people as string[]).join(", ") : null].filter(Boolean).join(" · ")}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function Tests({ run }: { run: TestRun }) {
  const passed = run.tests.filter((t) => t.ok).length;
  return (
    <>
      <Note>
        {passed} of {run.tests.length} tests passing (last run {new Date(run.ran).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}). The tests come with the code, so you can run them yourself with <code className="text-gold">npm test</code>.
      </Note>
      <ol className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {run.tests.map((t, i) => (
          <li key={i} className="flex items-start gap-3 px-5 py-3 text-sm">
            <span className={t.ok ? "text-gold" : "text-pink"}>{t.ok ? "✓" : "✗"}</span>
            <span className="text-cream/90">{t.name}</span>
          </li>
        ))}
      </ol>
    </>
  );
}
