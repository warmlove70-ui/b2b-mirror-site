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
