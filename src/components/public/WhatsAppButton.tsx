"use client";

import { MessageSquare } from "lucide-react";

export function WhatsAppButton() {
  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/254740396075?text=Hi%20Reuben,%20I'm%20reaching%20out%20from%20the%20LQD%20Creatives%20website%20to%20discuss%20a%20website%20project."
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#25d366] text-[#080e1e] font-bold text-sm rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-[#25d366]/30"
        aria-label="Direct WhatsApp chat with Reuben Kimani"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#080e1e] opacity-40"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#080e1e]"></span>
        </span>
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>
    </aside>
  );
}
