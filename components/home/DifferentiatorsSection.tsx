import { Ruler, ShieldCheck, Palette } from 'lucide-react';

const DIFFERENTIATORS = [
  {
    icon: Ruler,
    title: 'Hecho a tu medida',
    description:
      'Cada mueble se diseña y fabrica según las dimensiones exactas de tu espacio. Sin límites de catálogo.',
  },
  {
    icon: ShieldCheck,
    title: 'Materiales premium',
    description:
      'Espumas de alta densidad, maderas seleccionadas y telas de primera calidad. Durabilidad que se nota.',
  },
  {
    icon: Palette,
    title: 'Personalización total',
    description:
      'Elige colores, texturas y acabados. Tú decides cada detalle para que tu mueble sea único.',
  },
];

export default function DifferentiatorsSection() {
  return (
    <section className="bg-bg-subtle py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-12 text-center">
          ¿Por qué Logika?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DIFFERENTIATORS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-white border border-border"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-accent/10 rounded-full mb-4">
                  <Icon size={28} className="text-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
