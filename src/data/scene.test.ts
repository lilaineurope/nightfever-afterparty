import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { sceneEvents } from "./scene";
import { generateQuiz } from "../lib/quiz";

const moments = sceneEvents.filter((event) => event.source);

describe("afterparty Timeline accuracy", () => {
  for (const title of [
    "Vertigo (1958)", "Picnic (1955)", "Gypsy (1962)",
    "Sunset Boulevard (1950)", "Driving Miss Daisy (1989)",
    "The Mirror Crack'd (1980)",
  ]) {
    test(`${title} is a mentioned work, not a scene moment`, () => {
      assert.equal(moments.filter((event) => event.title === title).length, 0);
    });
  }

  test("Makos's career span does not create a 1976 New York event", () => {
    assert.equal(moments.filter((event) => event.title === "Christopher Makos").length, 0);
  });

  test("Patricia Field's dated first store remains at its supplied place", () => {
    const store = moments.find((event) => event.title === "The Pants Pub, Washington Place");
    assert.equal(store?.year, 1966);
    assert.equal(store?.place, "The Pants Pub, Washington Place");
    assert.equal(store?.source?.episodeId, "s03e01");
  });

  test("the dated bridge party remains without an invented city", () => {
    const party = moments.find((event) => event.title === "Williamsburg Bridge outlaw party");
    assert.equal(party?.year, 1985);
    assert.equal(party?.place, "");
  });

  test("quiz never uses removed film moments or unspecified locations", () => {
    const unlocated = new Set(moments.filter((event) => !event.place).map((event) => event.title));
    const removed = /Vertigo \(1958\)|Picnic \(1955\)|Driving Miss Daisy \(1989\)/;
    let locationQuestions = 0;
    for (let seed = 1; seed <= 100; seed++) {
      for (const question of generateQuiz(seed, 20)) {
        if (!question.id.startsWith("where-") && !question.id.startsWith("yr-")) continue;
        assert.doesNotMatch(question.prompt, removed);
        if (!question.id.startsWith("where-")) continue;
        locationQuestions++;
        assert.ok(question.answer.trim().length > 0);
        assert.ok(question.options.every((option) => option.trim().length > 0));
        for (const title of unlocated) assert.notEqual(question.prompt, `Where did this happen? "${title}"`);
      }
    }
    assert.ok(locationQuestions > 0);
  });
});