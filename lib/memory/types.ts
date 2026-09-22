export type FamilyMember = {
  name: string;
  relationship: string;
};

export type Patient = {
  id: string;
  demo: boolean;
  name: string;
  preferredName: string;
  age: number;
  gender: string;
  state: string;
  city: string;
  region: string;
  primaryLanguage: string;
  supportedLanguages: string[];
  profileSummary: string;
  memoryTheme: string;
  portrait: string;
  family: FamilyMember[];
  interests: string[];
  favoriteThings: Record<string, string | string[]>;
  familiarPlaces: string[];
  memoryStrengths: string[];
  memoryChallenges: string[];
  preferredInteractionStyle: {
    textSize: string;
    interactionMode: string;
    feedbackStyle: string;
    questionComplexity: string;
  };
};

export type Memory = {
  id: string;
  patientId: string;
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

export type MemoryTheme = {
  id: string;
  label: string;
  description: string;
  categories: string[];
  count: number;
  image: string;
};

export type ActivityKind = "recall" | "recognize" | "sequence" | "match" | "talk";
