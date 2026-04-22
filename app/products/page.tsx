import Image from "next/image";
import { Container, SectionHeading } from "@/components/layout";
import { productCategories } from "@/components/site-data";
import { CtaBanner, PageHero } from "@/components/sections";

const categoryImages: Record<string, string> = {
  "Smart Bathroom Mirrors": "/hero/smart-mirror.png",
  "Full Length Mirrors": "/hero/floor-mirror.png",
  "Irregular Wavy Wall Mirrors": "/products/irregular-wavy-wall-mirror.png",
  "Wall Mirrors": "/hero/luxury-bathroom-mirror.jpg",
  "Wooden Frames": "/hero/showroom.jpg",
  "Decorative Mirrors": "/hero/luxury-living-mirror.jpg",
};

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
            description="Browse our core mirror collections designed for B2B buyers, importers, and project partners."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {productCategories.map((category, index) => {
              const imageSrc = categoryImages[category.title] || "/hero/smart-mirror.png";
              return (
                <div
                  key={category.title}
                  className="rounded-[1.9rem] border border-ink/10 bg-white/85 p-6 shadow-soft"
                >
                  <div className="mb-5 relative h-44 rounded-[1.3rem] overflow-hidden bg-mist">
                    <Image
                      src={imageSrc}
                      alt={category.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>
                  <p className="text-2xl font-semibold">{category.title}</p>
                  <p className="mt-3 text-sm leading-6 text-ink/72">{category.description}</p>
                  <p className="mt-4 rounded-full bg-sand px-4 py-2 text-sm text-copper">
                    {category.applications}
                  </p>
                </div>
              );
            })}
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
