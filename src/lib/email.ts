import { Resend } from "resend";
import { LqdLead } from "@/lib/types/database";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const fromEmail = process.env.RESEND_FROM_EMAIL || "LQD Creatives <onboarding@resend.dev>";
const internalNotificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "lqdcreatives@gmail.com";

export async function sendLeadNotifications(lead: LqdLead): Promise<{
  internalSent: boolean;
  acknowledgementSent: boolean;
  error?: string;
}> {
  let internalSent = false;
  let acknowledgementSent = false;

  if (!resend) {
    console.warn("[Email Service] RESEND_API_KEY is not configured. Simulating email notifications:", {
      leadName: lead.name,
      service: lead.service_required,
      contact: lead.email || lead.phone,
    });
    return {
      internalSent: false,
      acknowledgementSent: false,
      error: "RESEND_API_KEY not configured",
    };
  }

  // 1. Internal Team Notification Email
  try {
    const internalSubject = `🚨 New Website Lead: ${lead.name} (${lead.business_name || "Personal"}) - ${lead.service_required}`;
    const internalHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #080e1e; color: #f8fafc; border-radius: 8px;">
        <h2 style="color: #d4af37; border-bottom: 1px solid rgba(212,175,55,0.3); padding-bottom: 12px; margin-top: 0;">New Website Enquiry Received</h2>
        <p style="font-size: 15px; color: #94a3b8;">A potential client has submitted an enquiry through the LQD Creatives website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #0e1833; border-radius: 6px; overflow: hidden;">
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-weight: 500; width: 140px;">Client Name</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f8fafc; font-weight: 600;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-weight: 500;">Business Name</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f8fafc;">${lead.business_name || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-weight: 500;">Phone / WhatsApp</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f8fafc;">
              ${lead.phone ? `<a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}" style="color: #d4af37; text-decoration: none;">${lead.phone} (Open WhatsApp)</a>` : "Not provided"}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-weight: 500;">Email</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f8fafc;">${lead.email || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-weight: 500;">Service Required</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #38bdf8; font-weight: 600;">${lead.service_required}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-weight: 500;">Budget Range</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f8fafc;">${lead.budget_range || "Flexible / Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-weight: 500;">Desired Timeline</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #f8fafc;">${lead.desired_timeline || "Standard"}</td>
          </tr>
        </table>

        <div style="margin: 20px 0; padding: 16px; background: #132042; border-left: 4px solid #d4af37; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0; color: #d4af37; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Client Message</h4>
          <p style="margin: 0; color: #f8fafc; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${lead.message}</p>
        </div>

        <p style="font-size: 13px; color: #64748b; margin-top: 24px; text-align: center;">
          Captured via LQD Creatives Web Engine • Nairobi, Kenya
        </p>
      </div>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: [internalNotificationEmail],
      subject: internalSubject,
      html: internalHtml,
    });
    internalSent = true;
  } catch (err: unknown) {
    console.error("[Email Service] Failed to send internal notification email:", err);
  }

  // 2. Visitor Acknowledgement Email (only if visitor provided an email address)
  if (lead.email && lead.email.includes("@")) {
    try {
      const visitorSubject = `Thank you for contacting LQD Creatives — We've received your request`;
      const visitorHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #080e1e; color: #f8fafc; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #d4af37; font-size: 24px; margin: 0 0 6px 0; letter-spacing: -0.5px;">LQD CREATIVES</h1>
            <p style="color: #94a3b8; font-size: 13px; margin: 0;">Web Engineering & Digital Solutions • Nairobi, Kenya</p>
          </div>

          <div style="background: #0e1833; padding: 24px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
            <p style="font-size: 16px; color: #f8fafc; margin-top: 0;">Hi ${lead.name.split(" ")[0]},</p>
            <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
              Thank you for reaching out to LQD Creatives regarding your project: <strong>${lead.service_required}</strong>.
            </p>
            <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
              We have received your enquiry and are reviewing the details you shared. A member of our design and development team will get in touch with you within <strong>24 business hours</strong> to discuss the scope, timelines, and next steps.
            </p>

            <div style="margin: 24px 0; padding: 16px; background: #132042; border-radius: 6px; text-align: center;">
              <p style="font-size: 14px; color: #94a3b8; margin: 0 0 10px 0;">Need immediate assistance or prefer a quick chat?</p>
              <a href="https://wa.me/254740396075?text=${encodeURIComponent(`Hi Reuben, I submitted a website enquiry for ${lead.name}`)}" 
                 style="display: inline-block; background: #25d366; color: #080e1e; font-weight: 600; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px;">
                Chat on WhatsApp (+254 740 396 075)
              </a>
            </div>

            <p style="font-size: 14px; color: #94a3b8; margin-bottom: 0;">
              Best regards,<br/>
              <strong style="color: #f8fafc;">Reuben Wanjiku Kimani</strong><br/>
              Lead Engineer, LQD Creatives<br/>
              Nairobi, Kenya
            </p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: fromEmail,
        to: [lead.email],
        subject: visitorSubject,
        html: visitorHtml,
      });
      acknowledgementSent = true;
    } catch (err: unknown) {
      console.error("[Email Service] Failed to send visitor acknowledgement email:", err);
    }
  }

  return { internalSent, acknowledgementSent };
}
