import { NextRequest, NextResponse } from 'next/server';
import { AIProviderFactory } from '@/lib/ai';
import { createSupabaseServerClient } from '@/lib/supabase/server';

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

    const { input, options } = await req.json();

    // Basic mapping for legacy single-input support
    const content = typeof input === 'string' ? input : JSON.stringify(input);
    const messages = [{ role: 'user', content } as const];

    const provider = AIProviderFactory.getProvider('openai');
    const output = await provider.generateText(messages, {
      model: options?.model,
    });

    // Deduct one credit on success using RPC
    const { error: deductError } = await supabase.rpc('decrement_credits', { amount: 1 });

    if (deductError) {
      console.error('Error deducting credits:', deductError);
      // We still return the output, but log the error
    }

    return NextResponse.json({ output, remainingCredits: (profile.credits ?? 1) - 1 });
  } catch (err) {
    return NextResponse.json({
      error: (err instanceof Error ? err.message : 'Unknown error')
    }, { status: 500 });
  }
}