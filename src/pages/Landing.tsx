import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, MapPin, Trees, User, Settings } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center mb-12 max-w-4xl">
        {/* Logo and Title */}
        <div className="flex items-center justify-center mb-6">
          <div className="glass-card p-4 rounded-full mr-4">
            <Trees className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              FRA Atlas
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              Forest Rights Act Claims Management System
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          Digitizing Forest Rights • Empowering Communities • Protecting Forests
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="glass-card p-6 text-center">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">GIS Mapping</h3>
            <p className="text-sm text-muted-foreground">Interactive maps for claim visualization</p>
          </div>
          <div className="glass-card p-6 text-center">
            <Shield className="h-8 w-8 text-secondary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Secure Access</h3>
            <p className="text-sm text-muted-foreground">Role-based permissions & data security</p>
          </div>
          <div className="glass-card p-6 text-center">
            <Settings className="h-8 w-8 text-accent-dark mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Smart Analytics</h3>
            <p className="text-sm text-muted-foreground">AI-powered decision support system</p>
          </div>
        </div>
      </div>

      {/* Login Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
        {/* Admin Login */}
        <div className="glass-card p-8 text-center group cursor-pointer hover:scale-105 transition-all duration-300"
             onClick={() => navigate('/admin/login')}>
          <div className="mb-6">
            <div className="glass-card p-4 rounded-full inline-flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Admin Access</h2>
            <p className="text-muted-foreground mb-6">
              Complete access to manage claims, upload documents, and configure system settings
            </p>
          </div>
          
          <div className="space-y-3 text-sm text-left mb-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span>Claim Management & Editing</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span>Document Upload & OCR</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span>GIS Data Management</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span>System Configuration</span>
            </div>
          </div>

          <Button variant="hero" size="hero" className="w-full">
            <Shield className="mr-2 h-5 w-5" />
            Admin Login
          </Button>
        </div>

        {/* User Login */}
        <div className="glass-card p-8 text-center group cursor-pointer hover:scale-105 transition-all duration-300"
             onClick={() => navigate('/user/login')}>
          <div className="mb-6">
            <div className="glass-card p-4 rounded-full inline-flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
              <User className="h-12 w-12 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">User Access</h2>
            <p className="text-muted-foreground mb-6">
              View and explore forest rights claims data with interactive visualizations
            </p>
          </div>
          
          <div className="space-y-3 text-sm text-left mb-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
              <span>View Claims Database</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
              <span>Interactive GIS Maps</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
              <span>Analytics Dashboard</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
              <span>Scheme Recommendations</span>
            </div>
          </div>

          <Button variant="glass" size="hero" className="w-full bg-gradient-secondary">
            <MapPin className="mr-2 h-5 w-5" />
            User Access
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>© 2024 FRA Atlas - Forest Rights Act Claims Management System</p>
        <p className="mt-1">Empowering communities through digital governance</p>
      </div>
    </div>
  );
};

export default Landing;