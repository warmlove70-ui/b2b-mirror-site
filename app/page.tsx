import { readHomepageConfig } from "@/lib/content";
import {
  AudienceSection,
  CapabilitiesSection,
  CtaBanner,
  HeroSection,
  MarketsSection,
  ProductGridSection,
  TrustStrip,
} from "@/components/sections";

export default async function HomePage() {
  const config = await readHomepageConfig();

  return (
    <>
      <HeroSection config={config} />
      <TrustStrip config={config} />
      <CapabilitiesSection config={config} />
      <ProductGridSection config={config} />
      <AudienceSection config={config} />
      <MarketsSection config={config} />
      <CtaBanner
        title="Need catalog, quotation, sample support, or project coordination?"
        description="Talk to ZEKSmart for smart bathroom mirrors, full-length mirrors, decorative collections, and OEM / ODM export programs."
      />
    </>
  );
}
