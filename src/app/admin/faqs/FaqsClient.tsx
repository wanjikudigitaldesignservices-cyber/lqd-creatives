"use client";

import { useState } from "react";
import { LqdFaq, FaqCategory } from "@/lib/types/database";
import { upsertFaqAction, deleteFaqAction } from "@/app/actions/cms-actions";
import { Plus, Edit2, Trash2, X, Loader2, HelpCircle } from "lucide-react";

interface FaqsClientProps {
  initialFaqs: LqdFaq[];
  isAdmin: boolean;
}

export function FaqsClient({ initialFaqs, isAdmin }: FaqsClientProps) {
  const [faqs, setFaqs] = useState<LqdFaq[]>(initialFaqs);
  const [editingFaq, setEditingFaq] = useState<LqdFaq | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState<FaqCategory>("general");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [published, setPublished] = useState(true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditingFaq(null);
    setQuestion("");
    setAnswer("");
    setCategory("general");
    setDisplayOrder(faqs.length + 1);
    setPublished(true);
    setIsModalOpen(true);
    setError(null);
  };

  const handleOpenEdit = (faq: LqdFaq) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category);
    setDisplayOrder(faq.display_order);
    setPublished(faq.published);
    setIsModalOpen(true);
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      question,
      answer,
      category,
      display_order: Number(displayOrder),
      published,
    };

    const res = await upsertFaqAction(payload, editingFaq?.id);
    setSaving(false);

    if (res.success) {
      setIsModalOpen(false);
      window.location.reload();
    } else {
      setError(res.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    const res = await deleteFaqAction(id);
    if (res.success) {
      setFaqs((prev) => prev.filter((f) => f.id !== id));
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Frequently Asked Questions ({faqs.length})
        </h2>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#080e1e] font-bold text-xs hover:bg-[#e6c86e] transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="p-6 rounded-2xl bg-[#0e1833] border border-white/10 flex items-start justify-between gap-4"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#142247] text-[#d4af37]">
                  {faq.category}
                </span>
                <span className="text-[11px] text-slate-500">Order: {faq.display_order}</span>
              </div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{faq.question}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pl-6">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(faq)}
                className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3 text-[#d4af37]" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="p-1.5 rounded bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/40"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#0a1226] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingFaq ? "Edit FAQ" : "Add FAQ"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/30 text-red-200 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">
                  Answer
                </label>
                <textarea
                  rows={4}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as FaqCategory)}
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none"
                  >
                    <option value="general">General</option>
                    <option value="pricing">Pricing</option>
                    <option value="process">Process</option>
                    <option value="technical">Technical</option>
                    <option value="ownership">Ownership</option>
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
                  <span>Save FAQ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
