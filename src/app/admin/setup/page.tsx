"use client";

import { useState } from "react";
import { setupFirstAdminAction } from "@/app/actions/auth-actions";
import { ShieldCheck, Mail, Lock, User, Key, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AdminSetupPage() {
  const [email, setEmail] = useState("lqdcreatives@gmail.com");
  const [fullName, setFullName] = useState("Reuben Wanjiku Kimani");
  const [password, setPassword] = useState("");
  const [setupSecret, setSetupSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("full_name", fullName);
      formData.append("password", password);
      formData.append("setup_secret", setupSecret);

      const res = await setupFirstAdminAction(formData);
      if (!res.success) {
        setError(res.message);
      } else {
        setSuccess(res.message);
      }
    } catch {
      setError("An unexpected setup error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060b17] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0e1833] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#132042] border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center mx-auto mb-3 font-bold text-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">First-Time Admin Setup</h1>
          <p className="text-xs text-slate-400">
            Initialize the primary owner account. Requires the secure server setup token.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-950/60 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-6 bg-[#132448] border border-[#d4af37]/40 rounded-xl text-center space-y-4">
            <CheckCircle2 className="w-10 h-10 text-[#25d366] mx-auto" />
            <p className="text-sm text-slate-200">{success}</p>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#d4af37] text-[#080e1e] font-bold text-xs"
            >
              <span>Go to Admin Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#080e1e] border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

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
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#080e1e] border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Password (min. 8 characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose a strong password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#080e1e] border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Setup Token (ADMIN_SETUP_SECRET)
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={setupSecret}
                  onChange={(e) => setSetupSecret(e.target.value)}
                  placeholder="Enter setup secret from .env"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#080e1e] border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Configured in server environment variables.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#d4af37] text-[#080e1e] font-bold text-sm hover:bg-[#e6c86e] transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Configuring Account...</span>
                </>
              ) : (
                <>
                  <span>Create Primary Administrator</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
          <Link href="/admin/login" className="hover:text-slate-300">
            ← Return to Login
          </Link>
          <span className="text-[11px] text-slate-600">Zero Public Self-Signup</span>
        </div>
      </div>
    </div>
  );
}
