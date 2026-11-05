import { publicSupabase } from "@/lib/supabase/public";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/public/ContactForm";
import Link from "next/link";
import { ArrowLeft, CheckCircle, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { LqdService } from "@/lib/types/database";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { data: services } = await publicSupabase
    .from("lqd_services")
    .select("slug")
    .eq("published", true);

  return (services || []).map((service) => ({
    slug: service.slug,
  }));
}

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const { data: service } = await publicSupabase
    .from("lqd_services")
    .select("title, excerpt")
    .eq("slug", slug)
    .single();

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | LQD Creatives`,
    description: service.excerpt,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  const { data: service } = await publicSupabase
    .from("lqd_services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!service) {
    notFound();
  }

  const currentService: LqdService = service;

  return (
    <div className="py-16 sm:py-24 bg-[#080e1e]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb Back Link */}
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            {currentService.is_flagship && (
              <span className="px-3 py-1 rounded bg-[#d4af37] text-[#080e1e] text-[10px] font-bold uppercase tracking-wider">
                Flagship Service
              </span>
            )}
            <span className="text-xs text-[#d4af37] uppercase tracking-wider font-semibold">
              {currentService.category.replace("_", " ")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {currentService.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
            {currentService.excerpt}
          </p>
        </div>

        {/* Detailed Scope & Ideal Customer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-[#0e1833] border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">
              Full Scope Overview
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentService.scope_description}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0e1833] border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">
              Ideal Customer Profile
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentService.ideal_customer}
            </p>
          </div>
        </div>

        {/* Deliverables */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0e1833] border border-white/10 space-y-6">
          <h3 className="text-xl font-bold text-white">
            What You Receive (Deliverables)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentService.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#080e1e] border border-white/5">
                <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        {currentService.process_steps && currentService.process_steps.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">The Delivery Process</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentService.process_steps.map((p) => (
                <div key={p.step} className="p-6 rounded-xl bg-[#0e1833] border border-white/10 relative">
                  <span className="text-2xl font-bold text-[#d4af37]/30 absolute top-4 right-4">
                    0{p.step}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2">{p.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pricing Guidance & Optional Add-ons */}
        <div className="p-8 rounded-2xl bg-[#101b38] border border-[#d4af37]/30 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Transparent Pricing Guidance</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentService.pricing_guidance}
            </p>
            <p className="text-xs text-slate-400 italic">
              * Exact costs are determined through upfront scoping based on page count, interactive workflows, and copywriting needs. We never invent arbitrary rates.
            </p>
          </div>

          {currentService.optional_addons && currentService.optional_addons.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                Available Separately Scoped Modules:
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentService.optional_addons.map((add, aIdx) => (
                  <span
                    key={aIdx}
                    className="px-3 py-1.5 rounded-lg bg-[#080e1e] border border-white/10 text-xs text-slate-200"
                  >
                    + {add}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Service FAQs */}
        {currentService.faqs && currentService.faqs.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {currentService.faqs.map((f, fIdx) => (
                <div key={fIdx} className="p-6 rounded-xl bg-[#0e1833] border border-white/10 space-y-2">
                  <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>{f.q}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Form */}
        <div className="pt-8">
          <ContactForm defaultService={currentService.title} />
        </div>
      </div>
    </div>
  );
}
