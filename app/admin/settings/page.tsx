export const metadata = {
  title: "Situs Pengaturan - RIDLEY Admin",
};

export default async function AdminSettingsPage() {
  async function updateSettings(formData: FormData) {
    "use server";
    // General simulated settings handler
    const siteName = formData.get("siteName");
    const contactEmail = formData.get("contactEmail");
    const contactWa = formData.get("contactWa");

    console.log("Settings update action triggered:", {
      siteName,
      contactEmail,
      contactWa,
    });
  }

  return (
    <div className="space-y-8 text-black max-w-2xl">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-medium text-black">Site Setting</h1>
        <p className="text-sm text-gray-500 mt-1">
          Konfigurasi default meta tag dan informasi kontak secara global.
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 shadow-sm">
        <form action={updateSettings} className="space-y-6">
          <div>
            <label htmlFor="siteName" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Nama Website
            </label>
            <input
              id="siteName"
              name="siteName"
              type="text"
              defaultValue="RIDLEY"
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm focus:border-ridley-blue focus:bg-white text-black placeholder-gray-400 rounded-xl outline-none transition text-sm font-semibold"
            />
          </div>

          <div>
            <label htmlFor="contactEmail" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Email Kontak Resmi
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              defaultValue="labridley@gmail.com"
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm focus:border-ridley-blue focus:bg-white text-black placeholder-gray-400 rounded-xl outline-none transition text-sm font-semibold"
            />
          </div>

          <div>
            <label htmlFor="contactWa" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Nomor WhatsApp Konsultasi
            </label>
            <input
              id="contactWa"
              name="contactWa"
              type="text"
              defaultValue="+6281210004453"
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm focus:border-ridley-blue focus:bg-white text-black placeholder-gray-400 rounded-xl outline-none transition text-sm font-semibold"
            />
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
