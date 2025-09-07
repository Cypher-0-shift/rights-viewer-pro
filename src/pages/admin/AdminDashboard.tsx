import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Upload,
  Map,
  Brain,
  TrendingUp,
  Users,
  MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock data - replace with real data from your backend
  const stats = [
    {
      title: "Total Claims",
      value: "2,847",
      icon: <FileText className="h-6 w-6 text-primary" />,
      description: "All FRA claims in database",
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Verified Claims",
      value: "1,923",
      icon: <CheckCircle className="h-6 w-6 text-status-verified" />,
      description: "Successfully verified",
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Pending Review",
      value: "624",
      icon: <Clock className="h-6 w-6 text-status-pending" />,
      description: "Awaiting verification",
      trend: { value: -5, isPositive: false }
    },
    {
      title: "Rejected Claims",
      value: "300",
      icon: <XCircle className="h-6 w-6 text-status-rejected" />,
      description: "Not eligible or incomplete",
      trend: { value: 2, isPositive: false }
    }
  ];

  const quickActions = [
    {
      title: "Upload Documents",
      description: "Add new FRA claim documents with OCR processing",
      icon: <Upload className="h-6 w-6" />,
      action: () => navigate('/admin/upload'),
      variant: "default" as const
    },
    {
      title: "View GIS Map",
      description: "Interactive mapping of all claims and boundaries",
      icon: <Map className="h-6 w-6" />,
      action: () => navigate('/admin/map'),
      variant: "secondary" as const
    },
    {
      title: "Decision Support",
      description: "AI-powered recommendations for schemes",
      icon: <Brain className="h-6 w-6" />,
      action: () => navigate('/admin/dss'),
      variant: "glass" as const
    }
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage FRA claims, documents, and system configuration
            </p>
          </div>
          <Button 
            variant="default" 
            onClick={() => navigate('/admin/claims')}
            className="px-6"
          >
            <FileText className="mr-2 h-4 w-4" />
            Manage Claims
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <div key={index} className="glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
                 onClick={action.action}>
              <div className="flex items-start space-x-4">
                <div className="glass-card p-3 rounded-xl">
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                  <Button variant={action.variant} size="sm">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Claims */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Claims</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/claims')}>
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { id: "FRA-2024-001", claimant: "Ravi Kumar", village: "Bandhavgarh", status: "pending" },
                { id: "FRA-2024-002", claimant: "Sita Devi", village: "Kanha", status: "verified" },
                { id: "FRA-2024-003", claimant: "Ramesh Singh", village: "Pench", status: "pending" },
                { id: "FRA-2024-004", claimant: "Lakshmi Bai", village: "Satpura", status: "verified" },
              ].map((claim) => (
                <div key={claim.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="glass-card p-2 rounded-lg">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{claim.claimant}</p>
                      <p className="text-sm text-muted-foreground">{claim.village} • {claim.id}</p>
                    </div>
                  </div>
                  <span className={`status-${claim.status}`}>
                    {claim.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Analytics */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">System Analytics</h3>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Claims Processing Rate</span>
                  <span className="text-sm text-status-verified">87%</span>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 bg-gradient-primary rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Data Quality Score</span>
                  <span className="text-sm text-status-verified">92%</span>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 bg-gradient-secondary rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-4 w-4 text-primary mr-1" />
                    <span className="text-sm font-medium">Active Users</span>
                  </div>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="h-4 w-4 text-secondary mr-1" />
                    <span className="text-sm font-medium">Districts</span>
                  </div>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;