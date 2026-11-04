import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LqdProject } from "@/lib/types/database";
import { ArrowRight, ExternalLink, Layers } from "lucide-react";

export const metadata = {
  title: "Selected Work & Concepts",
  description: "Curated web applications, SME websites, and digital prototypes engineered by LQD Creatives.",
};

export const revalidate = 60;

export default async function WorkPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("lqd_projects")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });

  const projectList: LqdProject[] = projects || [];

  return (
    <div className="py-20 bg-[#080e1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
            Portfolio & Systems
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Selected Work & Prototypes
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We hold ourselves to strict standards of professional honesty: every project shown below is transparently labelled as either a client deployment or an architectural concept prototype. No invented testimonials or exaggerated metrics.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl bg-[#0e1833] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#d4af37]/40 transition-all group"
            >
              <div className="p-8 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {proj.project_type === "concept" ? "Concept Prototype" : "Client Project"}
                  </span>
                  <span className="text-xs text-slate-500 uppercase font-medium">
                    {proj.category.replace("_", " ")}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white group-hover:text-[#d4af37] transition-colors">
                  {proj.title}
                </h2>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {proj.summary}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    The Challenge:
                  </span>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {proj.challenge}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                    The Solution:
                  </span>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {proj.solution}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-[#080e1e] border border-white/5 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <Link
                  href={`/work/${proj.slug}`}
                  className="text-xs font-semibold text-[#d4af37] hover:underline flex items-center gap-1.5"
                >
                  <span>Case Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {proj.live_url && (
                  <a
                    href={proj.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0e1833] to-[#122045] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Have a bespoke web project in mind?
            </h3>
            <p className="text-sm text-slate-300">
              We design and code purpose-built web experiences for Kenyan SMEs and ambitious enterprises.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-[#d4af37] text-[#080e1e] font-bold text-sm hover:bg-[#e6c86e] transition-colors whitespace-nowrap"
          >
            Discuss Your Website
          </Link>
        </div>
      </div>
    </div>
  );
}
