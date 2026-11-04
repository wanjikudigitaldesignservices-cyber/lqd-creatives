import { NextResponse, type NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";
  const { pathname } = url;

  // Don't intercept static assets, APIs, or Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Detect subdomains:
  // Supports both custom domain subdomains (admin.lqdcreatives.co.ke, blog.lqdcreatives.co.ke)
  // and Vercel aliases (lqd-creatives-admin.vercel.app, admin-lqd-creatives.vercel.app, etc.)
  const isCmsSubdomain =
    hostname.startsWith("admin.") ||
    hostname.startsWith("cms.") ||
    hostname.startsWith("admin-") ||
    hostname.startsWith("cms-") ||
    hostname.includes("-admin.") ||
    hostname.includes("-cms.");

  const isBlogSubdomain =
    hostname.startsWith("blog.") ||
    hostname.startsWith("insights.") ||
    hostname.startsWith("blog-") ||
    hostname.startsWith("insights-") ||
    hostname.includes("-blog.") ||
    hostname.includes("-insights.");

  // 1. CMS Subdomain Handling
  if (isCmsSubdomain) {
    // e.g. admin.domain.com/ -> /admin
    // e.g. admin.domain.com/leads -> /admin/leads
    // e.g. admin.domain.com/posts -> /admin/posts
    if (!pathname.startsWith("/admin")) {
      url.pathname = `/admin${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // 2. Blog Subdomain Handling
  if (isBlogSubdomain) {
    // Quick writer shortcut for daily/weekly blogs
    if (pathname === "/write" || pathname === "/admin" || pathname === "/create") {
      url.pathname = "/admin/posts";
      return NextResponse.rewrite(url);
    }

    // e.g. blog.domain.com/ -> /insights
    // e.g. blog.domain.com/how-much-does-a-website-cost -> /insights/how-much-does-a-website-cost
    if (!pathname.startsWith("/insights")) {
      url.pathname = `/insights${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
