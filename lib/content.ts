import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const contentFile = path.join(dataDir, "content.json");

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: string;
  status: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
  author: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  whatsapp: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  notificationEmail?: string;
}

export interface HeroImage {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  order: number;
  enabled: boolean;
}

export interface HomePageConfig {
  heroMainImage: string;
  heroCards: HeroImage[];
  productImages: string[];
  audienceImages: string[];
  trustItems: string[];
  valuePillars: string[];
  marketRegions: string[];
}

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

export async function readContent(): Promise<BlogPost[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(contentFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveContent(post: BlogPost) {
  await ensureDataDir();
  const content = await readContent();
  
  const index = content.findIndex(p => p.id === post.id);
  if (index >= 0) {
    content[index] = { ...post, updatedAt: new Date().toISOString() };
  } else {
    content.push(post);
  }
  
  await fs.writeFile(contentFile, JSON.stringify(content, null, 2), "utf-8");
  return post;
}

export async function deleteContent(id: string) {
  await ensureDataDir();
  const content = await readContent();
  const filtered = content.filter(p => p.id !== id);
  await fs.writeFile(contentFile, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

export async function getContentById(id: string): Promise<BlogPost | undefined> {
  const content = await readContent();
  return content.find(p => p.id === id);
}

export async function getContentBySlug(slug: string): Promise<BlogPost | undefined> {
  const content = await readContent();
  return content.find(p => p.slug === slug);
}

// Site Settings
const settingsFile = path.join(dataDir, "settings.json");

export async function readSettings(): Promise<SiteSettings> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(settingsFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return {
      siteName: "ZEKSmart Export",
      contactEmail: "admin@zeksmart.com",
      whatsapp: "+86 13916383646",
      seoTitle: "ZEKSmart - Premium Bathroom Mirrors Manufacturer | Factory Direct",
      seoDescription: "ZEKSmart specializes in premium bathroom mirrors, LED mirrors, and decorative mirrors. Factory direct pricing, OEM/ODM services, 5-year warranty.",
      keywords: ["bathroom mirror", "LED mirror", "smart mirror", "wall mirror", "decorative mirror"],
    };
  }
}

export async function saveSettings(settings: SiteSettings) {
  await ensureDataDir();
  await fs.writeFile(settingsFile, JSON.stringify(settings, null, 2), "utf-8");
  return settings;
}

// Homepage Config
const homepageConfigFile = path.join(dataDir, "homepage-config.json");

export async function readHomepageConfig(): Promise<HomePageConfig> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(homepageConfigFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return {
      heroMainImage: "/hero/luxury-bathroom-scene.jpg",
      heroCards: [
        {
          id: "1",
          title: "Product",
          imageSrc: "/hero/smart-bathroom-mirror.jpg",
          imageAlt: "LED smart bathroom mirror",
          order: 1,
          enabled: true,
        },
        {
          id: "2",
          title: "Showroom",
          imageSrc: "/hero/showroom-neutral.jpg",
          imageAlt: "Showroom scene",
          order: 2,
          enabled: true,
        },
        {
          id: "3",
          title: "Workshop",
          imageSrc: "/hero/workshop-bright.jpg",
          imageAlt: "Factory workshop",
          order: 3,
          enabled: true,
        },
      ],
      productImages: [
        "/hero/smart-bathroom-mirror.jpg",
        "/hero/luxury-dressing-scene.jpg",
        "/products/irregular-wavy-wall-mirror.png",
        "/hero/hero-minimal-mirror.jpg",
        "/hero/entryway-mirror.webp",
        "/products/irregular-wavy-wall-mirror.png",
      ],
      audienceImages: [
        "/hero/showroom-neutral.jpg",
        "/hero/luxury-dressing-scene.jpg",
        "/hero/luxury-bathroom-scene.jpg",
      ],
      trustItems: [
        "17 years serving small buyers, growing brands, and project customers",
        "ISO 9001 quality system",
        "CE / UL / CB / UKCA / RoHS compliance coverage",
        "OEM / ODM development and export packaging support",
      ],
      valuePillars: [
        "OEM / ODM development",
        "Wholesale production",
        "Project supply coordination",
        "Export packaging and documentation",
      ],
      marketRegions: ["Middle East", "South America", "Central Asia"],
    };
  }
}

export async function saveHomepageConfig(config: HomePageConfig) {
  await ensureDataDir();
  await fs.writeFile(homepageConfigFile, JSON.stringify(config, null, 2), "utf-8");
  return config;
}
