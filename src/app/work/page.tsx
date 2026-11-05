import Link from "next/link";
import { publicSupabase } from "@/lib/supabase/public";
import { LqdProject } from "@/lib/types/database";
import { ArrowRight, ExternalLink, Layers } from "lucide-react";

export const metadata = {
  title: "Selected Work & Concepts",
  description: "Curated web applications, SME websites, and digital prototypes engineered by LQD Creatives.",
};

export const revalidate = 3600;

export default async function WorkPage() {
  const { data: projects } = await publicSupabase
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
              className="rounded-2xl bg-[#0e1833] border border-white/10 overflow-hidden flex flex-col justify-between card-hover-effect group shadow-xl"
            >
              <div>
                {/* Real Homepage Screenshot Preview */}
                {proj.gallery && proj.gallery.length > 0 && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 border-b border-white/10">
                    <img
                      src={proj.gallery[0]}
                      alt={`${proj.title} homepage preview`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1833] via-transparent to-transparent opacity-50" />
                    {proj.live_url && (
                      <a
                        href={proj.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View live website for ${proj.title} (opens in new tab)`}
                        className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-[#080e1e]/85 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-[#080e1e] transition-all flex items-center gap-1.5 shadow-lg"
                      >
                        <span>Live Site</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}

                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {proj.project_type === "concept" ? "Concept Prototype" : "Client Project"}
                    </span>
                    <span className="text-[11px] text-slate-400 uppercase font-medium">
                      {proj.category.replace("_", " ")}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                    {proj.title}
                  </h2>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {proj.summary}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Solution:
                    </span>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {proj.solution}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#080e1e] border border-white/5 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-white/5 mt-2 flex items-center justify-between">
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
                    aria-label={`Launch ${proj.title} website in new tab`}
                    className="text-xs text-slate-300 hover:text-white flex items-center gap-1 px-3 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
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
