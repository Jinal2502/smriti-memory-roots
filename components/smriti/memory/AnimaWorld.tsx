import { EditorialImage } from "@/components/smriti/media/EditorialImage";
import { NamePortrait } from "@/components/smriti/media/NamePortrait";
import { visuals } from "@/lib/memory/visuals";
import type { Patient } from "@/lib/memory/types";
import { greetingForNow } from "@/lib/memory/patients";
import Link from "next/link";
import { MemoryMap } from "@/components/smriti/memory/MemoryMap";

const PEOPLE = [
  { name: "Pradip", relationship: "Husband" },
  { name: "Mitali", relationship: "Daughter" },
  { name: "Arun", relationship: "Son" },
  { name: "Rohan", relationship: "Grandson" },
];

const PLACES = [
  { name: "Brahmaputra riverbank", image: visuals.brahmaputra, note: "Peaceful evenings" },
  { name: "Tea garden", image: visuals.teaGarden, note: "Walking among the rows" },
  { name: "Family home", image: visuals.gamosa, note: "Guwahati evenings" },
];

const EVERYDAY = ["Morning Assam tea", "Time in the garden", "Evening tea with family", "Small stories for Rohan"];
const CELEBRATIONS = ["Rongali Bihu", "Magh Bihu", "Bihu songs", "The gamosa"];

export function AnimaWorld({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-16">
      <section className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
        <div>
          <p className="text-sm tracking-[0.18em] text-muted-foreground uppercase">
            Demonstration profile · Assam
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            {greetingForNow(patient.preferredName)}
          </h1>
          <p className="mt-4 max-w-xl text-xl leading-relaxed text-muted-foreground">
            Where would you like to begin today? This space belongs to the people, places, food
            and festivals Anima Aita still holds close.
          </p>
          <p className="mt-4 text-lg text-foreground">
            {patient.age} · {patient.city}, {patient.state} · {patient.primaryLanguage}
          </p>
          <Link href={`/memory/${patient.id}/activities`} className="btn-primary mt-8">
            Begin with Remember
          </Link>
        </div>
        <figure>
          <EditorialImage
            src={visuals.anima}
            alt="Demonstration portrait for Anima Aita, an elderly Assamese woman"
            className="aspect-[3/4] border border-border"
          />
          <figcaption className="mt-2 text-base text-muted-foreground">
            Anima Aita · fictional demonstration
          </figcaption>
        </figure>
      </section>

      <section>
        <h2 className="font-serif text-3xl">People she remembers</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PEOPLE.map((person) => (
            <li key={person.name} className="border border-border bg-card p-5">
              <p className="font-serif text-2xl">{person.name}</p>
              <p className="text-base text-muted-foreground">{person.relationship}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-3xl">Places she knows</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {PLACES.map((place) => (
            <li key={place.name}>
              <EditorialImage src={place.image} alt={place.name} className="aspect-[16/10] border border-border" />
              <p className="mt-3 text-xl text-foreground">{place.name}</p>
              <p className="text-base text-muted-foreground">{place.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">Everyday memories</h2>
          <ul className="mt-5 space-y-3">
            {EVERYDAY.map((item) => (
              <li key={item} className="border-b border-border pb-3 text-xl">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-3xl">Celebrations</h2>
          <EditorialImage src={visuals.bihu} alt="Bihu dancers in Assam" className="mt-5 aspect-[16/9] border border-border" />
          <ul className="mt-4 space-y-2 text-lg text-muted-foreground">
            {CELEBRATIONS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <MemoryMap />
    </div>
  );
}

export function SupportingProfile({ patient }: { patient: Patient }) {
  return (
    <div className="max-w-2xl space-y-8">
      <NamePortrait name={patient.preferredName} className="h-40 w-40" />
      <div>
        <p className="text-sm tracking-[0.18em] text-muted-foreground uppercase">
          Supporting profile · {patient.state}
        </p>
        <h1 className="mt-3 font-serif text-4xl">{patient.preferredName}</h1>
        <p className="mt-3 text-xl text-muted-foreground">
          {patient.age} · {patient.city} · {patient.primaryLanguage}
        </p>
        <p className="mt-6 text-lg leading-relaxed">
          This fictional profile shows that SMRITI can hold many culturally specific memory spaces.
          The fully built demonstration for judges is Anima Aita from Assam.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/memory/patient_demo_001?prepare=1" className="btn-primary">
          Open Anima Aita&apos;s memory space
        </Link>
        <Link href="/patients" className="btn-secondary">
          All profiles
        </Link>
      </div>
    </div>
  );
}
