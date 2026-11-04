import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/app/actions/auth-actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Inbox, Layers, FolderKanban, FileText, ArrowRight, Clock, PlusCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { LqdLead } from "@/lib/types/database";


export default async function AdminDashboardPage() {
  const { user, isStaff, isAdmin } = await getCurrentUserRole();

  if (!user || !isStaff) {
    redirect("/admin/login");
  }

  const supabase = await createClient();

  // Fetch KPI counts and recent leads
  const [leadsRes, servicesRes, projectsRes, postsRes] = await Promise.all([
    supabase.from("lqd_leads").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("lqd_services").select("id", { count: "exact", head: true }),
    supabase.from("lqd_projects").select("id", { count: "exact", head: true }),
    supabase.from("lqd_posts").select("id", { count: "exact", head: true }),
  ]);

  const recentLeads: LqdLead[] = leadsRes.data || [];
  const servicesCount = servicesRes.count || 0;
  const projectsCount = projectsRes.count || 0;
  const postsCount = postsRes.count || 0;

  // Count new leads
  const newLeadsCount = recentLeads.filter((l) => l.status === "New").length;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time pipeline monitoring and dynamic content controls for LQD Creatives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#080e1e] font-bold text-xs hover:bg-[#e6c86e] transition-colors flex items-center gap-1.5"
          >
            <Inbox className="w-4 h-4" />
            <span>Open Leads Inbox</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-[#0e1833] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Recent Leads</span>
            <Inbox className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="text-3xl font-extrabold text-white">{recentLeads.length}</div>
          <p className="text-[11px] text-slate-400">
            {newLeadsCount} requiring initial review
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0e1833] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Active Services</span>
            <Layers className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="text-3xl font-extrabold text-white">{servicesCount}</div>
          <p className="text-[11px] text-slate-400">Flagship & supporting modules</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0e1833] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Portfolio Items</span>
            <FolderKanban className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="text-3xl font-extrabold text-white">{projectsCount}</div>
          <p className="text-[11px] text-slate-400">Client deployments & concepts</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0e1833] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Published Posts</span>
            <FileText className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="text-3xl font-extrabold text-white">{postsCount}</div>
          <p className="text-[11px] text-slate-400">SME educational insights</p>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="p-6 rounded-2xl bg-[#0e1833] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-base font-bold text-white">Recent Website Enquiries</h2>
            <p className="text-xs text-slate-400">Latest prospect submissions from the public website.</p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs text-[#d4af37] font-semibold hover:underline flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No leads received yet. Test by submitting an enquiry on the contact form!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 uppercase tracking-wider border-b border-white/5">
                <tr>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Name / Business</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-3">Service</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="py-3 px-3 font-semibold text-white">
                      {lead.name}
                      {lead.business_name && (
                        <span className="block text-[11px] font-normal text-slate-400">
                          {lead.business_name}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {lead.phone || lead.email || "N/A"}
                    </td>
                    <td className="py-3 px-3 text-slate-300 max-w-[200px] truncate">
                      {lead.service_required}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          lead.status === "New"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : lead.status === "Contacted"
                            ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                            : lead.status === "Won"
                            ? "bg-green-500/15 text-green-400 border border-green-500/30"
                            : "bg-slate-500/15 text-slate-400 border border-slate-500/30"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href="/admin/leads"
                        className="text-xs font-semibold text-[#d4af37] hover:underline"
                      >
                        Manage →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/services"
          className="p-6 rounded-xl bg-[#0a1226] border border-white/10 hover:border-[#d4af37]/40 transition-all flex items-center justify-between"
        >
          <div>
            <h4 className="font-bold text-white text-sm">Services Management</h4>
            <p className="text-xs text-slate-400 mt-0.5">Edit service scopes, pricing & add-ons</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#d4af37]" />
        </Link>

        <Link
          href="/admin/projects"
          className="p-6 rounded-xl bg-[#0a1226] border border-white/10 hover:border-[#d4af37]/40 transition-all flex items-center justify-between"
        >
          <div>
            <h4 className="font-bold text-white text-sm">Portfolio Management</h4>
            <p className="text-xs text-slate-400 mt-0.5">Curate project case studies & prototypes</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#d4af37]" />
        </Link>

        <Link
          href="/admin/settings"
          className="p-6 rounded-xl bg-[#0a1226] border border-white/10 hover:border-[#d4af37]/40 transition-all flex items-center justify-between"
        >
          <div>
            <h4 className="font-bold text-white text-sm">Global Site Settings</h4>
            <p className="text-xs text-slate-400 mt-0.5">Update phone, WhatsApp, email & socials</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#d4af37]" />
        </Link>
      </div>
    </div>
  );
}
