import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Vishwashanthi Shrushti Seva Trust — Transforming Lives Through Care & Education",
    template: "%s | Vishwashanthi Shrushti Seva Trust",
  },
  description:
    "Vishwashanthi Shrushti Seva Trust is a registered Indian charitable trust providing residential care, education, nutrition, and holistic development for orphaned and underprivileged children in Telangana since 2001.",
  keywords: [
    "Vishwashanthi Shrushti Seva Trust",
    "charitable trust India",
    "orphanage Hyderabad",
    "volunteer for children",
    "NGO Telangana",
    "child education India",
    "NGO support India",
  ],
  openGraph: {
    title: "Vishwashanthi Shrushti Seva Trust — Transforming Lives Through Care & Education",
    description:
      "Volunteer or support orphaned children, education programmes, and women's development in Telangana, India.",
    url: "https://vssevatrust.com",
    siteName: "Vishwashanthi Shrushti Seva Trust",
    locale: "en_IN",
    type: "website",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-inter)]">
        <LanguageProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
