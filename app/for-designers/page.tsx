import { Container } from "@/components/layout";
import { CtaBanner, PageHero } from "@/components/sections";

const designerBlocks = [
  {
    title: "Material Direction",
    text: "Iron, solid wood, glass finishes, and decorative layering aligned with different interior languages.",
  },
  {
    title: "Custom Shapes",
    text: "Arched, full-length, wall-mounted, and statement formats for boutique hospitality and residential concepts.",
  },
  {
    title: "Specification Support",
    text: "A clean starting point for finish discussions, sample requests, and project-specific mirror development.",
  },
];

export default function DesignersPage() {
  return (
    <>
      <PageHero
        eyebrow="For Designers"
        title="Develop mirror collections and interiors with a manufacturing partner behind them."
        description="The designer path focuses on style flexibility, custom development, and the ability to turn concepts into supply-ready products."
        aside={
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-copper">Design use cases</p>
            <p className="text-2xl font-semibold">Boutique hospitality, premium residential, retail interiors</p>
            <p className="text-sm leading-6 text-ink/72">
              The content is tailored to design-led buyers who care about finish, shape, mood, and execution.
            </p>
          </div>
        }
      />
      <section className="pb-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {designerBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-[1.8rem] border border-ink/10 bg-white/85 p-6 shadow-soft"
              >
                <div className="mb-5 h-32 rounded-[1.3rem] bg-gradient-to-br from-mist to-white" />
                <p className="text-xl font-semibold">{block.title}</p>
                <p className="mt-3 text-sm leading-6 text-ink/72">{block.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner
        title="Need samples or a custom mirror brief?"
        description="Use the contact form to share style references, dimensions, finish requirements, or target market notes."
      />
    </>
  );
}
