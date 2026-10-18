<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep S06E01 reference, Mood, and Fashion displays driven by its reference JSON, with on-camera entries outside timestamp conversion, so spreadsheet updates stay consistent.
- Partition the episode's Mood sliders by the reference JSON's on-camera marker and give each independent selection state, so story and presenter looks remain separate after spreadsheet updates.
- Every person/place/work has exactly one overview card at /explore/$slug, built from src/data/entities.ts by merging guests, scene timeline and episode references; link names via EntityLink — so profiles are never duplicated.
- The site menu lives once in __root (SiteMenu) — so every page shows all pages.
- Guest cards live on their own /guests page (src/components/guests-section.tsx) with a "Guests" menu entry; the Timeline page carries only the scene timeline — so each view has one job.
- The Everything A–Z card strip lives on /explore only; "The names everyone drops" (NamesEveryoneDrops) lives on the home page only, and Connections keeps just the dot graph and great connectors — so each view has one job.
- Every episode in src/data/episodes.ts stores both watchUrl (WOW Presents Plus) and listenUrl (Spotify); episode blocks always offer "Afterparty connection", "Watch the episode" and "Listen to the episode", so the two addresses never drift apart.
- Keep shared episode lists in ascending season/episode order and resolve guest/reference episode links through the shared episode registry, so new episodes appear consistently without binary episode assumptions.
- Episode-specific illustrated backgrounds are imported by their own episode route and confined to its title section, so reference and Mood displays remain data-driven and other pages stay unchanged.
- S01E02 story Mood swatches match each reference's materials or themes and are labelled as story palettes, not verified outfit colours; keep presenter swatches separate so unspecified costumes never become factual colour claims.
- S01E01 and S01E02 use a shared MoodSpectrum that reads optional `colours` arrays from reference JSON and preserves route-specific fallback swatches, so palette length and exact values are data-driven without changing unprovided looks.
- Home and Episodes lists use the shared EpisodeBlock with portraits mapped by episode ID and confined to the title panel; optional date lines preserve the Episodes page dates and ranking while keeping both layouts consistent.
- The Episodes index imports its own cross-episode reference collage only in its title section, so its artwork never changes the home or individual episode headers.

- Connections is an interactive force graph (Anytype-style): episodes are hub nodes, timestamped people from published episode indexes link to the episodes naming them; drag, zoom, tap to highlight — never populated from the scene timeline or unpublished guest profiles.
- Guest cards derive Timestamp/Watch/Listen links from the shared episode registry (matched by guest name), falling back to the guest's WOW link and a Spotify search — so a newly registered afterparty appears on /guests automatically.
- Integrate new episodes into episodes.ts, entities.ts, scene.ts afterpartyIndexes and locations.ts; reuse existing entity names — so every page receives each episode without duplicates.
- Decade labels styled in capitals keep a lower-case "s" (1970s, not 1970S) via the Timeline's Decades helper.
- The footer (SiteFooter) reads the same PAGES list as the top menu (SiteMenu), plus About and Contact, and every page renders it - so footer and menu never drift apart.
- Attribute sensitive or unflattering episode claims to their teller, or "as told on the show"; neutral facts need none. Apply to references, Timeline and guests; never invent years — for legal safety and accurate dates.
- Episode portraits fill edge to edge, faces below text; refill repositioned tops with the same collage and verify desktop/phone — so labels remain readable.
- Outside links say where they go: "Read more on Wikipedia", "on WOW Presents Plus", "on IMDb", "on Google" (src/lib/link-label.ts linkPlace), falling back to "elsewhere" - never a generic label for a Wikipedia link.
- GuestEpisodeLinks supplies Watch/Listen everywhere and Timestamp when registered in episodes.ts — so guest cards stay consistent.
- EpisodePlayer in __root streams RSS audioUrl without storing audio; all times use Timestamp, episode pages call useEpisodePlayer(id), bar links to WOW/Spotify — so playback stays site-wide.
- Automatic afterparty Timeline extraction accepts dated Event/Place references only; unprovided event locations stay empty and cannot feed location quizzes — so release years and guest associations never become invented scene facts.
- "The names everyone drops" (home), Great Connectors, Most popular places and the Connections graph are computed from episodes.ts + entities.ts (episode-connections.ts) - never hand-listed - so a new Afterparty feeds them automatically once registered; after adding an episode, check its names show up in those counts.
