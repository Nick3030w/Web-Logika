import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="font-heading text-4xl font-bold text-primary mb-4">
        Página no encontrada
      </h1>
      <p className="text-text-muted text-lg mb-8 max-w-md">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <Link
        href="/catalogo"
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Ver catálogo
      </Link>
    </section>
  );
}
