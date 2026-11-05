import Link from "next/link";
import { publicSupabase } from "@/lib/supabase/public";
import { LqdPost } from "@/lib/types/database";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowRight, User } from "lucide-react";

export const metadata = {
  title: "Insights & Strategy for Kenyan SMEs",
  description: "Practical guides on web design costs, mobile optimization, conversion strategy, and digital growth for Kenyan businesses.",
};

export const revalidate = 3600;

export default async function InsightsPage() {
  const { data: posts } = await publicSupabase
    .from("lqd_posts")
    .select("*, category:lqd_categories(name)")
    .eq("published", true)
    .order("published_at", { ascending: false });

  const postList: LqdPost[] = posts || [];

  return (
    <div className="py-20 bg-[#080e1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
            Insights & SME Knowledge
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Digital Strategy for Kenyan Businesses
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Practical, evidence-based articles explaining website pricing, conversion pitfalls, and mobile optimization in the East African market.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {postList.map((post) => (
            <article
              key={post.id}
              className="p-8 rounded-3xl bg-[#0e1833] border border-white/10 hover:border-[#d4af37]/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="px-2.5 py-1 rounded bg-[#142247] text-[#d4af37] font-semibold text-[10px] uppercase tracking-wider">
                    {post.category?.name || "Business Strategy"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.reading_time_minutes} min read
                  </span>
                  <span>•</span>
                  <span>{formatDate(post.published_at)}</span>
                </div>

                <h2 className="text-2xl font-bold text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                  <Link href={`/insights/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <User className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{post.author_name}</span>
                </div>

                <Link
                  href={`/insights/${post.slug}`}
                  className="text-xs font-bold text-[#d4af37] group-hover:underline flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
