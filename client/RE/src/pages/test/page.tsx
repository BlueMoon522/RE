import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function YourPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-6">
          <h1>Your Page Content</h1>
          {/* Your page content goes here */}
        </main>
      </div>
    </SidebarProvider>
  );
}
