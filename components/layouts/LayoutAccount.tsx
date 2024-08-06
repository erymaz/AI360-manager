import DashboardHeader from "@/components/layouts/dashboard-header";
import { AccountSettingsSidebar } from "@/components/layouts/account-settings-sidebar";

export default function LayoutAccount({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-muted">
      <DashboardHeader />
      <AccountSettingsSidebar />
      <div className="page-content ml-60 overflow-auto">
        {children}
      </div>
    </div>
  );
}
