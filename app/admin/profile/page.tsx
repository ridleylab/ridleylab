import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Profil Admin - RIDLEY Admin",
};

export default async function AdminProfilePage() {
  const session = await auth();
  const email = session?.user?.email || "";

  let user: any = null;
  try {
    user = await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Prisma load error in profile:", error);
  }

  async function updateProfile(formData: FormData) {
    "use server";
    const session = await auth();
    const email = session?.user?.email;
    if (!email) return;

    const name = formData.get("name") as string;
    const newPassword = formData.get("password") as string;

    const dataToUpdate: any = {};
    if (name && name.trim() !== "") {
      dataToUpdate.name = name.trim();
    }

    if (newPassword && newPassword.trim().length >= 6) {
      dataToUpdate.password = await bcrypt.hash(newPassword.trim(), 10);
    }

    if (Object.keys(dataToUpdate).length === 0) return;

    try {
      await prisma.user.update({
        where: { email },
        data: dataToUpdate,
      });
    } catch (error) {
      console.error("Update profile error:", error);
    }

    revalidatePath("/admin/profile");
  }

  return (
    <div className="space-y-8 text-black max-w-2xl">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-medium text-black">Kelola Profil</h1>
        <p className="text-sm text-gray-500 mt-1">
          Perbarui nama admin Anda atau ganti password keamanan login.
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 shadow-sm">
        <form action={updateProfile} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={email}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm text-gray-400 rounded-xl outline-none text-sm font-semibold cursor-not-allowed"
            />
            <p className="text-[10px] text-gray-400 mt-1.5">
              Email login bersifat statis untuk keamanan sistem dan tidak dapat diganti.
            </p>
          </div>

          <div>
            <label htmlFor="name" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Nama Admin
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user?.name || ""}
              placeholder="Masukkan nama"
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm focus:border-ridley-blue focus:bg-white text-black placeholder-gray-400 rounded-xl outline-none transition text-sm font-semibold"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Password Baru
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Kosongkan jika tidak ingin mengganti"
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm focus:border-ridley-blue focus:bg-white text-black placeholder-gray-400 rounded-xl outline-none transition text-sm font-semibold"
            />
            <p className="text-[10px] text-gray-400 mt-1.5">
              Minimum 6 karakter. Harap simpan password baru Anda dengan aman.
            </p>
          </div>

          <button
            type="submit"
            className="w-fit px-8 py-3.5 bg-ridley-blue hover:bg-[#216694] text-white font-bold text-sm rounded-xl transition shadow-md shadow-ridley-blue/10 cursor-pointer disabled:cursor-not-allowed"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
