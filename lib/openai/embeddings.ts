// lib/openai.ts
import { NextResponse } from "next/server";

export async function getOpenAIEmbedding(text: string) {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: text,
      model: "text-embedding-ada-002",
    }),
  });

  const json = await res.json();

  if (!json.data || !json.data[0]) {
    throw new Error("Failed to get embeddings from OpenAI.");
  }

  return json.data[0].embedding;
}
