import { useState } from "react";
import drinkBadge from "@/assets/afterparty-drink-badge.png";

/** Lisa's Ko-fi page (one drink = €1, PayPal connected; Lisa, 22 Oct 2026). */
export const KOFI_URL = "https://ko-fi.com/lilaineurope";
/** Ko-fi's own embeddable tip panel (feed hidden). */
const KOFI_PANEL = `${KOFI_URL}/?hidefeed=true&widget=true&embed=true&preview=true`;
const PRICE = 1;

const STEP =
  "grid h-10 w-10 place-items-center border-2 border-gold bg-card font-[family-name:var(--font-flyer)] text-lg transition hover:bg-pink hover:text-pink-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink disabled:opacity-40";

/**
 * "Buy the Afterparty a drink" box at the top of the footer on every page (Lisa, 22 Oct 2026, version A):
 * a tip panel drawn in the site's own flyer style - the drink badge (never Lisa's face), "Buy a drink for the
 * Afterparty team", one time / monthly, € each with - n +, and a pink Tip button. Nothing from Ko-fi loads until
 * Tip is pressed; then Ko-fi's own panel opens in its place (it can't take the amount over, so the visitor's
 * choice is repeated above it) and Ko-fi + PayPal handle the payment. Privacy sections 3 and 4 say so.
 */
export function TipBox({ className = "" }: { className?: string }) {
  const [qty, setQty] = useState(1);
  const [monthly, setMonthly] = useState(false);
  const [open, setOpen] = useState(false);
  const total = qty * PRICE;

  return (
    <section id="tip" aria-labelledby="tip-heading" className={`scroll-mt-20 ${className}`}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-12">
        <div className="flex-1">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-pink">Support the fan page</p>
          <h2 id="tip-heading" className="mt-2 text-3xl leading-[0.95] sm:text-[40px]">
            Buy the Afterparty a drink
          </h2>
          <p className="mt-4 text-base leading-relaxed">
            The site is free, has no ads and is made in my spare time - every Afterparty takes hours of listening,
            checking and building. A drink helps cover the running costs and keeps the next episode coming.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Tips go through Ko-fi and PayPal - I never see your card details. An unofficial fan project: tips support
            this fan page, not the podcast or World of Wonder.
          </p>
        </div>

        <div className="relative w-full max-w-[400px] border-[3px] border-gold bg-card px-6 py-6 shadow-[8px_10px_0_var(--color-gold)]">
          <span
            aria-hidden="true"
            className="absolute -right-3 -top-5 rotate-[8deg] bg-pink px-3 py-1 font-[family-name:var(--font-flyer)] text-xl uppercase text-pink-foreground"
          >
            tip!
          </span>

          {open ? (
            <div>
              <p className="mb-3 text-sm leading-snug">
                You picked {qty} {qty === 1 ? "drink" : "drinks"} (€{total}){monthly ? ", monthly" : ""} - set the
                same in Ko-fi&rsquo;s panel below.
              </p>
              <iframe
                src={KOFI_PANEL}
                title="Tip the Afterparty on Ko-fi"
                className="block h-[620px] w-full border-2 border-gold bg-white"
              />
              <p className="mt-3 text-xs text-muted-foreground">
                Ko-fi&rsquo;s own panel - from here Ko-fi&rsquo;s privacy policy applies.{" "}
                <a href={KOFI_URL} target="_blank" rel="noopener noreferrer" className="text-gold">
                  Open it on Ko-fi <span aria-hidden="true">&#8599;</span>
                </a>
              </p>
            </div>
          ) : (
            <div>
              <img
                src={drinkBadge}
                alt=""
                width={88}
                height={88}
                className="mx-auto block h-[88px] w-[88px] rounded-full"
              />
              <p className="mt-3 text-center font-[family-name:var(--font-flyer)] text-lg uppercase leading-tight">
                Buy a drink for the Afterparty team
              </p>

              <div role="group" aria-label="How often" className="mt-4 flex border-2 border-gold">
                {[
                  ["One time", false],
                  ["Monthly", true],
                ].map(([label, value]) => (
                  <button
                    key={String(label)}
                    type="button"
                    aria-pressed={monthly === value}
                    onClick={() => setMonthly(value as boolean)}
                    className={`flex-1 py-2 text-sm transition ${monthly === value ? "bg-gold text-gold-foreground" : "hover:bg-pink hover:text-pink-foreground"}`}
                  >
                    {label as string}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span aria-hidden="true" className="text-2xl">
                  &#127864;
                </span>
                <span className="flex-1">€{PRICE} each</span>
                <button type="button" aria-label="One drink less" className={STEP} disabled={qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  &minus;
                </button>
                <span aria-live="polite" className="grid h-10 w-12 place-items-center border-2 border-gold text-lg">
                  {qty}
                </span>
                <button type="button" aria-label="One drink more" className={STEP} disabled={qty >= 99} onClick={() => setQty((q) => Math.min(99, q + 1))}>
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="mt-4 block w-full bg-pink py-3.5 font-[family-name:var(--font-flyer)] text-lg uppercase text-pink-foreground transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Tip €{total}
                {monthly ? " a month" : ""}
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Opens Ko-fi&rsquo;s secure panel right here - or{" "}
                <a href={KOFI_URL} target="_blank" rel="noopener noreferrer" className="text-gold">
                  tip on Ko-fi <span aria-hidden="true">&#8599;</span>
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
