import { MessageSquareText, PencilRuler, Ruler, Sofa, Truck } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const STEPS = [
  {
    icon: MessageSquareText,
    title: 'Cuéntanos tu idea',
    text: 'Comparte fotos, referencias y lo que necesitas resolver en tu espacio.',
  },
  {
    icon: Ruler,
    title: 'Visitamos y medimos',
    text: 'Revisamos dimensiones y condiciones reales antes de cerrar la propuesta.',
  },
  {
    icon: PencilRuler,
    title: 'Definimos el diseño',
    text: 'Acordamos proporciones, materiales, telas, colores y valor de la cotización.',
  },
  {
    icon: Sofa,
    title: 'Fabricamos',
    text: 'Construimos la pieza en nuestro taller con seguimiento de cada detalle.',
  },
  {
    icon: Truck,
    title: 'Entregamos',
    text: 'Coordinamos el transporte y la instalación para completar tu espacio.',
  },
];

export default function CustomProcessSection() {
  return (
    <section className="section-space bg-bg-base">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <Reveal variant="left">
            <p className="eyebrow">Así hacemos un proyecto</p>
            <h2 className="section-title mt-3">De una idea a un mueble que encaja de verdad</h2>
            <p className="mt-5 leading-7 text-text-muted">
              No trabajamos con una fórmula única. Cada decisión se toma según el
              uso, el espacio y el resultado que quieres conseguir.
            </p>
            <span className="mt-7 block h-px w-24 origin-left animate-draw-line bg-accent" />
          </Reveal>

          <Reveal variant="right" delay={120}>
            <ol className="divide-y divide-border border-y border-border">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.title}
                    className="group grid gap-4 py-6 transition-colors duration-500 sm:grid-cols-[52px_1fr_2fr] sm:items-center"
                  >
                    <span className="font-heading text-2xl text-accent-deep transition-transform duration-500 group-hover:-translate-y-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Icon
                      size={24}
                      className="text-primary transition-all duration-500 group-hover:scale-110 group-hover:text-accent-deep"
                    />
                    <div className="transition-transform duration-500 group-hover:translate-x-1">
                      <h3 className="font-semibold text-primary">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-text-muted">{step.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
