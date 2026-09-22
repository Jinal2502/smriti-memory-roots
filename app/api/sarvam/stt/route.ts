import { NextRequest, NextResponse } from "next/server";
import { speechToText } from "@/lib/sarvam/voice/speechToText";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const audio = formData.get("audio");
    const languageCode =
      (formData.get("languageCode") as string) || "unknown";

    if (!(audio instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "Audio file is required.",
        },
        { status: 400 }
      );
    }

    const result = await speechToText(
      audio,
      languageCode
    );

    return NextResponse.json({
      success: true,
      transcript:
        result.transcript ||
        result.text ||
        result.transcript_text ||
        "",
      languageCode: result.language_code,
      languageProbability: result.language_probability,
    });
  } catch (error) {
    console.error("STT error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Speech recognition failed.",
      },
      { status: 500 }
    );
  }
}