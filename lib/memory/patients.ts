import type { Memory, MemoryTheme, Patient } from "./types";
import { themeVisuals, visualForCategory, visuals } from "./visuals";

import patient001 from "@/data/patients/patient_demo_001.json";
import patient002 from "@/data/patients/patient_demo_002.json";
import patient003 from "@/data/patients/patient_demo_003.json";
import patient004 from "@/data/patients/patient_demo_004.json";
import patient005 from "@/data/patients/patient_demo_005.json";
import patient006 from "@/data/patients/patient_demo_006.json";

import memories001 from "@/data/memories/patient_demo_001.json";
import memories002 from "@/data/memories/patient_demo_002.json";
import memories003 from "@/data/memories/patient_demo_003.json";
import memories004 from "@/data/memories/patient_demo_004.json";
import memories005 from "@/data/memories/patient_demo_005.json";
import memories006 from "@/data/memories/patient_demo_006.json";

export const FEATURED_PATIENT_ID = "patient_demo_001";

const patients = [
  patient001,
  patient002,
  patient003,
  patient004,
  patient005,
  patient006,
] as Patient[];

function withLocalImages(memories: Memory[]): Memory[] {
  return memories.map((memory) => ({
    ...memory,
    image: visualForCategory(memory.category, memory.title),
  }));
}

const memoryBanks: Record<string, Memory[]> = {
  patient_demo_001: withLocalImages(memories001 as Memory[]),
  patient_demo_002: memories002 as Memory[],
  patient_demo_003: memories003 as Memory[],
  patient_demo_004: memories004 as Memory[],
  patient_demo_005: memories005 as Memory[],
  patient_demo_006: memories006 as Memory[],
};

const THEME_DEFS: Omit<MemoryTheme, "count">[] = [
  {
    id: "people",
    label: "People",
    description: "Family she can still name",
    categories: ["family"],
    image: themeVisuals.family,
  },
  {
    id: "places",
    label: "Places",
    description: "The river, home, tea garden",
    categories: ["place"],
    image: themeVisuals.place,
  },
  {
    id: "everyday",
    label: "Everyday",
    description: "Tea, garden, evening talk",
    categories: ["routine", "drink"],
    image: themeVisuals.everyday,
  },
  {
    id: "food",
    label: "Food",
    description: "Pitha, khar, maas tenga",
    categories: ["food"],
    image: themeVisuals.food,
  },
  {
    id: "music",
    label: "Celebrations",
    description: "Bihu, music, the gamosa",
    categories: ["music", "festival", "object"],
    image: themeVisuals.festival,
  },
];

export function isFeaturedPatient(patientId: string) {
  return patientId === FEATURED_PATIENT_ID;
}

export function getPatients(): Patient[] {
  return patients;
}

export function getFeaturedPatient(): Patient {
  return patients.find((patient) => patient.id === FEATURED_PATIENT_ID)!;
}

export function getSupportingPatients(): Patient[] {
  return patients.filter((patient) => patient.id !== FEATURED_PATIENT_ID);
}

export function getPatient(patientId: string): Patient | undefined {
  return patients.find((patient) => patient.id === patientId);
}

export function getPatientMemories(patientId: string): Memory[] {
  return memoryBanks[patientId] ?? [];
}

export function getFeaturedMemory(patientId: string): Memory | undefined {
  const memories = getPatientMemories(patientId);
  return (
    memories.find((memory) => memory.title.toLowerCase().includes("brahmaputra")) ??
    memories.find((memory) => memory.category === "place") ??
    memories[0]
  );
}

export function getMemoryThemes(patientId: string): MemoryTheme[] {
  const memories = getPatientMemories(patientId);

  return THEME_DEFS.map((theme) => ({
    ...theme,
    count: memories.filter((memory) => theme.categories.includes(memory.category)).length,
  }));
}

export function getRecallMemories(patientId: string): Memory[] {
  const memories = getPatientMemories(patientId).filter(
    (memory) => memory.prompt && memory.choices?.length
  );
  const preferred = memories.find((memory) =>
    memory.title.toLowerCase().includes("rohan")
  );
  const rest = memories.filter((memory) => memory.id !== preferred?.id);
  const ordered = preferred
    ? [
        {
          ...preferred,
          prompt: "Who is Rohan?",
          image: visuals.motherSon,
        },
        ...rest,
      ]
    : rest;
  return ordered.slice(0, 5);
}

export function greetingForNow(preferredName: string, date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return `Good morning, ${preferredName}.`;
  if (hour < 17) return `Good afternoon, ${preferredName}.`;
  return `Good evening, ${preferredName}.`;
}

export function portraitFor(patient: Patient) {
  return patient.portrait || visuals.anima;
}
