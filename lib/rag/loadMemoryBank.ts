import fs from "fs";
import path from "path";
import { Memory } from "./types";

export function loadMemoryBank(): Memory[] {
  const filePath = path.join(
    process.cwd(),
    "data",
    "memories",
    "demo-memory-bank.json"
  );

  const file = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(file) as Memory[];
}