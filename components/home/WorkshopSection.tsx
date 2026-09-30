import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, SwatchBook } from 'lucide-react';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import { BUSINESS, WORKSHOP_VISIT_MESSAGE } from '@/constants/business';
import Reveal from '@/components/ui/Reveal';

export default function WorkshopSection() {
  const visitUrl = buildWhatsAppUrl(
    BUSINESS.whatsappPhone,
    WORKSHOP_VISIT_MESSAGE
  );

  return (
    <section className="section-space bg-bg-subtle">
      <div className="section-shell">
        <Reveal variant="zoom">
          <div className="group overflow-hidden rounded-[2rem] bg-white shadow-soft">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[360px] overflow-hidden lg:min-h-[560px]">
                <Image
                  src="/placeholder/about-workshop.svg"
                  alt="Taller de fabricación de muebles de Logika Decoración"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-[1400ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <p className="eyebrow">Conoce cómo trabajamos</p>
                <h2 className="section-title mt-3">Visita nuestra fábrica con cita previa</h2>
                <p className="mt-5 leading-7 text-text-muted">
                  No somos un punto de venta tradicional. Te recibimos en el taller
                  para que conozcas materiales, veas la calidad de fabricación y
                  compares muestrarios antes de tomar una decisión.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-bg-subtle p-4 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-soft">
                    <SwatchBook className="text-accent-deep" size={23} />
                    <p className="mt-3 text-sm font-semibold">Telas y acabados</p>
                    <p className="mt-1 text-xs leading-5 text-text-muted">Compara colores, texturas y resistencias.</p>
                  </div>
                  <div className="rounded-2xl bg-bg-subtle p-4 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-soft">
                    <CalendarDays className="text-accent-deep" size={23} />
                    <p className="mt-3 text-sm font-semibold">Atención programada</p>
                    <p className="mt-1 text-xs leading-5 text-text-muted">Coordinamos el mejor momento por WhatsApp.</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={visitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary group/btn"
                  >
                    Agendar visita
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                  <Link href="/nosotros" className="button-outline">Conocer el proceso</Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
