import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";
import { ProjectsClient } from "./ProjectsClient";
import { LqdProject } from "@/lib/types/database";


export default async function AdminProjectsPage() {
  const { user, isStaff, isAdmin } = await getCurrentUserRole();

  if (!user || !isStaff) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("lqd_projects")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Portfolio & Prototypes
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage demonstrated architectures, client deployments, and concept project badges.
        </p>
      </div>

      <ProjectsClient initialProjects={(projects as LqdProject[]) || []} isAdmin={isAdmin} />
    </div>
  );
}
