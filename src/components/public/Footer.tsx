import Link from "next/link";
import { MessageSquare, Mail, Phone, MapPin, ArrowUpRight, Lock } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050914] text-slate-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0e1833] border border-[#d4af37]/40 flex items-center justify-center font-bold text-[#d4af37] text-base">
                LQ
              </div>
              <span className="text-white font-bold tracking-tight text-xl">
                LQD <span className="text-[#d4af37]">Creatives</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              We help Kenyan businesses build professional, mobile-friendly websites that make it easy for customers to understand their services, trust the business, and make an enquiry.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Nairobi, Kenya • Serving Ambitions Across East Africa</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <a href="tel:+254740396075" className="hover:text-white transition-colors">
                  +254 740 396 075
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                <a href="mailto:lqdcreatives@gmail.com" className="hover:text-white transition-colors">
                  lqdcreatives@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/website-design-development" className="hover:text-white transition-colors">
                  Web Design & Development
                </Link>
              </li>
              <li>
                <Link href="/services/brand-identity-design" className="hover:text-white transition-colors">
                  Brand Identity & Graphics
                </Link>
              </li>
              <li>
                <Link href="/services/business-automation-integrations" className="hover:text-white transition-colors">
                  M-Pesa & SME Automation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-xs text-[#d4af37] hover:underline flex items-center gap-1">
                  All Service Capabilities <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Insights & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Channels & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Connect & Admin</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://wa.me/254740396075"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25d366] transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25d366]" />
                  WhatsApp Concierge
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/reuben-kimani-0870b6372"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/lqdcreatives/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram (@lqdcreatives)
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@lqdcreatives"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TikTok Channel
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>CMS Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} LQD Creatives. All rights reserved. Handcrafted in Nairobi, Kenya.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms of Engagement
            </Link>
            <span className="text-slate-600">Kenya DPA 2019 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
