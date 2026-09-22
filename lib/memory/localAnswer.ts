import type { Memory, RetrievedMemory } from "./types";
import { getPatient, getPatientMemories } from "@/lib/memory/patients";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

function calculateScore(query: string, memory: Memory): number {
  const queryWords = tokenize(query);
  const searchableText = normalize(
    [memory.title, memory.content, memory.category, ...memory.entities, ...memory.activityTypes].join(" ")
  );
  const memoryWords = new Set(tokenize(searchableText));
  let score = 0;

  for (const word of queryWords) {
    if (memoryWords.has(word)) score += 1;
  }

  const normalizedTitle = normalize(memory.title);
  const normalizedContent = normalize(memory.content);
  const normalizedEntities = memory.entities.map(normalize);

  for (const word of queryWords) {
    if (normalizedTitle.includes(word)) score += 2;
    if (normalizedEntities.some((entity) => entity.includes(word))) score += 3;
    if (normalizedContent.includes(word)) score += 0.5;
  }

  if (memory.importance === "high") score += 0.5;
  return score;
}

export function scoreMemories(
  query: string,
  memories: Memory[],
  topK = 3
): RetrievedMemory[] {
  return memories
    .map((memory) => ({ ...memory, score: calculateScore(query, memory) }))
    .filter((memory) => memory.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export function localMemoryAnswer(patientId: string, query: string): {
  answer: string;
  retrievedMemories: RetrievedMemory[];
} {
  const patient = getPatient(patientId);
  const name = patient?.preferredName ?? "you";
  const retrievedMemories = scoreMemories(query, getPatientMemories(patientId), 5);

  if (!retrievedMemories.length) {
    const family = getPatientMemories(patientId)
      .filter((memory) => memory.category === "family")
      .slice(0, 3)
      .map((memory) => ({ ...memory, score: 0.1 }));
    return {
      retrievedMemories: family,
      answer: family[0]
        ? `Let's stay with something familiar. ${family[0].content}`
        : `Let's stay with family, tea, or a place ${name} already knows.`,
    };
  }

  const top = retrievedMemories[0];
  return {
    retrievedMemories,
    answer: `Let's stay with something familiar. ${top.content}`,
  };
}
