import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Brain, 
  Map, 
  TrendingUp, 
  Users, 
  Droplets, 
  Zap,
  Leaf,
  Home,
  Target,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

const DSS = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");

  const recommendations = [
    {
      id: 1,
      scheme: "Jal Jeevan Mission",
      priority: "High",
      affectedClaims: 156,
      description: "Water connectivity for forest villages with approved IFR claims",
      impact: "Improved water access for 750+ families",
      status: "Ready for Implementation",
      icon: Droplets,
      color: "blue"
    },
    {
      id: 2,
      scheme: "PM-KISAN Support",
      priority: "Medium",
      affectedClaims: 89,
      description: "Agricultural support for CFR holders with cultivation rights",
      impact: "Enhanced livelihood for 400+ farmers",
      status: "Under Review",
      icon: Leaf,
      color: "green"
    },
    {
      id: 3,
      scheme: "Solar Grid Extension",
      priority: "High",
      affectedClaims: 203,
      description: "Renewable energy access for remote FRA settlements",
      impact: "Electricity for 900+ households",
      status: "Pending Approval",
      icon: Zap,
      color: "yellow"
    },
    {
      id: 4,
      scheme: "Housing Development",
      priority: "Medium",
      affectedClaims: 134,
      description: "Improved housing infrastructure for verified claim holders",
      impact: "Better living conditions for 600+ families",
      status: "Planning Phase",
      icon: Home,
      color: "purple"
    }
  ];

  const insights = [
    {
      title: "Claims Concentration",
      value: "67%",
      description: "in water-scarce regions",
      trend: "+12%",
      icon: Target
    },
    {
      title: "Implementation Success",
      value: "89%",
      description: "scheme completion rate",
      trend: "+5%",
      icon: CheckCircle
    },
    {
      title: "Priority Interventions",
      value: "24",
      description: "require immediate action",
      trend: "-3",
      icon: AlertCircle
    },
    {
      title: "Average Timeline",
      value: "8.5mo",
      description: "scheme to completion",
      trend: "-1.2mo",
      icon: Clock
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "outline";
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready for Implementation": return "default";
      case "Under Review": return "outline";
      case "Pending Approval": return "secondary";
      case "Planning Phase": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <DashboardLayout userType="admin">
      <div className="flex flex-col h-full">
        <div className="flex-none p-6 border-b border-glass-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Decision Support System</h1>
              <p className="text-muted-foreground">
                AI-powered recommendations for FRA scheme implementations
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select 
                className="glass-card px-4 py-2 rounded-lg border border-glass-border"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="all">All Regions</option>
                <option value="north">North Zone</option>
                <option value="south">South Zone</option>
                <option value="east">East Zone</option>
                <option value="west">West Zone</option>
              </select>
              <Button className="gap-2">
                <Map className="h-4 w-4" />
                View Map
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insights.map((insight, index) => (
              <Card key={index} className="glass-card border-glass-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <insight.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm text-green-600 font-medium">{insight.trend}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{insight.value}</p>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    <p className="text-xs font-medium text-foreground/70">{insight.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="recommendations" className="space-y-6">
            <TabsList className="glass-card">
              <TabsTrigger value="recommendations">
                <Brain className="h-4 w-4 mr-2" />
                Recommendations
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="impact">
                <Users className="h-4 w-4 mr-2" />
                Impact Assessment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recommendations" className="space-y-4">
              <div className="grid gap-4">
                {recommendations.map((rec) => (
                  <Card key={rec.id} className="glass-card border-glass-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="glass-card p-2 rounded-lg">
                            <rec.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{rec.scheme}</CardTitle>
                            <CardDescription>{rec.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={getPriorityColor(rec.priority)}>
                            {rec.priority} Priority
                          </Badge>
                          <Badge variant={getStatusColor(rec.status)}>
                            {rec.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="glass-card p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground">Affected Claims</p>
                          <p className="text-xl font-bold text-primary">{rec.affectedClaims}</p>
                        </div>
                        <div className="glass-card p-3 rounded-lg md:col-span-2">
                          <p className="text-sm text-muted-foreground">Expected Impact</p>
                          <p className="text-sm font-medium">{rec.impact}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">View Details</Button>
                        <Button size="sm" variant="outline">Generate Report</Button>
                        <Button size="sm" variant="outline">Share Analysis</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-card border-glass-border">
                  <CardHeader>
                    <CardTitle>Scheme Performance</CardTitle>
                    <CardDescription>Implementation success rates by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Water & Sanitation</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: "92%"}}></div>
                          </div>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Energy Access</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{width: "87%"}}></div>
                          </div>
                          <span className="text-sm font-medium">87%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Livelihood Support</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: "89%"}}></div>
                          </div>
                          <span className="text-sm font-medium">89%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Infrastructure</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{width: "84%"}}></div>
                          </div>
                          <span className="text-sm font-medium">84%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-glass-border">
                  <CardHeader>
                    <CardTitle>Regional Distribution</CardTitle>
                    <CardDescription>Claims requiring intervention by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>North Zone</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">234 claims</span>
                          <Badge variant="destructive">High</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>East Zone</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">189 claims</span>
                          <Badge variant="outline">Medium</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>South Zone</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">156 claims</span>
                          <Badge variant="outline">Medium</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>West Zone</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">98 claims</span>
                          <Badge variant="secondary">Low</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="glass-card border-glass-border">
                  <CardHeader>
                    <CardTitle>Beneficiaries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">2,650+</p>
                      <p className="text-sm text-muted-foreground">Families impacted</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-glass-border">
                  <CardHeader>
                    <CardTitle>Investment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">₹45.2Cr</p>
                      <p className="text-sm text-muted-foreground">Total allocation</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-glass-border">
                  <CardHeader>
                    <CardTitle>Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">18 months</p>
                      <p className="text-sm text-muted-foreground">Estimated completion</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DSS;