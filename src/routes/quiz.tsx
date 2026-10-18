import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { generateQuiz, type QuizQuestion } from "@/lib/quiz";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/quiz")({
  staticData: { sitemap: true },
  component: QuizPage,
  head: () => pageHead({ path: "/quiz", title: "Night Fever pub quiz – New York nightlife trivia", description: "Make a fresh Night Fever pub quiz from every name, place and story in my published episode indexes - answers and timestamps included!", image: "/og/home.jpg" }),
});

function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [count, setCount] = useState(10);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [reveal, setReveal] = useState(false);

  const newQuiz = (n = count) => {
    setQuestions(generateQuiz(Math.floor(Math.random() * 1e9), n));
    setPicked({});
    setReveal(false);
  };
  useEffect(() => newQuiz(10), []);

  const score = questions.filter((q) => picked[q.id] === q.answer).length;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-12 pt-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Pub quiz generator (beta)</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-cream text-glow sm:text-6xl">
          Last orders, <span className="text-pink text-glow-pink">trivia queens</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Every question comes straight from the published episode indexes. Play along, or print it for your next quiz night - grab a drink!
        </p>
        <p className="mx-auto mt-4 max-w-xl rounded-xl border border-gold/40 bg-gold/5 px-4 py-3 text-sm text-gold">
          This is where I'm experimenting on the best pub quiz generator ever. Testing ongoing - tell me what works and what doesn't!
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <label className="text-sm text-muted-foreground">
            Questions{" "}
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="ml-1 rounded-lg border border-border bg-card px-2 py-1.5 text-cream"
            >
              {[5, 10, 15, 20].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <button onClick={() => newQuiz()} className="rounded-xl bg-pink px-5 py-2.5 text-sm font-semibold text-pink-foreground hover:bg-pink/90">
            Shake up a new quiz!
          </button>
          <button onClick={() => setReveal((v) => !v)} className="rounded-xl border border-gold/50 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10">
            {reveal ? "Hide answers" : "Show answers"}
          </button>
          <button onClick={() => window.print()} className="rounded-xl border border-border px-5 py-2.5 text-sm text-cream hover:border-gold/50">
            Print
          </button>
        </div>
      </section>

      <section className="px-6 pb-20">
        <ol className="mx-auto max-w-3xl space-y-5">
          {questions.map((q, i) => {
            const choice = picked[q.id];
            const done = reveal || !!choice;
            return (
              <li key={q.id} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Question {i + 1}</p>
                <p className="mt-2 text-lg font-semibold text-cream">{q.prompt}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {q.options.map((o) => {
                    const right = done && o === q.answer;
                    const wrong = choice === o && o !== q.answer;
                    return (
                      <button
                        key={o}
                        disabled={!!choice}
                        onClick={() => setPicked((p) => ({ ...p, [q.id]: o }))}
                        className={`rounded-xl border px-4 py-2.5 text-left text-sm transition ${
                          right
                            ? "border-gold bg-gold/15 text-gold"
                            : wrong
                              ? "border-destructive bg-destructive/15 text-cream"
                              : "border-border text-card-foreground/85 hover:border-gold/50"
                        }`}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {q.explain}{" "}
                    <Link to="/explore/$slug" params={{ slug: q.slug }} className="text-gold underline underline-offset-2 hover:text-pink">
                      Dive into the card
                    </Link>
                  </p>
                )}
              </li>
            );
          })}
        </ol>
        {questions.length > 0 && (
          <p className="mt-8 text-center text-cream">
            Your score: <span className="font-bold text-pink">{score}</span> / {questions.length}
            {Object.keys(picked).length === questions.length && (
              <span className="mt-2 block text-sm text-muted-foreground">
                {score === questions.length
                  ? "Full marks?! You're a true club kid - love it!"
                  : score >= questions.length / 2
                    ? "Super! You clearly know the gang. Another round?"
                    : "Not bad! Grab another drink and have another go."}
              </span>
            )}
          </p>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
