const SARVAM_API_URL = "https://api.sarvam.ai";

export async function speechToText(
  audio: File,
  languageCode: string = "unknown"
) {
  const apiKey = process.env.SARVAM_API_KEY;

  if (!apiKey) {
    throw new Error("SARVAM_API_KEY is not configured.");
  }

  const formData = new FormData();

  formData.append("file", audio);
  formData.append("model", "saaras:v4");
  formData.append("language_code", languageCode);
  formData.append("mode", "transcribe");

  const response = await fetch(
    `${SARVAM_API_URL}/speech-to-text`,
    {
      method: "POST",
      headers: {
        "api-subscription-key": apiKey,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Sarvam STT error ${response.status}: ${errorText}`
    );
  }

  return response.json();
}