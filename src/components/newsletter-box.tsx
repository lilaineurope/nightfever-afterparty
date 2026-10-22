import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { subscribeNewsletter } from "@/lib/newsletter.functions";

/**
 * "Join the Afterparty!" newsletter sign-up, in the footer of every page (Lisa, 23 Oct 2026 - it used to sit at the
 * bottom of the home page). Same consent rules as before: nothing is stored without the ticked box (Privacy Policy).
 */
export function NewsletterBox({ className = "" }: { className?: string }) {
  const subscribeFn = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !consent) return;
    setPending(true);
    subscribeFn({ data: { email: email.trim(), consent: true } })
      .then((res) => {
        setResult(res);
        if (res.ok) {
          setEmail("");
          setConsent(false);
        }
      })
      .finally(() => setPending(false));
  };

  return (
    <section id="newsletter" aria-labelledby="newsletter-heading" className={`scroll-mt-20 ${className}`}>
      <div className="relative w-full border-[3px] border-gold bg-card px-6 py-7 shadow-[8px_10px_0_var(--color-gold)] sm:px-8">
        <h2 id="newsletter-heading" className="text-3xl leading-[0.95]">
          Join the <span className="text-pink">Afterparty!</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed">
          Want a heads-up when a new Afterparty goes up? I&rsquo;ll send episode reminders, guest highlights and fan
          notes straight to your inbox.
        </p>
        {result ? (
          <div className={`mt-5 border-2 p-4 text-sm ${result.ok ? "border-pink text-pink" : "border-destructive text-destructive"}`}>
            <p className="font-semibold">{result.message}</p>
            {result.ok && (
              <p className="mt-1 text-xs">
                I store your address with the moment you agreed. You can unsubscribe any time with the link in every
                email.
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-5 flex flex-col gap-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="min-w-0 flex-1 border-2 border-gold bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
              />
              <button
                type="submit"
                disabled={pending}
                className="whitespace-nowrap border-2 border-pink bg-pink px-4 py-2.5 text-xs font-semibold uppercase text-pink-foreground transition hover:bg-card hover:text-cream disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
              >
                {pending ? "Signing you up…" : "Count me in!"}
              </button>
            </div>
            <label htmlFor="newsletter-consent" className="flex items-start gap-2.5 text-left text-xs leading-relaxed text-muted-foreground">
              <input
                id="newsletter-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-pink"
              />
              <span>
                I want to receive the Night Fever Afterparty newsletter and I understand my email address is stored only
                for this list. I can unsubscribe any time with the link in every email. See the{" "}
                <Link to="/privacy" className="text-gold">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </form>
        )}
      </div>
    </section>
  );
}
