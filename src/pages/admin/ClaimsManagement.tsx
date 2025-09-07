import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Trash2,
  Download,
  Map,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ClaimsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");

  // Mock data - replace with real data from your backend
  const claims = [
    {
      id: "FRA-2024-001",
      claimant: "Ravi Kumar",
      claimType: "Individual Forest Rights (IFR)",
      village: "Bandhavgarh",
      district: "Bastar",
      area: "2.5 hectares",
      status: "pending",
      submittedDate: "2024-01-15",
      lastUpdated: "2024-01-20"
    },
    {
      id: "FRA-2024-002",
      claimant: "Sita Devi",
      claimType: "Community Forest Rights (CFR)",
      village: "Kanha",
      district: "Dantewada",
      area: "15.8 hectares",
      status: "verified",
      submittedDate: "2024-01-10",
      lastUpdated: "2024-01-25"
    },
    {
      id: "FRA-2024-003",
      claimant: "Ramesh Singh",
      claimType: "Community Rights (CR)",
      village: "Pench",
      district: "Sukma",
      area: "8.2 hectares",
      status: "pending",
      submittedDate: "2024-01-18",
      lastUpdated: "2024-01-22"
    },
    {
      id: "FRA-2024-004",
      claimant: "Lakshmi Bai",
      claimType: "Individual Forest Rights (IFR)",
      village: "Satpura",
      district: "Bastar",
      area: "3.7 hectares",
      status: "verified",
      submittedDate: "2024-01-12",
      lastUpdated: "2024-01-28"
    },
    {
      id: "FRA-2024-005",
      claimant: "Arjun Patel",
      claimType: "Community Forest Rights (CFR)",
      village: "Tadoba",
      district: "Dantewada",
      area: "22.1 hectares",
      status: "rejected",
      submittedDate: "2024-01-08",
      lastUpdated: "2024-01-30"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      verified: { variant: "secondary" as const, className: "status-verified" },
      pending: { variant: "secondary" as const, className: "status-pending" },
      rejected: { variant: "destructive" as const, className: "status-rejected" },
      draft: { variant: "outline" as const, className: "status-draft" }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.draft;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.claimant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.village.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    const matchesDistrict = districtFilter === "all" || claim.district === districtFilter;
    
    return matchesSearch && matchesStatus && matchesDistrict;
  });

  return (
    <DashboardLayout userType="admin">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Claims Management</h1>
            <p className="text-muted-foreground">
              Manage and review FRA claims submissions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Claim
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by claimant name, ID, or village..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={districtFilter} onValueChange={setDistrictFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="Bastar">Bastar</SelectItem>
                  <SelectItem value="Dantewada">Dantewada</SelectItem>
                  <SelectItem value="Sukma">Sukma</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Claims Table */}
        <div className="glass-card">
          <div className="p-6 border-b border-glass-border/50">
            <h2 className="text-lg font-semibold">
              Claims List ({filteredClaims.length} records)
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Claimant</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Village</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.id} className="hover:bg-accent/50">
                    <TableCell className="font-medium">{claim.id}</TableCell>
                    <TableCell>{claim.claimant}</TableCell>
                    <TableCell>
                      <div className="max-w-32 truncate" title={claim.claimType}>
                        {claim.claimType}
                      </div>
                    </TableCell>
                    <TableCell>{claim.village}</TableCell>
                    <TableCell>{claim.district}</TableCell>
                    <TableCell>{claim.area}</TableCell>
                    <TableCell>{getStatusBadge(claim.status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(claim.lastUpdated).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-card">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Claim
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Map className="mr-2 h-4 w-4" />
                            View on Map
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredClaims.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No claims found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-primary">{claims.filter(c => c.status === 'verified').length}</p>
            <p className="text-sm text-muted-foreground">Verified</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-status-pending">{claims.filter(c => c.status === 'pending').length}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-status-rejected">{claims.filter(c => c.status === 'rejected').length}</p>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{claims.length}</p>
            <p className="text-sm text-muted-foreground">Total Claims</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClaimsManagement;