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
  // and Vercel aliases (lqd-creatives-admin, lqdcreatives-blog, etc.)
  const isCmsSubdomain =
    hostname.startsWith("admin.") ||
    hostname.startsWith("cms.") ||
    hostname.startsWith("admin-") ||
    hostname.startsWith("cms-") ||
    hostname.includes("-admin.") ||
    hostname.includes("-cms.") ||
    hostname.includes("lqdcreatives-admin.");

  const isBlogSubdomain =
    hostname.startsWith("blog.") ||
    hostname.startsWith("insights.") ||
    hostname.startsWith("blog-") ||
    hostname.startsWith("insights-") ||
    hostname.includes("-blog.") ||
    hostname.includes("-insights.") ||
    hostname.startsWith("lqdblog.") ||
    hostname.includes("lqdcreatives-blog.");

  // Top-level public routes that should NOT be rewritten to /insights/ or /admin/
  const PUBLIC_TOP_ROUTES = [
    "/about",
    "/services",
    "/work",
    "/contact",
    "/privacy",
    "/terms",
    "/admin",
  ];

  const isPublicTopRoute = PUBLIC_TOP_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // 1. CMS Subdomain Handling
  if (isCmsSubdomain) {
    if (pathname === "/") {
      url.pathname = "/admin";
      return NextResponse.rewrite(url);
    }
    // If not starting with /admin and not a public top route, rewrite to /admin/...
    if (!pathname.startsWith("/admin") && !isPublicTopRoute) {
      url.pathname = `/admin${pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // 2. Blog Subdomain Handling
  if (isBlogSubdomain) {
    // Quick writer shortcut for daily/weekly blogs
    if (pathname === "/write" || pathname === "/create") {
      url.pathname = "/admin/posts";
      return NextResponse.rewrite(url);
    }

    // Root of blog subdomain -> /insights
    if (pathname === "/") {
      url.pathname = "/insights";
      return NextResponse.rewrite(url);
    }

    // If navigating to main site pages (e.g. /about, /services, /work, /contact),
    // serve them normally without appending /insights/ (prevents 404!)
    if (isPublicTopRoute) {
      return NextResponse.next();
    }

    // If URL already has /insights/..., serve directly
    if (pathname.startsWith("/insights")) {
      return NextResponse.next();
    }

    // Otherwise rewrite direct article slug: blog.domain.com/[slug] -> /insights/[slug]
    url.pathname = `/insights${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
