import Link from "next/link";
import { ArrowRight, ShieldCheck, Smartphone, Target, MessageSquare, Globe, ExternalLink } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "LQD Creatives is a Nairobi-based web design and digital engineering practice dedicated to Kenyan SMEs.",
};

export default function AboutPage() {
  return (
    <div className="py-20 bg-[#080e1e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
            About LQD Creatives
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineering websites that earn trust for ambitious Kenyan businesses.
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed font-normal">
            Based in Nairobi, Kenya, LQD Creatives was founded on a simple principle: Kenyan SMEs deserve digital platforms that work reliably, load instantly on local networks, and turn casual visitors into paying customers.
          </p>
        </div>

        {/* Narrative / Origin */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0e1833] border border-white/10 space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            The Problem We Exist to Solve
          </h2>
          <p>
            Too many Kenyan business owners have been burned by web agencies: paying tens of thousands of shillings for slow, bloated WordPress templates that take 8 seconds to load on mobile data, break whenever a plugin updates, and produce zero inquiries.
          </p>
          <p>
            When a prospective corporate client or retail customer searches for your services in Kenya, they usually view your site on their smartphone. If they can’t immediately tell what services you offer, how much it costs, and how to reach you via WhatsApp or an enquiry form, they click away and hire someone else.
          </p>
          <p className="text-white font-medium">
            LQD Creatives bridges this gap by combining editorial-quality product design with full-stack software engineering. We don’t just make sites look pretty; we architect them to make your business credible, legible, and easy to contact.
          </p>
        </div>

        {/* Core Values */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">How We Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0e1833] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#142247] text-[#d4af37] flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Radical Honesty</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We don’t invent fake awards, fabricated client logos, or false revenue promises. We give you realistic scopes, transparent pricing, and milestone guarantees.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1833] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#142247] text-[#d4af37] flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Mobile-First for Kenya</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Over 80% of your Kenyan visitors use mobile phones. We optimize every asset, font, and interaction for instant loading on local Safaricom and Airtel data connections.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1833] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#142247] text-[#d4af37] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">100% Client Ownership</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You own your code, domains, and assets upon completion. No recurring agency lock-ins or proprietary platform traps.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Profile */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0e1833] to-[#122045] border border-white/10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">Leadership</span>
            <h3 className="text-2xl font-bold text-white">Reuben Wanjiku Kimani</h3>
            <p className="text-xs text-slate-400">Founder & Lead Full-Stack Engineer • Nairobi, Kenya</p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Reuben brings deep hands-on expertise in modern web systems, TypeScript, React/Next.js architectures, and local payment integration (Safaricom Daraja M-Pesa). His focus is delivering enterprise-grade engineering rigor to early-stage and growing Kenyan businesses.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <a
              href="https://wa.me/254740396075"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25d366] text-[#080e1e] hover:bg-[#20ba5a] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct (+254 740 396 075)</span>
            </a>
            <a
              href="https://www.linkedin.com/in/reuben-kimani-0870b6372"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.tiktok.com/@lqdcreatives"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>TikTok</span>
            </a>
            <a
              href="https://www.instagram.com/lqdcreatives/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-6">
          <h3 className="text-2xl font-bold text-white">Let’s discuss your website requirements</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Get an honest review of your current site or a transparent quote for a new web build.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#d4af37] text-[#080e1e] font-bold text-sm hover:bg-[#e6c86e] transition-colors"
            >
              <span>Discuss Your Website</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
