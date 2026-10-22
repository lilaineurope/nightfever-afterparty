import { useState } from "react";

/** Lisa's Ko-fi page (one drink = €3, PayPal connected; Lisa, 22 Oct 2026). */
export const KOFI_URL = "https://ko-fi.com/lilaineurope";
/** Ko-fi's own embeddable tip panel (feed hidden). */
const KOFI_PANEL = `${KOFI_URL}/?hidefeed=true&widget=true&embed=true&preview=true`;

/**
 * "Buy the Afterparty a drink" donate box in the footer of every page (Lisa, 22 Oct 2026: Ko-fi instead of Tipeee).
 * Click-to-load: nothing from Ko-fi loads until the visitor presses the button - then Ko-fi's own tip panel opens
 * right here in an iframe and Ko-fi handles the whole payment (privacy page section 3 and 4 say so).
 */
export function TipBox({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <section id="tip" aria-labelledby="tip-heading" className={`scroll-mt-20 ${className}`}>
      <div className="relative mx-auto max-w-3xl border-[3px] border-gold bg-card px-6 py-7 shadow-[8px_10px_0_var(--color-gold)] sm:px-10">
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-5 rotate-[8deg] bg-pink px-4 py-1.5 font-[family-name:var(--font-flyer)] text-2xl uppercase text-pink-foreground sm:-right-6"
        >
          tip!
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-pink">Support the fan page</p>
        <h2 id="tip-heading" className="mt-2 text-3xl leading-[0.95] sm:text-[40px]">
          Buy the Afterparty a drink
        </h2>
        <p className="mt-4 text-base leading-relaxed">
          The site is free, has no ads and is made in my spare time - every Afterparty takes hours of listening, checking
          and building. If you enjoy it, a drink (€3) helps cover the running costs and keeps the next episode coming.
        </p>

        {open ? (
          <div className="mt-6">
            <iframe
              src={KOFI_PANEL}
              title="Tip the Afterparty on Ko-fi"
              loading="lazy"
              className="block h-[640px] w-full max-w-[520px] border-2 border-gold bg-white"
            />
            <p className="mt-3 text-xs text-muted-foreground">
              Ko-fi&rsquo;s own tip panel - Ko-fi and PayPal handle the payment, I never see your card details.{" "}
              <a href={KOFI_URL} target="_blank" rel="noopener noreferrer" className="text-gold">
                Open it on Ko-fi instead <span aria-hidden="true">&#8599;</span>
              </a>
            </p>
          </div>
        ) : (
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 bg-pink px-6 py-3.5 font-semibold uppercase text-pink-foreground transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Buy a drink <span aria-hidden="true">&#127864;</span>
            </button>
            <span className="max-w-md text-xs text-muted-foreground">
              Opens Ko-fi&rsquo;s tip panel right here (from then on Ko-fi&rsquo;s privacy policy applies), or{" "}
              <a href={KOFI_URL} target="_blank" rel="noopener noreferrer" className="text-gold">
                tip on Ko-fi <span aria-hidden="true">&#8599;</span>
              </a>
              . An unofficial fan project - tips support this fan page, not the podcast or World of Wonder.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
