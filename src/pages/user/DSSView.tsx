import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Brain, 
  Search, 
  Star, 
  TrendingUp, 
  Users, 
  Leaf, 
  Zap,
  Target,
  Calendar,
  MapPin,
  ArrowRight
} from "lucide-react";

const DSSView = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedSchemeType, setSelectedSchemeType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock scheme recommendations
  const schemes = [
    {
      id: 1,
      name: "Forest Rights Community Development Program",
      type: "Community Development",
      description: "Comprehensive development program for forest rights holders focusing on sustainable livelihoods and infrastructure development.",
      targetDistricts: ["Bastar", "Dantewada"],
      estimatedBeneficiaries: "2,500 families",
      fundingAmount: "₹15 crores",
      duration: "3 years",
      aiScore: 92,
      status: "recommended",
      priority: "high",
      sectors: ["Infrastructure", "Livelihood", "Education"],
      implementationComplexity: "Medium",
      expectedOutcomes: [
        "Improved rural infrastructure",
        "Enhanced livelihood opportunities",
        "Better access to education and healthcare"
      ]
    },
    {
      id: 2,
      name: "Sustainable Forest Management Initiative",
      type: "Environmental",
      description: "AI-recommended program for sustainable forest management practices and biodiversity conservation in tribal areas.",
      targetDistricts: ["Sukma", "Bijapur"],
      estimatedBeneficiaries: "1,800 families",
      fundingAmount: "₹12 crores",
      duration: "4 years",
      aiScore: 88,
      status: "under_review",
      priority: "medium",
      sectors: ["Environment", "Forest Management", "Biodiversity"],
      implementationComplexity: "High",
      expectedOutcomes: [
        "Improved forest cover",
        "Enhanced biodiversity conservation",
        "Sustainable resource utilization"
      ]
    },
    {
      id: 3,
      name: "Digital Literacy and E-Governance Program",
      type: "Technology",
      description: "Technology-driven initiative to improve digital literacy and e-governance services in forest rights communities.",
      targetDistricts: ["Bastar", "Kondagaon"],
      estimatedBeneficiaries: "3,200 individuals",
      fundingAmount: "₹8 crores",
      duration: "2 years",
      aiScore: 85,
      status: "approved",
      priority: "high",
      sectors: ["Technology", "Education", "Governance"],
      implementationComplexity: "Low",
      expectedOutcomes: [
        "Increased digital literacy",
        "Better access to government services",
        "Improved communication infrastructure"
      ]
    },
    {
      id: 4,
      name: "Tribal Entrepreneurship Development Scheme",
      type: "Economic",
      description: "Comprehensive program to promote entrepreneurship and small business development among tribal communities.",
      targetDistricts: ["Dantewada", "Sukma"],
      estimatedBeneficiaries: "1,200 entrepreneurs",
      fundingAmount: "₹10 crores",
      duration: "3 years",
      aiScore: 81,
      status: "planning",
      priority: "medium",
      sectors: ["Economy", "Entrepreneurship", "Skill Development"],
      implementationComplexity: "Medium",
      expectedOutcomes: [
        "New business establishments",
        "Increased income levels",
        "Enhanced skill development"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-status-verified text-white";
      case "recommended": return "bg-primary text-white";
      case "under_review": return "bg-status-pending text-white";
      case "planning": return "bg-secondary text-white";
      default: return "bg-muted";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-status-rejected";
      case "medium": return "text-status-pending";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === "all" || 
                           scheme.targetDistricts.some(district => district.toLowerCase().includes(selectedDistrict.toLowerCase()));
    const matchesType = selectedSchemeType === "all" || scheme.type === selectedSchemeType;
    
    return matchesSearch && matchesDistrict && matchesType;
  });

  return (
    <DashboardLayout userType="user">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              AI-Powered Scheme Recommendations
            </h1>
            <p className="text-muted-foreground">
              Discover development schemes and programs tailored for forest rights communities
            </p>
          </div>
        </div>

        {/* AI Insights Card */}
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Zap className="h-5 w-5" />
              AI-Generated Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="glass-card p-4 rounded-xl mb-2">
                  <Target className="h-6 w-6 text-primary mx-auto" />
                </div>
                <p className="text-sm text-muted-foreground">Optimal Schemes</p>
                <p className="text-xl font-bold">12</p>
              </div>
              <div className="text-center">
                <div className="glass-card p-4 rounded-xl mb-2">
                  <Users className="h-6 w-6 text-secondary mx-auto" />
                </div>
                <p className="text-sm text-muted-foreground">Potential Beneficiaries</p>
                <p className="text-xl font-bold">8,700</p>
              </div>
              <div className="text-center">
                <div className="glass-card p-4 rounded-xl mb-2">
                  <TrendingUp className="h-6 w-6 text-accent-dark mx-auto" />
                </div>
                <p className="text-sm text-muted-foreground">Total Funding</p>
                <p className="text-xl font-bold">₹45 Cr</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Schemes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="bastar">Bastar</SelectItem>
                  <SelectItem value="dantewada">Dantewada</SelectItem>
                  <SelectItem value="sukma">Sukma</SelectItem>
                  <SelectItem value="bijapur">Bijapur</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSchemeType} onValueChange={setSelectedSchemeType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Community Development">Community Development</SelectItem>
                  <SelectItem value="Environmental">Environmental</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Economic">Economic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="glass-card hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{scheme.name}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{scheme.type}</Badge>
                      <Badge className={getStatusColor(scheme.status)}>
                        {scheme.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-primary fill-current" />
                      <span className="font-bold">{scheme.aiScore}</span>
                    </div>
                    <span className={`text-xs font-medium ${getPriorityColor(scheme.priority)}`}>
                      {scheme.priority} priority
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{scheme.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{scheme.targetDistricts.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{scheme.estimatedBeneficiaries}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>{scheme.fundingAmount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{scheme.duration}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Key Sectors:</p>
                  <div className="flex flex-wrap gap-1">
                    {scheme.sectors.map((sector, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Expected Outcomes:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {scheme.expectedOutcomes.slice(0, 2).map((outcome, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Leaf className="h-3 w-3 text-primary" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t">
                  <Button variant="default" size="sm" className="w-full">
                    View Full Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No schemes found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DSSView;