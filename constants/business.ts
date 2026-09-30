export const BUSINESS = {
  name: "Logika Decoración",
  shortName: "Logika",
  tagline: "Diseño, arte y decoración",
  city: "Bogotá, Colombia",
  serviceArea: "Bogotá y alrededores",
  website: "https://logikadecoracion.com",
  instagramUrl: "https://instagram.com/logikadecoracion",
  instagramHandle: "@logikadecoracion",
  whatsappPhone:
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.replace(/\D/g, "") ||
    "573001234567",
} as const;

/**
 * Official logo artwork. Place the real file in `public/brand/` and set this to
 * its path (for example "/brand/logika-logo.svg") to replace the vector lockup
 * rendered by BrandLogo. A transparent SVG or PNG works best.
 */
export const BRAND_LOGO_SRC: string | null = null;

export const CUSTOM_QUOTE_MESSAGE =
  "Hola Logika, quiero cotizar un mueble a medida para mi espacio.";

export const WORKSHOP_VISIT_MESSAGE =
  "Hola Logika, quiero agendar una visita al taller para conocer los materiales, telas y proceso de fabricación.";
