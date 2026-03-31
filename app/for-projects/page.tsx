import { Container } from "@/components/layout";
import { CtaBanner, PageHero } from "@/components/sections";

const projectStages = [
  "Hotel guest room and bathroom mirrors",
  "Residential developer packages",
  "Commercial wall decor and common area supply",
  "Multi-location rollout coordination",
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="For Projects"
        title="Mirror and decor supply for coordinated hospitality and commercial programs."
        description="The project page speaks to contractors and project buyers who care about alignment, communication, and scalable production."
        aside={
          <div className="space-y-3">
            <p className="text-lg font-semibold">Project scenarios</p>
            {projectStages.map((stage) => (
              <div key={stage} className="rounded-2xl bg-sand px-4 py-3 text-sm text-ink/74">
                {stage}
              </div>
            ))}
          </div>
        }
      />
      <section className="pb-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <ProjectCard
              title="Coordinated Supply"
              text="Suitable for grouped mirror categories, repeated room types, and consistent design language across sites."
            />
            <ProjectCard
              title="Technical Alignment"
              text="Smart mirror features, size planning, and frame options can be discussed early in the inquiry cycle."
            />
            <ProjectCard
              title="Direct Communication"
              text="Clear CTA paths guide contractors to quotation and consultation instead of consumer-style browsing."
            />
          </div>
        </Container>
      </section>
      <CtaBanner
        title="Send your BOQ, concept pack, or timeline for review."
        description="The contact flow is ready for project consultations and can later connect to a dedicated sales process."
      />
    </>
  );
}

function ProjectCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.8rem] border border-ink/10 bg-white/85 p-6 shadow-soft">
      <div className="mb-5 h-32 rounded-[1.3rem] bg-gradient-to-br from-white to-mist" />
      <p className="text-xl font-semibold">{title}</p>
      <p className="mt-3 text-sm leading-6 text-ink/72">{text}</p>
    </div>
  );
}
