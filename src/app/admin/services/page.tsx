import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";
import { ServicesClient } from "./ServicesClient";
import { LqdService } from "@/lib/types/database";


export default async function AdminServicesPage() {
  const { user, isStaff, isAdmin } = await getCurrentUserRole();

  if (!user || !isStaff) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const { data: services } = await supabase
    .from("lqd_services")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Services Management
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Create, edit, and organize core agency offerings, scope deliverables, and add-on modules.
        </p>
      </div>

      <ServicesClient initialServices={(services as LqdService[]) || []} isAdmin={isAdmin} />
    </div>
  );
}
