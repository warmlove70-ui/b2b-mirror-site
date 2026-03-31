import { NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/mailer";
import { readLeads, saveLead } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const company = String(body?.company || "").trim();
    const email = String(body?.email || "").trim();
    const need = String(body?.need || "").trim();

    if (!name || !email || !need) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const lead = {
      id: crypto.randomUUID(),
      name,
      company,
      email,
      need,
      createdAt: new Date().toISOString(),
      source: "floating-smart-chat",
    };

    await saveLead(lead);

    const notify = await sendLeadNotification(lead).catch(() => ({ ok: false, skipped: true }));

    return NextResponse.json({ ok: true, lead, notify });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save lead." }, { status: 500 });
  }
}

export async function GET() {
  const leads = await readLeads();
  return NextResponse.json({ ok: true, leads });
}
