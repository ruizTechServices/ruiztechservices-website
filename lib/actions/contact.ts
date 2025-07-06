'use server';

import { supabase, type ContactSubmission } from '@/lib/supabase';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export interface ContactFormState {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Basic validation
    if (!name || !email || !message) {
      return {
        success: false,
        error: 'All fields are required.',
      };
    }

    if (!email.includes('@')) {
      return {
        success: false,
        error: 'Please enter a valid email address.',
      };
    }

    // Get client information for tracking
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const ipAddress = forwardedFor?.split(',')[0] || realIp || '';

    // Prepare submission data
    const submissionData: Omit<ContactSubmission, 'id' | 'created_at'> = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      status: 'new',
      ip_address: ipAddress,
      user_agent: userAgent,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([submissionData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return {
        success: false,
        error: 'Failed to submit your message. Please try again.',
      };
    }

    // Log successful submission (for debugging)
    console.log('Contact form submitted successfully:', {
      id: data.id,
      name: data.name,
      email: data.email,
      created_at: data.created_at,
    });

    // Revalidate the contact page to clear any cached data
    revalidatePath('/contact');

    return {
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
    };

  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

// Alternative server action for simple form submission without state
export async function submitContactFormSimple(formData: FormData) {
  const result = await submitContactForm({}, formData);
  
  if (result.success) {
    redirect('/contact?success=true');
  } else {
    redirect(`/contact?error=${encodeURIComponent(result.error || 'Unknown error')}`);
  }
}
