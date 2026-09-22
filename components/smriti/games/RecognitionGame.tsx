"use client";

import { useState } from "react";
import Link from "next/link";
import type { Patient } from "@/lib/memory/types";

const QUESTIONS = [
  {
    prompt: "Which one is Anima Aita's grandson?",
    options: [
      { name: "Rohan", hint: "Visits for stories" },
      { name: "Arun", hint: "Her son" },
      { name: "Pradip", hint: "Her husband" },
      { name: "Mitali", hint: "Her daughter" },
    ],
    correct: "Rohan",
  },
  {
    prompt: "Who often sits with Anima Aita during evening tea?",
    options: [
      { name: "Mitali", hint: "Daughter" },
      { name: "Rohan", hint: "Grandson" },
      { name: "Arun", hint: "Son" },
      { name: "Pradip", hint: "Husband" },
    ],
    correct: "Mitali",
  },
  {
    prompt: "Who is Anima Aita's son?",
    options: [
      { name: "Arun", hint: "Helps at home" },
      { name: "Rohan", hint: "Grandson" },
      { name: "Pradip", hint: "Husband" },
      { name: "Mitali", hint: "Daughter" },
    ],
    correct: "Arun",
  },
];

export function RecognitionGame({ patient }: { patient: Patient }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (index >= QUESTIONS.length) {
    return (
      <section className="max-w-2xl">
        <h1 className="font-serif text-4xl">Those names are still close.</h1>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={`/memory/${patient.id}/activities`} className="btn-primary">
            Try another activity
          </Link>
          <Link href={`/memory/${patient.id}`} className="btn-secondary">
            Return to memory space
          </Link>
        </div>
      </section>
    );
  }

  const current = QUESTIONS[index];

  return (
    <section className="max-w-3xl">
      <p className="text-sm tracking-[0.18em] text-primary uppercase">Recognize · Tap to identify</p>
      <p className="mt-2 text-lg">
        {String(index + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}
      </p>
      <h1 className="mt-6 font-serif text-4xl leading-tight">{current.prompt}</h1>
      {!feedback ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {current.options.map((option) => (
            <button
              key={option.name}
              type="button"
              onClick={() =>
                setFeedback(
                  option.name === current.correct
                    ? `Yes. That's ${option.name}.`
                    : `That's okay. This one is ${current.correct}.`
                )
              }
              className="min-h-28 border border-border bg-card p-5 text-left hover:border-foreground"
            >
              <p className="font-serif text-3xl">{option.name}</p>
              <p className="mt-1 text-base text-muted-foreground">{option.hint}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-border bg-card p-6">
          <p className="text-xl">{feedback}</p>
          <button
            type="button"
            className="btn-primary mt-6"
            onClick={() => {
              setFeedback(null);
              setIndex((value) => value + 1);
            }}
          >
            Continue
          </button>
        </div>
      )}
    </section>
  );
}
