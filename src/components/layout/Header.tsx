'use client';

import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MobileSidebar } from './Sidebar';
// import { useContext } from 'react';
import { useHR } from '@/contexts/HRContext';
// import { useRouter } from "next/navigation";
interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { isHR, toggleHrMode } = useHR()
  // const router = useRouter();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <MobileSidebar isHR={isHR} />
          {title && (
            <div>
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
          )}
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search employees, payroll..." className="pl-10 pr-4" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0">
              3
            </Badge>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@company.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem>
                Settings
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem>
                Support
              </DropdownMenuItem> */}
              {/* <DropdownMenuSeparator /> */}
                <button className={`rounded p-1 w-full h-full ${isHR?"hover:bg-red-300 hover:text-gray-700":"hover:bg-green-500 hover:text-white"} transition trnsform-all duration-300`} onClick={() => {
                  toggleHrMode();
              }}>
                  {isHR?"Disconnect Wallet":"Connect Wallet"}
                </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
