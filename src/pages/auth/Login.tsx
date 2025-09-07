import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Shield, User, ArrowLeft, Trees } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { userType } = useParams<{ userType: 'admin' | 'user' }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = userType === 'admin';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication - replace with real authentication
    setTimeout(() => {
      if (credentials.email && credentials.password) {
        toast({
          title: "Login Successful",
          description: `Welcome to FRA Atlas ${isAdmin ? 'Admin' : 'User'} Panel`,
        });
        
        // Navigate to appropriate dashboard
        navigate(isAdmin ? '/admin/dashboard' : '/user/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="glass-card p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="glass-card p-3 rounded-full mr-3">
                <Trees className="h-8 w-8 text-primary" />
              </div>
              <div className="glass-card p-3 rounded-full">
                {isAdmin ? (
                  <Shield className="h-8 w-8 text-primary" />
                ) : (
                  <User className="h-8 w-8 text-secondary" />
                )}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {isAdmin ? 'Admin' : 'User'} Login
              </h1>
              <p className="text-muted-foreground">
                {isAdmin 
                  ? 'Access the FRA Atlas admin panel' 
                  : 'Explore forest rights claims data'
                }
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={isAdmin ? "admin@fraatlas.gov.in" : "user@example.com"}
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              variant={isAdmin ? "default" : "secondary"}
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : `Sign in to ${isAdmin ? 'Admin' : 'User'} Panel`}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="glass-card p-4 text-center text-sm text-muted-foreground">
            <p className="font-medium mb-2">Demo Credentials:</p>
            <p>Email: {isAdmin ? 'admin@demo.com' : 'user@demo.com'}</p>
            <p>Password: password123</p>
          </div>

          {/* Features */}
          <div className="space-y-3 text-sm">
            <p className="font-medium text-center">Access includes:</p>
            <div className="grid grid-cols-1 gap-2">
              {isAdmin ? [
                "🔧 Claims Management & Editing",
                "📄 Document Upload & OCR",
                "🗺️ GIS Data Management",
                "⚙️ System Configuration"
              ] : [
                "📊 Claims Database Access",
                "🗺️ Interactive GIS Maps",
                "📈 Analytics Dashboard",
                "💡 Scheme Recommendations"
              ].map((feature, index) => (
                <div key={index} className="flex items-center text-muted-foreground">
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;