import { HRProvider } from "@/contexts/HRContext";
import { EmployeeProvider } from "@/contexts/EmployeeContext";
import { Toaster } from "@/components/ui/sonner";
import { navigationContent, Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
// import { useHR } from '@/contexts/HRContext';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { isHR } = useHR();
  return (
      <div className="flex h-screen overflow-hidden">
        <div className={"hidden md:flex md:w-64 md:flex-col"}>
          <Sidebar content={navigationContent} />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>

  );
}
// <html lang="en">
//   <body
//     className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//   >
// <HRProvider></HRProvider
// /* <Toaster /> </HRProvider> */}
//   </body>
// </html>