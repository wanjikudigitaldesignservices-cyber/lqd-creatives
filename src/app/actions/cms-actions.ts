"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "./auth-actions";
import { revalidatePath } from "next/cache";
import { 
  serviceSchema, 
  projectSchema, 
  postSchema, 
  faqSchema, 
  leadStatusUpdateSchema,
  siteSettingsSchema 
} from "@/lib/validations/cms";

export interface CmsActionResult {
  success: boolean;
  message: string;
  id?: string;
}

// -------------------------------------------------------------
// LEADS ACTIONS
// -------------------------------------------------------------

export async function updateLeadStatusAction(data: unknown): Promise<CmsActionResult> {
  const { isStaff, user } = await getCurrentUserRole();
  if (!isStaff) {
    return { success: false, message: "Unauthorized. Staff privileges required." };
  }

  const parsed = leadStatusUpdateSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: "Invalid lead update payload." };
  }

  const { lead_id, status, internal_notes, next_follow_up } = parsed.data;
  const supabase = await createClient();

  const updatePayload: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (internal_notes !== undefined) {
    updatePayload.internal_notes = internal_notes;
  }
  if (next_follow_up !== undefined) {
    updatePayload.next_follow_up = next_follow_up ? next_follow_up : null;
  }

  const { error } = await supabase
    .from("lqd_leads")
    .update(updatePayload)
    .eq("id", lead_id);

  if (error) {
    console.error("[Update Lead Error]:", error);
    return { success: false, message: "Failed to update lead status." };
  }

  // Record audit log
  await supabase.from("lqd_lead_activity_logs").insert({
    lead_id,
    actor_email: user?.email || "staff",
    action: `STATUS_CHANGE_TO_${status}`,
    details: internal_notes ? `Notes updated: ${internal_notes.substring(0, 100)}` : null,
  });

  revalidatePath("/admin/leads");
  return { success: true, message: `Lead updated to "${status}" successfully.` };
}

export async function deleteLeadAction(leadId: string): Promise<CmsActionResult> {
  const { isAdmin } = await getCurrentUserRole();
  if (!isAdmin) {
    return { success: false, message: "Unauthorized. Only administrators can delete lead records." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("lqd_leads").delete().eq("id", leadId);

  if (error) {
    return { success: false, message: "Failed to delete lead record." };
  }

  revalidatePath("/admin/leads");
  return { success: true, message: "Lead record deleted successfully." };
}

// -------------------------------------------------------------
// SERVICES ACTIONS
// -------------------------------------------------------------

export async function upsertServiceAction(serviceData: unknown, id?: string): Promise<CmsActionResult> {
  const { isStaff } = await getCurrentUserRole();
  if (!isStaff) {
    return { success: false, message: "Unauthorized. Staff privileges required." };
  }

  const parsed = serviceSchema.safeParse(serviceData);
  if (!parsed.success) {
    return { 
      success: false, 
      message: parsed.error.issues.map((i) => i.message).join(", ") 
    };
  }

  const supabase = await createClient();
  const payload = {
    ...parsed.data,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from("lqd_services").update(payload).eq("id", id);
    if (error) return { success: false, message: error.message };
  } else {
    const { error } = await supabase.from("lqd_services").insert(payload);
    if (error) return { success: false, message: error.message };
  }

  revalidatePath("/services");
  revalidatePath("/admin/services");
  revalidatePath("/");
  return { success: true, message: "Service saved successfully." };
}

export async function deleteServiceAction(id: string): Promise<CmsActionResult> {
  const { isStaff } = await getCurrentUserRole();
  if (!isStaff) {
    return { success: false, message: "Unauthorized." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("lqd_services").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/services");
  revalidatePath("/admin/services");
  revalidatePath("/");
  return { success: true, message: "Service deleted successfully." };
}

// -------------------------------------------------------------
// PROJECTS ACTIONS
// -------------------------------------------------------------

export async function upsertProjectAction(projectData: unknown, id?: string): Promise<CmsActionResult> {
  const { isStaff } = await getCurrentUserRole();
  if (!isStaff) {
    return { success: false, message: "Unauthorized. Staff privileges required." };
  }

  const parsed = projectSchema.safeParse(projectData);
  if (!parsed.success) {
    return { 
      success: false, 
      message: parsed.error.issues.map((i) => i.message).join(", ") 
    };
  }

  const supabase = await createClient();
  const payload = {
    ...parsed.data,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from("lqd_projects").update(payload).eq("id", id);
    if (error) return { success: false, message: error.message };
  } else {
    const { error } = await supabase.from("lqd_projects").insert(payload);
    if (error) return { success: false, message: error.message };
  }

  revalidatePath("/work");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true, message: "Project saved successfully." };
}

export async function deleteProjectAction(id: string): Promise<CmsActionResult> {
  const { isStaff } = await getCurrentUserRole();
  if (!isStaff) return { success: false, message: "Unauthorized." };

  const supabase = await createClient();
  const { error } = await supabase.from("lqd_projects").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/work");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true, message: "Project deleted successfully." };
}

// -------------------------------------------------------------
// POSTS ACTIONS
// -------------------------------------------------------------

export async function upsertPostAction(postData: unknown, id?: string): Promise<CmsActionResult> {
  const { isStaff } = await getCurrentUserRole();
  if (!isStaff) return { success: false, message: "Unauthorized." };

  const parsed = postSchema.safeParse(postData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues.map((i) => i.message).join(", ") };
  }

  const supabase = await createClient();
  const payload = {
    ...parsed.data,
    category_id: parsed.data.category_id || null,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from("lqd_posts").update(payload).eq("id", id);
    if (error) return { success: false, message: error.message };
  } else {
    const { error } = await supabase.from("lqd_posts").insert(payload);
    if (error) return { success: false, message: error.message };
  }

  revalidatePath("/insights");
  revalidatePath("/admin/posts");
  revalidatePath("/");
  return { success: true, message: "Insight article saved successfully." };
}

export async function deletePostAction(id: string): Promise<CmsActionResult> {
  const { isStaff } = await getCurrentUserRole();
  if (!isStaff) return { success: false, message: "Unauthorized." };

  const supabase = await createClient();
  const { error } = await supabase.from("lqd_posts").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/insights");
  revalidatePath("/admin/posts");
  return { success: true, message: "Article deleted successfully." };
}

// -------------------------------------------------------------
// FAQS ACTIONS
// -------------------------------------------------------------

export async function upsertFaqAction(faqData: unknown, id?: string): Promise<CmsActionResult> {
  const { isStaff } = await getCurrentUserRole();
  if (!isStaff) return { success: false, message: "Unauthorized." };

  const parsed = faqSchema.safeParse(faqData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues.map((i) => i.message).join(", ") };
  }

  const supabase = await createClient();
  const payload = {
    ...parsed.data,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from("lqd_faqs").update(payload).eq("id", id);
    if (error) return { success: false, message: error.message };
  } else {
    const { error } = await supabase.from("lqd_faqs").insert(payload);
    if (error) return { success: false, message: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/faqs");
  return { success: true, message: "FAQ saved successfully." };
}

export async function deleteFaqAction(id: string): Promise<CmsActionResult> {
  const { isStaff } = await getCurrentUserRole();
  if (!isStaff) return { success: false, message: "Unauthorized." };

  const supabase = await createClient();
  const { error } = await supabase.from("lqd_faqs").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/faqs");
  return { success: true, message: "FAQ deleted successfully." };
}

// -------------------------------------------------------------
// GLOBAL SETTINGS ACTION
// -------------------------------------------------------------

export async function updateSettingsAction(settingsData: unknown): Promise<CmsActionResult> {
  const { isStaff } = await getCurrentUserRole();
  if (!isStaff) return { success: false, message: "Unauthorized." };

  const parsed = siteSettingsSchema.safeParse(settingsData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues.map((i) => i.message).join(", ") };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("lqd_site_settings")
    .update({
      ...parsed.data,
      updated_at: new Date().toISOString(),
    })
    .eq("key", "general");

  if (error) return { success: false, message: error.message };

  revalidatePath("/", "layout");
  return { success: true, message: "Global site settings updated successfully." };
}
