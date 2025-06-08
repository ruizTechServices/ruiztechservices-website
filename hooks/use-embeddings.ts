// hooks/use-embeddings.ts
import { useState } from "react";

export function useEmbeddings() {
  const [embedding, setEmbedding] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEmbedding = async (text: string) => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (res.ok && data.embedding) {
        setEmbedding(data.embedding);
        console.log("OpenAI Embedding:", data);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch embedding");
      console.error("useEmbeddings error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { embedding, loading, error, getEmbedding };
}
