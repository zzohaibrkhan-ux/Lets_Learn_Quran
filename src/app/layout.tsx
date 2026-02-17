import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "آؤ قرآن سمجھیں - Lets_Learn_Quran",
  description:
    "A comprehensive guide on Quranic recitation, Islamic Information, History and some other topics in Urdu",
  keywords: ["Tajweed", "تجوید", "Quran", "قرآن", "Urdu", "اردو", "Quran Recitation", "Islam","Islamic History","Salahuddin"],
  authors: [{ name: "Tajweed-ul-Quran" }],
  icons: {
    icon: "https://res.cloudinary.com/dkhv1yqda/image/upload/v1769557395/Untitled_design__2_-removebg-preview_ximgkt.png",
  },
  openGraph: {
    title: "آؤ قرآن سمجھیں - Lets_Learn_Quran",
    description: "Learn the rules of Tajweed for proper Quranic recitation",
    url: "",
    siteName: "Lets_Learn_Quran",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "آؤ قرآن سمجھیں - Lets_Learn_Quran",
    description: "Learn the rules of Tajweed for proper Quranic recitation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1YSRW2657R"
        />
        <Script id="ga">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1YSRW2657R');
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
