// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/**
 * Pictures that only server code imports (Lisa, 20 Nov 2026: Kim Hastreiter's page had no header photo and a broken polaroid).
 * Since the page-weight change of 16 Nov, the A–Z person portraits (src/data/person-portraits.ts) and the club headers and
 * polaroids (src/data/club-profiles.ts) are imported only by src/lib/card-view.server.ts. The server build works out their
 * /assets/<name>-<hash>.webp addresses, but only the browser build writes picture files to the site, so every person and club
 * page asked for pictures that were never uploaded (404). This copies those folders into the browser build under the same
 * names (same content -> same hash, and identical files are written once), so the addresses the server hands out exist.
 */
const SERVER_ONLY_PICTURE_DIRS = ["src/assets/people", "src/assets/clubs"];

function serverOnlyPictures(): Plugin {
  let root = process.cwd();
  return {
    name: "afterparty:server-only-pictures",
    apply: "build",
    applyToEnvironment: (environment) => environment.name === "client",
    configResolved(config) {
      root = config.root;
    },
    generateBundle() {
      for (const dir of SERVER_ONLY_PICTURE_DIRS) {
        const abs = path.join(root, dir);
        for (const file of fs.readdirSync(abs).sort()) {
          if (!/\.(webp|jpe?g|png|avif|gif)$/i.test(file)) continue;
          this.emitFile({ type: "asset", name: file, originalFileName: `${dir}/${file}`, source: fs.readFileSync(path.join(abs, file)) });
        }
      }
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [serverOnlyPictures()],
  },
});
