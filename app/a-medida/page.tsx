import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Factory, MessageCircle, Ruler, SwatchBook } from 'lucide-react';
import CustomProcessSection from '@/components/home/CustomProcessSection';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import { BUSINESS, CUSTOM_QUOTE_MESSAGE, WORKSHOP_VISIT_MESSAGE } from '@/constants/business';

export const metadata: Metadata = {
  title: 'Muebles a medida',
  description:
    'Cotiza muebles diseñados para tu espacio. Visitamos, medimos y fabricamos con telas y acabados elegidos contigo en Bogotá.',
  alternates: { canonical: '/a-medida' },
};

const QUOTE_FACTORS = [
  'Dimensiones y condiciones del espacio',
  'Tipo de estructura y materiales',
  'Tela, color, textura y acabado',
  'Complejidad del diseño y funcionalidades',
  'Transporte, acceso e instalación',
];

export default function AmedidaPage() {
  const quoteUrl = buildWhatsAppUrl(BUSINESS.whatsappPhone, CUSTOM_QUOTE_MESSAGE);
  const visitUrl = buildWhatsAppUrl(BUSINESS.whatsappPhone, WORKSHOP_VISIT_MESSAGE);

  return (
    <>
      <section className="overflow-hidden bg-primary text-white">
        <div className="section-shell grid min-h-[680px] items-center gap-10 py-16 lg:grid-cols-2">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Diseñado para ti
            </p>
            <h1 className="mt-4 font-heading text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl">
              Tu espacio no es estándar. Tu mueble tampoco debería serlo.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/70">
              Creamos piezas desde cero o adaptamos una referencia. El valor se
              determina con una cotización personalizada después de entender
              medidas, materiales, acabados y necesidades.
            </p>
            <a
              href={quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-accent mt-8"
            >
              <MessageCircle size={19} /> Empezar mi cotización
            </a>
          </div>

          <div className="relative min-h-[430px] sm:min-h-[520px]">
            <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
              <Image
                src="/placeholder/lifestyle-4.svg"
                alt="Mueble personalizado diseñado para un espacio interior"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/10 backdrop-blur sm:left-10 sm:right-10">
              {[
                ['01', 'Medimos'],
                ['02', 'Diseñamos'],
                ['03', 'Fabricamos'],
              ].map(([number, label]) => (
                <div key={number} className="bg-primary/85 px-3 py-4 text-center">
                  <p className="text-xs text-accent">{number}</p>
                  <p className="mt-1 text-xs font-semibold sm:text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-bg-base">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Cotización transparente</p>
            <h2 className="section-title mt-3">¿De qué depende el valor?</h2>
            <p className="mt-5 leading-7 text-text-muted">
              Un proyecto a medida no tiene un precio único. Primero comprendemos
              qué necesitas y luego te presentamos una propuesta coherente con el
              diseño y la fabricación requerida.
            </p>
            <ul className="mt-7 space-y-3">
              {QUOTE_FACTORS.map((factor) => (
                <li key={factor} className="flex items-start gap-3 text-sm text-primary">
                  <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-accent/20 text-accent-deep">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Ruler,
                title: 'Medición en sitio',
                text: 'Validamos proporciones, accesos y circulación en el espacio real.',
              },
              {
                icon: SwatchBook,
                title: 'Selección guiada',
                text: 'Elige telas y acabados con muestras físicas y asesoría.',
              },
              {
                icon: Factory,
                title: 'Producción propia',
                text: 'Controlamos estructura, comodidad, tapizado y terminaciones.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="surface-card p-5 sm:min-h-72">
                  <Icon size={26} className="text-accent-deep" />
                  <h3 className="mt-8 font-heading text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-text-muted">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CustomProcessSection />

      <section className="section-space bg-bg-subtle">
        <div className="section-shell">
          <div className="overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Antes de decidir</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-semibold sm:text-5xl">
              Conoce las telas, los materiales y la forma en que fabricamos.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/60">
              No contamos con sala de ventas. Recibimos clientes en nuestra
              fábrica mediante cita previa para brindar una atención dedicada.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={visitUrl} target="_blank" rel="noopener noreferrer" className="button-accent">
                Agendar visita al taller <ArrowRight size={18} />
              </a>
              <Link href="/catalogo" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent">
                Ver referencias
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
