import { test } from "node:test";
import assert from "node:assert/strict";

// The server gets a small CPU budget while it starts up. When the card index took ~4.8 s to build,
// visitors who arrived just as the server was waking up got a 500 page ("Dynamic import exceeded CPU
// time limit") - Project monitoring, 4 Nov 2026. These budgets fail the build if that work creeps back up.

async function loadCpuMs(specifier: string): Promise<number> {
  const before = process.cpuUsage();
  await import(specifier);
  const used = process.cpuUsage(before);
  return (used.user + used.system) / 1000;
}

test("the card index builds inside the startup budget", async () => {
  const ms = await loadCpuMs("./entities.ts");
  assert.ok(ms < 1500, `building the card index took ${ms.toFixed(0)} ms of CPU while the server starts up`);
});

test("the name-linking index builds inside the startup budget", async () => {
  await import("./entities.ts"); // name-links builds on top of the card index
  const ms = await loadCpuMs("../lib/name-links.ts");
  assert.ok(ms < 800, `building the name links took ${ms.toFixed(0)} ms of CPU while the server starts up`);
});

test("the card index is actually built", async () => {
  const { entities } = await import("./entities.ts");
  assert.ok(entities.length > 3000, `only ${entities.length} cards were built`);
});
