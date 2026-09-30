import Link from 'next/link';
import { ArrowRight, MessageCircle, ShoppingBag } from 'lucide-react';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import { BUSINESS, CUSTOM_QUOTE_MESSAGE } from '@/constants/business';
import Reveal from '@/components/ui/Reveal';

export default function HybridOfferSection() {
  const quoteUrl = buildWhatsAppUrl(BUSINESS.whatsappPhone, CUSTOM_QUOTE_MESSAGE);

  return (
    <section className="section-space bg-bg-subtle">
      <div className="section-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Dos maneras de empezar</p>
          <h2 className="section-title mt-3">Elige una referencia o creemos algo desde cero</h2>
          <p className="mt-4 leading-7 text-text-muted">
            En ambos casos te atendemos directamente por WhatsApp para confirmar
            detalles, disponibilidad, entrega y forma de pago.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal variant="left" delay={80}>
            <article className="surface-card hover-lift group relative h-full overflow-hidden p-7 sm:p-10">
              <div className="absolute right-0 top-0 h-36 w-36 rounded-bl-full bg-accent/10 transition-transform duration-700 group-hover:scale-125" />
              <span className="grid h-14 w-14 place-items-center rounded-full bg-primary p-3 text-accent transition-transform duration-500 group-hover:rotate-[10deg]">
                <ShoppingBag size={25} />
              </span>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">
                Referencias disponibles
              </p>
              <h3 className="mt-3 font-heading text-3xl font-light">Encuentra un diseño para comprar</h3>
              <p className="mt-4 max-w-lg leading-7 text-text-muted">
                Explora modelos existentes y consulta precio, opciones y tiempo de
                entrega. La compra se coordina con nuestro equipo por WhatsApp.
              </p>
              <Link href="/catalogo" className="button-primary group/btn mt-8">
                Explorar referencias
                <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </article>
          </Reveal>

          <Reveal variant="right" delay={160}>
            <article className="hover-lift group relative h-full overflow-hidden rounded-[1.5rem] bg-primary p-7 text-white shadow-soft sm:p-10">
              <div className="absolute -bottom-16 -right-12 h-56 w-56 rounded-full border-[32px] border-accent/10 transition-transform duration-[1200ms] group-hover:rotate-45" />
              <span className="grid h-14 w-14 place-items-center rounded-full bg-accent p-3 text-primary transition-transform duration-500 group-hover:rotate-[10deg]">
                <MessageCircle size={25} />
              </span>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Proyecto a medida
              </p>
              <h3 className="mt-3 font-heading text-3xl font-light">Diseñemos para tu espacio</h3>
              <p className="mt-4 max-w-lg leading-7 text-white/60">
                El valor se define mediante cotización personalizada según medidas,
                materiales, diseño y acabados seleccionados.
              </p>
              <a
                href={quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-accent group/btn mt-8"
              >
                Solicitar cotización
                <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
