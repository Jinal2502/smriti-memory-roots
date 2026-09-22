import { notFound } from "next/navigation";
import Link from "next/link";
import { PageMain, SmritiShell, TopBar } from "@/components/smriti/layout/SmritiShell";
import { CaregiverDesk } from "@/components/smriti/caregiver/CaregiverDesk";
import { getPatient, getPatientMemories } from "@/lib/memory/patients";

export default async function CaregiverPage({
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
        backHref={`/memory/${patient.id}`}
        backLabel="Memory space"
        eyebrow="Caregiver desk"
        title={patient.preferredName}
        meta="Daily report"
        action={
          <Link href={`/memory/${patient.id}/activities`} className="inline-flex min-h-11 items-center text-base underline">
            Back to activities
          </Link>
        }
      />
      <PageMain>
        <CaregiverDesk patient={patient} memories={getPatientMemories(patient.id)} />
      </PageMain>
    </SmritiShell>
  );
}
