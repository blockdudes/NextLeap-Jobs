import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppProvider from "@/lib/AppProvider";
import RootLayout from "@/components/RootLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next Leap Jobs",
  description: "Decentralized job marketplace",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <div className="relative min-h-screen max-w-[450px] mx-auto bg-background text-foreground">
          <AppProvider>
            <RootLayout>{children}</RootLayout>
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
