import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function requireAdminUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 }),
    };
  }

  const { data: adminRow, error } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Error checking admin role:', error);
    return {
      ok: false as const,
      response: NextResponse.json({ error: 'Unable to verify admin access' }, { status: 500 }),
    };
  }

  if (!adminRow) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: 'Admin access only' }, { status: 403 }),
    };
  }

  return { ok: true as const, supabase, user };
}
