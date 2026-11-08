// The [.] in this file name is TanStack Router's escape for a literal dot, so the route is served at /sitemap.xml.
import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";
import { entities, inSitemap } from "@/data/entities";
import { episodePath, episodes } from "@/data/episodes";
import { publishedDay } from "@/lib/seo";

// The public site origin.
const BASE_URL = "https://nightfever-afterparty.com";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        if (!BASE_URL) {
          return new Response("Sitemap domain not configured", {
            status: 503,
            headers: { "Cache-Control": "no-store" },
          });
        }
        const router = await getRouterInstance();
        // lastmod (SEO check, 4 Nov 2026): an episode page changes when its AFTERPARTY goes up; Home and the
        // Afterparty list change with the newest one. Other pages have no reliable date, so they go without.
        const dated = episodes.flatMap((e) => {
          const day = publishedDay(e.afterpartyPublished);
          return day ? [[episodePath(e.id), day] as [string, string]] : [];
        });
        const lastmod = new Map<string, string>(dated);
        const newest = dated.map(([, day]) => day).sort().at(-1);
        if (newest) for (const p of ["/", "/episodes"]) lastmod.set(p, newest);
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => {
          const date = lastmod.get(path);
          return date ? { path, lastmod: date } : { path };
        });
        // Entity overview cards under /explore/$slug: local collection, all public.
        for (const entity of entities) {
          if (!inSitemap(entity)) continue; // every indexable card; thin cards (noindex) and guests with an AFTERPARTY stay out
          const location = router.buildLocation({
            to: "/explore/$slug",
            params: { slug: entity.slug },
            search: () => ({}),
            hash: "",
          });
          const path = sitemapPathForLocation(router, location, "/explore/$slug");
          if (path) entries.push({ path });
        }
        // Dynamic overview cards (/explore/$slug) are included via the route's
        // staticData.sitemap decision; all slugs come from the router inventory.
        if (entries.length === 0) {
          return new Response(
            'No pages are included in this sitemap. Check route decisions and ancestor exclusions. Setting "exclude-subtree" on the root excludes the entire site.',
            { status: 404, headers: { "Cache-Control": "no-store" } },
          );
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
