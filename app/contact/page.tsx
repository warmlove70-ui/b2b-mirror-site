import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/layout";
import { PageHero } from "@/components/sections";
import { brand } from "@/components/site-data";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start your inquiry with catalog, quote, sample, or project details."
        description="This contact page is now aligned as a brand-ready B2B lead capture point for ZEKSmart export business."
        aside={
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-copper">Direct contact</p>
            <div className="rounded-2xl bg-sand p-4">
              <p className="text-sm font-medium text-ink/70">Website</p>
              <p className="mt-1 text-xl font-semibold">{brand.website}</p>
            </div>
            <div className="rounded-2xl bg-sand p-4">
              <p className="text-sm font-medium text-ink/70">Email</p>
              <p className="mt-1 text-xl font-semibold">{brand.email}</p>
            </div>
          </div>
        }
      />
      <section className="pb-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <ContactForm />
            <div className="space-y-6">
              <InfoCard
                title="Typical inquiries"
                items={[
                  "Get catalog for target market review",
                  "Request quotation for one or more categories",
                  "Ask for sample or finish development",
                  "Share project scope or room schedule",
                ]}
              />
              <InfoCard
                title="Suggested next integrations"
                items={[
                  "Connect form to API route and email service",
                  "Push leads into CRM or WhatsApp automation",
                  "Attach downloadable catalog PDF",
                  "Add SKU gallery and regional case studies",
                ]}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.8rem] border border-ink/10 bg-white/85 p-6 shadow-soft">
      <p className="text-xl font-semibold">{title}</p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl bg-sand px-4 py-3 text-sm text-ink/72">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
