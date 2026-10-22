/** Lisa's Tipeee page (Lisa, 22 Oct 2026: back to Tipeee - cards go through Adyen, an EU payment company). */
export const TIPEEE_URL = "https://en.tipeee.com/afterparty";

/**
 * The original Tipeee box ("Buy the Afterparty a drink", as on 21 Oct) on the right of the footer on every page
 * (Lisa, 22 Oct 2026) - its "Tip on Tipeee" button is a plain link. No Tipeee script, iframe or cookies on the site; Tipeee
 * handles the whole payment on its own page (Privacy section 4, Terms quick facts and Under the hood say so).
 */
export function TipBox({ className = "" }: { className?: string }) {
  return (
    <section id="tip" aria-labelledby="tip-heading" className={`scroll-mt-20 ${className}`}>
      <div className="relative w-full max-w-[460px] border-[3px] border-gold bg-card px-6 py-7 shadow-[8px_10px_0_var(--color-gold)] sm:px-8">
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-5 rotate-[8deg] bg-pink px-4 py-1.5 font-[family-name:var(--font-flyer)] text-2xl uppercase text-pink-foreground"
        >
          tip!
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-pink">Support the fan page</p>
        <h2 id="tip-heading" className="mt-2 text-3xl leading-[0.95]">
          Buy the Afterparty a drink
        </h2>
        <p className="mt-4 text-sm leading-relaxed">
          The site is free, has no ads and is made in my spare time - every Afterparty takes hours of listening, checking
          and building. If you enjoy it, a tip on Tipeee helps cover the running costs and keeps the next episode coming.
          Once or monthly, any amount, cancel any time.
        </p>
        <a
          href={TIPEEE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 bg-pink px-6 py-3.5 font-semibold uppercase text-pink-foreground transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          Tip on Tipeee <span aria-hidden="true">&#8599;</span>
        </a>
        <p className="mt-4 text-xs text-muted-foreground">
          Opens Tipeee, which handles the payment (cards through Adyen, or PayPal). An unofficial fan project - tips
          support this fan page, not the podcast or World of Wonder.
        </p>
      </div>
    </section>
  );
}
