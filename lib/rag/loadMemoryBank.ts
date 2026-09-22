import fs from "fs";
import path from "path";
import { Memory } from "./types";

const DEFAULT_PATIENT_ID = "patient_demo_001";

export function loadMemoryBank(patientId: string = DEFAULT_PATIENT_ID): Memory[] {
  const memoriesDir = path.join(process.cwd(), "data", "memories");
  const scopedPath = path.join(memoriesDir, `${patientId}.json`);
  const fallbackPath = path.join(memoriesDir, "demo-memory-bank.json");

  const filePath = fs.existsSync(scopedPath) ? scopedPath : fallbackPath;
  const file = fs.readFileSync(filePath, "utf-8");
  const memories = JSON.parse(file) as Memory[];

  return memories.filter((memory) => !memory.patientId || memory.patientId === patientId);
}
