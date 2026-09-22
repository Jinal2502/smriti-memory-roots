import Link from "next/link";
import type { Patient } from "@/lib/memory/types";
import { EditorialImage } from "@/components/smriti/media/EditorialImage";

export function PatientCard({
  patient,
  memoryCount,
}: {
  patient: Patient;
  memoryCount: number;
}) {
  return (
    <Link
      href={`/memory/${patient.id}?prepare=1`}
      className="group grid overflow-hidden border border-border bg-white transition-colors hover:border-[#171717] focus-visible:outline-none md:grid-cols-[180px_1fr]"
    >
      <EditorialImage
        src={patient.portrait}
        alt={`Portrait for demonstration profile ${patient.preferredName}`}
        className="h-56 md:h-full"
      />
      <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
        <div>
          <p className="text-sm tracking-[0.18em] text-muted-foreground uppercase">
            Demonstration profile · {patient.state}
          </p>
          <h2 className="mt-2 font-serif text-3xl text-foreground">{patient.preferredName}</h2>
          <p className="mt-1 text-lg text-muted-foreground">
            {patient.city} · {patient.primaryLanguage}
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground">
            {patient.memoryTheme}
          </p>
        </div>
        <p className="text-base text-muted-foreground">
          {memoryCount} memories · Enter {patient.preferredName}&apos;s memory space
        </p>
      </div>
    </Link>
  );
}
