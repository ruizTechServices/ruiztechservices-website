// app/api/embed/route.ts
import { getOpenAIEmbedding } from "@/lib/openai/embeddings";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const embedding = await getOpenAIEmbedding(text);

    return Response.json({ text, embedding });
  } catch (err) {
    return Response.json({ error: "Embedding failed", details: err }, { status: 500 });
  }
}
