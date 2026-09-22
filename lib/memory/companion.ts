import { localMemoryAnswer } from "./localAnswer";
import { stripMissingMemory } from "./stripMissingMemory";

export type CompanionReply = {
  success: boolean;
  answer: string;
  query?: string;
  patientId?: string;
  retrievedMemories?: unknown[];
};

export async function askMemoryCompanion(
  patientId: string,
  query: string
): Promise<CompanionReply> {
  try {
    const response = await fetch("/api/rag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId, query, topK: 5 }),
    });
    const data = (await response.json()) as CompanionReply;
    if (!response.ok || !data.success || !data.answer) {
      throw new Error("RAG unavailable");
    }
    data.answer = stripMissingMemory(
      data.answer,
      "Let's stay with something familiar — family, tea, or a place she knows."
    );
    return data;
  } catch {
    const fallback = localMemoryAnswer(patientId, query);
    return {
      success: true,
      query,
      patientId,
      answer: fallback.answer,
      retrievedMemories: fallback.retrievedMemories,
    };
  }
}

export async function transcribeAudio(audio: Blob, languageCode = "en-IN") {
  const formData = new FormData();
  const file = new File([audio], "speech.wav", {
    type: audio.type || "audio/wav",
  });
  formData.append("audio", file);
  formData.append("languageCode", languageCode);

  const response = await fetch("/api/sarvam/stt", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  const transcript =
    (typeof data.transcript === "string" && data.transcript) ||
    (typeof data.transcript_text === "string" && data.transcript_text) ||
    "";
  if (!response.ok || !data.success || !transcript.trim()) {
    throw new Error(data.error || "Speech recognition failed.");
  }
  return transcript.trim();
}

export async function speakText(text: string, languageCode = "en-IN") {
  try {
    const response = await fetch("/api/sarvam/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, languageCode }),
    });
    const data = await response.json();
    if (!response.ok || !data.success || !data.audio) return null;
    return data.audio as string;
  } catch {
    return null;
  }
}

export function playBase64Audio(audio: string) {
  const src = audio.startsWith("data:")
    ? audio
    : `data:audio/wav;base64,${audio}`;
  const player = new Audio(src);
  void player.play();
  return player;
}
