import { auth } from "@/lib/auth";

/**
 * Enforce an authenticated admin session inside Server Actions and API handlers.
 */
export async function requireAdminSession() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized: login admin diperlukan.");
  }

  return session;
}
