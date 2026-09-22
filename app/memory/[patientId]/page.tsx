import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { SmritiShell, TopBar } from "@/components/smriti/layout/SmritiShell";
import { MemoryWorld } from "@/components/smriti/memory/MemoryWorld";
import { getPatient, isFeaturedPatient } from "@/lib/memory/patients";

export default async function MemoryPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  const patient = getPatient(patientId);
  if (!patient) notFound();

  return (
    <SmritiShell>
      <div className="gamosa-band" aria-hidden />
      <TopBar
        backHref="/patients"
        backLabel="Profiles"
        title={patient.preferredName}
        meta={`${patient.state} · ${patient.primaryLanguage}`}
        action={
          isFeaturedPatient(patient.id) ? (
            <Link
              href={`/caregiver/${patient.id}`}
              className="inline-flex min-h-11 items-center text-base underline"
            >
              Caregiver view
            </Link>
          ) : null
        }
      />
      <Suspense fallback={<div className="mx-auto max-w-6xl px-8 py-16 text-lg">Preparing memory space...</div>}>
        <MemoryWorld patient={patient} />
      </Suspense>
    </SmritiShell>
  );
}
