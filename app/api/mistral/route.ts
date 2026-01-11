import { NextRequest, NextResponse } from 'next/server';
import { AIProviderFactory, AIMessage } from '@/lib/ai';
import { createSupabaseServerClient } from '@/lib/supabase/server';

// POST /api/mistral
// Body: { messages: AIMessage[], model?: string }
export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    // Check credits
    const { data: profile, error: profileError } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile || (profile.credits ?? 0) < 1) {
      return NextResponse.json({
        error: 'Insufficient credits. Please purchase more to continue.'
      }, { status: 402 });
    }

    const { input, messages: incomingMessages, model } = await req.json();
    const messages: AIMessage[] = incomingMessages ?? (
      typeof input === 'string'
        ? [{ role: 'user', content: input }]
        : []
    );

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages array or input string required' }, { status: 400 });
    }

    const provider = AIProviderFactory.getProvider('mistral');
    const output = await provider.generateText(messages, { model });

    // Deduct one credit on success using RPC
    const { error: deductError } = await supabase.rpc('decrement_credits', { amount: 1 });

    if (deductError) {
      console.error('Error deducting credits:', deductError);
    }

    return NextResponse.json({ output, remainingCredits: (profile.credits ?? 1) - 1 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

