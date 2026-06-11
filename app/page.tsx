import HeroSlider from '@/components/home/HeroSlider';
import CategorySection from '@/components/home/CategorySection';
import DifferentiatorsSection from '@/components/home/DifferentiatorsSection';

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <HeroSlider />
      <CategorySection />
      <DifferentiatorsSection />
    </>
  );
}
