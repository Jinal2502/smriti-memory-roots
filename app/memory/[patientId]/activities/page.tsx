import { notFound } from "next/navigation";
import { PageMain, SmritiShell, TopBar } from "@/components/smriti/layout/SmritiShell";
import { ActivitySelector } from "@/components/smriti/activities/ActivitySelector";
import { getPatient } from "@/lib/memory/patients";

export default async function ActivitiesPage({
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
        title={patient.preferredName}
        meta={`${patient.state} · ${patient.primaryLanguage}`}
      />
      <PageMain>
        <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          Today&apos;s sitting.
        </h1>
        <p className="mt-4 max-w-xl text-xl text-muted-foreground">
          Remember and Talk are the main session. The other three are short daily check-ins.
        </p>
        <div className="mt-12">
          <ActivitySelector patientId={patient.id} />
        </div>
      </PageMain>
    </SmritiShell>
  );
}
