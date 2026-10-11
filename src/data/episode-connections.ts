import { entities, type Ref } from './entities';
import { episodes } from './episodes';

const publishedIds = new Set(episodes.map(ep => ep.id));
export type EpisodePerson = {
  slug: string;
  name: string;
  refs: Ref[];
  episodeIds: string[];
  mentions: number;
};

// One dot per shared entity, with only spoken Person references as evidence.
export const episodePeople: EpisodePerson[] = entities.flatMap(entity => {
  const refs = entity.refs.filter(ref =>
    ref.category === 'Person' && ref.episode && publishedIds.has(ref.episode) &&
    ref.mentions > 0 && /\d{1,2}:\d{2}/.test(ref.time) && ref.time !== 'On camera',
  );
  if (!refs.length) return [];
  return [{
    slug: entity.slug,
    name: entity.name,
    refs,
    episodeIds: episodes.filter(ep => refs.some(ref => ref.episode === ep.id)).map(ep => ep.id),
    mentions: refs.reduce((sum, ref) => sum + ref.mentions, 0),
  }];
}).sort((a, b) => b.episodeIds.length - a.episodeIds.length || b.mentions - a.mentions || a.name.localeCompare(b.name));
