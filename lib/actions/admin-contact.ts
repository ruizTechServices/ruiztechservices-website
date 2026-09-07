"use server";

import { requireAdminUser } from "@/lib/auth/admin";
import { revalidatePath } from "next/cache";
import type { ContactSubmission } from "@/lib/supabase";

export interface AdminActionResult {
  success: boolean;
  error?: string;
}

export async function getContactSubmissions(): Promise<{
  data: ContactSubmission[] | null;
  error?: string;
}> {
  try {
    const access = await requireAdminUser();
    if (!access.ok) return { data: null, error: "Admin access required." };
    const { supabase } = access;

    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching contact submissions:", error);
      return { data: null, error: "Unable to complete this inbox action." };
    }

    return { data };
  } catch (err) {
    console.error("Unexpected error fetching contact submissions:", err);
    return { data: null, error: "An unexpected error occurred." };
  }
}

export async function updateContactSubmissionStatus(
  id: number,
  status: "new" | "read" | "replied",
): Promise<AdminActionResult> {
  try {
    if (
      !Number.isSafeInteger(id) ||
      id < 1 ||
      !["new", "read", "replied"].includes(status)
    )
      return { success: false, error: "Invalid submission update." };
    const access = await requireAdminUser();
    if (!access.ok) return { success: false, error: "Admin access required." };
    const { supabase } = access;

    const { data, error } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id)
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("Error updating contact submission:", error);
      return { success: false, error: "Unable to complete this inbox action." };
    }

    if (!data)
      return {
        success: false,
        error: "Submission not found or update not permitted.",
      };
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Unexpected error updating contact submission:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function deleteContactSubmission(
  id: number,
): Promise<AdminActionResult> {
  try {
    if (!Number.isSafeInteger(id) || id < 1)
      return { success: false, error: "Invalid submission." };
    const access = await requireAdminUser();
    if (!access.ok) return { success: false, error: "Admin access required." };
    const { supabase } = access;

    const { data, error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id)
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("Error deleting contact submission:", error);
      return { success: false, error: "Unable to complete this inbox action." };
    }

    if (!data)
      return {
        success: false,
        error: "Submission not found or update not permitted.",
      };
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Unexpected error deleting contact submission:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
