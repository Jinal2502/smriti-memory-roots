"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Family",
  "Familiar places",
  "Everyday moments",
  "Stories & celebrations",
];

export function MemoryLoading({
  name,
  onDone,
}: {
  name: string;
  onDone: () => void;
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStep(1), 280),
      window.setTimeout(() => setStep(2), 620),
      window.setTimeout(() => setStep(3), 980),
      window.setTimeout(() => setStep(4), 1320),
      window.setTimeout(onDone, 1700),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [onDone]);

  return (
    <div className="mx-auto max-w-xl py-16">
      <p className="text-sm tracking-[0.22em] text-muted-foreground uppercase">
        Preparing memory space
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        Preparing {name}&apos;s memory space...
      </h1>
      <ul className="mt-10 space-y-4">
        {STEPS.map((label, index) => {
          const done = step > index;
          const current = step === index;
          return (
            <li key={label} className="flex items-center gap-4 text-xl text-foreground">
              <span
                aria-hidden
                className="flex size-7 items-center justify-center border border-border bg-white text-sm"
              >
                {done ? "✓" : current ? "○" : "○"}
              </span>
              <span className={done || current ? "text-foreground" : "text-[#a3a3a3]"}>
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
