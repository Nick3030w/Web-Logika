import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { BUSINESS } from "@/constants/business";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.website),
  title: {
    default: "Logika Decoración | Muebles a medida en Bogotá",
    template: "%s | Logika Decoración",
  },
  description:
    "Fabricamos muebles a medida en Bogotá. Diseño personalizado, medición en tu espacio y selección de telas directamente en nuestro taller.",
  openGraph: {
    title: "Logika Decoración",
    description:
      "Muebles fabricados para tu espacio con diseño personalizado y calidad que puedes conocer en nuestro taller.",
    type: "website",
    locale: "es_CO",
    siteName: BUSINESS.name,
    url: BUSINESS.website,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    description:
      "Fábrica de muebles a medida con diseño personalizado, medición en sitio y atención en taller mediante cita previa.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    areaServed: BUSINESS.serviceArea,
    telephone: `+${BUSINESS.whatsappPhone}`,
    url: BUSINESS.website,
    sameAs: [BUSINESS.instagramUrl],
  };

  return (
    <html lang="es" className={`${manrope.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-body text-primary bg-bg-base antialiased flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
