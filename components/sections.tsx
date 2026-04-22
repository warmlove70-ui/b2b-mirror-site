import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Container, SectionHeading } from "@/components/layout";
import { marketRegions, productCategories, valuePillars } from "@/components/site-data";
import { readHomepageConfig } from "@/lib/content";

// Default images (fallback)
const defaultProductImages = [
  "/hero/smart-bathroom-mirror.jpg",
  "/hero/luxury-dressing-scene.jpg",
  "/products/irregular-wavy-wall-mirror.png",
  "/hero/hero-minimal-mirror.jpg",
  "/hero/entryway-mirror.webp",
  "/products/irregular-wavy-wall-mirror.png",
];

const defaultAudienceImages = [
  "/hero/showroom-neutral.jpg",
  "/hero/luxury-dressing-scene.jpg",
  "/hero/luxury-bathroom-scene.jpg",
];

interface SectionProps {
  config?: {
    heroMainImage: string;
    heroCards: Array<{
      id: string;
      title: string;
      imageSrc: string;
      imageAlt: string;
      order: number;
      enabled: boolean;
    }>;
    productImages: string[];
    audienceImages: string[];
    trustItems: string[];
    valuePillars: string[];
    marketRegions: string[];
  };
}

export function HeroSection({ config }: SectionProps) {
  const heroMainImage = config?.heroMainImage || "/hero/luxury-bathroom-scene.jpg";
  const heroCards = config?.heroCards?.filter(c => c.enabled).slice(0, 3) || [
    { title: "Product", imageSrc: "/hero/smart-bathroom-mirror.jpg", imageAlt: "LED smart bathroom mirror" },
    { title: "Showroom", imageSrc: "/hero/showroom-neutral.jpg", imageAlt: "Showroom scene" },
    { title: "Workshop", imageSrc: "/hero/workshop-bright.jpg", imageAlt: "Factory workshop" },
  ];

  return (
    <section className="overflow-hidden pb-10 pt-1 sm:pb-14 sm:pt-2">
      <Container>
        <div className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr] xl:items-start">
          <div className="space-y-4 pt-0 xl:pt-1">
            <div className="inline-flex rounded-full border border-teal/15 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal shadow-sm">
              17 years experience · Certified quality · OEM / ODM support
            </div>

            <div className="space-y-3">
              <h1 className="max-w-4xl text-[2.5rem] font-semibold leading-[1] text-ink sm:text-[3.05rem] lg:text-[4rem]">
                Smart mirrors and decorative mirror collections for overseas buyers, retailers, and projects.
              </h1>
              <p className="max-w-2xl text-[15px] leading-7 text-ink/72 sm:text-base">
                ZEKSmart helps importers, brands, wholesalers, and project buyers source smart bathroom mirrors, vanity mirrors, full-length mirrors, and decorative mirror collections with certification support, OEM / ODM capability, and responsive export service.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <PrimaryLink href="/contact">Get Catalog</PrimaryLink>
              <SecondaryLink href="/contact">Request Quote</SecondaryLink>
              <SecondaryLink href="https://wa.me/8613916383646">WhatsApp</SecondaryLink>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <InlineSignal title="17 Years Experience" detail="Serving small buyers to large-volume customers" />
              <InlineSignal title="OEM / ODM" detail="Private label and product development support" />
              <InlineSignal title="Certified Quality" detail="ISO 9001 plus export-market compliance" />
              <InlineSignal title="Project Supply" detail="Retail, hospitality, residential, and contract orders" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 hidden h-48 w-48 rounded-full bg-teal/10 blur-3xl lg:block" />
            <div className="absolute -right-8 bottom-10 hidden h-48 w-48 rounded-full bg-copper/10 blur-3xl lg:block" />

            <div className="relative rounded-[2.2rem] border border-ink/8 bg-white p-5 shadow-[0_30px_80px_rgba(16,33,45,0.10)] sm:p-6 xl:mt-0">
              <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] bg-[#eae3da]">
                <Image
                  src={heroMainImage}
                  alt="Premium smart bathroom mirror installed in a modern bathroom"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {heroCards.map((card, index) => (
                  <HeroImageCard
                    key={card.id || index}
                    title={card.title}
                    detail={index === 0 ? "Smart bathroom mirrors, vanity mirrors, and full-length mirror collections" : index === 1 ? "Display-ready presentation that helps buyers review style and market fit" : "Visible production environment that strengthens delivery confidence"}
                    imageSrc={card.imageSrc}
                    imageAlt={card.imageAlt}
                    dark={index === 2}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function TrustStrip({ config }: SectionProps) {
  const items = config?.trustItems || [
    "17 years serving small buyers, growing brands, and project customers",
    "ISO 9001 quality system",
    "CE / UL / CB / UKCA / RoHS compliance coverage",
    "OEM / ODM development and export packaging support",
  ];

  return (
    <section className="pb-8 sm:pb-12">
      <Container>
        <div className="rounded-[1.6rem] border border-ink/8 bg-white px-5 py-5 shadow-soft sm:px-7">
          <div className="grid gap-4 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-ink/6 bg-[#fbf9f6] px-4 py-4">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-teal" />
                <p className="text-sm leading-6 text-ink/72">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CapabilitiesSection({ config }: SectionProps) {
  const pillars = config?.valuePillars || valuePillars;

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <SectionHeading
            eyebrow="Capabilities"
            title="Built for sourcing teams that need execution, not just a nice catalog."
            description="The homepage now frames ZEKSmart as a manufacturing and export partner with certification support, customization ability, and practical delivery coordination."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div
                key={pillar}
                className="rounded-[1.6rem] border border-ink/8 bg-white p-6 shadow-soft"
              >
                <p className="text-lg font-semibold text-ink">{pillar}</p>
                <p className="mt-3 text-sm leading-6 text-ink/70">
                  Structured to support product development, sampling, export execution, and reliable communication from inquiry to shipment.
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ProductGridSection({ config }: SectionProps) {
  const productImages = config?.productImages || defaultProductImages;

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Product Scope"
            title="Five export-ready categories for mirror and décor programs."
            description="Present the product family clearly so buyers can identify their category quickly before moving into a catalog or quotation conversation."
          />
          <SecondaryLink href="/products">View All Categories</SecondaryLink>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {productCategories.map((category, index) => (
            <div
              key={category.title}
              className="overflow-hidden rounded-[1.7rem] border border-ink/8 bg-white shadow-soft"
            >
              <div className="relative h-52">
                <Image
                  src={productImages[index % productImages.length]}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-xl font-semibold text-ink">{category.title}</p>
                <p className="mt-3 text-sm leading-6 text-ink/72">{category.description}</p>
                <p className="mt-4 text-sm font-medium text-copper">{category.applications}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function AudienceSection({ config }: SectionProps) {
  const audienceImages = config?.audienceImages || defaultAudienceImages;

  const cards = [
    {
      title: "For Importers",
      description:
        "MOQ clarity, export packaging, document coordination, and fast catalog handoff for wholesale and distribution programs.",
      href: "/for-importers",
    },
    {
      title: "For Designers",
      description:
        "Shape, finish, dimension, and frame flexibility for collections, interior concepts, and differentiated visual programs.",
      href: "/for-designers",
    },
    {
      title: "For Projects",
      description:
        "Support for hospitality, residential, and commercial sourcing with clearer coordination around specification and delivery.",
      href: "/for-projects",
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Buyer Paths"
          title="Separate entry points for different B2B buying roles."
          description="A better homepage should help different buyer types identify themselves quickly and move toward the right inquiry path."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="overflow-hidden rounded-[1.7rem] border border-ink/8 bg-white shadow-soft"
            >
              <div className="relative h-40">
                <Image
                  src={audienceImages[index % audienceImages.length]}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-2xl font-semibold text-ink">{card.title}</p>
                <p className="mt-3 text-sm leading-6 text-ink/72">{card.description}</p>
                <Link href={card.href} className="mt-5 inline-flex text-sm font-semibold text-teal">
                  Explore page
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function MarketsSection({ config }: SectionProps) {
  const regions = config?.marketRegions || marketRegions;

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="rounded-[2rem] border border-ink/8 bg-ink p-8 text-sand shadow-soft sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-copper">Markets</p>
              <h2 className="text-3xl font-semibold tracking-tight text-sand sm:text-4xl">
                Positioned for export conversations in key target regions.
              </h2>
              <p className="text-base leading-7 text-sand/72 sm:text-lg">
                Homepage messaging now better matches real B2B buyer priorities: certification, manufacturing reliability, flexible cooperation, and project-friendly communication.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {regions.map((region) => (
                <div key={region} className="rounded-[1.3rem] border border-white/10 bg-white/8 p-5">
                  <p className="text-lg font-semibold">{region}</p>
                  <p className="mt-2 text-sm leading-6 text-sand/72">
                    Suitable for wholesale sourcing, private label development, and project procurement.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CtaBanner({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="rounded-[2rem] border border-copper/20 bg-gradient-to-r from-copper to-teal p-8 text-white shadow-soft sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/72">Inquiry CTA</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-base leading-7 text-white/84">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryLink href="/contact">Request Quotation</PrimaryLink>
              <SecondaryLink href="/contact" invert>
                Contact Sales
              </SecondaryLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  aside: ReactNode;
}) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="rounded-[2rem] border border-ink/10 bg-white/80 p-6 shadow-soft">{aside}</div>
        </div>
      </Container>
    </section>
  );
}

function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-sand hover:-translate-y-0.5 hover:bg-teal"
    >
      {children}
    </Link>
  );
}

function SecondaryLink({
  href,
  children,
  invert = false,
}: {
  href: string;
  children: ReactNode;
  invert?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold hover:-translate-y-0.5 ${
        invert
          ? "border-white/28 bg-white/10 text-white hover:bg-white/20"
          : "border-ink/12 bg-white text-ink hover:bg-[#faf8f4]"
      }`}
    >
      {children}
    </Link>
  );
}

function InlineSignal({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-[1.2rem] border border-ink/8 bg-white px-4 py-4 shadow-sm">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-1 text-xs leading-5 text-ink/62">{detail}</p>
    </div>
  );
}

function HeroImageCard({
  title,
  detail,
  imageSrc,
  imageAlt,
  dark = false,
}: {
  title: string;
  detail: string;
  imageSrc: string;
  imageAlt: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[1.5rem] border shadow-sm ${
        dark ? "border-ink/10 bg-ink text-white" : "border-ink/8 bg-[#fbf9f6] text-ink"
      }`}
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="px-4 py-4">
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-white/70" : "text-copper"}`}>
          {title}
        </p>
        <p className={`mt-2 text-sm leading-6 font-medium ${dark ? "text-white" : "text-ink/78"}`}>
          {detail}
        </p>
      </div>
    </div>
  );
}
