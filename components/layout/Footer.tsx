import Link from 'next/link';
import { MessagesSquare, Send } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

const SOCIAL_LINKS = [
  {
    href: 'https://instagram.com/logikadecoracion',
    icon: MessagesSquare,
    label: 'Instagram',
  },
  {
    href: 'https://wa.me/57',
    icon: Send,
    label: 'WhatsApp',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-xl font-bold text-accent mb-3">
              Logika
            </h3>
            <p className="text-sm text-gray-300">
              Fábrica de muebles a medida en Bogotá, Colombia. Diseño, calidad y
              precisión en cada proyecto.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-sm uppercase tracking-wide mb-4">
              Navegación
            </h4>
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-300 hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded px-2 py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-sm uppercase tracking-wide mb-4">
              Contacto
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-gray-300">
              <a
                href="https://wa.me/57"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded px-2 py-1"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com/logikadecoracion"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded px-2 py-1"
              >
                Instagram
              </a>
              <p className="px-2 py-1">Bogotá, Colombia</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-sm uppercase tracking-wide mb-4">
              Síguenos
            </h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:opacity-75 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded p-2"
                    aria-label={link.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          <p>
            &copy; {currentYear} Logika Decoración. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
