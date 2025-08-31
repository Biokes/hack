'use client';

import { useHR } from '@/contexts/HRContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Calculator, Clock, DollarSign, FileText } from 'lucide-react';
// import { Sidebar } from "@/components/layout/Sidebar";

export default function PayrollPage() {
  const { payrollPeriods, employees } = useHR();

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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'draft':
        return 'outline';
      case 'processed':
        return 'default';
      case 'paid':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const totalPendingPayroll = payrollPeriods
    .filter(p => p.status !== 'paid')
    .reduce((sum, p) => sum + p.totalGross, 0);

  const upcomingPayrolls = payrollPeriods.filter(p => p.status !== 'paid').length;

  return (
   <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payroll</h2>
          <p className="text-muted-foreground">
            Manage payroll periods and process employee payments.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Payroll Period
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.filter(e => e.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">
              Active employees in payroll
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payroll</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPendingPayroll)}</div>
            <p className="text-xs text-muted-foreground">
              Amount pending processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Payrolls</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingPayrolls}</div>
            <p className="text-xs text-muted-foreground">
              Payrolls to process
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Periods</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrollPeriods.length}</div>
            <p className="text-xs text-muted-foreground">
              All payroll periods
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Periods Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Periods</CardTitle>
          <CardDescription>
            View and manage all payroll periods and their processing status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pay Period</TableHead>
                  <TableHead>Pay Date</TableHead>
                  <TableHead>Gross Amount</TableHead>
                  <TableHead>Net Amount</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollPeriods.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No payroll periods found
                    </TableCell>
                  </TableRow>
                ) : (
                  payrollPeriods.map((period) => (
                    <TableRow key={period.id}>
                      <TableCell>
                        <div className="font-medium">
                          {formatDate(period.startDate)} - {formatDate(period.endDate)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {period.paySlips.length} employees
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(period.payDate)}</TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(period.totalGross)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(period.totalNet)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(period.totalDeductions)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(period.status)}>
                          {period.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
    
  );
}

// <div className="flex h-screen">
//   {/* <div className="flex-1 md:ml-64 flex flex-col"> */}
//     <div className="bg-white border-b shadow-sm fixed top-0 left-0 md:left-64 right-0 z-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">Payroll</h2>
//           <p className="text-muted-foreground">
//             Manage payroll periods and process employee payments.
//           </p>
//         </div>
//         <Button>
//           <Plus className="mr-2 h-4 w-4" />
//           New Payroll Period
//         </Button>
//       </div>
//     </div>

//     <div className="flex-1 overflow-y-auto bg-gray-50 pt-[88px]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 py-8">

//         {/* Stats Cards */}
//         <div className="grid gap-4 md:grid-cols-4">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
//               <Calculator className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">
//                 {employees.filter(e => e.status === 'active').length}
//               </div>
//               <p className="text-xs text-muted-foreground">Active employees in payroll</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Pending Payroll</CardTitle>
//               <Clock className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{formatCurrency(totalPendingPayroll)}</div>
//               <p className="text-xs text-muted-foreground">Amount pending processing</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Upcoming Payrolls</CardTitle>
//               <DollarSign className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{upcomingPayrolls}</div>
//               <p className="text-xs text-muted-foreground">Payrolls to process</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Periods</CardTitle>
//               <FileText className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{payrollPeriods.length}</div>
//               <p className="text-xs text-muted-foreground">All payroll periods</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Payroll Periods Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Payroll Periods</CardTitle>
//             <CardDescription>
//               View and manage all payroll periods and their processing status.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="rounded-md border">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Pay Period</TableHead>
//                     <TableHead>Pay Date</TableHead>
//                     <TableHead>Gross Amount</TableHead>
//                     <TableHead>Net Amount</TableHead>
//                     <TableHead>Deductions</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {payrollPeriods.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={7} className="text-center py-8">
//                         No payroll periods found
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     payrollPeriods.map((period) => (
//                       <TableRow key={period.id}>
//                         <TableCell>
//                           <div className="font-medium">
//                             {formatDate(period.startDate)} - {formatDate(period.endDate)}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             {period.paySlips.length} employees
//                           </div>
//                         </TableCell>
//                         <TableCell>{formatDate(period.payDate)}</TableCell>
//                         <TableCell className="font-medium">
//                           {formatCurrency(period.totalGross)}
//                         </TableCell>
//                         <TableCell className="font-medium">
//                           {formatCurrency(period.totalNet)}
//                         </TableCell>
//                         <TableCell>
//                           {formatCurrency(period.totalDeductions)}
//                         </TableCell>
//                         <TableCell>
//                           <Badge variant={getStatusBadgeVariant(period.status)}>
//                             {period.status}
//                           </Badge>
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <Button variant="ghost" size="sm">
//                             View Details
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>

//       </div>
//     </div>
//   {/* </div> */}
// </div>