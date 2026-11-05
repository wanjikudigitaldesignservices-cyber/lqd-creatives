import Link from "next/link";
import { publicSupabase } from "@/lib/supabase/public";
import { ContactForm } from "@/components/public/ContactForm";
import { 
  ArrowRight, 
  Smartphone, 
  CheckCircle, 
  MessageSquare, 
  Layers, 
  Cpu, 
  Search, 
  ShieldCheck, 
  Clock, 
  Zap, 
  HelpCircle,
  ExternalLink,
  ShoppingBag,
  Compass
} from "lucide-react";
import { LqdService, LqdProject, LqdFaq } from "@/lib/types/database";

// High-speed Edge ISR caching
export const revalidate = 3600;

export default async function HomePage() {
  // Fetch published services, projects, and FAQs using zero-cookie public client
  const [servicesRes, projectsRes, faqsRes] = await Promise.all([
    publicSupabase
      .from("lqd_services")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true }),
    publicSupabase
      .from("lqd_projects")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true })
      .limit(6),
    publicSupabase
      .from("lqd_faqs")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true }),
  ]);

  const services: LqdService[] = servicesRes.data || [];
  const projects: LqdProject[] = projectsRes.data || [];
  const faqs: LqdFaq[] = faqsRes.data || [];

  const flagshipService = services.find((s) => s.is_flagship) || services[0];
  const supportingServices = services.filter((s) => !s.is_flagship);

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION WITH CLEAR OFFICE STUDIO BACKGROUND */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden flex items-center min-h-[640px] lg:min-h-[740px]">
        {/* Background Image: Crystal Clear Modern Architectural Studio (Zero people, crisp, high-res) */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src="/images/hero-office.jpg"
            alt="LQD Creatives modern digital studio workspace"
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
            loading="eager"
          />
          {/* Subtle translucent tint that preserves full image clarity while softly blending edges */}
          <div className="absolute inset-0 bg-[#080e1e]/35" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080e1e] to-transparent" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d4af37]/15 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl mx-auto text-center space-y-6 bg-[#080e1e]/75 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl">
            {/* Positioning Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080e1e]/90 backdrop-blur-md border border-[#d4af37]/50 text-xs font-semibold text-[#d4af37] shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
              Kenyan SME Web Design & Development Practice
            </div>

            {/* Outcome-led Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.14] drop-shadow-md">
              Websites that help Kenyan businesses earn trust and{" "}
              <span className="text-[#d4af37]">generate qualified enquiries.</span>
            </h1>

            {/* Concise Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl mx-auto">
              We build fast, mobile-friendly websites for growing Kenyan enterprises. Clear service presentations that make it effortless for customers to understand your value and reach out.
            </p>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#d4af37] text-[#080e1e] font-bold text-base hover:bg-[#e6c86e] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/20"
              >
                <span>Discuss Your Website</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/work"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#080e1e]/90 backdrop-blur-md border border-white/20 text-slate-100 font-semibold text-base hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>View Our Work</span>
              </Link>
            </div>

            {/* Honesty note */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <CheckCircle className="w-3.5 h-3.5 text-[#25d366]" /> 100% Code & Domain Ownership
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <CheckCircle className="w-3.5 h-3.5 text-[#25d366]" /> Built Mobile-First for Kenya
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <CheckCircle className="w-3.5 h-3.5 text-[#25d366]" /> Direct WhatsApp Coordination
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION: Who We Serve (Honest, No fake logos) */}
      <section className="py-20 bg-[#060b17] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
              Purpose-Built For Growing Enterprises
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
              Engineered for the reality of Kenyan commerce
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              We design websites specifically for Kenyan business models where client trust, mobile usability on local data networks, and rapid direct enquiries drive commercial success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {/* 1. Professional Services */}
            <div className="rounded-2xl bg-[#0e1833] border border-white/10 overflow-hidden flex flex-col justify-between card-hover-effect group">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/sectors/professional.jpg"
                  alt="Kenyan professional corporate practices and law firms"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1833] via-[#0e1833]/40 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#080e1e]/85 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 pt-3 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    Professional Services & Legal
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                    Law firms, audit consultancies, and engineering practices that need an authoritative digital presence to win corporate tenders and private clients.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#d4af37]">
                  <span>Credential & Profile Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* 2. Clinics & Healthcare */}
            <div className="rounded-2xl bg-[#0e1833] border border-white/10 overflow-hidden flex flex-col justify-between card-hover-effect group">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/sectors/healthcare.jpg"
                  alt="Medical clinics and private healthcare facilities in Kenya"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1833] via-[#0e1833]/40 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#080e1e]/85 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shadow-md">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 pt-3 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    Clinics & Healthcare Practices
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                    Private medical practices, physiotherapy clinics, and wellness centres requiring clear specialist profiles and friction-free booking pathways.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#d4af37]">
                  <span>Doctor Directory & Direct Triage</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* 3. Transport & Logistics */}
            <div className="rounded-2xl bg-[#0e1833] border border-white/10 overflow-hidden flex flex-col justify-between card-hover-effect group">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/sectors/logistics.jpg"
                  alt="East African freight logistics and transport operations"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1833] via-[#0e1833]/40 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#080e1e]/85 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shadow-md">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 pt-3 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    Transport & Logistics
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                    East African freight, cargo haulage, and clearing firms that need instant quotation requests and fleet capability showcases.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#d4af37]">
                  <span>Instant Rate & Route Quoting</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* 4. Agri & Commercial Suppliers */}
            <div className="rounded-2xl bg-[#0e1833] border border-white/10 overflow-hidden flex flex-col justify-between card-hover-effect group">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/sectors/agriculture.jpg"
                  alt="Kenyan agricultural suppliers and commercial distributors"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1833] via-[#0e1833]/40 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#080e1e]/85 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shadow-md">
                  <Cpu className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 pt-3 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    Agri & Commercial Suppliers
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                    Agricultural distributors and wholesale suppliers needing low-bandwidth, fast-loading digital catalogues for field buyers.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#d4af37]">
                  <span>Low-Bandwidth Mobile Catalogues</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* 5. Retail Stores & Modern Brands */}
            <div className="rounded-2xl bg-[#0e1833] border border-white/10 overflow-hidden flex flex-col justify-between card-hover-effect group">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/sectors/retail.jpg"
                  alt="Modern retail boutiques and Kenyan consumer merchants"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1833] via-[#0e1833]/40 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#080e1e]/85 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shadow-md">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 pt-3 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    Retail Stores & Modern Brands
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                    Boutique shops, electronics stores, and merchandise retailers needing direct WhatsApp ordering pathways and live inventory catalogues.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#d4af37]">
                  <span>Direct WhatsApp Ordering Flow</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* 6. Hospitality, Lodges & Retreats */}
            <div className="rounded-2xl bg-[#0e1833] border border-white/10 overflow-hidden flex flex-col justify-between card-hover-effect group">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/sectors/hospitality.jpg"
                  alt="Kenyan boutique safari lodges, retreats, and hotels"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1833] via-[#0e1833]/40 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#080e1e]/85 backdrop-blur-md border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shadow-md">
                  <Compass className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 pt-3 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    Hospitality, Lodges & Retreats
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                    Boutique hotels, countryside retreats, and safari operators looking to increase direct reservations and eliminate third-party commission overhead.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#d4af37]">
                  <span>Direct Guest Booking Flow</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP SERVICE: Website Design & Development */}
      {flagshipService && (
        <section className="py-24 bg-[#080e1e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#0e1833] via-[#101c3d] to-[#080e1e] border border-[#d4af37]/30 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#d4af37]/15 border border-[#d4af37]/40 text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                    Our Flagship Offering
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                    {flagshipService.title}
                  </h2>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                    {flagshipService.scope_description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Standard Deliverables Included:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {flagshipService.deliverables.slice(0, 6).map((del, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-slate-200">
                          <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                    <Link
                      href="/contact"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#d4af37] text-[#080e1e] font-bold text-sm hover:bg-[#e6c86e] transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Discuss Your Website</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/services/${flagshipService.slug}`}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/20 text-slate-200 text-sm font-semibold hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Full Scope & Pricing Details</span>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#080e1e]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                  <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
                    Why Kenyan SMEs Choose This
                  </h3>
                  <div className="space-y-4 text-xs text-slate-300">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center shrink-0 font-bold">1</div>
                      <div>
                        <strong className="text-white block text-sm mb-0.5">Mobile Network Optimized</strong>
                        Pages load in under 1 second, ensuring you do not lose mobile visitors on fluctuating cellular data networks.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center shrink-0 font-bold">2</div>
                      <div>
                        <strong className="text-white block text-sm mb-0.5">Friction-Free WhatsApp Conversion</strong>
                        Visitors can start a pre-filled WhatsApp conversation with a single tap, increasing enquiry volume.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center shrink-0 font-bold">3</div>
                      <div>
                        <strong className="text-white block text-sm mb-0.5">Editable Built-in CMS</strong>
                        Update your own copy, prices, contact numbers, and articles without paying developer retainer fees.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. SUPPORTING SERVICE: Brand Identity & Graphic Design (EXPANSIVE FULL-WIDTH BENTO SHOWCASE) */}
      {supportingServices.length > 0 && (
        <section className="py-24 bg-[#060b17] border-t border-white/10 relative overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#d4af37]/15 border border-[#d4af37]/40 text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                Supporting Service Discipline
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Brand Identity & Graphic Design for Digital
              </h2>
              <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed">
                Digital-first visual identities that look authoritative on smartphone screens, proposals, and social platforms.
              </p>
            </div>

            {/* FULL-WIDTH EXPANSIVE BENTO SHOWCASE FILLING ENTIRE SPACE */}
            <div className="w-full rounded-3xl bg-gradient-to-br from-[#0e1833] via-[#101c3d] to-[#080e1e] border border-[#d4af37]/35 overflow-hidden shadow-2xl relative card-hover-effect">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-12 lg:p-14">
                
                {/* Left 7 Columns: Value Proposition, Deliverables & Actions */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                      Digital-First Brand Architecture
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                      Visual Systems Built for Mobile Authority & Corporate Trust
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                      A website converts better when your brand looks established, cohesive, and intentional. We build rigorous visual identity guidelines that ensure your business looks authoritative whether viewed as a tiny mobile favicon, a corporate tender document, or a sponsored social campaign.
                    </p>
                  </div>

                  {/* Key Deliverables Cards */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Deliverables Included:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="p-4 rounded-xl bg-[#080e1e]/90 border border-white/10 space-y-1.5 hover:border-[#d4af37]/40 transition-colors">
                        <div className="flex items-center gap-2 text-white font-semibold text-sm">
                          <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                          <span>Vector Logo Lockups</span>
                        </div>
                        <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                          Vector primary & secondary logo lockups (SVG, PNG, PDF) with dark & light mode adaptations for web headers and print.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#080e1e]/90 border border-white/10 space-y-1.5 hover:border-[#d4af37]/40 transition-colors">
                        <div className="flex items-center gap-2 text-white font-semibold text-sm">
                          <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                          <span>Typography Hierarchy</span>
                        </div>
                        <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                          Defined typography hierarchy and web font pairings optimized for sub-second rendering across Kenyan mobile connections.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#080e1e]/90 border border-white/10 space-y-1.5 hover:border-[#d4af37]/40 transition-colors">
                        <div className="flex items-center gap-2 text-white font-semibold text-sm">
                          <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                          <span>Digital Color Tokens</span>
                        </div>
                        <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                          Curated brand color palette with exact digital tokens (HEX, RGB, CSS variables) engineered for high WCAG contrast.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#080e1e]/90 border border-white/10 space-y-1.5 hover:border-[#d4af37]/40 transition-colors">
                        <div className="flex items-center gap-2 text-white font-semibold text-sm">
                          <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                          <span>Social & Proposal Assets</span>
                        </div>
                        <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                          Digital profile assets, standardized pitch title banners, and reusable branding guidelines for your team.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 border-t border-white/10">
                    <Link
                      href="/services/brand-identity-design"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#d4af37] text-[#080e1e] font-bold text-sm hover:bg-[#e6c86e] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20"
                    >
                      <span>Explore Scope & Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/5 border border-white/20 text-slate-200 font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Inquire About Branding</span>
                    </Link>
                  </div>
                </div>

                {/* Right 5 Columns: Editorial Visual Photography & Tokens Specimen */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950 group">
                    <img
                      src="/images/brand-identity-showcase.jpg"
                      alt="Brand identity guidelines, stationery lockups, and digital visual tokens"
                      className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080e1e] via-[#080e1e]/30 to-transparent" />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#080e1e]/85 backdrop-blur-md border border-[#d4af37]/40 text-[11px] font-semibold text-[#d4af37] shadow-lg">
                      Digital Identity System
                    </div>
                  </div>

                  {/* Interactive Digital Tokens Specimen Card */}
                  <div className="p-5 rounded-2xl bg-[#080e1e]/90 border border-white/10 space-y-3 backdrop-blur-md shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Design Tokens Specimen
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        WCAG AAA Compliant
                      </span>
                    </div>

                    {/* Color Chips */}
                    <div className="grid grid-cols-4 gap-2">
                      <div className="p-2 rounded-lg bg-[#0e1833] border border-white/15 text-center">
                        <div className="w-full h-6 rounded bg-[#080e1e] border border-white/20 mb-1" />
                        <span className="block text-[9px] font-mono text-slate-300">#080E1E</span>
                        <span className="block text-[8px] text-slate-400 uppercase">Obsidian</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#0e1833] border border-white/15 text-center">
                        <div className="w-full h-6 rounded bg-[#d4af37] mb-1 shadow-sm" />
                        <span className="block text-[9px] font-mono text-[#d4af37]">#D4AF37</span>
                        <span className="block text-[8px] text-slate-300 uppercase">Gold Primary</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#0e1833] border border-white/15 text-center">
                        <div className="w-full h-6 rounded bg-[#0e1833] border border-white/20 mb-1" />
                        <span className="block text-[9px] font-mono text-slate-300">#0E1833</span>
                        <span className="block text-[8px] text-slate-400 uppercase">Navy Surface</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#0e1833] border border-white/15 text-center">
                        <div className="w-full h-6 rounded bg-[#25d366] mb-1 shadow-sm" />
                        <span className="block text-[9px] font-mono text-[#25d366]">#25D366</span>
                        <span className="block text-[8px] text-slate-300 uppercase">WhatsApp</span>
                      </div>
                    </div>

                    {/* Typography Specimen */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                      <span className="font-sans font-semibold">Plus Jakarta Sans (Sans)</span>
                      <span className="font-serif italic text-[#d4af37]">Playfair Display (Serif)</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. SELECTED WORK: Honest Labels ("Concept Project" Badges) */}
      <section className="py-24 bg-[#080e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                Demonstrated Engineering
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                Selected Work & Prototypes
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                We believe in complete transparency: where verified client deployments exist, they are noted; concept prototypes and architectural demonstrations are clearly badged as concept projects.
              </p>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-[#d4af37] font-semibold hover:underline self-start md:self-auto"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl bg-[#0e1833] border border-white/10 overflow-hidden flex flex-col justify-between card-hover-effect group shadow-xl"
              >
                <div>
                  {/* Real Homepage Screenshot Preview */}
                  {proj.gallery && proj.gallery.length > 0 && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 border-b border-white/10">
                      <img
                        src={proj.gallery[0]}
                        alt={`${proj.title} homepage preview`}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1833] via-transparent to-transparent opacity-50" />
                      {proj.live_url && (
                        <a
                          href={proj.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-[#080e1e]/85 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-[#080e1e] transition-all flex items-center gap-1.5 shadow-lg"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  <div className="p-6 sm:p-7 space-y-4">
                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {proj.project_type === "concept" ? "Concept Prototype" : "Client Project"}
                      </span>
                      <span className="text-[11px] text-slate-400 uppercase font-medium">
                        {proj.category.replace("_", " ")}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {proj.summary}
                    </p>

                    <div className="pt-1 space-y-1.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Solution Highlight:</p>
                      <p className="text-xs text-slate-300 bg-[#080e1e] p-3 rounded-lg border border-white/5 line-clamp-2">
                        {proj.solution}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.slice(0, 4).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#080e1e] text-slate-300 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-0 border-t border-white/5 mt-2 flex items-center justify-between">
                  <Link
                    href={`/work/${proj.slug}`}
                    className="text-xs font-semibold text-[#d4af37] hover:underline flex items-center gap-1.5"
                  >
                    <span>Case Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  {proj.live_url && (
                    <a
                      href={proj.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-300 hover:text-white flex items-center gap-1 px-3 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <span>Launch</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR 4-STEP PROCESS */}
      <section className="py-24 bg-[#060b17] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
              Predictable & Transparent Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
              From Concept to Launch in 4 Clear Steps
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              No endless delays, no technical jargon. A structured delivery process designed around milestones and active communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-7 rounded-2xl bg-[#0e1833] border border-white/10 relative card-hover-effect group">
              <span className="text-4xl font-extrabold text-[#d4af37]/25 absolute top-5 right-5 group-hover:text-[#d4af37]/60 transition-colors">01</span>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">1. Discover & Scope</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We define your primary business objective, ideal Kenyan customer profile, and required pages. You get a clear, itemized proposal before paying a single shilling.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0e1833] border border-white/10 relative card-hover-effect group">
              <span className="text-4xl font-extrabold text-[#d4af37]/25 absolute top-5 right-5 group-hover:text-[#d4af37]/60 transition-colors">02</span>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">2. Wireframe & Plan</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We plan the visual hierarchy and customer journey, ensuring your services are immediately understood and your contact mechanisms are front and center.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0e1833] border border-white/10 relative card-hover-effect group">
              <span className="text-4xl font-extrabold text-[#d4af37]/25 absolute top-5 right-5 group-hover:text-[#d4af37]/60 transition-colors">03</span>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">3. Engineered Build</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We engineer your site using modern Next.js and Supabase. We implement mobile responsiveness, secure forms, WhatsApp linking, and database persistence.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0e1833] border border-white/10 relative card-hover-effect group">
              <span className="text-4xl font-extrabold text-[#d4af37]/25 absolute top-5 right-5 group-hover:text-[#d4af37]/60 transition-colors">04</span>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">4. Launch & Handover</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We map your domain (.co.ke or .com), test across real mobile devices, train you on your CMS dashboard, and hand over 100% of your source code and assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. KENYAN SME FAQS */}
      <section className="py-24 bg-[#080e1e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
              Transparent Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Straightforward answers addressing costs, turnaround times, domains, and ownership for Kenyan businesses.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="p-6 rounded-xl bg-[#0e1833] border border-white/10 space-y-2"
              >
                <h3 className="text-base font-bold text-white flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL ENQUIRY & CONTACT SECTION */}
      <section id="enquiry" className="py-24 bg-[#060b17] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Contact Information Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  Let's Build Something Exceptional
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Ready to upgrade your website?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Fill in the project enquiry form or message us directly on WhatsApp. We provide honest technical assessments and clear milestone pricing.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0e1833] border border-white/10 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Communication</h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#25d366]/20 text-[#25d366] flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">WhatsApp / Phone</span>
                      <a href="https://wa.me/254740396075" className="font-semibold text-white hover:text-[#25d366]">
                        +254 740 396 075
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">Typical Response Time</span>
                      <span className="font-semibold text-white">Under 4 hours (Business days)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2 text-xs text-slate-400">
                <p className="font-semibold text-slate-300">Our Working Guarantee:</p>
                <p>
                  No aggressive sales pitches, no hidden annual hosting markups, and no lock-in contracts. You get full source code handover upon completion.
                </p>
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
