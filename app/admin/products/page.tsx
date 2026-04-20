import Link from "next/link";
import { redirect } from "next/navigation";
import { Container, SectionHeading } from "@/components/layout";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readProducts } from "@/lib/products";
import { LogoutButton } from "@/app/admin/logout-button";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login?next=/admin/products");
  }

  const products = await readProducts();

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
                <Link href="/admin/products" className="text-sm font-medium text-ink hover:text-teal">
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
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Admin"
              title="产品管理"
              description="管理 ZEKSmart 官网产品，包括浴室镜、穿衣镜、相框等系列产品"
            />
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/products/new"
                className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-sand hover:bg-teal"
              >
                + 添加产品
              </Link>
            </div>
          </div>

          <div className="mt-10 rounded-[1.8rem] border border-ink/10 bg-white/85 p-4 shadow-soft sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-ink/70">总产品数</p>
              <p className="text-2xl font-semibold text-ink">{products.length}</p>
            </div>

            {products.length === 0 ? (
              <div className="rounded-2xl bg-sand px-4 py-12 text-center text-sm text-ink/70">
                <p className="mb-4">暂无产品</p>
                <Link
                  href="/admin/products/new"
                  className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2 text-sm font-semibold text-sand hover:bg-teal"
                >
                  添加第一个产品
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink/10 text-ink/60">
                      <th className="pb-3 pl-2">状态</th>
                      <th className="pb-3">产品名称</th>
                      <th className="pb-3">类别</th>
                      <th className="pb-3">价格 (USD)</th>
                      <th className="pb-3">MOQ</th>
                      <th className="pb-3">尺寸</th>
                      <th className="pb-3">更新时间</th>
                      <th className="pb-3 pr-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-ink/5 last:border-0">
                        <td className="py-3 pl-2">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            product.status === "published" 
                              ? "bg-green/10 text-green" 
                              : "bg-yellow/10 text-yellow"
                          }`}>
                            {product.status === "published" ? "已发布" : "草稿"}
                          </span>
                        </td>
                        <td className="py-3 font-medium text-ink">{product.name}</td>
                        <td className="py-3 text-ink/70">{product.category}</td>
                        <td className="py-3 text-ink/70">${product.price}</td>
                        <td className="py-3 text-ink/70">{product.moq}</td>
                        <td className="py-3 text-ink/70">{product.size}</td>
                        <td className="py-3 text-ink/70">{formatDate(product.updatedAt)}</td>
                        <td className="py-3 pr-2 text-right">
                          <Link
                            href={`/admin/products/${product.id}`}
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
            )}
          </div>
        </Container>
      </main>
    </div>
  );
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Shanghai",
    }).format(new Date(value));
  } catch {
    return value;
  }
}
