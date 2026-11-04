import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";
import { SettingsClient } from "./SettingsClient";
import { LqdSiteSettings } from "@/lib/types/database";


export default async function AdminSettingsPage() {
  const { user, isStaff, isAdmin } = await getCurrentUserRole();

  if (!user || !isStaff) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("lqd_site_settings")
    .select("*")
    .eq("key", "general")
    .single();

  if (!settings) {
    return <div className="p-8 text-white">Settings not initialized.</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Global Site Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Update verified business contact information, WhatsApp numbers, social profiles, and SEO defaults.
        </p>
      </div>

      <SettingsClient settings={settings as LqdSiteSettings} isAdmin={isAdmin} />
    </div>
  );
}
