"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, SectionHeading } from "@/components/layout";

interface HeroCard {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  order: number;
  enabled: boolean;
}

interface HomepageConfig {
  heroMainImage: string;
  heroCards: HeroCard[];
  productImages: string[];
  audienceImages: string[];
  trustItems: string[];
  valuePillars: string[];
  marketRegions: string[];
}

export default function AdminHomepagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [config, setConfig] = useState<HomepageConfig>({
    heroMainImage: "/hero/luxury-bathroom-scene.jpg",
    heroCards: [],
    productImages: [],
    audienceImages: [],
    trustItems: [],
    valuePillars: [],
    marketRegions: [],
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/homepage");
      const data = await res.json();
      if (data.config) {
        setConfig(data.config);
      }
    } catch (err) {
      console.error("Failed to fetch config", err);
    }
  };

  const handleImageUpload = async (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(field);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        if (field === "heroMainImage") {
          setConfig({ ...config, heroMainImage: data.url });
        }
      }
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(null);
    }
  };

  const handleHeroCardUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(`card-${index}`);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        const newCards = [...config.heroCards];
        newCards[index].imageSrc = data.url;
        setConfig({ ...config, heroCards: newCards });
      }
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(null);
    }
  };

  const addHeroCard = () => {
    const newCard: HeroCard = {
      id: crypto.randomUUID(),
      title: "New Card",
      imageSrc: "/hero/smart-bathroom-mirror.jpg",
      imageAlt: "Hero card image",
      order: config.heroCards.length + 1,
      enabled: true,
    };
    setConfig({ ...config, heroCards: [...config.heroCards, newCard] });
  };

  const removeHeroCard = (index: number) => {
    const newCards = config.heroCards.filter((_, i) => i !== index);
    setConfig({ ...config, heroCards: newCards });
  };

  const updateHeroCard = (index: number, field: keyof HeroCard, value: any) => {
    const newCards = [...config.heroCards];
    newCards[index] = { ...newCards[index], [field]: value };
    setConfig({ ...config, heroCards: newCards });
  };

  const handleTextListChange = (field: keyof HomepageConfig, value: string) => {
    const items = value.split("\n").filter(item => item.trim());
    setConfig({ ...config, [field]: items });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert("Save failed");
      }
    } catch (err) {
      alert("Save failed");
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
              <Link href="/admin/homepage" className="text-sm font-medium text-ink hover:text-teal">首页管理</Link>
              <Link href="/admin/settings" className="text-sm text-ink/70 hover:text-teal">站点设置</Link>
            </div>
          </div>
        </Container>
      </nav>

      <main className="py-8">
        <Container>
          <SectionHeading
            eyebrow="Admin"
            title="首页管理"
            description="管理网站首页图片、布局和内容配置"
          />

          {saved && (
            <div className="mt-4 rounded-lg bg-green/10 px-4 py-3 text-green">
              ✓ 设置已保存
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            {/* Hero Section */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-semibold text-ink">Hero 主图配置</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-ink/70 mb-2">主图片</label>
                {config.heroMainImage && (
                  <div className="mb-2">
                    <img src={config.heroMainImage} alt="Hero" className="h-48 w-full rounded-lg object-cover" />
                  </div>
                )}
                <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-ink/20 bg-sand/30 px-6 py-3 text-sm text-ink/70 hover:border-teal">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload("heroMainImage", e)}
                    className="hidden"
                    disabled={uploading === "heroMainImage"}
                  />
                  {uploading === "heroMainImage" ? "上传中..." : "更换主图"}
                </label>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-ink">Hero 卡片 (3 个)</h4>
                  <button
                    type="button"
                    onClick={addHeroCard}
                    className="text-sm font-medium text-teal hover:text-teal/80"
                  >
                    + 添加卡片
                  </button>
                </div>

                {config.heroCards.map((card, index) => (
                  <div key={card.id} className="rounded-lg border border-ink/10 p-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className="block text-xs font-medium text-ink/70">图片</label>
                        {card.imageSrc && (
                          <img src={card.imageSrc} alt={card.imageAlt} className="mt-1 h-24 w-full rounded object-cover" />
                        )}
                        <label className="mt-2 inline-flex cursor-pointer items-center justify-center rounded border border-ink/20 bg-sand/30 px-3 py-1.5 text-xs text-ink/70 hover:border-teal">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleHeroCardUpload(index, e)}
                            className="hidden"
                            disabled={uploading === `card-${index}`}
                          />
                          {uploading === `card-${index}` ? "上传中..." : "更换图片"}
                        </label>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-ink/70">标题</label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => updateHeroCard(index, "title", e.target.value)}
                          className="mt-1 w-full rounded border border-ink/12 bg-sand/30 px-3 py-1.5 text-sm text-ink focus:border-teal focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-ink/70">Alt 描述</label>
                        <input
                          type="text"
                          value={card.imageAlt}
                          onChange={(e) => updateHeroCard(index, "imageAlt", e.target.value)}
                          className="mt-1 w-full rounded border border-ink/12 bg-sand/30 px-3 py-1.5 text-sm text-ink focus:border-teal focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm text-ink/70">
                        <input
                          type="checkbox"
                          checked={card.enabled}
                          onChange={(e) => updateHeroCard(index, "enabled", e.target.checked)}
                          className="rounded border-ink/20 text-teal focus:ring-teal"
                        />
                        启用
                      </label>
                      <button
                        type="button"
                        onClick={() => removeHeroCard(index)}
                        className="text-sm text-red hover:text-red/80"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Items */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-semibold text-ink">Trust Strip 信任条目</h3>
              <textarea
                value={config.trustItems.join("\n")}
                onChange={(e) => handleTextListChange("trustItems", e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                placeholder="每行一个信任条目"
              />
              <p className="mt-2 text-xs text-ink/50">每行一个条目，目前 {config.trustItems.length} 个条目</p>
            </div>

            {/* Value Pillars */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-semibold text-ink">Value Pillars 价值支柱</h3>
              <textarea
                value={config.valuePillars.join("\n")}
                onChange={(e) => handleTextListChange("valuePillars", e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                placeholder="每行一个价值支柱"
              />
              <p className="mt-2 text-xs text-ink/50">每行一个条目，目前 {config.valuePillars.length} 个条目</p>
            </div>

            {/* Market Regions */}
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
              <h3 className="mb-4 text-lg font-semibold text-ink">Market Regions 目标市场</h3>
              <textarea
                value={config.marketRegions.join("\n")}
                onChange={(e) => handleTextListChange("marketRegions", e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-ink/12 bg-sand/30 px-4 py-2 text-ink focus:border-teal focus:outline-none"
                placeholder="每行一个市场区域"
              />
              <p className="mt-2 text-xs text-ink/50">每行一个区域，目前 {config.marketRegions.length} 个区域</p>
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-4">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center justify-center rounded-full border border-ink/20 px-8 py-3 text-sm font-semibold text-ink hover:bg-sand/50"
              >
                预览网站
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3 text-sm font-semibold text-sand hover:bg-teal disabled:opacity-50"
              >
                {loading ? "保存中..." : "保存配置"}
              </button>
            </div>
          </form>
        </Container>
      </main>
    </div>
  );
}
