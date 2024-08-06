import DashboardSidebar from "@/components/layouts/dashboard-sidebar";
import DashboardHeader from "@/components/layouts/dashboard-header";

export default function Layout360({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-muted">
      <DashboardHeader />
      <DashboardSidebar />
      <div className="page-content pl-14 overflow-auto">
        {children}
      </div>
    </div>
  );
}
