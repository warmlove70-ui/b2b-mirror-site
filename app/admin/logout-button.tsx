"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // Ignore errors
    }
    router.push("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center justify-center rounded-full border border-ink/12 bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-sand"
    >
      退出登录
    </button>
  );
}
