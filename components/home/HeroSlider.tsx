import Link from 'next/link';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import { BUSINESS, CUSTOM_QUOTE_MESSAGE } from '@/constants/business';
import HeroMedia from './HeroMedia';

export default function HeroSlider() {
  const quoteUrl = buildWhatsAppUrl(
    BUSINESS.whatsappPhone,
    CUSTOM_QUOTE_MESSAGE
  );

  return (
    <section className="relative isolate overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 animate-fade-in bg-brand-glow" />
      <div className="section-shell relative grid min-h-[calc(100svh-var(--header-height))] items-center gap-10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-5 animate-fade-up text-sm font-semibold text-accent">
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
            <HeroMedia
              videoSrc="/placeholder/hero-1.mp4"
              posterSrc="/placeholder/hero-1.svg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-4 left-4 max-w-[260px] rounded-2xl bg-primary p-5 sm:bottom-8 sm:left-8">
            <p className="text-sm font-semibold text-accent">Tu idea, bien construida</p>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Diseño, materiales y proporciones definidos para tu espacio real.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
