import openai from '@/lib/openai/client';

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small', // Efficient and cheap
    input: text.replace(/\n/g, ' '),
  });

  return response.data[0].embedding;
}
