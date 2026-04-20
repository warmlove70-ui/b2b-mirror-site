import { NextResponse } from "next/server";
import { readProducts, saveProduct, deleteProduct, getProductById } from "@/lib/products";

// GET /api/products - 获取所有产品
// GET /api/products?id=xxx - 获取单个产品
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (id) {
      const product = await getProductById(id);
      if (!product) {
        return NextResponse.json({ ok: false, error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json({ ok: true, product });
    }
    
    const products = await readProducts();
    return NextResponse.json({ ok: true, products });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/products - 创建/更新产品
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const product = {
      id: body.id || crypto.randomUUID(),
      name: String(body?.name || "").trim(),
      category: String(body?.category || "").trim(),
      price: Number(body?.price || 0),
      moq: Number(body?.moq || 5),
      size: String(body?.size || "").trim(),
      material: String(body?.material || "").trim(),
      color: String(body?.color || "").trim(),
      features: Array.isArray(body?.features) ? body.features : [],
      images: Array.isArray(body?.images) ? body.images : [],
      description: String(body?.description || "").trim(),
      status: body?.status || "draft",
      createdAt: body?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    if (!product.name || !product.category) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }
    
    await saveProduct(product);
    return NextResponse.json({ ok: true, product });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to save product" }, { status: 500 });
  }
}

// DELETE /api/products?id=xxx - 删除产品
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ ok: false, error: "Product ID required" }, { status: 400 });
    }
    
    await deleteProduct(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to delete product" }, { status: 500 });
  }
}
