import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HRProvider } from "@/contexts/HRContext";
import { Toaster } from "@/components/ui/sonner";
import { EmployeeProvider } from "@/contexts/EmployeeContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HR Payroll System",
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
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <HRProvider>
              <EmployeeProvider>
                <div className="flex h-screen overflow-hidden">
                  <div className="flex flex-1 flex-col overflow-hidden">
                    <main className="flex-1 overflow-auto">
                      {children}
                    </main>
                  </div>
                </div>
                <Toaster />
              </EmployeeProvider>
            </HRProvider>
          </PersistGate>
        </Provider>
      </body>{/*  */}
    </html>
  );
}
