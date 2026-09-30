import { Factory, Palette, Ruler, ShieldCheck } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const DIFFERENTIATORS = [
  {
    icon: Ruler,
    number: '01',
    title: 'Medimos tu espacio',
    description:
      'Coordinamos una visita para entender proporciones, circulación y necesidades antes de fabricar.',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Tú eliges los acabados',
    description:
      'Compara telas, colores, texturas y firmezas con acompañamiento para tomar una buena decisión.',
  },
  {
    icon: Factory,
    number: '03',
    title: 'Fabricación propia',
    description:
      'Construimos cada mueble en nuestro taller y controlamos estructura, tapizado y terminaciones.',
  },
  {
    icon: ShieldCheck,
    number: '04',
    title: 'Calidad que puedes ver',
    description:
      'Agenda una visita a la fábrica y conoce los materiales y el proceso detrás de cada pieza.',
  },
];

export default function DifferentiatorsSection() {
  return (
    <section className="section-space bg-primary text-white">
      <div className="section-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Por qué Logika</p>
          <h2 className="mt-3 font-heading text-3xl font-light leading-tight sm:text-4xl">
            Más que un mueble: una pieza pensada y bien fabricada.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIATORS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 100}>
                <article className="group h-full bg-primary p-6 transition-colors duration-500 hover:bg-bg-dark sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent transition duration-500 group-hover:scale-110 group-hover:bg-accent/20">
                      <Icon size={23} />
                    </span>
                    <span className="font-heading text-2xl text-white/20 transition-colors duration-500 group-hover:text-accent/40">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="mt-7 font-heading text-xl font-normal">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
