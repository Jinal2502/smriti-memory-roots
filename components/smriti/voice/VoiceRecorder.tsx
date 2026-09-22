"use client";

import { useRef, useState } from "react";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { encodeWav, mergeFloat32 } from "@/lib/audio/wav";

export type VoicePhase =
  | "idle"
  | "listening"
  | "understanding"
  | "finding"
  | "speaking"
  | "error";

type SpeechWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

export function VoiceRecorder({
  onTranscript,
  disabled,
  phase,
  onPhaseChange,
  variant = "answer",
}: {
  onTranscript: (transcript: string) => Promise<void> | void;
  disabled?: boolean;
  phase?: VoicePhase;
  onPhaseChange?: (phase: VoicePhase) => void;
  variant?: "answer" | "story";
}) {
  const isStory = variant === "story";
  const maxMs = isStory ? 120_000 : 20_000;
  const [internal, setInternal] = useState<VoicePhase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [liveWords, setLiveWords] = useState("");
  const status = phase ?? internal;
  const samplesRef = useRef<Float32Array[]>([]);
  const contextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const browserTextRef = useRef("");
  const timerRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  const listeningRef = useRef(false);
  const stoppingRef = useRef(false);

  function setPhase(next: VoicePhase) {
    setInternal(next);
    onPhaseChange?.(next);
  }

  function stopTimers() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (tickRef.current) window.clearInterval(tickRef.current);
    timerRef.current = null;
    tickRef.current = null;
  }

  function cleanupAudio() {
    listeningRef.current = false;
    processorRef.current?.disconnect();
    processorRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    void contextRef.current?.close();
    contextRef.current = null;
    try {
      recognitionRef.current?.stop();
    } catch {
      /* already stopped */
    }
    recognitionRef.current = null;
    stopTimers();
  }

  async function finish() {
    if (stoppingRef.current) return;
    stoppingRef.current = true;
    listeningRef.current = false;
    const browserText = browserTextRef.current.trim();
    const chunks = samplesRef.current;
    const sampleRate = contextRef.current?.sampleRate ?? 44100;
    cleanupAudio();
    setPhase("understanding");

    if (browserText) {
      setPhase("finding");
      await onTranscript(browserText);
      stoppingRef.current = false;
      return;
    }

    try {
      const wav = encodeWav(mergeFloat32(chunks), sampleRate);
      if (wav.size < 1000) {
        throw new Error("empty");
      }
      const { transcribeAudio } = await import("@/lib/memory/companion");
      const transcript = await transcribeAudio(wav, "en-IN");
      setPhase("finding");
      await onTranscript(transcript);
    } catch {
      setError("We couldn't catch that. Type the story below — there is no time limit on typing.");
      setPhase("error");
    }
    stoppingRef.current = false;
  }

  function startRecognition(Speech: new () => SpeechRecognitionLike) {
    const recognition = new Speech();
    recognition.lang = "en-IN";
    recognition.continuous = isStory;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const parts: string[] = [];
      for (let i = 0; i < event.results.length; i += 1) {
        const piece = event.results[i]?.[0]?.transcript;
        if (piece) parts.push(piece);
      }
      const text = parts.join(" ").trim();
      browserTextRef.current = text;
      setLiveWords(text);
    };
    recognition.onerror = () => undefined;
    recognition.onend = () => {
      if (listeningRef.current && isStory) {
        try {
          recognition.start();
        } catch {
          /* ignore */
        }
      }
    };
    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      /* already started */
    }
  }

  async function start() {
    setError(null);
    setLiveWords("");
    setElapsed(0);
    stoppingRef.current = false;
    samplesRef.current = [];
    browserTextRef.current = "";
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const context = new AudioContext();
      contextRef.current = context;
      const source = context.createMediaStreamSource(stream);
      await context.resume();
      const mute = context.createGain();
      mute.gain.value = 0;
      const processor = context.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      processor.onaudioprocess = (event) => {
        samplesRef.current.push(new Float32Array(event.inputBuffer.getChannelData(0)));
      };
      source.connect(processor);
      processor.connect(mute);
      mute.connect(context.destination);

      const Speech =
        (window as SpeechWindow).SpeechRecognition ||
        (window as SpeechWindow).webkitSpeechRecognition;
      if (Speech) startRecognition(Speech);

      listeningRef.current = true;
      startedAtRef.current = Date.now();
      setPhase("listening");
      tickRef.current = window.setInterval(() => {
        setElapsed(Math.floor((Date.now() - startedAtRef.current) / 1000));
      }, 250);
      timerRef.current = window.setTimeout(() => {
        void finish();
      }, maxMs);
    } catch {
      setError("Microphone permission is needed. You can type the story instead.");
      setPhase("error");
    }
  }

  const busy = status === "understanding" || status === "finding" || status === "speaking";
  const minutes = Math.floor(elapsed / 60);
  const seconds = String(elapsed % 60).padStart(2, "0");

  const idleLabel = isStory
    ? "Tap to start listening"
    : "Tap the mic, then speak";
  const listenLabel = isStory
    ? `Listening… ${minutes}:${seconds} · tap when the story is finished`
    : `Listening… ${elapsed}s · tap when she has answered`;

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        disabled={disabled || busy}
        onClick={() => (status === "listening" ? void finish() : void start())}
        aria-label={status === "listening" ? listenLabel : idleLabel}
        className={cn(
          "flex size-24 items-center justify-center rounded-full border-2 border-foreground bg-card text-foreground",
          status === "listening" && "border-primary bg-secondary"
        )}
      >
        <Mic className="size-9" aria-hidden />
      </button>
      <p className="max-w-md text-center text-lg text-foreground">
        {status === "idle" && idleLabel}
        {status === "listening" && listenLabel}
        {status === "understanding" && "Understanding the story…"}
        {status === "finding" && "Finding a familiar memory…"}
        {status === "speaking" && "Speaking back…"}
        {status === "error" && "Try the mic again, or type the story"}
      </p>
      <p className="max-w-md text-center text-base text-muted-foreground">
        {isStory
          ? "There is no hurry. She can talk for up to two minutes. You stop the mic when she is done."
          : "Short answers are fine. Tap again as soon as she has said the name."}
      </p>
      {status === "listening" && liveWords ? (
        <p className="max-w-md text-center text-lg leading-relaxed text-foreground">
          Hearing: {liveWords}
        </p>
      ) : null}
      {error ? <p className="max-w-md text-center text-base text-foreground">{error}</p> : null}
    </div>
  );
}
