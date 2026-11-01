import { entityBySlug, afterpartyOf } from "@/data/entities";
import { episodePath } from "@/data/episodes";

/** Where a name links: a guest with an AFTERPARTY goes to their one page (the episode page), everyone else to
 *  their A–Z card. Spread into a Link: <Link {...cardTo(slug)}>. */
export function cardTo(slug: string) {
  const ep = afterpartyOf(entityBySlug[slug]);
  if (ep) return { to: episodePath(ep) } as const;
  return { to: "/explore/$slug", params: { slug } } as const;
}

/** The same as a plain path string (for search, JSON-LD and the sitemap). */
export function cardPath(slug: string): string {
  const ep = afterpartyOf(entityBySlug[slug]);
  return ep ? episodePath(ep) : `/explore/${slug}`;
}
