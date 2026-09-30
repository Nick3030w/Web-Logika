import type { Metadata } from 'next';
import HeroSlider from '@/components/home/HeroSlider';
import CategorySection from '@/components/home/CategorySection';
import HybridOfferSection from '@/components/home/HybridOfferSection';
import CustomProcessSection from '@/components/home/CustomProcessSection';
import DifferentiatorsSection from '@/components/home/DifferentiatorsSection';
import WorkshopSection from '@/components/home/WorkshopSection';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Muebles a medida en Bogotá',
  description:
    'Diseñamos y fabricamos muebles para tu espacio. Cotiza por WhatsApp, agenda medición en sitio o conoce telas y materiales en nuestro taller.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <HeroSlider />
      <CategorySection />
      <HybridOfferSection />
      <CustomProcessSection />
      <DifferentiatorsSection />
      <WorkshopSection />
    </>
  );
}
