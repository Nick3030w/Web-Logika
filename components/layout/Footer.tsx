import Link from 'next/link';
import { MessagesSquare as Instagram, MapPin, MessageCircle } from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppLink';
import { BUSINESS } from '@/constants/business';
import { DEFAULT_WHATSAPP_MSG } from '@/constants/whatsapp';

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/a-medida', label: 'Muebles a medida' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

const focusStyles =
  'rounded focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(
    BUSINESS.whatsappPhone,
    DEFAULT_WHATSAPP_MSG
  );

  return (
    <footer className="bg-primary text-white border-t-4 border-accent">
      <div className="section-shell py-14 sm:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <BrandLogo inverse />
            <p className="mt-5 text-sm leading-7 text-white/70">
              Fábrica de muebles a medida en Bogotá, Colombia. Diseñamos,
              fabricamos y entregamos piezas pensadas para cada espacio.
            </p>
            <p className="mt-4 text-sm font-medium text-accent">
              Taller con atención mediante cita previa.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Navegación
            </h4>
            <nav aria-label="Navegación del pie" className="mt-5 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${focusStyles} w-fit text-sm text-white/70 transition hover:text-accent`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Contacto
            </h4>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${focusStyles} inline-flex w-fit items-center gap-2 transition hover:text-accent`}
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <p className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-accent" /> Bogotá, Colombia
              </p>
              <p className="text-xs leading-5 text-white/50">
                No contamos con punto de venta. Te recibimos en la fábrica con
                cita para conocer telas, materiales y fabricación.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Síguenos
            </h4>
            <div className="mt-5 flex gap-3">
              <a
                href={BUSINESS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${focusStyles} rounded-full border border-white/20 p-3 text-accent transition hover:bg-white/10`}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${focusStyles} rounded-full border border-white/20 p-3 text-accent transition hover:bg-white/10`}
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} Logika Decoración. Todos los derechos reservados.</p>
          <p>Diseño, arte y decoración hechos en Bogotá.</p>
        </div>
      </div>
    </footer>
  );
}
