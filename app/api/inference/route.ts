import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { input, options } = await req.json();
  try {
    const result = await openai.responses.create({
      model: options?.model ?? 'gpt-4.1',
      input,
      tools: options?.tools ?? [],
      store: options?.store ?? true,
      stream: false, // streaming via API route is more complex; start with false
    });
    return NextResponse.json({ output: result.output_text });
  } catch (err) {
    return NextResponse.json({ error: (err instanceof Error ? err.message : 'Unknown error') }, { status: 500 });
  }
}