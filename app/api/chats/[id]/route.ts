import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getChat, getMessages, deleteChat } from '@/lib/db/chats';

// GET /api/chats/[id] - Get chat details and messages
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify ownership and existence
    const chat = await getChat(id, user.id);
    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    const messages = await getMessages(id, user.id);
    
    return NextResponse.json({ chat, messages });
  } catch (err) {
    console.error('Error fetching chat:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/chats/[id] - Delete a chat
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await deleteChat(id, user.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting chat:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
