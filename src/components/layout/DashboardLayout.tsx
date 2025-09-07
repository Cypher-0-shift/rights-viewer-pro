import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: 'admin' | 'user';
}

const DashboardLayout = ({ children, userType }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen w-full bg-background">
      <AppSidebar userType={userType} />
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;