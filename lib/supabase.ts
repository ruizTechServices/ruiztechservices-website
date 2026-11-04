import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';
import type { Database } from './inquiry-database.types';

export const supabase = createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Export generic types from the database schema
// The inbox also accepts historical rows whose status was nullable.
export type ContactSubmission = Omit<Database['public']['Tables']['contact_submissions']['Row'], 'status'> & { status: string | null };
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert'];
export type ContactSubmissionUpdate = Database['public']['Tables']['contact_submissions']['Update'];

