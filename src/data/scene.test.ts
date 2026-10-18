import { describe, expect, test } from "bun:test";
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
      expect(moments.filter((event) => event.title === title)).toHaveLength(0);
    });
  }

  test("Makos's career span does not create a 1976 New York event", () => {
    expect(moments.filter((event) => event.title === "Christopher Makos")).toHaveLength(0);
  });

  test("Patricia Field's dated first store remains at its supplied place", () => {
    expect(moments.find((event) => event.title === "The Pants Pub, Washington Place")).toMatchObject({
      year: 1966, place: "The Pants Pub, Washington Place",
      source: { episodeId: "s03e01" },
    });
  });

  test("the dated bridge party remains without an invented city", () => {
    expect(moments.find((event) => event.title === "Williamsburg Bridge outlaw party")).toMatchObject({
      year: 1985, place: "",
    });
  });

  test("quiz never uses removed film moments or unspecified locations", () => {
    const unlocated = new Set(moments.filter((event) => !event.place).map((event) => event.title));
    const removed = /Vertigo \(1958\)|Picnic \(1955\)|Driving Miss Daisy \(1989\)/;
    let locationQuestions = 0;
    for (let seed = 1; seed <= 100; seed++) {
      for (const question of generateQuiz(seed, 20)) {
        if (!question.id.startsWith("where-") && !question.id.startsWith("yr-")) continue;
        expect(question.prompt).not.toMatch(removed);
        if (!question.id.startsWith("where-")) continue;
        locationQuestions++;
        expect(question.answer.trim().length).toBeGreaterThan(0);
        expect(question.options.every((option) => option.trim().length > 0)).toBe(true);
        for (const title of unlocated) expect(question.prompt).not.toBe(`Where did this happen? "${title}"`);
      }
    }
    expect(locationQuestions).toBeGreaterThan(0);
  });
});