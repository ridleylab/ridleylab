import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { siteConfig } from "@/config/site";
import ProfileForm from "@/components/admin/profile-form";

export const metadata = {
  title: `Profil Admin - ${siteConfig.name} Admin`,
};

export default async function AdminProfilePage() {
  const session = await auth();
  const email = session?.user?.email || "";

  let name = "";
  let role = "";
  let bio = "";
  let avatarUrl = "";

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        role: true,
        bio: true,
        avatarUrl: true,
      },
    });
    name = user?.name || "";
    role = user?.role || "";
    bio = user?.bio || "";
    avatarUrl = user?.avatarUrl || "";
  } catch (error) {
    console.error("Prisma load error in profile:", error);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Profil Admin &amp; Penulis E-E-A-T
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Perbarui identitas penulis untuk kartu artikel &amp; Schema.org Person,
          atau ganti password keamanan akun CMS.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-8">
        <ProfileForm
          email={email}
          initialName={name}
          initialRole={role}
          initialBio={bio}
          initialAvatarUrl={avatarUrl}
        />
      </div>
    </div>
  );
}
