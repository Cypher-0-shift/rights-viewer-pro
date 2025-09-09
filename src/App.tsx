import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import ClaimsManagement from "./pages/admin/ClaimsManagement";
import DocumentUpload from "./pages/admin/DocumentUpload";
import DSS from "./pages/admin/DSS";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          {/* Authentication Routes */}
          <Route path="/:userType/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/claims" element={<ClaimsManagement />} />
          <Route path="/admin/upload" element={<DocumentUpload />} />
          <Route path="/admin/map" element={<div className="p-8"><h1>GIS Map - Coming Soon</h1></div>} />
          <Route path="/admin/dss" element={<DSS />} />
          <Route path="/admin/settings" element={<Settings />} />
          
          {/* User Routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/claims" element={<div className="p-8"><h1>User Claims View - Coming Soon</h1></div>} />
          <Route path="/user/map" element={<div className="p-8"><h1>User GIS Map - Coming Soon</h1></div>} />
          <Route path="/user/dss" element={<div className="p-8"><h1>User DSS View - Coming Soon</h1></div>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
