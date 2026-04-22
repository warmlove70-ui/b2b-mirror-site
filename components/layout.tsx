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
          <div className="space-y-4">
            <p className="text-lg font-semibold">{brand.fullName}</p>
            <p className="max-w-xl text-sm leading-6 text-ink/68">
              B2B manufacturing partner for smart mirrors and decorative mirror collections,
              serving importers, designers, contractors, and retail buyers across the Middle East,
              South America, and Central Asia.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              {brand.socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 bg-white text-ink transition hover:-translate-y-0.5 hover:border-teal hover:text-teal"
                >
                  <SocialIcon label={item.label} />
                </a>
              ))}
            </div>
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

function SocialIcon({ label }: { label: string }) {
  if (label === "X") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M18.9 2H22l-6.77 7.74L23 22h-6.1l-4.78-6.25L6.65 22H3.53l7.24-8.28L1 2h6.26l4.32 5.7L18.9 2Zm-1.07 18h1.69L6.33 3.89H4.52L17.83 20Z" />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-0" />
      </svg>
    );
  }

  if (label === "Pinterest") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 2C6.48 2 4 5.96 4 9.26c0 2.25.85 4.26 2.68 5.01.3.12.57 0 .66-.33.06-.23.2-.8.26-1.04.09-.33.05-.44-.19-.72-.52-.61-.85-1.41-.85-2.54 0-3.28 2.45-6.22 6.38-6.22 3.48 0 5.4 2.13 5.4 4.97 0 3.74-1.66 6.9-4.12 6.9-1.36 0-2.38-1.12-2.05-2.5.39-1.65 1.15-3.43 1.15-4.62 0-1.07-.57-1.96-1.76-1.96-1.4 0-2.52 1.45-2.52 3.39 0 1.24.42 2.08.42 2.08l-1.69 7.15c-.5 2.11-.08 4.69-.04 4.95.02.15.21.19.29.08.12-.16 1.69-2.09 2.22-4.01.15-.54.84-3.25.84-3.25.41.79 1.62 1.49 2.91 1.49 3.83 0 6.43-3.49 6.43-8.17C20 5.3 16.66 2 12 2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M21.58 7.19a2.96 2.96 0 0 0-2.08-2.1C17.65 4.6 12 4.6 12 4.6s-5.65 0-7.5.49a2.96 2.96 0 0 0-2.08 2.1A31.24 31.24 0 0 0 2 12a31.24 31.24 0 0 0 .42 4.81 2.96 2.96 0 0 0 2.08 2.1c1.85.49 7.5.49 7.5.49s5.65 0 7.5-.49a2.96 2.96 0 0 0 2.08-2.1c.28-1.6.42-3.21.42-4.81s-.14-3.21-.42-4.81ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
    </svg>
  );
}
