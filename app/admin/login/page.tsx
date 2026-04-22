"use client";

import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    doLogin(password);
  }

  async function doLogin(pwd: string) {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
        credentials: "include",
      });

      const data = await res.json();
      
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "密码错误");
      }

      setSuccess("登录成功！正在跳转...");
      
      // 等待 1 秒确保 Cookie 写入，然后强制跳转
      setTimeout(() => {
        // 使用完整 URL 并强制刷新
        window.location.href = "https://b2b-mirror-site.vercel.app/admin/leads?t=" + Date.now();
      }, 1000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-copper">Admin</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Secure login</h1>
          <p className="mt-3 text-sm leading-6 text-ink/72">
            Enter the admin password to access lead records
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-ink/10 bg-white/90 p-8 shadow-soft">
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-ink/74">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-ink/12 bg-sand px-4 py-3 text-ink outline-none focus:border-teal"
              placeholder="Enter admin password"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-sand hover:bg-teal disabled:cursor-not-allowed disabled:opacity-70 mb-3"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          
          <button
            type="button"
            onClick={() => doLogin("ZekSmart2026!")}
            disabled={loading}
            className="w-full rounded-full border border-ink/12 bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-sand disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in..." : "🚀 一键登录（快速入口）"}
          </button>
          
          {error && (
            <div className="mt-4 rounded-2xl bg-[#fff3f1] px-4 py-3 text-sm text-[#9f3d2e]">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mt-4 rounded-2xl bg-[#d4edda] px-4 py-3 text-sm text-[#155724]">
              {success}
            </div>
          )}
        </form>
        
        <p className="text-center text-xs text-ink/50 mt-4">
          提示：点击"一键登录"可自动使用预设密码登录
        </p>
      </div>
    </div>
  );
}
