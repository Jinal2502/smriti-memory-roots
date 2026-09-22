import { loadMemoryBank } from "./loadMemoryBank";
import { Memory, RetrievedMemory } from "./types";

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
    [
      memory.title,
      memory.content,
      memory.category,
      ...memory.entities,
      ...memory.activityTypes,
    ].join(" ")
  );

  const memoryWords = new Set(tokenize(searchableText));

  let score = 0;

  for (const word of queryWords) {
    if (memoryWords.has(word)) {
      score += 1;
    }
  }

  const normalizedTitle = normalize(memory.title);
  const normalizedContent = normalize(memory.content);
  const normalizedEntities = memory.entities.map(normalize);

  for (const word of queryWords) {
    if (normalizedTitle.includes(word)) {
      score += 2;
    }

    if (normalizedEntities.some((entity) => entity.includes(word))) {
      score += 3;
    }

    if (normalizedContent.includes(word)) {
      score += 0.5;
    }
  }

  if (memory.importance === "high") {
    score += 0.5;
  }

  return score;
}

export function retrieveMemories(
  query: string,
  topK: number = 3,
  patientId: string = "patient_demo_001"
): RetrievedMemory[] {
  const memories = loadMemoryBank(patientId);

  const scoredMemories = memories.map((memory) => ({
    ...memory,
    score: calculateScore(query, memory),
  }));

  const hits = scoredMemories
    .filter((memory) => memory.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  if (hits.length) return hits;

  return memories
    .filter((memory) => memory.importance === "high" || memory.category === "family")
    .slice(0, Math.max(topK, 3))
    .map((memory) => ({ ...memory, score: 0.1 }));
}
