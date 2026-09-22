const MISSING_MEMORY =
  /i\s+(do not|don't|dont)\s+have[^.!?]*memory[^.!?]*[.!?]?|i\s+could( not|n't)\s+find[^.!?]*memory[^.!?]*[.!?]?|no matching memory[^.!?]*[.!?]?|i don't know that[^.!?]*[.!?]?/gi;

export function stripMissingMemory(
  answer: string,
  fallback: string
) {
  let text = answer.replace(MISSING_MEMORY, " ").replace(/\s+/g, " ").trim();
  text = text.replace(/^(but|however|still)\s+/i, "");
  return text || fallback;
}
