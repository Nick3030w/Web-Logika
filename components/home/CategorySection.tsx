import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/constants/categories';

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-10 text-center">
        Nuestras Categorías
      </h2>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
        {/* Category links */}
        <div className="lg:w-1/3">
          <nav aria-label="Categorías de productos" className="space-y-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalogo?categoria=${cat.slug}`}
                className="block py-3 px-4 rounded-lg text-primary hover:bg-bg-subtle hover:text-accent transition-colors duration-200 font-medium border border-transparent hover:border-border focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mosaic grid */}
        <div className="lg:w-2/3 grid grid-cols-2 grid-rows-3 gap-3 h-[400px] sm:h-[500px]">
          <div className="relative row-span-2 rounded-lg overflow-hidden bg-bg-subtle">
            <Image
              src="/placeholder/lifestyle-1.svg"
              alt="Sala de estar con muebles Logika"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden bg-bg-subtle">
            <Image
              src="/placeholder/lifestyle-2.svg"
              alt="Habitación con cama Logika"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              loading="lazy"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden bg-bg-subtle">
            <Image
              src="/placeholder/lifestyle-3.svg"
              alt="Comedor con muebles Logika"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              loading="lazy"
            />
          </div>
          <div className="relative col-span-2 rounded-lg overflow-hidden bg-bg-subtle">
            <Image
              src="/placeholder/lifestyle-4.svg"
              alt="Espacio decorado por Logika"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
