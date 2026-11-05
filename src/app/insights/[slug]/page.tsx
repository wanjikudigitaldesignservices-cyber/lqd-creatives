import { publicSupabase } from "@/lib/supabase/public";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, ArrowRight, Share2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { LqdPost } from "@/lib/types/database";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { data: posts } = await publicSupabase
    .from("lqd_posts")
    .select("slug")
    .eq("published", true);

  return (posts || []).map((post) => ({
    slug: post.slug,
  }));
}

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const { data: post } = await publicSupabase
    .from("lqd_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .single();

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | LQD Creatives Insights`,
    description: post.excerpt,
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params;

  const { data: post } = await publicSupabase
    .from("lqd_posts")
    .select("*, category:lqd_categories(name)")
    .eq("slug", slug)
    .single();

  if (!post) {
    notFound();
  }

  const currentPost: LqdPost = post;

  return (
    <article className="py-16 sm:py-24 bg-[#080e1e]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Insights</span>
          </Link>
        </div>

        {/* Post Header */}
        <header className="space-y-6 border-b border-white/10 pb-10">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded bg-[#142247] text-[#d4af37] font-semibold text-[10px] uppercase tracking-wider">
              {currentPost.category?.name || "Business Strategy"}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {currentPost.reading_time_minutes} min read
            </span>
            <span>•</span>
            <time dateTime={currentPost.published_at}>{formatDate(currentPost.published_at)}</time>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {currentPost.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed font-normal">
            {currentPost.excerpt}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-full bg-[#142247] border border-[#d4af37]/40 flex items-center justify-center font-bold text-[#d4af37]">
                RK
              </div>
              <div>
                <span className="font-semibold text-white block">{currentPost.author_name}</span>
                <span className="text-[11px] text-slate-400">Lead Full-Stack Engineer, LQD Creatives</span>
              </div>
            </div>
          </div>
        </header>

        {/* Post Content Body */}
        <div className="text-slate-200 text-base leading-relaxed space-y-6 prose-invert font-normal">
          {currentPost.content.split("\n\n").map((para, idx) => {
            if (para.startsWith("## ")) {
              return (
                <h2 key={idx} className="text-2xl font-bold text-white pt-6 pb-2 border-b border-white/5">
                  {para.replace("## ", "")}
                </h2>
              );
            }
            if (para.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-xl font-bold text-[#d4af37] pt-4 pb-1">
                  {para.replace("### ", "")}
                </h3>
              );
            }
            if (para.startsWith("* ") || para.startsWith("- ")) {
              const items = para.split("\n").map((l) => l.replace(/^[*|-]\s*/, ""));
              return (
                <ul key={idx} className="space-y-2 pl-4 list-disc list-inside text-sm text-slate-300">
                  {items.map((it, itIdx) => (
                    <li key={itIdx}>{it}</li>
                  ))}
                </ul>
              );
            }
            if (para.startsWith("1. ")) {
              const items = para.split("\n").map((l) => l.replace(/^\d+\.\s*/, ""));
              return (
                <ol key={idx} className="space-y-2 pl-4 list-decimal list-inside text-sm text-slate-300">
                  {items.map((it, itIdx) => (
                    <li key={itIdx}>{it}</li>
                  ))}
                </ol>
              );
            }
            if (para === "---") {
              return <hr key={idx} className="border-white/10 my-8" />;
            }
            return (
              <p key={idx} className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {para}
              </p>
            );
          })}
        </div>

        {/* Contextual Consultation CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0e1833] via-[#101c3d] to-[#080e1e] border border-[#d4af37]/40 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
            Take Action
          </span>
          <h3 className="text-2xl font-bold text-white">
            Need a professional website engineered for your Kenyan business?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
            We build mobile-first websites that clarify your value proposition, load in under a second on local networks, and make it easy for clients to enquire via WhatsApp.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#d4af37] text-[#080e1e] font-bold text-sm hover:bg-[#e6c86e] transition-colors flex items-center justify-center gap-2"
            >
              <span>Discuss Your Website</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/254740396075?text=Hi%20Reuben,%20I%20read%20your%20article%20and%20would%20like%20to%20discuss%20a%20website%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#080e1e] border border-white/20 text-slate-200 text-xs font-semibold hover:border-[#25d366] hover:text-[#25d366] transition-colors text-center"
            >
              Direct WhatsApp (+254 740 396 075)
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
