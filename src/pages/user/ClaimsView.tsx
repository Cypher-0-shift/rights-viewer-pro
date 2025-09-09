import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  FileText, 
  MapPin, 
  Calendar,
  User,
  TreePine,
  Eye,
  Download
} from "lucide-react";

const ClaimsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock claims data
  const claims = [
    {
      id: "FRA-2024-001",
      applicantName: "Ramesh Patel",
      village: "Kondagaon",
      district: "Bastar",
      landType: "Forest Land",
      area: "2.5",
      status: "verified",
      submissionDate: "2024-03-15",
      verificationDate: "2024-03-20",
      coordinates: "19.5937° N, 81.9629° E"
    },
    {
      id: "FRA-2024-002",
      applicantName: "Sita Devi",
      village: "Jagdalpur",
      district: "Bastar",
      landType: "Community Rights",
      area: "4.2",
      status: "pending",
      submissionDate: "2024-03-18",
      verificationDate: null,
      coordinates: "19.0822° N, 82.0347° E"
    },
    {
      id: "FRA-2024-003",
      applicantName: "Mohan Singh",
      village: "Dantewada",
      district: "Dantewada",
      landType: "Individual Rights",
      area: "1.8",
      status: "rejected",
      submissionDate: "2024-03-10",
      verificationDate: "2024-03-25",
      coordinates: "18.9018° N, 81.3535° E"
    },
    {
      id: "FRA-2024-004",
      applicantName: "Geeta Kumari",
      village: "Sukma",
      district: "Sukma",
      landType: "Community Rights",
      area: "3.1",
      status: "verified",
      submissionDate: "2024-03-12",
      verificationDate: "2024-03-22",
      coordinates: "18.3984° N, 81.6661° E"
    },
    {
      id: "FRA-2024-005",
      applicantName: "Ravi Shankar",
      village: "Bijapur",
      district: "Bijapur",
      landType: "Forest Land",
      area: "2.9",
      status: "pending",
      submissionDate: "2024-03-20",
      verificationDate: null,
      coordinates: "18.3222° N, 80.7178° E"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-status-verified text-white";
      case "pending": return "bg-status-pending text-white";
      case "rejected": return "bg-status-rejected text-white";
      default: return "bg-muted";
    }
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = districtFilter === "all" || claim.district === districtFilter;
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    
    return matchesSearch && matchesDistrict && matchesStatus;
  });

  return (
    <DashboardLayout userType="user">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Claims Database</h1>
          <p className="text-muted-foreground">
            Browse and explore forest rights claims in your region
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter Claims
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, village, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={districtFilter} onValueChange={setDistrictFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="Bastar">Bastar</SelectItem>
                  <SelectItem value="Dantewada">Dantewada</SelectItem>
                  <SelectItem value="Sukma">Sukma</SelectItem>
                  <SelectItem value="Bijapur">Bijapur</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="secondary" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Claims Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClaims.map((claim) => (
            <Card key={claim.id} className="glass-card hover:scale-105 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{claim.id}</CardTitle>
                  <Badge className={getStatusColor(claim.status)}>
                    {claim.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{claim.applicantName}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{claim.village}, {claim.district}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{claim.landType}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <TreePine className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{claim.area} hectares</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Submitted: {claim.submissionDate}</span>
                </div>
                
                {claim.verificationDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Verified: {claim.verificationDate}</span>
                  </div>
                )}
                
                <div className="pt-2 border-t">
                  <Button variant="ghost" size="sm" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredClaims.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No claims found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClaimsView;