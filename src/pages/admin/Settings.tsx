import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Database,
  Bell,
  Palette,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
  Users,
  MapPin,
  AlertCircle
} from "lucide-react";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [publicAccess, setPublicAccess] = useState(false);

  const adminUsers = [
    {
      id: 1,
      name: "Admin User 1",
      email: "admin1@fraatlas.gov.in",
      role: "Super Admin",
      status: "Active",
      lastLogin: "2024-01-15 10:30 AM"
    },
    {
      id: 2,
      name: "Admin User 2", 
      email: "admin2@fraatlas.gov.in",
      role: "Data Manager",
      status: "Active",
      lastLogin: "2024-01-14 3:45 PM"
    },
    {
      id: 3,
      name: "Admin User 3",
      email: "admin3@fraatlas.gov.in", 
      role: "Reviewer",
      status: "Inactive",
      lastLogin: "2024-01-10 9:15 AM"
    }
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="flex flex-col h-full">
        <div className="flex-none p-6 border-b border-glass-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">System Settings</h1>
              <p className="text-muted-foreground">
                Configure system preferences and manage user access
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="glass-card">
              <TabsTrigger value="general">
                <SettingsIcon className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="users">
                <Users className="h-4 w-4 mr-2" />
                User Management
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="data">
                <Database className="h-4 w-4 mr-2" />
                Data Management
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-card border-glass-border">
                  <CardHeader>
                    <CardTitle>System Information</CardTitle>
                    <CardDescription>Basic system configuration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="system-name">System Name</Label>
                      <Input 
                        id="system-name" 
                        defaultValue="FRA Atlas" 
                        className="glass-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="system-version">Version</Label>
                      <Input 
                        id="system-version" 
                        defaultValue="v2.1.0" 
                        disabled
                        className="glass-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Contact Email</Label>
                      <Input 
                        id="contact-email" 
                        defaultValue="support@fraatlas.gov.in"
                        className="glass-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="ist">
                        <SelectTrigger className="glass-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                          <SelectItem value="utc">UTC (UTC+0:00)</SelectItem>
                          <SelectItem value="est">EST (UTC-5:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-glass-border">
                  <CardHeader>
                    <CardTitle>Regional Settings</CardTitle>
                    <CardDescription>Geographic and localization preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-region">Default Region</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="glass-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Regions</SelectItem>
                          <SelectItem value="north">North Zone</SelectItem>
                          <SelectItem value="south">South Zone</SelectItem>
                          <SelectItem value="east">East Zone</SelectItem>
                          <SelectItem value="west">West Zone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Default Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger className="glass-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिंदी</SelectItem>
                          <SelectItem value="ta">தமிழ்</SelectItem>
                          <SelectItem value="te">తెలుగు</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="inr">
                        <SelectTrigger className="glass-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inr">INR (₹)</SelectItem>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                  <CardDescription>Configure general system behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Public Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow read-only access to verified claims data
                      </p>
                    </div>
                    <Switch 
                      checked={publicAccess} 
                      onCheckedChange={setPublicAccess}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Save Changes</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically save form data while editing
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Use dark theme for better visibility
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Administrator Accounts</h3>
                  <p className="text-sm text-muted-foreground">Manage admin user access and permissions</p>
                </div>
                <Button className="gap-2">
                  <User className="h-4 w-4" />
                  Add New Admin
                </Button>
              </div>

              <Card className="glass-card border-glass-border">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-glass-border/50">
                        <tr>
                          <th className="text-left p-4 font-medium">User</th>
                          <th className="text-left p-4 font-medium">Role</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Last Login</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminUsers.map((user) => (
                          <tr key={user.id} className="border-b border-glass-border/50 last:border-0">
                            <td className="p-4">
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge variant="outline">{user.role}</Badge>
                            </td>
                            <td className="p-4">
                              <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                                {user.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <span className="text-sm">{user.lastLogin}</span>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">Edit</Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-card border-glass-border">
                  <CardHeader>
                    <CardTitle>Authentication</CardTitle>
                    <CardDescription>Secure access configuration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input 
                        id="session-timeout" 
                        type="number" 
                        defaultValue="60"
                        className="glass-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-attempts">Max Login Attempts</Label>
                      <Input 
                        id="max-attempts" 
                        type="number" 
                        defaultValue="3"
                        className="glass-input"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable 2FA for all admin accounts
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-glass-border">
                  <CardHeader>
                    <CardTitle>Access Control</CardTitle>
                    <CardDescription>System access restrictions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="allowed-domains">Allowed Email Domains</Label>
                      <Textarea 
                        id="allowed-domains"
                        placeholder="@gov.in&#10;@fraatlas.gov.in"
                        className="glass-input"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>IP Restriction</Label>
                        <p className="text-sm text-muted-foreground">
                          Restrict access to specific IP ranges
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-card border-glass-border">
                  <CardHeader>
                    <CardTitle>Backup & Recovery</CardTitle>
                    <CardDescription>Data protection and backup settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic Backups</Label>
                        <p className="text-sm text-muted-foreground">
                          Schedule daily system backups
                        </p>
                      </div>
                      <Switch 
                        checked={autoBackup} 
                        onCheckedChange={setAutoBackup}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-time">Backup Time</Label>
                      <Input 
                        id="backup-time" 
                        type="time" 
                        defaultValue="02:00"
                        className="glass-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retention">Retention Period (days)</Label>
                      <Input 
                        id="retention" 
                        type="number" 
                        defaultValue="30"
                        className="glass-input"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="gap-2">
                        <Download className="h-3 w-3" />
                        Download Backup
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Upload className="h-3 w-3" />
                        Restore
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-glass-border">
                  <CardHeader>
                    <CardTitle>Data Cleanup</CardTitle>
                    <CardDescription>Manage old and temporary data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Temporary Files</p>
                          <p className="text-sm text-muted-foreground">2.3 GB</p>
                        </div>
                        <Button size="sm" variant="outline">Clean</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Old Logs</p>
                          <p className="text-sm text-muted-foreground">1.8 GB</p>
                        </div>
                        <Button size="sm" variant="outline">Clean</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Cache Data</p>
                          <p className="text-sm text-muted-foreground">892 MB</p>
                        </div>
                        <Button size="sm" variant="outline">Clear</Button>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-glass-border/50">
                      <Button variant="destructive" size="sm" className="w-full gap-2">
                        <AlertCircle className="h-3 w-3" />
                        Full System Cleanup
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure alert and notification settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive critical alerts via SMS
                        </p>
                      </div>
                      <Switch 
                        checked={smsNotifications} 
                        onCheckedChange={setSmsNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about system issues
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Submissions</Label>
                        <p className="text-sm text-muted-foreground">
                          Alert when new claims are submitted
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-glass-border/50">
                    <div className="space-y-4">
                      <h4 className="font-medium">Email Settings</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="smtp-server">SMTP Server</Label>
                          <Input 
                            id="smtp-server" 
                            placeholder="smtp.gmail.com"
                            className="glass-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtp-port">Port</Label>
                          <Input 
                            id="smtp-port" 
                            placeholder="587"
                            className="glass-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email-username">Username</Label>
                          <Input 
                            id="email-username" 
                            placeholder="notifications@fraatlas.gov.in"
                            className="glass-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email-password">Password</Label>
                          <Input 
                            id="email-password" 
                            type="password"
                            placeholder="••••••••"
                            className="glass-input"
                          />
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Test Email Configuration</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;