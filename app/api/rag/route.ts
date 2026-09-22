import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { retrieveMemories } from "@/lib/rag";
import { generateMemoryResponse } from "@/lib/sarvam";

const DEFAULT_PATIENT_ID = "patient_demo_001";

function loadPatientName(patientId: string): string {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "patients",
      `${patientId}.json`
    );
    const file = fs.readFileSync(filePath, "utf-8");
    const patient = JSON.parse(file) as { preferredName?: string; name?: string };
    return patient.preferredName || patient.name || "this person";
  } catch {
    return "this person";
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const query = body.query;
    const topK = body.topK ?? 3;
    const patientId =
      typeof body.patientId === "string" && body.patientId.length > 0
        ? body.patientId
        : DEFAULT_PATIENT_ID;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "A query is required.",
        },
        { status: 400 }
      );
    }

    const memories = retrieveMemories(query, Math.max(topK, 5), patientId);
    const patientName = loadPatientName(patientId);

    let answer: string;
    try {
      answer = await generateMemoryResponse(query, memories, patientName);
    } catch (error) {
      console.error("Sarvam generation fallback:", error);
      answer = memories[0]
        ? `Let's stay with something familiar. ${memories[0].content}`
        : `Let's stay with family, tea, or a place ${patientName} already knows.`;
    }

    return NextResponse.json({
      success: true,
      query,
      patientId,
      answer,
      retrievedMemories: memories,
    });
  } catch (error) {
    console.error("RAG error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
