"use client";

import { useState } from "react";
import { loginAction } from "@/app/actions/auth-actions";
import { Lock, Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const res = await loginAction(formData);
      if (!res.success) {
        setError(res.message);
      } else {
        window.location.href = "/admin";
      }
    } catch {
      setError("An unexpected authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060b17] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0e1833] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2 mb-8">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/20 bg-[#0e1833] mx-auto mb-3 shadow-lg">
            <Image src="/images/logo.webp" alt="LQD Creatives logo" fill sizes="56px" className="object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">CMS Administration</h1>
          <p className="text-xs text-slate-400">
            Sign in to manage LQD Creatives content and customer enquiries.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-950/60 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="lqdcreatives@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#080e1e] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#080e1e] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#d4af37] text-[#080e1e] font-bold text-sm hover:bg-[#e6c86e] transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-300 transition-colors">
            ← Return to Live Site
          </Link>
          <Link href="/admin/setup" className="text-[#d4af37] hover:underline">
            First-time setup
          </Link>
        </div>
      </div>
    </div>
  );
}
