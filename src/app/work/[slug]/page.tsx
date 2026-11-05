import { publicSupabase } from "@/lib/supabase/public";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle, ArrowRight, Layers } from "lucide-react";
import { LqdProject } from "@/lib/types/database";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { data: projects } = await publicSupabase
    .from("lqd_projects")
    .select("slug")
    .eq("published", true);

  return (projects || []).map((project) => ({
    slug: project.slug,
  }));
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { data: project } = await publicSupabase
    .from("lqd_projects")
    .select("title, summary")
    .eq("slug", slug)
    .single();

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | LQD Creatives Portfolio`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const { data: project } = await publicSupabase
    .from("lqd_projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project) {
    notFound();
  }

  const currentProject: LqdProject = project;

  return (
    <div className="py-16 sm:py-24 bg-[#080e1e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#d4af37] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Work</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
              {currentProject.project_type === "concept" ? "Concept Prototype" : "Verified Client Deployment"}
            </span>
            <span className="text-xs text-slate-400 uppercase font-semibold">
              {currentProject.category.replace("_", " ")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {currentProject.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed font-normal">
            {currentProject.summary}
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            {currentProject.technologies.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md bg-[#0e1833] border border-white/10 text-xs text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Challenge vs Solution Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-[#0e1833] border border-white/10 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">
              The Business Problem
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentProject.challenge}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0e1833] border border-[#d4af37]/40 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Engineered Solution
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentProject.solution}
            </p>
          </div>
        </div>

        {/* Architectural Features */}
        {currentProject.features && currentProject.features.length > 0 && (
          <div className="p-8 rounded-2xl bg-[#0e1833] border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white">Key Platform Features</h3>
            <div className="space-y-3">
              {currentProject.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Demo Link and Action */}
        <div className="p-8 rounded-2xl bg-[#101b38] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white">Looking for a similar digital platform?</h4>
            <p className="text-xs text-slate-400">We customize every build to your operational workflow.</p>
          </div>
          <div className="flex items-center gap-3">
            {currentProject.live_url && (
              <a
                href={currentProject.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg border border-white/20 text-slate-200 text-xs font-semibold hover:bg-white/5 flex items-center gap-1.5"
              >
                <span>Live Prototype</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-lg bg-[#d4af37] text-[#080e1e] font-bold text-xs hover:bg-[#e6c86e] transition-colors"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
