import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CheckCircle,
  Clock,
  Map,
  Brain,
  TrendingUp,
  MapPin,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  // Mock data for read-only user dashboard
  const stats = [
    {
      title: "Total Claims in District",
      value: "2,847",
      icon: <FileText className="h-6 w-6 text-primary" />,
      description: "All FRA claims in your region"
    },
    {
      title: "Verification Rate",
      value: "67.5%",
      icon: <CheckCircle className="h-6 w-6 text-status-verified" />,
      description: "Successfully verified claims"
    },
    {
      title: "Pending Claims",
      value: "624",
      icon: <Clock className="h-6 w-6 text-status-pending" />,
      description: "Awaiting verification"
    },
    {
      title: "Coverage Area",
      value: "15,240",
      icon: <MapPin className="h-6 w-6 text-secondary" />,
      description: "Hectares under FRA claims"
    }
  ];

  const exploreOptions = [
    {
      title: "View Claims Database",
      description: "Browse and filter forest rights claims in your region",
      icon: <FileText className="h-6 w-6" />,
      action: () => navigate('/user/claims'),
      variant: "default" as const
    },
    {
      title: "Interactive GIS Map",
      description: "Explore claims on detailed geographical maps",
      icon: <Map className="h-6 w-6" />,
      action: () => navigate('/user/map'),
      variant: "secondary" as const
    },
    {
      title: "Scheme Recommendations",
      description: "View AI-powered development scheme suggestions",
      icon: <Brain className="h-6 w-6" />,
      action: () => navigate('/user/dss'),
      variant: "glass" as const
    }
  ];

  return (
    <DashboardLayout userType="user">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">User Dashboard</h1>
            <p className="text-muted-foreground">
              Explore forest rights claims data and interactive visualizations
            </p>
          </div>
          <Button 
            variant="default" 
            onClick={() => navigate('/user/map')}
            className="px-6"
          >
            <Map className="mr-2 h-4 w-4" />
            Explore Map
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
            />
          ))}
        </div>

        {/* Explore Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {exploreOptions.map((option, index) => (
            <div key={index} className="glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
                 onClick={option.action}>
              <div className="flex items-start space-x-4">
                <div className="glass-card p-3 rounded-xl">
                  {option.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                  <Button variant={option.variant} size="sm">
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Data Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* District Overview */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">District Overview</h3>
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-4">
              {[
                { district: "Bastar", claims: 1247, verified: 856, percentage: 69 },
                { district: "Dantewada", claims: 892, verified: 634, percentage: 71 },
                { district: "Sukma", claims: 708, verified: 445, percentage: 63 },
              ].map((district) => (
                <div key={district.district} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{district.district}</span>
                    <span className="text-sm text-muted-foreground">
                      {district.verified}/{district.claims} verified
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div 
                      className="h-2 bg-gradient-primary rounded-full" 
                      style={{ width: `${district.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {district.percentage}% verification rate
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Updates</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/user/claims')}>
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { 
                  type: "verification", 
                  message: "125 new claims verified in Bastar district",
                  time: "2 hours ago",
                  icon: <CheckCircle className="h-4 w-4 text-status-verified" />
                },
                { 
                  type: "upload", 
                  message: "New GIS boundaries updated for Sukma region",
                  time: "1 day ago",
                  icon: <Map className="h-4 w-4 text-secondary" />
                },
                { 
                  type: "recommendation", 
                  message: "Updated scheme recommendations available",
                  time: "2 days ago",
                  icon: <Brain className="h-4 w-4 text-accent-dark" />
                },
                { 
                  type: "data", 
                  message: "Monthly analytics report generated",
                  time: "3 days ago",
                  icon: <TrendingUp className="h-4 w-4 text-primary" />
                },
              ].map((update, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="glass-card p-2 rounded-lg shrink-0">
                    {update.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-1">{update.message}</p>
                    <p className="text-xs text-muted-foreground">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Geographic Distribution</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/user/map')}>
              View on Map
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="glass-card p-4 rounded-xl mb-3 mx-auto w-fit">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold mb-1">8</p>
              <p className="text-sm text-muted-foreground">Active Districts</p>
            </div>
            <div className="text-center">
              <div className="glass-card p-4 rounded-xl mb-3 mx-auto w-fit">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <p className="text-2xl font-bold mb-1">342</p>
              <p className="text-sm text-muted-foreground">Villages Covered</p>
            </div>
            <div className="text-center">
              <div className="glass-card p-4 rounded-xl mb-3 mx-auto w-fit">
                <TrendingUp className="h-6 w-6 text-accent-dark" />
              </div>
              <p className="text-2xl font-bold mb-1">15.2K</p>
              <p className="text-sm text-muted-foreground">Hectares Mapped</p>
            </div>
            <div className="text-center">
              <div className="glass-card p-4 rounded-xl mb-3 mx-auto w-fit">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold mb-1">67.5%</p>
              <p className="text-sm text-muted-foreground">Avg. Verification</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;