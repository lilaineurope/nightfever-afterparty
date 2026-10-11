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
- The guest cards live inside the Timeline page (src/components/guests-section.tsx rendered by /timeline); /guests only redirects there, so the people and the nights they lived through stay on one page and the menu carries a single "Timeline" entry.
- The Everything A–Z card strip is shown on /explore and the home page only — the Connections page keeps just the dot graph and connector lists, so each view has one job.
- Every episode in src/data/episodes.ts stores both watchUrl (WOW Presents Plus) and listenUrl (Spotify); episode blocks always offer "Afterparty connection", "Watch the episode" and "Listen to the episode", so the two addresses never drift apart.
- Keep shared episode lists in ascending season/episode order and resolve guest/reference episode links through the shared episode registry, so new episodes appear consistently without binary episode assumptions.
- Episode-specific illustrated backgrounds are imported by their own episode route and confined to its title section, so reference and Mood displays remain data-driven and other pages stay unchanged.
- S01E02 story Mood swatches match each reference's materials or themes and are labelled as story palettes, not verified outfit colours; keep presenter swatches separate so unspecified costumes never become factual colour claims.
- S01E01 and S01E02 use a shared MoodSpectrum that reads optional `colours` arrays from reference JSON and preserves route-specific fallback swatches, so palette length and exact values are data-driven without changing unprovided looks.
- Home and Episodes lists use the shared EpisodeBlock with portraits mapped by episode ID and confined to the title panel; optional date lines preserve the Episodes page dates and ranking while keeping both layouts consistent.
- The Episodes index imports its own cross-episode reference collage only in its title section, so its artwork never changes the home or individual episode headers.

- Connections uses episode-connections derived from shared entities filtered to registered, spoken timestamped Person references; its circular web (the original Connections format) puts single-episode names on the outer ring and multi-episode names in the core, linking people who surface together in episodes — never populating dots or relationships from the scene timeline or unpublished guest profiles.
- Connections keeps the original web format with every dot and name opening its shared overview (plain click focuses, modifier-click navigates), so all names remain readable even as episode references grow.
