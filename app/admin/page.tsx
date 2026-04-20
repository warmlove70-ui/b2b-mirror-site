import Link from "next/link";
import { redirect } from "next/navigation";
import { Container, SectionHeading } from "@/components/layout";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readLeads } from "@/lib/leads";
import { LogoutButton } from "@/app/admin/logout-button";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login?next=/admin");
  }

  const leads = await readLeads();
  const totalLeads = leads.length;
  const recentLeads = leads.slice(-10).reverse();
  
  // 计算今日/本周询盘
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString();
  
  const todayLeads = leads.filter(l => l.createdAt >= todayStart).length;
  const weekLeads = leads.filter(l => l.createdAt >= weekStart).length;

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
                <Link href="/admin" className="text-sm font-medium text-ink hover:text-teal">
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
                <Link href="/admin/settings" className="text-sm text-ink/70 hover:text-teal">
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
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-ink">欢迎回来，Cliff 总</h1>
            <p className="text-ink/60">这是 ZEKSmart 官网管理后台数据概览</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Leads */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink/60">总询盘数</p>
                  <p className="mt-2 text-3xl font-bold text-ink">{totalLeads}</p>
                </div>
                <div className="rounded-full bg-teal/10 p-3">
                  <svg className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Today Leads */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink/60">今日询盘</p>
                  <p className="mt-2 text-3xl font-bold text-ink">{todayLeads}</p>
                </div>
                <div className="rounded-full bg-blue/10 p-3">
                  <svg className="h-6 w-6 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Week Leads */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink/60">本周询盘</p>
                  <p className="mt-2 text-3xl font-bold text-ink">{weekLeads}</p>
                </div>
                <div className="rounded-full bg-purple/10 p-3">
                  <svg className="h-6 w-6 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink/60">在线产品</p>
                  <p className="mt-2 text-3xl font-bold text-ink">17</p>
                </div>
                <div className="rounded-full bg-orange/10 p-3">
                  <svg className="h-6 w-6 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Leads Table */}
          <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">最近询盘</h2>
              <Link 
                href="/admin/leads" 
                className="text-sm font-medium text-teal hover:text-teal/80"
              >
                查看全部 →
              </Link>
            </div>
            
            {recentLeads.length === 0 ? (
              <div className="rounded-xl bg-sand/50 px-4 py-8 text-center text-ink/60">
                暂无询盘数据
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink/10 text-ink/60">
                      <th className="pb-3 pl-2">时间</th>
                      <th className="pb-3">姓名</th>
                      <th className="pb-3">公司</th>
                      <th className="pb-3">邮箱</th>
                      <th className="pb-3">需求</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-ink/5 last:border-0">
                        <td className="py-3 pl-2 text-ink/70">{formatTime(lead.createdAt)}</td>
                        <td className="py-3 font-medium text-ink">{lead.name}</td>
                        <td className="py-3 text-ink/70">{lead.company || "-"}</td>
                        <td className="py-3 text-ink/70">{lead.email}</td>
                        <td className="py-3 text-ink/70">{lead.need}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link 
              href="/admin/products" 
              className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft transition hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-teal/10 p-3">
                  <svg className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-ink">添加产品</h3>
                  <p className="text-sm text-ink/60">上架新产品</p>
                </div>
              </div>
            </Link>

            <Link 
              href="/admin/content" 
              className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft transition hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue/10 p-3">
                  <svg className="h-6 w-6 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-ink">发布文章</h3>
                  <p className="text-sm text-ink/60">博客/SEO 内容</p>
                </div>
              </div>
            </Link>

            <Link 
              href="/api/leads/export" 
              className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft transition hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-purple/10 p-3">
                  <svg className="h-6 w-6 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-ink">导出询盘</h3>
                  <p className="text-sm text-ink/60">CSV 格式下载</p>
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </main>
    </div>
  );
}

function formatTime(value: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Shanghai",
    }).format(new Date(value));
  } catch {
    return value;
  }
}
