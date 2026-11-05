export const metadata = {
  title: "Terms of Engagement",
  description: "Terms and conditions for web design and development services by LQD Creatives.",
};

export default function TermsPage() {
  return (
    <div className="py-20 bg-[#080e1e]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
        {/* Legal Review Notice */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
          <strong>Notice:</strong> This is sensible, editable starter content outlining standard commercial terms for software and website development in Kenya. It is marked for formal legal review prior to execution of binding corporate contracts.
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Engagement
        </h1>
        <p className="text-xs text-slate-400">
          Last updated: January 2026 • Nairobi, Kenya
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Scope of Work & Proposals</h2>
          <p>
            All website design, development, and branding projects are governed by an itemized written scope proposal. Any additional features, integrations, or pages requested after proposal approval are quoted separately as change orders.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Payment Milestones</h2>
          <p>
            Standard projects are executed against agreed milestone payments (typically a 50% mobilization deposit upon project kickoff, and 50% upon final testing, review, and pre-launch approval). Invoices may be settled via direct Kenyan Bank Transfer or verified Business M-Pesa.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Intellectual Property & Ownership</h2>
          <p>
            Upon full settlement of all agreed invoice milestones, 100% of the custom source code, bespoke design assets, and content developed for the client belong exclusively to the client. LQD Creatives retains the right to display non-confidential screenshots of the completed project in our professional portfolio.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Client Responsibilities & Revisions</h2>
          <p>
            Clients are responsible for providing brand text, product specifications, images, and necessary credentials (e.g. domain access, M-Pesa Daraja keys) in a timely manner. Standard projects include up to two rounds of structured design revisions within the agreed scope.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Warranty & Post-Launch Support</h2>
          <p>
            Every website includes a 30-day post-launch warranty period during which any technical defects or software bugs discovered in the approved scope are resolved at no additional charge. Ongoing maintenance retainers are available upon request.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">6. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes shall be subject to amicable commercial arbitration in Nairobi, Kenya.
          </p>
        </section>
      </div>
    </div>
  );
}
