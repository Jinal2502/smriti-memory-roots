import { notFound } from "next/navigation";
import { PageMain, SmritiShell, TopBar } from "@/components/smriti/layout/SmritiShell";
import { TalkSession } from "@/components/smriti/voice/TalkSession";
import { getPatient } from "@/lib/memory/patients";

export default async function TalkPage({
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
        title="Talk"
        meta={`${patient.preferredName}'s memory space`}
      />
      <PageMain>
        <TalkSession patient={patient} />
      </PageMain>
    </SmritiShell>
  );
}
