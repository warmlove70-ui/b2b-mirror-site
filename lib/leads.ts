import { promises as fs } from "fs";
import path from "path";

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  need: string;
  createdAt: string;
  source: string;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "leads.json");

export async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

export async function saveLead(lead: Lead) {
  const leads = await readLeads();
  leads.push(lead);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(leads, null, 2), "utf8");
}

export function toCsv(leads: Lead[]) {
  const header = ["id", "name", "company", "email", "need", "createdAt", "source"];
  const escape = (value: string) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const rows = leads.map((lead) =>
    [lead.id, lead.name, lead.company, lead.email, lead.need, lead.createdAt, lead.source]
      .map(escape)
      .join(","),
  );
  return [header.join(","), ...rows].join("\n");
}
