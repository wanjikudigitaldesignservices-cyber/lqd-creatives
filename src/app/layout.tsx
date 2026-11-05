import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <head>
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KG7HHG3J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-KG7HHG3J"
        />
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `,
          }}
        />

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
