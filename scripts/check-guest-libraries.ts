// Prints every AFTERPARTY guest's Library summary (src/lib/guest-library.server.ts): run with `npx vite-node scripts/check-guest-libraries.ts`.
import { episodes } from "@/data/episodes";
import { guestOfEpisode } from "@/data/entities";
import { guestLibraryData } from "@/lib/guest-library.server";

let missing = 0;
for (const ep of episodes) {
  const g = guestOfEpisode(ep.id);
  if (!g) {
    console.log(`${ep.id}\tNO GUEST CARD (${ep.guest})`);
    missing++;
    continue;
  }
  const v = guestLibraryData(g.slug);
  if (!v) {
    console.log(`${ep.id}\t${g.slug}\tNO LIBRARY`);
    missing++;
    continue;
  }
  const cats = v.categories.map((c) => `${c.key}=${c.own.length}+${c.dropped.length}`).join(" ");
  console.log(
    `${ep.id}\t/library/${g.slug}\tmade=${v.made.length} ${cats} ideas=${v.ideas.length + v.tips.length}`,
  );
}
console.log(`episodes=${episodes.length} missing=${missing}`);
