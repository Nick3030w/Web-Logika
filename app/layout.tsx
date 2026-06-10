import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Logika Decoración | Muebles a medida en Bogotá",
  description:
    "Fábrica de muebles a medida en Bogotá, Colombia. Sofás, camas, comedores y más con materiales premium.",
  openGraph: {
    title: "Logika Decoración",
    description:
      "Fábrica de muebles a medida en Bogotá, Colombia. Sofás, camas, comedores y más con materiales premium.",
    type: "website",
    locale: "es_CO",
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
    name: "Logika Decoración",
    description:
      "Fábrica de muebles a medida en Bogotá, Colombia. Sofás, camas, comedores y más con materiales premium.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.7110,
      longitude: -74.0721,
    },
    telephone: `+${process.env.WHATSAPP_PHONE || "573001234567"}`,
    url: "https://logikadecoracion.com",
  };

  return (
    <html lang="es" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-body text-primary bg-bg-base antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
