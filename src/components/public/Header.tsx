"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080e1e]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#0e1833] border border-[#d4af37]/40 flex items-center justify-center font-bold text-[#d4af37] text-lg tracking-wider group-hover:border-[#d4af37] transition-colors">
              LQ
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-tight text-lg">
                LQD <span className="text-[#d4af37]">Creatives</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                Nairobi, Kenya
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/254740396075?text=Hi%20Reuben,%20I%20would%20like%20to%20discuss%20a%20website%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0e1833] border border-white/10 text-slate-200 text-xs font-medium hover:border-[#25d366]/50 hover:text-[#25d366] transition-all"
              aria-label="Direct WhatsApp contact"
            >
              <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
              WhatsApp: 0740 396 075
            </a>

            <Link
              href="/contact"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#d4af37] text-[#080e1e] font-semibold text-sm hover:bg-[#e6c86e] transition-colors shadow-sm"
            >
              <span>Discuss Your Website</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/contact"
              className="px-3 py-1.5 rounded bg-[#d4af37] text-[#080e1e] text-xs font-semibold"
            >
              Enquire
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a1329] border-b border-white/10 px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-[#d4af37] hover:bg-white/5 rounded-md"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <a
              href="https://wa.me/254740396075?text=Hi%20Reuben,%20I%20would%20like%20to%20discuss%20a%20website%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#0e1833] border border-white/10 text-slate-200 text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4 text-[#25d366]" />
              WhatsApp: +254 740 396 075
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#d4af37] text-[#080e1e] text-sm font-semibold"
            >
              Discuss Your Website
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
