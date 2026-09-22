"use client";

import { useState } from "react";
import Link from "next/link";
import type { Patient } from "@/lib/memory/types";
import { cn } from "@/lib/utils";

const LEFT = ["Rohan", "Assam tea", "Brahmaputra", "Gamosa"];
const RIGHT = ["Grandson", "Morning", "Family visits", "Assamese celebrations"];
const PAIRS: Record<string, string> = {
  Rohan: "Grandson",
  "Assam tea": "Morning",
  Brahmaputra: "Family visits",
  Gamosa: "Assamese celebrations",
};

export function MatchGame({ patient }: { patient: Patient }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("Tap a word on the left, then tap what it belongs with.");

  const complete = Object.keys(matched).length === LEFT.length;

  function chooseLeft(item: string) {
    if (matched[item]) return;
    setSelected(item);
    setMessage(`Now find what belongs with ${item}.`);
  }

  function chooseRight(item: string) {
    if (!selected) {
      setMessage("Choose a word on the left first.");
      return;
    }
    if (Object.values(matched).includes(item)) return;
    if (PAIRS[selected] === item) {
      setMatched((current) => ({ ...current, [selected]: item }));
      setMessage(`Yes. ${selected} belongs with ${item}.`);
      setSelected(null);
    } else {
      setMessage("Not that pair. Let's try again — there is no hurry.");
      setSelected(null);
    }
  }

  return (
    <section className="max-w-3xl">
      <p className="text-sm tracking-[0.18em] text-primary uppercase">Match · Find the pair</p>
      <h1 className="mt-3 font-serif text-4xl">Connect people with memories.</h1>
      <p className="mt-3 text-xl text-muted-foreground">{message}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <ul className="space-y-3">
          {LEFT.map((item) => (
            <li key={item}>
              <button
                type="button"
                disabled={Boolean(matched[item])}
                onClick={() => chooseLeft(item)}
                className={cn(
                  "min-h-16 w-full border px-4 text-left text-xl",
                  selected === item ? "border-primary bg-secondary" : "border-border bg-card",
                  matched[item] && "opacity-50"
                )}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        <ul className="space-y-3">
          {RIGHT.map((item) => (
            <li key={item}>
              <button
                type="button"
                disabled={Object.values(matched).includes(item)}
                onClick={() => chooseRight(item)}
                className={cn(
                  "min-h-16 w-full border px-4 text-left text-xl",
                  Object.values(matched).includes(item)
                    ? "border-primary bg-secondary opacity-70"
                    : "border-border bg-card"
                )}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {complete ? (
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href={`/memory/${patient.id}/activities`} className="btn-primary">
            Try another activity
          </Link>
          <Link href={`/memory/${patient.id}`} className="btn-secondary">
            Return to memory space
          </Link>
        </div>
      ) : null}
    </section>
  );
}
