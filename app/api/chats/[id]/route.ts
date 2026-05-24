import { NextRequest, NextResponse } from 'next/server';
import { requireAdminUser } from '@/lib/auth/admin';
import { getChat, getMessages, deleteChat } from '@/lib/db/chats';

// GET /api/chats/[id] - Get chat details and messages
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const admin = await requireAdminUser();
    if (!admin.ok) return admin.response;
    const { user } = admin;

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
    const admin = await requireAdminUser();
    if (!admin.ok) return admin.response;
    const { user } = admin;

    await deleteChat(id, user.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting chat:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
