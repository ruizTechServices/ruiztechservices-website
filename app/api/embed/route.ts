// app/api/embed/route.ts
import { requireAdminUser } from "@/lib/auth/admin";
import { getOpenAIEmbedding } from "@/lib/openai/embeddings";

export async function POST(req: Request) {
  try {
    const admin = await requireAdminUser();
    if (!admin.ok) return admin.response;

    const { text } = await req.json();
    const embedding = await getOpenAIEmbedding(text);

    return Response.json({ text, embedding });
  } catch (err) {
    return Response.json({ error: "Embedding failed", details: err }, { status: 500 });
  }
}
