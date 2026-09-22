import type { Memory, Patient } from "@/lib/memory/types";

export function SessionSummary({
  patient,
  memories,
}: {
  patient: Patient;
  memories: Memory[];
}) {
  const categories = ["family", "place", "food", "music", "festival", "routine"];
  const max = Math.max(
    1,
    ...categories.map((category) => memories.filter((memory) => memory.category === category).length)
  );

  return (
    <div className="space-y-10">
      <p className="border border-border bg-card px-4 py-3 text-base text-muted-foreground">
        Prototype interaction insights — not a clinical assessment.
      </p>
      <section>
        <h2 className="font-serif text-3xl">Today&apos;s memory session</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          {patient.preferredName} · {patient.city}, {patient.state}
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="border border-border bg-card p-5">
            <dt className="text-sm text-muted-foreground">Activities</dt>
            <dd className="mt-1 text-3xl">5</dd>
          </div>
          <div className="border border-border bg-card p-5">
            <dt className="text-sm text-muted-foreground">Memories in this space</dt>
            <dd className="mt-1 text-3xl">{memories.length}</dd>
          </div>
          <div className="border border-border bg-card p-5">
            <dt className="text-sm text-muted-foreground">Voice</dt>
            <dd className="mt-1 text-3xl">Ready</dd>
          </div>
        </dl>
      </section>
      <section className="border border-border bg-card p-6">
        <h3 className="font-serif text-2xl">How voice becomes an answer</h3>
        <ol className="mt-4 space-y-2 text-lg">
          <li>Voice input</li>
          <li>Speech understood (Sarvam STT)</li>
          <li>Only this person&apos;s memories are searched</li>
          <li>A grounded reply is written</li>
          <li>The reply can be spoken (Sarvam TTS)</li>
        </ol>
      </section>
      <section>
        <h3 className="text-lg font-medium">Familiar themes</h3>
        <ul className="mt-4 space-y-3">
          {categories.map((category) => {
            const count = memories.filter((memory) => memory.category === category).length;
            const width = Math.round((count / max) * 100);
            return (
              <li key={category}>
                <div className="mb-1 flex justify-between text-base">
                  <span className="capitalize">{category === "place" ? "Places" : category}</span>
                  <span className="text-muted-foreground">{count}</span>
                </div>
                <div className="h-3 bg-secondary">
                  <div className="h-3 bg-primary" style={{ width: `${width}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <h3 className="text-lg font-medium">Familiar topics</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {memories.slice(0, 8).map((memory) => {
            const topic =
              memory.entities.find(
                (entity) => entity !== patient.preferredName && entity !== patient.name
              ) || memory.title;
            return (
              <li key={memory.id} className="border border-border bg-card px-3 py-2 text-base">
                {topic}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
