-- ==============================================================================
-- LQD CREATIVES DATABASE SCHEMA & ACCESS CONTROL (SUPABASE POSTGRESQL)
-- ==============================================================================

-- 1. PROFILES & ROLES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Helper function to check admin status safely
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Helper function to check editor or admin status
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
$$;

-- 2. GLOBAL SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL DEFAULT 'general',
    brand_name TEXT NOT NULL DEFAULT 'LQD Creatives',
    tagline TEXT NOT NULL DEFAULT 'High-converting websites engineered for growing Kenyan businesses',
    contact_email TEXT NOT NULL DEFAULT 'lqdcreatives@gmail.com',
    contact_phone TEXT NOT NULL DEFAULT '+254 740 396 075',
    whatsapp_number TEXT NOT NULL DEFAULT '254740396075',
    address_locality TEXT NOT NULL DEFAULT 'Nairobi',
    address_country TEXT NOT NULL DEFAULT 'Kenya',
    primary_cta_text TEXT NOT NULL DEFAULT 'Discuss Your Website',
    secondary_cta_text TEXT NOT NULL DEFAULT 'View Our Work',
    social_tiktok TEXT NOT NULL DEFAULT 'https://www.tiktok.com/@lqdcreatives',
    social_instagram TEXT NOT NULL DEFAULT 'https://www.instagram.com/lqdcreatives/',
    social_facebook TEXT NOT NULL DEFAULT 'https://www.facebook.com/lqdcreatives/',
    social_linkedin TEXT NOT NULL DEFAULT 'https://www.linkedin.com/in/reuben-kimani-0870b6372',
    footer_text TEXT NOT NULL DEFAULT 'High-performance websites and digital solutions tailored for ambitious Kenyan enterprises.',
    seo_default_title TEXT NOT NULL DEFAULT 'LQD Creatives | Modern Websites for Kenyan SMEs',
    seo_default_description TEXT NOT NULL DEFAULT 'LQD Creatives helps Kenyan businesses build professional, mobile-friendly websites that make it easy for customers to understand services, build trust, and make enquiries.',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

-- 4. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    is_flagship BOOLEAN NOT NULL DEFAULT false,
    category TEXT NOT NULL CHECK (category IN ('web_development', 'brand_identity', 'automation_systems')),
    scope_description TEXT NOT NULL,
    ideal_customer TEXT NOT NULL,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    process_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
    faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
    pricing_guidance TEXT NOT NULL,
    optional_addons JSONB NOT NULL DEFAULT '[]'::jsonb,
    display_order INT NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services(display_order);
CREATE INDEX IF NOT EXISTS idx_services_published ON public.services(published);

-- 5. PORTFOLIO PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('web_platform', 'sme_website', 'automation', 'branding')),
    project_type TEXT NOT NULL DEFAULT 'concept' CHECK (project_type IN ('client', 'concept')),
    client_name TEXT,
    summary TEXT NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
    technologies TEXT[] NOT NULL DEFAULT '{}'::text[],
    live_url TEXT,
    published BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    seo_title TEXT,
    seo_description TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_type ON public.projects(project_type);

-- 6. BLOG POSTS & INSIGHTS
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    reading_time_minutes INT NOT NULL DEFAULT 4,
    author_name TEXT NOT NULL DEFAULT 'Reuben Wanjiku Kimani',
    published BOOLEAN NOT NULL DEFAULT true,
    published_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category_id);

-- 7. FREQUENTLY ASKED QUESTIONS (FAQS)
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'pricing', 'process', 'technical', 'ownership')),
    display_order INT NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_order ON public.faqs(display_order);

-- 8. DYNAMIC PAGES
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    sections JSONB NOT NULL DEFAULT '{}'::jsonb,
    seo_title TEXT,
    seo_description TEXT,
    published BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);

-- 9. MEDIA ASSETS
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT DEFAULT '',
    mime_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. LEADS & INQUIRIES
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    business_name TEXT,
    email TEXT,
    phone TEXT,
    service_required TEXT NOT NULL,
    budget_range TEXT,
    desired_timeline TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Consultation', 'Proposal Sent', 'Won', 'Lost')),
    internal_notes TEXT DEFAULT '',
    next_follow_up DATE,
    source TEXT DEFAULT 'direct_website',
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    ip_hash TEXT,
    consent_given BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- 11. LEAD ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS public.lead_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    actor_email TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_lead_activity_lead ON public.lead_activity_logs(lead_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_activity_logs ENABLE ROW LEVEL SECURITY;

-- Clean existing policies if re-running
DROP POLICY IF EXISTS "Public can view staff profiles" ON public.profiles;
DROP POLICY IF EXISTS "Staff can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Staff can edit site settings" ON public.site_settings;

DROP POLICY IF EXISTS "Public can read categories" ON public.categories;
DROP POLICY IF EXISTS "Staff can edit categories" ON public.categories;

DROP POLICY IF EXISTS "Public can view published services" ON public.services;
DROP POLICY IF EXISTS "Staff can view all services" ON public.services;
DROP POLICY IF EXISTS "Staff can manage services" ON public.services;

DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
DROP POLICY IF EXISTS "Staff can view all projects" ON public.projects;
DROP POLICY IF EXISTS "Staff can manage projects" ON public.projects;

DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;
DROP POLICY IF EXISTS "Staff can view all posts" ON public.posts;
DROP POLICY IF EXISTS "Staff can manage posts" ON public.posts;

DROP POLICY IF EXISTS "Public can view published faqs" ON public.faqs;
DROP POLICY IF EXISTS "Staff can view all faqs" ON public.faqs;
DROP POLICY IF EXISTS "Staff can manage faqs" ON public.faqs;

DROP POLICY IF EXISTS "Public can view published pages" ON public.pages;
DROP POLICY IF EXISTS "Staff can manage pages" ON public.pages;

DROP POLICY IF EXISTS "Public can view media" ON public.media_assets;
DROP POLICY IF EXISTS "Staff can manage media" ON public.media_assets;

DROP POLICY IF EXISTS "Public can submit qualified leads" ON public.leads;
DROP POLICY IF EXISTS "Staff can view leads" ON public.leads;
DROP POLICY IF EXISTS "Staff can update leads" ON public.leads;
DROP POLICY IF EXISTS "Admin can delete leads" ON public.leads;

DROP POLICY IF EXISTS "Staff can view lead activity logs" ON public.lead_activity_logs;
DROP POLICY IF EXISTS "Staff can insert lead activity logs" ON public.lead_activity_logs;

-- PROFILES POLICIES
CREATE POLICY "Staff can read all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING ( public.is_staff() );

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING ( (SELECT auth.uid()) = id )
WITH CHECK ( (SELECT auth.uid()) = id );

CREATE POLICY "Admins can manage profiles"
ON public.profiles FOR ALL
TO authenticated
USING ( public.is_admin() )
WITH CHECK ( public.is_admin() );

-- SITE SETTINGS POLICIES
CREATE POLICY "Public can read site settings"
ON public.site_settings FOR SELECT
TO anon, authenticated
USING ( true );

CREATE POLICY "Staff can edit site settings"
ON public.site_settings FOR ALL
TO authenticated
USING ( public.is_staff() )
WITH CHECK ( public.is_staff() );

-- CATEGORIES POLICIES
CREATE POLICY "Public can read categories"
ON public.categories FOR SELECT
TO anon, authenticated
USING ( true );

CREATE POLICY "Staff can edit categories"
ON public.categories FOR ALL
TO authenticated
USING ( public.is_staff() )
WITH CHECK ( public.is_staff() );

-- SERVICES POLICIES
CREATE POLICY "Public can view published services"
ON public.services FOR SELECT
TO anon, authenticated
USING ( published = true );

CREATE POLICY "Staff can view all services"
ON public.services FOR SELECT
TO authenticated
USING ( public.is_staff() );

CREATE POLICY "Staff can manage services"
ON public.services FOR ALL
TO authenticated
USING ( public.is_staff() )
WITH CHECK ( public.is_staff() );

-- PROJECTS POLICIES
CREATE POLICY "Public can view published projects"
ON public.projects FOR SELECT
TO anon, authenticated
USING ( published = true );

CREATE POLICY "Staff can view all projects"
ON public.projects FOR SELECT
TO authenticated
USING ( public.is_staff() );

CREATE POLICY "Staff can manage projects"
ON public.projects FOR ALL
TO authenticated
USING ( public.is_staff() )
WITH CHECK ( public.is_staff() );

-- POSTS POLICIES
CREATE POLICY "Public can view published posts"
ON public.posts FOR SELECT
TO anon, authenticated
USING ( published = true );

CREATE POLICY "Staff can view all posts"
ON public.posts FOR SELECT
TO authenticated
USING ( public.is_staff() );

CREATE POLICY "Staff can manage posts"
ON public.posts FOR ALL
TO authenticated
USING ( public.is_staff() )
WITH CHECK ( public.is_staff() );

-- FAQS POLICIES
CREATE POLICY "Public can view published faqs"
ON public.faqs FOR SELECT
TO anon, authenticated
USING ( published = true );

CREATE POLICY "Staff can view all faqs"
ON public.faqs FOR SELECT
TO authenticated
USING ( public.is_staff() );

CREATE POLICY "Staff can manage faqs"
ON public.faqs FOR ALL
TO authenticated
USING ( public.is_staff() )
WITH CHECK ( public.is_staff() );

-- PAGES POLICIES
CREATE POLICY "Public can view published pages"
ON public.pages FOR SELECT
TO anon, authenticated
USING ( published = true );

CREATE POLICY "Staff can manage pages"
ON public.pages FOR ALL
TO authenticated
USING ( public.is_staff() )
WITH CHECK ( public.is_staff() );

-- MEDIA ASSETS POLICIES
CREATE POLICY "Public can view media"
ON public.media_assets FOR SELECT
TO anon, authenticated
USING ( true );

CREATE POLICY "Staff can manage media"
ON public.media_assets FOR ALL
TO authenticated
USING ( public.is_staff() )
WITH CHECK ( public.is_staff() );

-- LEADS POLICIES
-- Only allow valid public lead creation
CREATE POLICY "Public can submit qualified leads"
ON public.leads FOR INSERT
TO anon, authenticated
WITH CHECK (
    name IS NOT NULL AND
    (email IS NOT NULL OR phone IS NOT NULL) AND
    message IS NOT NULL AND
    consent_given = true
);

CREATE POLICY "Staff can view leads"
ON public.leads FOR SELECT
TO authenticated
USING ( public.is_staff() );

CREATE POLICY "Staff can update leads"
ON public.leads FOR UPDATE
TO authenticated
USING ( public.is_staff() )
WITH CHECK ( public.is_staff() );

CREATE POLICY "Admin can delete leads"
ON public.leads FOR DELETE
TO authenticated
USING ( public.is_admin() );

-- LEAD ACTIVITY LOGS POLICIES
CREATE POLICY "Staff can view lead activity logs"
ON public.lead_activity_logs FOR SELECT
TO authenticated
USING ( public.is_staff() );

CREATE POLICY "Staff can insert lead activity logs"
ON public.lead_activity_logs FOR INSERT
TO authenticated
WITH CHECK ( public.is_staff() );

-- Grant table access to anon and authenticated
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT ON TABLE public.leads TO anon, authenticated;
