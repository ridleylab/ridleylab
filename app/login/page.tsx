"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authenticate } from "./actions";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-6 relative h-10 w-full">
          <Image
            src="/assets/images/header-logo.png"
            alt="RIDLEY Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
        <h2 className="text-center text-3xl font-medium tracking-tight text-gray-900">
          Masuk ke Dashboard
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Khusus admin RIDLEY
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-3xl sm:px-10 border border-gray-150">
          <form action={formAction} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="masukkan email admin"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-ridley-blue focus:bg-white text-black placeholder-gray-400 rounded-xl outline-none transition text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-ridley-blue focus:bg-white text-black placeholder-gray-400 rounded-xl outline-none transition text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <img src="/assets/images/admin/matabuka.svg" alt="Sembunyikan password" className="w-5 h-5 opacity-70" />
                  ) : (
                    <img src="/assets/images/admin/matatutup.svg" alt="Tampilkan password" className="w-5 h-5 opacity-70" />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <div className="flex">
                  <div className="shrink-0">
                    <svg
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-red-700 font-bold">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-bold text-white bg-ridley-blue hover:bg-[#216694] focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed shadow-ridley-blue/20"
              >
                {isPending ? "Memproses..." : "Masuk"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
