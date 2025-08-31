'use client';

import { useState, useEffect } from 'react';
import { Employee, EmployeeFormData } from '@/types';
import { useHR } from '@/contexts/HRContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface EmployeeFormDialogProps {
  employee?: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const initialFormData: EmployeeFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  position: '',
  department: '',
  hireDate: '',
  salary: '',
  status: 'active',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  },
  emergencyContact: {
    name: '',
    relationship: '',
    phone: '',
    email: '',
  },
  payrollInfo: {
    bankAccount: '',
    routingNumber: '',
    taxId: '',
    payFrequency: 'biweekly',
    allowances: 0,
  },
};

const departments = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
];

const positions = [
  'Software Engineer',
  'Senior Software Engineer',
  'Staff Engineer',
  'Engineering Manager',
  'Product Manager',
  'Senior Product Manager',
  'UX Designer',
  'UI Designer',
  'Marketing Manager',
  'Sales Manager',
  'HR Manager',
  'Accountant',
  'Operations Manager',
];

export function EmployeeFormDialog({ employee, open, onOpenChange, onSuccess }: EmployeeFormDialogProps) {
  const { addEmployee, updateEmployee } = useHR();
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const isEditing = !!employee;

  // Load employee data when editing
  useEffect(() => {
    if (employee && open) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        department: employee.department,
        hireDate: employee.hireDate,
        salary: employee.salary.toString(),
        status: employee.status,
        address: employee.address,
        emergencyContact: employee.emergencyContact,
        payrollInfo: {
          bankAccount: employee.payrollInfo.bankAccount,
          routingNumber: employee.payrollInfo.routingNumber,
          taxId: employee.payrollInfo.taxId,
          payFrequency: employee.payrollInfo.payFrequency,
          allowances: employee.payrollInfo.allowances,
        },
      });
    } else if (open) {
      setFormData(initialFormData);
    }
  }, [employee, open]);

  const handleInputChange = (field: string, value: string | number) => {
    const keys = field.split('.');
    if (keys.length === 1) {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else if (keys.length === 2) {
      setFormData(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0] as keyof EmployeeFormData] as any,
          [keys[1]]: value,
        },
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.firstName || !formData.lastName) {
      toast.error('First name and last name are required');
      return false;
    }
    if (!formData.email || !formData.email.includes('@')) {
      toast.error('Valid email address is required');
      return false;
    }
    if (!formData.position || !formData.department) {
      toast.error('Position and department are required');
      return false;
    }
    if (!formData.hireDate) {
      toast.error('Hire date is required');
      return false;
    }
    if (!formData.salary || parseFloat(formData.salary) <= 0) {
      toast.error('Valid salary is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const employeeData = {
        employeeId: employee?.employeeId || `EMP${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: "",
        position: formData.position,
        department: formData.department,
        hireDate: formData.hireDate,
        salary: parseFloat(formData.salary),
        status: formData.status,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        payrollInfo: {
          ...formData.payrollInfo,
          deductions: employee?.payrollInfo.deductions || [],
        },
      };

      if (isEditing && employee) {
        updateEmployee({ ...employee, ...employeeData });
        toast.success('Employee updated successfully');
      } else {
        addEmployee(employeeData as any);
        toast.success('Employee added successfully');
      }

      onSuccess();
    } catch (error) {
      toast.error('Failed to save employee');
      console.error('Error saving employee:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Employee' : 'Add New Employee'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update employee information below.'
              : 'Fill in the information to add a new employee.'}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            {/* <TabsTrigger value="payroll">Payroll</TabsTrigger> */}
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic employee details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>

                <div className="space-y-2 hidden">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Employment Details</CardTitle>
                <CardDescription>Job position and employment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position *</Label>
                    <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map(position => (
                          <SelectItem key={position} value={position}>{position}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hireDate">Hire Date *</Label>
                    <Input
                      id="hireDate"
                      type="date"
                      value={formData.hireDate}
                      onChange={(e) => handleInputChange('hireDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="terminated">Terminated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Annual Salary *</Label>
                  <Input
                    id="salary" 
                    type="number"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    placeholder="Enter annual salary"
                    min="0"
                    step="1000"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* <TabsContent value="payroll" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Information</CardTitle>
                <CardDescription>Banking and tax information for payroll processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payFrequency">Pay Frequency</Label>
                  <Select 
                    value={formData.payrollInfo.payFrequency} 
                    onValueChange={(value) => handleInputChange('payrollInfo.payFrequency', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update Employee' : 'Add Employee')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
