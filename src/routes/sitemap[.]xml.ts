import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";
import { entities, isThinCard } from "@/data/entities";

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
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));
        // Entity overview cards under /explore/$slug: local collection, all public.
        for (const entity of entities) {
          if (isThinCard(entity)) continue; // one-line cards stay on the site but out of the sitemap
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
