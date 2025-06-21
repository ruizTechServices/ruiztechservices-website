import OpenAI from 'openai';

/**
 * Shared, pre-configured OpenAI client.
 * Import this module wherever you need to talk to OpenAI so we only
 * instantiate the SDK once and keep configuration in a single place.
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
