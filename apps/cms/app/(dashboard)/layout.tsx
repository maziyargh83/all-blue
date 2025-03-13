import { AppSidebar } from "@/components/ui/sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@all-blue/ui/components/sidebar";
import { DashboardMainLayout } from "@/components/ui/dashboard-main-layout";
import { DynamicBreadcrumb } from "@/components/ui/dynamic-breadcrumb";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 mr-auto rotate-180" />
        </header>
        <DynamicBreadcrumb />
        <DashboardMainLayout>{children}</DashboardMainLayout>
      </SidebarInset>
    </SidebarProvider>
  );
}
