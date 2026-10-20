# Afterparty Quiz

A pub quiz generator. Give it your facts - people, places, songs, events, whatever your world is made of - and
it shakes up a fresh multiple-choice quiz every time, with the answer, a one-line explanation and the source
behind every question. Comes with a ready-made React quiz flow: one question at a time, a running score, then
every answer with its source at the end, and a "new quiz" button. There's a printable all-on-one-page layout too.


- **Engine:** plain TypeScript, no dependencies, works in the browser and in Node.
- **React component:** optional, with its own small stylesheet - recolour it with CSS variables.
- **Seeded:** the same seed and facts give the same quiz (for printing, sharing and tests).
- **Honest questions:** four distinct options every time, wrong answers drawn from the same category, the name
  blanked out of every clue, no question asked twice in one quiz, and no crash when there isn't much data.

## Install

This is licensed software. When you buy it you receive a license key and the download `afterparty-quiz-1.0.0.zip` (both arrive by email from Creem, the shop's payment provider). Keep the key - it is your proof of licence.

Unzip it into your project, for example into `vendor/afterparty-quiz`, then:

```bash
npm install ./vendor/afterparty-quiz
```

(The package builds itself on install. Or copy `src/` into your project - it has no dependencies.)

## Quick start - engine only

```ts
import { generateQuiz, scoreQuiz, type QuizFact } from "afterparty-quiz";

const facts: QuizFact[] = [
  { id: "moth", name: "The Velvet Moth", category: "Club", year: 1977, place: "Harbor Street",
    context: "A basement disco where the doorman wore a cape.", people: ["Dita Valcourt"], mentions: 34,
    source: { title: "Episode 1", href: "https://example.com/ep1", time: "00:04:12" } },
  // ...more facts
];

const quiz = generateQuiz(facts, { count: 10 });          // random quiz
const same = generateQuiz(facts, { count: 10, seed: 42 }); // repeatable quiz

quiz[0];
// { id, template, prompt, options: [4 strings], answer, answerIndex, explain, factId, source? }

scoreQuiz(quiz, { [quiz[0].id]: quiz[0].answer }); // -> 1
```

### Options

| option | default | what it does |
| --- | --- | --- |
| `count` | `10` | number of questions; fewer come back if your data can't support that many |
| `seed` | random | same seed + same facts = same quiz |
| `categories` | all | only ask about facts in these categories |
| `templates` | all | only use these question types (see below) |
| `weights` | see `DEFAULT_WEIGHTS` | how often each question type is picked |

## Quick start - React

```tsx
import { PubQuiz } from "afterparty-quiz/react";
import "afterparty-quiz/react/pub-quiz.css";

<PubQuiz facts={facts} />;

// Printable sheet, five questions about clubs only, sources as timestamp links:
<PubQuiz
  facts={facts}
  count={5}
  layout="sheet"
  quizOptions={{ categories: ["Club"] }}
  renderSource={(s) => <a href={s.href}>{s.title} at {s.time}</a>}
  onFinish={(score, total) => console.log(score, total)}
/>;
```

Props: `facts`, `count`, `countChoices` (`[5, 10, 15, 20]` or `false`), `quizOptions`, `seed`, `layout`
(`"step"` or `"sheet"`), `renderSource`, `onFinish`, `labels` (every text on screen, for other languages or
your own voice), `className`.

## Your data

Only `id`, `name` and `category` are required. Every other field unlocks a question type:

| field | unlocks |
| --- | --- |
| `context` - a sentence or two about it | **Who or what is this?** (the name is blanked out) |
| `year` | **When did this happen?** (years close to each other, never in the future) |
| `place` | **Where did this happen?** |
| `people` - names involved | **Who was part of this story?** |
| `mentions` - how often it comes up | **Which of these comes up most often?** |
| `source` - `{ title, href?, time? }` | **Where does this come up?** and the source shown with every answer |
| `category` (at least four different ones) | **Is it a...?** |

The more facts and fields you give it, the more varied the quizzes. Around 40 facts with context and years
already make good quizzes - see `examples/sample-facts.ts` (all invented).

## Theming

Import `pub-quiz.css` once, then override any of these on `.pq` or a parent:

```css
.pq {
  --pq-bg: #0b0f2a;   --pq-card: #141a3d;  --pq-border: #2a3266;
  --pq-text: #f6ecd9; --pq-muted: #a6a9c8;
  --pq-pink: #ec4899; --pq-pink-text: #fff; --pq-gold: #e8c26a; --pq-wrong: #e5484d;
  --pq-radius: 16px;  --pq-font: inherit;
}
```

## Develop

```bash
npm install
npm test          # engine and component tests
npm run typecheck
npm run build     # -> dist/
```

## Licence

Commercial licence - see `LICENSE`. One licence key = one project or site. Your key is delivered by Creem when
you buy. No redistribution or resale of the source.
