import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-slate-50 to-amber-50/30 text-black">
      <AdminSidebar userEmail={session.user?.email} onSignOut={handleSignOut} />

      {/* CONTENT REGION */}
      <main className="p-4 lg:p-10 lg:ml-64 min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
