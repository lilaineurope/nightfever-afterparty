import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter } from "@/components/site-footer";

import { WEB3FORMS_KEY } from "@/lib/web3forms";
import { CONTACT_TOPICS } from "@/lib/pages";

type Search = { about?: string };

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  validateSearch: (s: Record<string, unknown>): Search =>
    typeof s["about"] === "string" ? { about: (s["about"] as string).slice(0, 120) } : {},
  component: ContactPage,
  head: () => pageHead({ path: "/contact", title: "Contact | Night Fever fan page", description: "Spotted something wrong, know where a lost club was, or just want to say hi? Send me a message!", image: "/og/home.jpg" }),
});

// The pages a message can be about - built from the one page list (src/lib/pages.ts), so it never goes stale.
const TOPICS = CONTACT_TOPICS;

const FIELD =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-cream placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none";

function ContactPage() {
  const { about } = Route.useSearch();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    if (form.get("botcheck")) return; // spam trap
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Night Fever fan page: ${form.get("about") || "message"}`,
          from_name: "Night Fever fan page",
          name: form.get("name"),
          email: form.get("email"),
          about: form.get("about"),
          message: form.get("message"),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      setState(res.ok && json.success ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-12 pt-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Contact</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-cream text-glow sm:text-6xl">
          Send me a <span className="text-pink text-glow-pink">message</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Know where a lost club was? Spotted a wrong name or a broken link? Or just want to say hi? Write to me here - it lands straight in my inbox!
        </p>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-xl rounded-3xl border border-gold/25 bg-card p-6 sm:p-8">
          {state === "sent" ? (
            <div className="text-center">
              <p className="text-2xl font-bold text-cream">Thank you!</p>
              <p className="mt-3 text-muted-foreground">Your message is on its way. I'll get back to you as soon as I can.</p>
              <Link to="/map" className="mt-6 inline-block text-gold underline underline-offset-2 hover:text-pink">
                Back to the map
              </Link>
            </div>
          ) : !WEB3FORMS_KEY ? (
            <p className="text-center text-muted-foreground">
              The contact form is switching on very soon - in the meantime you can find me on{" "}
              <a href="https://www.instagram.com/lilaineurope/" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2 hover:text-pink">
                Instagram
              </a>
              .
            </p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <span className="text-sm text-muted-foreground">Your name</span>
                <input name="name" required maxLength={120} className={`mt-1 ${FIELD}`} />
              </label>
              <label className="block">
                <span className="text-sm text-muted-foreground">Your email, so I can reply</span>
                <input name="email" type="email" required maxLength={255} className={`mt-1 ${FIELD}`} />
              </label>
              <label className="block">
                <span className="text-sm text-muted-foreground">What it's about</span>
                <span className="relative mt-1 block">
                <select name="about" required defaultValue={about ?? ""} className={`appearance-none pr-10 [color-scheme:light] ${FIELD}`}>
                  <option value="" disabled>Pick a page</option>
                  {about && !TOPICS.includes(about) && <option value={about}>{about}</option>}
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg>
                </span>
              </label>
              <label className="block">
                <span className="text-sm text-muted-foreground">Your message</span>
                <textarea name="message" required rows={6} maxLength={5000} className={`mt-1 ${FIELD}`} />
              </label>
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <p className="text-xs text-muted-foreground">
                Your name, email and message are sent to my inbox only, to answer you. More in the{" "}
                <Link to="/privacy" className="text-gold underline underline-offset-2 hover:text-pink">privacy policy</Link>.
              </p>
              <button type="submit" disabled={state === "sending"}
                className="w-full rounded-full bg-pink px-6 py-3 font-semibold text-pink-foreground transition hover:opacity-90 disabled:opacity-60">
                {state === "sending" ? "Sending..." : "Send message"}
              </button>
              {state === "error" && (
                <p className="text-center text-sm text-pink">Oops - that didn't go through. Please try again in a moment!</p>
              )}
            </form>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
