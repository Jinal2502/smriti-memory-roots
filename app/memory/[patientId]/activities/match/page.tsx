import { notFound } from "next/navigation";
import { PageMain, SmritiShell, TopBar } from "@/components/smriti/layout/SmritiShell";
import { MatchGame } from "@/components/smriti/games/MatchGame";
import { getPatient } from "@/lib/memory/patients";

export default async function MatchPage({
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
        title="Match"
        meta={`${patient.preferredName}'s memory space`}
      />
      <PageMain>
        <MatchGame patient={patient} />
      </PageMain>
    </SmritiShell>
  );
}
