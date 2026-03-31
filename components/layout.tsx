import Link from "next/link";
import { ReactNode } from "react";
import { brand, navLinks } from "@/components/site-data";

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-copper">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="text-base leading-7 text-ink/72 sm:text-lg">{description}</p>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-sand/85 backdrop-blur">
      <Container>
        <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-sm font-semibold text-sand">
              ZK
            </div>
            <div>
              <p className="text-base font-semibold text-ink">{brand.siteTitle}</p>
              <p className="text-sm text-ink/65">{brand.tagline}</p>
            </div>
          </Link>
          <nav className="flex flex-wrap gap-3 text-sm text-ink/72">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 hover:bg-white/70 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white/50 py-10">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-3">
            <p className="text-lg font-semibold">{brand.fullName}</p>
            <p className="max-w-xl text-sm leading-6 text-ink/68">
              B2B manufacturing partner for smart mirrors and decorative mirror collections,
              serving importers, designers, contractors, and retail buyers across the Middle East,
              South America, and Central Asia.
            </p>
          </div>
          <div className="space-y-2 text-sm text-ink/72">
            <p className="font-semibold text-ink">Core Supply Modes</p>
            <p>OEM / ODM</p>
            <p>Wholesale</p>
            <p>Project Supply</p>
            <p>Sampling Support</p>
          </div>
          <div className="space-y-2 text-sm text-ink/72">
            <p className="font-semibold text-ink">Contact</p>
            <p>Website: {brand.website}</p>
            <p>Email: {brand.email}</p>
            <p>{brand.responseSla}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
