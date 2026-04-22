"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout";

export default function NewContentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Product Knowledge",
    tags: "",
    seoTitle: "",
    seoDescription: "",
    author: "ZEKSmart Team",
    status: "draft",
  });

  const [coverImage, setCoverImage] = useState<string>("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setCoverImage(data.url);
      }
    } catch (err) {
      setError("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id: crypto.randomUUID(),
          tags: formData.tags.split(",").map(t => t.trim()).filter(t => t),
          publishedAt: formData.status === "published" ? new Date().toISOString() : undefined,
        }),
      });

      if (res.ok) {
        router.push("/admin/content");
      } else {
        setError("Failed to save content");
      }
    } catch (err) {
      setError("Failed to save content");
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
            <Link href="/admin/content" className="text-sm text-ink/70 hover:text-teal">
              ← 返回内容列表
            </Link>
          </div>
        </Container>
      </nav>

      <main className="py-8">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-bold text-ink">新建文章</h1>
            <p className="text-ink/60">创建博客文章、SEO 内容或品牌故事</p>

            {error && (
              <div className="mt-4 rounded-lg bg-red/10 px-4 py-3 text-red">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Basic Info */}
              <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
                <h3 className="mb-4 text-lg font-semibold text-ink">基本信息</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-ink/70">标题 *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                        setFormData({ ...formData, title, slug });
                      }}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                      placeholder="e.g. How to Choose the Right Bathroom Mirror"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-ink/70">Slug (URL)</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                      placeholder="how-to-choose-bathroom-mirror"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink/70">类别</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                    >
                      <option>Product Knowledge</option>
                      <option>Buying Guide</option>
                      <option>Design Trends</option>
                      <option>Company News</option>
                      <option>Case Study</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink/70">状态</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                    >
                      <option value="draft">草稿</option>
                      <option value="published">已发布</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-ink/70">摘要</label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={2}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                      placeholder="简短的文章摘要，用于列表页显示..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-ink/70">标签</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                      placeholder="用逗号分隔，例如：bathroom, mirror, LED, smart home"
                    />
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
                <h3 className="mb-4 text-lg font-semibold text-ink">封面图片</h3>
                {coverImage ? (
                  <div className="mb-4">
                    <img src={coverImage} alt="Cover" className="h-48 w-full rounded-lg object-cover" />
                  </div>
                ) : null}
                <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-ink/20 bg-sand/30 px-6 py-3 text-sm text-ink/70 hover:border-teal">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                  {uploadingImage ? "上传中..." : "选择封面图片"}
                </label>
              </div>

              {/* Content */}
              <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
                <h3 className="mb-4 text-lg font-semibold text-ink">文章内容</h3>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  className="w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  placeholder="使用 Markdown 格式编写文章内容..."
                />
              </div>

              {/* SEO */}
              <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
                <h3 className="mb-4 text-lg font-semibold text-ink">SEO 设置</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-ink/70">SEO 标题</label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                      placeholder="留空则使用文章标题"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink/70">SEO 描述</label>
                    <textarea
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      rows={2}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                      placeholder="用于搜索引擎结果展示的描述（150-160 字符）"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-4">
                <Link
                  href="/admin/content"
                  className="inline-flex items-center justify-center rounded-full border border-ink/20 px-8 py-3 text-sm font-semibold text-ink hover:bg-sand/50"
                >
                  取消
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3 text-sm font-semibold text-sand hover:bg-teal disabled:opacity-50"
                >
                  {loading ? "保存中..." : "保存文章"}
                </button>
              </div>
            </form>
          </div>
        </Container>
      </main>
    </div>
  );
}
