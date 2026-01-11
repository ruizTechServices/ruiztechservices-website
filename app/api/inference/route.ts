import { NextRequest, NextResponse } from 'next/server';
import { AIProviderFactory } from '@/lib/ai';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createChat, createMessage, getChat, getMessages } from '@/lib/db/chats';
import { generateEmbedding } from '@/lib/ai/embedding';
import { AIMessage } from '@/lib/ai/types';

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

    const body = await req.json();
    const { message, model } = body;
    let { chatId } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 1. Handle Chat Session
    if (chatId) {
        const chat = await getChat(chatId, user.id);
        if (!chat) return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    } else {
        const title = message.slice(0, 50);
        const newChat = await createChat(user.id, title);
        chatId = newChat.id;
    }

    // 2. Persist User Message (with embedding)
    let userEmbedding = null;
    try {
        userEmbedding = await generateEmbedding(message);
    } catch (e) {
        console.error("Failed to generate user embedding:", e);
    }
    
    await createMessage(chatId, user.id, 'user', message, userEmbedding || undefined);

    // 3. Build Context (History + New Message)
    // Fetch last 10 messages for context (or more depending on token limits)
    const dbMessages = await getMessages(chatId, user.id);
    const history: AIMessage[] = dbMessages.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content
    }));

    // 4. Generate Response
    const providerType = model?.startsWith('mistral') ? 'mistral' : 'openai';
    const provider = AIProviderFactory.getProvider(providerType);
    
    const output = await provider.generateText(history, { model });

    // 5. Persist Assistant Message (with embedding)
    let assistantEmbedding = null;
    try {
        assistantEmbedding = await generateEmbedding(output);
    } catch (e) {
        console.error("Failed to generate assistant embedding:", e);
    }

    await createMessage(chatId, user.id, 'assistant', output, assistantEmbedding || undefined);

    // 6. Deduct Credits
    const { error: deductError } = await supabase.rpc('decrement_credits', { amount: 1 });
    if (deductError) console.error('Error deducting credits:', deductError);

    return NextResponse.json({ 
        output, 
        chatId, 
        remainingCredits: (profile.credits ?? 1) - 1 
    });

  } catch (err) {
    console.error("Inference Error:", err);
    return NextResponse.json({
      error: (err instanceof Error ? err.message : 'Unknown error')
    }, { status: 500 });
  }
}