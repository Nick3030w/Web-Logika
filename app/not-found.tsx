import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-bg-subtle px-4 py-16 text-center">
      <div className="max-w-xl">
        <p className="font-heading text-7xl font-semibold text-accent-deep">404</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold text-primary">
          Este espacio todavía está vacío
        </h1>
        <p className="mt-4 text-lg leading-7 text-text-muted">
          La página que buscas no existe o cambió de lugar. Puedes volver al
          catálogo y seguir explorando nuestras referencias.
        </p>
        <Link href="/catalogo" className="button-primary mt-8">
          Ver catálogo <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
