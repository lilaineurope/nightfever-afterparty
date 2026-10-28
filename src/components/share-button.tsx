import { useState } from "react";

/**
 * One Share button (Lisa, 28 Oct 2026) - no social-media scripts or share widgets: on phones it opens the phone's own
 * share sheet (WhatsApp, Messages, Instagram...), elsewhere it copies the link. Nothing is sent anywhere by the site.
 */
export function ShareButton({ path, title, className, label = "Share ↗" }: { path: string; title: string; className?: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = `${window.location.origin}${path}`;
    try {
      if (navigator.share) return await navigator.share({ title, url });
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* the share sheet was closed */
    }
  };
  return (
    <button type="button" className={className} onClick={() => void share()}>
      {copied ? "Link copied ✓" : label}
    </button>
  );
}
