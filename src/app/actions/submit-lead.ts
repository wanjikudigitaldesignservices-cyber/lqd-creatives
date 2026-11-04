"use server";

import { leadFormSchema, LeadFormInput } from "@/lib/validations/lead";
import { createClient } from "@/lib/supabase/server";
import { sendLeadNotifications } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { LqdLead } from "@/lib/types/database";

export interface SubmitLeadResult {
  success: boolean;
  message: string;
  leadId?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function submitLeadAction(data: unknown): Promise<SubmitLeadResult> {
  try {
    // 1. IP and Bot Protection
    const headerList = await headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    
    // Hash or mask IP for privacy
    const ipHash = Buffer.from(ip).toString("base64").substring(0, 16);

    // Rate Limit Check: max 5 submissions per 10 minutes
    const rateCheck = checkRateLimit(ipHash, 5, 600);
    if (!rateCheck.success) {
      return {
        success: false,
        message: `Too many submissions from this connection. Please wait ${rateCheck.resetIn} seconds or contact us directly on WhatsApp (+254 740 396 075).`,
      };
    }

    // 2. Schema Validation
    const parsed = leadFormSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Please correct the errors in the form before submitting.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const validData: LeadFormInput = parsed.data;

    // 3. Honeypot Bot Check
    if (validData.company_fax && validData.company_fax.length > 0) {
      console.warn("[Spam Protection] Honeypot triggered by submission.");
      // Return a fake success to avoid teaching bots
      return {
        success: true,
        message: "Thank you for your enquiry. We will be in touch shortly.",
      };
    }

    // 4. Timing Bot Check (minimum 1.5 seconds form completion time)
    if (validData.form_load_time) {
      const elapsedMs = Date.now() - validData.form_load_time;
      if (elapsedMs < 1500) {
        console.warn("[Spam Protection] Form submitted too quickly (<1.5s). Bot suspected.");
        return {
          success: true,
          message: "Thank you for your enquiry. We will be in touch shortly.",
        };
      }
    }

    // 5. Database Persistence in Supabase
    const supabase = await createClient();
    const leadId = crypto.randomUUID();
    const leadInsertPayload = {
      id: leadId,
      name: validData.name,
      business_name: validData.business_name || null,
      email: validData.email || null,
      phone: validData.phone || null,
      service_required: validData.service_required,
      budget_range: validData.budget_range || null,
      desired_timeline: validData.desired_timeline || null,
      message: validData.message,
      consent_given: validData.consent_given,
      source: "direct_website",
      utm_source: validData.utm_source || null,
      utm_medium: validData.utm_medium || null,
      utm_campaign: validData.utm_campaign || null,
      ip_hash: ipHash,
      status: "New" as const,
    };

    const { error: dbError } = await supabase
      .from("lqd_leads")
      .insert(leadInsertPayload);

    if (dbError) {
      console.error("[Database Error] Failed to persist lead:", dbError);
      return {
        success: false,
        message: "We encountered an issue saving your message. Please reach us via WhatsApp (+254 740 396 075) for an immediate response.",
      };
    }

    // 6. Asynchronous Email Notification & Acknowledgement
    try {
      await sendLeadNotifications({
        ...leadInsertPayload,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        internal_notes: "",
        next_follow_up: null,
      } as LqdLead);
    } catch (emailErr) {
      console.error("[Notification Warning] Lead saved but email sending failed:", emailErr);
    }

    return {
      success: true,
      message: "Your website project enquiry has been received! We will review your details and contact you within 24 business hours.",
      leadId,
    };
  } catch (err: unknown) {
    console.error("[Submit Lead Action Unexpected Error]:", err);
    return {
      success: false,
      message: "An unexpected error occurred. Please message us on WhatsApp (+254 740 396 075).",
    };
  }
}
