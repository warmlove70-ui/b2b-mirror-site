import Link from "next/link";
import { redirect } from "next/navigation";
import { Container, SectionHeading } from "@/components/layout";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readLeads } from "@/lib/leads";
import { LogoutButton } from "./logout-button";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login?next=/admin/leads");
  }

  const leads = await readLeads();
  const ordered = [...leads].reverse();

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Admin"
            title="Lead inbox"
            description="View the latest website inquiries captured by the smart chat widget and export them as CSV."
          />
          <div className="flex flex-wrap gap-3">
            <Link
              href="/api/leads/export"
              className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-sand hover:bg-teal"
            >
              Export CSV
            </Link>
            <Link
              href="/api/leads"
              className="inline-flex items-center justify-center rounded-full border border-ink/12 bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-sand"
            >
              View JSON
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-10 rounded-[1.8rem] border border-ink/10 bg-white/85 p-4 shadow-soft sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-ink/70">Total leads</p>
            <p className="text-2xl font-semibold text-ink">{ordered.length}</p>
          </div>

          {ordered.length === 0 ? (
            <div className="rounded-2xl bg-sand px-4 py-6 text-sm text-ink/70">
              No leads yet. Once visitors submit the floating smart chat form, they will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
                <thead>
                  <tr className="text-ink/60">
                    <th className="px-4">Time</th>
                    <th className="px-4">Name</th>
                    <th className="px-4">Company</th>
                    <th className="px-4">Email</th>
                    <th className="px-4">Need</th>
                    <th className="px-4">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {ordered.map((lead) => (
                    <tr key={lead.id} className="rounded-2xl bg-sand text-ink shadow-sm">
                      <td className="rounded-l-2xl px-4 py-4 align-top">{formatTime(lead.createdAt)}</td>
                      <td className="px-4 py-4 align-top font-medium">{lead.name}</td>
                      <td className="px-4 py-4 align-top">{lead.company || "-"}</td>
                      <td className="px-4 py-4 align-top">{lead.email}</td>
                      <td className="px-4 py-4 align-top">{lead.need}</td>
                      <td className="rounded-r-2xl px-4 py-4 align-top">{lead.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function formatTime(value: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Shanghai",
    }).format(new Date(value));
  } catch {
    return value;
  }
}
