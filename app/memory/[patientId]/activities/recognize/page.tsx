import { notFound } from "next/navigation";
import { PageMain, SmritiShell, TopBar } from "@/components/smriti/layout/SmritiShell";
import { RecognitionGame } from "@/components/smriti/games/RecognitionGame";
import { getPatient } from "@/lib/memory/patients";

export default async function RecognizePage({
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
        title="Recognize"
        meta={`${patient.preferredName}'s memory space`}
      />
      <PageMain>
        <RecognitionGame patient={patient} />
      </PageMain>
    </SmritiShell>
  );
}
