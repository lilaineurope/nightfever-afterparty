import { Link, useMatches } from "@tanstack/react-router";
import { abs } from "@/lib/seo";
import { breadcrumbsFor, type Crumb } from "@/lib/breadcrumbs";

// Breadcrumb trail on every page (Lisa, 27 Nov 2026: "A4 should apply to all pages"): a small "Home › A–Z › CBGB" line
// under the top menu, sent to Google as BreadcrumbList too. Every page gets two or three more links up the site, and
// Google shows the trail in the result instead of the bare address. The trail itself is worked out in src/lib/breadcrumbs.ts.
export function Breadcrumbs() {
  const matches = useMatches();
  const last = matches[matches.length - 1];
  if (!last) return null;
  const crumbs = breadcrumbsFor(last.pathname, last.loaderData as Record<string, unknown> | undefined);
  if (crumbs.length < 2) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c: Crumb, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.to ? { item: abs(c.to) } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border/60 bg-background">
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-1.5 gap-y-0.5 px-3 py-1.5 font-[family-name:var(--font-mono-body)] text-[11px] uppercase tracking-wide text-cream/60 xl:px-4">
        {crumbs.map((c, i) => (
          <li key={`${i}-${c.name}`} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-pink">›</span>}
            {c.to && i < crumbs.length - 1 ? (
              <Link to={c.to.split("?")[0]!} search={(c.to.includes("?") ? Object.fromEntries(new URLSearchParams(c.to.split("?")[1])) : {}) as never} className="transition hover:text-pink focus-visible:text-pink focus-visible:outline-none">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="truncate text-cream/85">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
    </nav>
  );
}
