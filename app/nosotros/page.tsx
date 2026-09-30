import type { Metadata } from 'next';
import Image from 'next/image';
import { Award, Check, Factory, Hammer, MessageCircle, SwatchBook } from 'lucide-react';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import { BUSINESS, WORKSHOP_VISIT_MESSAGE } from '@/constants/business';

export const metadata: Metadata = {
  title: 'Nuestra fábrica y proceso',
  description:
    'Conoce cómo Logika diseña y fabrica muebles a medida con estructuras, espumas, telas y acabados seleccionados en Bogotá.',
  alternates: { canonical: '/nosotros' },
};

const MATERIALS = [
  'Espumas de alta densidad y resiliencia',
  'Maderas seleccionadas para cada estructura',
  'Telas de distintas resistencias, texturas y colores',
  'Costuras reforzadas y acabados cuidados',
];

export default function NosotrosPage() {
  const visitUrl = buildWhatsAppUrl(BUSINESS.whatsappPhone, WORKSHOP_VISIT_MESSAGE);

  return (
    <>
      <header className="section-space bg-bg-subtle">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="eyebrow">Nuestra forma de trabajar</p>
            <h1 className="display-title mt-3">El diseño se demuestra en la fabricación.</h1>
            <p className="mt-6 text-lg leading-8 text-text-muted">
              En Logika reunimos diseño, estructura, tapizado y acabados bajo un
              mismo techo. Así podemos cuidar cada decisión y responder por el
              resultado final.
            </p>
          </div>
          <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] shadow-soft sm:min-h-[500px]">
            <Image src="/placeholder/about-workshop.svg" alt="Taller de fabricación de Logika Decoración" fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
          </div>
        </div>
      </header>

      <section className="section-space bg-bg-base">
        <div className="section-shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">De la idea al oficio</p>
            <h2 className="section-title mt-3">Fabricación propia para controlar lo que no se ve</h2>
            <div className="mt-6 space-y-4 leading-7 text-text-muted">
              <p>Logika nació de la convicción de que los muebles deben adaptarse al hogar y no obligar al hogar a adaptarse a ellos.</p>
              <p>Nuestro valor está tanto en la apariencia como en lo que sostiene cada pieza: estructura, espumas, uniones, costuras y materiales elegidos para el uso real.</p>
              <p>Por eso abrimos el taller mediante cita. Queremos que puedas conocer la fabricación, comparar muestras y decidir con más información.</p>
            </div>
          </div>
          <div className="rounded-[1.5rem] bg-primary p-7 text-white sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Lo que seleccionamos contigo</p>
            <ul className="mt-7 space-y-4">
              {MATERIALS.map((material) => (
                <li key={material} className="flex items-start gap-3 border-b border-white/10 pb-4 text-sm text-white/72 last:border-0">
                  <Check size={17} className="mt-0.5 flex-shrink-0 text-accent" /> {material}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-space bg-primary text-white">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Nuestro estándar</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">Calidad que se puede observar y sentir</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              { icon: Hammer, title: 'Estructura', text: 'Construcción estable y materiales seleccionados según el uso de la pieza.' },
              { icon: SwatchBook, title: 'Tapizado', text: 'Telas, espumas y firmezas elegidas para comodidad, apariencia y duración.' },
              { icon: Award, title: 'Acabado', text: 'Atención a costuras, encuentros, proporciones y detalles visibles.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="bg-primary p-7 text-center">
                  <Icon className="mx-auto text-accent" size={30} />
                  <h3 className="mt-5 font-heading text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-bg-subtle">
        <div className="section-shell grid gap-4 sm:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden rounded-[1.5rem]">
            <Image src="/placeholder/about-process-1.svg" alt="Proceso artesanal de tapizado en el taller" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" loading="lazy" />
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-[1.5rem]">
            <Image src="/placeholder/about-process-2.svg" alt="Selección de telas y materiales para muebles" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" loading="lazy" />
          </div>
        </div>
        <div className="section-shell mt-10 text-center">
          <Factory className="mx-auto text-accent-deep" size={28} />
          <h2 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-semibold">Ven a conocer el lugar donde fabricamos tu próximo mueble.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-text-muted">La fábrica no es un punto de venta abierto al público. Agenda tu visita para que podamos atenderte y mostrarte los materiales con calma.</p>
          <a href={visitUrl} target="_blank" rel="noopener noreferrer" className="button-primary mt-7">
            <MessageCircle size={18} /> Agendar por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
