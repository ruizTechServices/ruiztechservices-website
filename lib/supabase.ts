import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';
import { Database } from './database.types';

export const supabase = createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Export generic types from the database schema
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert'];
export type ContactSubmissionUpdate = Database['public']['Tables']['contact_submissions']['Update'];

