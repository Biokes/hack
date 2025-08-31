'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEmployee } from '@/contexts/EmployeeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Clock,
  DollarSign,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Timer,
  MapPin,
  Coffee,
  LogOut as LogOutIcon,
  User,
  Briefcase,
  Calculator,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  Wallet
} from 'lucide-react';
import { Sidebar, SideBarData } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useHR } from '@/contexts/HRContext';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/employee/ProtectedRoute';
import { Separator } from '@/components/ui/separator';

function EmployeeDashboardContent() {
  const {
    currentEmployee,
    dashboardStats,
    clockIn,
    clockOut,
    getCurrentTimeEntry,
    getTodaysTimeEntry,
    dailyBalances,
    timeEntries,
    attendanceSettings,
    logout
  } = useEmployee();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockingIn, setIsClockingIn] = useState(false);
  const [isClockingOut, setIsClockingOut] = useState(false);

  // Update current time every secon
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!currentEmployee || !dashboardStats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const currentEntry = getCurrentTimeEntry();
  const todaysEntry = getTodaysTimeEntry();
  const todaysBalance = dailyBalances.find(b => b.date === new Date().toISOString().split('T')[0]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatHours = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const handleClockIn = async () => {
    setIsClockingIn(true);
    try {
      clockIn('Office', 'Regular check-in');
      toast.success('Clocked in successfully!');
    } catch (error) {
      toast.error('Failed to clock in');
    } finally {
      setIsClockingIn(false);
    }
  };

  const handleClockOut = async () => {
    setIsClockingOut(true);
    try {
      clockOut('End of workday');
      toast.success('Clocked out successfully!');
    } catch (error) {
      toast.error('Failed to clock out');
    } finally {
      setIsClockingOut(false);
    }
  };

  const isLateToday = () => {
    if (!todaysEntry || !todaysEntry.clockIn) return false;
    const clockInTime = new Date(`2000-01-01 ${todaysEntry.clockIn}`);
    const workStart = new Date(`2000-01-01 ${attendanceSettings.workingHours.start}`);
    return clockInTime.getTime() > workStart.getTime() + (attendanceSettings.lateThreshold * 60 * 1000);
  };

  const getWorkingHoursToday = () => {
    if (!currentEntry) return 0;
    const clockInTime = new Date(`2000-01-01 ${currentEntry.clockIn}`);
    const now = new Date(`2000-01-01 ${formatTime(currentTime).split(' ')[0]}`);
    return (now.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);
  };

  const navigationContent: SideBarData[] = [
    {
      name: 'Dashboard',
      href: '/employee/dashboard',
      icon: LayoutDashboard,
      badge: 0,
    },

    {
      name: 'Payroll',
      href: '/employee/payroll',
      icon: Calculator,
      badge: 2,
    },
    {
      name: 'Pay Slips',
      href: '/employee/payslips',
      icon: FileText,
      badge: 0,
    },
    {
      name: 'Benefits',
      href: '/employee/benefits',
      icon: CreditCard,
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
    <div className="flex h-screen">
      {/* <div className="hidden md:flex md:w-64 md:flex-col fixed inset-y-0">
        <Sidebar content={navigationContent} />
      </div> */}

      {/* Main content area */}
      {/* <div className="flex-1 md:ml-64 flex flex-col"> */}
        {/* Header (fixed) */}
        <div className="bg-white shadow-sm border-b fixed top-0 left-0 md:left-64 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={currentEmployee.avatar} />
                  <AvatarFallback>
                    {currentEmployee.firstName[0]}{currentEmployee.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Welcome back, {currentEmployee.firstName}!
                  </h1>
                  <p className="text-sm text-gray-500">
                    {currentEmployee.position} • {currentEmployee.department}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* <div className="text-right">
                  <div className="text-lg font-semibold">{formatTime(currentTime)}</div>
                  <div className="text-sm text-gray-500">
                    {currentTime.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div> */}
                <Button variant="outline" onClick={() => { }} className="ml-4">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto md:overflow-hidden bg-gray-50 pt-[72px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {todaysBalance ? formatCurrency(todaysBalance.totalEarnings) : '$0.00'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {todaysBalance ? todaysBalance.lateDeduction: 0 > 0 && (
                      <span className="text-red-600">
                        -{formatCurrency( 0 )} late penalty
                      </span>
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(dashboardStats.pendingBalance)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Next pay: {new Date(dashboardStats.upcomingPayDate).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Week</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatHours(dashboardStats.weekHours)}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardStats.overtimeHours > 0 && (
                      <span className="text-green-600">
                        +{formatHours(dashboardStats.overtimeHours)} overtime
                      </span>
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardStats.lateCount === 0 ? (
                      <span className="text-green-600">Perfect</span>
                    ) : (
                      <span className="text-red-600">{dashboardStats.lateCount} Late</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your most recent trasactions history</CardDescription>
                  </CardHeader>
                                    <Separator />
                  <CardContent>
                    <div className="space-y-4 max-h-[200px] overflow-y-auto">
                      {dashboardStats.recentTimeEntries.length > 0 ? (
                        dashboardStats.recentTimeEntries.map((entry) => (
                          <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                                <Calendar className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {new Date(entry.date).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {entry.clockIn} - {entry.clockOut || 'In progress'}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                {entry.totalHours ? formatHours(entry.totalHours) : 'Active'}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center space-x-2">
                                {entry.lateMinutes && entry.lateMinutes > 0 && (
                                  <Badge variant="destructive" className="text-xs">
                                    {entry.lateMinutes}min late
                                  </Badge>
                                )}
                                {entry.overtimeHours && entry.overtimeHours > 0 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{formatHours(entry.overtimeHours)} OT
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center h-32 text-gray-500 text-sm italic">
                          No recent transactions were made
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Leave Balance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Vacation</span>
                      <Badge variant="outline">{dashboardStats.leaveBalance.vacation} days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sick Leave</span>
                      <Badge variant="outline">{dashboardStats.leaveBalance.sick} days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Personal</span>
                      <Badge variant="outline">{dashboardStats.leaveBalance.personal} days</Badge>
                    </div>
                  </CardContent>
                </Card> */}

                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <Separator />
                  <CardContent className="space-y-3 relative">
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Request Leave
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      File Complaint
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <User className="mr-2 h-4 w-4" />
                      Update Profile
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Submit Resignation
                    </Button>
                     <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                    <span className="text-lg font-semibold text-gray-700">🚧 Coming Soon</span>
                  </div>
                  </CardContent>
                </Card>

                {(dashboardStats.pendingRequests.leaves > 0 || dashboardStats.pendingRequests.complaints > 0) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pending Requests</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {dashboardStats.pendingRequests.leaves > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Leave Requests</span>
                          <Badge>{dashboardStats.pendingRequests.leaves}</Badge>
                        </div>
                      )}
                      {dashboardStats.pendingRequests.complaints > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Complaints</span>
                          <Badge variant="secondary">{dashboardStats.pendingRequests.complaints}</Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>

  );
}

export default function EmployeeDashboard() {
  return (
    <EmployeeDashboardContent />
  );
}
// <ProtectedRoute>
//    {/* </ProtectedRoute> */}
