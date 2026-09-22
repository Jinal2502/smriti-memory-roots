"use client";

import { useState } from "react";
import Link from "next/link";
import type { Patient } from "@/lib/memory/types";
import { VoiceRecorder, type VoicePhase } from "@/components/smriti/voice/VoiceRecorder";
import { askMemoryCompanion, playBase64Audio, speakText } from "@/lib/memory/companion";
import { saveSessionEntry, updateSessionEntry, type Familiarity } from "@/lib/memory/sessionLog";

const PROMPTS = [
  "Tell me about your children.",
  "What do you remember about Rohan?",
  "Tell me a place you enjoyed visiting with family.",
];

export function TalkSession({ patient }: { patient: Patient }) {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [heard, setHeard] = useState<string | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const [entryId, setEntryId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState<VoicePhase>("idle");
  const [saved, setSaved] = useState(false);

  const prompt = PROMPTS[step];

  async function send(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    setBusy(true);
    setHeard(value);
    setSaved(false);
    const response = await askMemoryCompanion(
      patient.id,
      `${prompt} She said: ${value}`
    );
    setReply(response.answer);
    const entry = saveSessionEntry({
      patientId: patient.id,
      activity: "talk",
      prompt,
      heard: value,
      smritiSaid: response.answer,
      familiarity: "needed_hint",
    });
    setEntryId(entry.id);
    setBusy(false);
    setPhase("speaking");
    const audio = await speakText(response.answer);
    if (audio) playBase64Audio(audio);
    setPhase("idle");
  }

  function mark(familiarity: Familiarity, correction = "") {
    if (!entryId) return;
    updateSessionEntry(entryId, { familiarity, correction });
    setSaved(true);
  }

  function nextPrompt() {
    setHeard(null);
    setReply(null);
    setTyped("");
    setEntryId(null);
    setSaved(false);
    setStep((value) => Math.min(value + 1, PROMPTS.length - 1));
  }

  return (
    <section className="mx-auto max-w-2xl">
      <p className="text-sm tracking-[0.18em] text-primary uppercase">
        Talk · Caregiver sits with her
      </p>
      <p className="mt-2 text-lg text-muted-foreground">
        Prompt {step + 1} of {PROMPTS.length}
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight">{prompt}</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Let the story run. Tap the mic to start, let her talk, then tap again when she is finished.
        Two minutes is plenty. If the mic misses words, type the story underneath.
      </p>

      <div className="mt-10">
        <VoiceRecorder
          variant="story"
          disabled={busy}
          phase={phase}
          onPhaseChange={setPhase}
          onTranscript={(transcript) => send(transcript)}
        />
      </div>

      <form
        className="mt-8 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          void send(typed);
        }}
      >
        <label htmlFor="talk-typed" className="block text-lg">
          Type what she said
        </label>
        <textarea
          id="talk-typed"
          value={typed}
          onChange={(event) => setTyped(event.target.value)}
          rows={6}
          className="w-full border border-border bg-card p-4 text-xl leading-relaxed"
          placeholder="Mitali comes in the evening… Arun helps at home… Rohan sits for stories by the river…"
        />
        <button type="submit" disabled={busy || !typed.trim()} className="btn-primary disabled:opacity-50">
          Use these words
        </button>
      </form>

      {heard ? (
        <blockquote className="mt-10 border-l-2 border-primary pl-5">
          <p className="text-base text-muted-foreground">She said</p>
          <p className="mt-1 text-xl leading-relaxed">{heard}</p>
        </blockquote>
      ) : null}

      {reply ? (
        <div className="mt-8 border border-border bg-card p-6">
          <p className="text-base text-muted-foreground">SMRITI answered from her memory space</p>
          <p className="mt-2 text-xl leading-relaxed">{reply}</p>
          <p className="mt-6 text-lg">Caregiver check</p>
          <div className="mt-3 flex flex-col gap-2">
            <button type="button" className="btn-secondary" onClick={() => mark("came_back")}>
              Yes — that memory is right
            </button>
            <button type="button" className="btn-secondary" onClick={() => mark("needed_hint")}>
              She needed a little help
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => mark("caregiver_helped", heard || "")}
            >
              I need to correct this on the caregiver desk
            </button>
          </div>
          {saved ? <p className="mt-3 text-base text-muted-foreground">Saved for the caregiver desk.</p> : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {step < PROMPTS.length - 1 ? (
              <button type="button" className="btn-primary" onClick={nextPrompt}>
                Next prompt
              </button>
            ) : (
              <Link href={`/caregiver/${patient.id}`} className="btn-primary">
                Finish on caregiver desk
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
