export type Memory = {
    id: string;
    category: string;
    title: string;
    content: string;
    entities: string[];
    importance: "high" | "medium" | "low";
    difficulty: "easy" | "medium" | "hard";
    activityTypes: string[];
    language: string;
  };
  
  export type RetrievedMemory = Memory & {
    score: number;
  };