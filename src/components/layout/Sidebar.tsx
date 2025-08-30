'use client';
import { ForwardRefExoticComponent, RefAttributes, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, Users,
  Calculator,
  FileText,
  Settings,
  Menu,
  X,
  Building,
  CreditCard,
  UserCheck,
  LucideProps,
  LogOut,
} from 'lucide-react';
import { useEmployee } from '@/contexts/EmployeeContext';

export interface SideBarData {
  name: string,
  href: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
  badge: number,
}

export interface SidebarProps {
  className?: string;
  content: SideBarData[];
  isAdmin: boolean
}

export function Sidebar({ className, content, isAdmin }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigation = content
  const { logout } = useEmployee()
  return (
    <div className={cn('flex h-full flex-col border-r bg-muted/10', className)}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <div className={cn('flex items-center space-x-2', isCollapsed && 'hidden')}>
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <Calculator className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">HR Payroll</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-2 h-10',
                pathname === item.href
                && 'bg-secondary text-secondary-foreground',
                isCollapsed && 'justify-center px-2'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="truncate">{item.name}</span>
                  {item.badge > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          </Link>
        )
        )}
      </nav>

      {
        !isAdmin ?
          <div className="border-t p-2">
            <div className={cn('px-2 py-2', isCollapsed && 'hidden')}>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
               My Portal
              </p>
            </div>
            <Link href="/employee/login" onClick={logout}>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-2 h-10 hover:bg-red-300 hover:text-gray-700',
                  isCollapsed && 'justify-center px-2'
                )}
              >
                <LogOut className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Log Out</span>}
              </Button>
            </Link>
          </div>
          :
          <div className="border-t p-4">
            <div className={cn('flex items-center space-x-2', isCollapsed && 'hidden')}>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
              <div className="flex-1 truncate">
                <p className="text-sm font-medium">Admin Orgainsation name</p>
                <p className="text-xs text-muted-foreground">admin@company.com</p>
              </div>
            </div>
          </div>
      }
    </div>
  );
}
export const navigationContent: SideBarData[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    badge: 0,
  },
  {
    name: 'Employees',
    href: '/admin/employees',
    icon: Users,
    badge: 0,
  },
  {
    name: 'Payroll',
    href: '/admin/payroll',
    icon: Calculator,
    badge: 2,
  },
  {
    name: 'Pay Slips',
    href: '/admin/payslips',
    icon: FileText,
    badge: 0,
  },
  {
    name: 'Departments',
    href: '/admin/departments',
    icon: Building,
    badge: 0,
  },
  {
    name: 'Benefits',
    href: '/admin/benefits',
    icon: CreditCard,
    badge: 0,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    badge: 0,
  },
];
export function MobileSidebar({isHR}: {isHR:boolean}) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsOpen(true)}>
        <Menu className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-background">
            <Sidebar content={navigationContent} isAdmin={isHR} />
          </div>
        </div>
      )}
    </>
  );
}
