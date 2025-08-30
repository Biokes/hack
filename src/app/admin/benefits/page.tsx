'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Heart, Shield, Umbrella, Plus } from 'lucide-react';

export default function BenefitsPage() {
  const benefits = [
    {
      id: 1,
      name: 'Health Insurance',
      description: 'Comprehensive medical coverage for employees and families',
      type: 'health',
      cost: '$200/month',
      enrollment: '85%',
      status: 'active',
      icon: Heart,
    },
    {
      id: 2,
      name: 'Dental Insurance',
      description: 'Full dental coverage including preventive and major services',
      type: 'dental',
      cost: '$50/month',
      enrollment: '72%',
      status: 'active',
      icon: Shield,
    },
    {
      id: 3,
      name: '401(k) Retirement Plan',
      description: 'Company matching retirement savings plan',
      type: 'retirement',
      cost: '3% match',
      enrollment: '68%',
      status: 'active',
      icon: CreditCard,
    },
    {
      id: 4,
      name: 'Life Insurance',
      description: 'Basic life insurance coverage for all employees',
      type: 'insurance',
      cost: '$25/month',
      enrollment: '90%',
      status: 'active',
      icon: Umbrella,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Benefits</h2>
          <p className="text-muted-foreground">
            Manage employee benefits packages and enrollment.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Benefit
        </Button>
      </div>

      {/* Benefits Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Benefits</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{benefits.length}</div>
            <p className="text-xs text-muted-foreground">
              Available benefit plans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Enrollment</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">79%</div>
            <p className="text-xs text-muted-foreground">
              Employee participation rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,375</div>
            <p className="text-xs text-muted-foreground">
              Monthly per employee
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <Umbrella className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{benefits.filter(b => b.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">
              Currently available
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Benefits List */}
      <Card>
        <CardHeader>
          <CardTitle>Benefits Overview</CardTitle>
          <CardDescription>
            Manage all employee benefit programs and their enrollment status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((benefit) => (
              <Card key={benefit.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold">{benefit.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Cost: </span>
                          <span className="font-medium">{benefit.cost}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Enrollment: </span>
                          <span className="font-medium">{benefit.enrollment}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{benefit.status}</Badge>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Manage Enrollment
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enrollment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Enrollment Summary</CardTitle>
          <CardDescription>
            Quick overview of benefit enrollment across the organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <benefit.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{benefit.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-muted-foreground">
                    {benefit.enrollment} enrolled
                  </div>
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: benefit.enrollment }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
