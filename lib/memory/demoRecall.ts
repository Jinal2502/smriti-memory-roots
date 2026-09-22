import { visuals } from "./visuals";

export type RecallQuestion = {
  id: string;
  prompt: string;
  hint: string;
  image: string;
  caption: string;
  choices: string[];
  correctChoice: string;
  accepted: string[];
  success: string;
  help: string;
};

export const animaRecallQuestions: RecallQuestion[] = [
  {
    id: "rohan",
    prompt: "Who is Rohan?",
    hint: "A family relationship — son, daughter, or grandson.",
    image: visuals.motherSon,
    caption: "Family close to Anima Aita",
    choices: ["Grandson", "Son", "Neighbour"],
    correctChoice: "Grandson",
    accepted: ["grandson", "nati", "son's son", "my grandson", "rohan is grandson", "he is grandson"],
    success: "That's right. Rohan is your grandson. He loves hearing your small stories.",
    help: "That's okay. Rohan is your grandson — Mitali and Arun's little one, who sits for your stories.",
  },
  {
    id: "mitali",
    prompt: "Who sits with you for evening tea?",
    hint: "Someone in the family who visits in the evening.",
    image: visuals.anima,
    caption: "Evening tea",
    choices: ["Mitali, your daughter", "The postman", "A neighbour from town"],
    correctChoice: "Mitali, your daughter",
    accepted: ["mitali", "daughter", "my daughter"],
    success: "Yes. Mitali, your daughter, often sits with you for evening tea.",
    help: "That's okay. Mitali — your daughter — often sits with you for evening tea.",
  },
  {
    id: "tea",
    prompt: "What do you drink in the morning?",
    hint: "A familiar Assam drink.",
    image: visuals.teaGarden,
    caption: "Morning in Assam",
    choices: ["Assam tea", "Cold coffee", "Butter tea"],
    correctChoice: "Assam tea",
    accepted: ["tea", "chai", "assam tea", "morning tea"],
    success: "Yes. Assam tea in the morning is part of your day.",
    help: "That's okay. You enjoy Assam tea in the morning.",
  },
];

export function answerMatches(spoken: string, question: RecallQuestion) {
  const normalized = spoken.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").trim();
  if (!normalized) return false;
  if (normalized === question.correctChoice.toLowerCase()) return true;
  return question.accepted.some(
    (item) => normalized.includes(item) || item.includes(normalized)
  );
}
