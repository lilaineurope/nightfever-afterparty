import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  unsubscribeNewsletter,
} from "@/lib/newsletter.functions";
import { LegalLinks } from "@/components/legal-links";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/unsubscribe")({
  staticData: { sitemap: false },
  validateSearch: (search) => ({
    token: typeof search["token"] === "string" ? search["token"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Unsubscribe | Night Fever fan page" },
      {
        name: "description",
        content: "Leaving the party? Remove your email address from my Night Fever Afterparty newsletter.",
      },
      { property: "og:title", content: "Unsubscribe | Night Fever fan page" },
      {
        property: "og:description",
        content: "Leaving the party? Remove your email address from my Night Fever Afterparty newsletter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: UnsubscribePage,
});

function UnsubscribePage() {
  const { token } = Route.useSearch();
  const unsubscribeFn = useServerFn(unsubscribeNewsletter);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(
    null,
  );
  const [pending, setPending] = useState(false);

  const handleUnsubscribe = () => {
    if (!token) return;
    setPending(true);
    unsubscribeFn({ data: token })
      .then(setResult)
      .finally(() => setPending(false));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-foreground">
      <div className="w-full max-w-md rounded-3xl border border-gold/25 bg-card p-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-cream text-glow">
          Leaving the party?
        </h1>
        {!token && (
          <p className="mt-4 text-sm text-muted-foreground">
            This link is missing its code. Use the unsubscribe link at the
            bottom of the email you received.
          </p>
        )}
        {token && !result && (
          <>
            <p className="mt-4 text-sm text-muted-foreground">
              This removes your email address from the Afterparty list. You can
              always sign up again later.
            </p>
            <button
              type="button"
              onClick={handleUnsubscribe}
              disabled={pending}
              className="mt-6 w-full rounded-xl bg-pink px-5 py-2.5 text-sm font-semibold text-pink-foreground transition hover:bg-pink/90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
            >
              {pending ? "Removing…" : "Remove me from the list"}
            </button>
          </>
        )}
        {result && (
          <div
            className={
              result.ok
                ? "mt-4 rounded-2xl border border-pink/30 bg-pink/10 p-4 text-sm text-pink"
                : "mt-4 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive-foreground"
            }
          >
            {result.message}
          </div>
        )}
        <p className="mt-6 text-xs text-muted-foreground">
          <Link to="/" className="text-gold transition hover:text-pink">
            Back to the party
          </Link>
        </p>
      </div>
      <SiteFooter />    </main>
  );
}
