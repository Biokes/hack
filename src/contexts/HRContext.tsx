'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Employee, PayrollPeriod, PaySlip, DashboardStats } from '@/types';
import { mockEmployees, mockPayrollPeriods, mockPaySlips } from '@/lib/mock-data';

interface HRState {
  employees: Employee[];
  payrollPeriods: PayrollPeriod[];
  paySlips: PaySlip[];
  dashboardStats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  isHR: boolean;
}

type HRAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_HR'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_EMPLOYEES'; payload: Employee[] }
  | { type: 'ADD_EMPLOYEE'; payload: Employee }
  | { type: 'UPDATE_EMPLOYEE'; payload: Employee }
  | { type: 'DELETE_EMPLOYEE'; payload: string }
  | { type: 'SET_PAYROLL_PERIODS'; payload: PayrollPeriod[] }
  | { type: 'ADD_PAYROLL_PERIOD'; payload: PayrollPeriod }
  | { type: 'UPDATE_PAYROLL_PERIOD'; payload: PayrollPeriod }
  | { type: 'DELETE_PAYROLL_PERIOD'; payload: string }
  | { type: 'SET_PAY_SLIPS'; payload: PaySlip[] }
  | { type: 'SET_DASHBOARD_STATS'; payload: DashboardStats }
  | { type: 'INITIALIZE_DATA' };

const initialState: HRState = {
  employees: [],
  payrollPeriods: [],
  paySlips: [],
  dashboardStats: null,
  loading: false,
  error: null,
  isHR: true
};

function hrReducer(state: HRState, action: HRAction): HRState {
  switch (action.type) {
    case "TOGGLE_HR":
      return {...state , isHR:action.payload}
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_EMPLOYEES':
      return { ...state, employees: action.payload };
    
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [...state.employees, action.payload] };
    
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(emp => 
          emp.id === action.payload.id ? action.payload : emp
        )
      };
    
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload)
      };
    
    case 'SET_PAYROLL_PERIODS':
      return { ...state, payrollPeriods: action.payload };
    
    case 'ADD_PAYROLL_PERIOD':
      return { ...state, payrollPeriods: [...state.payrollPeriods, action.payload] };
    
    case 'UPDATE_PAYROLL_PERIOD':
      return {
        ...state,
        payrollPeriods: state.payrollPeriods.map(period => 
          period.id === action.payload.id ? action.payload : period
        )
      };
    
    case 'DELETE_PAYROLL_PERIOD':
      return {
        ...state,
        payrollPeriods: state.payrollPeriods.filter(period => period.id !== action.payload)
      };
    
    case 'SET_PAY_SLIPS':
      return { ...state, paySlips: action.payload };
    
    case 'SET_DASHBOARD_STATS':
      return { ...state, dashboardStats: action.payload };
    
    case 'INITIALIZE_DATA':
      return {
        ...state,
        employees: mockEmployees,
        payrollPeriods: mockPayrollPeriods,
        paySlips: mockPaySlips,
        loading: false,
      };
    
    default:
      return state;
  }
}

interface HRContextType extends HRState {
  // Employee actions
  addEmployee: (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
  getEmployee: (id: string) => Employee | undefined;
  
  // Payroll actions
  addPayrollPeriod: (period: Omit<PayrollPeriod, 'id' | 'createdAt'>) => void;
  updatePayrollPeriod: (period: PayrollPeriod) => void;
  deletePayrollPeriod: (id: string) => void;
  getPayrollPeriod: (id: string) => PayrollPeriod | undefined;
  
  // Utility functions
  calculateDashboardStats: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  toggleHrMode: () => void;
}

const HRContext = createContext<HRContextType | undefined>(undefined);

export function HRProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(hrReducer, initialState);

  // Initialize data from localStorage or use mock data
  useEffect(() => {
    const savedData = localStorage.getItem('hr-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        dispatch({ type: 'SET_EMPLOYEES', payload: parsed.employees || [] });
        dispatch({ type: 'SET_PAYROLL_PERIODS', payload: parsed.payrollPeriods || [] });
        dispatch({ type: 'SET_PAY_SLIPS', payload: parsed.paySlips || [] });
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        dispatch({ type: 'INITIALIZE_DATA' });
      }
    } else {
      dispatch({ type: 'INITIALIZE_DATA' });
    }
  }, []);

  // Calculate dashboard stats whenever data changes
  useEffect(() => {
    calculateDashboardStats();
  }, [state.employees, state.payrollPeriods]);

  const addEmployee = (employeeData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => {
    const employee: Employee = {
      ...employeeData,
      id: `emp_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_EMPLOYEE', payload: employee });
  };

  const updateEmployee = (employee: Employee) => {
    const updatedEmployee = {
      ...employee,
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'UPDATE_EMPLOYEE', payload: updatedEmployee });
  };

  const deleteEmployee = (id: string) => {
    dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
  };

  const getEmployee = (id: string) => {
    return state.employees.find(emp => emp.id === id);
  };

  const addPayrollPeriod = (periodData: Omit<PayrollPeriod, 'id' | 'createdAt'>) => {
    const period: PayrollPeriod = {
      ...periodData,
      id: `payroll_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_PAYROLL_PERIOD', payload: period });
  };

  const updatePayrollPeriod = (period: PayrollPeriod) => {
    dispatch({ type: 'UPDATE_PAYROLL_PERIOD', payload: period });
  };

  const deletePayrollPeriod = (id: string) => {
    dispatch({ type: 'DELETE_PAYROLL_PERIOD', payload: id });
  };

  const getPayrollPeriod = (id: string) => {
    return state.payrollPeriods.find(period => period.id === id);
  };

  const calculateDashboardStats = () => {
    const activeEmployees = state.employees.filter(emp => emp.status === 'active');
    const totalPayroll = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);
    const avgSalary = activeEmployees.length > 0 ? totalPayroll / activeEmployees.length : 0;

    // Department breakdown
    const departmentMap = new Map();
    activeEmployees.forEach(emp => {
      if (!departmentMap.has(emp.department)) {
        departmentMap.set(emp.department, { count: 0, totalSalary: 0 });
      }
      const dept = departmentMap.get(emp.department);
      dept.count += 1;
      dept.totalSalary += emp.salary;
    });

    const departmentBreakdown = Array.from(departmentMap.entries()).map(([department, data]) => ({
      department,
      count: data.count,
      totalSalary: data.totalSalary,
      avgSalary: data.totalSalary / data.count,
    }));

    // Recent hires (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentHires = state.employees.filter(emp => 
      new Date(emp.hireDate) >= thirtyDaysAgo
    ).slice(0, 5);

    // Upcoming payrolls
    const upcomingPayrolls = state.payrollPeriods
      .filter(period => period.status === 'draft' || period.status === 'processed')
      .sort((a, b) => new Date(a.payDate).getTime() - new Date(b.payDate).getTime())
      .slice(0, 3);

    const dashboardStats: DashboardStats = {
      totalEmployees: state.employees.length,
      activeEmployees: activeEmployees.length,
      totalPayroll,
      avgSalary,
      departmentBreakdown,
      recentHires,
      upcomingPayrolls,
    };

    dispatch({ type: 'SET_DASHBOARD_STATS', payload: dashboardStats });
  };

  const saveToLocalStorage = () => {
    const dataToSave = {
      employees: state.employees,
      payrollPeriods: state.payrollPeriods,
      paySlips: state.paySlips,
    };
    localStorage.setItem('hr-data', JSON.stringify(dataToSave));
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('hr-data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      dispatch({ type: 'SET_EMPLOYEES', payload: parsed.employees || [] });
      dispatch({ type: 'SET_PAYROLL_PERIODS', payload: parsed.payrollPeriods || [] });
      dispatch({ type: 'SET_PAY_SLIPS', payload: parsed.paySlips || [] });
    }
  };
  const toggleHrMode = () => { 
    dispatch({type:"TOGGLE_HR",payload: !state.isHR})
  }
  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    if (state.employees.length > 0 || state.payrollPeriods.length > 0) {
      saveToLocalStorage();
    }
  }, [state.employees, state.payrollPeriods, state.paySlips]);

  const contextValue: HRContextType = {
    ...state,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    addPayrollPeriod,
    updatePayrollPeriod,
    deletePayrollPeriod,
    getPayrollPeriod,
    calculateDashboardStats,
    saveToLocalStorage,
    loadFromLocalStorage,
    toggleHrMode
  };

  return (
    <HRContext.Provider value={contextValue}>
      {children}
    </HRContext.Provider>
  );
}

export function useHR() {
  const context = useContext(HRContext);
  if (context === undefined) {
    throw new Error('useHR must be used within an HRProvider');
  }
  return context;
}
