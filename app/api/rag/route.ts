import { NextRequest, NextResponse } from "next/server";
import { retrieveMemories } from "@/lib/rag";
import { generateMemoryResponse } from "@/lib/sarvam";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const query = body.query;
    const topK = body.topK ?? 3;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "A query is required.",
        },
        { status: 400 }
      );
    }

    // STEP 1 — Retrieve relevant memories
    const memories = retrieveMemories(query, topK);

    // STEP 2 — Generate response using retrieved memories
    const answer = await generateMemoryResponse(query, memories);

    return NextResponse.json({
      success: true,
      query,
      answer,
      retrievedMemories: memories,
    });
  } catch (error) {
    console.error("RAG error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}