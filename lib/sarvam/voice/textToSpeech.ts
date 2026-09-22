const SARVAM_API_URL = "https://api.sarvam.ai";

export async function textToSpeech(
  text: string,
  languageCode: string = "en-IN"
) {
  const apiKey = process.env.SARVAM_API_KEY;

  if (!apiKey) {
    throw new Error("SARVAM_API_KEY is not configured.");
  }

  const response = await fetch(
    `${SARVAM_API_URL}/text-to-speech`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": apiKey,
      },
      body: JSON.stringify({
        text,
        target_language_code: languageCode,
        model: "bulbul:v3",
        speaker: "priya",
        pace: 0.85,
        temperature: 0.4,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Sarvam TTS error ${response.status}: ${errorText}`
    );
  }

  return response.json();
}