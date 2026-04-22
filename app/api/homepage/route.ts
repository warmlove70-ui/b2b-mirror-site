import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readHomepageConfig, saveHomepageConfig, HomePageConfig } from "@/lib/content";

export async function GET() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = await readHomepageConfig();
  return NextResponse.json({ config });
}

export async function POST(request: NextRequest) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const config: HomePageConfig = body;
    const saved = await saveHomepageConfig(config);
    return NextResponse.json({ config: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save homepage config" }, { status: 500 });
  }
}
