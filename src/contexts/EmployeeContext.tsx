'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  Employee, 
  TimeEntry, 
  DailyBalance, 
  LeaveRequest, 
  Complaint, 
  ResignationLetter,
  EmployeeDashboardStats,
  AttendanceSettings,
  EmployeeSession
} from '@/types';

interface EmployeeState {
  currentEmployee: Employee | null;
  session: EmployeeSession | null;
  timeEntries: TimeEntry[];
  dailyBalances: DailyBalance[];
  leaveRequests: LeaveRequest[];
  complaints: Complaint[];
  resignationLetter: ResignationLetter | null;
  dashboardStats: EmployeeDashboardStats | null;
  attendanceSettings: AttendanceSettings;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

type EmployeeAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGIN_SUCCESS'; payload: { employee: Employee; session: EmployeeSession } }
  | { type: 'LOGOUT' }
  | { type: 'CLOCK_IN'; payload: TimeEntry }
  | { type: 'CLOCK_OUT'; payload: TimeEntry }
  | { type: 'ADD_TIME_ENTRY'; payload: TimeEntry }
  | { type: 'UPDATE_TIME_ENTRY'; payload: TimeEntry }
  | { type: 'SET_TIME_ENTRIES'; payload: TimeEntry[] }
  | { type: 'ADD_DAILY_BALANCE'; payload: DailyBalance }
  | { type: 'SET_DAILY_BALANCES'; payload: DailyBalance[] }
  | { type: 'ADD_LEAVE_REQUEST'; payload: LeaveRequest }
  | { type: 'UPDATE_LEAVE_REQUEST'; payload: LeaveRequest }
  | { type: 'SET_LEAVE_REQUESTS'; payload: LeaveRequest[] }
  | { type: 'ADD_COMPLAINT'; payload: Complaint }
  | { type: 'UPDATE_COMPLAINT'; payload: Complaint }
  | { type: 'SET_COMPLAINTS'; payload: Complaint[] }
  | { type: 'SET_RESIGNATION_LETTER'; payload: ResignationLetter }
  | { type: 'UPDATE_DASHBOARD_STATS'; payload: EmployeeDashboardStats }
  | { type: 'INITIALIZE_EMPLOYEE_DATA'; payload: string };

const defaultAttendanceSettings: AttendanceSettings = {
  workingHours: {
    start: '09:00',
    end: '17:00'
  },
  lunchBreak: {
    start: '12:00',
    end: '13:00',
    duration: 60
  },
  lateThreshold: 15, // 15 minutes
  overtimeStart: 8, // after 8 hours
  lateDeductionRate: 0.5, // $0.50 per minute
  overtimeRate: 1.5, // 1.5x regular rate
  workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
};

const initialState: EmployeeState = {
  currentEmployee: null,
  session: null,
  timeEntries: [],
  dailyBalances: [],
  leaveRequests: [],
  complaints: [],
  resignationLetter: null,
  dashboardStats: null,
  attendanceSettings: defaultAttendanceSettings,
  isAuthenticated: false,
  loading: false,
  error: null,
};

function employeeReducer(state: EmployeeState, action: EmployeeAction): EmployeeState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        currentEmployee: action.payload.employee,
        session: action.payload.session,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    
    case 'LOGOUT':
      return {
        ...initialState,
        attendanceSettings: state.attendanceSettings,
      };
    
    case 'CLOCK_IN':
    case 'ADD_TIME_ENTRY':
      return {
        ...state,
        timeEntries: [action.payload, ...state.timeEntries],
      };
    
    case 'CLOCK_OUT':
    case 'UPDATE_TIME_ENTRY':
      return {
        ...state,
        timeEntries: state.timeEntries.map(entry => 
          entry.id === action.payload.id ? action.payload : entry
        ),
      };
    
    case 'SET_TIME_ENTRIES':
      return { ...state, timeEntries: action.payload };
    
    case 'ADD_DAILY_BALANCE':
      return {
        ...state,
        dailyBalances: [action.payload, ...state.dailyBalances],
      };
    
    case 'SET_DAILY_BALANCES':
      return { ...state, dailyBalances: action.payload };
    
    case 'ADD_LEAVE_REQUEST':
      return {
        ...state,
        leaveRequests: [action.payload, ...state.leaveRequests],
      };
    
    case 'UPDATE_LEAVE_REQUEST':
      return {
        ...state,
        leaveRequests: state.leaveRequests.map(request => 
          request.id === action.payload.id ? action.payload : request
        ),
      };
    
    case 'SET_LEAVE_REQUESTS':
      return { ...state, leaveRequests: action.payload };
    
    case 'ADD_COMPLAINT':
      return {
        ...state,
        complaints: [action.payload, ...state.complaints],
      };
    
    case 'UPDATE_COMPLAINT':
      return {
        ...state,
        complaints: state.complaints.map(complaint => 
          complaint.id === action.payload.id ? action.payload : complaint
        ),
      };
    
    case 'SET_COMPLAINTS':
      return { ...state, complaints: action.payload };
    
    case 'SET_RESIGNATION_LETTER':
      return { ...state, resignationLetter: action.payload };
    
    case 'UPDATE_DASHBOARD_STATS':
      return { ...state, dashboardStats: action.payload };
    
    case 'INITIALIZE_EMPLOYEE_DATA':
      // Initialize mock data for the employee
      const mockTimeEntries = generateMockTimeEntries(action.payload);
      const mockDailyBalances = generateMockDailyBalances(action.payload);
      const mockLeaveRequests = generateMockLeaveRequests(action.payload);
      
      return {
        ...state,
        timeEntries: mockTimeEntries,
        dailyBalances: mockDailyBalances,
        leaveRequests: mockLeaveRequests,
      };
    
    default:
      return state;
  }
}

interface EmployeeContextType extends EmployeeState {
  // Authentication
  login: (employeeId: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Time tracking
  clockIn: (location?: string, notes?: string) => void;
  clockOut: (notes?: string) => void;
  getCurrentTimeEntry: () => TimeEntry | null;
  
  // Leave management
  submitLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'employeeId' | 'employee' | 'appliedDate' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  cancelLeaveRequest: (id: string) => void;
  
  // Complaints
  submitComplaint: (complaint: Omit<Complaint, 'id' | 'employeeId' | 'employee' | 'status' | 'submittedDate' | 'createdAt' | 'updatedAt'>) => void;
  
  // Resignation
  submitResignation: (resignation: Omit<ResignationLetter, 'id' | 'employeeId' | 'employee' | 'status' | 'submittedDate' | 'createdAt' | 'updatedAt'>) => void;
  
  // Utility functions
  calculateDailyBalance: (date: string) => void;
  updateDashboardStats: () => void;
  getTodaysTimeEntry: () => TimeEntry | null;
  getWeeklyHours: () => number;
  getMonthlyHours: () => number;
  
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  // Mock login function
  const login = async (employeeId: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Mock authentication - in real app, this would call an API
      const savedEmployees = localStorage.getItem('hr-data');
      if (savedEmployees) {
        const { employees } = JSON.parse(savedEmployees);
        const employee = employees.find((emp: Employee) => emp.employeeId === employeeId);
        
        if (employee) {
          const session: EmployeeSession = {
            id: `session_${Date.now()}`,
            employeeId: employee.id,
            employee,
            loginTime: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            isActive: true,
          };
          
          dispatch({ type: 'LOGIN_SUCCESS', payload: { employee, session } });
          dispatch({ type: 'INITIALIZE_EMPLOYEE_DATA', payload: employee.id });
          
          // Save session
          localStorage.setItem('employee-session', JSON.stringify(session));
          
          return true;
        }
      }
      
      dispatch({ type: 'SET_ERROR', payload: 'Invalid credentials' });
      return false;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('employee-session');
    dispatch({ type: 'LOGOUT' });
  };

  const clockIn = (location?: string, notes?: string) => {
    if (!state.currentEmployee) return;
    
    const now = new Date();
    const timeEntry: TimeEntry = {
      id: `time_${Date.now()}`,
      employeeId: state.currentEmployee.id,
      date: now.toISOString().split('T')[0],
      clockIn: now.toTimeString().split(' ')[0],
      status: 'clocked-in',
      location,
      notes,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    dispatch({ type: 'CLOCK_IN', payload: timeEntry });
    calculateDailyBalance(timeEntry.date);
  };

  const clockOut = (notes?: string) => {
    if (!state.currentEmployee) return;
    
    const currentEntry = getCurrentTimeEntry();
    if (!currentEntry) return;

    const now = new Date();
    const clockOutTime = now.toTimeString().split(' ')[0];
    const clockInTime = new Date(`2000-01-01 ${currentEntry.clockIn}`);
    const clockOutDateTime = new Date(`2000-01-01 ${clockOutTime}`);
    
    const totalMinutes = (clockOutDateTime.getTime() - clockInTime.getTime()) / (1000 * 60);
    const totalHours = totalMinutes / 60;
    
    // Calculate late minutes
    const workStart = new Date(`2000-01-01 ${state.attendanceSettings.workingHours.start}`);
    const lateMinutes = Math.max(0, (clockInTime.getTime() - workStart.getTime()) / (1000 * 60));
    
    // Calculate regular and overtime hours
    const regularHours = Math.min(totalHours, state.attendanceSettings.overtimeStart);
    const overtimeHours = Math.max(0, totalHours - state.attendanceSettings.overtimeStart);

    const updatedEntry: TimeEntry = {
      ...currentEntry,
      clockOut: clockOutTime,
      totalHours,
      regularHours,
      overtimeHours,
      lateMinutes: lateMinutes > state.attendanceSettings.lateThreshold ? lateMinutes : 0,
      status: 'clocked-out',
      notes: notes || currentEntry.notes,
      updatedAt: now.toISOString(),
    };

    dispatch({ type: 'CLOCK_OUT', payload: updatedEntry });
    calculateDailyBalance(updatedEntry.date);
  };

  const getCurrentTimeEntry = (): TimeEntry | null => {
    const today = new Date().toISOString().split('T')[0];
    return state.timeEntries.find(entry => 
      entry.date === today && entry.status === 'clocked-in'
    ) || null;
  };

  const getTodaysTimeEntry = (): TimeEntry | null => {
    const today = new Date().toISOString().split('T')[0];
    return state.timeEntries.find(entry => entry.date === today) || null;
  };

  const submitLeaveRequest = (requestData: Omit<LeaveRequest, 'id' | 'employeeId' | 'employee' | 'appliedDate' | 'status' | 'createdAt' | 'updatedAt'>) => {
    if (!state.currentEmployee) return;

    const request: LeaveRequest = {
      ...requestData,
      id: `leave_${Date.now()}`,
      employeeId: state.currentEmployee.id,
      employee: state.currentEmployee,
      appliedDate: new Date().toISOString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_LEAVE_REQUEST', payload: request });
  };

  const submitComplaint = (complaintData: Omit<Complaint, 'id' | 'employeeId' | 'employee' | 'status' | 'submittedDate' | 'createdAt' | 'updatedAt'>) => {
    if (!state.currentEmployee) return;

    const complaint: Complaint = {
      ...complaintData,
      id: `complaint_${Date.now()}`,
      employeeId: state.currentEmployee.id,
      employee: state.currentEmployee,
      status: 'submitted',
      submittedDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_COMPLAINT', payload: complaint });
  };

  const submitResignation = (resignationData: Omit<ResignationLetter, 'id' | 'employeeId' | 'employee' | 'status' | 'submittedDate' | 'createdAt' | 'updatedAt'>) => {
    if (!state.currentEmployee) return;

    const resignation: ResignationLetter = {
      ...resignationData,
      id: `resignation_${Date.now()}`,
      employeeId: state.currentEmployee.id,
      employee: state.currentEmployee,
      status: 'submitted',
      submittedDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'SET_RESIGNATION_LETTER', payload: resignation });
  };

  const calculateDailyBalance = (date: string) => {
    if (!state.currentEmployee) return;

    const timeEntry = state.timeEntries.find(entry => entry.date === date);
    if (!timeEntry) return;

    const hourlyRate = state.currentEmployee.salary / (52 * 40); // Assuming 40 hours/week
    const regularPay = (timeEntry.regularHours || 0) * hourlyRate;
    const overtimePay = (timeEntry.overtimeHours || 0) * hourlyRate * state.attendanceSettings.overtimeRate;
    const lateDeduction = (timeEntry.lateMinutes || 0) * state.attendanceSettings.lateDeductionRate;

    const totalEarnings = regularPay + overtimePay - lateDeduction;
    const runningBalance = state.dailyBalances.reduce((sum, balance) => sum + balance.totalEarnings, 0) + totalEarnings;

    const dailyBalance: DailyBalance = {
      id: `balance_${Date.now()}`,
      employeeId: state.currentEmployee.id,
      date,
      regularPay,
      overtimePay,
      lateDeduction,
      earlyLeaveDeduction: 0,
      bonuses: 0,
      totalEarnings,
      runningBalance,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_DAILY_BALANCE', payload: dailyBalance });
  };

  const getWeeklyHours = (): number => {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekStartStr = weekStart.toISOString().split('T')[0];
    
    return state.timeEntries
      .filter(entry => entry.date >= weekStartStr && entry.totalHours)
      .reduce((sum, entry) => sum + (entry.totalHours || 0), 0);
  };

  const getMonthlyHours = (): number => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthStartStr = monthStart.toISOString().split('T')[0];
    
    return state.timeEntries
      .filter(entry => entry.date >= monthStartStr && entry.totalHours)
      .reduce((sum, entry) => sum + (entry.totalHours || 0), 0);
  };

  const updateDashboardStats = () => {
    if (!state.currentEmployee) return;

    const todayEntry = getTodaysTimeEntry();
    const todayHours = todayEntry?.totalHours || 0;
    const weekHours = getWeeklyHours();
    const monthHours = getMonthlyHours();
    
    const totalEarnings = state.dailyBalances.reduce((sum, balance) => sum + balance.totalEarnings, 0);
    const overtimeHours = state.timeEntries.reduce((sum, entry) => sum + (entry.overtimeHours || 0), 0);
    const lateCount = state.timeEntries.filter(entry => (entry.lateMinutes || 0) > 0).length;

    const stats: EmployeeDashboardStats = {
      todayHours,
      weekHours,
      monthHours,
      totalEarnings,
      pendingBalance: totalEarnings,
      overtimeHours,
      lateCount,
      leaveBalance: {
        vacation: 20, // Mock data
        sick: 10,
        personal: 5,
      },
      upcomingPayDate: getNextPayDate(),
      recentTimeEntries: state.timeEntries.slice(0, 5),
      pendingRequests: {
        leaves: state.leaveRequests.filter(req => req.status === 'pending').length,
        complaints: state.complaints.filter(comp => comp.status === 'submitted').length,
      },
    };

    dispatch({ type: 'UPDATE_DASHBOARD_STATS', payload: stats });
  };

  const getNextPayDate = (): string => {
    if (!state.currentEmployee) return '';
    
    const today = new Date();
    const frequency = state.currentEmployee.payrollInfo.payFrequency;
    
    switch (frequency) {
      case 'weekly':
        const nextFriday = new Date(today);
        nextFriday.setDate(today.getDate() + (5 - today.getDay() + 7) % 7);
        return nextFriday.toISOString().split('T')[0];
      case 'biweekly':
        const nextBiweekly = new Date(today);
        nextBiweekly.setDate(today.getDate() + 14);
        return nextBiweekly.toISOString().split('T')[0];
      case 'monthly':
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        return nextMonth.toISOString().split('T')[0];
      default:
        return '';
    }
  };

  const cancelLeaveRequest = (id: string) => {
    const request = state.leaveRequests.find(req => req.id === id);
    if (request && request.status === 'pending') {
      const updatedRequest = { ...request, status: 'cancelled' as const };
      dispatch({ type: 'UPDATE_LEAVE_REQUEST', payload: updatedRequest });
    }
  };

  // Auto-update dashboard stats when data changes
  useEffect(() => {
    if (state.currentEmployee) {
      updateDashboardStats();
    }
  }, [state.timeEntries, state.dailyBalances, state.leaveRequests, state.complaints]);

  // Check for existing session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('employee-session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { employee: session.employee, session } });
        dispatch({ type: 'INITIALIZE_EMPLOYEE_DATA', payload: session.employee.id });
      } catch (error) {
        localStorage.removeItem('employee-session');
      }
    }
  }, []);

  const contextValue: EmployeeContextType = {
    ...state,
    login,
    logout,
    clockIn,
    clockOut,
    getCurrentTimeEntry,
    getTodaysTimeEntry,
    submitLeaveRequest,
    cancelLeaveRequest,
    submitComplaint,
    submitResignation,
    calculateDailyBalance,
    updateDashboardStats,
    getWeeklyHours,
    getMonthlyHours,
  };

  return (
    <EmployeeContext.Provider value={contextValue}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
}

// Mock data generators
function generateMockTimeEntries(employeeId: string): TimeEntry[] {
  const entries: TimeEntry[] = [];
  const today = new Date();
  
  // Generate entries for the last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const clockIn = `0${8 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 30)).padStart(2, '0')}:00`;
    const clockOut = `1${7 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 30)).padStart(2, '0')}:00`;
    
    const clockInTime = new Date(`2000-01-01 ${clockIn}`);
    const clockOutTime = new Date(`2000-01-01 ${clockOut}`);
    const totalHours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);
    const regularHours = Math.min(totalHours, 8);
    const overtimeHours = Math.max(0, totalHours - 8);
    const lateMinutes = clockInTime.getHours() > 8 ? (clockInTime.getHours() - 8) * 60 + clockInTime.getMinutes() : 0;
    
    entries.push({
      id: `time_${employeeId}_${i}`,
      employeeId,
      date: dateStr,
      clockIn,
      clockOut: i === 0 ? undefined : clockOut, // Today might not be clocked out yet
      totalHours: i === 0 ? undefined : totalHours,
      regularHours: i === 0 ? undefined : regularHours,
      overtimeHours: i === 0 ? undefined : overtimeHours,
      lateMinutes: lateMinutes > 15 ? lateMinutes : 0,
      status: i === 0 ? 'clocked-in' : 'clocked-out',
      createdAt: new Date(date).toISOString(),
      updatedAt: new Date(date).toISOString(),
    });
  }
  
  return entries;
}

function generateMockDailyBalances(employeeId: string): DailyBalance[] {
  const balances: DailyBalance[] = [];
  const today = new Date();
  let runningBalance = 0;
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const regularPay = 200 + Math.random() * 50; // $200-250 per day
    const overtimePay = Math.random() * 100; // 0-100 overtime
    const lateDeduction = Math.random() * 20; // 0-20 deduction
    const totalEarnings = regularPay + overtimePay - lateDeduction;
    runningBalance += totalEarnings;
    
    balances.push({
      id: `balance_${employeeId}_${i}`,
      employeeId,
      date: dateStr,
      regularPay,
      overtimePay,
      lateDeduction,
      earlyLeaveDeduction: 0,
      bonuses: 0,
      totalEarnings,
      runningBalance,
      createdAt: new Date(date).toISOString(),
    });
  }
  
  return balances;
}

function generateMockLeaveRequests(employeeId: string): LeaveRequest[] {
  return []; // Empty for now, will be populated when employee submits requests
}
