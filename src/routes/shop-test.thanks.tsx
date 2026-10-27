import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";

// TEST ONLY - where Creem sends a buyer back after a test purchase (set as the product's return/success URL:
// https://nightfever-afterparty.com/shop-test/thanks). Creem adds checkout_id, order_id, customer_id and
// product_id to the address; they are only shown here so the test run can be checked, never stored.
type Search = { checkout_id?: string; order_id?: string; product_id?: string };
const pick = (s: Record<string, unknown>, k: string) => (typeof s[k] === "string" ? (s[k] as string).slice(0, 80) : undefined);

export const Route = createFileRoute("/shop-test/thanks")({
  staticData: { sitemap: false },
  validateSearch: (s: Record<string, unknown>): Search => {
    const out: Search = {};
    for (const k of ["checkout_id", "order_id", "product_id"] as const) {
      const v = pick(s, k);
      if (v) out[k] = v;
    }
    return out;
  },
  component: ThanksPage,
  head: () => pageHead({ path: "/shop-test/thanks", title: "Thank you | Night Fever fan page", description: "Test purchase.", noindex: true }),
});

function ThanksPage() {
  const q = Route.useSearch();
  const got = Object.entries(q);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-pink/50 bg-pink px-4 py-2 text-center text-sm font-semibold text-pink-foreground">
        TEST MODE - no real money moved.
      </div>
      <section className="disco-grid px-6 pb-24 pt-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-cream text-glow">
          Thank you, <span className="text-pink text-glow-pink">darling!</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Your license is on its way - Creem emails the license key, the download and the receipt.
        </p>
        {got.length > 0 ? (
          <dl className="mx-auto mt-8 max-w-md rounded-2xl border border-gold/25 bg-card p-5 text-left text-sm">
            {got.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-1">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="truncate font-mono text-cream">{v}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">(No order details came back with this visit.)</p>
        )}
        <p className="mt-10">
          <Link to="/shop-test" className="text-gold underline underline-offset-2 hover:text-pink">← Back to the test shop</Link>
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
