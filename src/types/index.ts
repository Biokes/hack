// Employee Types
export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'terminated';
  payrollInfo: PayrollInfo;
  address: Address;
  emergencyContact: EmergencyContact;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface PayrollInfo {
  bankAccount: string;
  routingNumber: string;
  taxId: string;
  payFrequency: 'weekly' | 'biweekly' | 'monthly';
  allowances: number;
  deductions: Deduction[];
}

export interface Deduction {
  id: string;
  type: 'health_insurance' | 'dental' | '401k' | 'tax' | 'other';
  name: string;
  amount: number;
  isPercentage: boolean;
  isPreTax: boolean;
}

// Payroll Types
export interface PayrollPeriod {
  id: string;
  startDate: string;
  endDate: string;
  payDate: string;
  status: 'draft' | 'processed' | 'paid';
  totalGross: number;
  totalNet: number;
  totalDeductions: number;
  paySlips: PaySlip[];
  createdAt: string;
}

export interface PaySlip {
  id: string;
  employeeId: string;
  employee: Employee;
  payPeriodId: string;
  grossPay: number;
  netPay: number;
  regularHours: number;
  overtimeHours: number;
  regularRate: number;
  overtimeRate: number;
  deductions: PaySlipDeduction[];
  taxes: PaySlipTax[];
  payDate: string;
  status: 'draft' | 'approved' | 'paid';
  createdAt: string;
}

export interface PaySlipDeduction {
  id: string;
  type: string;
  name: string;
  amount: number;
  isPreTax: boolean;
}

export interface PaySlipTax {
  id: string;
  type: 'federal' | 'state' | 'social_security' | 'medicare' | 'local';
  name: string;
  amount: number;
  rate: number;
}

// Dashboard Types
export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  totalPayroll: number;
  avgSalary: number;
  departmentBreakdown: DepartmentStats[];
  recentHires: Employee[];
  upcomingPayrolls: PayrollPeriod[];
}

export interface DepartmentStats {
  department: string;
  count: number;
  totalSalary: number;
  avgSalary: number;
}

// Filter and Search Types
export interface EmployeeFilters {
  search?: string;
  department?: string;
  status?: Employee['status'];
  position?: string;
}

export interface PayrollFilters {
  search?: string;
  status?: PayrollPeriod['status'];
  startDate?: string;
  endDate?: string;
}

// Form Types
export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  salary: string;
  status: Employee['status'];
  address: Address;
  emergencyContact: EmergencyContact;
  payrollInfo: Omit<PayrollInfo, 'deductions'>;
}

export interface PayrollFormData {
  startDate: string;
  endDate: string;
  payDate: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
}

// Table Types
export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface TableSorting {
  key: string;
  direction: 'asc' | 'desc';
}

// Modal Types
export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

// Employee Portal Types
export interface TimeEntry {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  breakTime?: number; // minutes
  totalHours?: number;
  regularHours?: number;
  overtimeHours?: number;
  lateMinutes?: number;
  earlyLeaveMinutes?: number;
  status: 'clocked-in' | 'clocked-out' | 'on-break';
  location?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DailyBalance {
  id: string;
  employeeId: string;
  date: string;
  regularPay: number;
  overtimePay: number;
  lateDeduction: number;
  earlyLeaveDeduction: number;
  bonuses: number;
  totalEarnings: number;
  runningBalance: number;
  createdAt: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employee: Employee;
  type: 'vacation' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Complaint {
  id: string;
  employeeId: string;
  employee: Employee;
  title: string;
  description: string;
  category: 'harassment' | 'discrimination' | 'safety' | 'policy' | 'workplace' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'submitted' | 'under-review' | 'investigating' | 'resolved' | 'closed';
  isAnonymous: boolean;
  assignedTo?: string;
  resolution?: string;
  attachments?: string[];
  submittedDate: string;
  resolvedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResignationLetter {
  id: string;
  employeeId: string;
  employee: Employee;
  lastWorkingDay: string;
  reason: string;
  additionalComments?: string;
  status: 'submitted' | 'acknowledged' | 'accepted' | 'withdrawn';
  submittedDate: string;
  acknowledgedBy?: string;
  acknowledgedDate?: string;
  exitInterviewScheduled?: boolean;
  exitInterviewDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceSettings {
  workingHours: {
    start: string; // HH:MM format
    end: string;
  };
  lunchBreak: {
    start: string;
    end: string;
    duration: number; // minutes
  };
  lateThreshold: number; // minutes
  overtimeStart: number; // hours
  lateDeductionRate: number; // per minute
  overtimeRate: number; // multiplier
  workingDays: string[]; // ['monday', 'tuesday', ...]
}

export interface EmployeeSession {
  id: string;
  employeeId: string;
  employee: Employee;
  loginTime: string;
  lastActivity: string;
  isActive: boolean;
}

// Employee Dashboard Types
export interface EmployeeDashboardStats {
  todayHours: number;
  weekHours: number;
  monthHours: number;
  totalEarnings: number;
  pendingBalance: number;
  overtimeHours: number;
  lateCount: number;
  leaveBalance: {
    vacation: number;
    sick: number;
    personal: number;
  };
  upcomingPayDate: string;
  recentTimeEntries: TimeEntry[];
  pendingRequests: {
    leaves: number;
    complaints: number;
  };
}

// Form Types
export interface LeaveRequestForm {
  type: LeaveRequest['type'];
  startDate: string;
  endDate: string;
  reason: string;
  attachments?: File[];
}

export interface ComplaintForm {
  title: string;
  description: string;
  category: Complaint['category'];
  priority: Complaint['priority'];
  isAnonymous: boolean;
  attachments?: File[];
}

export interface ResignationForm {
  lastWorkingDay: string;
  reason: string;
  additionalComments?: string;
}
