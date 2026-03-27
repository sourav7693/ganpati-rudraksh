import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartPreviewProvider } from "@/context/CartPreviewContext";
import { CustomerProvider } from "@/context/CustomerContext";
import { GlobalUIProvider } from "@/context/GlobalUIContext";
import { Toaster } from "react-hot-toast";
import { CategoryProvider } from "@/context/CategoryContext";
import FloatingCartPreview from "@/ui/FloatingCartPreview";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Ganpati Rudraakshaam Official Store | Buy Original Rudraksha Online in North Bengal",
  description:
    "Looking for Ganpati Rudraakshaam? Explore our official store for 100% original Rudraksha beads. Trusted for 20+ years, offering premium quality, certification, and pan-India delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <GlobalUIProvider>
          <CustomerProvider>
            <CategoryProvider>
              <CartPreviewProvider>
                {children}
                <FloatingCartPreview />
              </CartPreviewProvider>
            </CategoryProvider>
          </CustomerProvider>
        </GlobalUIProvider>
      </body>
    </html>
  );
}
