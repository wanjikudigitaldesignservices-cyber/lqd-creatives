export type UserRole = 'admin' | 'editor';

export type ServiceCategory = 'web_development' | 'brand_identity' | 'automation_systems';
export type ProjectCategory = 'web_platform' | 'sme_website' | 'automation' | 'branding';
export type ProjectType = 'client' | 'concept';
export type FaqCategory = 'general' | 'pricing' | 'process' | 'technical' | 'ownership';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Consultation' | 'Proposal Sent' | 'Won' | 'Lost';

export interface LqdProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface LqdSiteSettings {
  id: string;
  key: string;
  brand_name: string;
  tagline: string;
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  address_locality: string;
  address_country: string;
  primary_cta_text: string;
  secondary_cta_text: string;
  social_tiktok: string;
  social_instagram: string;
  social_facebook: string;
  social_linkedin: string;
  footer_text: string;
  seo_default_title: string;
  seo_default_description: string;
  updated_at: string;
}

export interface ServiceProcessStep {
  step: number;
  name: string;
  description: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface LqdService {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  is_flagship: boolean;
  category: ServiceCategory;
  scope_description: string;
  ideal_customer: string;
  deliverables: string[];
  process_steps: ServiceProcessStep[];
  faqs: ServiceFaq[];
  pricing_guidance: string;
  optional_addons: string[];
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LqdProject {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  project_type: ProjectType;
  client_name: string | null;
  summary: string;
  challenge: string;
  solution: string;
  features: string[];
  gallery: string[];
  technologies: string[];
  live_url: string | null;
  published: boolean;
  is_featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface LqdCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface LqdPost {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  category?: LqdCategory;
  excerpt: string;
  content: string;
  cover_image: string | null;
  reading_time_minutes: number;
  author_name: string;
  published: boolean;
  published_at: string;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface LqdFaq {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LqdPage {
  id: string;
  slug: string;
  title: string;
  sections: Record<string, unknown>;
  seo_title: string | null;
  seo_description: string | null;
  published: boolean;
  updated_at: string;
}

export interface LqdMediaAsset {
  id: string;
  filename: string;
  url: string;
  alt_text: string;
  mime_type: string;
  size_bytes: number;
  uploaded_by: string | null;
  created_at: string;
}

export interface LqdLead {
  id: string;
  name: string;
  business_name: string | null;
  email: string | null;
  phone: string | null;
  service_required: string;
  budget_range: string | null;
  desired_timeline: string | null;
  message: string;
  status: LeadStatus;
  internal_notes: string;
  next_follow_up: string | null;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  ip_hash: string | null;
  consent_given: boolean;
  created_at: string;
  updated_at: string;
}

export interface LqdLeadActivityLog {
  id: string;
  lead_id: string;
  actor_email: string;
  action: string;
  details: string | null;
  created_at: string;
}
