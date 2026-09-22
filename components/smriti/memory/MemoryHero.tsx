import Link from "next/link";
import type { Memory, MemoryTheme, Patient } from "@/lib/memory/types";
import { greetingForNow } from "@/lib/memory/patients";
import { EditorialImage } from "@/components/smriti/media/EditorialImage";

export function MemoryHero({
  patient,
  featured,
  memoryCount,
  themeCount,
}: {
  patient: Patient;
  featured?: Memory;
  memoryCount: number;
  themeCount: number;
}) {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div>
        <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
          {patient.preferredName}&apos;s memory space
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-[1.15] text-foreground sm:text-5xl">
          {greetingForNow(patient.preferredName)}
        </h1>
        <p className="mt-4 max-w-xl text-xl leading-relaxed text-muted-foreground">
          A few familiar things are waiting for you. Where would you like to begin today?
        </p>
        <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-y border-border py-5 text-foreground">
          <div>
            <dt className="text-sm text-muted-foreground">Memories</dt>
            <dd className="text-2xl">{memoryCount}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Themes</dt>
            <dd className="text-2xl">{themeCount}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Today</dt>
            <dd className="text-2xl">Gentle</dd>
          </div>
        </dl>
      </div>
      {featured ? (
        <figure>
          <EditorialImage
            src={featured.image}
            alt={featured.caption || featured.title}
            className="aspect-[4/3] border border-border"
          />
          <figcaption className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="font-serif text-2xl text-foreground">
                {featured.caption || featured.title}
              </p>
              <p className="text-base text-muted-foreground">{featured.category}</p>
            </div>
            <Link
              href={`/memory/${patient.id}/activities`}
              className="inline-flex min-h-12 items-center border border-[#171717] bg-[#171717] px-5 text-base text-white hover:bg-black"
            >
              Explore memory
            </Link>
          </figcaption>
        </figure>
      ) : null}
    </section>
  );
}

export function MemoryThemeCard({
  theme,
  href,
}: {
  theme: MemoryTheme;
  href: string;
}) {
  return (
    <Link href={href} className="group block border border-border bg-white hover:border-[#171717]">
      <EditorialImage src={theme.image} alt="" className="aspect-[5/3]" />
      <div className="p-5">
        <p className="font-serif text-2xl text-foreground">{theme.label}</p>
        <p className="mt-1 text-base text-muted-foreground">{theme.description}</p>
        <p className="mt-4 text-sm tracking-[0.14em] text-muted-foreground uppercase">
          {theme.count} memories
        </p>
      </div>
    </Link>
  );
}
