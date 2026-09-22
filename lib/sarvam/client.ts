const SARVAM_API_URL = "https://api.sarvam.ai";

export async function sarvamChat(
  messages: {
    role: "system" | "user" | "assistant";
    content: string;
  }[]
) {
  const apiKey = process.env.SARVAM_API_KEY;

  if (!apiKey) {
    throw new Error("SARVAM_API_KEY is not configured.");
  }

  const response = await fetch(`${SARVAM_API_URL}/v1/chat/completions`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "api-subscription-key": apiKey,
    },

    body: JSON.stringify({
      model: "sarvam-105b",
      messages,

      // We want fast, simple responses for the elderly companion.
      reasoning_effort: null,

      temperature: 0.3,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Sarvam API error ${response.status}: ${errorText}`
    );
  }

  return response.json();
}