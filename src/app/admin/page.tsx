'use client';

import { useHR } from '@/contexts/HRContext';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Users,
    DollarSign,
    TrendingUp,
    Calendar,
    Building,
    Clock,
    UserCheck,
    AlertCircle,
    LucideProps,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { DepartmentStats, Employee } from '@/types';
import { mockPayrollPeriods } from '@/lib/mock-data';
// interface StatsCardProps { 
//     title: string;
//     value: number;
//     description: string;
//     icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
//     trend: { value: number, isPositive: boolean, label:string}
// }
export default function Dashboard() {
    const { dashboardStats, isHR } = useHR();

    if (!dashboardStats) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg">Loading dashboard...</div>
            </div>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
    const data : DepartmentStats[] =[]
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight"> Welcome, {isHR ? "Admin" : "Santiago"}</h2>
                    <p className="text-muted-foreground">
                        Here's what's happening  {isHR ? "with your organization" : ""}.
                    </p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        This Month
                    </Button>
                    <Button className="hidden">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        View Alerts
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Employees"
                    value={dashboardStats.totalEmployees}
                    description="Total registered employees"
                    icon={<Users className="h-4 w-4" />}
                    trend={{
                        value: 12,
                        isPositive: true,
                        label: "from last month"
                    }}
                />
                <StatsCard
                    title="Active Employees"
                    value={dashboardStats.activeEmployees}
                    description="Currently active employees"
                    icon={<UserCheck className="h-4 w-4" />}
                    trend={{
                        value: 8,
                        isPositive: true,
                        label: "from last month"
                    }}
                />
                <StatsCard
                    title="Total Payroll"
                    value={formatCurrency(dashboardStats.totalPayroll)}
                    description="Monthly payroll amount"
                    icon={<DollarSign className="h-4 w-4" />}
                    trend={{
                        value: 5,
                        isPositive: true,
                        label: "from last month"
                    }}
                />
                <StatsCard
                    title="Average Salary"
                    value={formatCurrency(dashboardStats.avgSalary)}
                    description="Average employee salary"
                    icon={<TrendingUp className="h-4 w-4" />}
                    trend={{
                        value: 3,
                        isPositive: true,
                        label: "from last month"
                    }}
                />
            </div>


            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Hires */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserCheck className="h-5 w-5" />
                            Recent Hires
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={`h-[120px] overflow-y-auto ${dashboardStats.recentHires.length === 0
                            ? "flex items-center justify-center text-center"
                            : "space-y-4"
                        }`}
                    >
                        {dashboardStats.recentHires.length === 0 ? (
                            <p className="text-muted-foreground">No recent hires</p>
                        ) : (
                            dashboardStats.recentHires.map((employee) => (
                                <div key={employee.id} className="flex items-center space-x-4">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={employee.avatar} />
                                        <AvatarFallback>
                                            {employee.firstName[0]}{employee.lastName[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {employee.firstName} {employee.lastName}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {employee.position} • {employee.department}
                                        </p>
                                    </div>
                                    <Badge variant="secondary">
                                        {formatDate(employee.hireDate)}
                                    </Badge>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Upcoming Payrolls
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={`h-[120px] overflow-y-auto ${dashboardStats.upcomingPayrolls.length === 0
                            ? "flex items-center justify-center text-center"
                            : "space-y-4"
                        }`}>
                        {dashboardStats.upcomingPayrolls.length === 0 ? (
                            <p className="text-muted-foreground">No upcoming payrolls</p>
                        ) : (
                            dashboardStats.upcomingPayrolls.map((payroll) => (
                                <div key={payroll.id} className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                            Pay Period: {formatDate(payroll.startDate)} - {formatDate(payroll.endDate)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Pay Date: {formatDate(payroll.payDate)}
                                        </p>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <Badge
                                            variant={payroll.status === 'draft' ? 'outline' : 'default'}
                                        >
                                            {payroll.status}
                                        </Badge>
                                        <p className="text-sm font-medium">
                                            {formatCurrency(payroll.totalGross)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Department Breakdown */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        Department Breakdown
                    </CardTitle>
                </CardHeader>
                <CardContent
                     className={`${dashboardStats.departmentBreakdown.length === 0
                            ? "flex items-center justify-center text-center"
                            : "grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-[300px] overflow-y-auto "
                        }`}
                    >
                        {dashboardStats.departmentBreakdown.length === 0 ? (
                            <p className="text-muted-foreground my-10">No Departments Created Yet</p>
                        ) : (
                        dashboardStats.departmentBreakdown.map((dept) => (
                            <div key={dept.department} className="space-y-2 p-4 border rounded-lg">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">{dept.department}</h4>
                                    <Badge variant="outline">{dept.count} employees</Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">
                                        Total: {formatCurrency(dept.totalSalary)}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Avg: {formatCurrency(dept.avgSalary)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                    {/* </div> */}
                </CardContent>
            </Card>
        </div>
    );
}

// employee settings - 