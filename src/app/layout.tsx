import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "LQD Creatives | Modern Websites for Kenyan SMEs",
    template: "%s | LQD Creatives",
  },
  description:
    "LQD Creatives helps Kenyan businesses build professional, mobile-friendly websites that make it easy for customers to understand their services, trust the business, and make an enquiry.",
  keywords: [
    "Web design Kenya",
    "Nairobi web developer",
    "Kenyan SME websites",
    "Full-stack development Kenya",
    "Brand identity design Nairobi",
    "LQD Creatives",
    "Reuben Wanjiku Kimani",
    "Mobile-friendly websites Nairobi",
  ],
  authors: [{ name: "Reuben Wanjiku Kimani" }],
  creator: "LQD Creatives",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lqd-creatives.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://lqd-creatives.vercel.app",
    title: "LQD Creatives | High-Converting Websites for Kenyan SMEs",
    description:
      "Modern, fast, mobile-first websites engineered to build trust and generate qualified enquiries for growing Kenyan enterprises.",
    siteName: "LQD Creatives",
  },
  twitter: {
    card: "summary_large_image",
    title: "LQD Creatives | Modern Websites for Kenyan SMEs",
    description: "Web design and full-stack development engineered for Kenyan businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data: Organization & ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "LQD Creatives",
              "url": "https://lqd-creatives.vercel.app",
              "telephone": "+254-740-396-075",
              "email": "lqdcreatives@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nairobi",
                "addressCountry": "KE",
              },
              "founder": {
                "@type": "Person",
                "name": "Reuben Wanjiku Kimani",
              },
              "areaServed": "Kenya",
              "priceRange": "KES 35,000 - 180,000",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#080e1e] text-slate-100 antialiased selection:bg-[#d4af37] selection:text-[#080e1e]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
