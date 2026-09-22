import { notFound } from "next/navigation";
import { PageMain, SmritiShell, TopBar } from "@/components/smriti/layout/SmritiShell";
import { SequenceGame } from "@/components/smriti/games/SequenceGame";
import { getPatient } from "@/lib/memory/patients";

export default async function SequencePage({
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
        backHref={`/memory/${patient.id}/activities`}
        backLabel="Activities"
        title="Put it together"
        meta={`${patient.preferredName}'s memory space`}
      />
      <PageMain>
        <SequenceGame patient={patient} />
      </PageMain>
    </SmritiShell>
  );
}
