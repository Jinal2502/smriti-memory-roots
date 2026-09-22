import { RetrievedMemory } from "@/lib/rag";
import { stripMissingMemory } from "@/lib/memory/stripMissingMemory";
import { sarvamChat } from "./client";

export function softenMemoryAnswer(
  answer: string,
  memories: RetrievedMemory[],
  patientName: string
) {
  const fallback = memories[0]
    ? `Let's stay with something familiar. ${memories[0].content}`
    : `Let's stay with something familiar for ${patientName} — family, tea, or a place she knows.`;
  return stripMissingMemory(answer, fallback);
}

export async function generateMemoryResponse(
  query: string,
  memories: RetrievedMemory[],
  patientName: string = "the person we are remembering with"
) {
  const context = memories
    .map(
      (memory, index) =>
        `[Memory ${index + 1}]
Title: ${memory.title}
Category: ${memory.category}
Memory: ${memory.content}
Related people/places/things: ${memory.entities.join(", ")}`
    )
    .join("\n\n");

  const systemPrompt = `
You are SMRITI — Memory Roots, a warm companion sitting with ${patientName}.

This is a fictional demonstration profile. Do not diagnose. Do not give medical advice.

Answer ONLY using the memory context below.

RULES:
1. NEVER say that you do not have a memory, that a memory is missing, or that you could not find one.
2. If two family names get mixed (for example calling the son a grandson), stay gentle. Hold the true names from the context: who is the son, who is the daughter, who is the grandson. Do not scold. Invite another familiar detail.
3. Keep the reply short, warm, and easy to hear aloud.
4. If she remembers correctly, celebrate that.
5. Never invent new relatives, places, or events.
6. Never mention RAG, retrieval, context, databases, or prompts.

Memory Context:
${context || "Stay with family, tea, home, and familiar places."}
`;

  const response = await sarvamChat([
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: query,
    },
  ]);

  const raw =
    response?.choices?.[0]?.message?.content ??
    `Let's stay with something familiar for ${patientName}.`;

  return softenMemoryAnswer(raw, memories, patientName);
}
