import { ContactForm } from "@/components/public/ContactForm";
import { MessageSquare, Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Contact & Project Enquiries",
  description: "Get in touch with LQD Creatives in Nairobi, Kenya. Discuss your web design or software development project.",
};

export default function ContactPage() {
  return (
    <div className="py-20 bg-[#080e1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Discuss Your Website Project
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Have a question or ready to build? Reach us via WhatsApp for a quick consultation or submit the structured enquiry form below. We respond within 24 business hours with honest scope advice.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct channels column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#0e1833] border border-white/10 space-y-6">
              <h2 className="text-lg font-bold text-white border-b border-white/10 pb-3">
                Direct Channels
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#25d366]/20 text-[#25d366] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                      WhatsApp Quick Chat
                    </span>
                    <a
                      href="https://wa.me/254740396075"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-white hover:text-[#25d366] transition-colors"
                    >
                      +254 740 396 075
                    </a>
                    <p className="text-xs text-slate-400 mt-0.5">Recommended for rapid scope discussions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                      Voice Telephone
                    </span>
                    <a href="tel:+254740396075" className="text-base font-bold text-white hover:text-[#d4af37] transition-colors">
                      0740 396 075
                    </a>
                    <p className="text-xs text-slate-400 mt-0.5">Mon – Fri: 8:30 AM – 6:00 PM EAT</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                      Official Inquiries Email
                    </span>
                    <a href="mailto:lqdcreatives@gmail.com" className="text-base font-bold text-white hover:underline transition-colors">
                      lqdcreatives@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                      Office Location
                    </span>
                    <span className="text-sm font-semibold text-white">
                      Nairobi, Kenya
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">Serving clients throughout Kenya & East Africa.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#080e1e] border border-white/10 space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>Our Privacy & Security Commitment</span>
              </div>
              <p className="leading-relaxed">
                Your contact details are used solely to communicate regarding your project enquiry. We do not sell data, spam, or share details with third parties.
              </p>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
