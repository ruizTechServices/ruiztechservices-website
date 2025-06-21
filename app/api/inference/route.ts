import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIResponse } from '../../../lib/openai/inference';


export async function POST(req: NextRequest) {
  const { input, options } = await req.json();
  try {
    const output = await getOpenAIResponse(input, options ?? {});
    return NextResponse.json({ output });
  } catch (err) {
    return NextResponse.json({ error: (err instanceof Error ? err.message : 'Unknown error') }, { status: 500 });
  }
}