import {
  AudienceSection,
  CapabilitiesSection,
  CtaBanner,
  HeroSection,
  MarketsSection,
  ProductGridSection,
  TrustStrip,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <CapabilitiesSection />
      <ProductGridSection />
      <AudienceSection />
      <MarketsSection />
      <CtaBanner
        title="Need catalog, quotation, sample support, or project coordination?"
        description="Talk to ZEKSmart for smart bathroom mirrors, full-length mirrors, decorative collections, and OEM / ODM export programs."
      />
    </>
  );
}
