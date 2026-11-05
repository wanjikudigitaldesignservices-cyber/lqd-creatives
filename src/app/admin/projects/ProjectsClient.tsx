"use client";

import { useState } from "react";
import { LqdProject, ProjectCategory, ProjectType } from "@/lib/types/database";
import { upsertProjectAction, deleteProjectAction } from "@/app/actions/cms-actions";
import { slugify } from "@/lib/utils";
import { Plus, Edit2, Trash2, X, Loader2, ExternalLink } from "lucide-react";

interface ProjectsClientProps {
  initialProjects: LqdProject[];
  isAdmin: boolean;
}

export function ProjectsClient({ initialProjects, isAdmin }: ProjectsClientProps) {
  const [projects, setProjects] = useState<LqdProject[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<LqdProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("web_platform");
  const [projectType, setProjectType] = useState<ProjectType>("concept");
  const [clientName, setClientName] = useState("");
  const [summary, setSummary] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solution, setSolution] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [techText, setTechText] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setTitle("");
    setSlug("");
    setCategory("web_platform");
    setProjectType("concept");
    setClientName("Concept Prototype");
    setSummary("");
    setChallenge("");
    setSolution("");
    setFeaturesText("");
    setTechText("Next.js, TypeScript, Tailwind CSS, Supabase");
    setLiveUrl("");
    setPublished(true);
    setDisplayOrder(projects.length + 1);
    setIsModalOpen(true);
    setError(null);
  };

  const handleOpenEdit = (project: LqdProject) => {
    setEditingProject(project);
    setTitle(project.title);
    setSlug(project.slug);
    setCategory(project.category);
    setProjectType(project.project_type);
    setClientName(project.client_name || "");
    setSummary(project.summary);
    setChallenge(project.challenge);
    setSolution(project.solution);
    setFeaturesText((project.features || []).join("\n"));
    setTechText((project.technologies || []).join(", "));
    setLiveUrl(project.live_url || "");
    setPublished(project.published);
    setDisplayOrder(project.display_order);
    setIsModalOpen(true);
    setError(null);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingProject) {
      setSlug(slugify(val));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const features = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const technologies = techText
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      title,
      slug,
      category,
      project_type: projectType,
      client_name: clientName || null,
      summary,
      challenge,
      solution,
      features,
      technologies,
      live_url: liveUrl || null,
      published,
      display_order: Number(displayOrder),
    };

    const res = await upsertProjectAction(payload, editingProject?.id);
    setSaving(false);

    if (res.success) {
      setIsModalOpen(false);
      window.location.reload();
    } else {
      setError(res.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio project?")) return;
    const res = await deleteProjectAction(id);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Projects & Prototypes ({projects.length})
        </h2>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#080e1e] font-bold text-xs hover:bg-[#e6c86e] transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-2xl bg-[#0e1833] border border-white/10 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {proj.project_type === "concept" ? "Concept Prototype" : "Client Work"}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    proj.published ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-500/20 text-slate-400"
                  }`}
                >
                  {proj.published ? "Published" : "Draft"}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">{proj.title}</h3>
              <p className="text-xs text-slate-300 line-clamp-2">{proj.summary}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Order: {proj.display_order}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3 text-[#d4af37]" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-1.5 rounded bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/40"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] bg-[#0a1226] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingProject ? "Edit Project" : "Create New Project"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/30 text-red-200 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none"
                  >
                    <option value="web_platform">Web Platform</option>
                    <option value="sme_website">SME Website</option>
                    <option value="branding">Branding</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as ProjectType)}
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none"
                  >
                    <option value="concept">Concept Prototype (Honest Badge)</option>
                    <option value="client">Verified Client Project</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">
                    Client / Badge Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Concept Prototype"
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">
                  Summary
                </label>
                <textarea
                  rows={2}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">
                    The Challenge / Problem
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">
                    The Engineered Solution
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">
                  Key Features (One per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Interactive freight pricing calculator&#10;WhatsApp dispatch integration"
                  className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">
                    Technologies (Comma separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={techText}
                    onChange={(e) => setTechText(e.target.value)}
                    placeholder="Next.js, TypeScript, Tailwind CSS"
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-white">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="rounded border-white/20"
                  />
                  <span>Published on Live Site</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Order:</span>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-16 px-2 py-1 rounded bg-[#080e1e] border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-lg bg-[#d4af37] text-[#080e1e] font-bold hover:bg-[#e6c86e] flex items-center gap-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
