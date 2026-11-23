"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Save } from "lucide-react";
import { updateProfileAction } from "@/app/(admin)/admin/profile/actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

interface ProfileFormProps {
  email: string;
  initialName: string;
  initialRole?: string;
  initialBio?: string;
  initialAvatarUrl?: string;
}

export default function ProfileForm({
  email,
  initialName,
  initialRole = "",
  initialBio = "",
  initialAvatarUrl = "",
}: ProfileFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState(initialName);
  const [role, setRole] = useState(initialRole);
  const [bio, setBio] = useState(initialBio);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const previewAvatar = avatarUrl.trim();
  const isRenderablePreview =
    previewAvatar.startsWith("/") ||
    previewAvatar.startsWith("https://") ||
    previewAvatar.startsWith("http://");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const res = await updateProfileAction({
      name,
      role,
      bio,
      avatarUrl,
      password,
      confirmPassword,
    });

    setIsSaving(false);

    if (res.success) {
      toast({
        title: "Profil berhasil diperbarui",
        description: res.passwordUpdated
          ? "Identitas E-E-A-T dan password keamanan telah disimpan."
          : "Identitas penulis dan profil admin telah disimpan.",
        variant: "success",
      });
      setPassword("");
      setConfirmPassword("");
      router.refresh();
    } else {
      toast({
        title: "Gagal memperbarui profil",
        description: res.error,
        variant: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          disabled
          value={email}
          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950/70 text-zinc-500 dark:text-zinc-400 text-sm cursor-not-allowed"
        />
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5">
          Email login bersifat statis untuk identifikasi akun admin.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="profile-name"
            className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
          >
            Nama Tampilan Penulis
          </label>
          <input
            id="profile-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Misal: Thofhan Zaka Anshori"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
        </div>

        <div>
          <label
            htmlFor="profile-role"
            className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
          >
            Jabatan / Peran (E-E-A-T)
          </label>
          <input
            id="profile-role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Misal: Founder & AI Marketing Strategist"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="profile-bio"
            className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
          >
            Bio Singkat Penulis (E-E-A-T)
          </label>
          <span className="text-[11px] text-zinc-400">
            {bio.trim().length}/500
          </span>
        </div>
        <textarea
          id="profile-bio"
          rows={3}
          maxLength={500}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Pengalaman singkat & keahlian penulis yang tampil di kartu penulis artikel dan Schema.org Person..."
          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400 resize-none leading-relaxed"
        />
      </div>

      <div>
        <label
          htmlFor="profile-avatar"
          className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
        >
          URL Foto Profil Penulis (Opsional)
        </label>
        <div className="flex items-center gap-3">
          {isRenderablePreview && (
            <div className="relative h-11 w-11 shrink-0 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={previewAvatar}
                alt="Preview avatar penulis"
                fill
                unoptimized
                className="object-cover"
                sizes="44px"
              />
            </div>
          )}
          <input
            id="profile-avatar"
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="/images/about/zakaanshori.png atau https://utfs.io/..."
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs sm:text-sm font-mono text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
        </div>
      </div>

      <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div>
          <label
            htmlFor="profile-password"
            className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
          >
            Password Baru (Opsional)
          </label>
          <div className="relative">
            <input
              id="profile-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Kosongkan jika tidak ingin mengganti"
              className="w-full px-4 py-2.5 pr-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Sembunyikan password" : "Tampilkan password"
              }
              className="absolute inset-y-0 right-0 px-3.5 text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 cursor-pointer"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
            Minimal 6 karakter bila ingin mengganti password login.
          </p>
        </div>

        <div>
          <label
            htmlFor="profile-confirm"
            className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
          >
            Konfirmasi Password Baru
          </label>
          <input
            id="profile-confirm"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Ketik ulang password baru"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
        </div>
      </div>

      <Button type="submit" variant="primary" size="md" disabled={isSaving}>
        <Save size={15} />
        <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
      </Button>
    </form>
  );
}
