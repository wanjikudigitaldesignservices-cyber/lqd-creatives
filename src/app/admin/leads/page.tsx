import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";
import { LeadInboxClient } from "./LeadInboxClient";
import { LqdLead } from "@/lib/types/database";


export default async function AdminLeadsPage() {
  const { user, isStaff, isAdmin } = await getCurrentUserRole();

  if (!user || !isStaff) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("lqd_leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Leads & Enquiries CRM
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review, qualify, follow up, and manage prospective website client inquiries.
        </p>
      </div>

      <LeadInboxClient initialLeads={(leads as LqdLead[]) || []} isAdmin={isAdmin} />
    </div>
  );
}
