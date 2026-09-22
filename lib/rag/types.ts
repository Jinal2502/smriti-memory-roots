export type Memory = {
  id: string;
  patientId?: string;
  category: string;
  title: string;
  content: string;
  entities: string[];
  importance: "high" | "medium" | "low";
  difficulty: "easy" | "medium" | "hard";
  activityTypes: string[];
  language: string;
  image?: string;
  caption?: string;
  prompt?: string;
  choices?: string[];
  correctChoice?: string;
  sequence?: string[];
};

export type RetrievedMemory = Memory & {
  score: number;
};
