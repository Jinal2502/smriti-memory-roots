"use client";

import { useState } from "react";
import { animaMemoryMap } from "@/lib/memory/animaMap";
import { cn } from "@/lib/utils";

export function MemoryMap() {
  const [active, setActive] = useState(animaMemoryMap[0].id);
  const theme = animaMemoryMap.find((item) => item.id === active) ?? animaMemoryMap[0];

  return (
    <section className="border border-border bg-card p-6 sm:p-8">
      <p className="text-sm tracking-[0.18em] text-muted-foreground uppercase">
        Anima&apos;s memory map
      </p>
      <h2 className="mt-2 font-serif text-3xl text-foreground">Familiar things, held together.</h2>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        This is not a medical chart. It is a picture of the people, places and everyday moments
        that belong to Anima Aita.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {animaMemoryMap.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={cn(
              "min-h-12 px-4 text-base",
              item.id === active
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-white text-foreground hover:border-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[160px_1fr] lg:items-start">
        <p className="font-serif text-2xl text-primary">{theme.label}</p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {theme.nodes.map((node) => (
            <li key={node.name} className="border-l-2 border-primary pl-4">
              <p className="text-xl text-foreground">{node.name}</p>
              <p className="text-base text-muted-foreground">{node.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
