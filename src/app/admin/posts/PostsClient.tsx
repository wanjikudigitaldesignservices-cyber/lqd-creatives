"use client";

import { useState } from "react";
import { LqdPost } from "@/lib/types/database";
import { upsertPostAction, deletePostAction } from "@/app/actions/cms-actions";
import { slugify, formatDate } from "@/lib/utils";
import { Plus, Edit2, Trash2, X, Loader2, Clock } from "lucide-react";

interface PostsClientProps {
  initialPosts: LqdPost[];
  isAdmin: boolean;
}

export function PostsClient({ initialPosts, isAdmin }: PostsClientProps) {
  const [posts, setPosts] = useState<LqdPost[]>(initialPosts);
  const [editingPost, setEditingPost] = useState<LqdPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [readingTime, setReadingTime] = useState(4);
  const [authorName, setAuthorName] = useState("Reuben Wanjiku Kimani");
  const [published, setPublished] = useState(true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditingPost(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setReadingTime(4);
    setAuthorName("Reuben Wanjiku Kimani");
    setPublished(true);
    setIsModalOpen(true);
    setError(null);
  };

  const handleOpenEdit = (post: LqdPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setReadingTime(post.reading_time_minutes);
    setAuthorName(post.author_name);
    setPublished(post.published);
    setIsModalOpen(true);
    setError(null);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPost) {
      setSlug(slugify(val));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title,
      slug,
      excerpt,
      content,
      reading_time_minutes: Number(readingTime),
      author_name: authorName,
      published,
    };

    const res = await upsertPostAction(payload, editingPost?.id);
    setSaving(false);

    if (res.success) {
      setIsModalOpen(false);
      window.location.reload();
    } else {
      setError(res.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this insight article?")) return;
    const res = await deletePostAction(id);
    if (res.success) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Articles & Insights ({posts.length})
        </h2>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#080e1e] font-bold text-xs hover:bg-[#e6c86e] transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[#0e1833] border border-white/10">
        <div className="divide-y divide-white/5">
          {posts.map((post) => (
            <div key={post.id} className="py-4 flex items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase ${
                      post.published ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-500/20 text-slate-400"
                    }`}
                  >
                    {post.published ? "Live" : "Draft"}
                  </span>
                  <span>{formatDate(post.published_at)}</span>
                  <span>•</span>
                  <span>{post.reading_time_minutes} min</span>
                </div>
                <h3 className="text-base font-bold text-white">{post.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-1">{post.excerpt}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEdit(post)}
                  className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3 text-[#d4af37]" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-1.5 rounded bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/40"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[90vh] bg-[#0a1226] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingPost ? "Edit Article" : "Write Article"}
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
                    Article Title
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

              <div>
                <label className="block font-semibold uppercase text-slate-400 mb-1">
                  Excerpt (Meta Summary)
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
                  Article Content (Supports markdown headers ##, lists, paragraphs)
                </label>
                <textarea
                  rows={10}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#080e1e] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">
                    Reading Time (Mins)
                  </label>
                  <input
                    type="number"
                    value={readingTime}
                    onChange={(e) => setReadingTime(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-400 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#080e1e] border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="rounded border-white/20"
                    />
                    <span>Publish Immediately</span>
                  </label>
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
                  <span>Save Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
