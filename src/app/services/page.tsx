import Link from "next/link";
import { publicSupabase } from "@/lib/supabase/public";
import { LqdService } from "@/lib/types/database";
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Layers, Sparkles } from "lucide-react";

export const metadata = {
  title: "Services & Capabilities",
  description: "Web design, full-stack development, and brand identity design for growing Kenyan businesses.",
};

export const revalidate = 3600;

export default async function ServicesPage() {
  const { data: services } = await publicSupabase
    .from("lqd_services")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });

  const serviceList: LqdService[] = services || [];

  return (
    <div className="py-20 bg-[#080e1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
            What We Do
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Services & Solutions for Kenyan Enterprises
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We lead with website design and development, supported by brand identity and graphic design. Every project is scoped transparently based on your actual business objectives.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-12">
          {serviceList.map((service, idx) => (
            <div
              key={service.id}
              className={`p-8 sm:p-12 rounded-3xl border transition-all ${
                service.is_flagship
                  ? "bg-gradient-to-br from-[#0e1833] via-[#122045] to-[#0a1228] border-[#d4af37]/40 shadow-2xl"
                  : "bg-[#0e1833] border-white/10"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    {service.is_flagship && (
                      <span className="px-3 py-1 rounded bg-[#d4af37] text-[#080e1e] text-[10px] font-bold uppercase tracking-wider">
                        Flagship Service
                      </span>
                    )}
                    <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
                      {service.category.replace("_", " ")}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {service.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {service.scope_description}
                  </p>

                  {/* Ideal Customer Profile */}
                  <div className="p-4 rounded-xl bg-[#080e1e]/60 border border-white/5 space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Best Suited For:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {service.ideal_customer}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Scope Deliverables:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                      {service.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="px-6 py-3 rounded-xl bg-[#d4af37] text-[#080e1e] font-bold text-xs hover:bg-[#e6c86e] transition-colors flex items-center gap-2"
                    >
                      <span>Explore Service Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/contact"
                      className="px-6 py-3 rounded-xl border border-white/20 text-slate-200 font-semibold text-xs hover:bg-white/5 transition-colors"
                    >
                      Request a Scope Quote
                    </Link>
                  </div>
                </div>

                {/* Right Column: Pricing & Process Guidance */}
                <div className="lg:col-span-5 space-y-6 bg-[#080e1e]/70 p-6 sm:p-8 rounded-2xl border border-white/5">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Pricing Guidance:
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {service.pricing_guidance}
                    </p>
                  </div>

                  {/* Optional Add-ons */}
                  {service.optional_addons && service.optional_addons.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                        Optional Add-On Modules:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {service.optional_addons.map((add, aIdx) => (
                          <li key={aIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                            <span>{add}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 text-[11px] text-slate-400">
                    💡 All builds include mobile optimization, security headers, and staff handover training.
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
