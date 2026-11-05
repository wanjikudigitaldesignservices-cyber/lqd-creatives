"use client";

import { useState } from "react";
import { LqdService, ServiceCategory } from "@/lib/types/database";
import { upsertServiceAction, deleteServiceAction } from "@/app/actions/cms-actions";
import { slugify } from "@/lib/utils";
import { Plus, Edit2, Trash2, Check, X, Loader2, Star } from "lucide-react";

interface ServicesClientProps {
  initialServices: LqdService[];
  isAdmin: boolean;
}

export function ServicesClient({ initialServices, isAdmin }: ServicesClientProps) {
  const [services, setServices] = useState<LqdService[]>(initialServices);
  const [editingService, setEditingService] = useState<LqdService | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [isFlagship, setIsFlagship] = useState(false);
  const [category, setCategory] = useState<ServiceCategory>("web_development");
  const [scopeDescription, setScopeDescription] = useState("");
  const [idealCustomer, setIdealCustomer] = useState("");
  const [deliverablesText, setDeliverablesText] = useState("");
  const [pricingGuidance, setPricingGuidance] = useState("");
  const [published, setPublished] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditingService(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setIsFlagship(false);
    setCategory("web_development");
    setScopeDescription("");
    setIdealCustomer("");
    setDeliverablesText("");
    setPricingGuidance("");
    setPublished(true);
    setDisplayOrder(services.length + 1);
    setIsCreating(true);
    setError(null);
  };

  const handleOpenEdit = (service: LqdService) => {
    setEditingService(service);
    setTitle(service.title);
    setSlug(service.slug);
    setExcerpt(service.excerpt);
    setIsFlagship(service.is_flagship);
    setCategory(service.category);
    setScopeDescription(service.scope_description);
    setIdealCustomer(service.ideal_customer);
    setDeliverablesText((service.deliverables || []).join("\n"));
    setPricingGuidance(service.pricing_guidance);
    setPublished(service.published);
    setDisplayOrder(service.display_order);
    setIsCreating(true);
    setError(null);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingService) {
      setSlug(slugify(val));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const deliverables = deliverablesText
      .split("\n")
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    const payload = {
      title,
      slug,
      excerpt,
      is_flagship: isFlagship,
      category,
      scope_description: scopeDescription,
      ideal_customer: idealCustomer,
      deliverables,
      pricing_guidance: pricingGuidance,
      display_order: Number(displayOrder),
      published,
    };

    const res = await upsertServiceAction(payload, editingService?.id);
    setSaving(false);

    if (res.success) {
      setIsCreating(false);
      window.location.reload();
    } else {
      setError(res.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const res = await deleteServiceAction(id);
    if (res.success) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Services Catalog ({services.length})
        </h2>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#080e1e] font-bold text-xs hover:bg-[#e6c86e] transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-6 rounded-2xl bg-[#0e1833] border border-white/10 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#d4af37] uppercase font-semibold">
                  {service.category.replace("_", " ")}
                </span>
                <div className="flex items-center gap-2">
                  {service.is_flagship && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold">
                      <Star className="w-3 h-3 fill-current" /> Flagship
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      service.published ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-500/20 text-slate-400"
                    }`}
                  >
                    {service.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white">{service.title}</h3>
              <p className="text-xs text-slate-300 line-clamp-2">{service.excerpt}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Order: {service.display_order}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(service)}
                  className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3 text-[#d4af37]" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
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

      {/* Create / Edit Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] bg-[#0a1226] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingService ? "Edit Service" : "Create New Service"}
              </h3>
              <button
                onClick={() => setIsCreating(false)}
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
                    Service Title
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
                    onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none"
                  >
                    <option value="web_development">Web Development</option>
                    <option value="brand_identity">Brand Identity</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <input
                      type="checkbox"
                      checked={isFlagship}
                      onChange={(e) => setIsFlagship(e.target.checked)}
                      className="rounded border-white/20"
                    />
                    <span>Flagship</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="rounded border-white/20"
                    />
                    <span>Published</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">
                  Excerpt (Summary)
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">
                  Scope Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={scopeDescription}
                  onChange={(e) => setScopeDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">
                  Ideal Customer Profile
                </label>
                <textarea
                  rows={2}
                  required
                  value={idealCustomer}
                  onChange={(e) => setIdealCustomer(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">
                  Deliverables (One per line)
                </label>
                <textarea
                  rows={3}
                  required
                  value={deliverablesText}
                  onChange={(e) => setDeliverablesText(e.target.value)}
                  placeholder="Bespoke UI/UX design&#10;Next.js responsive frontend&#10;WhatsApp enquiry pipeline"
                  className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">
                  Pricing Guidance
                </label>
                <textarea
                  rows={2}
                  required
                  value={pricingGuidance}
                  onChange={(e) => setPricingGuidance(e.target.value)}
                  placeholder="Scoped transparently based on requirements. Typically starts from KES 45,000."
                  className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
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
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
