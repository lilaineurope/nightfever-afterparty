/** Lisa's Tipeee page (Classic page: one-off or monthly tips, no goal). */
export const TIPEEE_URL = "https://en.tipeee.com/afterparty";

/**
 * "Tip the fan page" box (Lisa, 21 Oct): a plain link out to Tipeee in the site's own flyer style -
 * no Tipeee script, iframe or cookies on the site; Tipeee handles the whole payment on its own page.
 */
export function TipBox({ className = "" }: { className?: string }) {
  return (
    <section id="tip" aria-labelledby="tip-heading" className={`scroll-mt-20 px-6 py-16 ${className}`}>
      <div className="relative mx-auto max-w-3xl border-[3px] border-gold bg-card px-6 py-8 shadow-[8px_10px_0_var(--color-gold)] sm:px-10">
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-5 rotate-[8deg] bg-pink px-4 py-1.5 font-[family-name:var(--font-flyer)] text-2xl uppercase text-pink-foreground sm:-right-6"
        >
          tip!
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-pink">Support the fan page</p>
        <h2 id="tip-heading" className="mt-2 text-3xl leading-[0.95] sm:text-[42px]">
          Buy the Afterparty a drink
        </h2>
        <p className="mt-4 text-base leading-relaxed">
          The site is free, has no ads and is made in my spare time - every Afterparty takes hours of listening, checking
          and building. If you enjoy it, a tip on Tipeee helps cover the running costs and keeps the next episode coming.
          Once or monthly, any amount, cancel any time.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={TIPEEE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-pink px-6 py-3.5 font-semibold uppercase text-pink-foreground transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Tip on Tipeee <span aria-hidden="true">&#8599;</span>
          </a>
          <span className="text-xs text-muted-foreground">
            Opens Tipeee, which handles the payment. An unofficial fan project - tips support this fan page, not the
            podcast or World of Wonder.
          </span>
        </div>
      </div>
    </section>
  );
}
