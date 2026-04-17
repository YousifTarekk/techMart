import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import ProvidersWrapper from "@/Providers/ProviderWrapper";
import PageLoader from "@/components/ui/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechMart – Shop Electronics & More",
  description:
    "Discover the best products at unbeatable prices on TechMart, your one-stop online shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ProvidersWrapper>
          <PageLoader />
          <Navbar />
          <div className="container mx-auto py-10">{children}</div>
          <Toaster />
          <Footer />
        </ProvidersWrapper>
      </body>
    </html>
  );
}
