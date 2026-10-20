import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import wardrobeImg from "@/assets/cards/wardrobe.jpg";
import networkImg from "@/assets/cards/connections.jpg";
import quizImg from "@/assets/cards/quiz.jpg";

// TEST ONLY - a hidden page for trying Creem's checkout in test mode (research for selling Fredrik's Amaze plugin).
// Not in the menu, search or sitemap, and noindex. No real money moves: each Buy button opens a Creem TEST-mode
// payment link. Three standalone licensed-software products, each its own private GitHub repo - never a bundle.
// Before anything is sold for real: Terms (drop "non-commercial", add sales terms), Privacy (Creem as payment
// provider) and Under the hood (Creem) must be updated in the same change.
export const Route = createFileRoute("/shop-test/")({
  staticData: { sitemap: false },
  component: ShopTestPage,
  head: () =>
    pageHead({
      path: "/shop-test",
      title: "Shop test | Night Fever fan page",
      description: "Test page for the checkout - nothing is for sale.",
      noindex: true,
    }),
});

type Product = {
  key: "wardrobe" | "network" | "quiz";
  title: string;
  img: string;
  demo: "/wardrobe" | "/network" | "/quiz";
  price: string;
  blurb: string;
  gets: string[];
};

/** Paste each product's payment link from Creem here (Test Mode on -> Products -> the product -> Share). Empty = button disabled. */
export const CREEM_TEST_LINKS: Record<Product["key"], string> = {
  wardrobe: "https://www.creem.io/test/payment/prod_2cEC2uqObUjwLvchuKs4kr",
  network: "https://www.creem.io/test/payment/prod_7Ijfq9iRSSgHdzSmlqu0Lh",
  quiz: "https://www.creem.io/test/payment/prod_4aQAXEEoIfQETkPufJDRGd",
};

const PRODUCTS: Product[] = [
  {
    key: "wardrobe",
    title: "Wardrobe",
    img: wardrobeImg,
    demo: "/wardrobe",
    price: "€49",
    blurb: "The dress-up generator: turns any collection of described looks into rails of pieces and dresses a figure by person, place, designer, mood or colour.",
    gets: ["Outfit engine (TypeScript)", "React wardrobe with the figure and garment drawings", "Sample looks, tests and docs"],
  },
  {
    key: "network",
    title: "Network",
    img: networkImg,
    demo: "/network",
    price: "€49",
    blurb: "The connection graph: stars for your shows, events or projects, dots for every name they share - filter, search, zoom, tap to light up the links and open.",
    gets: ["Graph and ranking engine (TypeScript, d3-force)", "Interactive React graph and top-10 lists", "Sample data, tests and docs"],
  },
  {
    key: "quiz",
    title: "Pub Quiz",
    img: quizImg,
    demo: "/quiz",
    price: "€49",
    blurb: "The quiz generator: feed it your facts and it writes a fresh ten-question quiz every time, with believable wrong answers and the source for each one.",
    gets: ["Quiz engine (TypeScript)", "React quiz with score and answers", "Sample facts, tests and docs"],
  },
];

function ShopTestPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-pink/50 bg-pink px-4 py-2 text-center text-sm font-semibold text-pink-foreground">
        TEST MODE - nothing is for sale and no real money moves. Pay with the test card 4111 1111 1111 1111, any future date, any CVC.
      </div>
      <section className="disco-grid px-6 pb-10 pt-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Shop · test</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-cream text-glow sm:text-6xl">
          The <span className="text-pink text-glow-pink">engines</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          The code behind three of the Afterparty&rsquo;s pages, each sold on its own as licensed software - one license
          key per project. You get the code, not the Night Fever data: bring your own.
        </p>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {PRODUCTS.map((p) => {
            const link = CREEM_TEST_LINKS[p.key];
            return (
              <article key={p.key} className="flex flex-col overflow-hidden rounded-3xl border border-gold/25 bg-card">
                <img src={p.img} alt="" width={640} height={400} className="aspect-[16/10] w-full object-cover" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Licensed software</p>
                  <h2 className="mt-2 text-3xl font-bold text-cream">{p.title}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{p.blurb}</p>
                  <ul className="mt-4 flex-1 space-y-1 text-sm text-cream/90">
                    {p.gets.map((g) => (
                      <li key={g}>· {g}</li>
                    ))}
                  </ul>
                  <Link to={p.demo} className="mt-4 text-sm text-gold underline underline-offset-2 hover:text-pink">
                    See it running on the Afterparty →
                  </Link>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-3xl font-bold text-gold">{p.price}</span>
                    {link ? (
                      <a href={link} className="rounded-full bg-pink px-5 py-2.5 font-semibold text-pink-foreground transition hover:opacity-90">
                        Buy (test) →
                      </a>
                    ) : (
                      <span className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground">Waiting for the Creem link</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] leading-snug text-muted-foreground/80">
          Checkout runs on Creem&rsquo;s own page. After paying you come back to a thank-you page here, and Creem emails the
          license key and the receipt.
        </p>
        <p className="mt-6 text-center text-sm">
          <Link to="/" className="text-gold underline underline-offset-2 hover:text-pink">← Back to the fan page</Link>
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
