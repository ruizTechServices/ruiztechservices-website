import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) throw new Error('Missing MISTRAL_API_KEY in environment');

const client = new Mistral({ apiKey });

/**
 * Get embeddings for an array of texts from Mistral.
 * @param inputs Array of strings to embed
 * @param model Model name (default: 'mistral-embed')
 * @returns Array of embeddings
 */
export async function mistralEmbeddings({
  inputs,
  model = 'mistral-embed',
}: {
  inputs: string[];
  model?: string;
}): Promise<any> {
  try {
    const embeddingsResponse = await client.embeddings.create({ model, inputs });
    return embeddingsResponse;
  } catch (err) {
    console.error('Mistral embeddings error:', err);
    throw err;
  }
}
