import { Container } from "@/components/layout";
import { getAdminPassword } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const configured = Boolean(getAdminPassword());
  const next = searchParams?.next || "/admin/leads";

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-md rounded-[2rem] border border-ink/10 bg-white/90 p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-copper">Admin</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Secure login</h1>
          <p className="mt-3 text-sm leading-6 text-ink/72">
            Enter the admin password to access lead records and export tools.
          </p>

          {configured ? (
            <LoginForm next={next} />
          ) : (
            <div className="mt-6 rounded-2xl bg-[#fff3f1] px-4 py-4 text-sm text-[#9f3d2e]">
              ADMIN_PASSWORD is not configured yet. Set it in your environment before using the
              admin area.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
