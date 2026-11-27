import type { Metadata } from "next";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import AdminShell from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  let dbUser: {
    name: string | null;
    role: string | null;
    avatarUrl: string | null;
  } | null = null;
  try {
    dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { name: true, role: true, avatarUrl: true },
    });
  } catch {
    // Fallback to session info if DB lookup fails
  }

  const user = {
    email: session.user.email,
    name: dbUser?.name?.trim() || session.user.name?.trim() || "RidleyLab Admin",
    role: dbUser?.role?.trim() || "Administrator",
    avatarUrl: dbUser?.avatarUrl?.trim() || null,
  };

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <AdminShell user={user} onSignOut={handleSignOut}>
      {children}
    </AdminShell>
  );
}
