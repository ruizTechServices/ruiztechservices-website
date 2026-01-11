import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Database } from "@/lib/database.types";

export type Chat = Database['public']['Tables']['chats']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];

export async function createChat(userId: string, title?: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('chats')
    .insert({ user_id: userId, title })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getChats(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getChat(chatId: string, userId: string) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('id', chatId)
      .eq('user_id', userId)
      .single();
  
    if (error) throw error;
    return data;
}

export async function getMessages(chatId: string, userId: string) {
  const supabase = await createSupabaseServerClient();
  // Ensure the user owns the chat first (implicit via RLS, but good for explicit checks if needed)
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createMessage(
  chatId: string, 
  userId: string, 
  role: 'user' | 'assistant' | 'system', 
  content: string,
  embedding?: number[]
) {
  const supabase = await createSupabaseServerClient();
  
  // Cast number[] to unknown then to string (or format it as needed for pgvector if passing raw)
  // The supabase-js client handles array -> vector string conversion automatically for pgvector if typed correctly,
  // but our types might expect string | null. Let's try passing the array directly if the client supports it,
  // or JSON.stringify it.
  // Actually, for pgvector, Supabase JS client usually accepts a plain array of numbers. 
  // We'll coerce to `any` or `string` to satisfy TS if needed.
  
  const { data, error } = await supabase
    .from('messages')
    .insert({
      chat_id: chatId,
      user_id: userId,
      role,
      content,
      embedding: embedding as unknown as string // Supabase client handles array -> vector
    })
    .select()
    .single();

  if (error) throw error;
  
  // Update chat updated_at
  await supabase
    .from('chats')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', chatId);

  return data;
}

export async function deleteChat(chatId: string, userId: string) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId)
        .eq('user_id', userId);

    if (error) throw error;
}
