"use client";

import { useState } from "react";
import { LqdSiteSettings } from "@/lib/types/database";
import { updateSettingsAction } from "@/app/actions/cms-actions";
import { updatePasswordAction } from "@/app/actions/auth-actions";
import { Loader2, CheckCircle2, Lock, AlertCircle } from "lucide-react";

interface SettingsClientProps {
  settings: LqdSiteSettings;
  isAdmin: boolean;
}

export function SettingsClient({ settings, isAdmin }: SettingsClientProps) {
  const [brandName, setBrandName] = useState(settings.brand_name);
  const [tagline, setTagline] = useState(settings.tagline);
  const [contactEmail, setContactEmail] = useState(settings.contact_email);
  const [contactPhone, setContactPhone] = useState(settings.contact_phone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsapp_number);
  const [addressLocality, setAddressLocality] = useState(settings.address_locality);
  const [addressCountry, setAddressCountry] = useState(settings.address_country);
  const [primaryCtaText, setPrimaryCtaText] = useState(settings.primary_cta_text);
  const [secondaryCtaText, setSecondaryCtaText] = useState(settings.secondary_cta_text);
  const [socialTiktok, setSocialTiktok] = useState(settings.social_tiktok || "");
  const [socialInstagram, setSocialInstagram] = useState(settings.social_instagram || "");
  const [socialFacebook, setSocialFacebook] = useState(settings.social_facebook || "");
  const [socialLinkedin, setSocialLinkedin] = useState(settings.social_linkedin || "");
  const [footerText, setFooterText] = useState(settings.footer_text);
  const [seoDefaultTitle, setSeoDefaultTitle] = useState(settings.seo_default_title);
  const [seoDefaultDescription, setSeoDefaultDescription] = useState(settings.seo_default_description);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Security / Password Change
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({
        success: false,
        message: "New passwords do not match.",
      });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordStatus({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
      return;
    }

    setPasswordUpdating(true);
    const res = await updatePasswordAction(newPassword);
    setPasswordUpdating(false);
    setPasswordStatus(res);

    if (res.success) {
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const res = await updateSettingsAction({
      brand_name: brandName,
      tagline,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      whatsapp_number: whatsappNumber,
      address_locality: addressLocality,
      address_country: addressCountry,
      primary_cta_text: primaryCtaText,
      secondary_cta_text: secondaryCtaText,
      social_tiktok: socialTiktok,
      social_instagram: socialInstagram,
      social_facebook: socialFacebook,
      social_linkedin: socialLinkedin,
      footer_text: footerText,
      seo_default_title: seoDefaultTitle,
      seo_default_description: seoDefaultDescription,
    });

    setSaving(false);
    setMessage(res.message);
  };

  return (
    <div className="max-w-4xl bg-[#0e1833] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
      {message && (
        <div className="p-4 rounded-xl bg-[#132448] border border-[#d4af37]/40 text-xs text-slate-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#25d366]" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Brand & Positioning */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
            Brand Identity & CTAs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase text-slate-400 mb-1">
                Brand Name
              </label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-slate-400 mb-1">
                Primary CTA Button Text
              </label>
              <input
                type="text"
                required
                value={primaryCtaText}
                onChange={(e) => setPrimaryCtaText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase text-slate-400 mb-1">
              Brand Tagline / Positioning Statement
            </label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Contact Numbers & Channels */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
            Direct Contact & Messaging
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold uppercase text-slate-400 mb-1">
                Voice Phone
              </label>
              <input
                type="text"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-slate-400 mb-1">
                WhatsApp Number (Digits only)
              </label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-slate-400 mb-1">
                Inquiries Email
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Social Channels */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
            Social Profile Channels
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase text-slate-400 mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={socialLinkedin}
                onChange={(e) => setSocialLinkedin(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-slate-400 mb-1">
                TikTok URL
              </label>
              <input
                type="url"
                value={socialTiktok}
                onChange={(e) => setSocialTiktok(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-slate-400 mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={socialInstagram}
                onChange={(e) => setSocialInstagram(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-slate-400 mb-1">
                Facebook URL
              </label>
              <input
                type="url"
                value={socialFacebook}
                onChange={(e) => setSocialFacebook(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Footer & SEO */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
            Footer Narrative & SEO Defaults
          </h3>
          <div>
            <label className="block font-semibold uppercase text-slate-400 mb-1">
              Footer Content
            </label>
            <textarea
              rows={2}
              required
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-slate-400 mb-1">
              SEO Default Title
            </label>
            <input
              type="text"
              required
              value={seoDefaultTitle}
              onChange={(e) => setSeoDefaultTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <div>
            <label className="block font-semibold uppercase text-slate-400 mb-1">
              SEO Default Description
            </label>
            <textarea
              rows={2}
              required
              value={seoDefaultDescription}
              onChange={(e) => setSeoDefaultDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-[#d4af37] text-[#080e1e] font-bold text-xs hover:bg-[#e6c86e] transition-colors flex items-center gap-1.5"
          >
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Save Global Site Settings</span>
          </button>
        </div>
      </form>

      {/* Security & Password Change */}
      <div className="mt-12 bg-[#0c1222] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Administrator Security & Password</h2>
            <p className="text-xs text-slate-400">
              Update your master administrator password at any time. Minimum 8 characters.
            </p>
          </div>
        </div>

        {passwordStatus && (
          <div
            className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs ${
              passwordStatus.success
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/20 text-rose-400"
            }`}
          >
            {passwordStatus.success ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{passwordStatus.message}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37] text-sm"
            />
          </div>

          <div className="md:col-span-2 flex justify-end pt-2">
            <button
              type="submit"
              disabled={passwordUpdating || !newPassword}
              className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-[#d4af37] hover:text-[#080e1e] text-white font-bold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {passwordUpdating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
