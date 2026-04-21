import { NavLink, ProductCategory } from "@/components/types";

const whatsappNumberRaw = "+86 13916383646";
const whatsappDigits = "8613916383646";

export const brand = {
  shortName: "ZEKSmart",
  fullName: "ZEKSmart Technology (Shanghai) Co., Ltd.",
  siteTitle: "ZEKSmart Export",
  tagline: "Manufacturer of Smart Mirrors & Decorative Mirror Collections",
  email: "admin@zeksmart.com",
  website: "www.zeksmart.com",
  whatsappDisplay: whatsappNumberRaw,
  whatsappHref: `https://wa.me/${whatsappDigits}`,
  responseSla: "Catalog and quotation support within 24 hours",
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/for-importers", label: "For Importers" },
  { href: "/for-designers", label: "For Designers" },
  { href: "/for-projects", label: "For Projects" },
  { href: "/contact", label: "Contact" },
];

export const productCategories: ProductCategory[] = [
  {
    title: "Smart Bathroom Mirrors",
    description:
      "LED mirrors with anti-fog, dimming, Bluetooth, touch controls, and export-ready electrical specs.",
    applications: "Hospitality, premium residential, branded bath collections",
  },
  {
    title: "Full Length Mirrors",
    description:
      "Iron and solid wood dressing mirrors developed for retail programs, private label ranges, and furniture bundles.",
    applications: "Home furnishing chains, boutiques, showroom programs",
  },
  {
    title: "Irregular Wavy Wall Mirrors",
    description:
      "Premium sculptural wave mirrors with high-definition anti-darkening glass, contemporary organic shapes, and customizable finishes for modern interior programs.",
    applications: "Designer collections, boutique hotels, premium residential, trend-led retail",
  },
  {
    title: "Wall Mirrors",
    description:
      "Round, rectangular, arched, and custom wall mirrors balanced for commercial durability and interior appeal.",
    applications: "Residential, retail fit-outs, hospitality interiors",
  },
  {
    title: "Wooden Frames",
    description:
      "Natural wood and engineered frame solutions matched for finish consistency, MOQ flexibility, and repeatability.",
    applications: "Framing partners, decor distributors, custom collections",
  },
  {
    title: "Decorative Mirrors",
    description:
      "Statement mirror concepts with layered textures, mixed materials, and region-specific styling for differentiated catalogs.",
    applications: "Designer programs, contract spaces, trend-led retail",
  },
];

export const marketRegions = ["Middle East", "South America", "Central Asia"];

export const valuePillars = [
  "OEM / ODM development",
  "Wholesale production",
  "Project supply coordination",
  "Export packaging and documentation",
];
