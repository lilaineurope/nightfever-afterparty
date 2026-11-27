import type { CollectionItem } from "@/data/collections";
import { coverDesign } from "@/lib/cover-design";
import { CoverFace } from "@/components/cover-face";

// One Library cover (the newsstand look): used by the Library (src/routes/library.tsx) and each guest's own Library
// (src/routes/library_.$slug.tsx). The design is worked out in src/lib/cover-design.ts and drawn by CoverFace, which the
// Library item pages' "Also on the shelf in these Afterparties" uses too.

export function CoverCard({ item, tint }: { item: CollectionItem; tint: number }) {
  return <CoverFace d={coverDesign(item, tint)} />;
}
