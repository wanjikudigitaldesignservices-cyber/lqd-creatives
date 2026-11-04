import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";
import { PostsClient } from "./PostsClient";
import { LqdPost } from "@/lib/types/database";


export default async function AdminPostsPage() {
  const { user, isStaff, isAdmin } = await getCurrentUserRole();

  if (!user || !isStaff) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("lqd_posts")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Articles & Insights Manager
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Publish and edit strategic articles and guides for Kenyan business owners.
        </p>
      </div>

      <PostsClient initialPosts={(posts as LqdPost[]) || []} isAdmin={isAdmin} />
    </div>
  );
}
