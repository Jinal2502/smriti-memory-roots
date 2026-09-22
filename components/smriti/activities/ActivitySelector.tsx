import Link from "next/link";

export function ActivitySelector({ patientId }: { patientId: string }) {
  return (
    <div className="space-y-12">
      <section className="grid gap-4 md:grid-cols-2">
        <Link
          href={`/memory/${patientId}/activities/recall`}
          className="border border-primary bg-card p-8"
        >
          <p className="text-sm tracking-[0.18em] text-primary uppercase">Featured sitting</p>
          <h2 className="mt-3 font-serif text-4xl">Remember</h2>
          <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
            The main session. Speak or type a familiar name. SMRITI answers from her world.
          </p>
        </Link>
        <Link href={`/memory/${patientId}/talk`} className="border border-primary bg-card p-8">
          <p className="text-sm tracking-[0.18em] text-primary uppercase">Featured sitting</p>
          <h2 className="mt-3 font-serif text-4xl">Talk</h2>
          <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
            Let her tell a story about the children or a place. You stop the mic when she is done.
          </p>
        </Link>
      </section>

      <section>
        <h2 className="font-serif text-3xl">Daily check-ins</h2>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
          Short and optional. Mark them on the caregiver daily report when you finish.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link href={`/memory/${patientId}/activities/recognize`} className="border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Tap to identify</p>
            <h3 className="mt-2 font-serif text-2xl">Recognize</h3>
          </Link>
          <Link href={`/memory/${patientId}/activities/sequence`} className="border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Order the morning</p>
            <h3 className="mt-2 font-serif text-2xl">Put it together</h3>
          </Link>
          <Link href={`/memory/${patientId}/activities/match`} className="border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Find the pair</p>
            <h3 className="mt-2 font-serif text-2xl">Match</h3>
          </Link>
        </div>
      </section>
    </div>
  );
}
