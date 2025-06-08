import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Call the new /v1/responses endpoint
 * @param {string | Array} input - The user input or array of content blocks
 * @param {object} [options] - Optional config like model, tools, image input
 * @returns {Promise<string>} - The output_text from the OpenAI response
 */
export interface OpenAIResponseOptions {
  model?: string;
  tools?: any[];
  store?: boolean;
  stream?: boolean;
}

export async function getOpenAIResponse(input: any, options: OpenAIResponseOptions = {}) {
  const {
    model = 'gpt-4.1',
    tools = [],
    store = true,  // Whether OpenAI should retain logs (set false if privacy)
    stream = false,
  } = options;

  if (!input) throw new Error('Input is required for OpenAI response.');

  try {
    const res = await openai.responses.create({
      model,
      input,
      tools,
      store,
      stream,
    });

    if (stream) {
      // Streaming response: aggregate output_text from chunks
      let result = '';
      // TypeScript may not know res is async iterable, so we assert
      for await (const chunk of res as any) {
        // Adjust property name as per SDK docs; fallback to chunk.choices?.[0]?.text if needed
        if (chunk?.output_text) {
          result += chunk.output_text;
        }
      }
      return result;
    } else {
      // Non-streaming response
      // @ts-expect-error: output_text exists on non-streaming responses
      return res.output_text;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error('🔥 OpenAI /v1/responses error:', err.message);
    } else {
      console.error('🔥 OpenAI /v1/responses error:', err);
    }
    throw err;
  }
}
