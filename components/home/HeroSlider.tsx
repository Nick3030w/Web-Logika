import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import { BUSINESS, CUSTOM_QUOTE_MESSAGE } from '@/constants/business';

export default function HeroSlider() {
  const quoteUrl = buildWhatsAppUrl(
    BUSINESS.whatsappPhone,
    CUSTOM_QUOTE_MESSAGE
  );

  return (
    <section className="relative isolate overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 animate-fade-in bg-brand-glow" />
      <div className="section-shell relative grid min-h-[calc(100vh-76px)] items-center gap-10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-5 animate-fade-up text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Fabricación propia · Bogotá
          </p>
          <h1 className="animate-fade-up font-heading text-4xl font-light leading-[1.04] tracking-[-0.025em] [animation-delay:120ms] sm:text-5xl lg:text-7xl">
            Muebles hechos para
            <span className="block font-normal text-accent">vivir tu espacio.</span>
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-base leading-7 text-white/70 [animation-delay:240ms] sm:text-lg sm:leading-8">
            Diseñamos y fabricamos sofás, camas, comedores y proyectos únicos.
            Visitamos tu espacio, tomamos medidas y construimos cada pieza en
            nuestro taller.
          </p>

          <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:360ms] sm:flex-row">
            <Link href="/catalogo" className="button-accent group">
              Ver catálogo
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
            >
              <MessageCircle size={18} /> Cotizar a medida
            </a>
          </div>

          <ul className="mt-9 flex animate-fade-up flex-wrap gap-x-6 gap-y-3 text-xs text-white/60 [animation-delay:480ms] sm:text-sm">
            {['Medición en sitio', 'Elección de telas', 'Entrega en Bogotá'].map(
              (item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="relative min-h-[420px] animate-fade-in [animation-delay:200ms] sm:min-h-[560px] lg:min-h-[650px]">
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-white/5">
            <Image
              src="/placeholder/hero-1.svg"
              alt="Sala contemporánea con sofá fabricado por Logika Decoración"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="animate-slow-zoom object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -left-4 bottom-6 max-w-[240px] animate-float rounded-2xl border border-white/20 bg-primary/85 p-5 shadow-lift backdrop-blur-md sm:-left-8 sm:bottom-10">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
              Tu idea, bien construida
            </p>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Diseño, materiales y proporciones definidos para tu espacio real.
            </p>
          </div>
          <div className="absolute -right-5 top-8 h-24 w-24 animate-pulse-ring rounded-full border border-accent/40 sm:-right-8 sm:h-32 sm:w-32" />
        </div>
      </div>
    </section>
  );
}
