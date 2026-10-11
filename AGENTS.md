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
- Episode-specific illustrated backgrounds are imported by their own episode route and confined to its title section, so reference and Mood displays remain data-driven and other pages stay unchanged.
