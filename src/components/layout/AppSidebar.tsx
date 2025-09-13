import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Upload,
  Map,
  Brain,
  Settings,
  LogOut,
  Menu,
  Trees,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userType: 'admin' | 'user';
}

const AppSidebar = ({ userType }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const adminItems = [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Claims", url: "/admin/claims", icon: FileText },
    { title: "Upload", url: "/admin/upload", icon: Upload },
    { title: "GIS Map", url: "/admin/map", icon: Map },
    { title: "DSS", url: "/admin/dss", icon: Brain },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ];

  const userItems = [
    { title: "Dashboard", url: "/user/dashboard", icon: LayoutDashboard },
    { title: "Claims", url: "/user/claims", icon: FileText },
    { title: "GIS Map", url: "/user/map", icon: Map },
    { title: "DSS", url: "/user/dss", icon: Brain },
    { title: "Settings", url: "/user/settings", icon: Settings },
  ];

  const items = userType === 'admin' ? adminItems : userItems;
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className={cn(
      "glass-card h-full flex flex-col transition-all duration-300 border-r border-glass-border",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-glass-border/50">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center">
              <div className="glass-card p-2 rounded-lg mr-3">
                <Trees className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-lg">FRA Atlas</h2>
                <p className="text-xs text-muted-foreground capitalize">{userType} Panel</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="shrink-0"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 custom-scrollbar overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={cn(
              "flex items-center px-3 py-3 rounded-lg transition-all duration-200 group",
              isActive(item.url)
                ? "bg-primary/10 text-primary border border-primary/20"
                : "hover:bg-accent/50 text-foreground/70 hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "shrink-0 transition-colors",
              collapsed ? "h-5 w-5" : "h-5 w-5 mr-3",
              isActive(item.url) ? "text-primary" : "text-foreground/70 group-hover:text-foreground"
            )} />
            {!collapsed && (
              <span className="font-medium">{item.title}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-glass-border/50">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-foreground/70 hover:text-foreground hover:bg-destructive/10",
            collapsed && "justify-center"
          )}
          onClick={() => window.location.href = '/'}
        >
          <LogOut className={cn("h-5 w-5", !collapsed && "mr-3")} />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
};

export default AppSidebar;