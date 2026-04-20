import Link from "next/link";
import { redirect } from "next/navigation";
import { Container, SectionHeading } from "@/components/layout";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { LogoutButton } from "./logout-button";

export const dynamic = "force-dynamic";

// 示例博客文章数据（后续可扩展为文件存储或数据库）
const samplePosts = [
  {
    id: "1",
    title: "Energy Efficiency of LED Mirrors: What You Need to Know",
    slug: "energy-efficiency-led-mirrors",
    status: "published",
    category: "Product Knowledge",
    publishedAt: "2026-03-15",
    views: 245,
  },
  {
    id: "2",
    title: "How to Choose the Right Bathroom Mirror for Your Space",
    slug: "choose-right-bathroom-mirror",
    status: "published",
    category: "Buying Guide",
    publishedAt: "2026-03-20",
    views: 189,
  },
  {
    id: "3",
    title: "Top 10 Bathroom Design Trends in 2026",
    slug: "bathroom-design-trends-2026",
    status: "draft",
    category: "Design Trends",
    publishedAt: null,
    views: 0,
  },
];

export default async function AdminContentPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login?next=/admin/content");
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
                <Link href="/admin/content" className="text-sm font-medium text-ink hover:text-teal">
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
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Admin"
              title="内容管理"
              description="管理博客文章、SEO 内容、品牌故事等网站内容"
            />
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/content/new"
                className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-sand hover:bg-teal"
              >
                + 新建文章
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-soft">
              <p className="text-sm text-ink/60">总文章数</p>
              <p className="mt-1 text-2xl font-bold text-ink">{samplePosts.length}</p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-soft">
              <p className="text-sm text-ink/60">已发布</p>
              <p className="mt-1 text-2xl font-bold text-green">
                {samplePosts.filter(p => p.status === "published").length}
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-soft">
              <p className="text-sm text-ink/60">草稿</p>
              <p className="mt-1 text-2xl font-bold text-yellow">
                {samplePosts.filter(p => p.status === "draft").length}
              </p>
            </div>
          </div>

          {/* Posts Table */}
          <div className="mt-8 rounded-[1.8rem] border border-ink/10 bg-white/85 p-4 shadow-soft sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-ink/10 text-ink/60">
                    <th className="pb-3 pl-2">状态</th>
                    <th className="pb-3">标题</th>
                    <th className="pb-3">类别</th>
                    <th className="pb-3">发布日期</th>
                    <th className="pb-3">浏览量</th>
                    <th className="pb-3 pr-2">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {samplePosts.map((post) => (
                    <tr key={post.id} className="border-b border-ink/5 last:border-0">
                      <td className="py-3 pl-2">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          post.status === "published" 
                            ? "bg-green/10 text-green" 
                            : "bg-yellow/10 text-yellow"
                        }`}>
                          {post.status === "published" ? "已发布" : "草稿"}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-ink">{post.title}</td>
                      <td className="py-3 text-ink/70">{post.category}</td>
                      <td className="py-3 text-ink/70">{post.publishedAt || "-"}</td>
                      <td className="py-3 text-ink/70">{post.views}</td>
                      <td className="py-3 pr-2 text-right">
                        <Link
                          href={`/admin/content/${post.id}`}
                          className="text-teal hover:text-teal/80"
                        >
                          编辑
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SEO Tips */}
          <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
            <h3 className="mb-4 text-lg font-semibold text-ink">SEO 建议</h3>
            <ul className="space-y-2 text-sm text-ink/70">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-teal">✓</span>
                <span>每篇文章聚焦 1-2 个核心关键词，避免关键词堆砌</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-teal">✓</span>
                <span>标题控制在 60 字符以内，确保在搜索结果中完整显示</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-teal">✓</span>
                <span>添加内部链接到相关产品页面，提升页面权重</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-teal">✓</span>
                <span>为图片添加 alt 描述，提升图片搜索排名</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-teal">✓</span>
                <span>保持每周 1-2 篇更新频率，持续提升网站活跃度</span>
              </li>
            </ul>
          </div>
        </Container>
      </main>
    </div>
  );
}
