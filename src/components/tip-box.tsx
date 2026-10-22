import drinkBadge from "@/assets/afterparty-drink-badge.png";

/** Lisa's Tipeee page (Lisa, 22 Oct 2026: back to Tipeee - cards go through Adyen, an EU payment company). */
export const TIPEEE_URL = "https://en.tipeee.com/afterparty";

/**
 * "Buy a drink for the Afterparty team" box on the right of the footer on every page (the Ko-fi-era design with the
 * round cocktail badge, now for Tipeee - Lisa, 23 Oct 2026):
 * drawn in the site's own flyer style - the pink drink badge (never Lisa's face), the title, once or monthly, any amount -
 * and a pink "tip!" button that is a plain link to Tipeee. No Tipeee script, iframe or cookies on the site; Tipeee
 * handles the whole payment on its own page (Privacy section 4, Terms quick facts and Under the hood say so).
 */
export function TipBox({ className = "" }: { className?: string }) {
  return (
    <section id="tip" aria-labelledby="tip-heading" className={`scroll-mt-20 ${className}`}>
      <h2 id="tip-heading" className="sr-only">
        Buy the Afterparty a drink
      </h2>
      <div className="relative w-full max-w-[400px] border-[3px] border-gold bg-card px-6 py-6 shadow-[8px_10px_0_var(--color-gold)]">
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-5 rotate-[8deg] bg-pink px-3 py-1 font-[family-name:var(--font-flyer)] text-xl uppercase text-pink-foreground"
        >
          tip!
        </span>
        <img src={drinkBadge} alt="" width={88} height={88} className="mx-auto block h-[88px] w-[88px] rounded-full" />
        <p className="mt-3 text-center font-[family-name:var(--font-flyer)] text-lg uppercase leading-tight">
          Buy a drink for the Afterparty team
        </p>
        <div className="mt-4 flex border-2 border-gold text-center text-sm">
          <span className="flex-1 py-2">Once</span>
          <span className="flex-1 border-l-2 border-gold py-2">or monthly</span>
        </div>
        <p className="mt-4 flex items-center gap-2">
          <span aria-hidden="true" className="text-2xl">
            &#127864;
          </span>
          <span>Any amount - you choose it on Tipeee</span>
        </p>
        <a
          href={TIPEEE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block w-full bg-pink py-3.5 text-center font-[family-name:var(--font-flyer)] text-lg uppercase text-pink-foreground transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          tip! <span aria-hidden="true">&#8599;</span>
        </a>
        <p className="mt-3 text-center text-xs text-muted-foreground">Opens my page on Tipeee, which handles the payment.</p>
      </div>
      <p className="mt-5 max-w-[400px] text-xs leading-relaxed text-muted-foreground">
        Tips go through Tipeee (France) - cards via Adyen, or PayPal - and I never see your card details. An unofficial fan
        project: tips support this fan page, not the podcast or World of Wonder.
      </p>
    </section>
  );
}
