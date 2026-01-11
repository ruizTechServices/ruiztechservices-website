import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getChats, createChat, deleteChat } from '@/lib/db/chats';

// GET /api/chats - List all chats for the current user
export async function GET(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const chats = await getChats(user.id);
    return NextResponse.json({ chats });
  } catch (err) {
    console.error('Error fetching chats:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/chats - Create a new chat
export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title } = await req.json();
    const chat = await createChat(user.id, title);
    return NextResponse.json({ chat });
  } catch (err) {
    console.error('Error creating chat:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
