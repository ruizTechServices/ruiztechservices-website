'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { ContactSubmission } from '@/lib/supabase';

export interface AdminActionResult {
  success: boolean;
  error?: string;
}

export async function getContactSubmissions(): Promise<{
  data: ContactSubmission[] | null;
  error?: string;
}> {
  try {
    const supabase = await createSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact submissions:', error);
      return { data: null, error: error.message };
    }

    return { data };
  } catch (err) {
    console.error('Unexpected error fetching contact submissions:', err);
    return { data: null, error: 'An unexpected error occurred.' };
  }
}

export async function updateContactSubmissionStatus(
  id: number,
  status: 'new' | 'read' | 'replied'
): Promise<AdminActionResult> {
  try {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating contact submission:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/admin');
    return { success: true };
  } catch (err) {
    console.error('Unexpected error updating contact submission:', err);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

export async function deleteContactSubmission(
  id: number
): Promise<AdminActionResult> {
  try {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting contact submission:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/admin');
    return { success: true };
  } catch (err) {
    console.error('Unexpected error deleting contact submission:', err);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
