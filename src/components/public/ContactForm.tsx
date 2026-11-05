"use client";

import { useState, useEffect } from "react";
import { submitLeadAction, SubmitLeadResult } from "@/app/actions/submit-lead";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";

interface ContactFormProps {
  defaultService?: string;
}

export function ContactForm({ defaultService = "Website Design & Full-Stack Development" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceRequired, setServiceRequired] = useState(defaultService);
  const [budgetRange, setBudgetRange] = useState("");
  const [desiredTimeline, setDesiredTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  // Bot honeypot and timing
  const [companyFax, setCompanyFax] = useState("");
  const [formLoadTime, setFormLoadTime] = useState<number>(0);

  // Submission status
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubmitLeadResult | null>(null);

  useEffect(() => {
    setFormLoadTime(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    // Basic client validation
    if (!name.trim()) {
      setResult({ success: false, message: "Please provide your name." });
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setResult({
        success: false,
        message: "Please provide either an email or phone/WhatsApp number so we can respond.",
      });
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setResult({
        success: false,
        message: "Please write a brief description of what you need (at least 10 characters).",
      });
      return;
    }
    if (!consentGiven) {
      setResult({
        success: false,
        message: "Please accept the privacy policy terms to proceed.",
      });
      return;
    }

    setLoading(true);

    try {
      // Capture UTMs from URL if available
      let utmSource = "";
      let utmMedium = "";
      let utmCampaign = "";
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        utmSource = urlParams.get("utm_source") || "";
        utmMedium = urlParams.get("utm_medium") || "";
        utmCampaign = urlParams.get("utm_campaign") || "";
      }

      const res = await submitLeadAction({
        name,
        business_name: businessName,
        email,
        phone,
        service_required: serviceRequired,
        budget_range: budgetRange,
        desired_timeline: desiredTimeline,
        message,
        consent_given: consentGiven,
        company_fax: companyFax,
        form_load_time: formLoadTime,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      });

      setResult(res);
      if (res.success) {
        // Clear sensitive inputs on success
        setName("");
        setBusinessName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch {
      setResult({
        success: false,
        message: "An unexpected network error occurred. Please contact us directly on WhatsApp (+254 740 396 075).",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#0e1833] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
          Direct Project Enquiry
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Tell us about your website project
        </h3>
        <p className="text-sm text-slate-400 mt-2">
          We review every submission carefully and reply within 24 business hours with honest scope advice and ballpark estimates.
        </p>
      </div>

      {result && result.success ? (
        <div className="p-8 bg-[#132448] border border-[#d4af37]/40 rounded-xl text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#25d366]/20 border border-[#25d366]/40 flex items-center justify-center mx-auto text-[#25d366]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-white">Enquiry Received Successfully!</h4>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            {result.message}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/254740396075?text=Hi%20Reuben,%20I%20just%20submitted%20a%20website%20enquiry%20via%20the%20LQD%20Creatives%20site."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#25d366] text-[#080e1e] font-semibold text-sm hover:bg-[#20ba5a] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Follow up on WhatsApp (+254 740 396 075)
            </a>
            <button
              onClick={() => setResult(null)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-white/20 text-slate-300 text-sm hover:bg-white/5 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {result && !result.success && (
            <div className="p-4 bg-red-950/60 border border-red-500/30 rounded-lg flex items-start gap-3 text-red-200 text-sm">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{result.message}</p>
                {result.fieldErrors && (
                  <ul className="list-disc list-inside mt-1 text-xs text-red-300">
                    {Object.entries(result.fieldErrors).map(([field, msgs]) => (
                      <li key={field}>{msgs[0]}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Honeypot field (hidden from genuine users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company_fax">Leave this field blank</label>
            <input
              type="text"
              id="company_fax"
              name="company_fax"
              tabIndex={-1}
              autoComplete="off"
              value={companyFax}
              onChange={(e) => setCompanyFax(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-[#d4af37]">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. David Mwangi"
                className="w-full px-4 py-3 rounded-lg bg-[#080e1e] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="businessName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Business / Entity Name <span className="text-slate-400 text-[10px]">(Optional)</span>
              </label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Apex Legal Advocates"
                className="w-full px-4 py-3 rounded-lg bg-[#080e1e] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Phone / WhatsApp <span className="text-[#d4af37]">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0740 396 075"
                className="w-full px-4 py-3 rounded-lg bg-[#080e1e] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              />
              <p className="text-[11px] text-slate-400 mt-1">We can reply on WhatsApp for quick coordination.</p>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-slate-400 text-[10px]">(Optional if phone is provided)</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. david@apexlegal.co.ke"
                className="w-full px-4 py-3 rounded-lg bg-[#080e1e] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="serviceRequired" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Service Required <span className="text-[#d4af37]">*</span>
              </label>
              <select
                id="serviceRequired"
                value={serviceRequired}
                onChange={(e) => setServiceRequired(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#080e1e] border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              >
                <option value="Website Design & Full-Stack Development">Flagship: Web Design & Development</option>
                <option value="Brand Identity & Graphic Design for Digital">Brand Identity & Graphic Design</option>
                <option value="Complete Website + Branding Package">Full Website + Branding Package</option>
              </select>
            </div>

            <div>
              <label htmlFor="budgetRange" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Estimated Budget <span className="text-slate-400 text-[10px]">(Optional)</span>
              </label>
              <select
                id="budgetRange"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#080e1e] border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              >
                <option value="">Select a range...</option>
                <option value="KES 35,000 - 55,000">KES 35,000 - 55,000 (Focused SME Platform)</option>
                <option value="KES 55,000 - 95,000">KES 55,000 - 95,000 (Commercial Growth Site)</option>
                <option value="KES 95,000 - 180,000">KES 95,000 - 180,000 (Custom Portal / Integration)</option>
                <option value="KES 180,000+">KES 180,000+ (Enterprise System)</option>
                <option value="Flexible / Undecided">Flexible / Need guidance</option>
              </select>
            </div>

            <div>
              <label htmlFor="desiredTimeline" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Desired Timeline <span className="text-slate-400 text-[10px]">(Optional)</span>
              </label>
              <select
                id="desiredTimeline"
                value={desiredTimeline}
                onChange={(e) => setDesiredTimeline(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#080e1e] border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              >
                <option value="Within 2-3 weeks (Standard)">Within 2-3 weeks (Standard)</option>
                <option value="Urgent (Under 10 days)">Urgent (Under 10 days)</option>
                <option value="Next Month">Next Month</option>
                <option value="Exploring Options">Just exploring options</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Project Description & Requirements <span className="text-[#d4af37]">*</span>
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What does your business do, and what are the main goals for your new website? (e.g. explain our services, allow customers to book appointments, or showcase our completed projects)"
              className="w-full px-4 py-3 rounded-lg bg-[#080e1e] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3 pt-1">
            <input
              id="consent"
              type="checkbox"
              required
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-[#080e1e] text-[#d4af37] focus:ring-[#d4af37]"
            />
            <label htmlFor="consent" className="text-xs text-slate-400 leading-relaxed">
              I agree to allow LQD Creatives to contact me regarding this enquiry in accordance with the{" "}
              <Link href="/privacy" target="_blank" className="text-[#d4af37] underline hover:text-white">
                Privacy Policy
              </Link>
              . No spam or unsolicited marketing.
            </label>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#d4af37] text-[#080e1e] font-bold text-sm hover:bg-[#e6c86e] transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Enquiry...</span>
                </>
              ) : (
                <>
                  <span>Discuss Your Website</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <span className="text-xs text-slate-400">or</span>

            <a
              href="https://wa.me/254740396075?text=Hi%20Reuben,%20I%20would%20like%20to%20discuss%20a%20website%20project%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#080e1e] border border-white/20 text-slate-200 text-xs font-semibold hover:border-[#25d366] hover:text-[#25d366] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#25d366]" />
              <span>Direct WhatsApp (+254 740 396 075)</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
