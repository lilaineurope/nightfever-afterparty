import { totalMentions, type Entity } from "@/data/entities";
import { MomentsBox, momentsOf } from "@/components/moments-box";
import "@/lib/full-links"; // the box's links use the full A–Z (src/lib/link-index.tsx)

// EntityBox lives apart from MomentsBox so a page that gets its boxes from the server (the home page) doesn't load the
// whole A–Z for it (page weight, 17 Nov 2026).

/** The same box for any A–Z entity (Everything A–Z, Jukebox strips). */
export function EntityBox({ entity, onClose }: { entity: Entity; onClose: () => void }) {
  const guest = entity.guest;
  return (
    <MomentsBox
      name={entity.name}
      slug={entity.slug}
      mentions={totalMentions(entity)}
      moments={momentsOf(entity)}
      link={entity.link}
      note={guest ? "Night Fever guest" : entity.category}
      onClose={onClose}
    />
  );
}
