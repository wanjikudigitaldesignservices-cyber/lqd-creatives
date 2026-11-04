import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";
import { FaqsClient } from "./FaqsClient";
import { LqdFaq } from "@/lib/types/database";


export default async function AdminFaqsPage() {
  const { user, isStaff, isAdmin } = await getCurrentUserRole();

  if (!user || !isStaff) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const { data: faqs } = await supabase
    .from("lqd_faqs")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          FAQ Knowledge Manager
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage clear answers addressing cost drivers, timelines, ownership, and M-Pesa integrations.
        </p>
      </div>

      <FaqsClient initialFaqs={(faqs as LqdFaq[]) || []} isAdmin={isAdmin} />
    </div>
  );
}
