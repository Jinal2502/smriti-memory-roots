import { NextRequest, NextResponse } from "next/server";
import { textToSpeech } from "@/lib/sarvam/voice/textToSpeech";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const text = body.text;
    const languageCode = body.languageCode || "en-IN";

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Text is required.",
        },
        { status: 400 }
      );
    }

    const result = await textToSpeech(
      text,
      languageCode
    );

    return NextResponse.json({
      success: true,
      audio: result.audios?.[0] ?? null,
      requestId: result.request_id,
    });
  } catch (error) {
    console.error("TTS error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Text-to-speech failed.",
      },
      { status: 500 }
    );
  }
}