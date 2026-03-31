import { Container } from "@/components/layout";
import { CtaBanner, PageHero } from "@/components/sections";

const importerPoints = [
  "Private label and mixed-category container planning",
  "Export packaging, markings, and document coordination",
  "Responsive sampling for market validation",
  "Range development for wholesale and chain retail buyers",
];

export default function ImportersPage() {
  return (
    <>
      <PageHero
        eyebrow="For Importers"
        title="Built for buyers who need predictable supply and catalog-ready collections."
        description="This page frames the company as a practical manufacturing partner for wholesalers, distributors, and private label import programs."
        aside={
          <div className="space-y-4">
            <p className="text-lg font-semibold">Importer priorities</p>
            {importerPoints.map((point) => (
              <div key={point} className="rounded-2xl bg-sand px-4 py-3 text-sm text-ink/74">
                {point}
              </div>
            ))}
          </div>
        }
      />
      <section className="pb-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <ValueCard
              title="Range Planning"
              text="Support for combining smart mirrors, wall mirrors, and full-length mirrors into coherent buying programs."
            />
            <ValueCard
              title="OEM / ODM"
              text="Adapt dimensions, finishes, packaging, and label details to fit your channel and regional demand."
            />
            <ValueCard
              title="Fast Inquiry Flow"
              text="The site directs import buyers toward catalog request, RFQ, and sample actions instead of retail checkout paths."
            />
          </div>
        </Container>
      </section>
      <CtaBanner
        title="Need an import catalog or quotation sheet?"
        description="Send product interests, target region, and estimated quantities through the contact page."
      />
    </>
  );
}

function ValueCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.8rem] border border-ink/10 bg-white/85 p-6 shadow-soft">
      <div className="mb-5 h-32 rounded-[1.3rem] bg-gradient-to-br from-white to-mist" />
      <p className="text-xl font-semibold">{title}</p>
      <p className="mt-3 text-sm leading-6 text-ink/72">{text}</p>
    </div>
  );
}
