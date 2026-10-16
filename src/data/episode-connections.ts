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

export type EpisodeEntity = EpisodePerson & {
  /** Every timestamp-index category this name turns up in, plus "Fashion" if a look note exists. */
  categories: string[];
  /** What the episode actually said about the look, in the speaker's own words. */
  fashionNotes: string[];
};

// Only references that were actually spoken at a moment in a published episode.
const isTimestamped = (ref: Ref) =>
  !!ref.episode && publishedIds.has(ref.episode) && ref.mentions > 0 &&
  /\d{1,2}:\d{2}/.test(ref.time) && ref.time !== 'On camera';

const summarise = (entity: { slug: string; name: string }, refs: Ref[]) => ({
  slug: entity.slug,
  name: entity.name,
  refs,
  episodeIds: episodes.filter(ep => refs.some(ref => ref.episode === ep.id)).map(ep => ep.id),
  mentions: refs.reduce((sum, ref) => sum + ref.mentions, 0),
});

const byStrength = (a: EpisodePerson, b: EpisodePerson) =>
  b.episodeIds.length - a.episodeIds.length || b.mentions - a.mentions || a.name.localeCompare(b.name);

// One dot per shared entity, with only spoken Person references as evidence.
export const episodePeople: EpisodePerson[] = entities
  .map(entity => summarise(entity, entity.refs.filter(ref => ref.category === 'Person' && isTimestamped(ref))))
  .filter(person => person.refs.length > 0)
  .sort(byStrength);

// Every timestamped reference, in any category — the graph's category filters read this.
export const episodeEntities: EpisodeEntity[] = entities
  .map(entity => {
    const refs = entity.refs.filter(isTimestamped);
    if (!refs.length) return null;
    const categories = [...new Set(refs.map(ref => ref.category))];
    const fashionNotes = [...new Set(refs.filter(ref => ref.fashion).map(ref => ref.fashion!))];
    if (fashionNotes.length) categories.push('Fashion');
    return { ...summarise(entity, refs), categories, fashionNotes };
  })
  .filter((row): row is EpisodeEntity => row !== null)
  .sort(byStrength);

/** How many timestamped names sit in one category ("All" counts every name). */
export const categoryCounts: Record<string, number> = (() => {
  const out: Record<string, number> = { All: episodeEntities.length };
  for (const row of episodeEntities) {
    for (const c of row.categories) out[c] = (out[c] ?? 0) + 1;
  }
  return out;
})();

const byMentions = (a: EpisodePerson, b: EpisodePerson) =>
  b.mentions - a.mentions || b.episodeIds.length - a.episodeIds.length || a.name.localeCompare(b.name);

/** Rooms the scene kept talking about, most mentioned first. */
export const popularPlaces = episodeEntities
  .filter((row) => row.categories.includes('Place'))
  .sort(byMentions)
  .slice(0, 10);

/** The looks the episodes described most often, most mentioned first. */
export const bestInFashion = episodeEntities
  .filter((row) => row.fashionNotes.length > 0)
  .sort(byMentions)
  .slice(0, 8);
