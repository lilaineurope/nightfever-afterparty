import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { episodePeople } from '@/data/episode-connections';
import { episodes, episodePath } from '@/data/episodes';

const rounded = (value: number) => Math.round(value * 1000) / 1000;

export function EpisodeNetwork() {
  const [episode, setEpisode] = useState('all');
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const visible = useMemo(() => episodePeople.filter(person =>
    (episode === 'all' || person.episodeIds.includes(episode)) &&
    person.name.toLowerCase().includes(search.trim().toLowerCase()),
  ), [episode, search]);
  const selected = episodePeople.find(person => person.slug === focus);
  const active = episodePeople.find(person => person.slug === (hover ?? focus));
  const hubs = episodes.map((ep, i) => ({ ...ep, x: 550, y: 360 + i * 100 }));
  const positions = visible.map((person, index) => {
    const ring = index % 3;
    const ringCount = Math.ceil((visible.length - ring) / 3);
    const angle = Math.floor(index / 3) / Math.max(1, ringCount) * Math.PI * 2 - Math.PI / 2;
    const radius = 270 + ring * 65;
    return { person, x: rounded(550 + Math.cos(angle) * radius), y: rounded(460 + Math.sin(angle) * radius), angle };
  });
  const personButton = (person: typeof episodePeople[number]) => (
    <Button key={person.slug} variant="outline" onClick={() => setFocus(person.slug)}
      className="h-auto justify-between gap-3 whitespace-normal border-border bg-card px-4 py-3 text-left hover:border-gold/50">
      <span><span className="block font-semibold text-gold">{person.name}</span>
        <span className="block text-xs text-muted-foreground">{person.mentions} mentions across {person.episodeIds.length} {person.episodeIds.length === 1 ? 'episode' : 'episodes'}</span></span>
      <span className="shrink-0 text-xs text-pink">{person.episodeIds.length}/{episodes.length}</span>
    </Button>
  );

  return <>
    <section className="px-4 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-center gap-2">
          <Button variant={episode === 'all' ? 'default' : 'outline'} onClick={() => setEpisode('all')}>All episodes</Button>
          {episodes.map(ep => <Button key={ep.id} variant={episode === ep.id ? 'default' : 'outline'} onClick={() => setEpisode(ep.id)} className="h-auto whitespace-normal">S{ep.season} E{ep.episode} · {ep.guest}</Button>)}
        </div>
        <div className="relative mx-auto mt-5 max-w-md">
          <Search aria-hidden="true" className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input aria-label="Search episode people" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search a name" className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" />
        </div>
        <p className="mt-5 text-center text-sm text-gold">{visible.length} people · {episodes.length} published episode indexes</p>
        <div className="relative mt-3 border-y border-gold/20 bg-card">
          <svg viewBox="0 0 1100 920" className="block h-auto w-full" role="group" aria-label="People mentioned in published episodes, linked to the episodes containing their timestamped references" onMouseLeave={() => setHover(null)}>
            {positions.flatMap(({ person, x, y }) => hubs.filter(hub => person.episodeIds.includes(hub.id)).map(hub =>
              <line key={`${person.slug}-${hub.id}`} x1={x} y1={y} x2={hub.x} y2={hub.y} stroke={active?.slug === person.slug ? 'var(--color-pink)' : 'var(--color-gold)'} strokeOpacity={active ? (active.slug === person.slug ? 0.9 : 0.035) : 0.09} strokeWidth={active?.slug === person.slug ? 2.5 : 1} />,
            ))}
            {hubs.map(hub => <g key={hub.id}>
              <circle cx={hub.x} cy={hub.y} r={26} fill="var(--color-background)" stroke="var(--color-pink)" strokeWidth={2} />
              <text x={hub.x} y={hub.y + 4} textAnchor="middle" fontSize={12} fill="var(--color-pink)">S{hub.season}E{hub.episode}</text>
              <text x={hub.x} y={hub.y + 43} textAnchor="middle" fontSize={13} fill="var(--color-cream)">{hub.guest}</text>
            </g>)}
            {positions.map(({ person, x, y, angle }, i) => <g key={person.slug} opacity={!active || active.slug === person.slug || active.episodeIds.some(id => person.episodeIds.includes(id)) ? 1 : 0.25} onMouseEnter={() => setHover(person.slug)}>
              <a href={`/explore/${person.slug}`} aria-label={`Open the ${person.name} overview card`} onFocus={() => setHover(person.slug)} onBlur={() => setHover(null)}>
                <title>{person.name} — {person.mentions} mentions; {person.episodeIds.map(id => { const ep = episodes.find(ep => ep.id === id); return ep ? `S${ep.season}E${ep.episode}` : id; }).join(', ')}</title>
                <circle cx={x} cy={y} r={12} fill="transparent" />
                <circle cx={x} cy={y} r={Math.min(11, 4 + Math.sqrt(person.mentions) / 2)} fill={person.episodeIds.length > 1 ? 'var(--color-gold)' : 'var(--color-cream)'} stroke={active?.slug === person.slug ? 'var(--color-pink)' : 'var(--color-background)'} strokeWidth={2} />
                {visible.length <= 15 && <text x={rounded(x + Math.cos(angle) * 18)} y={rounded(y + Math.sin(angle) * 18)} textAnchor={Math.cos(angle) < 0 ? 'end' : 'start'} dominantBaseline="middle" fontSize={12} fill="var(--color-cream)">{person.name}</text>}
              </a>
            </g>)}
          </svg>
          <div className="min-h-16 border-t border-border px-4 py-3 text-center" aria-live="polite">
            {active ? <><p className="font-semibold text-gold">{active.name}</p><p className="text-xs text-muted-foreground">{active.mentions} mentions across {active.episodeIds.length} {active.episodeIds.length === 1 ? 'episode' : 'episodes'}</p></> : <p className="text-xs text-muted-foreground">Gold: mentioned in multiple episodes · Pale: mentioned in one episode</p>}
          </div>
        </div>
        {visible.length === 0 && <p className="py-6 text-center text-muted-foreground">No matching people.</p>}
        {search.trim() && <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{visible.map(personButton)}</div>}
      </div>
    </section>
    {selected && <section className="px-6 pb-12"><div className="mx-auto max-w-4xl border-y border-pink/30 py-6">
      <div className="flex items-center justify-between gap-4"><h2 className="text-2xl font-semibold text-gold">{selected.name}</h2><Button variant="ghost" size="icon" aria-label="Clear selected person" onClick={() => setFocus(null)}><X /></Button></div>
      <Link to="/explore/$slug" params={{ slug: selected.slug }} className="mt-2 inline-block text-sm text-pink underline underline-offset-4">Open their overview card</Link>
      <div className="mt-5 space-y-5">{episodes.filter(ep => selected.episodeIds.includes(ep.id)).map(ep => {
        const refs = selected.refs.filter(ref => ref.episode === ep.id);
        return <div key={ep.id} className="border-t border-border pt-4">
          <Link to={episodePath(ep.id)} className="font-semibold text-gold">S{ep.season} E{ep.episode} · {ep.guest}</Link>
          <p className="mt-1 text-xs text-pink">{refs.reduce((sum, ref) => sum + ref.mentions, 0)} mentions in this episode · {selected.mentions} across all episodes</p>
          {refs.map(ref => <div key={`${ref.rank}-${ref.name}`} className="mt-3 text-sm"><Link to={episodePath(ep.id)} className="text-gold underline underline-offset-4">{ref.time}</Link><p className="mt-1 text-muted-foreground">{ref.context}</p>{ref.status !== 'Confirmed' && <p className="mt-1 text-xs text-pink">{ref.status}</p>}</div>)}
        </div>;
      })}</div>
    </div></section>}
    <section className="spotlight px-6 py-16"><div className="mx-auto max-w-4xl">
      <h2 className="text-center text-3xl font-bold text-cream">The great connectors</h2>
      <p className="mt-3 text-center text-muted-foreground">The most-mentioned names across the published episode indexes.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">{[...episodePeople].sort((a,b) => b.mentions - a.mentions).slice(0,12).map(personButton)}</div>
    </div></section>
    <section className="px-6 py-16"><div className="mx-auto max-w-4xl">
      <h2 className="text-center text-3xl font-bold text-cream">The names everyone drops</h2>
      <p className="mt-3 text-center text-muted-foreground">The names in the rooms — mentioned in more than one published episode.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">{episodePeople.filter(person => person.episodeIds.length > 1).map(personButton)}</div>
    </div></section>
  </>;
}
