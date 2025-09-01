import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Streampay",
  description: "Complete HR and Payroll management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProviders>
           <div className="flex h-screen overflow-hidden">
                  <div className="flex flex-1 flex-col overflow-hidden">
                    <main className="flex-1 overflow-auto">
                      {children}
                    </main>
                  </div>
                </div>
       </ClientProviders>
      </body>{/*  */}
    </html>
  );
}
