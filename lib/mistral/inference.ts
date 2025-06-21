import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) throw new Error('Missing MISTRAL_API_KEY in environment');

const client = new Mistral({ apiKey });

/**
 * Allowed message types for Mistral chat.
 */
export type MistralChatMessage =
  | { role: 'system'; content: string }
  | { role: 'user'; content: string }
  | { role: 'assistant'; content: string }
  | { role: 'tool'; content: string };

/**
 * Get a chat completion from Mistral.
 * @param messages Array of chat messages (role/content pairs)
 * @param model Model name (default: 'mistral-large-latest')
 * @returns The text content of the model's reply
 */
export async function mistralChatCompletion({
  messages,
  model = 'mistral-large-latest',
}: {
  messages: MistralChatMessage[];
  model?: string;
}): Promise<string> {
  try {
    const chatResponse = await client.chat.complete({ model, messages });
    const content = chatResponse.choices[0]?.message?.content;
    if (typeof content === "string") {
      return content;
    } else if (Array.isArray(content)) {
      // Only join text chunks
      return content
        .filter(chunk => chunk.type === "text")
        .map(chunk => (chunk as unknown as { type: "text"; content: string }).content)
        .join("");
    }
    return "";
  } catch (err) {
    console.error('Mistral chat error:', err);
    throw err;
  }
}
