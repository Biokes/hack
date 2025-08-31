'use client';

import { SideBarData } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Sidebar } from "@/components/layout/Sidebar";
import { useEmployee } from '@/contexts/EmployeeContext';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import {  Building, FileText, HandCoins, LayoutDashboard, Settings, Wallet } from 'lucide-react';


export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    currentEmployee,
    // dashboardStats,
    // clockIn,
    // clockOut,
    // getCurrentTimeEntry,
    // getTodaysTimeEntry,
    // dailyBalances,
    // timeEntries,
    // attendanceSettings,
    // logout
  } = useEmployee();

   const navigationContent: SideBarData[] = [
  {
    name: 'Dashboard',
    href: '/employee/dashboard',
    icon: LayoutDashboard,
    badge: 0,
  },
  // {
  //   name: 'Employees',
  //   href: '/employee/employees',
  //   icon: Users,
  //   badge: 0,
  // },
  // {
  //   name: 'Payroll',
  //   href: '/admin/payroll',
  //   icon: Calculator,
  //   badge: 2,
  // },
  {
    name: 'Transactions',
    href: '/employee/payroll',
    icon: FileText,
    badge: 0,
  },
  // {
  //   name: 'Departments',
  //   href: '/employee/departments',
  //   icon: Building,
  //   badge: 0,
  // },
  {
    name: 'Investments',
    href: '/employee/invest',
    icon: HandCoins,
    badge: 0,
  },
  {
    name: 'Settings',
    href: '/employee/settings',
    icon: Settings,
    badge: 0,
  },
];
  return (

    <main>
      <div className="hidden md:flex md:w-64 md:flex-col fixed inset-y-0">
        <Sidebar content={navigationContent} />
      </div>
      {/* Main content area */}
      <div className="flex-1 md:ml-64 flex flex-col p-2">
        {/* Header (fixed) */}
        <div className="bg-white shadow-sm border-b fixed top-0 left-0 md:left-64 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={currentEmployee?.avatar} />
                  <AvatarFallback>
                    {currentEmployee?.firstName[0]}{currentEmployee?.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Welcome back, {currentEmployee?.firstName}!
                  </h1>
                  <p className="text-sm text-gray-500">
                    {currentEmployee?.position} • {currentEmployee?.department}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => { }} className="ml-4">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}
