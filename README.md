# Nightfever Afterparty

My fan-made companion to *Night Fever*, the World of Wonder podcast where James St. James, Fenton Bailey and Randy Barbato relive the campy, gossipy history of New York nightlife.

For every episode I build an "afterparty": a timestamped index of every name, club, song, book and look the guests drop, counted, linked and connected, plus a mood board of the outfits. Around it: guest profiles, an A–Z of everyone mentioned, a scene timeline, a connection web, a map and a pub quiz.

Not affiliated with World of Wonder. Listen to the podcast: https://creators.spotify.com/pod/profile/night-fever/

**Live app**: https://nightfever-afterparty.com

Built with [Lovable](https://lovable.dev) ([editor](https://lovable.dev/projects/bdfe98d8-ed89-4b39-835e-aa9801a97362)). Changes pushed to `main` sync back into Lovable.

## Development

You need [Bun](https://bun.sh) (`bun.lock` is the lock file).

```sh
git clone https://github.com/lilaineurope/nightfever-afterparty.git
cd nightfever-afterparty
bun install
bun run dev
```

Checks (GitHub runs the same ones on every pull request and every push to `main`):

```sh
bun run test    # data checks in src/data/*.test.ts
bun run lint
bun run build
```
