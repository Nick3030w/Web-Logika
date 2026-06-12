import { Metadata } from 'next';
import Image from 'next/image';
import { Award, Hammer, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nosotros | Logika Decoración',
  description:
    'Conoce nuestra historia, proceso de fabricación y compromiso con la calidad. Fábrica de muebles a medida en Bogotá, Colombia.',
  openGraph: {
    title: 'Nosotros | Logika Decoración',
    description:
      'Conoce nuestra historia y proceso de fabricación artesanal en Bogotá.',
    type: 'website',
    url: '/nosotros',
  },
};

export default function NosotrosPage() {
  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Hero section */}
      <header className="text-center mb-14">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">
          Nuestra Historia
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Desde Bogotá, transformamos espacios con muebles diseñados a la medida
          de cada hogar colombiano.
        </p>
      </header>

      {/* Company history */}
      <section className="flex flex-col lg:flex-row gap-10 mb-16">
        <div className="lg:w-1/2">
          <h2 className="font-heading text-2xl font-semibold text-primary mb-4">
            De la pasión al oficio
          </h2>
          <div className="text-text-muted space-y-4 leading-relaxed">
            <p>
              Logika Decoración nació de la convicción de que cada hogar merece
              muebles que se adapten a su espacio y estilo, no al revés. Desde
              nuestros inicios en Bogotá, apostamos por la fabricación artesanal
              con estándares de calidad que superan la producción en serie.
            </p>
            <p>
              Lo que comenzó como un pequeño taller se ha convertido en una
              fábrica integral donde diseño, producción y acabados se realizan
              bajo un mismo techo. Esto nos permite controlar cada detalle y
              ofrecer un producto final que refleja el cuidado puesto en cada
              etapa.
            </p>
            <p>
              Hoy, seguimos fieles a nuestra filosofía original: escuchar al
              cliente, entender su espacio y crear piezas únicas que combinan
              funcionalidad, durabilidad y estética.
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden bg-bg-subtle">
          <Image
            src="/placeholder/about-workshop.svg"
            alt="Taller de fabricación de Logika Decoración"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
      </section>

      {/* Manufacturing process */}
      <section className="mb-16">
        <h2 className="font-heading text-2xl font-semibold text-primary mb-6 text-center">
          Nuestro Proceso
        </h2>
        <p className="text-text-muted text-center max-w-2xl mx-auto mb-10">
          Cada mueble pasa por un proceso cuidadoso de fabricación donde
          seleccionamos los mejores materiales y aplicamos técnicas que
          garantizan durabilidad.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Process cards */}
          <div className="flex flex-col sm:flex-row gap-4 p-6 bg-bg-subtle rounded-lg border border-border">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="font-heading font-bold text-accent text-lg">1</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">Espumas de alta densidad</h3>
              <p className="text-sm text-text-muted">
                Utilizamos espumas HR de alta resiliencia que mantienen su forma
                y confort durante años, superando con creces las espumas
                convencionales del mercado.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 p-6 bg-bg-subtle rounded-lg border border-border">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="font-heading font-bold text-accent text-lg">2</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">Maderas seleccionadas</h3>
              <p className="text-sm text-text-muted">
                Las estructuras se construyen con maderas secas y tratadas,
                seleccionadas por su resistencia y estabilidad. Cada pieza se
                inspecciona antes de entrar al proceso.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 p-6 bg-bg-subtle rounded-lg border border-border">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="font-heading font-bold text-accent text-lg">3</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">Telas premium</h3>
              <p className="text-sm text-text-muted">
                Trabajamos con telas de alta resistencia a la abrasión y al
                desgaste. Ofrecemos un amplio catálogo de texturas y colores
                para personalizar cada pieza.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 p-6 bg-bg-subtle rounded-lg border border-border">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="font-heading font-bold text-accent text-lg">4</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">Costura de precisión</h3>
              <p className="text-sm text-text-muted">
                Nuestros tapiceros realizan costuras reforzadas con hilos
                industriales, asegurando acabados limpios y uniones que resisten
                el uso diario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing photos */}
      <section className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative h-[250px] sm:h-[300px] rounded-lg overflow-hidden bg-bg-subtle">
            <Image
              src="/placeholder/about-process-1.svg"
              alt="Proceso de tapizado artesanal"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
          <div className="relative h-[250px] sm:h-[300px] rounded-lg overflow-hidden bg-bg-subtle">
            <Image
              src="/placeholder/about-process-2.svg"
              alt="Selección de materiales y acabados"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="mb-16">
        <h2 className="font-heading text-2xl font-semibold text-primary mb-8 text-center">
          Lo que nos diferencia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <Award size={36} className="text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-primary mb-2">Calidad vs. producción masiva</h3>
            <p className="text-sm text-text-muted">
              Mientras la industria masiva reduce costos sacrificando materiales,
              nosotros invertimos en calidad que se siente desde el primer día.
            </p>
          </div>
          <div className="text-center p-6">
            <Hammer size={36} className="text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-primary mb-2">Fabricación propia</h3>
            <p className="text-sm text-text-muted">
              Sin intermediarios. Desde el diseño hasta la entrega, todo se
              realiza en nuestro taller, lo que nos permite garantizar cada paso.
            </p>
          </div>
          <div className="text-center p-6">
            <MapPin size={36} className="text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-primary mb-2">Bogotá, Colombia</h3>
            <p className="text-sm text-text-muted">
              Atendemos la ciudad y sus alrededores con servicio de entrega
              directa. Conocemos las necesidades del hogar colombiano.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
