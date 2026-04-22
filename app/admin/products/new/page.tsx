"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Smart Bathroom Mirrors",
    price: "",
    moq: "",
    size: "",
    material: "",
    color: "",
    features: "",
    description: "",
    status: "draft",
  });

  const [images, setImages] = useState<string[]>([]);

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
        setImages([...images, data.url]);
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
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id: crypto.randomUUID(),
          price: parseFloat(formData.price) || 0,
          moq: parseInt(formData.moq) || 1,
          features: formData.features.split("\n").filter(f => f.trim()),
          images,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
      } else {
        setError("Failed to save product");
      }
    } catch (err) {
      setError("Failed to save product");
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
            <Link href="/admin/products" className="text-sm text-ink/70 hover:text-teal">
              ← 返回产品列表
            </Link>
          </div>
        </Container>
      </nav>

      <main className="py-8">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl font-bold text-ink">添加新产品</h1>
            <p className="text-ink/60">填写产品信息以添加到网站</p>

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
                  <div>
                    <label className="block text-sm font-medium text-ink/70">产品名称 *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                      placeholder="e.g. LED Smart Bathroom Mirror"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink/70">类别 *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                    >
                      <option>Smart Bathroom Mirrors</option>
                      <option>Full Length Mirrors</option>
                      <option>Irregular Wavy Wall Mirrors</option>
                      <option>Wall Mirrors</option>
                      <option>Wooden Frames</option>
                      <option>Decorative Mirrors</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink/70">价格 (USD) *</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                      placeholder="e.g. 85.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink/70">MOQ (最小起订量) *</label>
                    <input
                      type="number"
                      required
                      value={formData.moq}
                      onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                      placeholder="e.g. 50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink/70">尺寸</label>
                    <input
                      type="text"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                      placeholder="e.g. 600x800mm, 800x1200mm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink/70">材质</label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                      placeholder="e.g. Aluminum, Iron, Wood"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink/70">颜色</label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                      placeholder="e.g. Silver, Black, Gold"
                    />
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
                </div>
              </div>

              {/* Features */}
              <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
                <h3 className="mb-4 text-lg font-semibold text-ink">产品特点</h3>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  placeholder="每行一个特点，例如：&#10;LED lighting with dimming&#10;Anti-fog function&#10;Bluetooth speaker&#10;Touch control"
                />
              </div>

              {/* Description */}
              <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
                <h3 className="mb-4 text-lg font-semibold text-ink">产品描述</h3>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                  placeholder="详细的产品描述，包括规格、优势、应用场景等..."
                />
              </div>

              {/* Images */}
              <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
                <h3 className="mb-4 text-lg font-semibold text-ink">产品图片</h3>
                <div className="mb-4 flex flex-wrap gap-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative h-32 w-32 overflow-hidden rounded-lg border border-ink/10">
                      <img src={img} alt={`Product ${idx}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                  <label className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-ink/20 bg-sand/30 hover:border-teal">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    {uploadingImage ? (
                      <span className="text-sm text-ink/60">上传中...</span>
                    ) : (
                      <span className="text-sm text-ink/60">+ 添加图片</span>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-4">
                <Link
                  href="/admin/products"
                  className="inline-flex items-center justify-center rounded-full border border-ink/20 px-8 py-3 text-sm font-semibold text-ink hover:bg-sand/50"
                >
                  取消
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3 text-sm font-semibold text-sand hover:bg-teal disabled:opacity-50"
                >
                  {loading ? "保存中..." : "保存产品"}
                </button>
              </div>
            </form>
          </div>
        </Container>
      </main>
    </div>
  );
}
