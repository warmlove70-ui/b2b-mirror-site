import { readLeads, toCsv } from "@/lib/leads";

export async function GET() {
  const leads = await readLeads();
  const csv = toCsv(leads);

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="zeksmart-leads.csv"',
      "Cache-Control": "no-store",
    },
  });
}
