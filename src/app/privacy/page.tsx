export const metadata = {
  title: "Privacy Policy",
  description: "LQD Creatives privacy policy under the Kenya Data Protection Act 2019.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-20 bg-[#080e1e]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
        {/* Legal Disclaimer Alert */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
          <strong>Notice:</strong> This document represents a sensible operational privacy policy starter compliant with Kenyan digital norms and the Kenya Data Protection Act 2019. It is marked for formal client legal review prior to enterprise contracts.
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last updated: January 2026 • Nairobi, Kenya
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Introduction</h2>
          <p>
            LQD Creatives (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the website located at https://lqd-creatives.vercel.app and related communications. We respect the privacy of our visitors and clients and comply with the Kenya Data Protection Act (2019).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
          <p>
            When you submit an enquiry through our contact forms or message us via WhatsApp, we collect:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300 pl-2">
            <li>Your name and business/company title</li>
            <li>Your email address and phone or WhatsApp number</li>
            <li>Project specifications, desired timelines, and estimated budget ranges</li>
            <li>Technical metadata (masked IP hash, referral headers, and timestamp) for anti-spam and security purposes</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. How We Use Your Information</h2>
          <p>
            The collected data is used exclusively to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300 pl-2">
            <li>Respond to your project inquiry with relevant proposals and estimates</li>
            <li>Coordinate project delivery and milestone review</li>
            <li>Prevent automated bot spam and ensure the operational integrity of our forms</li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal information to third-party advertisers or data brokers under any circumstances.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Data Storage & Security</h2>
          <p>
            All lead submissions are encrypted in transit via SSL/TLS and stored securely in our PostgreSQL database hosted on Supabase with strict Row Level Security (RLS) policies. Only authorized administrators and project leads have authenticated access.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Your Rights as a Data Subject</h2>
          <p>
            Under the Kenya Data Protection Act (2019), you have the right to request access to, correction of, or complete deletion of your contact records from our database. To exercise this right, please email us at <a href="mailto:lqdcreatives@gmail.com" className="text-[#d4af37] underline">lqdcreatives@gmail.com</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">6. Contact Information</h2>
          <p>
            For privacy-related inquiries:
            <br />
            <strong>LQD Creatives</strong>
            <br />
            Nairobi, Kenya
            <br />
            Email: <a href="mailto:lqdcreatives@gmail.com" className="text-[#d4af37] underline">lqdcreatives@gmail.com</a>
            <br />
            Phone / WhatsApp: +254 740 396 075
          </p>
        </section>
      </div>
    </div>
  );
}
