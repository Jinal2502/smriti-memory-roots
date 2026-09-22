"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Patient } from "@/lib/memory/types";

const STEPS = [
  "Wake up",
  "Spend a little time in the garden",
  "Have Assam tea",
  "Sit with family",
];

export function SequenceGame({ patient }: { patient: Patient }) {
  const [order, setOrder] = useState(() => [STEPS[2], STEPS[0], STEPS[3], STEPS[1]]);
  const [done, setDone] = useState(false);
  const correct = useMemo(() => JSON.stringify(order) === JSON.stringify(STEPS), [order]);

  function move(from: number, direction: -1 | 1) {
    const to = from + direction;
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setOrder(next);
  }

  return (
    <section className="max-w-2xl">
      <p className="text-sm tracking-[0.18em] text-primary uppercase">Put it together · Order the moments</p>
      <h1 className="mt-3 font-serif text-4xl">Put Anima&apos;s morning in order.</h1>
      <p className="mt-3 text-xl text-muted-foreground">
        Move the cards until the morning feels familiar. There is no hurry.
      </p>
      {!done ? (
        <ol className="mt-8 space-y-3">
          {order.map((step, index) => (
            <li key={step} className="flex items-center gap-3 border border-border bg-card p-4">
              <span className="w-8 font-serif text-2xl text-primary">{index + 1}</span>
              <span className="flex-1 text-xl">{step}</span>
              <div className="flex gap-2">
                <button type="button" className="min-h-12 min-w-12 border border-border" onClick={() => move(index, -1)} aria-label="Move earlier">
                  ↑
                </button>
                <button type="button" className="min-h-12 min-w-12 border border-border" onClick={() => move(index, 1)} aria-label="Move later">
                  ↓
                </button>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-8 text-xl leading-relaxed">
          {correct
            ? "Yes. That is how the morning usually unfolds."
            : "That's okay. A familiar morning can still be garden, tea, and family — in whatever order feels kind."}
        </p>
      )}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {!done ? (
          <button type="button" className="btn-primary" onClick={() => setDone(true)}>
            That feels right
          </button>
        ) : (
          <>
            <Link href={`/memory/${patient.id}/activities`} className="btn-primary">
              Try another activity
            </Link>
            <Link href={`/memory/${patient.id}`} className="btn-secondary">
              Return to memory space
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
