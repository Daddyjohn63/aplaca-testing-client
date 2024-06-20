import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header-section";
import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";


const AdminLayout = async ({ children }: { children: React.ReactNode; }) => {

  const role = await currentRole()

  if(role !== 'ADMIN'){
    redirect('/dashboard')
  }

  return (
    <>
      <div className="flex h-screen">
        <AdminSidebar />
        <main className="w-full overflow-y-scroll">
          <AdminHeader />
          <div className="flex-1 space-y-4 p-8 md:p-10 pt-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminLayout
