# LQD Creatives — Production Web Platform & CMS

Modern, production-ready, full-stack digital agency website engineered specifically for Kenyan SMEs and growing commercial enterprises.

Built with **Next.js 15+ (App Router)**, **TypeScript**, **Tailwind CSS**, **Supabase PostgreSQL**, **Supabase Auth & Storage**, and **Resend Transactional Email**.

---

## 1. Core Positioning & Architecture

* **Primary Market**: Kenyan SMEs (Professional services, medical practices, logistics haulage, agricultural suppliers, and commerce).
* **Flagship Discipline**: Custom Website Design & Full-Stack Development.
* **Supporting Services**: Digital Brand Identity & Practical Business Automation (M-Pesa STK Push, CRM notifications).
* **Core Channels**:
  * **WhatsApp & Phone**: `+254 740 396 075` / `0740396075`
  * **Email**: `lqdcreatives@gmail.com`
  * **Headquarters**: Nairobi, Kenya
  * **Founder**: Reuben Wanjiku Kimani

---

## 2. Key Modules & Capabilities

### Public Platform
1. **Homepage (`/`)**:
   * Outcome-led hero with dual CTAs: *"Discuss Your Website"* and *"View Our Work"*.
   * Honest Kenyan SME trust section (no fake awards, fabricated client logos, or false revenue metrics).
   * Flagship service showcase with detailed deliverables list.
   * Complementary services overview (Branding & Automation).
   * Selected work with visible *"Concept Prototype"* badges.
   * Transparent 4-step delivery process (Discover, Plan, Build, Launch & Support).
   * Plain-language benefits addressing mobile performance on local networks (Safaricom/Airtel).
   * Kenyan business FAQs covering pricing, turnaround, M-Pesa, and full domain/code ownership.
   * Direct contact section and floating WhatsApp concierge.
2. **Services (`/services` & `/services/[slug]`)**:
   * Full service breakdown with scope, ideal customer profiles, deliverables, process steps, transparent pricing guidance, and optional add-on modules.
3. **Selected Work / Portfolio (`/work` & `/work/[slug]`)**:
   * CMS-driven portfolio with category filtering.
   * Honest *"Concept Prototype"* or *"Client Project"* badging.
   * Problem vs. engineered solution breakdown and technology tags.
4. **About (`/about`)**:
   * The LQD Creatives philosophy, founder profile, and direct communication links.
5. **Insights / Blog (`/insights` & `/insights/[slug]`)**:
   * Practical, educational articles tailored for Kenyan business owners.
6. **Contact (`/contact`)**:
   * Structured enquiry form with server-side Zod validation, bot honeypot, timing validation, and sliding-window rate limiting.
7. **Legal Starter Pages (`/privacy` & `/terms`)**:
   * Compliant with the Kenya Data Protection Act (2019) and marked for formal legal review.

### Protected CMS Administration (`/admin`)
* **Role-Based Access Control**:
  * `admin` (Owner): Full system access, lead deletion, CSV export, role management, all content editing, and site settings.
  * `editor` (Staff): Content and media editing (services, projects, blog articles, FAQs), lead status updates and note-taking.
* **First-Time Admin Setup (`/admin/setup`)**:
  * Secure bootstrap flow requiring the confidential `ADMIN_SETUP_SECRET`.
  * Guarantees that public self-registration is permanently closed once initialized.
* **Leads CRM Inbox (`/admin/leads`)**:
  * Live enquiry pipeline with search and status tabs (`New`, `Contacted`, `Qualified`, `Consultation`, `Proposal Sent`, `Won`, `Lost`).
  * Lead inspection drawer with full customer message, phone/WhatsApp launcher, and submission timestamp.
  * Internal team notes history and next follow-up date scheduler.
  * RFC 4180 compliant CSV export for authenticated administrators.
* **Services Manager (`/admin/services`)**: Full CRUD with flagship toggling and ordering.
* **Portfolio Manager (`/admin/projects`)**: Full CRUD with concept badge toggling.
* **Insights Manager (`/admin/posts`)**: Full CRUD with markdown reader and reading time planner.
* **FAQ Manager (`/admin/faqs`)**: Full CRUD with category organization.
* **Global Site Settings (`/admin/settings`)**: Live updates to phone, WhatsApp, email, social links, footer, and SEO defaults.

---

## 3. Environment Configuration (`.env.local`)

```bash
# Supabase Public Configuration (Browser-accessible)
NEXT_PUBLIC_SUPABASE_URL="https://rdaudofnzkilnsyhtahk.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Supabase Server-Only Service Role Key (Keep confidential)
SUPABASE_SERVICE_ROLE_KEY=""

# Resend Transactional Email API Key
RESEND_API_KEY="re_TqvoM9Ti_..."
RESEND_FROM_EMAIL="LQD Creatives <onboarding@resend.dev>"
CONTACT_NOTIFICATION_EMAIL="lqdcreatives@gmail.com"

# Business & WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER="254740396075"
NEXT_PUBLIC_BUSINESS_PHONE="+254 740 396 075"
NEXT_PUBLIC_BUSINESS_EMAIL="lqdcreatives@gmail.com"

# Site URL for metadata & canonical URLs
NEXT_PUBLIC_SITE_URL="https://lqdcreatives.vercel.app"

# First-time Admin Initialization Token
ADMIN_SETUP_SECRET="lqd_admin_setup_2026_secure"
```

---

## 4. Database Setup & Row Level Security

All schema definitions and RLS policies are located in `supabase/migrations/20261105000000_lqd_creatives_schema.sql`.

Key tables:
* `lqd_profiles`: Admin and editor roles linked to `auth.users`.
* `lqd_site_settings`: Global editable configuration.
* `lqd_services`: Flagship and supporting offerings.
* `lqd_projects`: Portfolio items with concept prototype badges.
* `lqd_posts`: SME insights and articles.
* `lqd_categories`: Taxonomies for services and articles.
* `lqd_faqs`: Categorized questions and answers.
* `lqd_leads`: Inquiries received with status workflow.
* `lqd_lead_activity_logs`: Immutable audit trails for status changes.

---

## 5. Local Development & Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run production build & verify all routes
npm run build
```

---

## 6. Vercel Deployment Guide

1. Push this repository to GitHub or GitLab.
2. Import the project into the [Vercel Dashboard](https://vercel.com/new).
3. Add the environment variables from `.env.local`:
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   * `RESEND_API_KEY`
   * `RESEND_FROM_EMAIL`
   * `CONTACT_NOTIFICATION_EMAIL`
   * `NEXT_PUBLIC_WHATSAPP_NUMBER`
   * `NEXT_PUBLIC_BUSINESS_PHONE`
   * `NEXT_PUBLIC_SITE_URL`
   * `ADMIN_SETUP_SECRET`
4. Click **Deploy**. Vercel will build all 23 static and dynamic routes automatically.
5. In your domain registrar (e.g. for a `.co.ke` domain), point DNS `CNAME` or `A` records to Vercel's edge network.
