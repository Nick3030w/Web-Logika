import type { Metadata } from 'next';
import { CalendarDays, MessagesSquare as Instagram, MapPin, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import { BUSINESS, CUSTOM_QUOTE_MESSAGE, WORKSHOP_VISIT_MESSAGE } from '@/constants/business';

export const metadata: Metadata = {
  title: 'Contacto y cotizaciones',
  description:
    'Habla con Logika por WhatsApp para comprar una referencia, cotizar un mueble a medida o agendar una visita a nuestra fábrica en Bogotá.',
  alternates: { canonical: '/contacto' },
};

export default function ContactoPage() {
  const quoteUrl = buildWhatsAppUrl(BUSINESS.whatsappPhone, CUSTOM_QUOTE_MESSAGE);
  const visitUrl = buildWhatsAppUrl(BUSINESS.whatsappPhone, WORKSHOP_VISIT_MESSAGE);

  return (
    <>
      <header className="bg-primary py-14 text-white sm:py-20">
        <div className="section-shell text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Hablemos de tu espacio</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-heading text-4xl font-semibold sm:text-6xl">
            Una conversación es el primer paso para construir algo bien.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/60">
            Comprar, cotizar o visitar el taller: toda la atención se coordina
            directamente con nuestro equipo en un único número de WhatsApp.
          </p>
        </div>
      </header>

      <section className="section-space">
        <div className="section-shell grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <div className="surface-card p-6 sm:p-9">
            <p className="eyebrow">Prepara tu mensaje</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold">¿Qué mueble estás buscando?</h2>
            <p className="mt-3 mb-7 text-sm leading-6 text-text-muted">
              Completa estos datos y abriremos WhatsApp con el mensaje listo para enviar.
            </p>
            <ContactForm />
          </div>

          <aside className="space-y-5">
            <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className="group block rounded-[1.5rem] bg-accent p-6 text-primary shadow-soft transition hover:-translate-y-1 hover:shadow-lift focus:outline-none focus:ring-2 focus:ring-primary">
              <MessageCircle size={25} />
              <h3 className="mt-7 font-heading text-2xl font-semibold">Cotizar un proyecto a medida</h3>
              <p className="mt-2 text-sm leading-6 text-primary/70">Cuéntanos tu idea y coordinamos los siguientes pasos.</p>
            </a>

            <a href={visitUrl} target="_blank" rel="noopener noreferrer" className="group block rounded-[1.5rem] bg-primary p-6 text-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift focus:outline-none focus:ring-2 focus:ring-accent">
              <CalendarDays size={25} className="text-accent" />
              <h3 className="mt-7 font-heading text-2xl font-semibold">Agendar visita a la fábrica</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">Conoce telas, materiales y nuestra calidad de fabricación. Atención con cita previa.</p>
            </a>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-[1.5rem] border border-border bg-bg-subtle p-5">
                <MapPin size={21} className="text-accent-deep" />
                <h3 className="mt-4 font-semibold">Bogotá, Colombia</h3>
                <p className="mt-2 text-xs leading-5 text-text-muted">Atendemos Bogotá y alrededores. No contamos con punto de venta.</p>
              </div>
              <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" className="rounded-[1.5rem] border border-border bg-bg-subtle p-5 transition hover:border-accent-deep focus:outline-none focus:ring-2 focus:ring-accent">
                <Instagram size={21} className="text-accent-deep" />
                <h3 className="mt-4 font-semibold">Instagram</h3>
                <p className="mt-2 text-xs leading-5 text-text-muted">{BUSINESS.instagramHandle}<br />Conoce nuestros trabajos.</p>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
