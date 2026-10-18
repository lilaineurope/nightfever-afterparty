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
- Guest cards live on their own /guests page (src/components/guests-section.tsx), in the top menu right after Afterparty; the Timeline page carries only the scene timeline — so each view has one job.
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
- The top menu (PAGES in site-menu.tsx) is, in order: Afterparty, Guests, Timeline, Connections, Jukebox, Book Club, Map, Pub Quiz, A–Z. The footer (SiteFooter, on every page) carries no page list - just the show and World of Wonder links, About, Contact and Under the hood.
- Attribute sensitive or unflattering episode claims to their teller, or "as told on the show"; neutral facts need none. Apply to references, Timeline and guests; never invent years — for legal safety and accurate dates.
- Episode portraits fill edge to edge, faces below text; refill repositioned tops with the same collage and verify desktop/phone — so labels remain readable.
- Outside links say where they go: "Read more on Wikipedia", "on WOW Presents Plus", "on IMDb", "on Google" (src/lib/link-label.ts linkPlace), falling back to "elsewhere" - never a generic label for a Wikipedia link.
- GuestEpisodeLinks supplies Watch/Listen everywhere and Timestamp when registered in episodes.ts — so guest cards stay consistent.
- EpisodePlayer in __root streams RSS audioUrl without storing audio; all times use Timestamp, episode pages call useEpisodePlayer(id), bar links to WOW/Spotify — so playback stays site-wide.
- Automatic afterparty Timeline extraction accepts dated Event/Club/Location references only; unprovided event locations stay empty and cannot feed location quizzes — so release years and guest associations never become invented scene facts.
- "The names everyone drops" (home), Great Connectors, Most popular clubs and the Connections graph are computed from episodes.ts + entities.ts (episode-connections.ts) - never hand-listed - so a new Afterparty feeds them automatically once registered; after adding an episode, check its names show up in those counts.
- Site search (SiteSearch in SiteMenu, index in src/lib/search-index.ts) is built from entities.ts + episodes.ts + PAGES and loaded lazily on first open - so every new episode, card and page is searchable automatically, with no hand-kept list.
- Everything A–Z merges names by dropping bracketed asides, but keeps episode codes like "(S01E07)" - so each episode's on-camera look keeps its own card.
- SEO lives in src/lib/seo.ts: every page uses pageHead (absolute canonical, og:url, og:site_name, its own 1200x630 share picture in public/og/) and episode pages use episodeHead(id) with a keyword title from EPISODE_TOPICS and PodcastEpisode JSON-LD - so search results and shared links stay rich. For a new episode: add its EPISODE_TOPICS line, add it to EP in scripts/og-images.py and run it.
- Card pages (/explore/$slug) get a description from their first story line and WebPage/about JSON-LD; one-episode cards with nothing else (isThinCard) stay on the site but are noindex and out of the sitemap - so Google ranks the rich cards.
- Images in src/assets are web-sized (headers max 1920px wide, boxes 1024px, JPEG quality ~80, about 200-500 KB) - never commit 2 MB originals, they slow pages and hurt search ranking.
- Book Club (/book-club) and Jukebox (/jukebox) are built from entities.ts via src/data/collections.ts (Book/Publication and Music references) with the shared CollectionPage - so every new Afterparty adds its books and songs automatically; songs link to Spotify/YouTube searches, books to Open Library, nothing is hosted.
- The top menu shows the full links from lg (1024px) up, with the short label "A–Z"; below that it is the Menu button - so the bar never wraps.
- The home page features the main pages (Timeline, Connections, Jukebox, Book Club, Map, Pub Quiz - not A–Z or Guests) in a "More to explore" card grid (src/components/explore-pages.tsx) under the three latest Afterparties, with live counts - add a card whenever a page is added.
- The Jukebox player (src/components/jukebox-player.tsx) uses the Spotify iFrame API, loaded only when a visitor presses play, and auto-advances to the next song; Spotify IDs live in SPOTIFY in src/data/collections.ts and must come from real Spotify URLs (never guessed). The privacy page names this one embed.
- Header collages never repeat a reference: each object appears once (check the Gemini image for duplicates before using it, and ask Gemini to remove repeats). An object may come back in another page's header, but always as a different picture.
- Page headers (Timeline, Jukebox, Book Club) are crowded edge-to-edge collages - overlapping pieces, no empty middle, bold pink sticker outlines, no words or numbers - with the Timeline overlay (bg-background/30, top-to-bottom gradient, radial shade behind the title) so the title stays readable.

- Places are two categories: "Club" (actual clubs - nightclubs, discos, after-hours, gay and dance bars, jazz and rock clubs, club nights and named club rooms) and "Location" (countries, cities, neighbourhoods, streets, and every other building: hotels, restaurants, shops, galleries, museums, theatres, schools). Never use "Place". Every new episode's reference sheet and JSON uses Club/Location; isPlace() in entities.ts covers both, so the Map, Timeline and quiz treat them alike while Most popular clubs counts only clubs.
- afterpartyPublished is the Afterparty date (YYYY-MM-DD); when two go up the same day, add the time to the later one (YYYY-MM-DDTHH:MM) so the newest lists first on Home and Afterparty.
- /under-the-hood lists every tool and service used to make and run the site (src/routes/under-the-hood.tsx GROUPS) - add a line whenever a new tool or service is used, and keep the privacy page in step for anything visitors touch.
- The Jukebox links to Lisa's public Spotify playlist "Night Fever Afterparty Jukebox" (SPOTIFY_PLAYLIST_URL in collections.ts; the playlist description links back to /jukebox). When a new episode adds playable Jukebox entries, add them to the playlist too (artists and albums as their best-known song).
- Club nights (src/data/club-nights.ts): "A night at <club> sounded like this" - songs documented as played at a club (DJ lists, recorded sets, club albums, live shows), each with its reason and source keys, shown on the club's A–Z card and in the Jukebox's "Clubs" category. Only add a club with real sources; Spotify ids checked, never guessed; label songs honestly (played there / performed there live / an artist the DJs played). When a club's playlist exists in Lisa's Spotify, set its playlistId.
