"use server";

import { supabase, type ContactSubmissionInsert } from "@/lib/supabase";
import {
  parseContactForm,
  formatContactMessage,
} from "@/lib/forms/contactSchema";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export interface ContactFormState {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function submitContactForm(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = parseContactForm(formData);
  if (!parsed.success)
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Please check your request.",
    };
  try {
    const requestHeaders = await headers();
    const input = parsed.data;
    const submission: ContactSubmissionInsert = {
      name: input.name,
      email: input.email,
      message: formatContactMessage(input),
      status: "new",
      ip_address:
        requestHeaders
          .get("x-forwarded-for")
          ?.split(",")[0]
          ?.trim()
          .slice(0, 45) || null,
      user_agent: requestHeaders.get("user-agent")?.slice(0, 500) || null,
    };
    // An anonymous sender must be allowed to insert, never read the private inbox.
    const { error } = await supabase
      .from("contact_submissions")
      .insert(submission)
      .abortSignal(AbortSignal.timeout(8000));
    if (error) {
      console.error("[contact] submission failed", {
        code: error.code || "upstream_unavailable",
      });
      return {
        success: false,
        error:
          "Your request could not be saved. Your message is still here. Use the email option below to send it directly.",
      };
    }
    return {
      success: true,
      message: "Your request has been saved for review.",
    };
  } catch {
    console.error("[contact] submission unavailable");
    return {
      success: false,
      error:
        "The form is temporarily unavailable. Your message is still here. Use the email option below to send it directly.",
    };
  }
}

export async function submitContactFormSimple(formData: FormData) {
  const result = await submitContactForm({}, formData);
  redirect(
    result.success
      ? "/contact?success=true"
      : "/contact?error=submission_failed",
  );
}
