"use client";

import { useEffect, useState } from "react";

export default function AutoLoginPage() {
  const [status, setStatus] = useState("正在登录...");

  useEffect(() => {
    async function autoLogin() {
      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: "ZekSmart2026!" }),
          credentials: "include",
        });

        const data = await res.json();
        
        if (data.ok) {
          setStatus("登录成功，正在跳转...");
          window.location.href = "/admin/leads";
        } else {
          setStatus("登录失败：" + (data.error || "未知错误"));
        }
      } catch (err) {
        setStatus("登录错误：" + (err instanceof Error ? err.message : "未知错误"));
      }
    }

    autoLogin();
  }, []);

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-semibold text-ink">{status}</p>
        <p className="mt-4 text-sm text-ink/60">如果 3 秒后没有跳转，请 <a href="/admin/leads" className="text-teal underline">点击这里</a></p>
      </div>
    </div>
  );
}
