import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "zeksmart_admin_auth";

export function getAdminPassword() {
  // Fallback password if ADMIN_PASSWORD is not set
  return process.env.ADMIN_PASSWORD || "ZekSmart2026!";
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE_NAME)?.value;
  const password = getAdminPassword();

  if (!password) return false;
  return token === password;
}
