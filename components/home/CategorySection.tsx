import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/constants/categories';
import Reveal from '@/components/ui/Reveal';

const CATEGORY_IMAGES: Record<string, string> = {
  sofas: '/placeholder/lifestyle-1.svg',
  camas: '/placeholder/lifestyle-2.svg',
  comedores: '/placeholder/lifestyle-3.svg',
  sofacamas: '/placeholder/product-4.svg',
  cortinas: '/placeholder/product-5.svg',
  sillas: '/placeholder/product-6.svg',
  medida: '/placeholder/lifestyle-4.svg',
};

export default function CategorySection() {
  return (
    <section className="section-space bg-bg-base">
      <div className="section-shell">
        <Reveal className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Explora posibilidades</p>
            <h2 className="section-title mt-3">Muebles para cada forma de habitar</h2>
            <p className="mt-4 max-w-xl leading-7 text-text-muted">
              Conoce nuestras referencias y úsalas como punto de partida. Cada
              diseño puede adaptarse a las proporciones y acabados de tu hogar.
            </p>
          </div>
          <Link
            href="/catalogo"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <span className="link-underline">Ver todo el catálogo</span>
            <ArrowUpRight className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} />
          </Link>
        </Reveal>

        <div className="grid auto-rows-[230px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category, index) => (
            <Reveal
              key={category.slug}
              variant="zoom"
              delay={index * 70}
              className={index === 0 || index === 6 ? 'lg:col-span-2' : ''}
            >
              <Link
                href={`/catalogo?categoria=${category.slug}`}
                className="group relative isolate flex h-[230px] overflow-hidden rounded-[1.5rem] bg-bg-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <Image
                  src={CATEGORY_IMAGES[category.slug]}
                  alt={`Muebles de la categoría ${category.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-[1200ms] ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent transition duration-500 group-hover:from-primary/90" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                  <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <p className="text-[0.65rem] uppercase tracking-[0.18em] text-white/60">
                      {category.slug === 'medida' ? 'Proyecto personalizado' : 'Colección'}
                    </p>
                    <h3 className="mt-1 font-heading text-2xl font-light">{category.name}</h3>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-primary transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-45">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
