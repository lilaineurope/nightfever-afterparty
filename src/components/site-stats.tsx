import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";

/**
 * Cookie-free visitor counting with GoatCounter, on the published site only.
 * Opening any page with ?me switches counting off for that browser (stored in
 * localStorage under "skipgc", the key GoatCounter's own script also honours);
 * ?me=off switches it back on.
 */
const GOATCOUNTER_CODE = "lilaineurope";
const COUNTED_HOSTS = ["nightfever-afterparty.lovable.app", "nightfever-afterparty.com", "www.nightfever-afterparty.com"];
const SKIP_KEY = "skipgc";
/** Plausible (Lisa, 31 Oct 2026): EU-hosted, cookie-free analytics - time on page, entry/exit pages, outbound clicks.
 *  Her site script from plausible.io; it follows the router's page changes itself. Skipped for ?me browsers like GoatCounter. */
const PLAUSIBLE_SRC = "https://plausible.io/js/pa-fB-Vi6hBVUM32aTz6o8YA.js";
type PlausibleFn = ((...a: unknown[]) => void) & { q?: unknown[][]; o?: unknown; init?: (o?: unknown) => void };

type GoatCounter = { count?: (vars: { path: string }) => void; no_onload?: boolean };
declare global {
  interface Window {
    goatcounter?: GoatCounter;
    plausible?: PlausibleFn;
  }
}

function readSkip(): boolean {
  try {
    return window.localStorage.getItem(SKIP_KEY) === "t";
  } catch {
    return false;
  }
}

function writeSkip(on: boolean) {
  try {
    if (on) window.localStorage.setItem(SKIP_KEY, "t");
    else window.localStorage.removeItem(SKIP_KEY);
  } catch {
    /* storage blocked: nothing to remember */
  }
}

export function SiteStats() {
  const router = useRouter();
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has("me")) {
      const off = url.searchParams.get("me") === "off";
      writeSkip(!off);
      setNotice(
        off
          ? "Counting is back on for this browser."
          : "Got it - your visits in this browser are no longer counted.",
      );
      url.searchParams.delete("me");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }

    if (!GOATCOUNTER_CODE || !COUNTED_HOSTS.includes(window.location.hostname) || readSkip()) return;

    if (!window.plausible) {
      const p: PlausibleFn = Object.assign((...a: unknown[]) => { (p.q = p.q || []).push(a); }, {});
      p.init = (o?: unknown) => { p.o = o || {}; };
      window.plausible = p;
      window.plausible.init?.();
      const ps = document.createElement("script");
      ps.async = true;
      ps.src = PLAUSIBLE_SRC;
      document.head.appendChild(ps);
    }

    const count = () => {
      if (readSkip()) return;
      window.goatcounter?.count?.({ path: window.location.pathname });
    };

    window.goatcounter = { no_onload: true };
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://gc.zgo.at/count.js";
    script.setAttribute("data-goatcounter", `https://${GOATCOUNTER_CODE}.goatcounter.com/count`);
    script.onload = count;
    document.body.appendChild(script);

    let last = window.location.pathname;
    const unsubscribe = router.subscribe("onResolved", () => {
      if (window.location.pathname === last) return;
      last = window.location.pathname;
      count();
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(t);
  }, [notice]);

  if (!notice) return null;
  return (
    <div role="status"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-gold/40 bg-card px-5 py-2 text-sm text-cream shadow-lg">
      {notice}
    </div>
  );
}
