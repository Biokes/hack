'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Settings as SettingsIcon,
  Building,
  Bell,
  Shield,
  Users,
  DollarSign,
  Mail,
  Globe,
  Database,
  Save
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your HR system preferences and configurations.
          </p>
        </div>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>
                Update your company details and branding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Acme Corporation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-id">Company ID</Label>
                  <Input id="company-id" defaultValue="ACME-001" disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Business St, City, State 12345" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="info@acme.com" />
                </div>
              </div>
              {/* 
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="america-new-york">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-new-york">America/New_York</SelectItem>
                    <SelectItem value="america-chicago">America/Chicago</SelectItem>
                    <SelectItem value="america-denver">America/Denver</SelectItem>
                    <SelectItem value="america-los-angeles">America/Los_Angeles</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Payroll Configuration
              </CardTitle>
              <CardDescription>
                Configure payroll settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pay-frequency">Default Pay Frequency</Label>
                  <Select defaultValue="biweekly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Weekly</SelectItem>
                      <SelectItem value="weekly">Daily</SelectItem>
                      <SelectItem value="biweekly">Hourly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency for Payment</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USDT ($)</SelectItem>
                      <SelectItem value="eur">ETHER (€)</SelectItem>
                      <SelectItem value="gbp">USDC (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="tax-id">Federal Tax ID (EIN)</Label>
                <Input id="tax-id" defaultValue="12-3456789" />
              </div> */}

              {/* <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state-tax">State Tax Rate (%)</Label>
                  <Input id="state-tax" type="number" defaultValue="5.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overtime-rate">Overtime Rate Multiplier</Label>
                  <Input id="overtime-rate" type="number" defaultValue="1.5" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="auto-payroll" defaultChecked />
                <Label htmlFor="auto-payroll">Enable automatic payroll processing</Label>
              </div> */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Manage how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Employee Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new employees are added
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Payroll Processing</Label>
                    <p className="text-sm text-muted-foreground">
                      Alerts for payroll processing status
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about system maintenance and updates
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Performance Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Monthly performance and analytics reports
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage security and access control settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-4">
                {/* <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div> */}

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="emergency-withdrawal">Emergency Withdrawal</Label>
                  <Input id="emergency-withdrawal" type="number" defaultValue="0"  />
                </div>

                <div className="space-y-2 hidden">
                  <Label htmlFor="password-policy">Password Policy</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {/* <SelectItem value="basic">Basic (8+ characters)</SelectItem> */}
                      <SelectItem value="strong">Strong (8+ chars, numbers, symbols)</SelectItem>
                      <SelectItem value="complex">Complex (12+ chars, mixed case, numbers, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Pause Paymments</Label>
                    <p className="text-sm text-muted-foreground">
                      Pause all payout to Employees
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4 relative max-h-[160px]">
          <Card className="relative overflow-hidden">
            {/* Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[1px]">
              <h2 className="text-lg font-semibold">🚧 Coming Soon</h2>
              <p className="text-sm text-muted-foreground">Integrations will be available soon.</p>
            </div>

            {/* Content underneath (dimmed, no blur) */}
            <div className="opacity-70 pointer-events-none">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Globe className="h-4 w-4" />
                  Integrations
                </CardTitle>
                <CardDescription className="text-xs">
                  Connect with external services and APIs.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-6 w-6 text-blue-500" />
                    <div>
                      <h4 className="text-sm font-medium">Email Service</h4>
                      <p className="text-xs text-muted-foreground">SendGrid</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Database className="h-6 w-6 text-green-500" />
                    <div>
                      <h4 className="text-sm font-medium">Database Backup</h4>
                      <p className="text-xs text-muted-foreground">Daily backups</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </TabsContent>


      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
