"use client";

import { useState } from "react";
import Link from "next/link";
import type { Patient } from "@/lib/memory/types";
import { EditorialImage } from "@/components/smriti/media/EditorialImage";
import { VoiceRecorder, type VoicePhase } from "@/components/smriti/voice/VoiceRecorder";
import { askMemoryCompanion, playBase64Audio, speakText } from "@/lib/memory/companion";
import { animaRecallQuestions, answerMatches } from "@/lib/memory/demoRecall";
import { saveSessionEntry } from "@/lib/memory/sessionLog";

export function RecallGame({ patient }: { patient: Patient }) {
  const questions = animaRecallQuestions;
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [heard, setHeard] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState<VoicePhase>("idle");
  const [matched, setMatched] = useState(false);

  const current = questions[index];

  async function respond(userText: string) {
    if (!current || busy) return;
    const spoken = userText.trim();
    if (!spoken) return;
    setBusy(true);
    setHeard(spoken);
    const ok = answerMatches(spoken, current);
    setMatched(ok);
    const local = ok ? current.success : current.help;
    const query = `${current.prompt} She said: ${spoken}`;
    const reply = await askMemoryCompanion(patient.id, query);
    const answer = ok ? local : reply.answer || local;
    setFeedback(answer);
    saveSessionEntry({
      patientId: patient.id,
      activity: "remember",
      prompt: current.prompt,
      heard: spoken,
      smritiSaid: answer,
      familiarity: ok ? "came_back" : "needed_hint",
    });
    setBusy(false);
    setPhase("speaking");
    const audio = await speakText(answer);
    if (audio) playBase64Audio(audio);
    setPhase("idle");
  }

  function next() {
    setFeedback(null);
    setHeard(null);
    setTyped("");
    setMatched(false);
    if (index + 1 >= questions.length) {
      setComplete(true);
      return;
    }
    setIndex((value) => value + 1);
  }

  if (complete) {
    return (
      <section className="max-w-2xl">
        <p className="text-sm tracking-[0.18em] text-primary uppercase">Session complete</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight">That was a gentle Remember session.</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Open the caregiver desk to mark how each memory came back, add notes, or correct a name.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href={`/caregiver/${patient.id}`} className="btn-primary">
            Open caregiver desk
          </Link>
          <Link href={`/memory/${patient.id}/talk`} className="btn-secondary">
            Talk about the children
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <EditorialImage
        src={current.image}
        alt={current.caption}
        className="aspect-[4/5] max-h-[560px] border border-border"
      />
      <div>
        <p className="text-sm tracking-[0.18em] text-primary uppercase">
          Remember · Caregiver-guided
        </p>
        <p className="mt-2 text-lg">
          {String(index + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
        </p>
        <h1 className="mt-6 font-serif text-4xl leading-tight">{current.prompt}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{current.hint}</p>

        {!feedback ? (
          <div className="mt-8 space-y-8">
            <VoiceRecorder
              variant="answer"
              disabled={busy}
              phase={phase}
              onPhaseChange={setPhase}
              onTranscript={(transcript) => respond(transcript)}
            />

            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                void respond(typed);
              }}
            >
              <label htmlFor="heard-text" className="block text-lg text-foreground">
                Or type what she said
              </label>
              <input
                id="heard-text"
                value={typed}
                onChange={(event) => setTyped(event.target.value)}
                placeholder="e.g. grandson"
                className="min-h-14 w-full border border-border bg-card px-4 text-xl text-foreground"
              />
              <button type="submit" disabled={busy || !typed.trim()} className="btn-primary disabled:opacity-50">
                Use this answer
              </button>
            </form>

            <div>
              <p className="mb-3 text-lg text-foreground">Or she can tap one</p>
              <div className="grid gap-3">
                {current.choices.map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    disabled={busy}
                    onClick={() => respond(choice)}
                    className="min-h-16 border border-border bg-card px-5 text-left text-xl hover:border-foreground disabled:opacity-60"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 border border-border bg-card p-6">
            {heard ? (
              <p className="text-base text-muted-foreground">She said: {heard}</p>
            ) : null}
            <p className="mt-2 text-xl leading-relaxed">{feedback}</p>
            {!matched ? (
              <p className="mt-3 text-base text-muted-foreground">
                Caregiver can confirm or correct this later on the caregiver desk.
              </p>
            ) : null}
            <button type="button" onClick={next} className="btn-primary mt-6">
              Continue
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
