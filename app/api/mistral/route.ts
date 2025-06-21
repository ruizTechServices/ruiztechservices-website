import { NextRequest, NextResponse } from 'next/server';
import { mistralChatCompletion, MistralChatMessage } from '../../../lib/mistral/inference';

// POST /api/mistral
// Body: { messages: MistralChatMessage[], model?: string }
export async function POST(req: NextRequest) {
  try {
    const { input, messages: incomingMessages, model } = await req.json();
    const messages = incomingMessages ?? (
      typeof input === 'string'
        ? ([{ role: 'user', content: input }] as MistralChatMessage[])
        : []
    );
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages array or input string required' }, { status: 400 });
    }
    const output = await mistralChatCompletion({ messages, model });
    return NextResponse.json({ output });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
