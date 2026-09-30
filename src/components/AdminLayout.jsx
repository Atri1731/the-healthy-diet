
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8F2] lg:flex-row">
      {/* Keep the admin sidebar full-height on desktop */}
      <div className="shrink-0 lg:sticky lg:top-0 lg:h-screen lg:self-start">
        <AdminSidebar />
      </div>

      {/* Main page content */}
      <main className="min-h-screen min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;