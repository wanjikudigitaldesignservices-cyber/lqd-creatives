import { getCurrentUserRole, logoutAction } from "@/app/actions/auth-actions";
import Link from "next/link";
import Image from "next/image";
import { 
  Inbox, 
  Layers, 
  FolderKanban, 
  FileText, 
  HelpCircle, 
  Settings, 
  LogOut, 
  LayoutDashboard,
  ShieldAlert,
  ExternalLink
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, isAdmin, isStaff } = await getCurrentUserRole();

  // If user is not authenticated and not on login/setup pages, show fallback shell or render child
  // Note: /admin/login and /admin/setup handle their own unauthenticated forms
  if (!user || !isStaff) {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Leads Inbox", href: "/admin/leads", icon: Inbox },
    { label: "Services", href: "/admin/services", icon: Layers },
    { label: "Portfolio", href: "/admin/projects", icon: FolderKanban },
    { label: "Insights / Blog", href: "/admin/posts", icon: FileText },
    { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#060b17] flex flex-col md:flex-row text-slate-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a1226] border-r border-white/10 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/20 bg-[#0e1833] shrink-0">
              <Image src="/images/logo.webp" alt="LQD logo" fill sizes="32px" className="object-cover" />
            </div>
            <div>
              <span className="font-bold text-white text-sm block">LQD Studio CMS</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                {profile?.role === "admin" ? "Administrator" : "Content Editor"}
              </span>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Icon className="w-4 h-4 text-[#d4af37]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User profile & actions */}
        <div className="p-4 border-t border-white/10 bg-[#080e1e]/60 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 truncate max-w-[140px]">{user.email}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 uppercase">
              {profile?.role || "staff"}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              href="/"
              target="_blank"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 text-[11px] font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <form action={logoutAction} className="inline">
              <button
                type="submit"
                className="p-2 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/40 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-white/10 px-6 sm:px-8 flex items-center justify-between bg-[#080e1e]/80 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>LQD Creatives Internal CMS</span>
            <span>/</span>
            <span className="text-white font-medium">Production Environment</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/254740396075"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#25d366] hover:underline"
            >
              WhatsApp Support
            </a>
          </div>
        </header>

        <div className="p-6 sm:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
