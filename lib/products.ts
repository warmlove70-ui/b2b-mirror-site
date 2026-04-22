import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const productsFile = path.join(dataDir, "products.json");

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  moq: number;
  size: string;
  material: string;
  color: string;
  features: string[];
  images: string[];
  description: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

export async function readProducts(): Promise<Product[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(productsFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveProduct(product: Product) {
  await ensureDataDir();
  const products = await readProducts();
  
  const index = products.findIndex(p => p.id === product.id);
  if (index >= 0) {
    products[index] = { ...product, updatedAt: new Date().toISOString() };
  } else {
    products.push(product);
  }
  
  await fs.writeFile(productsFile, JSON.stringify(products, null, 2), "utf-8");
  return product;
}

export async function deleteProduct(id: string) {
  await ensureDataDir();
  const products = await readProducts();
  const filtered = products.filter(p => p.id !== id);
  await fs.writeFile(productsFile, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await readProducts();
  return products.find(p => p.id === id);
}
