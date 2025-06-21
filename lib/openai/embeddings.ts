import openai from './client';

export async function getOpenAIEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });

  if (!response.data || !response.data[0]) {
    throw new Error('Failed to get embeddings from OpenAI.');
  }

  return response.data[0].embedding;
}
