import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";

/**
 * Cookie-free visitor counting with GoatCounter, on the published site only.
 * Opening any page with ?me switches counting off for that browser (stored in
 * localStorage under "skipgc", the key GoatCounter's own script also honours);
 * ?me=off switches it back on.
 */
const GOATCOUNTER_CODE = "";
const COUNTED_HOSTS = ["nightfever-afterparty.lovable.app"];
const SKIP_KEY = "skipgc";

type GoatCounter = { count?: (vars: { path: string }) => void; no_onload?: boolean };
declare global {
  interface Window {
    goatcounter?: GoatCounter;
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

    const count = () => {
      if (readSkip()) return;
      window.goatcounter?.count?.({ path: window.location.pathname });
    };

    window.goatcounter = { no_onload: true };
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://gc.zgo.at/count.js";
    script.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
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
