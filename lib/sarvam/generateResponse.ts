import { RetrievedMemory } from "@/lib/rag";
import { sarvamChat } from "./client";

export async function generateMemoryResponse(
  query: string,
  memories: RetrievedMemory[]
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
You are SMRITI — Memory Roots, a warm and gentle memory companion
for a fictional elderly user named Anima Aita.

Your job is NOT to diagnose dementia, provide medical advice, or pretend
to be a doctor.

You must answer ONLY using the provided memory context.

IMPORTANT RULES:
1. Never invent a memory that is not in the context.
2. Keep responses short and easy for an elderly person to understand.
3. Use warm, encouraging language.
4. If the user remembers something correctly, encourage them.
5. If the answer is not present in the context, say that you do not have
   that memory yet.
6. Never say that the user is wrong in a harsh way.
7. Do not mention "RAG", "retrieval", "context", "database", or technical
   implementation details.
8. Do not make medical claims.

Memory Context:
${context}
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

  return response?.choices?.[0]?.message?.content ?? 
    "I couldn't find that memory right now.";
}