import Link from "next/link";
import { redirect } from "next/navigation";
import { Container, SectionHeading } from "@/components/layout";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { LogoutButton } from "./logout-button";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login?next=/admin/settings");
  }

  return (
    <div className="min-h-screen bg-sand/30">
      {/* Top Navigation */}
      <nav className="border-b border-ink/10 bg-white/80 backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-bold text-ink">
                ZEKSMART Admin
              </Link>
              <div className="flex gap-4">
                <Link href="/admin" className="text-sm text-ink/70 hover:text-teal">
                  Dashboard
                </Link>
                <Link href="/admin/leads" className="text-sm text-ink/70 hover:text-teal">
                  询盘管理
                </Link>
                <Link href="/admin/products" className="text-sm text-ink/70 hover:text-teal">
                  产品管理
                </Link>
                <Link href="/admin/content" className="text-sm text-ink/70 hover:text-teal">
                  内容管理
                </Link>
                <Link href="/admin/settings" className="text-sm font-medium text-ink hover:text-teal">
                  站点设置
                </Link>
              </div>
            </div>
            <LogoutButton />
          </div>
        </Container>
      </nav>

      {/* Main Content */}
      <main className="py-8">
        <Container>
          <SectionHeading
            eyebrow="Admin"
            title="站点设置"
            description="配置网站基本信息、SEO 设置、联系方式、第三方集成等"
          />

          <div className="mt-8 space-y-6">
            {/* Basic Settings */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-semibold text-ink">基本信息</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink/70">网站名称</label>
                  <input
                    type="text"
                    defaultValue="ZEKSmart Export"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">联系邮箱</label>
                  <input
                    type="email"
                    defaultValue="admin@zeksmart.com"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">WhatsApp</label>
                  <input
                    type="text"
                    defaultValue="+86 13916383646"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-semibold text-ink">SEO 设置</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink/70">Meta Title</label>
                  <input
                    type="text"
                    defaultValue="ZEKSmart - Premium Bathroom Mirrors Manufacturer | Factory Direct"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-ink/50">建议 50-60 字符</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">Meta Description</label>
                  <textarea
                    rows={3}
                    defaultValue="ZEKSmart specializes in premium bathroom mirrors, LED mirrors, and decorative mirrors. Factory direct pricing, OEM/ODM services, 5-year warranty. Perfect for importers, designers, and construction projects."
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-ink/50">建议 150-160 字符</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">关键词</label>
                  <input
                    type="text"
                    defaultValue="bathroom mirror, LED mirror, smart mirror, wall mirror, decorative mirror, manufacturer, factory direct"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-ink/50">逗号分隔</p>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-semibold text-ink">网站分析</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink/70">Google Analytics ID</label>
                  <input
                    type="text"
                    placeholder="G-XXXXXXXXXX"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">Google Tag Manager ID</label>
                  <input
                    type="text"
                    placeholder="GTM-XXXXXXX"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
                <div className="rounded-lg bg-sand/50 px-4 py-3 text-sm text-ink/70">
                  <p className="font-medium">💡 提示</p>
                  <p>在 Vercel 后台启用 Web Analytics 可自动追踪网站访问量、来源、热门页面等数据。</p>
                </div>
              </div>
            </div>

            {/* Email Notification */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-semibold text-ink">邮件通知</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink/70">SMTP 主机</label>
                  <input
                    type="text"
                    placeholder="smtp.exmail.qq.com"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink/70">SMTP 端口</label>
                    <input
                      type="number"
                      placeholder="465"
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink/70">通知邮箱</label>
                    <input
                      type="email"
                      placeholder="admin@zeksmart.com"
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">SMTP 用户名</label>
                  <input
                    type="text"
                    placeholder="admin@zeksmart.com"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70">SMTP 密码/授权码</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3 text-sm font-semibold text-sand hover:bg-teal"
              >
                保存设置
              </button>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
