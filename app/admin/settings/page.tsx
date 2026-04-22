"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, SectionHeading } from "@/components/layout";

interface SiteSettings {
  siteName: string;
  contactEmail: string;
  whatsapp: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  smtpHost?: string;
  smtpPort?: string;
  smtpUser?: string;
  smtpPass?: string;
  notificationEmail?: string;
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "ZEKSmart Export",
    contactEmail: "admin@zeksmart.com",
    whatsapp: "+86 13916383646",
    seoTitle: "ZEKSmart - Premium Bathroom Mirrors Manufacturer | Factory Direct",
    seoDescription: "ZEKSmart specializes in premium bathroom mirrors, LED mirrors, and decorative mirrors. Factory direct pricing, OEM/ODM services, 5-year warranty.",
    keywords: "bathroom mirror, LED mirror, smart mirror, wall mirror, decorative mirror, manufacturer, factory direct",
    googleAnalyticsId: "",
    googleTagManagerId: "",
    smtpHost: "smtp.exmail.qq.com",
    smtpPort: "465",
    smtpUser: "",
    smtpPass: "",
    notificationEmail: "admin@zeksmart.com",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...settings,
          keywords: settings.keywords.split(",").map(k => k.trim()).filter(k => k),
          smtpPort: settings.smtpPort ? parseInt(settings.smtpPort) : undefined,
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert("保存失败，请重试");
      }
    } catch (err) {
      alert("保存失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand/30">
      <nav className="border-b border-ink/10 bg-white/80 backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/admin" className="text-xl font-bold text-ink">
              ZEKSMART Admin
            </Link>
            <div className="flex gap-4">
              <Link href="/admin" className="text-sm text-ink/70 hover:text-teal">Dashboard</Link>
              <Link href="/admin/leads" className="text-sm text-ink/70 hover:text-teal">询盘管理</Link>
              <Link href="/admin/products" className="text-sm text-ink/70 hover:text-teal">产品管理</Link>
              <Link href="/admin/content" className="text-sm text-ink/70 hover:text-teal">内容管理</Link>
              <Link href="/admin/settings" className="text-sm font-medium text-ink hover:text-teal">站点设置</Link>
            </div>
          </div>
        </Container>
      </nav>

      <main className="py-8">
        <Container>
          <SectionHeading
            eyebrow="Admin"
            title="站点设置"
            description="配置网站基本信息、SEO 设置、联系方式、第三方集成等"
          />

          {saved && (
            <div className="mt-4 rounded-lg bg-green/10 px-4 py-3 text-green">
              ✓ 设置已保存
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-semibold text-ink">基本信息</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink/70">网站名称</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">联系邮箱</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">WhatsApp</label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-semibold text-ink">SEO 设置</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink/70">Meta Title</label>
                  <input
                    type="text"
                    value={settings.seoTitle}
                    onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-ink/50">建议 50-60 字符</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">Meta Description</label>
                  <textarea
                    rows={3}
                    value={settings.seoDescription}
                    onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-ink/50">建议 150-160 字符</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">关键词</label>
                  <input
                    type="text"
                    value={settings.keywords}
                    onChange={(e) => setSettings({ ...settings, keywords: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-ink/50">逗号分隔</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-semibold text-ink">网站分析</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink/70">Google Analytics ID</label>
                  <input
                    type="text"
                    value={settings.googleAnalyticsId}
                    onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">Google Tag Manager ID</label>
                  <input
                    type="text"
                    value={settings.googleTagManagerId}
                    onChange={(e) => setSettings({ ...settings, googleTagManagerId: e.target.value })}
                    placeholder="GTM-XXXXXXX"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-semibold text-ink">邮件通知</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink/70">SMTP 主机</label>
                  <input
                    type="text"
                    value={settings.smtpHost}
                    onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                    placeholder="smtp.exmail.qq.com"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink/70">SMTP 端口</label>
                    <input
                      type="number"
                      value={settings.smtpPort}
                      onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                      placeholder="465"
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink/70">通知邮箱</label>
                    <input
                      type="email"
                      value={settings.notificationEmail}
                      onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })}
                      placeholder="admin@zeksmart.com"
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">SMTP 用户名</label>
                  <input
                    type="text"
                    value={settings.smtpUser}
                    onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                    placeholder="admin@zeksmart.com"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">SMTP 密码/授权码</label>
                  <input
                    type="password"
                    value={settings.smtpPass}
                    onChange={(e) => setSettings({ ...settings, smtpPass: e.target.value })}
                    placeholder="••••••••••••"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3 text-sm font-semibold text-sand hover:bg-teal disabled:opacity-50"
              >
                {loading ? "保存中..." : "保存设置"}
              </button>
            </div>
          </form>
        </Container>
      </main>
    </div>
  );
}
