import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "zeksmart_admin_auth";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE_NAME)?.value;
  const password = getAdminPassword();

  if (!password) return false;
  return token === password;
}
