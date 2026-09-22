import { notFound } from "next/navigation";
import { PageMain, SmritiShell, TopBar } from "@/components/smriti/layout/SmritiShell";
import { RecallGame } from "@/components/smriti/games/RecallGame";
import { getPatient } from "@/lib/memory/patients";

export default async function RecallPage({
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
        title="Remember"
        meta={`${patient.preferredName}'s memory space`}
      />
      <PageMain>
        <RecallGame patient={patient} />
      </PageMain>
    </SmritiShell>
  );
}
