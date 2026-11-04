import { z } from "zod";

export const leadFormSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name (at least 2 characters)"),
    business_name: z.string().trim().optional(),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .trim()
      .regex(/^[+0-9\s-]{9,16}$/, "Please enter a valid telephone or WhatsApp number")
      .optional()
      .or(z.literal("")),
    service_required: z.string().min(1, "Please select the service you are interested in"),
    budget_range: z.string().optional(),
    desired_timeline: z.string().optional(),
    message: z
      .string()
      .trim()
      .min(10, "Please provide a brief description of your project (at least 10 characters)"),
    consent_given: z.literal(true, {
      message: "You must consent to the privacy policy to submit",
    }),
    // Anti-bot honeypot field (must remain empty)
    company_fax: z.string().max(0, "Bot detected").optional().or(z.literal("")),
    // Anti-bot form generation timestamp
    form_load_time: z.number().optional(),
    // UTM Tracking
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
  })
  .refine(
    (data) => {
      const hasEmail = Boolean(data.email && data.email.length > 3);
      const hasPhone = Boolean(data.phone && data.phone.length > 5);
      return hasEmail || hasPhone;
    },
    {
      message: "Please provide at least an email address or phone/WhatsApp number so we can reach you.",
      path: ["email"],
    }
  );

export type LeadFormInput = z.infer<typeof leadFormSchema>;
