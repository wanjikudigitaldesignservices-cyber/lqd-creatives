import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  is_flagship: z.boolean().default(false),
  category: z.enum(['web_development', 'brand_identity', 'automation_systems']),
  scope_description: z.string().min(20, "Scope description is required"),
  ideal_customer: z.string().min(10, "Ideal customer profile is required"),
  deliverables: z.array(z.string()).min(1, "At least one deliverable is required"),
  pricing_guidance: z.string().min(5, "Pricing guidance is required"),
  optional_addons: z.array(z.string()).default([]),
  display_order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/),
  category: z.enum(['web_platform', 'sme_website', 'automation', 'branding']),
  project_type: z.enum(['client', 'concept']),
  client_name: z.string().optional().nullable(),
  summary: z.string().min(10, "Summary is required"),
  challenge: z.string().min(15, "Challenge description is required"),
  solution: z.string().min(15, "Solution description is required"),
  features: z.array(z.string()).default([]),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  live_url: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  published: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  display_order: z.number().int().default(0),
  seo_title: z.string().optional().nullable(),
  seo_description: z.string().optional().nullable(),
});

export const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  category_id: z.string().uuid().optional().nullable().or(z.literal("")),
  excerpt: z.string().min(15, "Excerpt is required"),
  content: z.string().min(30, "Content must be at least 30 characters"),
  cover_image: z.string().url().optional().nullable().or(z.literal("")),
  reading_time_minutes: z.number().int().min(1).default(4),
  author_name: z.string().default("Reuben Wanjiku Kimani"),
  published: z.boolean().default(true),
  seo_title: z.string().optional().nullable(),
  seo_description: z.string().optional().nullable(),
});

export const faqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  category: z.enum(['general', 'pricing', 'process', 'technical', 'ownership']),
  display_order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const leadStatusUpdateSchema = z.object({
  lead_id: z.string().uuid(),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Consultation', 'Proposal Sent', 'Won', 'Lost']),
  internal_notes: z.string().optional(),
  next_follow_up: z.string().optional().nullable(),
});

export const siteSettingsSchema = z.object({
  brand_name: z.string().min(2),
  tagline: z.string().min(5),
  contact_email: z.string().email(),
  contact_phone: z.string().min(8),
  whatsapp_number: z.string().min(9),
  address_locality: z.string().min(2),
  address_country: z.string().min(2),
  primary_cta_text: z.string().min(2),
  secondary_cta_text: z.string().min(2),
  social_tiktok: z.string().url().optional().or(z.literal("")),
  social_instagram: z.string().url().optional().or(z.literal("")),
  social_facebook: z.string().url().optional().or(z.literal("")),
  social_linkedin: z.string().url().optional().or(z.literal("")),
  footer_text: z.string().min(5),
  seo_default_title: z.string().min(5),
  seo_default_description: z.string().min(10),
});
