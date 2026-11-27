import { createFileRoute, notFound } from "@tanstack/react-router";
import { FashionNamePage } from "@/components/fashion-name-page";
import { getDesignerPage } from "@/lib/fashion-page.functions";
import type { FashionPageView } from "@/lib/fashion-page.server";
import { pageHead } from "@/lib/seo";

// One page per designer on the Library's Fashion & outfits shelf (Lisa, 27 Nov 2026). Drawn by src/components/fashion-name-page.tsx.

export const Route = createFileRoute("/library_/designer/$slug")({
  staticData: { sitemap: false },
  loader: async ({ params }) => {
    const v = await getDesignerPage({ data: params.slug });
    if (!v) throw notFound();
    return v;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const v = loaderData;
    return pageHead({
      path: `/library/designer/${v.slug}`,
      title: `${v.name} – ${v.tag.toLowerCase()} | Night Fever AFTERPARTY Library`,
      description: DESCRIPTION(v),
      image: v.photo?.src ?? v.polaroid ?? "/og/library.jpg",
    });
  },
  component: Page,
});

const DESCRIPTION = (v: FashionPageView) =>
  `${v.name}${v.note ? ` - ${v.note}` : ""}${v.where ? `, ${v.where}` : ""}. Every moment it comes up on Night Fever, ${v.mentions}× in ${v.afterparties} ${v.afterparties === 1 ? "Afterparty" : "Afterparties"}.`;

function Page() {
  return <FashionNamePage v={Route.useLoaderData() as FashionPageView} />;
}
