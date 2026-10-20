import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { LOCATIONS } from "@/data/locations";
import mapImg from "@/assets/cards/map.jpg";

// TEST ONLY - a hidden page for trying Creem's checkout in test mode (research for selling Amaze).
// Not in the menu, search or sitemap, and noindex. No real money moves: the button opens a Creem TEST-mode payment link.
// Before anything is sold for real: Terms (drop "non-commercial", add sales terms), Privacy (Creem as payment provider)
// and Under the hood (Creem) must be updated in the same change.
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

/** Paste the payment link from Creem here (Test Mode on -> Products -> the product -> Share). Empty = button disabled. */
export const CREEM_TEST_LINK = "";

const PRODUCT = {
  title: "New York clubs, then and now",
  kind: "Research guide · PDF",
  price: "€4.90",
  blurb:
    "Every club, bar and after-hours spot named on the Afterparty so far - where it was, when it was open, what it is today - with the map pinned out street by street. Researched and written by me.",
};

function ShopTestPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-pink/50 bg-pink px-4 py-2 text-center text-sm font-semibold text-pink-foreground">
        TEST MODE - nothing is for sale and no real money moves. Pay with the test card 4111 1111 1111 1111, any future date, any CVC.
      </div>
      <section className="disco-grid px-6 pb-10 pt-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Shop · test</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-cream text-glow sm:text-6xl">
          My own <span className="text-pink text-glow-pink">research</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          A trial run of the checkout. The guide below is a stand-in to see how buying, paying and getting the file work.
        </p>
      </section>

      <section className="px-6 pb-24">
        <article className="mx-auto grid max-w-4xl overflow-hidden rounded-3xl border border-gold/25 bg-card md:grid-cols-2">
          <img src={mapImg} alt="" width={640} height={400} className="h-full min-h-[240px] w-full object-cover" />
          <div className="flex flex-col p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{PRODUCT.kind}</p>
            <h2 className="mt-2 text-3xl font-bold text-cream">{PRODUCT.title}</h2>
            <p className="mt-4 flex-1 text-muted-foreground">{PRODUCT.blurb}</p>
            <p className="mt-4 text-sm text-muted-foreground">{LOCATIONS.length} places on the map so far.</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-3xl font-bold text-gold">{PRODUCT.price}</span>
              {CREEM_TEST_LINK ? (
                <a href={CREEM_TEST_LINK} className="rounded-full bg-pink px-6 py-3 font-semibold text-pink-foreground transition hover:opacity-90">
                  Buy (test) →
                </a>
              ) : (
                <span className="rounded-full border border-border px-6 py-3 text-sm text-muted-foreground">Waiting for the Creem test link</span>
              )}
            </div>
            <p className="mt-4 text-[11px] leading-snug text-muted-foreground/80">
              Checkout runs on Creem&rsquo;s own page. After paying you come back to a thank-you page here.
            </p>
          </div>
        </article>
        <p className="mt-8 text-center text-sm">
          <Link to="/" className="text-gold underline underline-offset-2 hover:text-pink">← Back to the fan page</Link>
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
