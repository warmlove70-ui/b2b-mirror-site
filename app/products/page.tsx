import { Container, SectionHeading } from "@/components/layout";
import { productCategories } from "@/components/site-data";
import { CtaBanner, PageHero } from "@/components/sections";

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Mirror categories designed for wholesale catalogs and project supply."
        description="This page presents the requested product groups with clean category-level messaging suitable for early-stage B2B inquiries."
        aside={
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-copper">What buyers need fast</p>
            <ul className="space-y-3 text-sm leading-6 text-ink/72">
              <li>Category overview before full catalog download</li>
              <li>Clarity on materials, style direction, and use cases</li>
              <li>Simple path to quote, sample, or OEM discussion</li>
            </ul>
          </div>
        }
      />
      <section className="pb-12">
        <Container>
          <SectionHeading
            eyebrow="Category Grid"
            title="Requested product categories"
            description="Placeholder visuals are used here so the site is production-ready structurally while waiting for real photography or product renders."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {productCategories.map((category, index) => (
              <div
                key={category.title}
                className="rounded-[1.9rem] border border-ink/10 bg-white/85 p-6 shadow-soft"
              >
                <div
                  className={`mb-5 h-44 rounded-[1.3rem] ${
                    index % 2 === 0 ? "bg-gradient-to-br from-mist to-white" : "bg-gradient-to-br from-sand to-mist"
                  }`}
                />
                <p className="text-2xl font-semibold">{category.title}</p>
                <p className="mt-3 text-sm leading-6 text-ink/72">{category.description}</p>
                <p className="mt-4 rounded-full bg-sand px-4 py-2 text-sm text-copper">
                  {category.applications}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner
        title="Move from category interest to an exact export offer."
        description="Ask for the catalog, confirm MOQ, or start a custom development conversation for your market."
      />
    </>
  );
}
